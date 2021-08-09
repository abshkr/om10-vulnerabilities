import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import moment from 'moment';
import { Button, Select, Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, FileSearchOutlined, EyeOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, DateTimeRangePicker, WindowSearch } from '../../components';
import api, { MOVEMENT_NOMIATIONS } from '../../api';
import { SETTINGS } from '../../constants';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';
import { useAuth } from '../../hooks';
import { useConfig } from '../../hooks';
import Schedules from './forms/items/schedules';

const MovementNominations = () => {
  const config = useConfig();
  const rangeSetting = config.nominationDateRange;
  const filterByExpiry = config.filterNominationByExpiry;
  console.log('filterByExpiry', filterByExpiry);

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [timeOption, setTimeOption] = useState(filterByExpiry ? 'MV_DTIM_EXPIRY' : 'MV_DTIM_CREATE'); //'MV_DTIM_EFFECT');
  const [data, setData] = useState(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const { t } = useTranslation();

  const timeOptions = [
    {
      index: 1,
      code: 'MV_DTIM_EFFECT',
      name: t('fields.effectiveFrom'),
    },
    {
      index: 2,
      code: 'MV_DTIM_EXPIRY',
      name: t('fields.expiredAfter'),
    },
    {
      index: 3,
      code: 'MV_DTIM_CREATE',
      name: t('fields.createdAt'),
    },
    /* {
      index: 4,
      code: 'MV_DTIM_CHANGE',
      name: t('fields.lastModified'),
    }, */
  ];

  const access = useAuth('M_NOMINATION');

  const [refreshed, setRefreshed] = useState(false);
  // const [start, setStart] = useState(moment().subtract(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  // const [end, setEnd] = useState(moment().add(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const url =
    start && end
      ? `${MOVEMENT_NOMIATIONS.READ}?start_date=${start}&end_date=${end}&time_option=${timeOption}`
      : null;

  const { data: payload, isValidating, revalidate } = useSWR(url, { revalidateOnFocus: false });

  //const data = payload?.records;
  const isLoading = isValidating || !data;
  const fields = columns(t, config);

  const page = t('pageMenu.operations');
  const name = t('pageNames.movementNominations');

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
  };

  const onRefresh = () => {
    setRefreshed(true);
    // setTimeOption(filterByExpiry?'MV_DTIM_EXPIRY':'MV_DTIM_CREATE');

    // Don't need revalidate, let useSWR handle itself while parameter changes
    // revalidate();
  };

  const locateNomination = (value) => {
    runSearch({
      mv_key: value,
    });
  };

  const runSearch = (values) => {
    if (
      !values?.mv_key &&
      !values?.mv_status &&
      !values?.mv_srctype &&
      !values?.mv_terminal &&
      !values?.mv_number &&
      !values.use_date_range
    ) {
      revalidate();
      return;
    }
    api
      .get(MOVEMENT_NOMIATIONS.SEARCH, {
        params: {
          mv_key: values?.mv_key,
          mv_status: values?.mv_status,
          mv_srctype: values?.mv_srctype,
          mv_terminal: values?.mv_terminal,
          mv_number: values?.mv_number,
          start_date: values.use_date_range ? values.start_date : null,
          end_date: values.use_date_range ? values.end_date : null,
          time_option: values.use_date_range ? values.time_option : null,
        },
      })
      .then((res) => {
        setData(res.data.records);
      });
  };

  useEffect(() => {
    if (filterByExpiry) {
      setTimeOption('MV_DTIM_EXPIRY');
    } else {
      setTimeOption('MV_DTIM_CREATE');
    }
  }, [filterByExpiry]);

  useEffect(() => {
    if (payload) {
      setData(payload?.records);
      payload.records = null;
    }
  }, [payload]);

  const modifiers = (
    <>
      <div style={{ float: 'left' }}>
        <Select
          dropdownMatchSelectWidth={false}
          defaultValue={filterByExpiry ? 'MV_DTIM_EXPIRY' : 'MV_DTIM_CREATE'}
          onChange={setTimeOption}
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
      </div>

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

      <Button type="primary" icon={<EyeOutlined />} disabled={false} onClick={() => setScheduleOpen(true)}>
        {t('pageMenu.schedules')}
      </Button>

      <Button icon={<SyncOutlined />} onClick={onRefresh} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isLoading} columns={fields} />

      <Button
        type="primary"
        icon={<FileSearchOutlined />}
        onClick={() =>
          WindowSearch(runSearch, t('operations.search'), {
            mv_key: true,
            mv_status: true,
            mv_srctype: true,
            mv_terminal: true,
            mv_number: true,
            time_option: 'movement_nomination',
          })
        }
      >
        {t('operations.search')}
      </Button>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleFormState(true, null)}
        loading={isLoading}
        disabled={!access.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <>
      {scheduleOpen && (
        <Drawer
          placement="right"
          bodyStyle={{ paddingTop: 5 }}
          onClose={() => setScheduleOpen(false)}
          visible={scheduleOpen}
          width="100vw"
        >
          <Schedules selected={null} />
        </Drawer>
      )}
      <Page page={page} name={name} modifiers={modifiers} access={access}>
        <DataTable
          columns={fields}
          data={data}
          isLoading={isValidating}
          selectionMode="single"
          onClick={(payload) => handleFormState(true, payload)}
          handleSelect={(payload) => handleFormState(true, payload[0])}
          clearFilterPlus={revalidate}
        />

        {visible && (
          <Forms
            value={selected}
            visible={visible}
            handleFormState={handleFormState}
            access={access}
            url={url}
            locateNomination={locateNomination}
            config={config}
          />
        )}
      </Page>
    </>
  );
};

export default auth(MovementNominations);
