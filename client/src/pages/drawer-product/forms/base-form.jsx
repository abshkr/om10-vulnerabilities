import React, { useState, useEffect, useCallback } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Select, InputNumber, Checkbox, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import { DRAWER_PRODUCTS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, handleBaseCallBack }) => {
  const { data: payload } = useSWR(`${DRAWER_PRODUCTS.AVAILABLE_BASES}`);
  let baseProducts = payload?.records;
  
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields, setFieldsValue } = form;
  const [ pitem_bltol_flag, setFlag ] = useState(value?.pitem_bltol_flag)

  const IS_CREATING = !value;
  
  const validate = (rule, input) => {
    // if (input === '' || !input) {
    //   return Promise.reject(`${t('fields.loadToleranceCheck')}`);
    // }

    return Promise.resolve();
  };

  const onCheck = v => {
    setFlag(v.target.checked)
    setFieldsValue({
      pitem_bltol_flag: v.target.checked,
    });
  }

  const onFinish = values => {
    values.pitem_base_name = _.filter(baseProducts, (item) => {
      return item.base_code === values.pitem_base_code;
    })[0].base_name
    values.to_create = IS_CREATING
    handleBaseCallBack(values)
    Modal.destroyAll();
  };

  const onDelete = values => {
    values.to_delete = true
    handleBaseCallBack(values)
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
      })
    }
  }, [value]);

  return (
    <div>
      <Form 
        // style={{ width: '40vh' }} 
        layout="vertical" 
        form={form} 
        onFinish={onFinish} 
        scrollToFirstError
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1" style={{ height: '60vh' }}>
            <Form.Item name="pitem_base_code" label={t('fields.baseProduct')} rules={[{ required: true }]}>
              <Select
                // loading={isValidating}
                showSearch
                optionFilterProp="children"
                placeholder={!value ? t('placeholder.selectDepot') : null}
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
            <Form.Item name="pitem_ratio_value" label={t('fields.ratio')} rules={[{ required: true }]}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="pitem_bltol_flag" label={t('fields.blendToleranceCheck')} >
              <Checkbox defaultChecked={value?.pitem_bltol_flag} onChange={onCheck}></Checkbox>
            </Form.Item>

            <Form.Item name="pitem_bltol_ntol" label={t('fields.lowerLimit')} rules={[{ required: false, validator: validate }]}>
              <InputNumber
                defaultValue={-10}
                min={-200}
                max={0}
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
                disabled={!pitem_bltol_flag}
                // onChange={onChangeNtol}
              />
            </Form.Item>

            <Form.Item name="pitem_bltol_ptol" label={t('fields.upperLimit')} rules={[{ required: false, validator: validate }]}>
              <InputNumber
                defaultValue={10}
                min={0}
                max={200}
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
                disabled={!pitem_bltol_flag}
                // onChange={onChangePtol}
              />
            </Form.Item>        
            
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
