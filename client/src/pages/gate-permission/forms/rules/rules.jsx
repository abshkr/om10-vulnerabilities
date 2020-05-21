import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Table, Button, Popconfirm, Form, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { GATE_PERMISSION } from '../../../../api';

import Cell from './cell';
import Row from './row';

const Rules = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: roles, isValidating: isRolesLoading } = useSWR(GATE_PERMISSION.ROLE_TYPES);
  const { data: cases, isValidating: isCasesLoading } = useSWR(GATE_PERMISSION.RULE_CASES);
  const { data: types, isValidating: isTypesLoading } = useSWR(GATE_PERMISSION.EQUIPMENT_TYPES);
  const { data: next, isValidating: isNextLoading } = useSWR(GATE_PERMISSION.NEXT_PRM_ID);
  
  const IS_LOADING = isRolesLoading || isCasesLoading || isTypesLoading || isNextLoading;


  const [data, setData] = useState(value ? value.rules : []);
  
  const { setFieldsValue } = form;
  
  const handleSave = (row) => {
    const payload = [...data];
    const toUpdate = payload.find(x => x.rule_id === row.rule_id);

    Object.assign(toUpdate, row);
    
    setData(payload);

    setFieldsValue({
      rules: payload,
    });
  };

  const onAdd = () => {
    let prmssn_k;
    if (!value) {
      prmssn_k = next.records[0].next_prm_id;
    } else {
      prmssn_k = value.prmssn_k
    }
    
    const payload = {
      rule_id: data.length == 0? prmssn_k : prmssn_k * 1000 + data.length + 1,
      rule_case: '',
      rule_casename: '',
      rule_etyp: '',
      rule_etypname: '',
      rule_auth: '',
      rule_authname: '',
      rule_first: data.length === 0,
      rule_parent: prmssn_k,
      rule_expiry_check: false,
      is_new: true,
    };

    setData([...data, payload]);
    setFieldsValue({
      rules: [...data, payload],
    });
  };

  const handleDelete = (key) => {
    const payload = [...data];
    const source = payload.filter((item) => item.rule_id !== key);

    setFieldsValue({
      rules: source,
    });

    setData(source);
  };

  const defaults = [
    {
      title: t('fields.permissionRuleId'),
      dataIndex: 'rule_id',
      key: 'rule_id',
      width: '15%',
      align: 'center',
    },
    {
      title: t('fields.permissionRuleClass'),
      dataIndex: 'rule_casename',
      key: 'rule_casename',
      width: '20%',
      align: 'center',
      editable: true,
    },
    {
      title: t('fields.equipmentType'),
      dataIndex: 'rule_etypname',
      key: 'rule_etypname',
      align: 'center',
      editable: true,
      width: '15%',
    },

    {
      title: t('fields.authorityType'),
      dataIndex: 'rule_authname',
      key: 'rule_authname',
      align: 'center',
      editable: true,
      width: '15%',
    },

    {
      title: t('fields.firstRule'),
      dataIndex: 'rule_first',
      key: 'rule_first',
      align: 'center',
      editable: true,
    },

    {
      title: t('fields.expiryCheck'),
      dataIndex: 'rule_expiry_check',
      key: 'rule_expiry_check',
      align: 'center',
      editable: true,
    },

    {
      title: t('fields.operations'),
      dataIndex: 'operation',
      align: 'center',
      key: 'operation',
      editable: false,
      width: '12%',
      render: (text, record) =>
        data.length >= 1 ? (
          <Form.Item>
            {/*eslint-disable */}
            <a href="#" onClick={() => handleDelete(record.rule_id)}>{t('operations.delete')}</a>
          </Form.Item>
        ) : null,
    },
  ];

  const columns = defaults.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record)=>({
          record,
          data: data,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: handleSave,
          roles,
          cases,
          types,
        })
    };
  });

  return (
    <Form.Item name="rules">
      <>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          style={{ marginRight: 5, marginBottom: 10 }}
          onClick={onAdd}
        >
          {t('operations.addPermissions')}
        </Button>
      </>

      <Table
        rowKey="rule_id"
        loading={IS_LOADING}
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
        scroll={{ y: '57vh' }}
      />
    </Form.Item>
  );
};

export default Rules;
