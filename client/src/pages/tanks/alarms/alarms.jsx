import React from 'react';

import { QuestionCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Form, Modal, Button, Card, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import Levels from '../forms/fields/levels';
import { TANKS } from '../../../api';

const Alarms = ({ selected, access, isLoading }) => {
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
        await axios
          .post(TANKS.UPDATE, values)
          .then(() => {
            mutate(TANKS.READ);

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
        <Levels form={form} value={selected} />
      </Card>
    </Form>
  );
};

export default Alarms;
