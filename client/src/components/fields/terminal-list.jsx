import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import api, { ORDER_LISTINGS } from '../../api';

const TerminalList = ({ value, listOptions, itemCode, itemTitle, itemRequired, itemDisabled, onChange }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

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
    <Select 
        showSearch 
        allowClear
        defaultValue={value}
        disabled={itemDisabled === undefined ? false : itemDisabled}
        style={{width: 200}}
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
  );
};

export default TerminalList;
