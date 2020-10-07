import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber, Input, Select, Row, Col } from 'antd';
import useSWR from 'swr';

import { ORDER_LISTINGS, TANK_STATUS, TANKS } from '../../../../api';
import { VCFManager } from '../../../../utils';
import { InputNumber as OmegaInputNumber } from '../../../../components';

const General = ({ form, value, config }) => {
  const { t } = useTranslation();

  const { data: areas, isValidating: areasLoading } = useSWR(TANK_STATUS.AREAS);
  const { data: status, isValidating: statusLoading } = useSWR(TANK_STATUS.STATUS);
  const { data: methods, isValidating: methodsLoading } = useSWR(TANK_STATUS.METHODS);
  const { data: products, isValidating: baseLoading } = useSWR(TANKS.BASE_LIST);
  const { data: terminals, isValidating: terminalLoading } = useSWR(ORDER_LISTINGS.TERMINAL);

  const isLoading = areasLoading || statusLoading || methodsLoading || baseLoading || terminalLoading;

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    const limit = rule?.max || 256;

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${rule?.label}`);
    }

    if (input && input.length > limit) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${limit} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

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
        tank_density: value.tank_density,
        tank_terminal: value.tank_terminal,
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
          <Form.Item
            name="tank_name"
            label={t('fields.tankName')}
            rules={[{ required: true, validator: validate, label: t('fields.tankName'), max: 30 }]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="tank_terminal" label={t('fields.terminal')}>
            <Select
              dropdownMatchSelectWidth={false}
              loading={isLoading}
              showSearch
              disabled={true}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {terminals?.records?.map((item, index) => (
                <Select.Option key={index} value={item.term_code}>
                  {item.term_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="tank_status" label={t('fields.tankStatus')}>
            <Select
              dropdownMatchSelectWidth={false}
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
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="tank_base" label={t('fields.baseProduct')}>
            <Select
              dropdownMatchSelectWidth={false}
              loading={isLoading}
              showSearch
              disabled={true}
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
          <OmegaInputNumber
            form={form}
            value={value?.tank_density}
            name="tank_density"
            label={`${t('fields.standardDensity')} (${value?.tank_base_dens_lo} - ${
              value?.tank_base_dens_hi
            })${t('units.kg/m3')} ${`@ ${t('fields.referenceTemperature')} ${config?.referenceTemperature}ºC/${VCFManager.temperatureC2F(
              config?.referenceTemperature
            )}ºF`}`}
            min={value?.tank_base_dens_lo}
            max={value?.tank_base_dens_hi}
            style={{ width: '100%' }}
            precision={config.precisionDensity}
          />
          {/* <Form.Item
            name="tank_density"
              label={`${t('fields.standardDensity')} (${value?.tank_base_dens_lo} - ${
                value?.tank_base_dens_hi
              }) ${`@ ${t('fields.referenceTemperature')} ${config?.referenceTemperature}ºC/${VCFManager.temperatureC2F(
                config?.referenceTemperature
              )}ºF`}`}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={value?.tank_base_dens_lo}
              max={value?.tank_base_dens_hi}
              precision={config.precisionDensity}
            />
          </Form.Item> */}
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            name="tank_gaugingmthd"
            label={t('fields.gaugingMethod')}
            rules={[{ required: true, validator: validate, label: t('fields.gaugingMethod') }]}
          >
            <Select
              dropdownMatchSelectWidth={false}
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

        <Col span={12}>
          <Form.Item name="tank_location" label={t('fields.area')}>
            <Select
              dropdownMatchSelectWidth={false}
              loading={isLoading}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {areas?.records.map((item, index) => (
                <Select.Option key={index} value={item.area_name}>
                  {item.area_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={8}>
          <Form.Item
            name="tank_ullage"
            label={t('fields.ullage')}
            rules={[{ required: true, validator: validate, label: t('fields.ullage') }]}
          >
            <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="tank_sulphur" label={`${t('fields.sulphur')} (${t('units.sulphur')})`}>
            <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="tank_flashpoint"
            label={`${t('fields.flashPoint')} (${t(`units.${config?.temperatureUnit}`)})`}
          >
            <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
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
