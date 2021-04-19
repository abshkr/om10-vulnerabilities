import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, notification, message, Modal, Input, Drawer } from 'antd';
import { mutate } from 'swr';

import _ from 'lodash';
import useSWR from 'swr';

import api, { DANGEROUS_GOODS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, setFilterValue }) => {
  const { data: payload, isValidating } = useSWR(DANGEROUS_GOODS.READ);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue } = form;

  const IS_CREATING = !value;

  const onComplete = (material) => {
    handleFormState(false, null);
    if (material) {
      setFilterValue('' + material);
    }
    mutate(DANGEROUS_GOODS.READ);
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      Modal.confirm({
        title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
        okText: IS_CREATING ? t('operations.create') : t('operations.update'),
        okType: 'primary',
        icon: <QuestionCircleOutlined />,
        cancelText: t('operations.no'),
        centered: true,
        onOk: async () => {
          await api
            .post(IS_CREATING ? DANGEROUS_GOODS.CREATE : DANGEROUS_GOODS.UPDATE, values)
            .then((response) => {
              onComplete(values?.material);

              notification.success({
                message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
                description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess'),
              });
            })

            .catch((error) => {
              notification.error({
                message: error.message,
                description: IS_CREATING ? t('descriptions.createFailed') : t('descriptions.updateFailed'),
              });
            });
        },
      });
    } catch (error) {
      message.error({
        key: 'submit',
        content: t('descriptions.validationFailed'),
      });
    }
  };

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(DANGEROUS_GOODS.DELETE, value)
          .then((response) => {
            onComplete();

            notification.success({
              message: t('messages.deleteSuccess'),
              description: `${t('descriptions.deleteSuccess')}`,
            });
          })

          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.deleteFailed'),
            });
          });
      },
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
      });

      // setMaterial(value.material)
    } else if (!value && !visible) {
      form.resetFields();
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

    const len = new TextEncoder().encode(input).length;
    if (input && len > 40) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }

    if (input != input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input != input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    return Promise.resolve();
  };

  const validate = (rule, input) => {
    /*
    rule:
      {
        "required": true,
        "title": "ADR Name",
        "maxLength": 32,
        "field": "adr_name",
        "fullField": "adr_name",
        "type": "string"
      }
    */
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${rule.title}`);
      }
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > rule.maxLength) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${rule.maxLength} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  const formLayout = {
    labelCol: { span: 8 },
    labelAlign: 'left',
    // marginRight: 10
    // wrapperCol: { span: 16 },
  };

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="35vw"
      visible={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => handleFormState(false, null)}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            htmlType="submit"
            style={{ float: 'right', marginRight: 5 }}
            onClick={onFinish}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!access?.canDelete}
              onClick={onDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
        </>
      }
    >
      <Form form={form} scrollToFirstError {...formLayout}>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane
            className="ant-tab-window"
            tab={t('tabColumns.general')}
            key="1"
            style={{ height: '80vh' }}
          >
            <Form.Item
              name="material"
              label={t('fields.material')}
              rules={[
                { required: true, title: t('fields.material'), maxLength: 40, validator: materialValidate },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="adr_name"
              label={t('fields.adrName')}
              rules={[{ required: true, title: t('fields.adrName'), maxLength: 32, validator: validate }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="adr_type"
              label={t('fields.adrType')}
              rules={[{ required: true, title: t('fields.adrType'), maxLength: 16, validator: validate }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="adr_desc1"
              label={t('fields.adrDesc')}
              rules={[{ required: true, title: t('fields.adrDesc'), maxLength: 256, validator: validate }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="adr_desc2"
              label={t('fields.adrDesc2')}
              rules={[{ required: false, title: t('fields.adrDesc2'), maxLength: 256, validator: validate }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="adr_desc3"
              label={t('fields.adrDesc3')}
              rules={[{ required: false, title: t('fields.adrDesc3'), maxLength: 256, validator: validate }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="adr_fareklasse"
              label={t('fields.adrFareklasse')}
              rules={[
                { required: false, title: t('fields.adrFareklasse'), maxLength: 16, validator: validate },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="protect_freeze"
              label={t('fields.protectFreeze')}
              rules={[
                { required: false, title: t('fields.protectFreeze'), maxLength: 64, validator: validate },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="certific_of_analysis"
              label={t('fields.certificOfAnalysis')}
              rules={[
                {
                  required: false,
                  title: t('fields.certificOfAnalysis'),
                  maxLength: 16,
                  validator: validate,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="additional_txt"
              label={t('fields.additionalTxt')}
              rules={[
                { required: false, title: t('fields.additionalTxt'), maxLength: 256, validator: validate },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="placard_notation1"
              label={t('fields.placardNotation1')}
              rules={[
                { required: false, title: t('fields.placardNotation1'), maxLength: 16, validator: validate },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="placard_notation2"
              label={t('fields.placardNotation2')}
              rules={[
                { required: false, title: t('fields.placardNotation2'), maxLength: 16, validator: validate },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="placard_notation3"
              label={t('fields.placardNotation3')}
              rules={[
                { required: false, title: t('fields.placardNotation3'), maxLength: 16, validator: validate },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="placard_notation4"
              label={t('fields.placardNotation4')}
              rules={[
                { required: false, title: t('fields.placardNotation4'), maxLength: 16, validator: validate },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="stcc_code"
              label={t('fields.stccCode')}
              rules={[{ required: false, title: t('fields.stccCode'), maxLength: 32, validator: validate }]}
            >
              <Input />
            </Form.Item>
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
