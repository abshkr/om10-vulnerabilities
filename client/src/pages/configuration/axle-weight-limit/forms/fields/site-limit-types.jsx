import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Tooltip, Select } from 'antd';

import { AXLE_WEIGHTS } from 'api';

const SiteAxleLimitTypes = () => {
  const [limit, setLimit] = useState('GML');

  const { t } = useTranslation();

  // const { data: options, isValidating } = useSWR(AXLE_WEIGHTS.LIMIT_TYPES);
  const { data: options, isValidating } = useSWR(AXLE_WEIGHTS.AVAIL_LIMIT_TYPES);

  const onChange = (value) => {
    setLimit(value);
  };

  /* useEffect(() => {
    if (value) {
      setFieldsValue({
        axle_limit_type_id: value.axle_limit_type_id,
      });
    }
  }, [value, setFieldsValue]); */

  return (
    <Tooltip placement="topRight" title={t('descriptions.siteAxleLimitType')}>
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        disabled={false}
        value={limit}
        onChange={onChange}
        showSearch
        placeholder={t('placeholder.selectAxleLimitType')}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.axle_limit_type_code} disabled={false}>
            {item.axle_limit_type_name}
          </Select.Option>
        ))}
      </Select>
    </Tooltip>
  );
};

export default SiteAxleLimitTypes;
