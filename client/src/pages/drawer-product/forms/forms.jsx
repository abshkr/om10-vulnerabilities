import React, { useState, useEffect, useCallback } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  RedoOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Divider, Checkbox, Col, Row, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import axios from 'axios';
import _ from 'lodash';
import { DRAWER_PRODUCTS } from '../../../api';
import useSWR from 'swr';

import { DrawerCompany, LoadTolerance, ProductCode, ProductName, Group, Hazchem, Generic } from './fields';
import { DataTable } from '../../../components';
import { ALLOCATIONS } from '../../../api';
import columns from './columns';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, handleFormState, access }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { data: payload } = useSWR(`${DRAWER_PRODUCTS.BASES}?prod_code=${value?.prod_code}&prod_cmpycode=${value?.prod_cmpycode}`);
  // const bases = payload?.records;
  console.log("Start")
  console.log(value)
  
  const [type, setType] = useState(undefined);
  const [bases, setBases] = useState([]);
  const [ prod_is_compliant, setCompliant ] = useState(value?.prod_ldtol_flag)
  const [ prod_is_locked, setLocked ] = useState(value?.prod_is_locked)
  const [supplier, setSupplier] = useState(undefined);
  const [lockType, setLockType] = useState(undefined);
  const [selected, setSelected] = useState(null);
  // console.log(bases)
  // console.log(payload?.records)

  // if (payload?.records.length > 0) {
  //   setBases(payload?.records)
  // }

  const { resetFields, setFieldsValue } = form;
  // setFieldsValue({
  //   bases: bases,
  // });

  const IS_CREATING = !value;

  const addBase = () => {
    let payload = [...bases, {
      pitem_prod_code: null,
      pitem_prod_name: null,
    }]
    form.setFieldsValue({
      bases: payload,
    });

    setBases(payload);
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
      });
  });
  
  const onComplete = () => {
    handleFormState(false, null); 
    mutate(DRAWER_PRODUCTS.READ);
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    console.log(values)
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
          .post(ALLOCATIONS.DELETE, value)
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

      setType(undefined);
      setSupplier(undefined);
      setLockType(undefined);
    } 

    if (value) {
      console.log("setFieldsValue in useEffect")
      setFieldsValue({
        prod_desc: value.prod_desc,
        prod_is_compliant: value.prod_is_compliant,
        prod_is_locked: value.prod_is_locked
      });
      setCompliant(value.prod_is_compliant)
      setLocked(value.prod_is_locked)
      getBases();
    }
    console.log("useEffect")
    console.log(bases)
    // if (bases) {
    //   setFieldsValue({
    //     bases: value.bases,
    //   });
    // }

    // if (payload?.records.length > 0) {
    //   setBases(payload?.records)
    // }
    // if (value.prod_code && value.prod_cmpycode) {
    //   getBases();
    // }

  }, [resetFields, value, visible]);
  // }, [resetFields, value, visible, bases]);


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
            type="primary"
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            // disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate}
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
      <Form {...layout} form={form} scrollToFirstError initialValues={value}>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <DrawerCompany form={form} value={value} onChange={setType} />
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
            <Form.Item name="prod_desc" label={t('fields.description')} >
              <TextArea rows={3} />
            </Form.Item>
            {/* <Company form={form} value={value} /> */}
            <Divider orientation="left">{t('fields.baseProducts')}</Divider>
            <Form.Item name="bases" noStyle >
              <DataTable
                data={bases}
                height="70vh"
                minimal
                columns={columns(t, IS_CREATING)}
                handleSelect={(value) => setSelected(value[0])}
              />
            </Form.Item>

            <Button
              type="primary"
              // icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
              onClick={addBase}
              style={{ float: 'right', marginRight: 5, marginTop: 10 }}
            >
              {t('operations.add')}
            ></Button>
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
