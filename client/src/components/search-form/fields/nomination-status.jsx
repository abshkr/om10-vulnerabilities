import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { MOVEMENT_NOMIATIONS } from 'api';

const NominationStatus = ({ value, onChange }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(MOVEMENT_NOMIATIONS.STATUS);

  return (
    <Form.Item name="mv_status" label={t('fields.nominationStatus')}>
      <Select
        disabled={!!value}
        loading={isValidating}
        showSearch
        allowClear
        popupMatchSelectWidth={false}
        onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectNominationStatus') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.movstatus_type_id}>
            {item.movstatus_type_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default NominationStatus;
