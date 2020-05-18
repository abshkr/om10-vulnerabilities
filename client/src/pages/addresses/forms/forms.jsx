import React, { useState, useEffect } from 'react';

import { EditOutlined, PlusOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import { AddressCode } from './fields';

import columns from './columns';

import Items from './items';

import { ADDRESSES } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access }) => {
  const [tableAPI, setTableAPI] = useState(null);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const fields = columns(t);

  const IS_CREATING = !value;

  const onItemValidation = items => {
    const errors = [];

    _.forEach(items, item => {
      const keys = Object.keys(item);
      const values = Object.values(item);

      _.forEach(values, (value, index) => {
        if (value === 'Please Select') {
          errors.push({
            field: _.find(fields, ['field', keys[index]])?.headerName,
            message: `Please Fill This Field on Line Item ${values[0]}`
          });
        }
      });
    });

    if (errors.length > 0) {
      _.forEach(errors, error => {
        notification.error({
          message: error.field,
          description: error.message,
          key: error.field
        });
      });
    }

    return errors;
  };


/*
  if (IS_CREATING === false) {
    //value.db_address_lines = addrLines;
    // get the address lines by the address code (value.db_address_key)
    axios
      .post(
        ADDRESSES.LINES, {
        address_code: value?.db_address_key
      })
      .then(response => {
        value.db_address_lines = response.records;
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
  }
*/
  const { resetFields } = form;

  const onComplete = () => {
    handleFormState(false, null);
    mutate(ADDRESSES.READ);
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
        await axios
          .post(IS_CREATING ? ADDRESSES.CREATE : ADDRESSES.UPDATE, values)
          .then(() => {
            onComplete();

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
        await axios
          .post(ADDRESSES.DELETE, value)
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
    if (!value) {
      resetFields();
    }
  }, [resetFields, value]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
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
            type="primary"
            icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
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
            <AddressCode form={form} value={value} />
            <Divider />
            <Items setTableAPIContext={setTableAPI} value={value} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
