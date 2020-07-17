import React from 'react';

import { QuestionCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Form, Modal, Button, Card, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';

import _ from 'lodash';

import GaugingForm from '../forms/fields/gauging';
import api, { TANKS } from '../../../api';

const Gauging = ({ selected, access, isLoading, setSelected }) => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const onFinish = async () => {
    const values = await form.validateFields();

    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(TANKS.UPDATE, values)
          .then(() => {
            mutate(TANKS.READ);
            // to refresh changes in the form, need to NULL the selected
            setSelected(null);

            notification.success({
              message: t('messages.updateSuccess'),
              description: t('messages.updateSuccess'),
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

  return (
    <Form layout="vertical" onFinish={onFinish} form={form} scrollToFirstError initialValues={selected}>
      <Card
        loading={isLoading}
        actions={[
          <Form.Item>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={onFinish}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!access?.canUpdate}
            >
              {t('operations.update')}
            </Button>
          </Form.Item>,
        ]}
      >
        <Form.Item name="tank_code" noStyle />
        <GaugingForm form={form} value={selected} />
      </Card>
    </Form>
  );
};

export default Gauging;
