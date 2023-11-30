import React, { useEffect, useState, useCallback } from 'react';
import { PERSONNEL } from 'api';
import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

const PsnlRole = ({ value }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(PERSONNEL.ROLES);

  return (
    <Form.Item name="psnl_role" label={t('fields.role')}>
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectRole') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.role_id}>
            {item.auth_level_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default PsnlRole;
