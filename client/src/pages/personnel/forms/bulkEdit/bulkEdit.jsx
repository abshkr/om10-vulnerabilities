import React from 'react';
import columns from './columns';
import { Table } from 'antd';

const BulkEdit = ({ form, matches, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  getFieldDecorator('bulk_edit');

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setFieldsValue({
        bulk_edit: selectedRows
      });
    }
  };

  return (
    <div style={{ marginTop: 10 }}>
      <Table
        size="small"
        bordered
        title={() => (
          <span style={{ textAlign: 'center' }}>{t('descriptions.expiryDateTable')}</span>
        )}
        rowKey="per_code"
        pagination={false}
        rowSelection={rowSelection}
        columns={columns(t)}
        dataSource={matches}
      />
    </div>
  );
};

export default BulkEdit;
