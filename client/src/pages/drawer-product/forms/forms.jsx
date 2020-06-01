import React, { useState, useEffect, useCallback } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Divider, Checkbox, Col, Row, Input, Select, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';
import { DRAWER_PRODUCTS } from '../../../api';

import { DrawerCompany, LoadTolerance, ProductCode, ProductName, Group, Hazchem, Generic, DangerousGoods } from './fields';
import { DataTable, FormModal } from '../../../components';
import columns from './columns';
import BaseProductForm from './base-form';

const TabPane = Tabs.TabPane;

const DrawerForm = ({ value, visible, handleFormState, auth }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  
  const [bases, setBases] = useState([]);
  const [prod_is_compliant, setCompliant] = useState(value?.prod_ldtol_flag)
  const [prod_is_locked, setLocked] = useState(value?.prod_is_locked)
  const [selected, setSelected] = useState(null);

  const [baseLoading, setBaseLoading] = useState(true);
  const [newBase, setNewBase] = useState(null);

  const { resetFields, setFieldsValue } = form;

  const IS_CREATING = !value;

  const handleBaseCallBack = (values) => {
    if (values.to_delete) {
      return deleteBase();
    }

    let payload = null;
    if (!values.to_create) {
      payload = [..._.filter(bases, (item) => {
        return item.pitem_base_code !== selected.pitem_base_code
      }), {
        pitem_base_code: values.pitem_base_code,
        pitem_bltol_ntol: values.pitem_bltol_ntol,
        pitem_bltol_flag: values.pitem_bltol_flag,
        pitem_bltol_ptol: values.pitem_bltol_ptol,
        pitem_ratio_value: values.pitem_ratio_value,
        pitem_base_name: values.pitem_base_name,
      }]
      setSelected(null)
    } else {
      payload = [...bases, {
        pitem_base_code: values.pitem_base_code,
        pitem_bltol_ntol: values.pitem_bltol_ntol,
        pitem_bltol_flag: values.pitem_bltol_flag,
        pitem_bltol_ptol: values.pitem_bltol_ptol,
        pitem_ratio_value: values.pitem_ratio_value,
        pitem_base_name: values.pitem_base_name,
      }]
    }
      
    form.setFieldsValue({
      bases: payload,
    });

    setBases(payload);
  }

  const deleteBase = () => {
    let payload = _.filter(bases, (item) => {
      return item.pitem_base_code !== selected.pitem_base_code
    });
    form.setFieldsValue({
      bases: payload,
    });

    setBases(payload);
    setSelected(null)
  }

  const handleBase = (v) => {
    FormModal({
      width: "50vh",
      value,
      form: <BaseProductForm value={v} handleBaseCallBack={handleBaseCallBack}/>,
      id: v?.pitem_base_code,
      name: v?.pitem_base_name,
      t
    });
  }

  const getBases = useCallback(() => {
    axios
      .get(`${DRAWER_PRODUCTS.BASES}?prod_code=${value?.prod_code}&prod_cmpycode=${value?.prod_cmpycode}`)
      .then((response) => {
        const payload = response.data?.records || [];
        form.setFieldsValue({
          bases: payload,
        });

        setBases(payload);
        setBaseLoading(false);
      });
  });
  
  const onComplete = () => {
    handleFormState(false, null); 
    setSelected(null);
    mutate(DRAWER_PRODUCTS.READ);
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    if (values.bases === undefined || values.bases.length <= 0) {
      Modal.info({
        title: t('prompts.notEnoughBase'),
        okText: t('operations.close')
      })
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
        await axios
          .post(IS_CREATING ? DRAWER_PRODUCTS.CREATE : DRAWER_PRODUCTS.UPDATE, values)
          .then(() => {
            onComplete();

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
      icon: <DeleteOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
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
    } 

    if (value) {
      setFieldsValue({
        prod_desc: value.prod_desc,
        prod_is_compliant: value.prod_is_compliant,
        prod_is_locked: value.prod_is_locked
      });
      setCompliant(value.prod_is_compliant)
      setLocked(value.prod_is_locked)
      getBases();
    }
    
  }, [resetFields, value, visible]);

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
      <Form {...layout} form={form} scrollToFirstError initialValues={value}>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <DrawerCompany form={form} value={value} />
            <ProductCode form={form} value={value} />
            <ProductName form={form} value={value} />
            <Group form={form} value={value} />
            <Hazchem form={form} value={value} />
            <Generic form={form} value={value} />
            <LoadTolerance form={form} value={value} />
            <Form.Item label={t('fields.prodCompliant')}>
              <Row >
                <Col span={4}>
                  <Form.Item noStyle name="prod_is_compliant" >
                    <Checkbox 
                      checked={prod_is_compliant} 
                      onChange={(v) => {
                        setCompliant(v.target.checked)
                        setFieldsValue({
                          prod_is_compliant: v.target.checked,
                        });
                      }}
                    ></Checkbox>
                  </Form.Item>
                </Col>
                <Col span={20}>
                  <Form.Item name="prod_is_locked" label={t('fields.locked')} >
                    <Checkbox 
                      checked={prod_is_locked}
                      onChange={(v) => {
                        setLocked(v.target.checked)
                        setFieldsValue({
                          prod_is_locked: v.target.checked,
                        });
                      }}
                    ></Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item >
            <DangerousGoods form={form} value={value} />
            <Form.Item name="prod_desc" label={t('fields.description')} >
              <TextArea rows={2} />
            </Form.Item>
            <Divider orientation="left">{t('fields.baseProducts')}</Divider>
            <Form.Item name="bases" noStyle >
              <DataTable
                data={bases}
                height="78vh"
                minimal
                columns={columns(t)}
                handleSelect={(value) => setSelected(value[0])}
              />
            </Form.Item>
            
            
            <Button
              type="primary"
              icon={<PlusOutlined />}
              loading={baseLoading && !IS_CREATING}
              onClick={()=>handleBase(null)}
              style={{ float: 'right', marginRight: 5, marginTop: 10 }}
            >
              {t('operations.addBase')}
            </Button>

            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={()=>handleBase(selected)}
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

          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default DrawerForm;
