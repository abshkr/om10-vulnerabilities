import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  UnlockOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, notification, Modal, Drawer, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';

import _ from 'lodash';

import {
  Depot,
  Owner,
  Code,
  Name,
  EquipmentType,
  Carrier,
  TotalTrips,
  LastTrip,
  Comments,
  TankerPrompt,
  Pin,
  MaxKg,
  Destination,
  LastDepot,
  CurrentDepot,
  Locks,
  SLP,
} from './fields';
import api, { TANKER_LIST } from '../../../api';
import Compartments from './compartments';
import { Expiry, CheckList } from '../../../components';
import columns from './columns';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { data: payload } = useSWR(TANKER_LIST.READ, { refreshInterval: 0 });
  const [equipment, setEquipment] = useState(undefined);

  const fields = columns(t);
  const IS_CREATING = !value;

  const onComplete = () => {
    handleFormState(false, null);
    mutate(TANKER_LIST.READ);
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    let matches = [];

    const compartmentCounter = {};

    _.forEach(values?.tnkr_equips, (equipment, index) => {
      compartmentCounter[index + 1] = equipment?.compartments?.length;
    });

    const compartmentArray = Object.values(compartmentCounter);
    const noCompartments = compartmentArray.includes(0) || compartmentArray?.length === 0;

    const createPrompt = noCompartments ? t('prompts.zeroEquipmentSelected') : t('prompts.create');

    if (!IS_CREATING) {
      matches = _.filter(payload?.records, (object) => {
        return (
          object.tnkr_name === value.tnkr_name &&
          object.tnkr_code !== value.tnkr_code &&
          object.tnkr_name !== ''
        );
      });
    }

    Modal.confirm({
      title: IS_CREATING ? createPrompt : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      width: noCompartments ? '40vw' : null,
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      content:
        matches.length > 0 ? (
          <CheckList form={form} matches={matches} columns={fields} rowKey="tnkr_code" />
        ) : null,
      onOk: async () => {
        await api
          .post(IS_CREATING ? TANKER_LIST.CREATE : TANKER_LIST.UPDATE, values)
          .then((response) => {
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

  const onUnlock = () => {
    api
      .post(`${TANKER_LIST.UNLOCK_ALL}?tnkr_code=${value.tnkr_code}`)
      .then((response) => {
        onComplete();

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

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(TANKER_LIST.DELETE, value)
          .then((response) => {
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
  }, [value, visible]);

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
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => handleFormState(false, null)}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
            htmlType="submit"
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
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
          <TabPane tab={t('tabColumns.identification')} forceRender={true} key="1">
            <Depot form={form} value={value} />
            <Owner form={form} value={value} />
            <Code form={form} value={value} />
            <Carrier form={form} value={value} />
            <Name form={form} value={value} />

            <Row gutter={[12, 0]}>
              <Col span={12}>
                <TotalTrips form={form} value={value} />
              </Col>

              <Col span={12}>
                <LastTrip form={form} value={value} />
              </Col>
            </Row>

            <Comments form={form} value={value} />
            <TankerPrompt form={form} value={value} />

            <Row gutter={[12, 0]}>
              <Col span={12}>
                <Pin form={form} value={value} />
              </Col>

              <Col span={12}>
                <MaxKg form={form} value={value} />
              </Col>
            </Row>

            <Destination form={form} value={value} />
            <LastDepot form={form} value={value} />
            <CurrentDepot form={form} value={value} />

            <Locks form={form} value={value} />
            <SLP form={form} value={value} />
          </TabPane>

          <TabPane tab={t('tabColumns.configuration')} forceRender={true} key="3">
            <EquipmentType form={form} value={value} onChange={setEquipment} />
            <Compartments form={form} value={value} equipment={equipment} />
          </TabPane>

          <TabPane tab={t('tabColumns.expiryDates')} forceRender={true} key="4">
            <Expiry form={form} value={value} type={TANKER_LIST.EXPIRY} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
