import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input, Select, Col, Tag } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { PRODUCT_MOVEMENTS } from '../../../../api';

const Destination = ({ form, value, base, setBase, setType, setLoading }) => {
  const { t } = useTranslation();

  const { data: types, typesLoading } = useSWR(PRODUCT_MOVEMENTS.TYPES);
  const { data: bases, basesLoading } = useSWR(PRODUCT_MOVEMENTS.BASES);
  const { data: tanks, tanksLoading } = useSWR(PRODUCT_MOVEMENTS.TANKS);
  const { data: loads } = useSWR(
    `${PRODUCT_MOVEMENTS.IS_BAY_LOADING}?pmv_number=${value?.pmv_number || -1}`,
    {
      refreshInterval: 3000,
    }
  );

  const [source, setSource] = useState(undefined);
  const [bayLoading, setBayLoading] = useState(false);

  const { setFieldsValue } = form;

  const isLoading = typesLoading || tanksLoading;

  const validateType = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.destinationType')}`);
    }

    return Promise.resolve();
  };

  const validateBase = (rule, input) => {
    if (rule.required && (input === '' || !input)) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.destinationBase')}`);
    }

    return Promise.resolve();
  };

  const validateCode = (rule, input) => {
    if (rule.required && (input === '' || !input)) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.destinationUnit')}`);
    }

    return Promise.resolve();
  };

  const validateOtherCode = (rule, input) => {
    if (rule.required && (input === '' || !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.destinationUnit')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 40) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }

    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    return Promise.resolve();
  };

  const onTypeChanged = (value) => {
    setSource(value);
    setFieldsValue({
      pmv_dst_base: undefined,
      pmv_dstcode: undefined,
    });
    setBase(undefined);
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        pmv_dsttype: value.pmv_dsttype,
        pmv_dstcode: value.pmv_dstcode,
        pmv_dst_base: value.pmv_dst_base,
      });
      setSource(value.pmv_dsttype);
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    setType(source);
  }, [source]);

  useEffect(() => {
    if (loads && loads.records.length > 0) {
      const item = _.find(loads.records, (o) => o?.tank_code === value.pmv_dstcode);
      if (!item) {
        setBayLoading(false);
        setLoading(false);
      } else {
        if (item?.count_trsa > 0) {
          setBayLoading(true);
          setLoading(true);
        } else {
          setBayLoading(false);
          setLoading(false);
        }
      }
    } else {
      setBayLoading(false);
      setLoading(false);
    }
  }, [loads]);

  return (
    <>
      <Col span={8}>
        <Form.Item
          name="pmv_dsttype"
          label={t('fields.destinationType')}
          rules={[{ required: true, validator: validateType }]}
        >
          <Select
            dropdownMatchSelectWidth={false}
            allowClear
            loading={isLoading}
            showSearch
            disabled={value}
            onChange={onTypeChanged}
            optionFilterProp="children"
            placeholder={t('placeholder.selectDestinationType')}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {types?.records.map((item, index) => (
              <Select.Option key={index} value={item.pmv_id}>
                {item.pmv_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name="pmv_dst_base"
          label={t('fields.destinationBase')}
          rules={[{ required: source === '3', validator: validateBase }]}
        >
          <Select
            dropdownMatchSelectWidth={false}
            allowClear
            loading={basesLoading}
            showSearch
            disabled={value || (!value && source !== '3')}
            onChange={setBase}
            optionFilterProp="children"
            placeholder={!value ? t('placeholder.selectDstBaseProduct') : null}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {bases
              ? bases.records.map((item, index) => (
                  <Select.Option key={index} value={item.base_code}>
                    {item.base_desc}
                  </Select.Option>
                ))
              : null}
          </Select>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name="pmv_dstcode"
          label={
            source === '3' && bayLoading ? (
              <>
                {t('fields.destinationUnit')} &nbsp;&nbsp;&nbsp;
                <Tag color={'red'}>{t('descriptions.bayLoading')}</Tag>
              </>
            ) : (
              t('fields.destinationUnit')
            )
          }
          rules={[{ required: true, validator: source === '3' ? validateCode : validateOtherCode }]}
        >
          {source === '3' ? (
            <Select
              dropdownMatchSelectWidth={false}
              allowClear
              loading={isLoading}
              showSearch
              disabled={value || !source}
              optionFilterProp="children"
              placeholder={t('placeholder.setDestinationUnit')}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {_.filter(tanks?.records, (item) => {
                return item.tank_base === base;
              }).map((item, index) => (
                <Select.Option key={index} value={item.tank_code}>
                  {item.tank_code}
                </Select.Option>
              ))}
            </Select>
          ) : (
            <Input disabled={value || !source} />
          )}
        </Form.Item>
      </Col>
    </>
  );
};

export default Destination;
