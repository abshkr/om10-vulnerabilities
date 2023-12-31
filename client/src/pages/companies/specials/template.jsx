import React, { useEffect } from 'react';

import { SaveOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { Form, Button, Modal, notification } from 'antd';
import { DataTable } from '../../../components';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import columns from './columns';
import _ from 'lodash';
import { FooterEditor, SwitchRender } from './fields';

import api, { COMPANIES } from '../../../api';

const TemplateForm = ({ value }) => {
  const { data: payload, isValidating } = useSWR(`${COMPANIES.TEMPLATES}?cmpy_code=${value?.cmpy_code}`);

  const { t } = useTranslation();
  const fields = columns(t);
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  // const [ templateData, setTemplateDate ] = useState(payload?.records)

  useEffect(() => {
    if (payload) {
      setFieldsValue({
        templates: payload?.records,
      });
    }
  }, [setFieldsValue, payload]);

  const onSave = async () => {
    const values = await form.validateFields();
    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(COMPANIES.UPDATE_TEMPLATES, values.templates)
          .then((response) => {
            mutate(COMPANIES.TEMPLATES);
            // Modal.destroyAll();
            // onComplete()
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

  const swithLayout = {
    labelCol: { span: 10 },
    // wrapperCol: { span: 16 },
  };

  const singleLineLayout = {
    labelCol: { span: 10 },
    // wrapperCol: { span: 16 },
  };

  return (
    <Form form={form}>
      <Form.Item name="templates">
        <DataTable
          height="70vh"
          columns={fields}
          data={payload?.records}
          isLoading={isValidating}
          components={{
            FooterEditor: FooterEditor,
            SwitchRender: SwitchRender,
          }}
        />
      </Form.Item>
      <Button
        type="primary"
        icon={<SaveOutlined />}
        htmlType="submit"
        style={{ float: 'right', marginTop: 5 }}
        onClick={onSave}
      >
        {t('operations.save')}
      </Button>
    </Form>
  );
};

export default TemplateForm;
