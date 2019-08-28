import React, { useEffect, useState, useCallback } from "react";
import { Equipment } from "../../../../components";
import { tankerList } from "../../../../api";
import { Table, Select } from "antd";
import columns from "./columns";
import axios from "axios";
import Cell from "./cell";
import Row from "./row";
import _ from "lodash";

const Compartments = ({ form, value, t, equipment }) => {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getFieldDecorator, setFieldsValue } = form;

  const fetch = useCallback(id => {
    setIsLoading(true);
    axios.all([tankerList.composition(id)]).then(
      axios.spread(response => {
        setdata(response.data.records);
        setIsLoading(false);
      })
    );
  }, []);

  const fetchComposition = useCallback(id => {
    setIsLoading(true);
    axios.all([tankerList.typeComposition(id)]).then(
      axios.spread(response => {
        console.log(response.data.records);
        setIsLoading(false);
      })
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

    let composition = _.find(payload, ["eqpt_code", row.eqpt_code]);

    const compositionIndex = _.findIndex(payload, object => {
      return object.eqpt_code === row.eqpt_code;
    });

    const compartmentIndex = _.findIndex(composition.compartments, object => {
      return object.cmpt_no === row.cmpt_no;
    });

    composition.compartments.splice(compartmentIndex, 1, row);

    payload.splice(compositionIndex, 1, composition);

    setdata(payload);

    setFieldsValue({
      composition: payload
    });
  };

  const changeType = (compartment, code) => {
    axios.all([tankerList.compartment(code)]).then(
      axios.spread(composition => {
        const payload = [...data];

        const comp = composition.data.records;

        let value = _.find(payload, ["tc_eqpt", compartment.tc_eqpt]);
        const index = _.findIndex(payload, ["tc_eqpt", compartment.tc_eqpt]);
        value["compartments"] = comp;

        payload.splice(index, 1, value);

        setdata(payload);

        setFieldsValue({
          composition: payload
        });
      })
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
        handleSave: save
      })
    };
  });

  getFieldDecorator("composition");

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <Equipment value={item.image} />
          <Select
            onChange={value => changeType(item, value)}
            placeholder={item.eqpt_code}
            style={{ marginBottom: 10, marginTop: 10 }}
            disabled={item.compartments.length === 0}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {!isLoading &&
              item.eqpt_list.map((item, index) => (
                <Select.Option value={item.eqpt_id}>
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
                  cell: Cell
                }
              }}
              style={{ marginBottom: 5 }}
              scroll={{ y: "25vh" }}
              rowClassName={() => "editable-row"}
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
