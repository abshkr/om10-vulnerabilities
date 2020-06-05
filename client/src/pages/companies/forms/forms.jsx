import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification, Drawer, Input, Select, Checkbox, Divider, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';

import { COMPANIES } from '../../../api';
import useSWR from 'swr';
import _ from 'lodash';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState }) => {
  const { t } = useTranslation();
  const { data: addresses, isValidating, revalidate } = useSWR(COMPANIES.ADDRESSES);

  const [form] = Form.useForm();
  const { resetFields, setFieldsValue } = form;

  const [ site_manager, setManager ] = useState(value?.site_manager)
  const [ supplier, setSupplier ] = useState(value?.supplier)
  const [ carrier, setCarrier ] = useState(value?.carrier)
  const [ customer, setCustomer ] = useState(value?.customer)
  const [ drawer, setDrawer ] = useState(value?.drawer)
  const [ issuer, setIssuer ] = useState(value?.issuer)
  const [ employer, setEmployer ] = useState(value?.employer)
  const [ host, setHost ] = useState(value?.host)

  const IS_CREATING = !value;

  const onComplete = () => {
    handleFormState(false, null);
    mutate(COMPANIES.READ);
  };

  const onManagerChange = v => {
    setManager(v.target.checked)
    setFieldsValue({
      site_manager: v.target.checked,
    });
  }

  const onSupplierChange = v => {
    setSupplier(v.target.checked)
    setFieldsValue({
      supplier: v.target.checked,
    });

    if (v.target.checked && !drawer) {
      setDrawer(v.target.checked)
      setFieldsValue({
        drawer: v.target.checked,
      });
    }
  }
  
  const onCarrierChange = v => {
    setCarrier(v.target.checked)
    setFieldsValue({
      carrier: v.target.checked,
    });
  }

  const onCustomerChange = v => {
    setCustomer(v.target.checked)
    setFieldsValue({
      customer: v.target.checked,
    });
  }

  const onDrawerChange = v => {
    if (!v.target.checked && supplier) {
      return;
    }

    setDrawer(v.target.checked)
    setFieldsValue({
      drawer: v.target.checked,
    });
  }

  const onIssuerChange = v => {
    setIssuer(v.target.checked)
    setFieldsValue({
      issuer: v.target.checked,
    });
  }

  const onEmployerChange = v => {
    setEmployer(v.target.checked)
    setFieldsValue({
      employer: v.target.checked,
    });
  }

  const onHostChange = v => {
    setHost(v.target.checked)
    setFieldsValue({
      host: v.target.checked,
    });
  }

  useEffect(() => {
    if (value) {
      setManager(value.site_manager)
      setSupplier(value.supplier)
      setCarrier(value.carrier)
      setCustomer(value.customer)
      setDrawer(value.drawer)
      setIssuer(value.issuer)
      setEmployer(value.employer)
      setHost(value.host)
      setFieldsValue({
        cmpy_code: value.cmpy_code,
        cmpy_plant: value.cmpy_plant,
        cmpy_name: value.cmpy_name,
        cmpy_aoi: value.cmpy_aoi,
        cmpy_addr: value.cmpy_addr,
        site_manager: value.site_manager,
        supplier: value.supplier,
        carrier: value.carrier,
        customer: value.customer,
        drawer: value.drawer,
        issuer: value.issuer,
        employer: value.employer,
        host: value.host,
      });
    } else {
      resetFields()
    }
  }, [value, setFieldsValue, resetFields]);

  const onFinish = async () => {
    const values = await form.validateFields();
    // Attaching the Id to the Updated Object

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(IS_CREATING ? COMPANIES.CREATE : COMPANIES.UPDATE, values)
          .then(
            axios.spread(response => {
              onComplete();

              mutate(COMPANIES.READ);
              notification.success({
                message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
                description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess')
              });
            })
          )
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      }
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
        await axios
          .post(COMPANIES.DELETE, value)
          .then(
            axios.spread(response => {
              onComplete();

              notification.success({
                message: t('messages.deleteSuccess'),
                description: `${t('descriptions.deleteSuccess')}`
              });
            })
          )
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      }
    });
  };

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="35vw"
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
            style={{ float: 'right', marginRight: 5 }}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
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
          <TabPane tab={t('tabColumns.general')} key="1" style={{ height: '60vh' }}>
            <Form.Item name="cmpy_code" label={t('fields.companyCode')} rules={[{ required: true }]}>
              <Input disabled={!IS_CREATING}></Input>
            </Form.Item>
            <Form.Item name="cmpy_plant" label={t('fields.plantCode')} >
              <Input ></Input>
            </Form.Item>
            <Form.Item name="cmpy_name" label={t('fields.companyName')} rules={[{ required: true }]}>
              <Input ></Input>
            </Form.Item>
            <Form.Item name="cmpy_aoi" label={t('fields.aoiNumber')} >
              <Input ></Input>
            </Form.Item>
            <Form.Item
              name="cmpy_addr"
              label={t('fields.address')}
            >
              <Select
                loading={isValidating}
                // onChange={onChange}
                // disabled={!!value || type === '1'}
                showSearch
                optionFilterProp="children"
                placeholder={!value ? t('placeholder.selectAddress') : null}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {addresses?.records.map((item, index) => (
                  <Select.Option key={index} value={item.db_address_key}>
                    {item.address_text}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Divider orientation="left" plain="plain" >{t('fields.companyType')}</Divider>
            <Row>
              <Col span={6}>
                <Form.Item name="site_manager" noStyle >
                  <Checkbox checked={site_manager && !IS_CREATING} disabled={true} onChange={onManagerChange}>{t('fields.siteManager')}</Checkbox>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="supplier" noStyle>
                  <Checkbox checked={supplier} onChange={onSupplierChange}>{t('fields.supplier')}</Checkbox>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="carrier" noStyle>
                  <Checkbox checked={carrier} onChange={onCarrierChange}>{t('fields.carrier')}</Checkbox>
                </Form.Item>
            </Col>
              <Col span={6}>
                <Form.Item name="customer" noStyle>
                  <Checkbox checked={customer} onChange={onCustomerChange}>{t('fields.customer')}</Checkbox>
                </Form.Item>
              </Col>
              
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item name="drawer" noStyle>
                  <Checkbox checked={drawer} onChange={onDrawerChange}>{t('fields.drawer')}</Checkbox>
              </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="issuer" noStyle>
                  <Checkbox checked={issuer} onChange={onIssuerChange}>{t('fields.issuer')}</Checkbox>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="employer" noStyle>
                  <Checkbox checked={employer} onChange={onEmployerChange}>{t('fields.employer')}</Checkbox>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="host" noStyle>
                  <Checkbox checked={host} onChange={onHostChange}>{t('fields.host')}</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Form>
      </Drawer>
  );
};

export default FormModal;
