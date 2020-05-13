import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import { Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { CheckOutlined, MinusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import _ from 'lodash';

import { Page, DataTable } from '../../components';
import { TIME_CODES } from '../../api';
import generator from './generator';
import columns from './columns';
import auth from '../../auth';

const TimeCodes = () => {
  const { t } = useTranslation();
  const { data: payload, isValidating } = useSWR(TIME_CODES.READ);

  const [code, setCode] = useState(null);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState([]);

  const fields = columns(t);

  const onSelectAll = () => {
    const values = [];

    const payload = [...data];

    _.forEach(selected, (time) => {
      const modified = {};

      Object.keys(time).forEach((key) => {
        if (key !== 'day') {
          modified[key] = true;
        } else {
          modified[key] = time[key];
        }
      });

      values.push(modified);
    });

    _.forEach(values, (value) => {
      const index = _.findIndex(payload, ['day', value.day]);

      payload[index] = value;
    });

    setData(payload);
  };

  const onDeSelectAll = () => {
    const values = [];

    const payload = [...data];

    _.forEach(selected, (time) => {
      const modified = {};

      Object.keys(time).forEach((key) => {
        if (key !== 'day') {
          modified[key] = false;
        } else {
          modified[key] = time[key];
        }
      });

      values.push(modified);
    });

    _.forEach(values, (value) => {
      const index = _.findIndex(payload, ['day', value.day]);

      payload[index] = value;
    });

    setData(payload);
  };

  const onCellEdit = (record) => {
    const payload = [...data];

    const newValue = !record.value;
    const column = record.colDef.field;

    let newObject = {
      ...record.data,
    };

    newObject[column] = newValue;
    payload[record.rowIndex] = newObject;

    setData(payload);
  };

  useEffect(() => {
    if (payload?.records.length > 0) {
      setCode(payload?.records[0].tcd_title);
    }
  }, [payload]);

  useEffect(() => {
    const values = generator(code, payload?.records, t);

    setData(values);
  }, [code, payload, t]);

  const modifiers = (
    <>
      <Button type="primary" icon={<DeleteOutlined />}>
        {t('operations.delete')}
      </Button>

      <Button type="primary" icon={<EditOutlined />}>
        {t('operations.update')}
      </Button>

      <Button type="primary" icon={<EditOutlined />}>
        {t('operations.create')}
      </Button>
    </>
  );

  const extra = (
    <>
      <Select style={{ width: 200 }} value={code} onChange={setCode}>
        {payload?.records.map((item) => {
          return (
            <Select.Option key={item.tcd_title} value={item.tcd_title}>
              {item.tcd_title}
            </Select.Option>
          );
        })}
      </Select>

      <Button
        type="dashed"
        icon={<CheckOutlined />}
        style={{ marginLeft: 10 }}
        disabled={selected.length === 0}
        onClick={onSelectAll}
      >
        {t('operations.selectAllTimes')}
      </Button>

      <Button
        type="dashed"
        icon={<MinusOutlined />}
        style={{ marginLeft: 10 }}
        disabled={selected.length === 0}
        onClick={onDeSelectAll}
      >
        {t('operations.deselectAllTimes')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.timeCodes')} modifiers={modifiers}>
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        handleSelect={setSelected}
        onCellClick={onCellEdit}
        extra={extra}
      />
    </Page>
  );
};

export default auth(TimeCodes);
