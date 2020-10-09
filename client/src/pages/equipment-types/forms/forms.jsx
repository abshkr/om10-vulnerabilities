import React, { useEffect } from 'react';

import { EditOutlined, PlusOutlined, DeleteOutlined, QuestionCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Tag, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import _ from 'lodash';

import api, { EQUIPMENT_TYPES } from '../../../api';
import { Code, NonCombination, Compartments, Combination } from './fields';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, isCombination, access, setFilterValue }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const IS_CREATING = !value;
  const IS_COMBINATION = isCombination || value?.image?.split(',')?.length > 1 || _.toNumber(value?.etyp_class) > 0;

  const { resetFields } = form;

  const onComplete = (etyp_title) => {
    handleFormState(false, null);
    mutate(EQUIPMENT_TYPES.READ);
    if (etyp_title) {
      setFilterValue("" + etyp_title);
    } else {
      setFilterValue(" ");
    }
  };

  const onFinish = async () => {
    let values = {};

    const compartments = [];

    const record = await form.validateFields();

    if (IS_CREATING && IS_COMBINATION) {
      if (record.composition.length < 2) {
        notification.error({
          message: t('descriptions.minEqptForCombination'),
          description: t('descriptions.eqptTypeCounts') + String(record.composition.length),
        });
        return;
      }
    }

    _.forEach(record.names, (value, key) => {
      const payload = {
        cmpt_no: String(key + 1),
        cmpt_units: record?.unit,
        cmpt_capacit: String(value || 0),
      };

      compartments.push(payload);
    });

    if (IS_CREATING && !IS_COMBINATION) {
      const catg = record.etyp_category?.toUpperCase();
      if (catg !== 'P' && catg !== 'F' && compartments.length === 0) {
        notification.error({
          message: t('descriptions.zeroCompartmentCount'),
          description: t('descriptions.oneCompartmentRequired'), // + String(record.names.length),
        });
        return;
      }
    }

    if (!IS_COMBINATION && !IS_CREATING) {
      values = {
        etyp_id: value.etyp_id,
        etyp_category: record.etyp_category?.toUpperCase(),
        etyp_isrigid: record.etyp_category?.toUpperCase() === "R" || record.etyp_category?.toUpperCase() === "S",
      };
    }

    if (IS_COMBINATION && !IS_CREATING) {
      values = {
        etyp_id: value.etyp_id,
      };
    }

    if (IS_CREATING && !IS_COMBINATION) {
      values = {
        etyp_title: record.etyp_title,
        etyp_category: record.etyp_category?.toUpperCase(),
        etyp_isrigid: record.etyp_category?.toUpperCase() === "R" || record.etyp_category?.toUpperCase() === "S",
        etyp_schedul: compartments.length > 0,
        compartments,
      };
    }

    if (IS_CREATING && IS_COMBINATION) {
      let sum = 0
      for (let i = 0; i < record.composition.length; i ++) {
        sum += record.composition[i].cmptnu;
      }

      values = {
        ...record,
        etyp_isrigid: false,
        etyp_schedul: sum > 0,
        etyp_category: 'C',
      };
    }

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? EQUIPMENT_TYPES.CREATE : EQUIPMENT_TYPES.UPDATE, values)
          .then(() => {
            onComplete(value? value.etyp_title : values.etyp_title);

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
        await api
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
    if (!visible && !value) {
      resetFields();
    }
  }, [resetFields, value, visible]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width={IS_CREATING && IS_COMBINATION && visible ? '100vw' : '50vw'}
      visible={visible}
      footer={
        <>
          {!IS_CREATING && (
            <div
              style={{ float: 'left', marginRight: 5 }}
            >
              <Tooltip placement="topRight" title={t("descriptions.countEtypEquipment")} >
                <Tag color={value?.eqpt_count>0 ? 'red' : 'green'}>
                  {t('fields.countEtypEquipment') + ': ' + value?.eqpt_count}
                </Tag>
              </Tooltip>
              <Tooltip placement="topRight" title={t("descriptions.countEtypTanker")} >
                <Tag color={value?.tnkr_count>0 ? 'red' : 'green'}>
                  {t('fields.countEtypTanker') + ': ' + value?.tnkr_count}
                </Tag>
              </Tooltip>
            </div>
          )}

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
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={
              (!IS_CREATING && IS_COMBINATION) || IS_CREATING ? !access?.canCreate : !access?.canUpdate
            }
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!access?.canUpdate || value?.eqpt_count>0 || value?.tnkr_count>0}
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

            {IS_CREATING && IS_COMBINATION && <Combination form={form} value={value} />}

            {!IS_CREATING && <Compartments form={form} value={value} isCombination={IS_COMBINATION} />}

            {!IS_COMBINATION && IS_CREATING && <NonCombination form={form} value={value} />}
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
