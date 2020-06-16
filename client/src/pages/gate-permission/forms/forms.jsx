import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Drawer, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';

// import Rules from './rules';
import { Id, Gate, Name } from './fields';
import api, { GATE_PERMISSION } from '../../../api';
import _ from 'lodash';
import { DataTable, FormModal } from '../../../components';
import columns from './columns';
import RuleForm from './rule-form';

const TabPane = Tabs.TabPane;

const GatePermForm = ({ value, visible, handleFormState, access }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const [rules, setRules] = useState(value ? value.rules : []);
  const [selected, setSelected] = useState(null);

  let next_id = null;

  api.get(`${GATE_PERMISSION.NEXT_PRM_ID}`).then((response) => {
    const payload = response.data?.records || [];
    next_id = payload[0].next_prm_id;
  });

  const onComplete = () => {
    handleFormState(false, null);
    mutate(GATE_PERMISSION.READ);
  };

  const IS_CREATING = !value;

  const onFinish = async () => {
    const values = await form.validateFields();
    if (typeof values.rules === 'undefined') {
      delete values.rules;
    } else {
      if (values.rules.length === 0) {
        Modal.info({
          title: t('pageNames.gatePermission'),
          content: <div>{t('descriptions.gatePermissionRule')}</div>,
        });
        return;
      }
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
          .post(IS_CREATING ? GATE_PERMISSION.CREATE : GATE_PERMISSION.UPDATE, values)
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

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(GATE_PERMISSION.DELETE, value)
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

  const handleCallBack = (values) => {
    if (values.to_create) {
      let prmssn_k;
      if (!value) {
        prmssn_k = next_id;
      } else {
        prmssn_k = value.prmssn_k;
      }

      const payload = {
        rule_id: rules.length == 0 ? prmssn_k : prmssn_k * 1000 + rules.length + 1,
        rule_case: values.rule_case,
        rule_casename: values.rule_casename,
        rule_etyp: values.rule_etyp,
        rule_etypname: values.rule_etypname,
        rule_auth: values.rule_auth,
        rule_authname: values.rule_authname,
        rule_first: rules.length === 1,
        rule_parent: prmssn_k,
        rule_expiry_check: values.rule_expiry_check,
        is_new: true,
      };

      setRules([...rules, payload]);
      setFieldsValue({
        rules: [...rules, payload],
      });
    } else {
      const filtered = _.filter(rules, (item) => {
        return item.rule_id !== values.rule_id;
      });
      const payload = {
        rule_id: values.rule_id,
        rule_case: values.rule_case,
        rule_casename: values.rule_casename,
        rule_etyp: values.rule_etyp,
        rule_etypname: values.rule_etypname,
        rule_auth: values.rule_auth,
        rule_authname: values.rule_authname,
        rule_first: rules.length === 1,
        rule_parent: value.prmssn_k,
        rule_expiry_check: values.rule_expiry_check,
        is_new: true,
      };

      setRules([...filtered, payload]);
      setFieldsValue({
        rules: [...filtered, payload],
      });
    }
  };

  const deleteRule = () => {
    if (selected.rule_first) {
      notification.error({
        message: t('messages.submitFailed'),
        description: t('descriptions.gatePermissionRule'),
      });
      return;
    }

    let payload = _.filter(rules, (item) => {
      return item.rule_id !== selected.rule_id;
    });
    setFieldsValue({
      rules: payload,
    });

    setRules(payload);
    setSelected(null);
  };

  const handleRule = (v) => {
    FormModal({
      width: '50vh',
      value: v,
      form: <RuleForm value={v} handleCallBack={handleCallBack} />,
      id: v?.rule_id,
      name: '',
      t,
    });
  };

  useEffect(() => {
    if (value && visible) {
      setRules(value?.rules);
    }

    if (!value && visible) {
      // resetFields();
      setRules([]);
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
      width="45vw"
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
            disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
            style={{ float: 'right', marginRight: 5 }}
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
      <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1" style={{ height: '70vh' }}>
            <Id form={form} value={value} />
            <Gate form={form} value={value} />
            <Name form={form} value={value} />
            <Divider orientation="left">{t('tabColumns.rules')}</Divider>
            <Form.Item name="rules" noStyle>
              <DataTable
                data={rules}
                height="78vh"
                minimal
                columns={columns(t)}
                handleSelect={(value) => setSelected(value[0])}
              />
            </Form.Item>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              // loading={baseLoading && !IS_CREATING}
              onClick={() => handleRule(null)}
              style={{ float: 'right', marginRight: 5, marginTop: 10 }}
            >
              {t('operations.addRule')}
            </Button>

            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleRule(selected)}
              style={{ float: 'right', marginRight: 5, marginTop: 10 }}
              disabled={!selected}
            >
              {t('operations.editRule')}
            </Button>

            <Button
              type="danger"
              icon={<DeleteOutlined />}
              onClick={deleteRule}
              disabled={!selected}
              style={{ float: 'right', marginRight: 5, marginTop: 10 }}
            >
              {t('operations.deleteRule')}
            </Button>
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default GatePermForm;
