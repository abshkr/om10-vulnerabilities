import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Select } from 'antd';
import axios from 'axios';
import useSWR from 'swr';
import _ from 'lodash';

import { Equipment } from '../../../../components';
import { EQUIPMENT_LIST } from '../../../../api';
import columns from './columns';
import Cell from './cell';
import Row from './row';

const Compartments = ({ form, value }) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [image, setImage] = useState(null);
  const [options, setOptions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selected, setSelected] = useState(value?.eqpt_code || null);

  const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

  const equipment = getFieldValue('eqpt_etp');

  getFieldDecorator('compartments');

  const { data: payload } = useSWR(EQUIPMENT_LIST.READ);
  const { data: types, isValidating: typesLoading } = useSWR(EQUIPMENT_LIST.TYPES);

  const fetchByCompartment = useCallback(
    id => {
      setLoading(true);

      axios.get(`${EQUIPMENT_LIST.COMPARTMENTS}?eqpt_id=${id}`).then(response => {
        setData(response.data.records);
        setFieldsValue({ compartments: response.data.records });
        setLoading(false);
      });
    },
    [setFieldsValue]
  );

  const fetchByEquipment = useCallback(
    id => {
      setLoading(true);

      axios.get(`${EQUIPMENT_LIST.COMPARTMENT_EQUIPMENT}?etyp_id=${id}`).then(response => {
        setData(response.data.records);
        setFieldsValue({ compartments: response.data.records });
        setLoading(false);
      });
    },
    [setFieldsValue]
  );

  const save = row => {
    let payload = [...data];

    const index = payload.findIndex(item => item.cmpt_no === row.cmpt_no);

    payload.splice(index, 1, row);

    setData(payload);

    setFieldsValue({
      compartments: payload
    });
  };

  const handleEquipmentSelect = value => {
    fetchByCompartment(value);
    setSelected(value);
  };

  useEffect(() => {
    const predicate = value ? ['eqpt_etp_title', value.eqpt_etp_title] : ['eqpt_etp', equipment];
    const options = _.filter(payload?.records, predicate) || [];

    setOptions(options);
    setSelected(options[0]?.eqpt_id);
  }, [value, payload, equipment]);

  useEffect(() => {
    const etp = value?.eqpt_etp || equipment;
    const type = _.find(types?.records, ['etyp_id', etp]);
    const image = type?.image?.toLowerCase() || null;

    setImage(image);
  }, [value, types, equipment]);

  useEffect(() => {
    if (value) {
      fetchByCompartment(value.eqpt_id);
    }

    if (!value && equipment) {
      fetchByEquipment(equipment);
    }
  }, [value, equipment, fetchByEquipment, fetchByCompartment]);

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

  if (equipment) {
    return (
      <div>
        <Equipment image={image} isLoading={typesLoading} />

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
          size="middle"
          rowKey="cmpt_no"
          loading={isLoading}
          components={{
            body: {
              row: Row,
              cell: Cell
            }
          }}
          scroll={{ y: '30vh' }}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={data}
          columns={fields}
          pagination={false}
        />
      </div>
    );
  }

  return null;
};

export default Compartments;
