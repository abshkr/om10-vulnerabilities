import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import { Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { CheckOutlined, MinusOutlined } from '@ant-design/icons';

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
      <Select style={{ width: 200 }} value={code} onChange={setCode}>
        {payload?.records.map(item => {
          return (
            <Select.Option key={item.tcd_title} value={item.tcd_title}>
              {item.tcd_title}
            </Select.Option>
          );
        })}
      </Select>

      <Button type="primary" icon={<CheckOutlined />} disabled={selected.length === 0}>
        {t('operations.selectAllTimes')}
      </Button>
      <Button type="danger" icon={<MinusOutlined />} disabled={selected.length === 0}>
        {t('operations.deselectAllTimes')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.timeCodes')} modifiers={modifiers}>
      <DataTable columns={fields} data={data} isLoading={isValidating} handleSelect={setSelected} />
    </Page>
  );
};

export default auth(TimeCodes);
