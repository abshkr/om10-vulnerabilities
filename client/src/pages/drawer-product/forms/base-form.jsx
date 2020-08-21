import React, { useState, useEffect, useCallback } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, Select, InputNumber, Checkbox, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import { DRAWER_PRODUCTS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, handleBaseCallBack, config }) => {
  const { data: payload } = useSWR(`${DRAWER_PRODUCTS.AVAILABLE_BASES}`);
  let baseProducts = payload?.records;
  
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const [ pitem_bltol_flag, setFlag ] = useState(value?.pitem_bltol_flag);

  const IS_CREATING = !value;

  const validateBase = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.baseProduct')}`);
    }

    return Promise.resolve();
  };

  const validateRatio = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.ratio')}`);
    }

    return Promise.resolve();
  };
  
  const onCheck = v => {
    setFlag(v.target.checked);
    setFieldsValue({
      pitem_bltol_flag: v.target.checked,
    });
  }
  
  const onCheckHotMain = v => {
    setFlag(v.target.checked)
    setFieldsValue({
      pitem_hot_main: v.target.checked,
    });
  }

  const onFinish = values => {
    values.to_create = IS_CREATING;
    const baseItem = _.find(baseProducts, (item) => {
      return item.base_code === values.pitem_base_code;
    });
    values.pitem_base_name = baseItem.base_name;
    values.pitem_bclass_name = baseItem.bclass_desc;

    values.pitem_base_class = baseItem.bclass_no;
    values.pitem_adtv_flag = baseItem.base_adtv==='0' ? false : true;
    values.pitem_hot_check = baseItem.base_hot_check==='' ? null : (baseItem.base_hot_check==='0' ? false : true);
    values.pitem_bclass_dens_lo = baseItem.bclass_dens_lo;
    values.pitem_bclass_dens_hi = baseItem.bclass_dens_hi;
    values.pitem_bclass_vcf_alg = baseItem.bclass_vcf_alg;
    values.pitem_bclass_temp_lo = baseItem.bclass_temp_lo;
    values.pitem_bclass_temp_hi = baseItem.bclass_temp_hi;
    
    handleBaseCallBack(values);
    Modal.destroyAll();
  };

  const onDelete = values => {
    values.to_delete = true;
    handleBaseCallBack(values);
    Modal.destroyAll();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        pitem_ratio_value: value.pitem_ratio_value,
        pitem_bltol_ntol: value.pitem_bltol_ntol,
        pitem_bltol_flag: value.pitem_bltol_flag,
        pitem_bltol_ptol: value.pitem_bltol_ptol,
        pitem_base_code: value.pitem_base_code,
        pitem_hot_main: value.pitem_hot_main,
      })
    }
  }, [value]);

  return (
    <div>
      <Form 
        // style={{ width: '40vh' }} 
        initialValues={{
          pitem_bltol_ntol: -10,
          pitem_bltol_ptol: 10
        }}
        layout="vertical" 
        form={form} 
        onFinish={onFinish} 
        scrollToFirstError
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1" style={{ height: '60vh' }}>
            <Form.Item name="pitem_base_code" label={t('fields.baseProduct')} rules={[{ required: true, validator: validateBase }]}>
              <Select
                dropdownMatchSelectWidth={false}
                // loading={isValidating}
                showSearch
                optionFilterProp="children"
                placeholder={!value ? t('placeholder.selectBaseProduct') : null}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {baseProducts? baseProducts.map((item, index) => (
                  <Select.Option key={index} value={item.base_code}>
                    {item.base_detail}
                  </Select.Option>
                )):null}
              </Select>
            </Form.Item>
            <Form.Item name="pitem_ratio_value" label={t('fields.ratio')} rules={[{ required: true, validator: validateRatio }]}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="pitem_bltol_flag" label={t('fields.blendToleranceCheck')} valuePropName="checked" >
              <Checkbox 
                defaultChecked={value?.pitem_bltol_flag} 
                onChange={onCheck}
              />
            </Form.Item>

            <Row gutter={[8, 20]}>
              <Col span={12}>
                <Form.Item name="pitem_bltol_ntol" label={t('fields.lowerLimit')} rules={[{ required: false }]}>
                  <InputNumber
                    min={-200}
                    max={0}
                    // defaultValue={-10}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                    disabled={!pitem_bltol_flag}
                    // onChange={onChangeNtol}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="pitem_bltol_ptol" label={t('fields.upperLimit')} rules={[{ required: false }]}>
                  <InputNumber
                    min={0}
                    max={200}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                    disabled={!pitem_bltol_flag}
                    // onChange={onChangePtol}
                    style={{ width: '100%' }}
                  />
                </Form.Item>        
              </Col>
            </Row>

            {config.manageHotProduct && (
              <Form.Item name="pitem_hot_main" label={t('fields.pitemHotMain')} valuePropName="checked" >
                <Checkbox 
                  defaultChecked={value?.pitem_hot_main} 
                  onChange={onCheckHotMain}
                />
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
            icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
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
