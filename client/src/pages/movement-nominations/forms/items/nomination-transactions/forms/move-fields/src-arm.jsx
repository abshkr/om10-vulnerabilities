import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import _ from 'lodash';

import { MANUAL_TRANSACTIONS } from '../../../../../../../api';
// import { NOMINATION_TRANSACTIONS } from '../../../../../../../api';

const SourceArm = ({ form, value, setArms, onChange, tank, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(
    // `${NOMINATION_TRANSACTIONS.ARMS}?prod_code=${value?.mvitm_prodcode_from}&prod_cmpy=${value?.mvitm_prodcmpy_from}`,
    `${MANUAL_TRANSACTIONS.GET_PROD_ARMS}?prod_code=${value?.mvitm_prodcode_from}&prod_cmpy=${value?.mvitm_prodcmpy_from}`,
    { refreshInterval: 0 }
  );

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.nomtranFromArm')}`);
      }
    }

    return Promise.resolve();
  };

  const getArmItem = (code, list) => {
    // find the item having a particular stream_armcode
    const values = _.split(code, ' - ');
    let arm_item = _.filter(list, (item) => {
      return values?.[1] === item.stream_baycode && values?.[2] === item.stream_armcode;
      // return code === (item.stream_tankcode + ' - ' + item.stream_baycode + ' - ' + item.stream_armcode);
    });
    console.log('src arm, getArmItem', code, list, arm_item);
    return arm_item;
  };

  const onArmChange = (value) => {
    onChange(getArmItem(value, options?.records));
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mvitm_arm: value.mvitm_arm,
      });

      //onChange(value.mvitm_arm);
      onChange(getArmItem(value.mvitm_arm, options?.records));
    }
  }, [value, options, setFieldsValue, onChange]);

  useEffect(() => {
    if (options) {
      setArms(options?.records);
    }
  }, [options, setArms]);

  return (
    <Form.Item
      name="mvitm_arm"
      label={t('fields.nomtranFromArm')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        loading={isValidating}
        allowClear
        showSearch
        onChange={onArmChange}
        // disabled={pageState !== 'disposal' ? true : (tank?.length > 0 ? true : false)}
        // disabled={!(!(pageState==='disposal' && (tank?.length > 0)) && (pageState!=='transfer') && (pageState !== 'receipt'))}
        /* {!(currentState=='Disposal' && fromTank.selectedIndex>-1) && (currentState!=='Transfer') && (currentState!='Receipt')}
        {!(pageState=='disposal' && tank?.length !== 0) && (pageState!=='transfer') && (pageState!=='receipt')}
        {(pageState!=='disposal' || tank?.length === 0) && (pageState!=='transfer') && (pageState!=='receipt')}
        {!((pageState!=='disposal' || tank?.length === 0) && (pageState!=='transfer') && (pageState!=='receipt'))}
        {(!(pageState!=='disposal' || tank?.length === 0) || (pageState==='transfer') || (pageState==='receipt'))}
        {(pageState==='disposal' && tank?.length !== 0) || (pageState==='transfer') || (pageState==='receipt')} */
        disabled={
          (pageState === 'disposal' && tank?.length !== 0) ||
          pageState === 'transfer' ||
          pageState === 'receipt'
        }
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectFromArm') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {_.filter(options?.records, (o) => o.stream_bclass_code !== '6' && o.rat_seq === '1')?.map(
          (item, index) => (
            /* <Select.Option key={index} value={item.stream_armcode}>
            {item.stream_armcode}
          </Select.Option> */
            <Select.Option
              key={index}
              value={`${item.stream_tankcode} - ${item.stream_baycode} - ${item.stream_armcode}`}
              item={item}
            >
              {`${item.stream_baycode} - ${item.stream_armcode}`}
              {/* {`${item.ratio_seq}: ${item.stream_tankcode} - ${item.stream_baycode} - ${item.stream_armcode}`} */}
            </Select.Option>
          )
        )}
      </Select>
    </Form.Item>
  );
};

export default SourceArm;
