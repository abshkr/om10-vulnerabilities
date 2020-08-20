import React, { useState, useEffect } from 'react';

import { Form, Checkbox, Select, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import api, { DRAWER_PRODUCTS, LOAD_SCHEDULES } from 'api';

const LinkedDrawerProducts = ({ value, form }) => {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [drawer, setDrawer] = useState(value?.prod_2nd_drawer);
  const [flag, setFlag] = useState(value?.prod_check_2nd_drawer)
  const { setFieldsValue } = form;

  const { data: drawers, isValidating } = useSWR(DRAWER_PRODUCTS.DRAWERS);

  useEffect(() => {
    api
    .get(LOAD_SCHEDULES.DRAWER_PRODUCTS, {
      params: {
        drawer_code: drawer,
      },
    })
    .then((res) => setProducts(res.data.records));
  }, [drawer, setProducts]);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prod_2nd_drawer: value.prod_2nd_drawer,
        prod_2nd_product: value.prod_2nd_product,
        prod_check_2nd_drawer: value.prod_check_2nd_drawer,
      });
      setFlag(value.prod_check_hot_volume);
      setDrawer(value.prod_2nd_drawer);
    }
    
  }, [value, setFieldsValue, setFlag, setDrawer]);

  const onCheck = v => {
    setFlag(v.target.checked)
    /* setFieldsValue({
      prod_check_2nd_drawer: v.target.checked,
    }); */
  }

  const handleDrawerChange = (value) => {
    setDrawer(value);
    setFieldsValue({
      prod_2nd_product: undefined,
    });
  };

  return (
    <>
      <Row gutter={[8, 2]}>
        <Col span={8}>
          <Form.Item name="prod_check_2nd_drawer" label={t('fields.prodCheck2ndDrawer2')} >
            <Checkbox 
              checked={flag} 
              onChange={onCheck}
              disabled={false}
            ></Checkbox>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="prod_2nd_drawer" label={t('fields.prod2ndDrawer2')}>
            <Select
              dropdownMatchSelectWidth={false}
              loading={isValidating}
              disabled={!flag}
              showSearch
              allowClear
              onChange={handleDrawerChange}
              optionFilterProp="children"
              placeholder={!value ? t('placeholder.selectDrawer') : null}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {drawers?.records.map((item, index) => (
                <Select.Option key={index} value={item.cmpy_code}>
                  {item.cmpy_desc}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
        <Form.Item name="prod_2nd_product" label={t('fields.prod2ndProduct2')}>
            <Select
              dropdownMatchSelectWidth={false}
              loading={isValidating}
              disabled={!flag || !drawer}
              showSearch
              allowClear
              optionFilterProp="children"
              placeholder={!value ? t('placeholder.selectDrawerProduct') : null}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {products.map((item, index) => (
                <Select.Option key={index} value={item.prod_code}>
                  {item.prod_code + ' - ' + item.prod_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>

  );
};

export default LinkedDrawerProducts;
