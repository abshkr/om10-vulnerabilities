import React, { useState } from 'react';

import { CloseOutlined, PlusOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Form, Button, Modal, Input, Row, Col, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import api, { DRAWER_PRODUCTS } from 'api';
import columns from './columns';
import useSWR, { mutate } from 'swr';
import { DataTable, Download } from 'components';

const GenericForm = ({}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { resetFields } = form;
  const [selected, setSelected] = useState(null);
  const [newGeneric, setNewGeneric] = useState('');

  const fields = columns(t);

  const { data: payload, isValidating } = useSWR(DRAWER_PRODUCTS.GENERICS_READ);

  const onComplete = () => {
    mutate(DRAWER_PRODUCTS.GENERICS_READ);
    resetFields();
    setNewGeneric('');
  };

  const onCreate = () => {
    if (!newGeneric) {
      return;
    }

    const values = {
      gen_prod_code: newGeneric
    }
    
    Modal.confirm({
      title: t('prompts.create'),
      okText: t('operations.create'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(DRAWER_PRODUCTS.GENERICS_CREATE, values)
          .then(() => {
            onComplete();

            notification.success({
              message: t('messages.createSuccess'),
              description: `${t('descriptions.createSuccess')}`,
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
    if (!selected) {
      return;
    }

    const values = {
      gen_prod_code: selected[0]?.gen_prod_code
    }
    
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <DeleteOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(DRAWER_PRODUCTS.GENERICS_DELETE, values)
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

  const validate = (rule, input) => {
    const match = _.find(payload?.records, ['gen_prod_code', input]);

    if (input && !!match) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input && input.length > 40) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  const onChange = (v) => {
    setNewGeneric(v.target.value);
  }

  return (
    <div>
      <Form 
        form={form} 
        scrollToFirstError
      >
        <DataTable
          data={payload?.records}
          isLoading={isValidating}
          height="48vh"
          minimal={false}
          extra={
            <Download data={payload?.records} isLoading={isValidating} columns={fields} />
          }
          columns={fields}
          handleSelect={setSelected}
        />

      <Row>
        <Col span={12}>
          <Form.Item extra={t("messages.toAddGeneric")} style={{ marginTop: '1rem'}}>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="gen_prod_code"
                  noStyle
                  rules={[{ validator: validate }]}
                >
                  <Input 
                    onChange={onChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  loading={isValidating}
                  // htmlType="submit"
                  disabled={newGeneric === ''}
                  onClick={onCreate}
                  style={{ float: 'left', marginLeft: 5 }}
                >
                  {t('operations.create')}
                </Button>
              </Col>
            </Row>
          </Form.Item>
          {/* <Form.Item label={"New generic name"} style={{ marginTop: '1rem' }}>
            <Input></Input>
          </Form.Item> */}
        </Col>

        <Col span={12}>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right', marginTop: '1rem' }}
            onClick={() => Modal.destroyAll()}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="danger"
            icon={<DeleteOutlined />}
            loading={isValidating}
            // htmlType="submit"
            disabled={!selected ? true : selected[0]?.gen_prod_count !== 0}
            onClick={onDelete}
            style={{ float: 'right', marginTop: '1rem', marginRight: 5 }}
          >
            {t('operations.delete')}
          </Button>

          
        </Col>
      </Row>

        
          
      </Form>
    </div>
  );
};

export default GenericForm;
