import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, notification, Modal, Divider, Drawer, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import {
  NominationKey,
  NominationNumber,
  NominationStatus,
  NominationSource,
  Terminal,
  Supplier,
  Carrier,
  Vehicle,
  TPP,
  TransportMode,
  TransportSystem,
  Comments,
  EffectiveFrom,
  ExpiredAfter,
} from './fields';

import columns from './columns';

import Items from './items';

import { MOVEMENT_NOMIATIONS } from '../../../api';
import { SETTINGS } from '../../../constants';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, url, locateNomination }) => {
  const [tableAPI, setTableAPI] = useState(null);
  const [carrier, setCarrier] = useState(null);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue, resetFields, validateFields } = form;

  const fields = columns(t);

  const IS_CREATING = !value;

  const onFormClosed = () => {
    handleFormState(false, null);
  };

  const onComplete = (nomination) => {
    handleFormState(false, null);
    if (nomination) {
      locateNomination(nomination);
    } else {
      mutate(url);
    }
  };

  const onItemValidation = (items) => {
    const errors = [];

    _.forEach(items, (item) => {
      const keys = Object.keys(item);
      const values = Object.values(item);

      _.forEach(values, (value, index) => {
        if (value === t('placeholder.selectPlease')) {
          if (!_.find(fields, ['field', keys[index]])) {
            console.log(fields, keys[index], value);
          }

          errors.push({
            field: _.find(fields, ['field', keys[index]])?.headerName,
            message: `Please Fill This Field on Line Item ${values[0]}`,
          });
        }
      });
    });

    if (errors.length > 0) {
      _.forEach(errors, (error) => {
        notification.error({
          message: error.field,
          description: error.message,
          key: error.field,
        });
      });
    }

    return errors;
  };

  //const onFinish = (values) => {
  const onFinish = async () => {
    const values = await validateFields();
    console.log('form values', values);
    const items = [];

    tableAPI.forEachNodeAfterFilterAndSort((rowNode, index) => {
      items.push(rowNode.data);
    });

    const errors = onItemValidation(items);

    if (errors.length === 0) {
      values.items = items;

      values.mv_dtim_effect = values.mv_dtim_effect?.format(SETTINGS.DATE_TIME_FORMAT);
      values.mv_dtim_expiry = values.mv_dtim_expiry?.format(SETTINGS.DATE_TIME_FORMAT);
      if (!!value && !!value.mv_id) {
        values.mv_id = value.mv_id;
      }

      Modal.confirm({
        title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
        okText: IS_CREATING ? t('operations.create') : t('operations.update'),
        okType: 'primary',
        icon: <QuestionCircleOutlined />,
        cancelText: t('operations.no'),
        centered: true,
        onOk: async () => {
          await axios
            .post(IS_CREATING ? MOVEMENT_NOMIATIONS.CREATE : MOVEMENT_NOMIATIONS.UPDATE, values)
            .then(
              axios.spread((response) => {
                onComplete(values?.mv_key);
                //Modal.destroyAll();

                //mutate(url);
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
    }
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
          .post(MOVEMENT_NOMIATIONS.DELETE, value)
          .then(
            axios.spread((response) => {
              onComplete(null);
              //mutate(MOVEMENT_NOMIATIONS.READ);
              //Modal.destroyAll();
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

  useEffect(() => {
    if (!value && !visible) {
      resetFields();
    }
  }, [value, visible, resetFields]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={onFormClosed}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="80vw"
      visible={visible}
      footer={
        <>
          <Button
            type="primary"
            //htmlType="submit"
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
      <Form
        layout="vertical"
        form={form}
        //onFinish={onFinish}
        scrollToFirstError
        initialValues={{
          mv_key: '',
          mv_number: '',
          mv_status: '0',
          mv_srctype: '2',
        }}
      >
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane tab={t('tabColumns.general')} forceRender={true} key="1">
            <Row gutter={[12, 3]}>
              <Col span={12}>
                <NominationKey form={form} value={value} />
              </Col>
              <Col span={12}>
                <NominationNumber form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[12, 3]}>
              <Col span={12}>
                <NominationStatus form={form} value={value} />
              </Col>
              <Col span={12}>
                <NominationSource form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[12, 3]}>
              <Col span={12}>
                <Terminal form={form} value={value} />
              </Col>
              <Col span={12}>
                <Supplier form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[12, 3]}>
              <Col span={12}>
                <Carrier form={form} value={value} onChange={setCarrier} />
              </Col>
              <Col span={12}>
                <Vehicle form={form} value={value} carrier={carrier} />
              </Col>
            </Row>

            <Row gutter={[12, 3]}>
              <Col span={12}>
                <EffectiveFrom form={form} value={value} />
              </Col>
              <Col span={12}>
                <ExpiredAfter form={form} value={value} />
              </Col>
            </Row>

            <TPP form={form} value={value} />

            <TransportMode form={form} value={value} />

            <TransportSystem form={form} value={value} />

            <Comments form={form} value={value} />
          </TabPane>
          <TabPane tab={t('tabColumns.items')} forceRender={true} key="2">
            <Items setTableAPIContext={setTableAPI} value={value} />
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
