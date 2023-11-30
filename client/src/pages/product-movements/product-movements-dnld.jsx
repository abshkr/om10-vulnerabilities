import React, { useState, useEffect, useRef } from 'react';
import { SyncOutlined, PlusOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Select, Switch, Tag } from 'antd';
import useSWR from 'swr';
import moment from 'moment';

import {
  Page,
  PowerTable as DataTable,
  Download,
  DataDownloader,
  PageDownloader,
  DateTimeRangePicker,
} from '../../components';
import api, { PRODUCT_MOVEMENTS, SITE_CONFIGURATION } from '../../api';
import columns from './columns';
import auth from '../../auth';
import { SETTINGS } from '../../constants';
import { useAuth, useConfig, usePagination } from 'hooks';
import _ from 'lodash';

import Forms from './forms';

const ProductMovements = () => {
  const { t } = useTranslation();

  const access = useAuth('M_PRODUCTMOVEMENT');

  const config = useConfig();
  const {
    refreshProductMovement,
    siteCustomColumnProdMove,
    siteProdMovePaging,
    siteProdMoveDownloader,
    siteDownloaderBatchMax,
  } = config;
  const filterDateType = config.filterProdMovementDateType;

  const [pmvNumber, setPmvNumber] = useState('');
  const [pagingFlag, setPagingFlag] = useState(undefined);
  const [timeOption, setTimeOption] = useState(filterDateType === 'END' ? 'PMV_DATE2' : 'PMV_DATE1');
  const [data, setData] = useState(null);
  const [goLive, setGoLive] = useState(false);
  const [tickFlag, setTickFlag] = useState(false);
  const [interval, setInterval] = useState(goLive ? refreshProductMovement : 0);
  const [maskFlag, setMaskFlag] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const [downloaderFlag, setDownloaderFlag] = useState(undefined);

  const timeOptions = [
    {
      index: 1,
      code: 'PMV_DATE1',
      name: t('fields.startDate'),
    },
    {
      index: 2,
      code: 'PMV_DATE2',
      name: t('fields.endDate'),
    },
  ];

  const { setCount, take, offset, paginator, setPage, count } = usePagination(500);

  const [isDownloading, setDownloading] = useState(false);
  const runUrlFlag = useRef(!pagingFlag);
  const setRunUrlFlag = (flag) => {
    runUrlFlag.current = flag;
  };

  const [refreshed, setRefreshed] = useState(false);
  const [start, setStart] = useState(moment().subtract(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().add(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  // const [start, setStart] = useState(null);
  // const [end, setEnd] = useState(null);

  const [mainUrl, setMainUrl] = useState(
    `${PRODUCT_MOVEMENTS.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&start_date=${
      !start ? '-1' : start
    }&end_date=${!end ? '-1' : end}&time_option=${timeOption}&pmv_number=${pmvNumber}`
  );
  const baseUrl = mainUrl.replace('pgflag=N', 'pgflag=Y');
  const url =
    !pagingFlag && downloaderFlag
      ? null
      : pagingFlag
      ? mainUrl.replace('pgflag=N', 'pgflag=Y') + `&start_num=${take}&end_num=${offset}`
      : mainUrl.replace('pgflag=N', 'pgflag=Y') + `&start_num=${0}&end_num=${siteDownloaderBatchMax}`;
  const pageUrl = mainUrl.replace('pgflag=N', 'pgflag=Y');

  const { data: payload, isValidating, mutate: revalidate } = useSWR(url, { refreshInterval: interval });

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterValue, setFilterValue] = useState('');

  const fields = columns(t, config);
  // const data = payload?.records;

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const tick = () => {
    // const currTime = moment.utc().tz(offset).format(format);
    // const currTime = moment().local(true).toString();
    // setClock(currTime);
    // console.log('.............tick tock...: ', currTime);
    setTickFlag(!tickFlag);
  };

  const onPollChanged = (v) => {
    if (setGoLive) {
      setGoLive(v.target.checked);
    }
    if (v.target.checked) {
      if (setInterval) {
        setInterval(refreshProductMovement);
      }
    } else {
      if (setInterval) {
        setInterval(0);
      }
    }
  };

  const onDecreaseInteval = async () => {
    const second = interval / 1000;
    if (second - 1 > 0) {
      await onChangeRefreshInteval(second - 1);
    }
  };

  const onIncreaseInteval = async () => {
    const second = interval / 1000;
    if (second + 1 < 60) {
      await onChangeRefreshInteval(second + 1);
    }
  };

  const onChangeRefreshInteval = async (v) => {
    setInterval(v * 1000);

    // change the value in site_config
    const values = [
      {
        config_key: 'SITE_REFRESH_PRODMV_INTERVAL',
        config_value: v,
      },
    ];

    await api.post(SITE_CONFIGURATION.UPDATE, values);
  };

  const onChangeDownloader = async (v) => {
    if (!v) {
      setData([]);
    }

    const tempUrl = `${PRODUCT_MOVEMENTS.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&start_date=${
      !start ? '-1' : start
    }&end_date=${!end ? '-1' : end}&time_option=${timeOption}&pmv_number=${pmvNumber}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!pagingFlag);

    setDownloaderFlag(v);

    // change the value in site_config
    const values = [
      {
        config_key: 'SITE_DOWNLOADER_PRODMOVE_LIST',
        config_value: v ? 'Y' : 'N',
      },
    ];

    await api.post(SITE_CONFIGURATION.UPDATE, values);
  };

  const onChangePagination = async (v) => {
    if (!v) {
      setData([]);
    }

    const tempUrl = `${PRODUCT_MOVEMENTS.READ}?pgflag=${v ? 'Y' : 'N'}&start_date=${
      !start ? '-1' : start
    }&end_date=${!end ? '-1' : end}&time_option=${timeOption}&pmv_number=${pmvNumber}`;
    setMainUrl(tempUrl);

    setPage(1);
    setRunUrlFlag(!v);

    setPagingFlag(v);

    // change the value in site_config
    const values = [
      {
        config_key: 'SITE_PAGINATION_PRODMOVE_LIST',
        config_value: v ? 'Y' : 'N',
      },
    ];

    await api.post(SITE_CONFIGURATION.UPDATE, values);
  };

  const setRange = (start, end) => {
    console.log('...........................here i am', start, end);
    const tempUrl = `${PRODUCT_MOVEMENTS.READ}?pgflag=${
      pagingFlag ? 'Y' : 'N'
    }&start_date=${start}&end_date=${end}&time_option=${timeOption}&pmv_number=${pmvNumber}`;
    setMainUrl(tempUrl);
    setPage(1);
    setRunUrlFlag(!pagingFlag);
    if (revalidate) revalidate();

    setStart(start);
    setEnd(end);
  };

  const onTimeOptionChanged = (option) => {
    const tempUrl = `${PRODUCT_MOVEMENTS.READ}?pgflag=${pagingFlag ? 'Y' : 'N'}&start_date=${
      !start ? '-1' : start
    }&end_date=${!end ? '-1' : end}&time_option=${option}&pmv_number=${pmvNumber}`;
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

    setTimeOption(filterDateType === 'END' ? 'PMV_DATE2' : 'PMV_DATE1');
    setPmvNumber('');
    setRefreshed(true);

    // Don't need revalidate, let useSWR handle itself while parameter changes
    // revalidate();
  };

  const onLocate = (value) => {
    runSearch({
      pmv_number: value,
    });
  };

  const runSearch = (values) => {
    if (!pagingFlag) {
      setData([]);
    }

    setSearching(true);
    setPmvNumber(!values.pmv_number ? '' : values?.pmv_number);

    const pmvNumber = !values.pmv_number ? '' : values?.pmv_number;
    const tempUrl = `${PRODUCT_MOVEMENTS.READ}?pgflag=${
      pagingFlag ? 'Y' : 'N'
    }&start_date=${start}&end_date=${end}&time_option=${timeOption}&pmv_number=${pmvNumber}`;
    setMainUrl(tempUrl);
    console.log('....................', tempUrl);

    setPage(1);
    setRunUrlFlag(!pagingFlag);
    if (revalidate) revalidate();
    setSearching(false);
  };

  useEffect(() => {
    if (selected) {
      const result = _.find(data, (item) => {
        return item.pmv_number === selected.pmv_number;
      });

      setSelected(result);
    }
  }, [payload]);

  const modifiers = (
    <>
      {(pagingFlag || !downloaderFlag) && goLive && (
        <>
          <Button
            type="dashed"
            shape="circle"
            size="small"
            icon={<CaretLeftOutlined />}
            style={{ width: 20, marginRight: 0 }}
            onClick={onDecreaseInteval}
          />
          <Tag color={'red'} style={{ marginRight: 0 }}>
            {interval / 1000}
          </Tag>
          <Button
            type="dashed"
            shape="circle"
            size="small"
            icon={<CaretRightOutlined />}
            style={{ width: 20, marginLeft: 0, marginRight: 5 }}
            onClick={onIncreaseInteval}
          />
        </>
      )}

      {(pagingFlag || !downloaderFlag) && (
        <Checkbox
          style={{
            paddingTop: '4px',
            color: !goLive ? 'black' : tickFlag ? 'white' : 'red',
            fontWeight: !goLive ? 'normal' : tickFlag ? 'normal' : 'bolder',
          }}
          checked={goLive}
          disabled={false}
          onChange={onPollChanged}
        >
          {t('operations.goLive')}
        </Checkbox>
      )}

      <Switch
        style={{ marginRight: 5 }}
        checked={pagingFlag}
        checkedChildren={<span>{t('operations.paginationOn')}</span>}
        unCheckedChildren={<span>{t('operations.paginationOff')}</span>}
        onChange={(value) => onChangePagination(value)}
      />

      {!pagingFlag && (
        <Switch
          style={{ marginRight: 5 }}
          checked={downloaderFlag}
          checkedChildren={<span>{t('operations.downloaderOn')}</span>}
          unCheckedChildren={<span>{t('operations.downloaderOff')}</span>}
          onChange={(value) => onChangeDownloader(value)}
        />
      )}

      <Select
        popupMatchSelectWidth={false}
        defaultValue={filterDateType === 'END' ? 'PMV_DATE2' : 'PMV_DATE1'}
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
        rangeSetting={config?.prodMovementDateRange}
        refreshed={refreshed}
        setRefreshed={setRefreshed}
        disabled={false}
        enableClear={true}
        max={720}
        // localBased={true}
      />

      <Button icon={<SyncOutlined />} onClick={onRefresh} loading={isDownloading || isSearching}>
        {t('operations.refresh')}
      </Button>

      {!pagingFlag && <Download data={data} isLoading={isDownloading || isSearching} columns={fields} />}

      {pagingFlag && (
        <PageDownloader
          baseUrl={baseUrl}
          startVar={'start_num'}
          endVar={'end_num'}
          pageSize={500}
          columns={fields}
        />
      )}

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setMaskFlag(true);
          handleFormState(true, null);
        }}
        loading={isDownloading || isSearching}
        disabled={!access?.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  /* useEffect(() => {
    if (!goLive) return;
    let timer=setTimeout(tick, 1000);
    return () => clearTimeout(timer);
  }); */

  useEffect(() => {
    setTimeOption(filterDateType === 'END' ? 'PMV_DATE2' : 'PMV_DATE1');
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
    if (siteProdMovePaging !== undefined) {
      setPagingFlag(siteProdMovePaging);
    }
  }, [siteProdMovePaging]);

  useEffect(() => {
    if (siteProdMoveDownloader !== undefined) {
      setDownloaderFlag(siteProdMoveDownloader);
    }
  }, [siteProdMoveDownloader]);

  useEffect(() => {
    if (isValidating !== undefined) {
      setDownloading(isValidating);
    }
  }, [isValidating]);

  useEffect(() => {
    if (refreshProductMovement !== undefined) {
      setInterval(goLive ? refreshProductMovement : 0);
    }
  }, [refreshProductMovement]);

  return (
    <Page
      page={t('pageMenu.operations')}
      name={t('pageNames.productMovements')}
      modifiers={modifiers}
      access={access}
      avatar="productMovements"
    >
      <DataTable
        columns={fields}
        data={data}
        isLoading={isDownloading || isSearching}
        selectionMode="single"
        onClick={(payload) => {
          setMaskFlag(false);
          handleFormState(true, payload);
        }}
        handleSelect={(payload) => {
          setMaskFlag(false);
          handleFormState(true, payload[0]);
        }}
        filterValue={filterValue}
        columnAdjustable={siteCustomColumnProdMove}
        pageModule={'M_PRODUCTMOVEMENT'}
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
        ) : downloaderFlag === false ? (
          count > siteDownloaderBatchMax ? (
            <>
              {`${t('fields.totalCount')}: ${count}`} &nbsp;&nbsp;&nbsp;
              <Tag color={'red'}>
                {t('descriptions.downloaderBatchMax', { BATCHMAX: siteDownloaderBatchMax })}
              </Tag>
            </>
          ) : (
            t('fields.totalCount') + ': ' + count
          )
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
          // setFilterValue={setFilterValue}
          refresh={revalidate}
          onLocate={onLocate}
          setPage={setPage}
          config={config}
          maskFlag={maskFlag}
        />
      )}
    </Page>
  );
};

export default auth(ProductMovements);
