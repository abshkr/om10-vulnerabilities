import React, { useState, useEffect } from 'react';
import { CalendarOutlined } from '@ant-design/icons';
import { Table, Button, Popconfirm, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import _ from 'lodash';

import Cell from './cell';
import Row from './row';
import useSWR from 'swr';

const Expiry = ({ form, value, type }) => {
  const { t } = useTranslation();
  const { data: payload } = useSWR(type);

  const [count, setCount] = useState(value ? value.expiry_dates.length : 3);
  const [data, setData] = useState(value ? value.expiry_dates : []);
  
  const { setFieldsValue } = form;

  const handleSave = (row) => {
    const payload = [...data];

    const index = payload.findIndex((item) => row.edt_type_code === item.edt_type_code);
    const item = payload[index];

    payload.splice(index, 1, {
      ...item,
      ...row,
    });

    setData(payload);

    setFieldsValue({
      expiry_dates: payload,
    });
  };

  const handleAdd = () => {
    const uniqueExpiry = _.uniq(_.map(data, 'edt_type_code'));

    const values = _.reject(payload?.records, (value) => {
      return uniqueExpiry.includes(value.edt_type_code);
    });

    const value = values[0];

    if (value.edt_def_exp_date === '') {
      setData([...data, value]);
      setCount(count + 1);
    } else {
      const payload = {
        ...value,
        ed_exp_date: value.edt_def_exp_date,
      };

      setData([...data, payload]);
      setFieldsValue({
        expiry_dates: [...data, payload],
      });
      setCount(count + 1);
    }
  };

  const handleDelete = (key) => {
    const payload = [...data];
    const source = payload.filter((item) => item.edt_type_code !== key);

    setData(source);

    setFieldsValue({
      expiry_dates: source,
    });
  };

  const defaults = [
    {
      title: t('fields.typeDescription'),
      dataIndex: 'edt_type_desc',
      key: 'edt_type_desc',
      width: 250,
      editable: true,
    },
    {
      title: t('fields.expiryDate'),
      dataIndex: 'ed_exp_date',
      key: 'ed_exp_date',
      width: 300,
      align: 'center',
      editable: true,
      render: (text, record) => {
        return (
          <span>
            {text === '' || text === undefined
              ? t('placeholder.selectDate')
              : moment(text, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')}
          </span>
        );
      },
    },
    {
      title: t('fields.enabled'),
      dataIndex: 'ed_status',
      key: 'ed_status',
      align: 'center',
      editable: true,
    },
    {
      title: t('fields.operations'),
      dataIndex: 'operation',
      align: 'center',
      key: 'operation',
      render: (text, record) =>
        data.length >= 1 ? (
          <Popconfirm title={t('prompts.delete')} onConfirm={() => handleDelete(record.edt_type_code)}>
            {/*eslint-disable */}
            <a href="#">{t('operations.delete')}</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const columns = defaults.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        data: data,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        expiry: payload?.records,
        handleSave: handleSave,
      }),
    };
  });

  useEffect(() => {
    if (value) {
      setData(value ? value.expiry_dates : []);
    }
  }, [value]);

  return (
    <Form.Item name="expiry_dates">
      <Button
        icon={<CalendarOutlined />}
        onClick={handleAdd}
        type="primary"
        style={{ marginBottom: 16 }}
        disabled={data.length === payload?.records.length}
      >
        {t('operations.addNewExpiry')}
      </Button>

      <Table
        size="middle"
        rowKey="edt_type_code"
        components={{
          body: {
            row: Row,
            cell: Cell,
          },
        }}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={data}
        columns={columns}
        pagination={false}
      />
    </Form.Item>
  );
};

export default Expiry;
