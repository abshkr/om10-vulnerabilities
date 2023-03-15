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
import { Scrollbars } from 'react-custom-scrollbars';

import api, { COMPANIES, ROLE_ACCESS_MANAGEMENT } from '../../../api';
import { InputNumber, NumericInput } from '../../../components';
import { REGEX } from '../../../constants';
import Logo from './logo';
import useSWR from 'swr';
import _ from 'lodash';

import {
  PidxCarrier,
  PidxSupplier,
  PidxDrawer,
  PidxCustomer,
  PidxFein,
  PidxSsn,
  PidxCarrierFein,
} from './fields';

// import { getChildrenFromTxt } from '../../../utils';

const TabPane = Tabs.TabPane;

const FormModal = ({
  value,
  visible,
  handleFormState,
  auth,
  specialActions,
  companyRelations,
  setFilterValue,
  config,
}) => {
  const { t } = useTranslation();
  const { siteCompanyRelationAllowed, maxLengthCmpyCode, carrcode_tankernum_tag, siteLabelUser } = config;
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
  const [plantRequired, setPlantRquired] = useState(value?.cmpy_plant);

  const IS_CREATING = !value;

  const removeWhiteSpaceFrontBack = (s) => s.trim().split(/ +/).join(' ');

  const adjustFeinFields = (source) => {
    const fein = form.getFieldValue('cmpy_pidx_fein');
    const ssn = form.getFieldValue('cmpy_pidx_ssn');
    const cfein = form.getFieldValue('cmpy_pidx_carrier_fein');

    const regexFEIN = new RegExp(REGEX.FEIN);
    const validFEIN = regexFEIN.exec(fein);
    const regexSSN = new RegExp(REGEX.SSN);
    const validSSN = regexSSN.exec(ssn);
    const regexCFEIN = new RegExp(REGEX.CFEIN);
    const validCFEIN = regexCFEIN.exec(cfein);

    if (source === 'cmpy_pidx_carrier_fein') {
      if (validCFEIN) {
        if (cfein === '000000000U') {
          form.setFieldsValue({
            cmpy_pidx_fein: '',
            cmpy_pidx_ssn: '',
          });
        }
        if (cfein.charAt(9) === 'F') {
          form.setFieldsValue({
            cmpy_pidx_fein: cfein.substring(0, 9),
            cmpy_pidx_ssn: '',
          });
        }
        if (cfein.charAt(9) === 'S') {
          form.setFieldsValue({
            cmpy_pidx_fein: '',
            cmpy_pidx_ssn: cfein.substring(0, 9),
          });
        }
      }
    }

    if (source === 'cmpy_pidx_fein' || source === 'cmpy_pidx_ssn') {
      if (validFEIN) {
        form.setFieldsValue({
          cmpy_pidx_carrier_fein: fein + 'F',
        });
      } else if (validSSN) {
        form.setFieldsValue({
          cmpy_pidx_carrier_fein: ssn + 'S',
        });
      } else {
        form.setFieldsValue({
          cmpy_pidx_carrier_fein: '000000000U',
        });
      }
    }
  };

  const onFeinChanged = (v) => {
    adjustFeinFields('cmpy_pidx_fein');
  };

  const onSsnChanged = (v) => {
    adjustFeinFields('cmpy_pidx_ssn');
  };

  const onCarrierFeinChanged = (v) => {
    adjustFeinFields('cmpy_pidx_carrier_fein');
  };

  const checkCompany = async (code) => {
    const values = {
      cmpy_code: code,
    };

    const results = await api.post(COMPANIES.CHECK_COMPANY, values);

    if (results?.data) {
      return _.toNumber(results?.data?.records[0]?.cnt);
    } else {
      return 0;
    }
  };

  const getTableChildren = async (type) => {
    const values = {
      parent: 'COMPANYS',
      cmpy_code: value?.cmpy_code,
    };

    if (type?.length > 0) {
      values.cmpy_type = type;
    }

    const results = await api.post(ROLE_ACCESS_MANAGEMENT.CHECK_CHILDREN, values);

    if (results?.data) {
      return results?.data?.records;
    } else {
      return [];
    }
  };

  const checkChildren = async (type) => {
    // getChildrenFromTxt();
    // const children = await getTableChildren(type);
    const allChildren = await getTableChildren(type);
    const children = _.filter(allChildren, (o) => type?.length === 0 || o?.type?.indexOf(type) >= 0);

    if (children?.length > 0) {
      const lines = (
        <Scrollbars
          style={{
            height: 'calc(100vh - 360px)',
            width: '26vw',
            marginTop: 5,
            marginRight: 5,
            padding: 5,
          }}
        >
          <div style={{ padding: 10 }}>
            {children?.map((item, index) => (
              <Card size="small" title={item?.title + ': ' + _.toString(item?.column_titles)}>
                {t('descriptions.childRecordCounts') + ': '}
                <b style={{ color: 'red' }}>{item?.child}</b>
              </Card>
            ))}
          </div>
        </Scrollbars>
      );

      notification.error({
        message:
          type.length > 0
            ? t('validate.childTypeRecordsFoundCompany')
            : t('validate.childTableRecordsFoundCompany'),
        description: lines,
        // duration: 0,
        style: {
          height: 'calc(100vh - 260px)',
          width: '32vw',
          // overflowY: 'scroll',
        },
      });
    }

    return children;
  };

  const onComplete = (cmpy_code) => {
    handleFormState(false, null);
    mutate(COMPANIES.READ);
    if (cmpy_code) {
      setFilterValue('' + cmpy_code);
    }
  };

  const onFormClosed = () => {
    handleFormState(false, null);
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

  const onManagerChange = async (v) => {
    if (site_manager && (config?.siteTypeUntickCheckAny || config?.siteTypeUntickCheckManager)) {
      const children = await checkChildren('Site Manager');
      if (children?.length > 0 && !config?.siteTypeUntickForced) {
        return;
      }
    }

    setManager(v.target.checked);
    setFieldsValue({
      site_manager: v.target.checked,
    });
  };

  const onSupplierChange = async (v) => {
    if (supplier && (config?.siteTypeUntickCheckAny || config?.siteTypeUntickCheckSupplier)) {
      const children = await checkChildren('Supplier');
      if (children?.length > 0 && !config?.siteTypeUntickForced) {
        return;
      }
    }

    setSupplier(v.target.checked);
    setFieldsValue({
      supplier: v.target.checked,
    });

    // when the supplier type is checked, check the drawer type too
    if (v.target.checked && !drawer) {
      setDrawer(v.target.checked);
      setFieldsValue({
        drawer: v.target.checked,
      });
    }
  };

  const onCarrierChange = async (v) => {
    if (carrier && (config?.siteTypeUntickCheckAny || config?.siteTypeUntickCheckCarrier)) {
      const children = await checkChildren('Carrier');
      if (children?.length > 0 && !config?.siteTypeUntickForced) {
        return;
      }
    }

    setCarrier(v.target.checked);
    setFieldsValue({
      carrier: v.target.checked,
    });
  };

  const onCustomerChange = async (v) => {
    if (customer && (config?.siteTypeUntickCheckAny || config?.siteTypeUntickCheckCustomer)) {
      const children = await checkChildren('Customer');
      if (children?.length > 0 && !config?.siteTypeUntickForced) {
        return;
      }
    }

    setCustomer(v.target.checked);
    setFieldsValue({
      customer: v.target.checked,
    });
  };

  const onDrawerChange = async (v) => {
    if (drawer && (config?.siteTypeUntickCheckAny || config?.siteTypeUntickCheckDrawer)) {
      const children = await checkChildren('Drawer');
      if (children?.length > 0 && !config?.siteTypeUntickForced) {
        return;
      }
    }

    if (!v.target.checked && supplier) {
      return;
    }

    setDrawer(v.target.checked);
    setFieldsValue({
      drawer: v.target.checked,
    });
  };

  const onIssuerChange = async (v) => {
    if (issuer && (config?.siteTypeUntickCheckAny || config?.siteTypeUntickCheckIssuer)) {
      const children = await checkChildren('Issuer');
      if (children?.length > 0 && !config?.siteTypeUntickForced) {
        return;
      }
    }

    setIssuer(v.target.checked);
    setFieldsValue({
      issuer: v.target.checked,
    });
  };

  const onEmployerChange = async (v) => {
    if (employer && (config?.siteTypeUntickCheckAny || config?.siteTypeUntickCheckEmployer)) {
      const children = await checkChildren('Employer');
      if (children?.length > 0 && !config?.siteTypeUntickForced) {
        return;
      }
    }

    setEmployer(v.target.checked);
    setFieldsValue({
      employer: v.target.checked,
    });
  };

  const onHostChange = async (v) => {
    if (host && (config?.siteTypeUntickCheckAny || config?.siteTypeUntickCheckHost)) {
      const children = await checkChildren('Host');
      if (children?.length > 0 && !config?.siteTypeUntickForced) {
        return;
      }
    }

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

    // if(values.cmpy_name){
    //   values.cmpy_name = removeWhiteSpaceFrontBack(values.cmpy_name);
    // };

    // check if the company code is unique in CREATE mode
    if (IS_CREATING) {
      const counter = await checkCompany(values?.cmpy_code?.trim());
      if (counter > 0) {
        let notes = t('descriptions.alreadyExistsRecord');
        notes = notes.replace('[[PKEY]]', '"' + t('fields.companyCode') + ': ' + values?.cmpy_code + '"');
        notification.error({
          message: t('messages.validationFailed'),
          description: notes,
        });
        return;
      }
    }

    if (
      !values.carrier &&
      !values.customer &&
      !values.drawer &&
      !values.employer &&
      !values.host &&
      !values.issuer &&
      !values.site_manager &&
      !values.supplier
    ) {
      notification.error({
        message: t('messages.validationFailed'),
        description: t('descriptions.noCompanyType'),
      });
      return;
    }

    // now optional dropdown lists can be unselected and have the value of "undefined".
    // need to send blank string when it is undefined
    values.cmpy_addr = !values?.cmpy_addr ? '' : values?.cmpy_addr;

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

  const onDelete = async () => {
    const children = await checkChildren('');
    if (children?.length > 0) {
      return;
    }

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

  // const validateCode = async (rule, input) => {
  const validateCode = (rule, input) => {
    // check if the company code is unique in CREATE mode
    // if (IS_CREATING) {
    //   const counter = await checkCompany(input.trim());
    //   if (counter > 0) {
    //     return Promise.reject(t('descriptions.alreadyExists'));
    //   }
    // }

    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.companyCode')}`);
      }
    }

    const regex = new RegExp(REGEX.ALPHANUMERIC);
    const validated = regex.exec(input);

    if (!validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextAlphaNumeric')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > maxLengthCmpyCode) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${maxLengthCmpyCode} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  const validatePlant = (rule, input) => {
    /* if (rule.required && input?.length > 0) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.plantCode')}`);
      }
    } */

    if (input === '' || !input) {
      setPlantRquired(false);
    } else {
      setPlantRquired(true);
    }

    const regex = new RegExp(REGEX.ALPHANUMERIC);
    const validated = regex.exec(input);

    if (!validated && input?.length > 0) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextAlphaNumeric')}`);
    }

    const len = new TextEncoder().encode(input).length;
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

    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }

    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    const regex = new RegExp(REGEX.DOCUMENT);
    const validated = regex.exec(input);

    if (!validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextDocument')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 300) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 300 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={() => onExitClicked()}
      maskClosable={config?.siteFormCloseAlert ? false : IS_CREATING}
      destroyOnClose={true}
      mask={config?.siteFormCloseAlert ? true : IS_CREATING}
      placement="right"
      width="60vw"
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

          {!IS_CREATING && siteCompanyRelationAllowed && (
            <Button
              type="primary"
              icon={<ApiOutlined />}
              style={{ float: 'left', marginLeft: 5 }}
              loading={isValidating}
              onClick={() => companyRelations()}
              disabled={!auth.canUpdate || value?.supplier !== true}
            >
              {t('operations.companyRelation')}
            </Button>
          )}

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
          <TabPane tab={t('tabColumns.general')} key="1">
            <Form.Item
              name="cmpy_code"
              label={t('fields.companyCode')}
              rules={[{ required: true, validator: validateCode }]}
            >
              {carrcode_tankernum_tag ? (
                <NumericInput
                  inputValue={value?.cmpy_code}
                  disabled={!IS_CREATING}
                  onChange={(cmpy_code) =>
                    setFieldsValue({
                      cmpy_code: cmpy_code,
                    })
                  }
                />
              ) : (
                <Input disabled={!IS_CREATING}></Input>
              )}
            </Form.Item>
            <Form.Item
              name="cmpy_plant"
              label={t('fields.plantCode')}
              rules={[{ required: plantRequired, validator: validatePlant }]}
            >
              <Input disabled={!supplier}></Input>
            </Form.Item>
            <Form.Item
              name="cmpy_name"
              label={t('fields.companyName')}
              rules={[{ required: true, validator: validateName }]}
            >
              <Input></Input>
            </Form.Item>
            {/* <Form.Item name="cmpy_aoi" label={t(siteLabelUser + 'fields.aoiNumber')}>
              <InputNumber maxLength={4} min={0} max={9999} precision={0} style={{ width: '100%' }}></InputNumber>
            </Form.Item> */}
            <InputNumber
              form={form}
              value={value?.cmpy_aoi}
              name="cmpy_aoi"
              label={t(siteLabelUser + 'fields.aoiNumber')}
              maxLength={4}
              min={0}
              max={9999}
              precision={0}
              style={{ width: '100%' }}
            />
            <Form.Item name="cmpy_addr" label={t('fields.address')}>
              <Select
                dropdownMatchSelectWidth={false}
                allowClear
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
            <Row gutter={[10, 10]}>
              <Col span={21}>
                <Card size="small" title={t('fields.companyType')}>
                  <Row gutter={[8, 10]}>
                    <Col span={6}>
                      <Form.Item name="site_manager" noStyle>
                        <Checkbox
                          checked={site_manager && !IS_CREATING}
                          disabled={true}
                          onChange={onManagerChange}
                        >
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
              </Col>
              <Col span={3} style={{ float: 'right' }}>
                <Logo value={value} form={form} />
              </Col>
            </Row>
            {config?.siteEnabledPIDX && (
              <Row gutter={[8, 10]}>
                <Col span={8}>
                  <PidxCarrier form={form} value={value} flag={carrier} />
                </Col>
                <Col span={4}>
                  <PidxSupplier form={form} value={value} flag={supplier} />
                </Col>
                <Col span={4}>
                  <PidxDrawer form={form} value={value} flag={drawer} />
                </Col>
                <Col span={8}>
                  <PidxCustomer form={form} value={value} flag={customer} />
                </Col>
              </Row>
            )}
            {config?.siteEnabledPIDX && (
              <Row gutter={[8, 10]}>
                <Col span={8}>
                  <PidxFein form={form} value={value} flag={carrier} onChange={onFeinChanged} />
                </Col>
                <Col span={8}>
                  <PidxSsn form={form} value={value} flag={carrier} onChange={onSsnChanged} />
                </Col>
                <Col span={8}>
                  <PidxCarrierFein form={form} value={value} flag={carrier} onChange={onCarrierFeinChanged} />
                </Col>
              </Row>
            )}
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
