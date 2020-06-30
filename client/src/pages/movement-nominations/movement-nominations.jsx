import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import moment from 'moment';
import { Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, Calendar, WindowSearch } from '../../components';
import api, { MOVEMENT_NOMIATIONS } from '../../api';
import { SETTINGS } from '../../constants';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';
import { useAuth } from '../../hooks';
import { useConfig } from '../../hooks';
import { getDateRangeOffset } from '../../utils';

const MovementNominations = () => {
  const [rangeStart, setRangeStart] = useState(0);
  const [rangeEnd, setRangeEnd] = useState(0);

  const config = useConfig();
  const ranges = getDateRangeOffset(config.openOrderDateRange, '30');
  //const ranges = getDateRangeOffset(false, '30');
  //const ranges = getDateRangeOffset("7~~0", '30');

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [timeOption, setTimeOption] = useState('MV_DTIM_EFFECT');
  const [data, setData] = useState(null);

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
    /* {
      index: 3,
      code: 'MV_DTIM_CREATE',
      name: t('fields.createdAt'),
    },
    {
      index: 4,
      code: 'MV_DTIM_CHANGE',
      name: t('fields.lastModified'),
    }, */
  ];

  const access = useAuth('M_NOMINATION');

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  //const [start, setStart] = useState(moment().subtract(60, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  //const [end, setEnd] = useState(moment().add(360, 'days').format(SETTINGS.DATE_TIME_FORMAT));

  const url =
    start && end
      ? `${MOVEMENT_NOMIATIONS.READ}?start_date=${start}&end_date=${end}&time_option=${timeOption}`
      : null;

  const { data: payload, isValidating, revalidate } = useSWR(url, { revalidateOnFocus: false });

  //const data = payload?.records;
  const isLoading = isValidating || !data;
  const fields = columns(t);

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
    setStart(moment().subtract(rangeStart, 'days').format(SETTINGS.DATE_TIME_FORMAT));
    setEnd(moment().add(rangeEnd, 'days').format(SETTINGS.DATE_TIME_FORMAT));
    //revalidate();
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
      !values?.mv_number
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

  /* useEffect(() => {
    if (!start && ranges?.beforeToday) {
      setStart(moment().subtract(ranges.beforeToday, 'days').format(SETTINGS.DATE_TIME_FORMAT));
    }

    if (!end && ranges?.afterToday) {
      setEnd(moment().add(ranges.afterToday, 'days').format(SETTINGS.DATE_TIME_FORMAT));
    }
  }, [ranges, start, end]); */

  useEffect(() => {
    console.log('I am here: rangeStart, start', start, rangeStart);
    setStart(moment().subtract(rangeStart, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  }, [rangeStart]);

  useEffect(() => {
    console.log('I am here: rangeEnd, end', end, rangeEnd);
    setEnd(moment().add(rangeEnd, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  }, [rangeEnd]);

  useEffect(() => {
    if (ranges) {
      setRangeStart(ranges?.beforeToday);
      setRangeEnd(ranges?.afterToday);
    }
  }, [ranges]);

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
          defaultValue="MV_DTIM_EFFECT"
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

      <div style={{ float: 'left', width: '420px' }}>
        <Calendar handleChange={setRange} start={start} end={end} />
      </div>

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
            time_option: "movement_nomination",
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
    <Page page={page} name={name} modifiers={modifiers} access={access} modifiers={modifiers}>
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
      />

      {visible && (
        <Forms
          value={selected}
          visible={visible}
          handleFormState={handleFormState}
          access={access}
          url={url}
          locateNomination={locateNomination}
        />
      )}
    </Page>
  );
};

export default auth(MovementNominations);
