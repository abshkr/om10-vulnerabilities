import React, { useEffect, useState, useCallback } from 'react';
import { TANKER_LIST } from 'api';
import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

const TnkrEtyp = ({ value, onChange }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(TANKER_LIST.TOTAL_COMPOSITION);

  return (
    <Form.Item name="tnkr_etp" label={t('fields.equipmentType')}>
      <Select
        dropdownMatchSelectWidth={false}
        dropdownStyle={{ maxWidth: '40vw' }}
        loading={isValidating}
        disabled={!!value}
        showSearch
        allowClear
        onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectEquipmentType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records?.map((item, index) => (
          <Select.Option key={index} value={_.toNumber(item.etyp_id)}>
            {/* {`${item.etyp_id} - ${item.etyp_title} `} */}
            {`${item.etyp_id}[${item.etyp_title}]: [${t('fields.compartments')}:${
              //item?.compartments?.length
              item?.cmptnu
            }]${item?.etyp_class === '0' ? '' : '[' + t('fields.comboType') + ']'}${
              item?.compartments?.length === 0 ? '' : '[' + item?.compartments?.[0]?.cmpt_units + ']'
            }${item?.compartments?.map((item2, index) => `[${item2.safefill}]`)}`}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default TnkrEtyp;
