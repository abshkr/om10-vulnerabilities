import React, { useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import _ from 'lodash';

import api, { HAZCHEM_CODES } from 'api';

import {
  Id,
  SubsidiaryRisk,
  EmergencyProcedureGuide,
  EmergencyActionCode,
  PackagingMethod,
  TechnicalName,
  PackagingGroup,
  UNNumber,
  Class,
} from './fields';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, setFilterValue }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;

  const { resetFields } = form;

  const onComplete = (hzcf_id) => {
    handleFormState(false, null);
    if (hzcf_id) {
      setFilterValue('' + hzcf_id);
    }
    mutate(HAZCHEM_CODES.READ);
  };

  const onFinish = async () => {
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
          .post(IS_CREATING ? HAZCHEM_CODES.CREATE : HAZCHEM_CODES.UPDATE, values)
          .then(() => {
            onComplete(values?.hzcf_id);

            notification.success({
              message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
              description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess'),
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <DeleteOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(HAZCHEM_CODES.DELETE, value)
          .then(() => {
            onComplete();

            notification.success({
              message: t('messages.deleteSuccess'),
              description: `${t('descriptions.deleteSuccess')}`,
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  useEffect(() => {
    if (!value && !visible) {
      form.resetFields();
    }
  }, [resetFields, value, visible]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="30vw"
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
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
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
      <Form layout="vertical" form={form} scrollToFirstError>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <Id form={form} value={value} />
            <SubsidiaryRisk form={form} value={value} />
            <Class form={form} value={value} />
            <EmergencyProcedureGuide form={form} value={value} />
            <EmergencyActionCode form={form} value={value} />
            <PackagingMethod form={form} value={value} />
            <TechnicalName form={form} value={value} />
            <PackagingGroup form={form} value={value} />
            <UNNumber form={form} value={value} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
