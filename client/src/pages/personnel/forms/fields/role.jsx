import React, { Component } from "react";
import { Form, Select } from "antd";
import axios from "axios";
import { personnel } from "../../../../api";

export default class Role extends Component {
  state = {
    roles: null
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    axios.all([personnel.readPersonnelRoles()]).then(
      axios.spread(roles => {
        this.setState({
          isLoading: false,
          roles: roles.data.records,
          filtered: null,
          value: ""
        });
      })
    );

    if (!!value) {
      setValue({
        per_auth: value.per_auth
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { roles } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Role">
        {decorator("per_auth", {
          rules: [{ required: true, message: "Please Select A Role." }]
        })(
          <Select loading={roles === null}>
            {!!roles &&
              roles.map((item, index) => (
                <Option key={index} value={item.role_id}>
                  {item.role_name}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
