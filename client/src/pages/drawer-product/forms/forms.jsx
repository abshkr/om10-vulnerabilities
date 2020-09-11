import React, { useState, useEffect, useCallback } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
  TrademarkOutlined,
} from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, message, Drawer, Checkbox, Col, Row, Input, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import { SWRConfig } from 'swr';
import { fetcher } from 'utils';

import _ from 'lodash';
import api, { DRAWER_PRODUCTS } from '../../../api';
import GenericForm from '../generics/forms'

import {
  DrawerCompany,
  LoadTolerance,
  ProductCode,
  ProductName,
  Group,
  Hazchem,
  Generic,
  DangerousGoods,
} from './fields';

import { DataTable, FormModal } from '../../../components';
import columns from './columns';
import BaseProductForm from './base-form';
import HotLitresForm from './hot-litres';
import LinkedDrawerProducts from './linked-drawer-products';

const TabPane = Tabs.TabPane;

const DrawerForm = ({ value, visible, handleFormState, access, config, setFilterValue }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { TextArea } = Input;

  const [bases, setBases] = useState([]);
  const [prod_is_compliant, setCompliant] = useState(value?.prod_ldtol_flag);
  const [prod_is_locked, setLocked] = useState(value?.prod_is_locked);
  const [selected, setSelected] = useState(null);
  const [hotFlag, setHotFlag] = useState(value?.prod_check_hot_volume)

  const [baseLoading, setBaseLoading] = useState(true);
  const [genericFlag, setGenericFlag] = useState(false);

  const { resetFields, setFieldsValue } = form;

  const fields = columns(t, config);

  const IS_CREATING = !value;

  const manageGenerics = () => {
    Modal.info({
      className: 'form-container',
      title: t('operations.manageGeneric'),
      centered: true,
      width: '60vw',
      icon: <EditOutlined />,
      content: (
        <SWRConfig
          value={{
            refreshInterval: 0,
            fetcher,
          }}
        >
          <GenericForm onClose={()=>{setGenericFlag(true);}}/>
        </SWRConfig>
      ),
      okButtonProps: {
        style: { display: 'none' },
      },
    });
  };

  const adjustHotTempCheckFlag = (bases) => {
    let hotFound=false;

    for (let i=0; i<bases.length; i++) {
      const base = bases[i];
      if ( !!base && base?.pitem_hot_check && _.toNumber(base?.pitem_ratio_value) > 0 ) {
        hotFound = true;
        break;
      }
    }
    
    setHotFlag(hotFound);
    setFieldsValue({
      prod_check_hot_volume: hotFound,
    });
  }

  const handleBaseCallBack = (values) => {
    if (values.to_delete) {
      return deleteBase();
    }

    const payload = [];
    if (!values.to_create) {
      // if the latest pitem_hot_main is true, other base's pitem_hot_main must be false
      _.forEach(bases, (item) => {
        if (item.pitem_base_code !== selected?.pitem_base_code) {
          if (values.pitem_hot_main === true) {
            item.pitem_hot_main = false;
          }
          payload.push(item);
        } else {
          selected.pitem_base_code = values.pitem_base_code;
          selected.pitem_bltol_ntol = values.pitem_bltol_ntol;
          selected.pitem_bltol_flag = values.pitem_bltol_flag;
          selected.pitem_bltol_ptol = values.pitem_bltol_ptol;
          selected.pitem_ratio_value = values.pitem_ratio_value;
          selected.pitem_hot_main = values.pitem_hot_main;

          selected.pitem_base_name = values.pitem_base_name;
          selected.pitem_bclass_name = values.pitem_bclass_name;

          selected.pitem_base_class = values.pitem_base_class;
          selected.pitem_adtv_flag = values.pitem_adtv_flag;
          selected.pitem_hot_check = values.pitem_hot_check;
          selected.pitem_bclass_dens_lo = values.pitem_bclass_dens_lo;
          selected.pitem_bclass_dens_hi = values.pitem_bclass_dens_hi;
          selected.pitem_bclass_vcf_alg = values.pitem_bclass_vcf_alg;
          selected.pitem_bclass_temp_lo = values.pitem_bclass_temp_lo;
          selected.pitem_bclass_temp_hi = values.pitem_bclass_temp_hi;
          payload.push(selected);
        }
      });
      /* payload = [
        ..._.filter(bases, (item) => {
          return item.pitem_base_code !== selected?.pitem_base_code;
        }),
        {
          pitem_base_code: values.pitem_base_code,
          pitem_bltol_ntol: values.pitem_bltol_ntol,
          pitem_bltol_flag: values.pitem_bltol_flag,
          pitem_bltol_ptol: values.pitem_bltol_ptol,
          pitem_ratio_value: values.pitem_ratio_value,
          pitem_base_name: values.pitem_base_name,
          pitem_bclass_name: values.pitem_bclass_name,
          pitem_hot_main: values.pitem_hot_main,
        },
      ]; */
      setSelected(null);
      // setSelected(selected);
      setBases([]);
    } else {
      if (
        _.find(bases, (item) => {
          return item.pitem_base_code === values.pitem_base_code;
        })
      ) {
        notification.error({
          message: t('messages.validationFailed'),
          description: t('descriptions.alreadyExists'),
        });
        return;
      }

      _.forEach(bases, (item) => {
        if (values.pitem_hot_main === true) {
          item.pitem_hot_main = false;
        }
        payload.push(item);
      });
      payload.push({
        pitem_base_code: values.pitem_base_code,
        pitem_bltol_ntol: values.pitem_bltol_ntol,
        pitem_bltol_flag: values.pitem_bltol_flag,
        pitem_bltol_ptol: values.pitem_bltol_ptol,
        pitem_ratio_value: values.pitem_ratio_value,
        pitem_hot_main: values.pitem_hot_main,
        pitem_base_name: values.pitem_base_name,
        pitem_bclass_name: values.pitem_bclass_name,
        pitem_base_class: values.pitem_base_class,
        pitem_adtv_flag: values.pitem_adtv_flag,
        pitem_hot_check: values.pitem_hot_check,
        pitem_bclass_dens_lo: values.pitem_bclass_dens_lo,
        pitem_bclass_dens_hi: values.pitem_bclass_dens_hi,
        pitem_bclass_vcf_alg: values.pitem_bclass_vcf_alg,
        pitem_bclass_temp_lo: values.pitem_bclass_temp_lo,
        pitem_bclass_temp_hi: values.pitem_bclass_temp_hi,
      });
    }

    /* form.setFieldsValue({
      bases: payload,
    }); */

    setBases(payload);
  };

  const deleteBase = () => {
    const payload = _.filter(bases, (item) => {
      return item.pitem_base_code !== selected?.pitem_base_code;
    });
    /* form.setFieldsValue({
      bases: payload,
    }); */

    setBases(payload);
    setSelected(null);
  };

  const handleBase = (v) => {
    FormModal({
      width: '30vw',
      value: v,
      form: <BaseProductForm value={v} handleBaseCallBack={handleBaseCallBack} config={config} />,
      id: v?.pitem_base_code,
      name: v?.pitem_base_name,
      t,
    });
  };

  const getBases = useCallback(() => {
    api
      .get(`${DRAWER_PRODUCTS.BASES}?prod_code=${value?.prod_code}&prod_cmpycode=${value?.prod_cmpycode}`)
      .then((response) => {
        const payload = response.data?.records || [];
        /* form.setFieldsValue({
          bases: payload,
        }); */

        setBases(payload);
        setBaseLoading(false);
      });
  });

  const onComplete = (prod_code) => {
    handleFormState(false, null);
    setSelected(null);
    if (prod_code) {
      setFilterValue('' + prod_code);
    } else {
      setFilterValue(' ');
    }
    mutate(DRAWER_PRODUCTS.READ);
  };

  const onFinish = async () => {
    try {

      const values = await form.validateFields();

      if (values.bases === undefined || values.bases.length <= 0) {
        Modal.info({
          title: t('prompts.notEnoughBase'),
          okText: t('operations.cancel'),
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
            .post(IS_CREATING ? DRAWER_PRODUCTS.CREATE : DRAWER_PRODUCTS.UPDATE, values)
            .then(() => {
              onComplete(values.prod_code);

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

    } catch (error) {
      message.error({
        key: 'submit',
        content: t('descriptions.validationFailed'),
      });
    }
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
          .post(DRAWER_PRODUCTS.DELETE, value)
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

  useEffect(() => {
    if (!value && !visible) {
      resetFields();
      setBases([]);
      setCompliant(false);
      setLocked(false);
    }

    if (value) {
      setFieldsValue({
        prod_desc: value.prod_desc,
        prod_is_compliant: value.prod_is_compliant,
        prod_is_locked: value.prod_is_locked,
      });
      setCompliant(value.prod_is_compliant);
      setLocked(value.prod_is_locked);
      getBases();
    }
  }, [resetFields, value, visible]);

  useEffect(() => {
    console.log('Base has been changed!.......', bases)
    form.setFieldsValue({
      bases: bases,
    });

    adjustHotTempCheckFlag(bases);
  }, [bases]);//, adjustHotTempCheckFlag, setFieldsValue]);

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="60vw"
      visible={visible}
      footer={
        <>
          <Button
            type="primary"
            icon={<TrademarkOutlined />}
            onClick={manageGenerics}
            style={{ float: 'left' }}
            disabled={!access?.canUpdate}
          >
            {t('operations.genericProd')}
          </Button>

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
              onClick={onDelete}
              disabled={!access?.canDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
        </>
      }
    >
      <Form
        // {...layout}
        layout="vertical"
        form={form}
        scrollToFirstError
        initialValues={value}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">

            <Row gutter={[8, 2]}>
              <Col span={8}>
                <DrawerCompany form={form} value={value} />
              </Col>
              <Col span={8}>
                <ProductCode form={form} value={value} />
              </Col>
              <Col span={8}>
                <ProductName form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              <Col span={8}>
                <Group form={form} value={value} />
              </Col>
              <Col span={8}>
                <Hazchem form={form} value={value} />
              </Col>
              <Col span={8}>
                <Generic form={form} value={value} flag={genericFlag} setFlag={setGenericFlag} />
              </Col>
            </Row>

            <LoadTolerance form={form} value={value} />

            {config.manageHotProduct && (
              <HotLitresForm value={value} form={form} hotFlag={hotFlag} />
            )}

            {config.manageDCS && (
              <LinkedDrawerProducts value={value} form={form} />
            )}

            <Row gutter={[8, 0]}>
              <Col span={8}>
                <Row gutter={[8, 0]}>
                  <Col span={24}>
                    <DangerousGoods form={form} value={value} />
                  </Col>
                </Row>
                <Row gutter={[8, 0]}>
                  <Col span={12}>
                    <Form.Item name="prod_is_compliant" label={t('fields.prodCompliant')}>
                      <Checkbox
                        valuePropName="checked"
                        checked={prod_is_compliant}
                        onChange={(v) => {
                          setCompliant(v.target.checked);
                          setFieldsValue({
                            prod_is_compliant: v.target.checked,
                          });
                        }}
                      ></Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="prod_is_locked" label={t('fields.locked')}>
                      <Checkbox
                        valuePropName="checked"
                        checked={prod_is_locked}
                        onChange={(v) => {
                          setLocked(v.target.checked);
                          setFieldsValue({
                            prod_is_locked: v.target.checked,
                          });
                        }}
                      ></Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={16}>
                <Form.Item name="prod_desc" label={t('fields.prodDesc')}>
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>

            {/* <Row gutter={[8, 2]}>
              <Col span={8}>
                <Form.Item name="prod_is_compliant" label={t('fields.prodCompliant')}>
                  <Checkbox
                    valuePropName="checked"
                    checked={prod_is_compliant}
                    onChange={(v) => {
                      setCompliant(v.target.checked);
                      setFieldsValue({
                        prod_is_compliant: v.target.checked,
                      });
                    }}
                  ></Checkbox>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="prod_is_locked" label={t('fields.locked')}>
                  <Checkbox
                    valuePropName="checked"
                    checked={prod_is_locked}
                    onChange={(v) => {
                      setLocked(v.target.checked);
                      setFieldsValue({
                        prod_is_locked: v.target.checked,
                      });
                    }}
                  ></Checkbox>
                </Form.Item>
              </Col>
              <Col span={8}>
                <DangerousGoods form={form} value={value} />
              </Col>
            </Row>

            <Row gutter={[8, 2]}>
              <Col span={3}>
                <Form.Item name="prod_desc_title" label={t('fields.description')}>
                </Form.Item>
              </Col>
              <Col span={21}>
                <Form.Item name="prod_desc">
                  <TextArea rows={2} />
                </Form.Item>
              </Col>
            </Row> */}
            
            <Card
              size="small"
              title={t('fields.baseProducts')}
              // bordered={false}
              // style={{margin:0, padding:0}}
              extra={
                <>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    loading={baseLoading && !IS_CREATING}
                    onClick={() => handleBase(null)}
                    style={{ float: 'right', marginRight: 5, marginTop: 10 }}
                  >
                    {t('operations.addBase')}
                  </Button>

                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => handleBase(selected)}
                    style={{ float: 'right', marginRight: 5, marginTop: 10 }}
                    disabled={!selected}
                  >
                    {t('operations.editBase')}
                  </Button>

                  <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    onClick={deleteBase}
                    disabled={!selected}
                    style={{ float: 'right', marginRight: 5, marginTop: 10 }}
                  >
                    {t('operations.deleteBase')}
                  </Button>
                </>
              }
            >
              <Form.Item name="bases">
                <DataTable
                  data={bases}
                  height="78vh"
                  minimal
                  columns={fields}
                  handleSelect={(value) => setSelected(value[0])}
                />
              </Form.Item>
            </Card>
          </TabPane>
          {/* {config.safefillCheckByHighTemp && (
            <TabPane tab={t('tabColumns.companyHotLitres')} key="2">
              <HotLitresForm value={value} form={form}></HotLitresForm>
            </TabPane>
          )} */}
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default DrawerForm;
