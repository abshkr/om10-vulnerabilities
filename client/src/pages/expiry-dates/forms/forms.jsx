import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Button, Tabs, Modal, Divider } from 'antd';

import { ExpiryDateTarget, TypeCode, TypeDescription, DateTimeFormat, DefaultValue, Flags } from './fields';

const TabPane = Tabs.TabPane;

const FormModal = ({ form, refresh, value, access, data }) => {
  const { t } = useTranslation();

  const handleCreate = () => {
    form.validateFields((err, values) => {
      if (!err) {
        Modal.confirm({
          title: t('prompts.create'),
          okText: t('operations.yes'),
          okType: 'primary',
          cancelText: t('operations.no'),
          centered: true,
          onOk: () => {}
        });
      }
    });
  };

  const handleUpdate = () => {
    form.validateFields((err, values) => {
      if (!err) {
        Modal.confirm({
          title: t('prompts.update'),
          okText: t('operations.yes'),
          okType: 'primary',
          cancelText: t('operations.no'),
          centered: true,
          onOk: () => {}
        });
      }
    });
  };

  const handleDelete = () => {};

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: handleDelete
    });
  };

  return (
    <div>
      <Form>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane className="ant-tab-window" tab={t('tabColumns.general')} forceRender={true} key="1">
            <ExpiryDateTarget form={form} value={value} />
            <TypeCode form={form} value={value} data={data} />
            <TypeDescription form={form} value={value} data={data} />

            <Divider>{t('divider.flags')}</Divider>

            <Flags form={form} value={value} />

            <Divider>{t('divider.dateTime')}</Divider>

            <DefaultValue form={form} value={value} />

            <DateTimeFormat form={form} value={value} />
          </TabPane>
        </Tabs>
      </Form>

      <Button shape="round" icon="close" style={{ float: 'right' }} onClick={() => Modal.destroyAll()}>
        {t('operations.cancel')}
      </Button>

      <Button
        shape="round"
        type="primary"
        icon={!!value ? 'edit' : 'plus'}
        style={{ float: 'right', marginRight: 5 }}
        disabled={value ? !access.canUpdate : !access.canCreate}
        onClick={value ? handleUpdate : handleCreate}
      >
        {value ? t('operations.update') : t('operations.create')}
      </Button>

      {value && (
        <Button
          shape="round"
          type="danger"
          icon="delete"
          style={{ float: 'right', marginRight: 5 }}
          onClick={showDeleteConfirm}
          disabled={!access.canDelete}
        >
          {t('operations.delete')}
        </Button>
      )}
    </div>
  );
};

const Forms = Form.create()(FormModal);

export default Forms;
