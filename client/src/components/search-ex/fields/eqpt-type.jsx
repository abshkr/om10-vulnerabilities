import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { EQUIPMENT_LIST } from 'api';

const EqptType = ({ value, onChange }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(EQUIPMENT_LIST.TYPES);

  return (
    <Form.Item name="eqpt_etp" label={t('fields.equipmentType')}>
      <Select
        dropdownMatchSelectWidth={false}
        dropdownStyle={{ maxWidth: '30vw' }}
        loading={isValidating}
        disabled={!!value}
        showSearch
        onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectEquipmentType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={_.toNumber(item.etyp_id)}>
            {`${item.etyp_id}[${item.etyp_title}]: [${t('fields.compartments')}:${
              item?.compartments?.length
            }]${
              item?.compartments?.length === 0 ? '' : '[' + item?.compartments?.[0]?.cmpt_units + ']'
            }${item?.compartments?.map((item2, index) => `[${item2.safefill}]`)}`}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default EqptType;
