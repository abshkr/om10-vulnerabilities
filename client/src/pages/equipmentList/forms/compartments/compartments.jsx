import React, { Component } from "react";

import { Table, Input, Form, Select, Icon, Card } from "antd";
import { equipmentList } from "../../../../api";
import ProgressiveImage from "react-progressive-image";
import _ from "lodash";
import axios from "axios";

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
      } else {
        this.setState({
          editing: false
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
            <Select ref={node => (this.input = node)} onPressEnter={value => this.save(value, dataIndex)} onBlur={value => this.save(value, dataIndex)}>
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
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator(dataIndex)(<Input ref={node => (this.input = node)} onPressEnter={value => this.save(value, dataIndex)} onBlur={this.save} />)}
        </Form.Item>
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
      data: [],
      isLoading: true
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

  handleFetch = id => {
    this.setState({ isLoading: true });

    axios.all([equipmentList.readCompartments(id)]).then(
      axios.spread(compartments => {
        this.setState({
          isLoading: false,
          data: compartments.data.records
        });
      })
    );
  };

  componentDidMount() {
    const { value } = this.props;

    if (!!value) {
      this.handleFetch(value.eqpt_id);
    }
  }

  componentWillReceiveProps(prevProps) {
    const { getValue } = this.props;

    const id = getValue("eqpt_etp");
    if (!!id || id !== "") {
      this.handleFetch(id);
    }
  }

  render() {
    const { data, isLoading } = this.state;
    const { decorator, value } = this.props;

    const { Option } = Select;

    const defaults = [
      {
        title: "Compartment",
        dataIndex: "cmpt_no",
        key: "cmpt_no",
        width: 250
      },
      {
        title: "Safe Fill",
        dataIndex: "safefill",
        key: "safefill",
        width: 300,
        editable: true
      },
      {
        title: "Safe Fill Unit",
        dataIndex: "cmpt_units",
        key: "cmpt_units",
        width: 300
      },
      {
        title: "Capacity",
        dataIndex: "sfl",
        key: "sfl",
        width: 300,
        editable: true
      },
      {
        title: "Status",
        dataIndex: "adj_cmpt_lock",
        key: "adj_cmpt_lock",
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

    const equipments = _.filter(this.props.data, ["eqpt_etp_title", !!value ? value.eqpt_etp_title : ""]);
    const source = !!value ? value.etyp_category : "S";
    const title = !!value ? value.eqpt_etp_title : "S";

    return (
      <div>
        <ProgressiveImage src={`/assets/${_.toLower(source)}.png`} placeholder="tiny-image.jpg">
          {(src, loading) => (
            <Card style={{ marginBottom: 10 }} size="small" title={`Compartments: ${data.length}`} loading={loading}>
              <div className="equipment-icon">
                <img src={src} alt="equipment" />
              </div>
              <p style={{ textAlign: "center" }}> {title} </p>
            </Card>
          )}
        </ProgressiveImage>

        {!!value && (
          <Select
            defaultValue={value.eqpt_code}
            onChange={this.handleFetch}
            style={{ marginBottom: 10 }}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {equipments.map((item, index) => (
              <Option key={index} value={item.eqpt_id}>
                {item.eqpt_code}
              </Option>
            ))}
          </Select>
        )}

        <Table
          size="middle"
          rowKey="cmpt_no"
          loading={isLoading}
          components={{
            body: {
              row: EditableFormRow,
              cell: EditableCell
            }
          }}
          scroll={{ y: 250 }}
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
