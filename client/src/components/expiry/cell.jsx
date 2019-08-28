import React, { Component } from "react";
import EditableContext from "./editableContext";
import { Input, Form, Select, DatePicker } from "antd";
import _ from "lodash";
import moment from "moment";

export default class Cell extends Component {
  state = {
    editing: false
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = (value, index) => {
    if (!!value) {
      const { record, handleSave } = this.props;

      if (index === "ed_exp_date") {
        value = value.format("YYYY-MM-DD 00:00:00");
      }

      this.form.validateFields((error, values) => {
        values[index] = value;
        this.toggleEdit();
        handleSave({
          ...record,
          ...values
        });
      });
    } else {
      this.setState({
        editing: false
      });
    }
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, data, expiry } = this.props;
    const { editing } = this.state;
    const { Option } = Select;

    const unique = _.uniq(_.map(data, "edt_type_desc"));

    if (dataIndex === "edt_type_desc") {
      return editing ? (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator(dataIndex)(
            <Select
              loading={expiry.length === 0}
              ref={node => (this.input = node)}
              onPressEnter={value => this.save(value, dataIndex)}
              onBlur={value => this.save(value, dataIndex)}
            >
              {!!expiry &&
                expiry.map((item, index) => (
                  <Option
                    key={index}
                    value={item.edt_type_desc}
                    disabled={unique.includes(item.edt_type_desc)}
                  >
                    {item.edt_type_desc}
                  </Option>
                ))}
            </Select>
          )}
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={this.toggleEdit}
        >
          {children}
        </div>
      );
    }

    if (dataIndex === "ed_status") {
      return editing ? (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator("ed_status")(
            <Select
              ref={node => (this.input = node)}
              onPressEnter={value => this.save(value, dataIndex)}
              onBlur={value => this.save(value, dataIndex)}
            >
              <Option value="0">Disabled</Option>
              <Option value="1">Enabled</Option>
            </Select>
          )}
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={this.toggleEdit}
        >
          {children}
        </div>
      );
    }

    if (dataIndex === "ed_exp_date") {
      return editing ? (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator("ed_exp_date", {
            rules: [{ type: "object" }]
          })(
            <DatePicker
              ref={node => (this.input = node)}
              onChange={value => this.save(value, dataIndex)}
              format={moment.localeData().longDateFormat("L")}
            />
          )}
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={this.toggleEdit}
        >
          {children}
        </div>
      );
    } else {
      return editing ? (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator(dataIndex)(
            <Input
              ref={node => (this.input = node)}
              onPressEnter={value => this.save(value, dataIndex)}
              onBlur={value => this.save(value, dataIndex)}
            />
          )}
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={this.toggleEdit}
        >
          {children}
        </div>
      );
    }
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}
