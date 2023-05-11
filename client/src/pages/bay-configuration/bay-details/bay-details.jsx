import React from 'react';

import { DeleteOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Form, Modal, Button, Card, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import _ from 'lodash';

import { Details } from '../forms/tabs';
import api, { BAY_CONFIGURATION } from '../../../api';
import { getDensityRange } from '../../../utils';

const BayDetails = ({ selected, access, isLoading, config, setSelected }) => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const onFinish = async () => {
    const values = await form.validateFields();
    const updValues = {
      ba_code: values?.ba_code,
      ba_load_option: values?.ba_load_option,
      ba_lock: values?.ba_lock,
    };

    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(BAY_CONFIGURATION.UPDATE_BAY, updValues)
          .then(() => {
            mutate(BAY_CONFIGURATION.READ);
            // to refresh changes in the form, need to NULL the selected
            setSelected({
              ...selected,
              ...values,
            });

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
          .post(BAY_CONFIGURATION.DELETE, selected)
          .then(() => {
            mutate(BAY_CONFIGURATION.READ);

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

            {/* <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!access?.canDelete}
              onClick={onDelete}
            >
              {t('operations.delete')}
            </Button> */}
          </Form.Item>,
        ]}
      >
        <Details form={form} value={selected} config={config} />
      </Card>
    </Form>
  );
};

export default BayDetails;
