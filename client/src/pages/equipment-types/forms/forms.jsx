import React, { useEffect } from 'react';

import { EditOutlined, PlusOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import { EQUIPMENT_TYPES } from '../../../api';
import { Code, NonCombination } from './fields';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, isCombination }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;
  const IS_COMBINATION = isCombination;

  const { resetFields } = form;

  const onComplete = () => {
    handleFormState(false, null);
    mutate(EQUIPMENT_TYPES.READ);
  };

  const onFinish = async () => {
    const record = await form.validateFields();

    console.log(record);
    const compartments = [];

    _.forEach(record.names, (value, key) => {
      const payload = {
        cmpt_no: String(key + 1),
        cmpt_units: record?.unit,
        cmpt_capacit: String(value || 0),
      };

      compartments.push(payload);
    });

    const values = {
      etyp_title: record.etyp_title,
      etyp_category: record.etyp_category,
      etyp_isrigid: false,
      etyp_schedul: false,
      compartments,
    };

    console.log(values);
    // Modal.confirm({
    //   title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
    //   okText: IS_CREATING ? t('operations.create') : t('operations.update'),
    //   okType: 'primary',
    //   icon: <QuestionCircleOutlined />,
    //   cancelText: t('operations.no'),
    //   centered: true,
    //   onOk: async () => {
    //     await axios
    //       .post(IS_CREATING ? EQUIPMENT_TYPES.CREATE : EQUIPMENT_TYPES.UPDATE, values)
    //       .then(() => {
    //         onComplete();

    //         notification.success({
    //           message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
    //           description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess'),
    //         });
    //       })
    //       .catch((errors) => {
    //         _.forEach(errors.response.data.errors, (error) => {
    //           notification.error({
    //             message: error.type,
    //             description: error.message,
    //           });
    //         });
    //       });
    //   },
    // });
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
          .post(EQUIPMENT_TYPES.DELETE, value)
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
      width="50vw"
      visible={visible}
      footer={
        <>
          <Button
            type="primary"
            icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
            onClick={onFinish}
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
        </>
      }
    >
      <Form
        layout="vertical"
        form={form}
        scrollToFirstError
        initialValues={{ etyp_category: 'p', unit: '5' }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <Code form={form} value={value} />

            {IS_COMBINATION ? <div></div> : <NonCombination form={form} value={value} />}
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
