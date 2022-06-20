import React from 'react';

import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Form, Button, Select, Modal, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import api, { ROLE_ACCESS_MANAGEMENT } from '../../../api';

const CopyTo = ({ current, targets, onCopyReturn }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const target = _.find(targets, (item) => {
      return item.role_id === values.role_id;
    });

    const payload = {
      role_id: values.role_id,
      privilege: current.privilege,
      role_code: target.role_code,
      auth_level_name: target?.auth_level_name,
    };

    api
      .post(ROLE_ACCESS_MANAGEMENT.UPDATE, payload)
      .then((response) => {
        onComplete();
        onCopyReturn(target?.auth_level_name);

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
  };

  const onComplete = () => {
    Modal.destroyAll();
  };

  return (
    <Form form={form} onFinish={onFinish} scrollToFirstError style={{ marginTop: '1rem' }}>
      <Form.Item name="role_id" label={t('fields.copyToRole')}>
        <Select
          dropdownMatchSelectWidth={false}
          allowClear
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {targets.map((item, index) => (
            <Select.Option key={index} value={item.role_id}>
              {item.role_code} - {item.auth_level_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <div style={{ marginTop: '2rem' }}>
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          onClick={() => onComplete()}
        >
          {t('operations.cancel')}
        </Button>

        <Button
          type="primary"
          icon={<CheckOutlined />}
          htmlType="submit"
          style={{ float: 'right', marginRight: 5 }}
        >
          {t('operations.ok')}
        </Button>
      </div>
    </Form>
  );
};

export default CopyTo;
