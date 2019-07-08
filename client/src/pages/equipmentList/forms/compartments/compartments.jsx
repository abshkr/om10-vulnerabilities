import React, { Component } from "react";

import { Table, Input, Form, Select, DatePicker, Icon } from "antd";
import axios from "axios";
import { equipmentList } from "../../../../api";
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
    if (!!index) {
      if (!!value) {
        const { record, handleSave } = this.props;

        this.form.validateFields((error, values) => {
          this.toggleEdit();
          handleSave({
            ...record,
            ...values
          });
        });
      }
    } else {
      this.setState({
        editing: false
      });
    }
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex } = this.props;
    const { editing } = this.state;
    const { Option } = Select;

    if (dataIndex === "adj_cmpt_lock") {
      return editing ? (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator("adj_cmpt_lock")(
            <Select ref={node => (this.input = node)} onPressEnter={this.save} onBlur={value => this.save(value, dataIndex)}>
              <Option value="1">Locked</Option>
              <Option value="0">Unlocked</Option>
            </Select>
          )}
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

export default class Compatments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  handleSave = row => {
    const { setValue } = this.props;
    const newData = [...this.state.data];
    const index = newData.findIndex(item => row.cmpt_no === item.cmpt_no);
    const item = newData[index];

    newData.splice(index, 1, {
      ...item,
      ...row
    });

    this.setState({
      data: newData
    });

    setValue({
      compartments: newData
    });
  };

  componentDidMount() {
    const { value } = this.props;
    axios.all([equipmentList.readCompartments(value.eqpt_id)]).then(
      axios.spread(compartments => {
        this.setState({
          data: compartments.data.records
        });
      })
    );
  }

  render() {
    const { data } = this.state;
    const { decorator } = this.props;

    const defaults = [
      {
        title: "Compartments",
        dataIndex: "cmpt_no",
        width: 250
      },
      {
        title: "Safe Fill",
        dataIndex: "safefill",
        width: 300,
        editable: true
      },
      {
        title: "Safe Fill Unit",
        dataIndex: "cmpt_units",
        width: 300
      },
      {
        title: "Capacity",
        dataIndex: "sfl",
        width: 300,
        editable: true
      },
      {
        title: "Status",
        dataIndex: "adj_cmpt_lock",
        width: 300,
        editable: true,
        render: text => (
          <span>
            <Icon type={text === "0" ? "unlock" : "lock"} />
          </span>
        )
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
          data: data,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });

    decorator("compartments");

    return (
      <div>
        <Table
          size="middle"
          rowKey="cmpt_no"
          components={{
            body: {
              row: EditableFormRow,
              cell: EditableCell
            }
          }}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={data}
          columns={columns}
          pagination={false}
        />
      </div>
    );
  }
}
