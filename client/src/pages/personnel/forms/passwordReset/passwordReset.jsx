import React, { Component } from "react";
import { Input, Button, Modal, notification, Card } from "antd";
import { hash } from "../../../../utils";
import { personnel } from "../../../../api";
import axios from "axios";

import _ from "lodash";

export default class PasswordReset extends Component {
  state = {
    password: ""
  };

  handlePasswordGeneration = () => {
    const password = _.times(7, () => _.random(35).toString(36)).join("");

    this.setState({
      password
    });
  };

  handlePasswordChange = () => {
    const { password } = this.state;

    const user = this.props.value.per_code;
    const hashed = hash("EN", user, password);

    axios.all([personnel.updatePersonnelPassword(hashed.user, hashed.psw)]).then(
      axios.spread(response => {
        Modal.destroyAll();
        if (response.data.result === 0) {
          notification.success({
            message: "Password Changed.",
            description: response.data.message
          });
        } else {
          notification.error({
            message: "Password Changed.",
            description: response.data.message
          });
        }
      })
    );
  };

  handlePasswordCopy = () => {
    const { password } = this.state;

    let textField = document.createElement("textarea");
    textField.innerText = password;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  handlePasswordInput = event => {
    this.setState({
      password: event.target.value
    });
  };

  componentDidMount() {
    this.handlePasswordGeneration();
  }

  render() {
    const { password } = this.state;
    const { value } = this.props;

    return (
      <div className="password-reset">
        <Card>
          <div style={{ marginBottom: 10 }}>
            <Input addonBefore="User:" value={value.per_code} disabled />
          </div>
          <div>
            <Input addonBefore="New Password:" value={password} onChange={this.handlePasswordInput} />
          </div>

          <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between" }}>
            <Button icon="wallet" shape="round" type="default" onClick={this.handlePasswordGeneration} style={{ marginRight: 5 }}>
              Randomize
            </Button>
            <Button icon="copy" shape="round" type="dashed" onClick={this.handlePasswordCopy} style={{ marginRight: 5 }}>
              Copy to Clipboard
            </Button>
            <Button icon="check" shape="round" type="primary" onClick={this.handlePasswordChange}>
              Change Password
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}
