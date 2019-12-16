import React, { Component } from 'react';
import EditableContext from './editableContext';
import { Input, Form, Select } from 'antd';

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
    if (!!index) {
      if (value !== undefined) {
        const { record, handleSave } = this.props;

        this.form.validateFields((error, values) => {
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
    } else {
      this.setState({
        editing: false,
      });
    }
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record } = this.props;
    const { editing } = this.state;
    const { Option } = Select;

    if (dataIndex === 'adj_cmpt_lock') {
      return editing ? (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator('adj_cmpt_lock', {
            valuePropName: 'checked',
            initialValue: record.adj_cmpt_lock,
          })(
            <Select ref={node => (this.input = node)} onBlur={value => this.save(value, dataIndex)}>
              <Option key={0} value={true}>
                Locked
              </Option>
              <Option key={1} value={false}>
                Unlocked
              </Option>
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
    } else {
      return editing ? (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator(dataIndex)(
            <Input
              ref={node => (this.input = node)}
              onPressEnter={value => this.save(value, dataIndex)}
              onBlur={this.save}
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
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}
