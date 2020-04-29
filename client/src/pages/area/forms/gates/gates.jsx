import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Button } from 'antd';
import _ from 'lodash';

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Gates = ({ form, value }) => {
  const [data, setData] = useState(value?.gates || []);
  const [editingKey, setEditingKey] = useState('');
  const [count, setCount] = useState(value?.gates?.length || 0);

  const isEditing = (record) => record.gate_k === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.gate_k);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const onAdd = () => {
    const payload = {
      key: count,
      gate_k: count,
      gate_dvce: null,
      krdc_type: null,
      g_tcd: null,
    };

    const target = [...data, payload];

    setData(target);
    setCount(count + 1);
  };

  const onDelete = (key) => {
    console.log(key);

    const payload = _.filter(data, (element) => {
      return element.gate_k !== key.gate_k;
    });

    setData(payload);
  };

  const columns = [
    {
      title: 'Gate',
      dataIndex: 'gate_k',
      align: 'center',
      editable: true,
    },
    {
      title: 'Device Code',
      dataIndex: 'gate_dvce',
      align: 'center',
      editable: true,
    },
    {
      title: 'Device Type',
      dataIndex: 'krdc_type',
      align: 'center',
      editable: true,
    },

    {
      title: 'Timecode',
      dataIndex: 'g_tcd',
      align: 'center',
      editable: true,
    },

    {
      title: 'Operation',
      dataIndex: 'operation',
      align: 'center',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="link"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              Cancel
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Button
              type="link"
              style={{
                marginRight: 8,
              }}
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              Edit
            </Button>

            <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record)}>
              Delete
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Button
        onClick={onAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add Gate
      </Button>

      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
        scroll={{ y: '30vh' }}
        style={{ marginBottom: 20 }}
      />
    </Form>
  );
};

export default Gates;
