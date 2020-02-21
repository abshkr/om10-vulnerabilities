import React, { useEffect, useState, useCallback } from 'react';
import { Table, Select } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { Equipment } from '../../../../components';
import { equipmentList } from '../../../../api';
import columns from './columns';
import Cell from './cell';
import Row from './row';

const Compartments = ({ form, value, t, equipment, values }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelect] = useState(null);
  const [types, setTypes] = useState([]);
  const [data, setData] = useState([]);

  const { getFieldDecorator, setFieldsValue } = form;

  getFieldDecorator('compartments');

  const fetch = useCallback(
    id => {
      setIsLoading(true);

      axios.all([equipmentList.readCompartments(id), equipmentList.readEquipmentTypes()]).then(
        axios.spread((compartments, types) => {
          setData(compartments.data.records);
          setTypes(types.data.records);
          setIsLoading(false);
          setFieldsValue({ compartments: compartments.data.records });
        })
      );
    },
    [setFieldsValue]
  );

  const fetchByEquipment = useCallback(
    id => {
      setIsLoading(true);

      axios.all([equipmentList.readCompartmentEquipment(id), equipmentList.readEquipmentTypes()]).then(
        axios.spread((compartments, types) => {
          setData(compartments.data.records);
          setTypes(types.data.records);
          setIsLoading(false);
          setFieldsValue({ compartments: compartments.data.records });
        })
      );
    },
    [setFieldsValue]
  );

  useEffect(() => {
    if (value) {
      fetch(value.eqpt_id);
      setSelect(value.eqpt_code);
    } else {
      if (equipment) {
        fetchByEquipment(equipment);
      }
    }
  }, [value, fetch, equipment, fetchByEquipment]);

  const save = row => {
    let payload = [...data];

    const index = payload.findIndex(item => item.cmpt_no === row.cmpt_no);

    payload.splice(index, 1, row);

    setData(payload);

    setFieldsValue({
      compartments: payload
    });
  };

  const handleImage = () => {
    const etp = value ? value.eqpt_etp : equipment;
    const type = _.find(types, ['etyp_id', etp]);
    const image = type ? type.image : null;

    return image;
  };

  const handleOptions = () => {
    const fit = value ? ['eqpt_etp_title', value.eqpt_etp_title] : ['eqpt_etp', equipment];
    const options = _.filter(values, fit) ? _.filter(values, fit) : [];
    return options;
  };

  const handleSelect = value => {
    fetch(value);
    setSelect(value);
  };

  const fields = columns(t).map(col => {
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
        handleSave: save
      })
    };
  });

  const image = handleImage();
  const options = handleOptions();

  return (
    <div>
      <Equipment value={image} />

      <Select
        placeholder="Please Select"
        style={{ marginBottom: 10, marginTop: 10 }}
        showSearch
        value={selected}
        onSelect={handleSelect}
        loading={!image}
        disabled={options.length === 0}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options.map((item, index) => (
          <Select.Option key={item.eqpt_id} value={item.eqpt_id}>
            {item.eqpt_code} / {item.eqpt_title}
          </Select.Option>
        ))}
      </Select>
      <div style={{ textAlign: 'center', marginBottom: 10 }}>{t('descriptions.compartmentCopy')}</div>
      <Table
        size="middle"
        rowKey="cmpt_no"
        loading={isLoading}
        components={{
          body: {
            row: Row,
            cell: Cell
          }
        }}
        scroll={{ y: '35vh' }}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={data}
        columns={fields}
        pagination={false}
      />
    </div>
  );
};

export default Compartments;
