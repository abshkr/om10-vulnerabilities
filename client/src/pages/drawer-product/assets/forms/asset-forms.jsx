import React, { useEffect } from 'react';

import { EditOutlined, QuestionCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, Button, Tabs, Modal, notification, Drawer, Divider, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';

import _ from 'lodash';

import api, { DRAWER_PRODUCTS } from 'api';

import { DrawerCompany, ProductCode, ProductName } from './fields';
import ImageDisplay from './image-display';
// import './style.css';

const TabPane = Tabs.TabPane;

const AssetForm = ({ value, visible, handleFormState, access, setFilterValue }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { resetFields, setFieldsValue, getFieldValue } = form;

  const onComplete = (prod_code) => {
    handleFormState(false, null);
    // setSelected(null);
    if (prod_code) {
      setFilterValue('' + prod_code);
    }
    mutate(DRAWER_PRODUCTS.ASSETS);
  };

  const onFinish = async () => {
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
          .post(DRAWER_PRODUCTS.ASSETS_UPDATE, values)
          .then(() => {
            onComplete(values.prod_code);

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

  useEffect(() => {
    if (!value && !visible) {
      resetFields();
    }

    if (value) {
      setFieldsValue({
        prod_desc: value.prod_desc,
        prod_is_compliant: value.prod_is_compliant,
        prod_is_locked: value.prod_is_locked,
      });
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

  const backcolorChange = (v) => {
    // const currColor = getFieldValue('prod_backcolor');
    // const currPickColor = getFieldValue('textcolorpicker');
    // console.log('backcolorChange', currColor, currPickColor, v.target.value, v);
    setFieldsValue({
      prod_backcolor: v.target.value,
    });
  };

  const backcolorPostfix = (
    <Form.Item name="backcolorpicker" noStyle>
      <input type="color" onChange={backcolorChange} style={{ width: '3rem' }} />
    </Form.Item>
  );

  const textcolorChange = (v) => {
    setFieldsValue({
      prod_textcolor: v.target.value,
    });
  };

  const textcolorPostfix = (
    <Form.Item name="textcolorpicker" noStyle>
      <input type="color" onChange={textcolorChange} style={{ width: '3rem' }} />
    </Form.Item>
  );

  const onImageClick = (v) => {
    setFieldsValue({
      prod_image: v.target.getAttribute('value'),
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prod_textcolor: value.prod_textcolor,
        textcolorpicker: value.prod_textcolor === '' ? '#ffffff' : value.prod_textcolor,
        // textcolorpicker: value.prod_textcolor,
        prod_backcolor: value.prod_backcolor,
        backcolorpicker: value.prod_backcolor === '' ? '#ffffff' : value.prod_backcolor,
        // backcolorpicker: value.prod_backcolor,
        prod_image: value.prod_image,
      });
    }
  }, [value]);

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={() => handleFormState(false, null)}
      // maskClosable={IS_CREATING}
      destroyOnClose={true}
      // mask={IS_CREATING}
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
            icon={<EditOutlined />}
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={!access?.canUpdate}
          >
            {t('operations.update')}
          </Button>
        </>
      }
    >
      <Form {...layout} form={form} scrollToFirstError initialValues={value}>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1">
            <DrawerCompany form={form} value={value} />
            <ProductCode form={form} value={value} />
            <ProductName form={form} value={value} />

            <Form.Item name="prod_backcolor" label={t('fields.backColor')}>
              <Input style={{ width: '100%' }} addonAfter={backcolorPostfix}></Input>
            </Form.Item>

            <Form.Item name="prod_textcolor" label={t('fields.textColor')}>
              <Input style={{ width: '100%' }} addonAfter={textcolorPostfix}></Input>
            </Form.Item>

            <Divider orientation="left">{t('fields.prodImage')}</Divider>

            <Form.Item name="prod_image" label={t('fields.prodImage')}>
              <Input
                disabled
                addonAfter={
                  value?.prod_image && (
                    <Button
                      type="danger"
                      icon={<CloseOutlined />}
                      onClick={() => {
                        setFieldsValue({
                          prod_image: '',
                        });
                      }}
                      disabled={!value?.prod_image}
                    >
                      {t('operations.clear')}
                    </Button>
                  )
                }
              />
            </Form.Item>

            {/* <div style={{
                display: 'flex',
                height: "15rem",
                backgroundColor: "lightgreen",
              }}>
                {payload?.records.map((item, index) => (
                  <Card 
                    class="prod-image"
                    hoverable
                    style={{ width: 100, height: 95, marginLeft: 10, marginRight: 10 }}
                    cover={<img alt="example" src={item.icon} />}
                  >
                    <Card.Meta title={item.name} />
                  </Card>
                ))}
            </div> */}
            <ImageDisplay onImageClick={onImageClick}></ImageDisplay>
            {/* <div class="flex-container">
                {payload?.records.map((item, index) => (
                  <div style={{
                    display: 'flex', 
                    flexDirection: "column", 
                    alignItems: "center",
                    width: 150}}>
                    <div style={{
                      background: `url('${item.icon}') no-repeat center center/cover`,
                      height: 75,
                      width: 60,
                      }} />
                    <div style={{ height: 25, textAlign: 'center' }}>
                      <a value={item.name} onClick={onImageClick}>{item.name}</a>
                    </div>
                  </div>
                ))}
            </div> */}
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default AssetForm;
