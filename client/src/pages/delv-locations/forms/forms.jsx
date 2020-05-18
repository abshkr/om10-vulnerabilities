import React, { useEffect, useState } from 'react';

import { EditOutlined, PlusOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';

import {
  Flag,
  Code,
  Name,
  Grid,
  Address,
  DocumentType,
  TransportType,
  QuantityType,
  EquipmentType,
  TripTime,
  Distance,
  Tarrif,
  Contact,
  Phone,
  Profile
} from './fields';

import { DELV_LOCATIONS } from '../../../api';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access, config }) => {
  //const { manageHotProduct, manageBaseProductDensityRange } = config;
  //const [classification, setClassification] = useState(undefined);

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;

  const [flag, setFlag] = useState(undefined);
  const [grid, setGrid] = useState(undefined);

  const { resetFields } = form;

  const onComplete = () => {
    handleFormState(false, null);
    mutate(DELV_LOCATIONS.READ);
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
          .post(IS_CREATING ? DELV_LOCATIONS.CREATE : DELV_LOCATIONS.UPDATE, values)
          .then(() => {
            onComplete();

            notification.success({
              message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
              description: IS_CREATING ? t('descriptions.createSuccess') : t('descriptions.updateSuccess'),
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
          .post(DELV_LOCATIONS.DELETE, value)
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
/*
  const onFlagChange = (e) => {
    if (value) {
      value.delv_grid = e.target.checked? 'CSTDLV' : '';
      setGrid(value.delv_grid);
    }
  };

  const onGridChange = (e) => {
    if (value) {
      value.delv_flag = e.target.value === 'CSTDLV'? true : false;
      setFlag(value.delv_flag);
    }
  };
*/
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
            <Flag form={form} value={value} />
            <Code form={form} value={value} />
            <Name form={form} value={value} />
            <Address form={form} value={value} />
            <Grid form={form} value={value} />
            <TransportType form={form} value={value} />
            <DocumentType form={form} value={value} />
            <QuantityType form={form} value={value} />
            <EquipmentType form={form} value={value} />
            <TripTime form={form} value={value} />
            <Distance form={form} value={value} />
            <Tarrif form={form} value={value} />
            <Contact form={form} value={value} />
            <Phone form={form} value={value} />
            <Profile form={form} value={value} />
{/*             <Classification
              form={form}
              value={value}
              onChange={setClassification}
              classification={classification}
            />
            <Group form={form} value={value} />
            <Color form={form} value={value} />

            {manageBaseProductDensityRange && (
              <DensityRange form={form} value={value} classification={classification} />
            )}

            {manageHotProduct && (
              <>
                <Divider>{t('tabColumns.product')}</Divider>
                <RefSpecTemp form={form} value={value} />
                <CorrectionMethod form={form} value={value} />
                <HotTempFlag form={form} value={value} />
              </>
            )}
 */}
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
