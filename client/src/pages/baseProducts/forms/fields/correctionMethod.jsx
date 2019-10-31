import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";
import { baseProducts } from "../../../../api";
export default class CorrectionMethod extends Component {
  state = {
    method: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([baseProducts.readBaseProductCorrectionMethods()]).then(
      axios.spread(method => {
        this.setState({
          method: method.data.records
        });
      })
    );

    if (!!value) {
      setValue({
        base_corr_mthd: value.base_corr_mthd
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { method } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Correction Method">
        {decorator("base_corr_mthd", {
          rules: [{ required: false }]
        })(
          <Select>
            {!!method &&
              method.map((item, index) => (
                <Option key={index} value={item.compensation_id}>
                  {item.compensation_name}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
