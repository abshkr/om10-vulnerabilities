import React, { useState } from 'react';

import { EditOutlined, PlusOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { Form, Button, Tabs, notification, Modal, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import {
  NominationKey,
  NominationNumber,
  NominationSource,
  Supplier,
  Carrier,
  Vehicle,
  TPP,
  TransportMode,
  TransportSystem,
  Comments,
  EffectiveFrom,
  ExpiredAfter
} from './fields';

import Items from './items';

import { MOVEMENT_NOMIATIONS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value }) => {
  const [tableAPI, setTableAPI] = useState(null);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;

  const onItemValidation = items => {
    const errors = [];

    _.forEach(items, item => {
      const keys = Object.keys(item);
      const values = Object.values(item);

      _.forEach(values, (value, index) => {
        if (value === 'Please Select') {
          errors.push({
            field: keys[index],
            error: 'Please Fill This Field'
          });
        }
      });
    });

    console.log(errors);
  };

  const onFinish = values => {
    const items = [];

    tableAPI.forEachNodeAfterFilterAndSort((rowNode, index) => {
      items.push(rowNode.data);
    });

    onItemValidation(items);
    // Modal.confirm({
    //   title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
    //   okText: IS_CREATING ? t('operations.create') : t('operations.update'),
    //   okType: 'primary',
    //   icon: <QuestionCircleOutlined />,
    //   cancelText: t('operations.no'),
    //   centered: true,
    //   onOk: async () => {
    //     await axios
    //       .post(IS_CREATING ? MOVEMENT_NOMIATIONS.CREATE : MOVEMENT_NOMIATIONS.UPDATE, values)
    //       .then(
    //         axios.spread(response => {
    //           Modal.destroyAll();

    //           mutate(MOVEMENT_NOMIATIONS.READ);
    //           notification.success({
    //             message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
    //             description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess')
    //           });
    //         })
    //       )
    //       .catch(error => {
    //         notification.error({
    //           message: error.message,
    //           description: IS_CREATING ? t('descriptions.createFailed') : t('messages.updateSuccess')
    //         });
    //       });
    //   }
    // });
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
            axios.spread(response => {
              mutate(MOVEMENT_NOMIATIONS.READ);
              Modal.destroyAll();
              notification.success({
                message: t('messages.deleteSuccess'),
                description: `${t('descriptions.deleteSuccess')}`
              });
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: t('descriptions.deleteFailed')
            });
          });
      }
    });
  };

  return (
    <div>
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} forceRender={true} key="1">
            <NominationKey form={form} value={value} />
            <NominationNumber form={form} value={value} />
            <NominationSource form={form} value={value} />
            <Supplier form={form} value={value} />
            <Carrier form={form} value={value} />
            <Vehicle form={form} value={value} />

            <Divider />

            <EffectiveFrom form={form} value={value} />
            <ExpiredAfter form={form} value={value} />

            <Divider />

            <TPP form={form} value={value} />
            <TransportMode form={form} value={value} />
            <TransportSystem form={form} value={value} />
            <Comments form={form} value={value} />
          </TabPane>
          <TabPane className="ant-tab-window" tab={t('tabColumns.items')} forceRender={true} key="2">
            <Items setTableAPIContext={setTableAPI} value={value} />
          </TabPane>
        </Tabs>

        <Form.Item>
          <Button
            type="primary"
            icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
            htmlType="submit"
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
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormModal;
