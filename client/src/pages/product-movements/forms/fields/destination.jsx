import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input, Select, Col, Tag } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { PRODUCT_MOVEMENTS } from '../../../../api';

const Destination = ({ form, value, base, setBase, setType, setLoaded }) => {
  const { t } = useTranslation();

  const { data: types, typesLoading } = useSWR(PRODUCT_MOVEMENTS.TYPES);
  const { data: bases, basesLoading } = useSWR(PRODUCT_MOVEMENTS.BASES);
  const { data: tanks, tanksLoading } = useSWR(PRODUCT_MOVEMENTS.TANKS);
  const { data: loads } = useSWR(
    `${PRODUCT_MOVEMENTS.TANK_BAY_LOADED}?pmv_number=${value?.pmv_number || -1}`,
    {
      refreshInterval: 5000,
    }
  );

  const [source, setSource] = useState(undefined);
  const [bayLoaded, setBayLoaded] = useState(false);

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
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.destinationUnit')}`);
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
        setBayLoaded(false);
        setLoaded(false);
      } else {
        if (item?.bay_avl_sum > 0 || item?.bay_cvl_sum > 0 || item?.bay_kg_sum > 0) {
          setBayLoaded(true);
          setLoaded(true);
        } else {
          setBayLoaded(false);
          setLoaded(false);
        }
      }
    } else {
      setBayLoaded(false);
      setLoaded(false);
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
            source === '3' && bayLoaded ? (
              <>
                {t('fields.destinationUnit')} &nbsp;&nbsp;&nbsp;
                <Tag color={'red'}>{t('descriptions.bayLoading')}</Tag>
              </>
            ) : (
              t('fields.destinationUnit')
            )
          }
          rules={[{ required: true, validator: validateCode }]}
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
            <Input disabled={!source} />
          )}
        </Form.Item>
      </Col>
    </>
  );
};

export default Destination;
