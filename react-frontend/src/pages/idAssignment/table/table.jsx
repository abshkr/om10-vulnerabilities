import React, { Component } from "react";
import { Icon, Drawer, Button } from "antd";
import { Check, Lock } from "../../../constants/colors";
import Generate from "../../../utils/generateOptions";
import DataTable from "../../../components/table";
import IButton from "../../../components/ibutton";
import DrawerFrom from "../drawerForm";

export default class Table extends Component {
  state = {
    visible: false,
    record: null,
    edit: false,
    iButton: "",
    iVisible: false
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  handleCancel = () => {
    this.setState({ iVisible: false });
  };

  closeDrawer = () => {
    this.setState({
      visible: false,
      edit: false
    });
  };

  openDrawer = record => {
    this.setState({
      visible: true,
      edit: true,
      record
    });
  };

  setIButton = value => {
    this.props.search(value);
    this.setState({ iButton: value, iVisible: false });
  };

  render() {
    const { record, visible, edit, iVisible } = this.state;
    const { data } = this.props;

    const columns = [
      {
        title: "No.",
        dataIndex: "kya_key_no",
        key: "kya_key_no",
        width: 100
      },
      {
        title: "Issuer",
        dataIndex: "kya_issuer_name",
        key: "kya_issuer_name",
        width: 330,
        filters: Generate(this.props.data, "kya_issuer_name"),
        onFilter: (value, record) => record.kya_issuer_name.indexOf(value) === 0
      },
      {
        title: "Assignment Type",
        dataIndex: "kya_type_name",
        key: "kya_type_name",
        width: 180,
        filters: Generate(this.props.data, "kya_type_name"),
        onFilter: (value, record) => record.kya_type_name.indexOf(value) === 0
      },
      {
        title: "Physical Type",
        dataIndex: "kya_phys_name",
        key: "kya_phys_name",
        width: 150,
        filters: Generate(this.props.data, "kya_phys_name"),
        onFilter: (value, record) => record.kya_phys_name.indexOf(value) === 0
      },
      {
        title: "Time Code",
        dataIndex: "kya_timecode",
        key: "kya_timecode",
        width: 150,
        filters: Generate(this.props.data, "kya_timecode"),
        onFilter: (value, record) => record.kya_timecode.indexOf(value) === 0
      },
      {
        title: "Locked?",
        dataIndex: "kya_lock",
        key: "kya_lock",
        width: 130,
        filters: [
          {
            text: "Locked",
            value: "Y"
          },
          {
            text: "Unlocked",
            value: "N"
          }
        ],
        onFilter: (value, record) => record.kya_lock.indexOf(value) === 0,
        render: text => (
          <span>
            <Icon style={{ color: Lock[text], fontSize: 16 }} type={text === "N" ? "unlock" : "lock"} />
          </span>
        )
      },
      {
        title: "Adhoc?",
        dataIndex: "kya_adhoc",
        key: "kya_adhoc",
        width: 130,
        filters: [
          {
            text: "Yes",
            value: "Y"
          },
          {
            text: "No",
            value: "N"
          }
        ],
        onFilter: (value, record) => record.kya_adhoc.indexOf(value) === 0,
        render: text => (
          <span>
            <Icon style={{ color: Check[text], fontSize: 16 }} type={text === "N" ? "close" : "check"} />
          </span>
        )
      },
      {
        title: "Tag Text",
        dataIndex: "kya_txt",
        key: "kya_txt",
        width: 150
      },
      {
        title: "Personnel",
        dataIndex: "kya_psnl_name",
        key: "kya_psnl_name",
        width: 160
      },
      {
        title: "Role",
        dataIndex: "kya_role_name",
        key: "kya_role_name",
        filters: Generate(this.props.data, "kya_role_name"),
        onFilter: (value, record) => String(record.kya_role_name).indexOf(value) === 0
      },
      {
        title: "Drawer",
        dataIndex: "kya_draw_name",
        key: "kya_draw_name",
        filters: Generate(this.props.data, "kya_draw_name"),
        onFilter: (value, record) => String(record.kya_draw_name).indexOf(value) === 0
      },
      {
        title: "Supplier",
        dataIndex: "kya_supp_name",
        key: "kya_supp_name",
        filters: Generate(this.props.data, "kya_supp_name"),
        onFilter: (value, record) => String(record.kya_supp_name).indexOf(value) === 0
      }
    ];

    return (
      <div>
        <IButton submit={this.setIButton} visible={iVisible} close={this.handleCancel} />
        <Button
          type="default"
          icon="plus"
          shape="circle"
          style={{ position: "absolute", right: 60, top: 40 }}
          onClick={() => this.setState({ record: null, visible: true })}
        />
        <Button
          type="default"
          icon="barcode"
          shape="circle"
          style={{ position: "absolute", right: 140, top: 40 }}
          onClick={() => this.setState({ iVisible: true })}
        />
        <Drawer
          title={!!record ? `${record.kya_txt}` : "Create ID Assignment"}
          width={720}
          onClose={this.closeDrawer}
          visible={visible}
        >
          <DrawerFrom data={record} close={this.closeDrawer} edit={edit} update={this.props.update} />
        </Drawer>
        <DataTable rowKey="kya_key_no" columns={columns} data={data} click={this.openDrawer} />
      </div>
    );
  }
}
