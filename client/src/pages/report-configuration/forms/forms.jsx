import React, { useEffect, useState } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import _ from 'lodash';

import { Company, Name, Email, Flags } from './fields';
import api, { REPORT_CONFIGURATION, REPORT_PROFILE } from '../../../api';
import { DataTable, FormModal } from 'components';
import columns from './columns';
import CloseoutJobForm from '../closeout-job/forms';
import useSWR from 'swr';

const TabPane = Tabs.TabPane;

const ConfigForm = ({ value, visible, handleFormState, access, config }) => {
  const { reports_closeout_job } = config;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue } = form;

  const { data: payload, isValidating, revalidate } = useSWR(
    reports_closeout_job && value
      ? `${REPORT_CONFIGURATION.CLOSEOUT_JOBS}?rpt_file=${value?.report_file}&rpt_cmpy=${value?.report_cmpycode}`
      : null
  );

  const [company, setCompany] = useState(undefined);
  const [enabled, setEnabled] = useState(undefined);
  const [canEmail, setCanEmail] = useState(undefined);
  const [selected, setSelected] = useState(null);
  const [jobs, setJobs] = useState(payload?.records);

  const fields = columns(t, form);

  const IS_CREATING = !value;

  const { resetFields } = form;

  const handleSpecialJob = (v) => {
    FormModal({
      value: v,
      width: '40vw',
      form: (
        <CloseoutJobForm
          value={v}
          rpt_file={value?.report_file}
          rpt_cmpy={value?.report_cmpycode}
          rpt_value={value}
          update={onJobUpdate}
        />
      ),
      id: v?.job_id,
      name: v?.job_name,
      t,
    });
  };

  const onJobUpdate = (values) => {
    if (values.to_create) {
      setJobs([...jobs, values]);
      setFieldsValue({
        jobs: [...jobs, values],
      });
    } else {
      const filtered = _.filter(jobs, (item) => {
        return item.job_name !== values.job_name;
      });

      setJobs([...filtered, values]);
      setFieldsValue({
        jobs: [...filtered, values],
      });
    }
  };

  const deleteJob = () => {
    let payload = _.filter(jobs, (item) => {
      // return item.job_name !== selected.job_name;
      return item.job_id !== selected.job_id;
    });
    setFieldsValue({
      jobs: payload,
    });

    setJobs(payload);
    setSelected(null);
  };

  const onComplete = () => {
    handleFormState(false, null);
    mutate(REPORT_CONFIGURATION.READ);
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
        await api
          .post(IS_CREATING ? REPORT_CONFIGURATION.CREATE : REPORT_CONFIGURATION.UPDATE, values)
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
        await api
          .post(REPORT_CONFIGURATION.DELETE, value)
          .then(() => {
            onComplete();

            notification.success({
              message: t('messages.deleteSuccess'),
              description: `${t('descriptions.deleteSuccess')} `,
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
    if (!enabled) {
      setCanEmail(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!value && !visible) {
      resetFields();
      setCanEmail(false);
    }
  }, [resetFields, value, visible]);

  useEffect(() => {
    if (payload && visible) {
      setJobs(payload.records);
      setFieldsValue({
        jobs: payload.records,
      });
    }
  }, [payload?.records]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
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
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
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
            <Company form={form} value={value} onChange={setCompany} />
            <Name form={form} value={value} company={company} />
            <Email form={form} value={value} enabled={enabled} canEmail={canEmail} config={config} />
            <Divider>{t('divider.flags')}</Divider>
            <Flags
              form={form}
              value={value}
              onCanEmailChange={setCanEmail}
              onEnabledChange={setEnabled}
              enabled={enabled}
              canEmail={canEmail}
            />
            {reports_closeout_job && value && (
              <div>
                <Divider>{t('divider.reportJobs')}</Divider>
                <Form.Item name="jobs" noStyle>
                  <DataTable
                    data={jobs}
                    columns={fields}
                    parentHeight="23vh"
                    handleSelect={(value) => setSelected(value[0])}
                    minimal
                  />
                </Form.Item>

                <Button
                  type="primary"
                  // loading={baseLoading && !IS_CREATING}
                  onClick={() => handleSpecialJob(null)}
                  style={{ float: 'right', marginRight: 5, marginTop: 10 }}
                >
                  {t('operations.addJob')}
                </Button>

                <Button
                  type="primary"
                  onClick={() => handleSpecialJob(selected)}
                  style={{ float: 'right', marginRight: 5, marginTop: 10 }}
                  disabled={!selected}
                >
                  {t('operations.editJob')}
                </Button>

                <Button
                  type="primary"
                  onClick={deleteJob}
                  disabled={!selected}
                  style={{ float: 'right', marginRight: 5, marginTop: 10 }}
                >
                  {t('operations.deleteJob')}
                </Button>
              </div>
            )}
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default ConfigForm;
