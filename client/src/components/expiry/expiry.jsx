import React, { useState } from 'react';
import Cell from './cell';
import Row from './row';
import _ from 'lodash';
import moment from 'moment';
import { Table, Button, Popconfirm, Icon } from 'antd';

const Expiry = ({ form, value, t, types }) => {
  const [count, setCount] = useState(value ? value.expiry_dates.length : 3);
  const [data, setData] = useState(!!value ? value.expiry_dates : []);
  const { getFieldDecorator, setFieldsValue } = form;

  const handleSave = row => {
    const payload = [...data];

    const index = payload.findIndex(item => row.edt_type_code === item.edt_type_code);
    const item = payload[index];

    payload.splice(index, 1, {
      ...item,
      ...row
    });

    setData(payload);

    setFieldsValue({
      expiry_dates: payload
    });
  };

  const handleAdd = () => {
    const uniqueExpiry = _.uniq(_.map(data, 'edt_type_code'));

    const values = _.reject(types, value => {
      return uniqueExpiry.includes(value.edt_type_code);
    });

    const payload = values[0];

    setData([...data, payload]);
    setCount(count + 1);
  };

  const handleDelete = key => {
    const payload = [...data];
    const source = payload.filter(item => item.edt_type_code !== key);

    setData(source);

    setFieldsValue({
      expiry_dates: source
    });
  };

  const defaults = [
    {
      title: t('fields.typeDescription'),
      dataIndex: 'edt_type_desc',
      key: 'edt_type_desc',
      width: 250,

      editable: true
    },
    {
      title: t('fields.expiryDate'),
      dataIndex: 'ed_exp_date',
      key: 'ed_exp_date',
      width: 300,
      align: 'center',
      editable: true,
      render: (text, record) => (
        <span>
          {text === ''
            ? t('placeholder.selectDate')
            : !!text
            ? Intl.DateTimeFormat().format(moment(text, 'YYYY-MM-DD HH:mm:ss'))
            : t('placeholder.selectDate')}
        </span>
      )
    },
    {
      title: t('fields.enabled'),
      dataIndex: 'ed_status',
      key: 'ed_status',
      align: 'center',
      editable: true,
      render: (text, record) => (
        <span>
          {text === '' ? t('placeholder.selectStatus') : <Icon type={text ? 'check' : 'close'} />}
        </span>
      )
    },
    {
      title: t('fields.operations'),
      dataIndex: 'operation',
      align: 'center',
      key: 'operation',
      render: (text, record) =>
        data.length >= 1 ? (
          <Popconfirm
            title={t('prompts.delete')}
            onConfirm={() => handleDelete(record.edt_type_code)}
          >
            {/*eslint-disable */}
            <a href="#">{t('operations.delete')}</a>
            {/*eslint-enable */}
          </Popconfirm>
        ) : null
    }
  ];

  const columns = defaults.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        data: data,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        expiry: types,
        handleSave: handleSave
      })
    };
  });

  getFieldDecorator('expiry_dates');

  return (
    <div>
      <Button
        shape="round"
        icon="calendar"
        onClick={handleAdd}
        type="primary"
        style={{ marginBottom: 16 }}
        disabled={data.length === types.length}
      >
        {t('operations.addNewExpiry')}
      </Button>

      <Table
        size="middle"
        rowKey="edt_type_code"
        components={{
          body: {
            row: Row,
            cell: Cell
          }
        }}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={data}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default Expiry;
