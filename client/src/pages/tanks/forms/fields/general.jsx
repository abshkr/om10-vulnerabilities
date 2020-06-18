import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber, Input, Select, Divider, Row, Col } from 'antd';
import useSWR from 'swr';

import { TANK_STATUS, TANKS } from '../../../../api';

const General = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: areas, isValidating: areasLoading } = useSWR(TANK_STATUS.AREAS);
  const { data: status, isValidating: statusLoading } = useSWR(TANK_STATUS.STATUS);
  const { data: methods, isValidating: methodsLoading } = useSWR(TANK_STATUS.METHODS);
  const { data: products, isValidating: baseLoading } = useSWR(TANKS.BASE_LIST);

  const isLoading = areasLoading || statusLoading || methodsLoading || baseLoading;

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_location: value.tank_location,
        tank_status: value.tank_status,
        tank_gaugingmthd: value.tank_gaugingmthd,
        tank_ullage: value.tank_ullage,
        tank_sulphur: value.tank_sulphur,
        tank_flashpoint: value.tank_flashpoint,
        tank_code: value.tank_code,
        tank_base: value.tank_base,
        tank_name: value.tank_name,
        tank_dtol_volume: value.tank_dtol_volume,
        tank_mtol_percent: value.tank_mtol_percent,
        tank_mtol_volume: value.tank_mtol_volume,
        tank_dtol_percent: value.tank_dtol_percent,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="tank_code" label={t('fields.tankCode')}>
            <Input disabled style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="tank_location" label={t('fields.area')}>
            <Select
              loading={isLoading}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {areas?.records.map((item, index) => (
                <Select.Option key={index} value={item.area_k}>
                  {item.area_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="tank_status" label={t('fields.tankStatus')}>
            <Select
              loading={isLoading}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {status?.records.map((item, index) => (
                <Select.Option key={index} value={item.tank_status_id}>
                  {item.tank_status_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="tank_density"
            label={`${t('fields.density')} (${value?.tank_base_dens_lo} - ${value?.tank_base_dens_hi}) ${
              `@30ºC` || '@15ºC/59ºF'
            }`}
          >
            <InputNumber
              min={value?.tank_base_dens_lo}
              max={value?.tank_base_dens_hi}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="tank_base" label={t('fields.baseProductName')}>
            <Select
              loading={isLoading}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {products?.records.map((item, index) => (
                <Select.Option key={index} value={item.base_code}>
                  {item.base_desc}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="tank_gaugingmthd" label={t('fields.gaugingMethod')}>
            <Select
              loading={isLoading}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {methods?.records.map((item, index) => (
                <Select.Option key={index} value={item.gauge_method_id}>
                  {item.gauge_method_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="tank_ullage" label={t('fields.ullage')}>
            <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="tank_sulphur" label={`${t('fields.sulphur')} (${t('units.sulphur')})`}>
            <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="tank_flashpoint" label={`${t('fields.flashPoint')} (${t('units.degC')})`}>
            <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="tank_name" label={t('fields.tankName')}>
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="tank_dtol_percent" label={`${t('fields.dailyVarianceLimit')} (%)`}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="tank_dtol_volume"
            label={`${t('fields.dailyVarianceLimit')} (${t('units.volume')})`}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="tank_mtol_percent" label={`${t('fields.monthlyVarianceLimit')} (%)`}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="tank_mtol_volume"
            label={`${t('fields.monthlyVarianceLimit')} (${t('units.volume')})`}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default General;
