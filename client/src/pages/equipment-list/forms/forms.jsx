import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  UnlockOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, notification, Modal, Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import api, { EQUIPMENT_LIST } from '../../../api';
import Compartments from './compartments';

import {
  Owner,
  Code,
  Title,
  EquipmentType,
  Area,
  LoadType,
  EmptyWeight,
  PullingLimit,
  Comments,
  Locks,
} from './fields';
import { Expiry, CheckList, Equipment } from '../../../components';
import columns from './columns';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, setFilterValue }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;

  const { data: payload } = useSWR(EQUIPMENT_LIST.READ);
  const [equipment, setEquipment] = useState(undefined);
  const [image, setImage] = useState(null);

  const fields = columns(t);
  const IS_CREATING = !value;

  const onComplete = (eqpt_id) => {
    handleFormState(false, null);
    if (eqpt_id) {
      if (IS_CREATING) {
        mutate(EQUIPMENT_LIST.READ);
      }
      setFilterValue("" + eqpt_id);
    } else {
      mutate(EQUIPMENT_LIST.READ);
    }
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    let matches = [];

    if (!IS_CREATING) {
      matches = _.filter(payload?.records, (object) => {
        return (
          object.eqpt_title === value.eqpt_title &&
          object.eqpt_code !== value.eqpt_code &&
          object.eqpt_title !== ''
        );
      });
    }

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      content:
        matches.length > 0 ? (
          <CheckList form={form} matches={matches} columns={fields} rowKey="eqpt_code" />
        ) : null,
      onOk: async () => {
        await api
          .post(IS_CREATING ? EQUIPMENT_LIST.CREATE : EQUIPMENT_LIST.UPDATE, values)
          .then((response) => {
            onComplete(value.eqpt_id);

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

  const onUnlock = () => {
    api
      .post(`${EQUIPMENT_LIST.TOGGLE_LOCKS}?eqpt_id=${value.eqpt_id}`)
      .then((response) => {
        onComplete(value.eqpt_id);

        notification.success({
          message: t('messages.unlockSuccess'),
          description: `${t('descriptions.unlockSuccess')}`,
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
  };

  useEffect(() => {
    if (!value && !visible) {
      resetFields();
    }
  }, [value, visible]);

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(EQUIPMENT_LIST.DELETE, value)
          .then((response) => {
            mutate(EQUIPMENT_LIST.READ);
            Modal.destroyAll();
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
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => handleFormState(false, null)}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
            htmlType="button"
            style={{ float: 'right', marginRight: 5 }}
            onClick={onFinish}
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="dashed"
              icon={<UnlockOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onUnlock}
              disabled={!access?.canUpdate}
            >
              {t('operations.unlockAll')}
            </Button>
          )}

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onDelete}
              disabled={!access?.canDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane className="ant-tab-window" tab={t('tabColumns.identification')} forceRender={true} key="1">
            <Owner form={form} value={value} />
            <Code form={form} value={value} />
            <Title form={form} value={value} />
            <Area form={form} value={value} />
            <Locks form={form} value={value} />
            <Comments form={form} value={value} />
            <EmptyWeight form={form} value={value} />
            <PullingLimit form={form} value={value} />
          </TabPane>

          <TabPane
            className="ant-tab-window-no-margin"
            tab={t('tabColumns.equipmentAndSafefill')}
            forceRender={true}
            key="2"
          >
            <Equipment image={image} />
            <LoadType form={form} value={value} />
            <EquipmentType form={form} value={value} onChange={setEquipment} />
            <Compartments form={form} value={value} equipment={equipment} onChange={setImage} />
          </TabPane>
          <TabPane
            className="ant-tab-window-no-margin"
            tab={t('tabColumns.expiryDates')}
            forceRender={true}
            key="4"
          >
            <Expiry form={form} value={value} type={EQUIPMENT_LIST.EXPIRY} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
