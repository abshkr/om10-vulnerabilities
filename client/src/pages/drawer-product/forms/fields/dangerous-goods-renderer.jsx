import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select, Row, Col, Divider } from 'antd';
import useSWR from 'swr';

import { DRAWER_PRODUCTS } from '../../../../api';

const Generic = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(DRAWER_PRODUCTS.DANGEROUS_GOODS);

  const handleChange = (value) => {
    setFieldsValue({
      dg_link_id: value,
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        dg_link_id: value.dg_link_id,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="dg_link_id" label={t('fields.dangerousGoods')}>
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        onChange={handleChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectGenericName') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        dropdownRender={(menu) => (
          <div style={{ width: '500px' }}>
            <Row gutter={[8, 0]}>
              <Col span={5}>
                <b>{t('fields.material')}</b>
              </Col>
              <Col span={9}>
                <b>{t('fields.adrDesc')}</b>
              </Col>
              <Col span={5}>
                <b>{t('fields.adrName')}</b>
              </Col>
              <Col span={5}>
                <b>{t('fields.adrType')}</b>
              </Col>
            </Row>
            {menu}
          </div>
        )}
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.material}>
            <Row gutter={[8, 0]}>
              <Col span={5}>{item.material}</Col>
              <Col span={9}>{item.adr_desc1}</Col>
              <Col span={5}>{item.adr_name}</Col>
              <Col span={5}>{item.adr_type}</Col>
            </Row>
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Generic;
