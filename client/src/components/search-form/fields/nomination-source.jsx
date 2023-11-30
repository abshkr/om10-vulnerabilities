import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { MOVEMENT_NOMIATIONS } from 'api';

const NominationSource = ({ value, onChange }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(MOVEMENT_NOMIATIONS.SOURCES);

  return (
    <Form.Item name="mv_srctype" label={t('fields.nominationSource')}>
      <Select
        disabled={!!value}
        loading={isValidating}
        showSearch
        allowClear
        popupMatchSelectWidth={false}
        onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectNominationSource') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.movsource_type_id}>
            {item.movsource_type_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default NominationSource;
