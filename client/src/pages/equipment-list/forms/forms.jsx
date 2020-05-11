import React, { useState } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  UnlockOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, notification, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import { EQUIPMENT_LIST } from '../../../api';
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

const FormModal = ({ value }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { data: payload } = useSWR(EQUIPMENT_LIST.READ);
  const [equipment, setEquipment] = useState(undefined);
  const [image, setImage] = useState(null);

  const fields = columns(t);
  const IS_CREATING = !value;

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
        await axios
          .post(IS_CREATING ? EQUIPMENT_LIST.CREATE : EQUIPMENT_LIST.UPDATE, values)
          .then(
            axios.spread((response) => {
              Modal.destroyAll();

              mutate(EQUIPMENT_LIST.READ);
              notification.success({
                message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
                description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess'),
              });
            })
          )
          .catch((error) => {
            notification.error({
              message: error.message,
              description: IS_CREATING ? t('descriptions.createFailed') : t('descriptions.updateFailed'),
            });
          });
      },
    });
  };

  const onUnlock = () => {
    axios
      .post(`${EQUIPMENT_LIST.TOGGLE_LOCKS}?eqpt_id=${value.eqpt_id}`)
      .then((response) => {
        mutate(EQUIPMENT_LIST.READ);

        Modal.destroyAll();
        notification.success({
          message: t('messages.unlockSuccess'),
          description: `${t('descriptions.unlockSuccess')}`,
        });
      })

      .catch((error) => {
        notification.error({
          message: error.message,
          description: t('descriptions.unlockFailed'),
        });
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
          .post(EQUIPMENT_LIST.DELETE, value)
          .then(
            axios.spread((response) => {
              mutate(EQUIPMENT_LIST.READ);
              Modal.destroyAll();
              notification.success({
                message: t('messages.deleteSuccess'),
                description: `${t('descriptions.deleteSuccess')}`,
              });
            })
          )
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

      <Form.Item>
        <Button icon={<CloseOutlined />} style={{ float: 'right' }} onClick={() => Modal.destroyAll()}>
          {t('operations.cancel')}
        </Button>

        <Button
          type="primary"
          icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
          htmlType="button"
          style={{ float: 'right', marginRight: 5 }}
          onClick={onFinish}
        >
          {IS_CREATING ? t('operations.create') : t('operations.update')}
        </Button>

        {!IS_CREATING && (
          <Button
            type="dashed"
            icon={<UnlockOutlined />}
            style={{ float: 'right', marginRight: 5 }}
            onClick={onUnlock}
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
          >
            {t('operations.delete')}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default FormModal;
