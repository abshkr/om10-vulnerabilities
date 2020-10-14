import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  UnlockOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, notification, Modal, Drawer, Row, Col, Divider } from 'antd';
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
  LegacyExpires,
} from './fields';
import api, { TANKER_LIST } from '../../../api';
import Compartments from './compartments';
import { Expiry, CheckList } from '../../../components';
import columns from './columns';
import { SETTINGS } from '../../../constants';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, setFilterValue, expiryDateMode, expiryTypes }) => {
  console.log(expiryTypes);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;

  const { data: payload } = useSWR(TANKER_LIST.READ, { refreshInterval: 0 });
  const [equipment, setEquipment] = useState(undefined);

  const fields = columns(t);
  const IS_CREATING = !value;

  const onComplete = (tnkr_code) => {
    resetFields();
    handleFormState(false, null);
    mutate(TANKER_LIST.READ);
    if (tnkr_code) {
      setFilterValue('' + tnkr_code);
    } else {
      setFilterValue(' ');
    }
  };

  const onFormClosed = () => {
    resetFields();
    setEquipment(undefined);
    handleFormState(false, null);
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    let matches = [];

    let eqpt_selected = true;
    if (!values.tnkr_equips) {
      eqpt_selected = false;
    } else {
      _.forEach(values?.tnkr_equips, (equipment, index) => {
        console.log(equipment);
        if (!equipment.eqpt_id) {
          eqpt_selected = false;
        }
      });
    }

    const createPrompt = !eqpt_selected ? t('prompts.zeroEquipmentSelected') : t('prompts.create');

    if (!IS_CREATING) {
      matches = _.filter(payload?.records, (object) => {
        return (
          object.tnkr_name === value.tnkr_name &&
          object.tnkr_code !== value.tnkr_code &&
          object.tnkr_name !== ''
        );
      });
    }

    values.tnkr_lic_exp = values?.tnkr_lic_exp?.format(SETTINGS.DATE_TIME_FORMAT);
    values.tnkr_dglic_exp = values?.tnkr_dglic_exp?.format(SETTINGS.DATE_TIME_FORMAT);
    values.tnkr_ins_exp = values?.tnkr_ins_exp?.format(SETTINGS.DATE_TIME_FORMAT);

    Modal.confirm({
      title: IS_CREATING ? createPrompt : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      width: !eqpt_selected ? '40vw' : null,
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
            onComplete(values.tnkr_code);

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
    Modal.confirm({
      title: t('prompts.unlockAll'),
      okText: t('operations.yes'),
      // okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        api
          .post(`${TANKER_LIST.UNLOCK_ALL}?tnkr_code=${value.tnkr_code}`)
          .then((response) => {
            onComplete(value.tnkr_code);

            notification.success({
              message: t('messages.unlockSuccess'),
              description: `${t('descriptions.unlockAllSuccess')}`,
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
      onClose={onFormClosed}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="60vw"
      visible={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={onFormClosed}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
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
      <Form 
        layout="vertical" 
        form={form} 
        onFinish={onFinish} 
        scrollToFirstError
      >
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane
            tab={t('tabColumns.identification')}
            style={{ height: 'calc(100vh - 150px)', overflowY: 'scroll' }}
            forceRender={true}
            key="1"
          >
            <Row gutter={[8, 2]}>
              <Col span={8}>
                <Depot form={form} value={value} />
              </Col>
              <Col span={8}>
                <Owner form={form} value={value} />
              </Col>
              <Col span={8}>
                <Carrier form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              <Col span={8}>
                <Code form={form} value={value} />
              </Col>
              <Col span={8}>
                <Name form={form} value={value} />
              </Col>
              <Col span={8}>
                <TotalTrips form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              <Col span={8}>
              <LastTrip form={form} value={value} />
              </Col>
              <Col span={16}>
              <Comments form={form} value={value} />
              </Col>
            </Row>
            
            <Row gutter={[8, 2]}>
              <Col span={8}>
                <TankerPrompt form={form} value={value} />
              </Col>
              <Col span={8}>
                <Pin form={form} value={value} />
              </Col>
              <Col span={8}>
                <MaxKg form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              <Col span={8}>
                <SLP form={form} value={value} />
              </Col>
              <Col span={16}>
                <Locks form={form} value={value} />
              </Col>
            </Row>
            
            <Divider>{t('tabColumns.configuration')} </Divider>

            <EquipmentType form={form} value={value} onChange={setEquipment} />
            <Compartments form={form} value={value} equipment={equipment} />

            <Divider>{t('tabColumns.expiryDates')} </Divider>

            {expiryDateMode === '1' ?
              <LegacyExpires form={form} value={value} expiryTypes={expiryTypes?.records}></LegacyExpires>
              :
              <Expiry form={form} value={value} type={TANKER_LIST.EXPIRY} />
            }
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
