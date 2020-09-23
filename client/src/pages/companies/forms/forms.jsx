import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  FormOutlined,
  ApiOutlined,
} from '@ant-design/icons';

import {
  Form,
  Button,
  Tabs,
  Modal,
  notification,
  Drawer,
  Input,
  // InputNumber,
  Select,
  Checkbox,
  Card,
  Row,
  Col,
} from 'antd';
// import 'antd/dist/antd.css';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';

import api, { COMPANIES } from '../../../api';
import { InputNumber } from '../../../components';
import useSWR from 'swr';
import _ from 'lodash';

const TabPane = Tabs.TabPane;

const FormModal = ({
  value,
  visible,
  handleFormState,
  auth,
  specialActions,
  companyRelations,
  setFilterValue,
}) => {
  const { t } = useTranslation();
  const { data: addresses, isValidating } = useSWR(COMPANIES.ADDRESSES);

  const [form] = Form.useForm();
  const { resetFields, setFieldsValue } = form;

  const [site_manager, setManager] = useState(value?.site_manager);
  const [supplier, setSupplier] = useState(value?.supplier);
  const [carrier, setCarrier] = useState(value?.carrier);
  const [customer, setCustomer] = useState(value?.customer);
  const [drawer, setDrawer] = useState(value?.drawer);
  const [issuer, setIssuer] = useState(value?.issuer);
  const [employer, setEmployer] = useState(value?.employer);
  const [host, setHost] = useState(value?.host);

  const IS_CREATING = !value;

  const onComplete = (cmpy_code) => {
    handleFormState(false, null);
    if (cmpy_code) {
      setFilterValue('' + cmpy_code);
    }
    mutate(COMPANIES.READ);
  };

  const onManagerChange = (v) => {
    setManager(v.target.checked);
    setFieldsValue({
      site_manager: v.target.checked,
    });
  };

  const onSupplierChange = (v) => {
    setSupplier(v.target.checked);
    setFieldsValue({
      supplier: v.target.checked,
    });

    if (v.target.checked && !drawer) {
      setDrawer(v.target.checked);
      setFieldsValue({
        drawer: v.target.checked,
      });
    }
  };

  const onCarrierChange = (v) => {
    setCarrier(v.target.checked);
    setFieldsValue({
      carrier: v.target.checked,
    });
  };

  const onCustomerChange = (v) => {
    setCustomer(v.target.checked);
    setFieldsValue({
      customer: v.target.checked,
    });
  };

  const onDrawerChange = (v) => {
    if (!v.target.checked && supplier) {
      return;
    }

    setDrawer(v.target.checked);
    setFieldsValue({
      drawer: v.target.checked,
    });
  };

  const onIssuerChange = (v) => {
    setIssuer(v.target.checked);
    setFieldsValue({
      issuer: v.target.checked,
    });
  };

  const onEmployerChange = (v) => {
    setEmployer(v.target.checked);
    setFieldsValue({
      employer: v.target.checked,
    });
  };

  const onHostChange = (v) => {
    setHost(v.target.checked);
    setFieldsValue({
      host: v.target.checked,
    });
  };

  useEffect(() => {
    if (value) {
      setManager(value.site_manager);
      setSupplier(value.supplier);
      setCarrier(value.carrier);
      setCustomer(value.customer);
      setDrawer(value.drawer);
      setIssuer(value.issuer);
      setEmployer(value.employer);
      setHost(value.host);
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
      resetFields();
      setManager(null);
      setSupplier(null);
      setCarrier(null);
      setCustomer(null);
      setDrawer(null);
      setIssuer(null);
      setEmployer(null);
      setHost(null);
    }
  }, [value, setFieldsValue, resetFields]);

  const onFinish = async () => {
    const values = await form.validateFields();
    
    if (!values.carrier && !values.customer &&  !values.drawer &&
      !values.employer && !values.host && !values.issuer &&
      !values.site_manager && !values.supplier) {
      notification.error({
        message: t("messages.validationFailed"),
        description: t("descriptions.noCompanyType"),
      });
      return;
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
          .post(IS_CREATING ? COMPANIES.CREATE : COMPANIES.UPDATE, values)
          .then((response) => {
            onComplete(values.cmpy_code);

            mutate(COMPANIES.READ);
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
          .post(COMPANIES.DELETE, value)
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

  const validateCode = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.companyCode')}`);
      }
    }

    const len = (new TextEncoder().encode(input)).length;
    if (input && len > 16) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 16 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  const validateName = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.companyName')}`);
      }
    }

    const len = (new TextEncoder().encode(input)).length;
    if (input && len > 300) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 300 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="48vw"
      visible={visible}
      footer={
        <>
          {!IS_CREATING && (
            <Button
              type="primary"
              icon={<FormOutlined />}
              style={{ float: 'left' }}
              loading={isValidating}
              onClick={() => specialActions()}
              disabled={!auth.canUpdate}
            >
              {t('operations.specialAction')}
            </Button>
          )}
          
          {!IS_CREATING && (
            <Button
              type="primary"
              icon={<ApiOutlined />}
              style={{ float: 'left', marginLeft: 5 }}
              loading={isValidating}
              onClick={() => companyRelations()}
              disabled={!auth.canUpdate}
            >
              {t('operations.companyRelation')}
            </Button>
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
            htmlType="submit"
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !auth?.canCreate : !auth?.canUpdate}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onDelete}
              disabled={!auth?.canDelete}
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
            <Form.Item name="cmpy_code" label={t('fields.companyCode')} rules={[{ required: true, validator: validateCode }]}>
              <Input disabled={!IS_CREATING}></Input>
            </Form.Item>
            <Form.Item name="cmpy_plant" label={t('fields.plantCode')}>
              <Input></Input>
            </Form.Item>
            <Form.Item name="cmpy_name" label={t('fields.companyName')} rules={[{ required: true, validator: validateName }]}>
              <Input></Input>
            </Form.Item>
            {/* <Form.Item name="cmpy_aoi" label={t('fields.aoiNumber')}>
              <InputNumber maxLength={4} min={0} max={9999} precision={0} style={{ width: '100%' }}></InputNumber>
            </Form.Item> */}
            <InputNumber 
              form={form}
              value={value?.cmpy_aoi}
              name="cmpy_aoi"
              label={t('fields.aoiNumber')}
              maxLength={4}
              min={0}
              max={9999}
              precision={0}
              style={{ width: '100%' }}
            />
            <Form.Item name="cmpy_addr" label={t('fields.address')}>
              <Select
                dropdownMatchSelectWidth={false}
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
            <Card size="small" title={t('fields.companyType')}>
              <Row gutter={[8, 10]}>
                <Col span={6}>
                  <Form.Item name="site_manager" noStyle>
                    <Checkbox checked={site_manager && !IS_CREATING} disabled={true} onChange={onManagerChange}>
                      {t('fields.siteManager')}
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="supplier" noStyle>
                    <Checkbox checked={supplier} onChange={onSupplierChange}>
                      {t('fields.schdSupplier')}
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="carrier" noStyle>
                    <Checkbox checked={carrier} onChange={onCarrierChange}>
                      {t('fields.schdCarrier')}
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="customer" noStyle>
                    <Checkbox checked={customer} onChange={onCustomerChange}>
                      {t('fields.customer')}
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 10]}>
                <Col span={6}>
                  <Form.Item name="drawer" noStyle>
                    <Checkbox checked={drawer} onChange={onDrawerChange}>
                      {t('fields.drawer')}
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="issuer" noStyle>
                    <Checkbox checked={issuer} onChange={onIssuerChange}>
                      {t('fields.issuer')}
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="employer" noStyle>
                    <Checkbox checked={employer} onChange={onEmployerChange}>
                      {t('fields.employer')}
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="host" noStyle>
                    <Checkbox checked={host} onChange={onHostChange}>
                      {t('fields.host')}
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
