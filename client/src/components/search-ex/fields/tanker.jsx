import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input, Select } from 'antd';
import { LockOutlined, PaperClipOutlined } from '@ant-design/icons';
import { LOAD_SCHEDULES } from 'api';
import useSWR from 'swr';

const TankerSearch = ({ carrier }) => {
  const { data: options, isValidating } = useSWR(
    `${LOAD_SCHEDULES.TANKERS_BY_CARRIER}?tnkr_carrier=${carrier}`
  );

  const { t } = useTranslation();

  return (
    <Form.Item name="tnkr_code" label={t('fields.tanker')}>
      {!!carrier ? (
        <Select
          loading={isValidating}
          allowClear
          showSearch
          optionFilterProp="children"
          placeholder={t('placeholder.selectTanker')}
        >
          {options?.records.map((item, index) => (
            <Select.Option
              key={index}
              value={item.tnkr_code}
              disabled={item.tnkr_lock === 'Y' || item.tnkr_archive === 'Y'}
            >
              {`${item.tnkr_code}${item.tnkr_name && ' - ' + item.tnkr_name}`}
              {item.tnkr_lock === 'Y' && <LockOutlined style={{ color: 'red' }} />}
              {item.tnkr_archive === 'Y' && <PaperClipOutlined style={{ color: 'red' }} />}
            </Select.Option>
          ))}
        </Select>
      ) : (
        <Input></Input>
      )}
    </Form.Item>
  );
};

export default TankerSearch;
