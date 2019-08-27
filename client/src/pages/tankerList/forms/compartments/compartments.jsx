import React, { useEffect, useState } from "react";

import { tankerList } from "../../../../api";
import { Table, Select, Card } from "antd";
import columns from "./columns";
import axios from "axios";
import Cell from "./cell";
import Row from "./row";
import _ from "lodash";

import {
  Rail,
  Flat,
  Prime,
  Rigid,
  Ship,
  Trailer,
  Default
} from "../../../../assets/equipment";

const Compartments = ({ form, value, t }) => {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    setIsLoading(true);

    const fetch = id => {
      axios.all([tankerList.composition(id)]).then(
        axios.spread(composition => {
          setdata(composition.data.records);
          setIsLoading(false);
        })
      );
    };

    if (!!value) {
      fetch(value.tnkr_code);
    }
  }, [value]);

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

  const path = {
    E: Rail,
    F: Flat,
    P: Prime,
    R: Rigid,
    S: Ship,
    T: Trailer,
    X: Default
  };

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <Card style={{ marginTop: 5 }} size="small">
            <div className="equipment-icon">
              <img src={path[item.image]} alt="equipment" />
            </div>
          </Card>

          <Select
            onChange={fetch}
            value={item.eqpt_code}
            style={{ marginBottom: 10, marginTop: 10 }}
          >
            {!isLoading &&
              data.map((item, index) => (
                <Select.Option key={index} value={item.etyp_id}>
                  {item.etyp_title}
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
