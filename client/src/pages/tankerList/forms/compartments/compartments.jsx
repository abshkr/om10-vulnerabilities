import React, { useEffect, useState, useCallback } from 'react';
import { Equipment } from '../../../../components';
import { tankerList } from '../../../../api';
import { Table, Select } from 'antd';
import columns from './columns';
import axios from 'axios';
import Cell from './cell';
import Row from './row';
import _ from 'lodash';

const Compartments = ({ form, value, t, equipment }) => {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getFieldDecorator, setFieldsValue } = form;

  getFieldDecorator('tnkr_equips');

  const fetch = useCallback(id => {
    setIsLoading(true);
    axios.all([tankerList.composition(id)]).then(
      axios.spread(response => {
        setdata(response.data.records);
        setIsLoading(false);
      }),
    );
  }, []);

  const fetchComposition = useCallback(id => {
    setIsLoading(true);
    axios.all([tankerList.typeComposition(id)]).then(
      axios.spread(response => {
        setdata(response.data.records);
        setIsLoading(false);
      }),
    );
  }, []);

  useEffect(() => {
    if (!!value) {
      fetch(value.tnkr_code);
    } else {
      if (!!equipment) {
        fetchComposition(equipment);
      }
    }
  }, [value, fetch, equipment, fetchComposition]);

  const save = row => {
    const payload = [...data];

    if (value) {
      let composition = _.find(payload, ['eqpt_code', row.eqpt_code]);

      const compartmentIndex = _.findIndex(composition.compartments, object => {
        return object.cmpt_no === row.cmpt_no;
      });

      const compositionIndex = _.findIndex(payload, object => {
        return object.eqpt_code === row.eqpt_code;
      });

      composition.compartments.splice(compartmentIndex, 1, row);

      payload.splice(compositionIndex, 1, composition);

      setdata(payload);

      setFieldsValue({
        tnkr_equips: _.map(payload, value => {
          return _.omit(value, ['eqpt_list']);
        }),
      });
    } else {
      let composition = _.find(payload, ['eqpt_code', row.eqpt_code]);

      const compartmentIndex = _.findIndex(composition.compartments, object => {
        return object.cmpt_no === row.cmpt_no;
      });

      const compositionIndex = _.findIndex(payload, object => {
        return object.eqpt_code === row.eqpt_code;
      });

      composition.compartments.splice(compartmentIndex, 1, row);

      payload.splice(compositionIndex, 1, composition);

      setdata(payload);

      setFieldsValue({
        tnkr_equips: _.map(payload, value => {
          return _.omit(value, ['eqpt_list']);
        }),
      });
    }
  };

  const changeType = (tanker, code) => {
    axios.all([tankerList.compartment(code)]).then(
      axios.spread(response => {
        const payload = [...data];

        const index = _.findIndex(payload, ['etyp_id', tanker.etyp_id]);
        let compartment = _.find(tanker.eqpt_list, ['eqpt_id', code]);

        compartment['compartments'] = response.data.records;
        compartment['eqpt_list'] = tanker.eqpt_list;
        compartment['tc_eqpt'] = tanker.tc_eqpt;
        compartment['image'] = tanker.image;

        payload.splice(index, 1, compartment);

        setdata(payload);

        setFieldsValue({
          tnkr_equips: _.map(payload, value => {
            return _.omit(value, ['eqpt_list']);
          }),
        });
      }),
    );
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
        handleSave: save,
      }),
    };
  });

  return (
    <div>
      {data.length === 0 && (
        <Table
          size="middle"
          rowKey="cmpt_no"
          loading={isLoading}
          components={{
            body: {
              row: Row,
              cell: Cell,
            },
          }}
          style={{ marginBottom: 5 }}
          scroll={{ y: '25vh' }}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={[]}
          columns={fields}
          pagination={false}
        />
      )}
      {data.map((item, index) => (
        <div key={index}>
          <Equipment value={item.image} />
          <Select
            onChange={value => changeType(item, value)}
            placeholder={item.eqpt_code || 'Select Equipment'}
            style={{ marginBottom: 10, marginTop: 10 }}
            disabled={item.eqpt_list.length === 0}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {!isLoading &&
              item.eqpt_list.map((item, index) => (
                <Select.Option key={index} value={item.eqpt_id}>
                  {item.eqpt_code}
                </Select.Option>
              ))}
          </Select>

          {item.compartments.length !== 0 && (
            <Table
              size="middle"
              rowKey="cmpt_no"
              loading={isLoading}
              components={{
                body: {
                  row: Row,
                  cell: Cell,
                },
              }}
              style={{ marginBottom: 5 }}
              scroll={{ y: '25vh' }}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={item.compartments}
              columns={fields}
              pagination={false}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Compartments;
