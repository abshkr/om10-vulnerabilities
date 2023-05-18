import React, { useState, useEffect, useCallback } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, Select, InputNumber, Checkbox, Row, Col, Popover, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import { DRAWER_PRODUCTS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, handleBaseCallBack, config, tableBases }) => {
  const { data: payload } = useSWR(`${DRAWER_PRODUCTS.AVAILABLE_BASES}`);
  let baseProducts = payload?.records;

  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const [pitem_bltol_flag, setFlag] = useState(value?.pitem_bltol_flag);
  const [adtvFlag, setAdtvFlag] = useState(
    value?.pitem_base_class === '6' || value?.pitem_base_class === '11'
  );

  const IS_CREATING = !value;

  const validateBase = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.baseProduct')}`);
    }

    return Promise.resolve();
  };

  const validateRatio = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.pitem_ratio_value')}`);
    }

    return Promise.resolve();
  };

  const validatePercent = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(
        `${t('validate.set')} ─ ${adtvFlag ? t('fields.pitemRatioPPM') : t('fields.pitemRatioPercent')}`
      );
    }

    return Promise.resolve();
  };

  const onChangeBase = (v) => {
    const item = _.find(baseProducts, (o) => o?.base_code === v);
    if (!item) {
      setAdtvFlag(false);
    } else {
      setAdtvFlag(item?.bclass_no === '6' || item?.bclass_no === '11');
    }
  };

  const onCheck = (v) => {
    setFlag(v.target.checked);
    setFieldsValue({
      pitem_bltol_flag: v.target.checked,
    });
  };

  const onCheckHotMain = (v) => {
    setFlag(v.target.checked);
    setFieldsValue({
      pitem_hot_main: v.target.checked,
    });
  };

  const onFinish = (values) => {
    values.to_create = IS_CREATING;
    const baseItem = _.find(baseProducts, (item) => {
      return item.base_code === values.pitem_base_code;
    });
    values.pitem_base_name = baseItem.base_name;
    values.pitem_pidx_code = baseItem.base_pidx_code;
    values.pitem_bclass_name = baseItem.bclass_desc;

    values.pitem_base_class = baseItem.bclass_no;
    values.pitem_adtv_flag = adtvFlag; //baseItem.base_adtv==='0' ? false : true;
    values.pitem_hot_check =
      baseItem.base_hot_check === '' ? null : baseItem.base_hot_check === '0' ? false : true;
    values.pitem_bclass_dens_lo = baseItem.bclass_dens_lo;
    values.pitem_bclass_dens_hi = baseItem.bclass_dens_hi;
    values.pitem_bclass_vcf_alg = baseItem.bclass_vcf_alg;
    values.pitem_bclass_temp_lo = baseItem.bclass_temp_lo;
    values.pitem_bclass_temp_hi = baseItem.bclass_temp_hi;

    if (config?.siteRecipeOnPercent) {
      if (adtvFlag) {
        values.pitem_ratio_value = !values.pitem_ratio_percent_ppm
          ? value?.pitem_ratio_value
          : values.pitem_ratio_percent_ppm;
      } else {
        let ratio = !values.pitem_ratio_percent_ppm
          ? value?.pitem_ratio_value
          : values.pitem_ratio_percent_ppm * 10000;

        values.pitem_ratio_value = ratio;
      }
    } else {
      values.pitem_ratio_percent_ppm = value?.pitem_ratio_percent_ppm;
    }

    handleBaseCallBack(values);
    Modal.destroyAll();
  };

  const onDelete = (values) => {
    values.to_delete = true;
    handleBaseCallBack(values);
    Modal.destroyAll();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        pitem_ratio_value: value.pitem_ratio_value,
        pitem_ratio_percent_ppm: value.pitem_ratio_percent_ppm,
        pitem_bltol_ntol: value.pitem_bltol_ntol,
        pitem_bltol_flag: value.pitem_bltol_flag,
        pitem_bltol_ptol: value.pitem_bltol_ptol,
        pitem_base_code: value.pitem_base_code,
        pitem_hot_main: value.pitem_hot_main,
      });
    }
  }, [value]);

  const popupText = (
    <Popover
      placement="right"
      title={
        <span style={{ fontWeight: 'bold', fontSize: '24px' }}>
          {t('descriptions.blendToleranceNoteTitle')}
        </span>
      }
      content={
        <div>
          <p>
            {t('descriptions.blendToleranceNoteLine1')}
            <br></br>
            {t('descriptions.blendToleranceNoteLine2')}
            <br></br>
            {t('descriptions.blendToleranceNoteLine3')}
            <br></br>
            {t('descriptions.blendToleranceNoteLine4')}
            <br></br>
            <b>{t('descriptions.blendToleranceNoteLine5')}</b>
            <br></br>
            <table border="1" style={{ width: '100%', textAlign: 'center' }}>
              <tr style={{ fontWeight: 'bold' }}>
                <td>{t('descriptions.blendToleranceLabelBase')}</td>
                <td>{t('descriptions.blendToleranceLabelRecipe')}</td>
                <td>{t('descriptions.blendToleranceLabelRecipe')} %</td>
                <td>+{t('descriptions.blendToleranceLabelTol')}</td>
                <td>-{t('descriptions.blendToleranceLabelTol')}</td>
                <td style={{ fontWeight: 'normal' }}>{t('descriptions.blendToleranceLabelMax')}</td>
                <td style={{ fontWeight: 'normal' }}>{t('descriptions.blendToleranceLabelMin')}</td>
              </tr>
              <tr style={{ fontWeight: 'bold' }}>
                <td>A</td>
                <td>1000</td>
                <td>62.46%</td>
                <td>10%</td>
                <td>-10%</td>
                <td style={{ fontWeight: 'normal' }}>68.71%</td>
                <td style={{ fontWeight: 'normal' }}>56.21%</td>
              </tr>
              <tr style={{ fontWeight: 'bold' }}>
                <td>B</td>
                <td>600</td>
                <td>37.48%</td>
                <td>20%</td>
                <td>-5%</td>
                <td style={{ fontWeight: 'normal' }}>44.97%</td>
                <td style={{ fontWeight: 'normal' }}>35.60%</td>
              </tr>
              <tr style={{ fontWeight: 'bold' }}>
                <td>C</td>
                <td>1</td>
                <td>0.062%</td>
                <td>20%</td>
                <td>-10%</td>
                <td style={{ fontWeight: 'normal' }}>0.075%</td>
                <td style={{ fontWeight: 'normal' }}>0.056%</td>
              </tr>
              <tr style={{ fontWeight: 'bold' }}>
                <td>&nbsp;</td>
                <td>1601</td>
                <td>100.000%</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </table>
            {t('descriptions.blendToleranceNoteLine61')} <b>5000</b>{' '}
            {t('descriptions.blendToleranceNoteLine62')} <b>{t('descriptions.blendToleranceLabelDrawX')}</b>{' '}
            {t('descriptions.blendToleranceNoteLine63')}
            <br></br>
            {t('descriptions.blendToleranceNoteLine7')} <b>-{t('descriptions.blendToleranceLabelTol')}</b>
            <br></br>
            <table border="1" style={{ width: '100%', textAlign: 'center' }}>
              <tr style={{ fontWeight: 'bold' }}>
                <td>{t('descriptions.blendToleranceLabelDrawX')}</td>
                <td>{t('descriptions.blendToleranceLabelQty')} (5000L)</td>
                <td>+{t('descriptions.blendToleranceLabelTol')}</td>
                <td>+{t('descriptions.blendToleranceLabelTol')}(L)</td>
                <td>-{t('descriptions.blendToleranceLabelTol')}</td>
                <td>-{t('descriptions.blendToleranceLabelTol')}(L)</td>
                <td>{t('descriptions.blendToleranceLabelStatus')}</td>
              </tr>
              <tr>
                <td>{t('descriptions.blendToleranceLabelBaseA')}</td>
                <td>3247</td>
                <td>10%</td>
                <td>3435.35</td>
                <td>-10%</td>
                <td>2810.74</td>
                <td style={{ fontWeight: 'bold', color: 'green' }}>
                  {t('descriptions.blendToleranceLabelOk')}
                </td>
              </tr>
              <tr>
                <td>{t('descriptions.blendToleranceLabelBaseB')}</td>
                <td>1750</td>
                <td>20%</td>
                <td>2248.59</td>
                <td>-5%</td>
                <td>1780.14</td>
                <td style={{ fontWeight: 'bold', color: 'red' }}>
                  {t('descriptions.blendToleranceLabelError')}
                </td>
              </tr>
              <tr>
                <td>{t('descriptions.blendToleranceLabelBaseC')}</td>
                <td>3.123</td>
                <td>20%</td>
                <td>3.75</td>
                <td>-10%</td>
                <td>2.81</td>
                <td style={{ fontWeight: 'bold', color: 'green' }}>
                  {t('descriptions.blendToleranceLabelOk')}
                </td>
              </tr>
            </table>
          </p>
        </div>
      }
    >
      <QuestionCircleOutlined style={{ transform: 'scale(1.4)', color: '#0054a4', fontWeight: 900 }} />
    </Popover>
  );

  const popupText2 = (
    <Popover
      placement="right"
      title={<span style={{ fontWeight: 'bold', fontSize: '24px' }}>Blend Tolerance</span>}
      content={
        <div>
          <p>
            All Drawer products are defined in terms of their constituent Base Products and the ratios.
            <br></br>
            These percentage tolerances refer to the quantity of this base product.<br></br>
            If Lower limit &lt; Actual delivered Base &lt; Upper limit then it is within tolerance.<br></br>
            If Actual delivered Base &lt; Lower limit OR Actual delivered &gt; Upper limit then tolerance has
            failed.<br></br>
            <b>Example of 3 product Blend:</b>
            <br></br>
            <table border="1" style={{ width: '100%', textAlign: 'center' }}>
              <tr style={{ fontWeight: 'bold' }}>
                <td>Base Product</td>
                <td>Recipe</td>
                <td>Recipe %</td>
                <td>+Tol</td>
                <td>-Tol</td>
                <td style={{ fontWeight: 'normal' }}>Maximum</td>
                <td style={{ fontWeight: 'normal' }}>Minimum</td>
              </tr>
              <tr style={{ fontWeight: 'bold' }}>
                <td>A</td>
                <td>1000</td>
                <td>62.46%</td>
                <td>10%</td>
                <td>-10%</td>
                <td style={{ fontWeight: 'normal' }}>68.71%</td>
                <td style={{ fontWeight: 'normal' }}>56.21%</td>
              </tr>
              <tr style={{ fontWeight: 'bold' }}>
                <td>B</td>
                <td>600</td>
                <td>37.48%</td>
                <td>20%</td>
                <td>-5%</td>
                <td style={{ fontWeight: 'normal' }}>44.97%</td>
                <td style={{ fontWeight: 'normal' }}>35.60%</td>
              </tr>
              <tr style={{ fontWeight: 'bold' }}>
                <td>C</td>
                <td>1</td>
                <td>0.062%</td>
                <td>20%</td>
                <td>-10%</td>
                <td style={{ fontWeight: 'normal' }}>0.075%</td>
                <td style={{ fontWeight: 'normal' }}>0.056%</td>
              </tr>
              <tr style={{ fontWeight: 'bold' }}>
                <td>&nbsp;</td>
                <td>1601</td>
                <td>100.000%</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </table>
            As an example <b>5000</b> litres of <b>Drawer Product X</b> would produce the following if the
            actual quantity of <br></br>
            the blend product was lower than the amount required by the receipe by more then the <b>-Tol</b>
            <br></br>
            <table border="1" style={{ width: '100%', textAlign: 'center' }}>
              <tr style={{ fontWeight: 'bold' }}>
                <td>Drawer Product X</td>
                <td>Qty (5000L)</td>
                <td>+Tol</td>
                <td>+Tol(L)</td>
                <td>-Tol</td>
                <td>-Tol(L)</td>
                <td>STATUS</td>
              </tr>
              <tr>
                <td>Base Product A actual</td>
                <td>3247</td>
                <td>10%</td>
                <td>3435.35</td>
                <td>-10%</td>
                <td>2810.74</td>
                <td style={{ fontWeight: 'bold', color: 'green' }}>OK</td>
              </tr>
              <tr>
                <td>Base Product B actual</td>
                <td>1750</td>
                <td>20%</td>
                <td>2248.59</td>
                <td>-5%</td>
                <td>1780.14</td>
                <td style={{ fontWeight: 'bold', color: 'red' }}>Out of Tolerance</td>
              </tr>
              <tr>
                <td>Base Product C actual</td>
                <td>3.123</td>
                <td>20%</td>
                <td>3.75</td>
                <td>-10%</td>
                <td>2.81</td>
                <td style={{ fontWeight: 'bold', color: 'green' }}>OK</td>
              </tr>
            </table>
          </p>
        </div>
      }
    >
      <QuestionCircleOutlined style={{ transform: 'scale(1.2)' }} />
    </Popover>
  );

  return (
    <div>
      <Form
        // style={{ width: '40vh' }}
        initialValues={{
          pitem_bltol_ntol: -10,
          pitem_bltol_ptol: 10,
        }}
        layout="vertical"
        form={form}
        onFinish={onFinish}
        scrollToFirstError
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1" style={{ height: '60vh' }}>
            <Form.Item
              name="pitem_base_code"
              label={t('fields.pitemBaseProduct')}
              rules={[{ required: true, validator: validateBase }]}
            >
              <Select
                dropdownMatchSelectWidth={false}
                allowClear
                // loading={isValidating}
                showSearch
                onChange={onChangeBase}
                optionFilterProp="children"
                placeholder={!value ? t('placeholder.selectBaseProduct') : null}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {baseProducts
                  ? baseProducts.map((item, index) => (
                      <Select.Option key={index} value={item.base_code}>
                        {item.base_detail}
                      </Select.Option>
                    ))
                  : null}
              </Select>
            </Form.Item>

            {!config?.siteRecipeOnPercent && (
              <Form.Item
                name="pitem_ratio_value"
                label={t('fields.pitemRatioValue')}
                rules={[{ required: true, validator: validateRatio }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            )}

            {config?.siteRecipeOnPercent && (
              <Form.Item
                name="pitem_ratio_percent_ppm"
                label={
                  adtvFlag
                    ? t('fields.pitemRatioPPM') + ' (1 ppm ~ 1,000,000 ppm)'
                    : t('fields.pitemRatioPercent') + '(1% ~ 100%)'
                }
                rules={[{ required: true, validator: validatePercent }]}
              >
                <InputNumber
                  min={1}
                  max={adtvFlag ? 1000000 : 100}
                  precision={adtvFlag ? 0 : 4}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            )}

            {config?.siteRecipeOnPercent && (
              <div style={{ color: 'red', paddingBottom: 20 }}>{t('descriptions.ratioPercentPPM')}</div>
            )}

            <Card
              size="small"
              title={t('descriptions.blendToleranceCardTitle')}
              hoverable
              headStyle={{ paddingRight: 10 }}
              style={{ marginBottom: 16 }}
              extra={popupText}
            >
              <Form.Item name="pitem_bltol_flag" label={''} valuePropName="checked">
                <Checkbox
                  defaultChecked={value?.pitem_bltol_flag}
                  onChange={onCheck}
                  style={{ color: '#0054a4', fontWeight: 500 }}
                >
                  {t('fields.pitemBltolFlag2')}
                </Checkbox>
              </Form.Item>

              <Row gutter={[8, 4]}>
                <Col span={12}>
                  <Form.Item
                    name="pitem_bltol_ntol"
                    label={t('fields.pitemBltolNtol2')}
                    rules={[{ required: false }]}
                  >
                    <InputNumber
                      min={-200}
                      max={0}
                      // defaultValue={-10}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace('%', '')}
                      disabled={!pitem_bltol_flag}
                      // onChange={onChangeNtol}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="pitem_bltol_ptol"
                    label={t('fields.pitemBltolPtol2')}
                    rules={[{ required: false }]}
                  >
                    <InputNumber
                      min={0}
                      max={200}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace('%', '')}
                      disabled={!pitem_bltol_flag}
                      // onChange={onChangePtol}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {config.manageHotProduct && (
              <Form.Item name="pitem_hot_main" label={t('fields.pitemHotMain')} valuePropName="checked">
                <Checkbox defaultChecked={value?.pitem_hot_main} onChange={onCheckHotMain} />
              </Form.Item>
            )}
          </TabPane>
        </Tabs>

        <Form.Item>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => Modal.destroyAll()}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            htmlType="submit"
            style={{ float: 'right', marginRight: 5 }}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormModal;
