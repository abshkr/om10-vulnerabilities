import React, { Component } from "react";
import { Form, Input } from "antd";
import _ from "lodash";

export default class Density extends Component {
  state = {
    high: 0,
    low: 0
  };

  validateDensity = (rule, value, callback) => {
    const { high, low } = this.state;

    const decimalCheck = new RegExp("^[0-9]+(.[0-9]{1,2})?$");
    const validateDecimals = decimalCheck.exec(value);

    if (validateDecimals === null) {
      callback(`Density must be corrected to 2 decimal places.`);
    }

    if (parseInt(value) < parseInt(low)) {
      callback(`Density is too low. Lower Limit: ${low}`);
    }

    if (parseInt(value) > parseInt(high)) {
      callback(`Density is too high. Upper Limit: ${high}`);
    } else {
      callback();
    }
  };

  setDensity = (baseProducts, value) => {
    const base = _.find(baseProducts, function(o) {
      return o.base_code === value;
    });

    if (!!base) {
      this.setState({
        high: base.base_class_dens_hi,
        low: base.base_class_dens_lo
      });
    }
  };

  componentDidMount() {
    const { value, setValue, baseProducts } = this.props;
    if (!!value) {
      setValue({
        tank_density: value.tank_density
      });
      this.setDensity(baseProducts, value.tank_base);
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedBase, baseProducts } = this.props;
    if (prevProps.selectedBase !== selectedBase) {
      this.setDensity(baseProducts, selectedBase);
    }
  }

  render() {
    const { decorator } = this.props;
    const { high, low } = this.state;
    const label = low !== 0 && high !== 8 ? `${low} - ${high} kg/m³` : "N/A";
    return (
      <Form.Item label="Density">
        {decorator("tank_density", {
          rules: [
            { required: true, message: "Please enter your density." },
            {
              validator: this.validateDensity
            }
          ]
        })(<Input disabled={low === 0 && high === 0} addonAfter={label} />)}
      </Form.Item>
    );
  }
}
