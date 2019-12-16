import React, { Component } from 'react';

import { Input, Form, Select, DatePicker, Switch, Icon } from 'antd';
import moment from 'moment';
import _ from 'lodash';

import Context from './context';

export default class Cell extends Component {
  state = {
    editing: false,
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
    if (value !== undefined) {
      const { record, handleSave } = this.props;

      if (index === 'ed_exp_date') {
        value = !!value && value.format('YYYY-MM-DD 00:00:00');
      }

      this.form.validateFields((error, values) => {
        values[index] = value;
        this.toggleEdit();
        handleSave({
          ...record,
          ...values,
        });
      });
    } else {
      this.setState({
        editing: false,
      });
    }
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, data, expiry, record } = this.props;
    const { editing } = this.state;
    const { Option } = Select;

    const unique = _.uniq(_.map(data, 'edt_type_desc'));

    if (dataIndex === 'edt_type_desc') {
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
            </Select>,
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

    if (dataIndex === 'ed_status') {
      return (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator('ed_status', {
            valuePropName: 'checked',
            initialValue: record.ed_status,
          })(
            <Switch
              ref={node => (this.input = node)}
              onChange={value => this.save(value, dataIndex)}
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
            />,
          )}
        </Form.Item>
      );
    }

    if (dataIndex === 'ed_exp_date') {
      return editing ? (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator('ed_exp_date', {
            rules: [
              {
                type: 'object',
                required: true,
              },
            ],
            initialValue: moment(record.ed_exp_date, 'YYYY-MM-DD 00:00:00'),
          })(
            <DatePicker
              ref={node => (this.input = node)}
              onChange={value => this.save(value, dataIndex)}
              format="DD/MM/YYYY"
            />,
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
            />,
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
        {editable ? <Context.Consumer>{this.renderCell}</Context.Consumer> : children}
      </td>
    );
  }
}
