import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Input, Select, Button, Row, Col } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const AdhocKeyForm = ({ assignAdhocKey, options, modal }) => {
  const [data, setData] = useState('');

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onChange = (event) => {
    setData(event);
  };

  const onFinish = () => {
    modal.destroy();
    assignAdhocKey(data);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError style={{ marginTop: '1rem' }}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <span>{t('descriptions.iButtonLookUpInList')}</span>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Select
            style={{ marginTop: 10, width: '100%' }}
            dropdownMatchSelectWidth={false}
            // loading={isValidating}
            allowClear
            showSearch
            onChange={onChange}
            disabled={false}
            optionFilterProp="children"
            placeholder={null}
            filterOption={(value, option) =>
              option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
              value.toLowerCase().indexOf(option.props.children.toLowerCase()) >= 0
            }
          >
            {options.map((item, index) => (
              <Select.Option key={index} value={item.kya_txt}>
                {item.kya_txt}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>

      <div style={{ marginTop: '2rem' }}>
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          onClick={() => modal.destroy()}
        >
          {t('operations.cancel')}
        </Button>

        <Button
          type="primary"
          icon={<CheckOutlined />}
          htmlType="submit"
          style={{ float: 'right', marginRight: 5 }}
          disabled={!data}
        >
          {t('operations.assignToTanker')}
        </Button>
      </div>
    </Form>
  );
};

const AdhocKey = ({ assignAdhocKey, t, options }) => {
  const modal = Modal.info();
  modal.update({
    title: t('prompts.iButtonLookUp'),
    centered: true,
    width: '25vw',
    maskClosable: true,
    okButtonProps: {
      hidden: true,
    },
    content: <AdhocKeyForm assignAdhocKey={assignAdhocKey} options={options} modal={modal} />,
  });

  return null;
};

export default AdhocKey;
