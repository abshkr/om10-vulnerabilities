import React, { Component } from "react";

import { Table, Input, Button, Popconfirm, Form, Select, DatePicker, Icon } from "antd";
import axios from "axios";
import { personnel } from "../../../../api";
import _ from "lodash";

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
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
        value = value.format("YYYY-MM-DD 00:00:00:00000");
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
            <Select loading={expiry.length === 0} ref={node => (this.input = node)} onPressEnter={this.save} onBlur={value => this.save(value, dataIndex)}>
              {!!expiry &&
                expiry.map((item, index) => (
                  <Option key={index} value={item.edt_type_desc} disabled={unique.includes(item.edt_type_desc)}>
                    {item.edt_type_desc}
                  </Option>
                ))}
            </Select>
          )}
        </Form.Item>
      ) : (
        <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={this.toggleEdit}>
          {children}
        </div>
      );
    }

    if (dataIndex === "ed_status") {
      return editing ? (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator("ed_status")(
            <Select ref={node => (this.input = node)} onPressEnter={value => this.save(value, dataIndex)} onBlur={value => this.save(value, dataIndex)}>
              <Option value="0">Disabled</Option>
              <Option value="1">Enabled</Option>
            </Select>
          )}
        </Form.Item>
      ) : (
        <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={this.toggleEdit}>
          {children}
        </div>
      );
    }

    if (dataIndex === "ed_exp_date") {
      return editing ? (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator(dataIndex, {
            rules: [{ type: "object" }]
          })(<DatePicker ref={node => (this.input = node)} onChange={value => this.save(value, dataIndex)} format="YYYY-MM-DD 00:00:00:00000" />)}
        </Form.Item>
      ) : (
        <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={this.toggleEdit}>
          {children}
        </div>
      );
    } else {
      return editing ? (
        <Form.Item style={{ margin: 0 }}>{form.getFieldDecorator(dataIndex)(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}</Form.Item>
      ) : (
        <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={this.toggleEdit}>
          {children}
        </div>
      );
    }
  };

  render() {
    const { editable, dataIndex, title, record, index, handleSave, children, ...restProps } = this.props;
    return <td {...restProps}>{editable ? <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer> : children}</td>;
  }
}

export default class ExpiryDates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expiryTypes: [],
      dataSource: !!this.props.value ? this.props.value.expiry_dates : [],
      count: 3
    };
  }

  handleSave = row => {
    const { setValue } = this.props;
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.edt_type_code === item.edt_type_code);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });

    this.setState({ dataSource: newData });

    setValue({
      expiry_dates: newData
    });
  };

  handleAdd = () => {
    const { count, dataSource, expiryTypes } = this.state;

    const uniqueExpiry = _.uniq(_.map(dataSource, "edt_type_code"));

    const values = _.reject(expiryTypes, value => {
      return uniqueExpiry.includes(value.edt_type_code);
    });

    const newData = values[0];

    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1
    });
  };

  handleDelete = key => {
    const { dataSource } = this.state;
    const { setValue } = this.props;

    const data = [...dataSource];
    const source = data.filter(item => item.edt_type_code !== key);

    this.setState({
      dataSource: source
    });

    setValue({
      expiry_dates: source
    });
  };

  componentDidMount() {
    axios.all([personnel.readPersonnelExpiryTypes()]).then(
      axios.spread(expiryTypes => {
        this.setState({
          expiryTypes: expiryTypes.data.records
        });
      })
    );
  }

  render() {
    const { dataSource, expiryTypes } = this.state;
    const { decorator } = this.props;

    const defaults = [
      {
        title: "Type Description",
        dataIndex: "edt_type_desc",
        width: 250,
        editable: true
      },
      {
        title: "Expiry Date",
        dataIndex: "ed_exp_date",
        width: 300,
        editable: true,
        render: (text, record) => <span> {text === "" ? "Select A Date" : !!text ? text.substring(0, 10) : "Select A Date"}</span>
      },
      {
        title: "Enabled",
        dataIndex: "ed_status",
        key: "ed_status",
        editable: true,
        render: (text, record) => <span> {text === "" ? "Select A Status" : !!text ? <Icon type={text === "1" ? "check" : "close"} /> : "Select A Status"}</span>
      },
      {
        title: "Delete",
        dataIndex: "operation",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.edt_type_code)}>
              {/*eslint-disable */}
              <a href="#">Delete</a>
              {/*eslint-enable */}
            </Popconfirm>
          ) : null
      }
    ];

    const columns = defaults.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          data: dataSource,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          expiry: expiryTypes,
          handleSave: this.handleSave
        })
      };
    });

    decorator("expiry_dates");

    return (
      <div>
        <Button shape="round" onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }} disabled={dataSource.length === expiryTypes.length}>
          Add New Expiry
        </Button>
        <Table
          size="middle"
          rowKey="edt_type_code"
          components={{
            body: {
              row: EditableFormRow,
              cell: EditableCell
            }
          }}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </div>
    );
  }
}
