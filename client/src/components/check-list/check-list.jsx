import React from 'react';
import { Table } from 'antd';
import { useTranslation } from 'react-i18next';

const CheckList = ({ form, matches, rowKey, columns }) => {
  const { t } = useTranslation();

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
        title={() => <span style={{ textAlign: 'center' }}>{t('descriptions.expiryDateTable')}</span>}
        rowKey={rowKey}
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={matches}
      />
    </div>
  );
};

export default CheckList;
