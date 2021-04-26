import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { Form, Button, Tabs, notification, Modal, Divider, Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import _ from 'lodash';

import { Source, Type, Name, Description, CloseOutReportBy, Flags } from './fields';
import api, { REPORT_PROFILE } from '../../../api';
import { useConfig } from 'hooks';
import { DataTable, FormModal } from 'components';
import columns from './columns';
import CloseoutJobForm from '../closeout-job/forms';
import useSWR from 'swr';

const TabPane = Tabs.TabPane;

const ProfileForm = ({ value, visible, handleFormState, access, setFilterValue }) => {
  const { t } = useTranslation();
  const { reports_closeout_job } = useConfig();
  const [form] = Form.useForm();
  const { setFieldsValue } = form;

  const { data: payload, isValidating, revalidate } = useSWR(reports_closeout_job && value ? 
    `${REPORT_PROFILE.CLOSEOUT_JOBS}?rpt_file=${value?.report_file}` : 
    null);

  const { resetFields } = form;

  const [source, setSource] = useState(undefined);
  const [selected, setSelected] = useState(null);
  const [jobs, setJobs] = useState(payload?.records);

  const fields = columns(t, form);

  const IS_CREATING = !value;

  const handleSpecialJob = (v) => {
    FormModal({
      value: v,
      width: '40vw',
      form: <CloseoutJobForm value={v} rpt_file={value?.report_file} update={onJobUpdate}/>,
      id: v?.job_id,
      name: v?.job_name,
      t
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
      });;
    }
  };

  const deleteJob = () => {
    let payload = _.filter(jobs, (item) => {
      return item.job_name !== selected.job_name;
    });
    setFieldsValue({
      jobs: payload,
    });

    setJobs(payload);
    setSelected(null);
  };

  const onComplete = (report_name) => {
    handleFormState(false, null);
    mutate(REPORT_PROFILE.READ);
    if (report_name) {
      setFilterValue('' + report_name);
    } else {
      setFilterValue(' ');
    }
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    if (!IS_CREATING) {
      values.report_file = value.report_file;
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
          .post(IS_CREATING ? REPORT_PROFILE.CREATE : REPORT_PROFILE.UPDATE, values)
          .then((response) => {
            onComplete(values.report_name);

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
          .post(REPORT_PROFILE.DELETE, value)
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
      resetFields();
      setSelected(null);
    }
  }, [value, visible]);

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
            htmlType="submit"
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
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} forceRender={true} key="1">
            <Source form={form} value={value} onChange={setSource} />
            <Type form={form} value={value} source={source} />
            <Name form={form} value={value} />
            <CloseOutReportBy form={form} value={value} />
            <Description form={form} value={value} />
            <Divider>{t('divider.flags')}</Divider>
            <Flags form={form} value={value} />
            {
              reports_closeout_job && 
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
            } 
            
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default ProfileForm;
