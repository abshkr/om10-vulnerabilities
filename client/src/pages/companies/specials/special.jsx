import React from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import { Form, Button, Tabs, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import SupplierForm from './supplier-settings'
import OtherForm from './other'
import PrinterForm from './printer'
import TemplateForm from './template'
import _ from 'lodash';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, handleBaseCallBack }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const IS_CREATING = !value;
  
  const onFinish = values => {
    // values.pitem_base_name = _.filter(baseProducts, (item) => {
    //   return item.base_code === values.pitem_base_code;
    // })[0].base_name
    // values.to_create = true
    // handleBaseCallBack(values)
    // Modal.destroyAll();
  };

  const onDelete = values => {
    values.to_delete = true
    handleBaseCallBack(values)
    Modal.destroyAll();
  };

  return (
    <div>
      <Form 
        form={form} 
        onFinish={onFinish} 
        scrollToFirstError
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.supplierSettings')} key="1" style={{ height: '65vh' }}>
            <SupplierForm value={value} form={form}></SupplierForm>
          </TabPane>
          <TabPane tab={t('tabColumns.others')} key="2" style={{ height: '60vh' }}>
            <OtherForm value={value} form={form}></OtherForm>
          </TabPane>
          <TabPane tab={t('tabColumns.printerSettings')} key="3" style={{ height: '60vh' }}>
            <PrinterForm value={value} form={form}></PrinterForm>
          </TabPane>
          <TabPane tab={t('tabColumns.transportationDoc')} key="4" style={{ height: '60vh' }}>
            <TemplateForm value={value} form={form}></TemplateForm>
          </TabPane>
        </Tabs>

        <Form.Item>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => Modal.destroyAll()}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
            htmlType="submit"
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
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormModal;
