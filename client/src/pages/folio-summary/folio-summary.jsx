import React, { useCallback, useState, useEffect, useRef } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { notification, Button, Modal, Select, Switch } from 'antd';
import {
  SafetyCertificateOutlined,
  ReconciliationOutlined,
  SyncOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import _ from 'lodash';

import Forms from './forms';
import auth from '../../auth';
import columns from './columns';
import api, { FOLIO_SUMMARY, SITE_CONFIGURATION } from '../../api';
import {
  Page,
  DataTable,
  Download,
  DataDownloader,
  PageDownloader,
  DateTimeRangePicker,
} from '../../components';

import { useAuth } from '../../hooks';
import { useConfig, usePagination } from '../../hooks';

import './folio-summary.css';

const FolioSummary = () => {
  const { t } = useTranslation();
  const config = useConfig();
  const rangeSetting = config.folioSummaryDateRange;
  const filterDateType = config.filterFolioSummaryDateType;
  const { siteFolioSumPaging, siteUseDownloader } = config;

  const [pagingFlag, setPagingFlag] = useState(undefined);
  const [timeOption, setTimeOption] = useState(
    filterDateType === 'CHANGE'
      ? 'LAST_CHG_TIME'
      : filterDateType === 'CLOSE'
      ? 'CLOSEOUT_DATE'
      : 'PREV_CLOSEOUT_DATE'
  );
  const [data, setData] = useState(null);

  const timeOptions = [
    {
      index: 1,
      code: 'PREV_CLOSEOUT_DATE',
      name: t('fields.openingDate'),
    },
    {
      index: 2,
      code: 'CLOSEOUT_DATE',
      name: t('fields.freezeDate'),
    },
    {
      index: 3,
      code: 'LAST_CHG_TIME',
      name: t('fields.dateChanged'),
    },
  ];

  const { setCount, take, offset, paginator, setPage, count } = usePagination(500);

  const [isDownloading, setDownloading] = useState(false);
  const runUrlFlag = useRef(!pagingFlag);
  const setRunUrlFlag = (flag) => {
    runUrlFlag.current = flag;
  };

  const [refreshed, setRefreshed] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const [mainUrl, setMainUrl] = useState(
    `${FOLIO_SUMMARY.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&start_date=${!start ? '-1' : start}&end_date=${
      !end ? '-1' : end
    }&time_option=${timeOption}`
  );
  const baseUrl = mainUrl.replace('pgflag=N', 'pgflag=Y');
  const url = !pagingFlag && siteUseDownloader ? null : mainUrl + `&start_num=${take}&end_num=${offset}`;
  const pageUrl = mainUrl.replace('pgflag=N', 'pgflag=Y');

  // const { data: payload, isValidating, revalidate } = useSWR(FOLIO_SUMMARY.READ);
  const { data: payload, isValidating, revalidate } = useSWR(url, { revalidateOnFocus: false });

  const access = useAuth('M_FOLIOMANAGEMENT');

  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);
  const [closeoutIsIdle, setCloseoutIsIdle] = useState(false);

  const fields = columns(t);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const onChangePagination = async (v) => {
    if (!v) {
      setData([]);
    }

    const tempUrl = `${FOLIO_SUMMARY.READ}?pgflag=${v ? 'Y' : 'N'}&start_date=${
      !start ? '-1' : start
    }&end_date=${!end ? '-1' : end}&time_option=${timeOption}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!v);

    setPagingFlag(v);

    // change the value in site_config
    const values = [
      {
        config_key: 'SITE_PAGINATION_FOLIO_SUMMARY',
        config_value: v ? 'Y' : 'N',
      },
    ];

    await api.post(SITE_CONFIGURATION.UPDATE, values);
  };

  const setRange = (start, end) => {
    const tempUrl = `${FOLIO_SUMMARY.READ}?pgflag=${
      pagingFlag ? 'Y' : 'N'
    }&start_date=${start}&end_date=${end}&time_option=${timeOption}`;
    setMainUrl(tempUrl);
    setPage(1);
    setRunUrlFlag(!pagingFlag);
    if (revalidate) revalidate();

    setStart(start);
    setEnd(end);
  };

  const onTimeOptionChanged = (option) => {
    const tempUrl = `${FOLIO_SUMMARY.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&start_date=${
      !start ? '-1' : start
    }&end_date=${!end ? '-1' : end}&time_option=${option}`;
    setMainUrl(tempUrl);
    setPage(1);
    setRunUrlFlag(!pagingFlag);
    if (revalidate) revalidate();

    setTimeOption(option);
  };

  const onRefresh = () => {
    // setStart(start);
    // setEnd(end);

    if (!pagingFlag) {
      setData([]);
    }

    setTimeOption(
      filterDateType === 'CHANGE'
        ? 'LAST_CHG_TIME'
        : filterDateType === 'CLOSE'
        ? 'CLOSEOUT_DATE'
        : 'PREV_CLOSEOUT_DATE'
    );
    setRefreshed(true);

    // Don't need revalidate, let useSWR handle itself while parameter changes
    // revalidate();
  };

  const createPDS = useCallback(() => {
    api
      .post(FOLIO_SUMMARY.CREATE_PDS)
      .then((response) => {
        notification.success({
          message: t('messages.PDSSuccessful'),
          description: t('descriptions.PDSSuccessful'),
        });
      })

      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
  }, [t]);

  const getCloseoutStatus = useCallback(() => {
    api.post(FOLIO_SUMMARY.CLOSEOUT_IS_IDLE).then((response) => {
      setCloseoutIsIdle(response.data.records);
    });
  });

  const showCloseoutStatus = () => {
    if (!closeoutIsIdle) {
      return t('descriptions.closeoutIsBusy');
    }

    if (fronzenFolioCount() <= 0) {
      return t('descriptions.noFronzenFolio');
    }
  };

  const fronzenFolioCount = () => {
    // const count = payload?.records.filter(item => item.status === 1).length;
    const items = data?.filter((item) => item.status === 1);
    const count = !items ? 0 : items?.length;
    return count;
  };

  const closeFolio = async () => {
    Modal.confirm({
      title: t('prompts.closeCloseout'),
      okText: t('operations.yes'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(FOLIO_SUMMARY.MANUAL_CLOSE)
          .then((response) => {
            notification.success({
              message: t('messages.submitSuccess'),
              description: t('descriptions.closeFolioTriggered'),
            });
          })

          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const modifiers = (
    <>
      <Switch
        style={{ marginRight: 5 }}
        checked={pagingFlag}
        checkedChildren={<span>{t('operations.paginationOn')}</span>}
        unCheckedChildren={<span>{t('operations.paginationOff')}</span>}
        onChange={(value) => onChangePagination(value)}
      />

      <Select
        dropdownMatchSelectWidth={false}
        defaultValue={
          filterDateType === 'CHANGE'
            ? 'LAST_CHG_TIME'
            : filterDateType === 'CLOSE'
            ? 'CLOSEOUT_DATE'
            : 'PREV_CLOSEOUT_DATE'
        }
        value={timeOption}
        onChange={onTimeOptionChanged}
        optionFilterProp="children"
        placeholder={null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {timeOptions.map((item, index) => (
          <Select.Option key={index} value={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>

      <DateTimeRangePicker
        handleChange={setRange}
        rangeSetting={rangeSetting}
        refreshed={refreshed}
        setRefreshed={setRefreshed}
        disabled={false}
        enableClear={true}
        max={2000}
        // localBased={true}
      />

      <Button icon={<SyncOutlined />} onClick={onRefresh} loading={isDownloading}>
        {t('operations.refresh')}
      </Button>

      {!pagingFlag && <Download data={data} isLoading={isDownloading} columns={fields} />}

      {pagingFlag && (
        <PageDownloader
          baseUrl={baseUrl}
          startVar={'start_num'}
          endVar={'end_num'}
          pageSize={500}
          columns={fields}
        />
      )}
    </>
  );

  const actions = (
    <>
      <Button
        title={showCloseoutStatus()}
        type="primary"
        icon={<SafetyCertificateOutlined />}
        onClick={() => closeFolio(null)}
        style={{ float: 'right', marginRight: 5 }}
        disabled={
          !access?.extra || !closeoutIsIdle || config?.siteCloseoutAutoClose || fronzenFolioCount() <= 0
        }
      >
        {t('operations.closeFirstFolio')}
      </Button>

      <Button
        type="primary"
        icon={<ReconciliationOutlined />}
        onClick={() => createPDS()}
        style={{ float: 'right', marginRight: 5 }}
      >
        {t('operations.createPDSFile')}
      </Button>
    </>
  );

  useEffect(() => {
    getCloseoutStatus();
  });

  useEffect(() => {
    setTimeOption(
      filterDateType === 'CHANGE'
        ? 'LAST_CHG_TIME'
        : filterDateType === 'CLOSE'
        ? 'CLOSEOUT_DATE'
        : 'PREV_CLOSEOUT_DATE'
    );
  }, [filterDateType]);

  useEffect(() => {
    if (payload?.records) {
      setData(payload?.records);
      // setLoading(false);
      payload.records = null;
      setCount(payload?.count || 0);
    }
  }, [payload]);

  useEffect(() => {
    if (siteFolioSumPaging !== undefined) {
      setPagingFlag(siteFolioSumPaging);
    }
  }, [siteFolioSumPaging]);

  useEffect(() => {
    if (isValidating !== undefined) {
      setDownloading(isValidating);
    }
  }, [isValidating]);

  return (
    <Page
      page={t('pageMenu.reports')}
      name={t('pageNames.folioSummary')}
      modifiers={modifiers}
      access={access}
      avatar="folioSummary"
    >
      <DataTable
        columns={fields}
        data={data}
        isLoading={isDownloading}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        extra={actions}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        {/* pagingFlag ? paginator : t('fields.totalCount') + ': ' + count */}
        {pagingFlag ? (
          paginator
        ) : siteUseDownloader === false ? (
          t('fields.totalCount') + ': ' + count
        ) : (
          <DataDownloader
            baseUrl={pageUrl}
            startVar={'start_num'}
            endVar={'end_num'}
            pageSize={500}
            setData={setData}
            setDownloading={setDownloading}
            runUrl={runUrlFlag.current}
            setRunUrl={setRunUrlFlag}
          />
        )}
      </div>

      {visible && (
        <Forms
          value={selected}
          visible={visible}
          handleFormState={handleFormState}
          access={access}
          closeoutIsIdle={closeoutIsIdle}
          config={config}
          // setFilterValue={setFilterValue}
        />
      )}
    </Page>
  );
};

export default auth(FolioSummary);
