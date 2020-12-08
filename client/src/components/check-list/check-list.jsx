import React from 'react';
import { Table, Form } from 'antd';
import { useTranslation } from 'react-i18next';

const CheckList = ({ form, matches, rowKey, columns, setBulk }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setFieldsValue({
        bulk_edit: selectedRows
      });
      
      if (setBulk) {
        setBulk(selectedRows)
      }
    }
  };

  return (
    <Form.Item name="bulk_edit">
      <Table
        size="small"
        bordered
        title={() => <span style={{ textAlign: 'center' }}>{t('descriptions.expiryDateTable')}</span>}
        rowKey={rowKey}
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={matches}
      />
    </Form.Item>
  );
};

export default CheckList;
