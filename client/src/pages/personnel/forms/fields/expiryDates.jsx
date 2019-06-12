import React, { Component } from "react";
import { Form, Select, DatePicker, Icon, Button } from "antd";
import axios from "axios";
import { personnel } from "../../../../api";
import _ from "lodash";
const { Option } = Select;

let id = 0;

export default class ExpiryDates extends Component {
  state = {
    expiryTypes: null
  };

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([personnel.readPersonnelExpiryTypes()]).then(
      axios.spread(expiryTypes => {
        this.setState({
          expiryTypes: expiryTypes.data.records
        });
      })
    );

    if (!!value) {
      setValue({
        per_comments: value.per_comments
      });
    }
  }

  render() {
    const { decorator, getValue, form } = this.props;
    const { expiryTypes } = this.state;
    decorator("keys", { initialValue: [] });
    const allValues = form.getFieldsValue();
    const keys = getValue("keys");
    const formItems = keys.map((k, index) => (
      <Form.Item label={index === 0 ? "Expiry Dates" : ""} required={false} key={k}>
        {decorator(`expiry_dates[${k}].edt_type_desc`)(
          <Select placeholder="Select Expiry" style={{ width: "43%", marginRight: "1%" }}>
            {!!expiryTypes &&
              expiryTypes.map((item, index) => (
                <Option key={index} value={item.edt_type_code} disabled={!!_.find(allValues.expiry_dates, ["edt_type_desc", item.edt_type_code])}>
                  {item.edt_type_desc}
                </Option>
              ))}
          </Select>
        )}
        {decorator(`expiry_dates[${k}].ed_exp_date`)(<DatePicker format="DD-MM-YYYY" style={{ width: "30%", marginRight: "1%" }} />)}
        {decorator(`expiry_dates[${k}].ed_status`)(
          <Select placeholder="Status" style={{ width: "20%", marginRight: "2%" }}>
            <Option value="1">Enabled</Option>
            <Option value="0">Disabled</Option>
          </Select>
        )}
        {keys.length > 1 ? <Icon className="dynamic-delete-button" type="minus-circle-o" onClick={() => this.remove(k)} /> : null}
      </Form.Item>
    ));

    return (
      <div>
        {formItems}
        <Form.Item>
          <Button type="dashed" onClick={this.add} style={{ width: "100%" }}>
            <Icon type="plus" /> Add Date
          </Button>
        </Form.Item>
      </div>
    );
  }
}
