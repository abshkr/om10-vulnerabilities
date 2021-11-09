import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';
import jwtDecode from 'jwt-decode';

import api, { ORDER_LISTINGS } from '../../api';

const TerminalList = ({ form, value, listOptions, itemCode, itemTitle, itemRequired, itemDisabled, onChange }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  // const { data: options, isValidating } = useSWR(ORDER_LISTINGS.TERMINAL);

  const { setFieldsValue } = form;

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const site_code = decoded?.site_code;

  const field = t('fields.' + itemTitle);

  const getTerminalsAsync = async () => {
    const results = await api.get(`${ORDER_LISTINGS.TERMINAL}`);

    return results?.data;
  };

  const getTerminals = useCallback(() => {
    setLoading(true);

    api
      .get(ORDER_LISTINGS.TERMINAL)
      .then((response) => {
        if (response?.data?.records?.length > 0) {
          setOptions(response?.data?.records);
        }

        setLoading(false);
      })
      .catch((errors) => {
        setLoading(false);
      });
  }, []);

  const handleSelection = (v) => {
    if (onChange) {
      onChange(v);
    }
  }

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${field}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        [itemCode]: value?.[itemCode]
      });
      handleSelection(value?.[itemCode]);
    }
    else {
      setFieldsValue({
        [itemCode]: site_code,
      });
      handleSelection(site_code);
    }
  }, [value, site_code, setFieldsValue]);

  useEffect(() => {
    if (!listOptions || listOptions?.length === 0) {
      getTerminals();
    }
    else {
      setLoading(true);
      setOptions(listOptions);
      setLoading(false);
    }
  }, [listOptions, getTerminals]);

  return (
    <Form.Item 
      name={itemCode} 
      label={field} 
      extra 
      rules={[{ 
        required: itemRequired === undefined ? false : itemRequired, 
        validator: validate, 
        min: 1, 
        max: 16 
      }]}
    >
      <Select 
        showSearch 
        allowClear
        disabled={itemDisabled === undefined ? false : itemDisabled}
        loading={loading} 
        onChange={handleSelection}
        optionFilterProp="children" 
        filterOption={(input, option) => option?.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {options?.map((item) => (
          <Select.Option key={item?.term_id} value={item?.term_code}>
            {`${item?.term_code} - ${item?.term_name}`}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default TerminalList;
