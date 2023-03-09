import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input, Select, Col, Tag } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { PRODUCT_MOVEMENTS } from '../../../../api';

const Source = ({ form, value, base, setBase, setType }) => {
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
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.sourceType')}`);
    }

    return Promise.resolve();
  };

  const validateBase = (rule, input) => {
    if (rule.required && (input === '' || !input)) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.sourceBase')}`);
    }

    return Promise.resolve();
  };

  const validateCode = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.sourceUnit')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        pmv_srctype: value.pmv_srctype,
        pmv_srccode: value.pmv_srccode,
        pmv_src_base: value.pmv_src_base,
      });
      setSource(value.pmv_srctype);
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    setType(source);
  }, [source]);

  useEffect(() => {
    if (loads && loads.records.length > 0) {
      const item = _.find(loads.records, (o) => o?.tank_code === value.pmv_srccode);
      if (!item) {
        setBayLoaded(false);
      } else {
        if (item?.bay_avl_sum > 0 || item?.bay_cvl_sum > 0 || item?.bay_kg_sum > 0) {
          setBayLoaded(true);
        } else {
          setBayLoaded(false);
        }
      }
    } else {
      setBayLoaded(false);
    }
  }, [loads]);

  return (
    <>
      <Col span={8}>
        <Form.Item
          name="pmv_srctype"
          label={t('fields.sourceType')}
          rules={[{ required: true, validator: validateType }]}
        >
          <Select
            dropdownMatchSelectWidth={false}
            allowClear
            loading={isLoading}
            showSearch
            onChange={setSource}
            disabled={value}
            optionFilterProp="children"
            placeholder={t('placeholder.selectSourceType')}
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
          name="pmv_src_base"
          label={t('fields.sourceBase')}
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
            placeholder={!value ? t('placeholder.selectSrcBaseProduct') : null}
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
          name="pmv_srccode"
          label={
            source === '3' && bayLoaded ? (
              <>
                {t('fields.sourceUnit')} &nbsp;&nbsp;&nbsp;
                <Tag color={'red'}>{t('descriptions.bayLoading')}</Tag>
              </>
            ) : (
              t('fields.sourceUnit')
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
              disabled={!source}
              optionFilterProp="children"
              placeholder={t('placeholder.setSourceUnit')}
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

export default Source;
