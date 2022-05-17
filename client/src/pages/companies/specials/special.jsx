import React from 'react';

import { EditOutlined, QuestionCircleOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import SupplierForm from './supplier-settings';
import OtherForm from './other';
import PrinterForm from './printer';
import TemplateForm from './template';
import _ from 'lodash';
import { useConfig } from 'hooks';

import api, { COMPANIES } from '../../../api';
import { mutate } from 'swr';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, handleFormState, setFilterValue }) => {
  const config = useConfig();
  const { bolVersion } = config;

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onComplete = () => {
    handleFormState(false, null);
    if (value.cmpy_code) {
      setFilterValue('' + value.cmpy_code);
    }
    mutate(COMPANIES.READ);
    Modal.destroyAll();
  };

  const onFormClosed = () => {
    Modal.destroyAll();
  };

  const onExitClicked = () => {
    if (!config?.siteFormCloseAlert) {
      onFormClosed();
      return;
    }

    Modal.confirm({
      title: t('prompts.cancel'),
      okText: t('operations.leave'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.stay'),
      content: (
        <Card
          style={{ marginTop: 15, padding: 5, marginBottom: 15 }}
          size="small"
          title={t('validate.warning')}
        >
          {t('descriptions.cancelWarning')}
        </Card>
      ),
      centered: true,
      onOk: () => {
        onFormClosed();
      },
    });
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    values.cmpy_code = value.cmpy_code;

    values.company_configs = [
      {
        cmpy_code: value.cmpy_code,
        config_key: 'AUTO_COMPLETE_NON_PRESCHD_LOADS',
        config_value: values.auto_complete_non_preschd_loads ? 'Y' : 'N',
      },
      {
        cmpy_code: value.cmpy_code,
        config_key: 'SAFEFILL_TOLERANCE_CHECK',
        config_value: values.safefill_tolerance_check ? 'Y' : 'N',
      },
      {
        cmpy_code: value.cmpy_code,
        config_key: 'VALIDATE_SCHEDULE_MAX_WEIGHT',
        config_value: values.validate_schedule_max_weight ? 'Y' : 'N',
      },
      {
        cmpy_code: value.cmpy_code,
        config_key: 'AUTH_AT_GATE',
        config_value: values.auth_at_gate ? 'Y' : 'N',
      },
      {
        cmpy_code: value.cmpy_code,
        config_key: 'VALIDATE_SCHEDULE_AVAILABITILTY',
        config_value: values.validate_schedule_availabitilty ? 'Y' : 'N',
      },
      {
        cmpy_code: value.cmpy_code,
        config_key: 'LOAD_VEHICLE_WEIGHT_TOLERANCE',
        config_value: values.weightTolerance,
      },
      {
        cmpy_code: value.cmpy_code,
        config_key: 'CMPY_2ND_DRAWER_FLAG',
        config_value: values.cmpy_2nd_drawer_flag ? 'Y' : 'N',
      },
      {
        cmpy_code: value.cmpy_code,
        config_key: 'CMPY_2ND_DRAWER',
        config_value: values.cmpy_2nd_drawer,
      },
      {
        cmpy_code: value.cmpy_code,
        config_key: 'AXLE_REQUIRED',
        config_value: values.axle_needed ? 'Y' : 'N',
      },
    ];

    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(COMPANIES.UPDATE, values)
          .then((response) => {
            // mutate(COMPANIES.READ);
            // Modal.destroyAll();
            onComplete();

            // mutate(COMPANIES.READ);
            notification.success({
              message: t('messages.updateSuccess'),
              description: t('messages.updateSuccess'),
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

  return (
    <div>
      <Form form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="1">
          {value?.supplier && (
            <TabPane tab={t('tabColumns.supplierSettings')} key="1" style={{ height: '65vh' }}>
              <SupplierForm value={value} form={form} config={config}></SupplierForm>
            </TabPane>
          )}
          <TabPane tab={t('tabColumns.others')} key="2" style={{ height: '60vh' }}>
            <OtherForm value={value} form={form} config={config}></OtherForm>
          </TabPane>
          <TabPane tab={t('tabColumns.printerSettings')} key="3" style={{ height: '60vh' }}>
            <PrinterForm value={value} form={form}></PrinterForm>
          </TabPane>
          {bolVersion === 'JASPER' && (
            <TabPane tab={t('tabColumns.transportationDoc')} key="4" style={{ height: '60vh' }}>
              <TemplateForm value={value} form={form}></TemplateForm>
            </TabPane>
          )}
        </Tabs>

        <Form.Item>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => onExitClicked()}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={<EditOutlined />}
            htmlType="submit"
            style={{ float: 'right', marginRight: 5 }}
          >
            {t('operations.update')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormModal;
