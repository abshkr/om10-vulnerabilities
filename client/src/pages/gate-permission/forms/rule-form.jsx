import React, { useState, useEffect, useCallback } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import RuleClass from './fields/rule-class';
import EquipType from './fields/equip-type';
import AuthType from './fields/auth-type';
import ExpiryCheck from './fields/expiry-check';

const TabPane = Tabs.TabPane;

const RuleForm = ({ value, handleCallBack }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  
  const [ ruleCase, setRuleCase ] = useState(value?.rule_case)

  const IS_CREATING = !value;

  const onCaseChange = (v) => {
    setRuleCase(v)
  }
  
  const onFinish = values => {
    values.to_create = IS_CREATING
    handleCallBack(values)
    Modal.destroyAll();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        rule_id: value.rule_id,
      })
    }
  }, [value, ruleCase]);

  return (
    <Form 
      // style={{ width: '40vh' }} 
      layout="vertical" 
      form={form} 
      onFinish={onFinish} 
      scrollToFirstError
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab={t('tabColumns.general')} key="1" style={{ height: '60vh' }}>

          <Form.Item name="rule_id" noStyle>
            <Input type="hidden"/>
          </Form.Item>
          
          <RuleClass value={value} form={form} onCaseChange={onCaseChange}/>
          <EquipType value={value} form={form} enabled={ruleCase==="PRM_EQPT"}/>
          <AuthType value={value} form={form} enabled={ruleCase!=="PRM_EQPT"}/>
          <ExpiryCheck value={value} form={form} />
          
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
            // onClick={onDelete}
          >
            {t('operations.delete')}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default RuleForm;
