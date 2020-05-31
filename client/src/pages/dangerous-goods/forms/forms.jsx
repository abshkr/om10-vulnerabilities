import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, notification, Modal, Input } from 'antd';
import { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';
import useSWR from 'swr';

import { DANGEROUS_GOODS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value }) => {
  const { data: payload, isValidating } = useSWR(DANGEROUS_GOODS.READ);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue } = form;

  const IS_CREATING = !value;

  const onFinish = value => {
    console.log(value)
    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(IS_CREATING ? DANGEROUS_GOODS.CREATE : DANGEROUS_GOODS.UPDATE, value)
          .then(
            axios.spread(response => {
              Modal.destroyAll();

              mutate(DANGEROUS_GOODS.READ);
              notification.success({
                message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
                description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess')
              });
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: IS_CREATING ? t('descriptions.createFailed') : t('descriptions.updateFailed')
            });
          });
      }
    });
  };

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(DANGEROUS_GOODS.DELETE, value)
          .then(
            axios.spread(response => {
              mutate(DANGEROUS_GOODS.READ);
              Modal.destroyAll();
              notification.success({
                message: t('messages.deleteSuccess'),
                description: `${t('descriptions.deleteSuccess')}`
              });
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: t('descriptions.deleteFailed')
            });
          });
      }
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        material: value.material,
        adr_desc1: value.adr_desc1,
        adr_desc2: value.adr_desc2,
        adr_desc3: value.adr_desc3,
        adr_name: value.adr_name,
        adr_type: value.adr_type,
        adr_fareklasse: value.adr_fareklasse,
        protect_freeze: value.protect_freeze,
        certific_of_analysis: value.certific_of_analysis,
        additional_txt: value.additional_txt,
        placard_notation1: value.placard_notation1,
        placard_notation2: value.placard_notation2,
        placard_notation3: value.placard_notation3,
        placard_notation4: value.placard_notation4,
        stcc_code: value.stcc_code,
      })
  
      // setMaterial(value.material)
    }
  }, [value, setFieldsValue, payload]);

  const materialValidate = (rule, input) => {
    const match = _.find(payload?.records, ['material', input]);

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.material')}`);
    }

    if (input && !!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    return Promise.resolve();
  };

  const formLayout = {
    labelCol: { span: 8 },
    labelAlign: "left",
    // marginRight: 10
    // wrapperCol: { span: 16 },
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} scrollToFirstError {...formLayout}>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} key="1">
            <Form.Item name="material" label={t('fields.material')} rules={[{ required: true, validator: materialValidate}]}>
              <Input />
            </Form.Item>
            
            <Form.Item name="adr_name" label={t('fields.adrName')} rules={[{ required: true}]}>
              <Input />
            </Form.Item>
            
            <Form.Item name="adr_type" label={t('fields.adrType')} rules={[{ required: true}]}>
              <Input />
            </Form.Item>
            
            <Form.Item name="adr_desc1" label={t('fields.adrDesc')} rules={[{ required: true}]}>
              <Input />
            </Form.Item>
            
            <Form.Item name="adr_desc2" label={t('fields.adrDesc2')} >
              <Input />
            </Form.Item>
            
            <Form.Item name="adr_desc3" label={t('fields.adrDesc3')} >
              <Input />
            </Form.Item>
            
            <Form.Item name="adr_fareklasse" label={t('fields.adrFareklasse')} >
              <Input />
            </Form.Item>
            
            <Form.Item name="protect_freeze" label={t('fields.protectFreeze')} >
              <Input />
            </Form.Item>
            
            <Form.Item name="certific_of_analysis" label={t('fields.certificOfAnalysis')} >
              <Input />
            </Form.Item>
            
            <Form.Item name="additional_txt" label={t('fields.additionalTxt')} >
              <Input />
            </Form.Item>
            
            <Form.Item name="placard_notation1" label={t('fields.placardNotation1')} >
              <Input />
            </Form.Item>
            
            <Form.Item name="placard_notation1" label={t('fields.placardNotation1')} >
              <Input />
            </Form.Item>
            
            <Form.Item name="placard_notation2" label={t('fields.placardNotation2')} >
              <Input />
            </Form.Item>
            
            <Form.Item name="placard_notation3" label={t('fields.placardNotation3')} >
              <Input />
            </Form.Item>
            
            <Form.Item name="placard_notation4" label={t('fields.placardNotation4')} >
              <Input />
            </Form.Item>
            
            <Form.Item name="stcc_code" label={t('fields.stccCode')} >
              <Input />
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
