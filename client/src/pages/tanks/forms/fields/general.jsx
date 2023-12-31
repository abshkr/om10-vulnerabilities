import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber, Input, Select, Row, Col } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { ORDER_LISTINGS, TANK_STATUS, TANKS, BASE_PRODUCTS } from '../../../../api';
import { VCFManager } from '../../../../utils';
import { InputNumber as OmegaInputNumber } from '../../../../components';

const General = ({ form, value, config, densRange }) => {
  const { t } = useTranslation();

  const { data: areas, isValidating: areasLoading } = useSWR(TANK_STATUS.AREAS);
  const { data: status, isValidating: statusLoading } = useSWR(TANK_STATUS.STATUS);
  const { data: methods, isValidating: methodsLoading } = useSWR(TANK_STATUS.METHODS);
  const { data: products, isValidating: baseLoading } = useSWR(TANKS.BASE_LIST);
  const { data: terminals, isValidating: terminalLoading } = useSWR(ORDER_LISTINGS.TERMINAL);

  const { data: baseItem } = useSWR(`${BASE_PRODUCTS.READ}?base_code=${value?.tank_base}`);

  const isLoading = areasLoading || statusLoading || methodsLoading || baseLoading || terminalLoading;

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    const limit = rule?.max || 256;

    if (input === '' || (input !== 0 && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${rule?.label}`);
    }

    if (input && input.length > limit) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${limit} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  const validatePercentage = (rule, input) => {
    if (input && parseInt(input) < -100) {
      return Promise.reject(`${t('placeholder.limit')}: ${-100} ─ ${t('descriptions.valueTooLow')}`);
    }

    if (input && parseInt(input) > 100) {
      return Promise.reject(`${t('placeholder.limit')}: ${100} ─ ${t('descriptions.valueTooHigh')}`);
    }

    return Promise.resolve();
  };

  const validateQuantity = (rule, input) => {
    if (input && !_.isInteger(parseInt(input))) {
      return Promise.reject(`${t('placeholder.wrongType')}: ${t('types.integer')}`);
    }

    if (input && input.length > 126) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 126 ─ ${t('descriptions.maxCharacters')}`);
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
        tank_viscosity: value.tank_viscosity,
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
        <Col span={10}>
          <Form.Item name="tank_code" label={t('fields.tankCode')}>
            <Input disabled style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={14}>
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
        <Col span={10}>
          <Form.Item name="tank_terminal" label={t('fields.terminal')}>
            <Select
              popupMatchSelectWidth={false}
              allowClear
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
                  {item.term_desc}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={14}>
          <Form.Item name="tank_status" label={t('fields.tankStatus')}>
            <Select
              popupMatchSelectWidth={false}
              allowClear
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
        <Col span={10}>
          <Form.Item name="tank_base" label={t('fields.baseProduct')}>
            <Select
              popupMatchSelectWidth={false}
              allowClear
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

        <Col span={14}>
          <OmegaInputNumber
            form={form}
            value={value?.tank_density}
            name="tank_density"
            label={`${t('fields.standardDensity')} (${densRange?.min} - ${densRange?.max})${t(
              'units.kg/m3'
            )} ${`@ ${t('fields.referenceTemperature')} ${
              config?.referenceTemperature
            }ºC/${VCFManager.temperatureC2F(config?.referenceTemperature)}ºF`}`}
            min={densRange?.min}
            max={densRange?.max}
            style={{ width: '100%' }}
            precision={config.precisionDensity}
            required={config?.siteMandatoryTankCalcFields}
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
        <Col span={10}>
          <Form.Item
            name="tank_gaugingmthd"
            label={t('fields.gaugingMethod')}
            rules={[{ required: true, validator: validate, label: t('fields.gaugingMethod') }]}
          >
            <Select
              popupMatchSelectWidth={false}
              allowClear
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

        <Col span={14}>
          <Form.Item name="tank_location" label={t('fields.area')}>
            <Select
              popupMatchSelectWidth={false}
              allowClear
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
        {!config?.siteUllageCalcAuto && (
          <Col span={6}>
            <Form.Item
              name="tank_ullage"
              label={t('fields.ullage')}
              rules={[{ required: true, validator: validate, label: t('fields.ullage') }]}
            >
              <InputNumber min={-999999999} max={999999999} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        )}

        <Col span={config?.siteUllageCalcAuto ? 10 : 6}>
          <Form.Item name="tank_sulphur" label={`${t('fields.sulphur')} (${t('units.sulphur')})`}>
            <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={!config?.siteTankViscosityEnabled ? 14 : 7}>
          <Form.Item
            name="tank_flashpoint"
            label={`${t('fields.flashPoint')} (${t(`units.${config?.temperatureUnit}`)})`}
          >
            <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        {config?.siteTankViscosityEnabled && (
          <Col span={7}>
            <Form.Item
              name="tank_viscosity"
              label={t('fields.viscosity')}
              // rules={[{ required: false, validator: validate, label: t('fields.tankViscosity') }]}
            >
              <InputNumber
                min={Math.pow(10, -1 * config?.precisionViscosity)}
                max={999999999}
                precision={config?.precisionViscosity}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        )}
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={10}>
          <Form.Item
            name="tank_dtol_percent"
            label={`${t('fields.dailyVarianceLimit')} (%)`}
            rules={[{ validator: validatePercentage }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={14}>
          <Form.Item
            name="tank_dtol_volume"
            label={`${t('fields.dailyVarianceLimit')} (${
              baseItem?.records?.[0]?.base_gainloss_unit === '1' ? t('units.mass') : t('units.volume')
            })`}
            rules={[{ validator: validateQuantity }]}
          >
            <Input
              style={{ width: '100%' }}
              addonAfter={`${
                baseItem?.records?.[0]?.base_gainloss_unit === '1' ? t('units.kg') : t('units.litres')
              }`}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={10}>
          <Form.Item
            name="tank_mtol_percent"
            label={`${t('fields.monthlyVarianceLimit')} (%)`}
            rules={[{ validator: validatePercentage }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={14}>
          <Form.Item
            name="tank_mtol_volume"
            label={`${t('fields.monthlyVarianceLimit')} (${
              baseItem?.records?.[0]?.base_gainloss_unit === '1' ? t('units.mass') : t('units.volume')
            })`}
            rules={[{ validator: validateQuantity }]}
          >
            <Input
              style={{ width: '100%' }}
              addonAfter={`${
                baseItem?.records?.[0]?.base_gainloss_unit === '1' ? t('units.kg') : t('units.litres')
              }`}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default General;
