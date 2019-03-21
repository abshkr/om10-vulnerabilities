import React, { Component } from "react";
import { Drawer, Button } from "antd";
import DataTable from "../../../components/table";
import IButton from "../../../components/ibutton";
import Download from "../../../components/download";
import DrawerFrom from "../drawerForm";
import columns from "./columns";

export default class Table extends Component {
  state = {
    visible: false,
    record: null,
    edit: false,
    iButton: "",
    iVisible: false
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

    return (
      <div>
        <IButton submit={this.setIButton} visible={iVisible} close={this.handleCancel} />
        <Download data={data} type={"id_assignment"} style={{ position: "absolute", right: 70, top: 10 }} />
        <Button
          type="primary"
          style={{ position: "absolute", right: 295, top: 10 }}
          onClick={() => this.setState({ record: null, visible: true })}
        >
          Create Record
        </Button>
        <Button
          type="primary"
          style={{ position: "absolute", right: 175, top: 10 }}
          onClick={() => this.setState({ iVisible: true })}
        >
          Scan I-Button
        </Button>
        <Drawer
          title={!!record ? `${record.kya_txt}` : "Create ID Assignment"}
          width={720}
          onClose={this.closeDrawer}
          visible={visible}
        >
          <DrawerFrom data={record} close={this.closeDrawer} edit={edit} update={this.props.update} />
        </Drawer>
        <DataTable
          rowKey="kya_key_no"
          columns={columns(data)}
          data={data}
          click={this.openDrawer}
          loading={true}
        />
      </div>
    );
  }
}
