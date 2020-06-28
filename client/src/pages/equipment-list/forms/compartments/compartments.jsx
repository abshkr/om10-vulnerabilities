import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Select, Form } from 'antd';

import useSWR from 'swr';
import _ from 'lodash';

import api, { EQUIPMENT_LIST } from '../../../../api';
import columns from './columns';
import Cell from './cell';
import Row from './row';

const Compartments = ({ form, value, equipment, onChange }) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selected, setSelected] = useState(value?.eqpt_code || null);

  const { setFieldsValue } = form;

  const { data: payload } = useSWR(EQUIPMENT_LIST.READ);
  const { data: types } = useSWR(EQUIPMENT_LIST.TYPES);

  const fetchByCompartment = useCallback(
    (id) => {
      setLoading(true);

      api.get(`${EQUIPMENT_LIST.COMPARTMENTS}?eqpt_id=${id}`).then((response) => {
        setData(response.data.records);
        setFieldsValue({ compartments: response.data.records });
        setLoading(false);
      });
    },
    [setFieldsValue]
  );

  const fetchByEquipment = useCallback(
    (id) => {
      setLoading(true);

      api.get(`${EQUIPMENT_LIST.COMPARTMENT_EQUIPMENT}?etyp_id=${id}`).then((response) => {
        // loop through the eqpt type compartment list, add column safefill and sfl with the value of cmpt_capacit
        _.forEach(response?.data?.records, (item) => {
          item.safefill = item.cmpt_capacit;
          item.sfl = item.cmpt_capacit;
        });
        setData(response.data.records);
        setFieldsValue({ compartments: response.data.records });
        setLoading(false);
      });
    },
    [setFieldsValue]
  );

  const save = (row) => {
    let payload = [...data];

    const index = payload.findIndex((item) => item.cmpt_no === row.cmpt_no);

    payload.splice(index, 1, row);

    setData(payload);

    setFieldsValue({
      compartments: payload,
    });
  };

  const handleEquipmentSelect = (value) => {
    fetchByCompartment(value);
    setSelected(value);
  };

  useEffect(() => {
    const predicate = value ? ['eqpt_etp_title', value.eqpt_etp_title] : ['eqpt_etp', String(equipment)];
    const options = _.filter(payload?.records, predicate) || [];

    setOptions(options);
    setSelected(options[0]?.eqpt_id);
  }, [value, payload, equipment]);

  useEffect(() => {
    // the eqpttype in value?.eqpt_etp is String and equipment is Number,
    // so etp will be a String in EDIT mode, a Number in CREATE mode.
    // But etyp_id in eqpt types is a Number, so we must force etp to Number.
    const etp = value?.eqpt_etp || equipment;
    const type = _.find(types?.records, ['etyp_id', _.toNumber(etp)]);
    const image = type?.image?.toLowerCase() || null;
    console.log('compartments - image', equipment, value?.eqpt_etp, etp, type, type?.image, image);

    onChange(image);
  }, [value, types, equipment, onChange]);

  useEffect(() => {
    if (value) {
      console.log('fetchByCompartment', value.eqpt_id, value);
      fetchByCompartment(value.eqpt_id);
    }

    if (!value && equipment) {
      console.log('fetchByEquipment', equipment, value);
      fetchByEquipment(equipment);
    }
  }, [value, equipment, fetchByEquipment, fetchByCompartment]);

  const fields = columns(t).map((col) => {
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
        handleSave: save,
      }),
    };
  });

  if (equipment) {
    return (
      <Form.Item name="compartments">
        <Select
          placeholder="Please Select"
          style={{ marginBottom: 10, marginTop: 10 }}
          showSearch
          value={selected}
          loading={isLoading}
          onSelect={handleEquipmentSelect}
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
          size="small"
          rowKey="cmpt_no"
          loading={isLoading}
          components={{
            body: {
              row: Row,
              cell: Cell,
            },
          }}
          scroll={{ y: '30vh' }}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={data}
          columns={fields}
          pagination={false}
        />
      </Form.Item>
    );
  }

  return null;
};

export default Compartments;
