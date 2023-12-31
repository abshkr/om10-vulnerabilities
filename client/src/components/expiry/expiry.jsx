import React, { useState, useEffect } from 'react';
import { CalendarOutlined } from '@ant-design/icons';
import { Table, Button, Popconfirm, Form, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'dayjs';
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
    const tempData = [...data];

    const types = [...payload?.records];
    const index = types.findIndex((item) => row.edt_type_desc === item.edt_type_desc);
    const targetType = types[index];

    const index2 = tempData.findIndex((item) => row.edt_type_code === item.edt_type_code);
    tempData[index2] = { ...row };
    tempData[index2].edt_type_code = targetType.edt_type_code;

    setData(tempData);

    setFieldsValue({
      expiry_dates: tempData,
    });
  };

  const handleAdd = () => {
    const uniqueExpiry = _.uniq(_.map(data, 'edt_type_code'));

    const values = _.reject(payload?.records, (value) => {
      return uniqueExpiry.includes(value.edt_type_code);
    });

    const value = values[0];
    value.ed_status = value.edt_status;

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
      cellClass: 'editable-ag-grid-cell',
    },
    {
      title: t('fields.expiryDate'),
      dataIndex: 'ed_exp_date',
      key: 'ed_exp_date',
      width: 250,
      align: 'center',
      editable: true,
      cellClass: 'editable-ag-grid-cell',
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
      cellClass: 'editable-ag-grid-cell',
    },
    {
      title: t('fields.rejectAuthorization'),
      dataIndex: 'edt_reject',
      key: 'edt_reject',
      align: 'center',
      render: (text, record) => {
        return <Checkbox disabled checked={record?.edt_reject} />;
      },
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
