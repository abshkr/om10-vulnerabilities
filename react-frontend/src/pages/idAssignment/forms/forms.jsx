import React, { Component } from "react";
import { Form, Tabs } from "antd";

import Id from "./fields/id";
import Issuer from "./fields/issuer";
import AssignmentType from "./fields/assignmenType";
import PhysicalType from "./fields/physicalType";
import TagText from "./fields/tagText";
import TimeCode from "./fields/timeCode";
import DateCreated from "./fields/dateCreated";
import Pin from "./fields/pin";
import CheckList from "./fields/checkList";
import Employer from "./fields/employer";
import Role from "./fields/role";
import Personnel from "./fields/personnel";
import Drawer from "./fields/drawer";
import Tanker from "./fields/tanker";
import Supplier from "./fields/supplier";
import EquipmentCarrier from "./fields/equipmentCarrier";
import TransportEquipment from "./fields/transportEquipment";
import OwnerCarrier from "./fields/ownerCarrier";

class IdAssignmentForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    const TabPane = Tabs.TabPane;
    return (
      <Form onSubmit={this.handleSubmit} style={{ height: 640 }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="General" key="1">
            <Id decorator={getFieldDecorator} setValue={setFieldsValue} {...this.props} />
            <Issuer decorator={getFieldDecorator} setValue={setFieldsValue} {...this.props} />
            <AssignmentType decorator={getFieldDecorator} setValue={setFieldsValue} {...this.props} />
            <PhysicalType decorator={getFieldDecorator} setValue={setFieldsValue} {...this.props} />
            <TagText decorator={getFieldDecorator} setValue={setFieldsValue} {...this.props} />
            <DateCreated decorator={getFieldDecorator} setValue={setFieldsValue} {...this.props} />
            <TimeCode decorator={getFieldDecorator} setValue={setFieldsValue} {...this.props} />
          </TabPane>

          <TabPane tab="Personal" key="2">
            <Employer decorator={getFieldDecorator} setValue={setFieldsValue} {...this.props} />
            <Role decorator={getFieldDecorator} setValue={setFieldsValue} {...this.props} />
            <Personnel decorator={getFieldDecorator} setValue={setFieldsValue} {...this.props} />
            <Pin decorator={getFieldDecorator} setValue={setFieldsValue} {...this.props} />
            <CheckList decorator={getFieldDecorator} setValue={setFieldsValue} {...this.props} />
          </TabPane>

          <TabPane tab="Detailed" key="3">
            <Drawer decorator={getFieldDecorator} setValue={setFieldsValue} {...this.props} />
            <OwnerCarrier decorator={getFieldDecorator} setValue={setFieldsValue} {...this.props} />
            <Supplier decorator={getFieldDecorator} setValue={setFieldsValue} {...this.props} />
            <Tanker decorator={getFieldDecorator} setValue={setFieldsValue} {...this.props} />
            <EquipmentCarrier decorator={getFieldDecorator} setValue={setFieldsValue} {...this.props} />
            <TransportEquipment decorator={getFieldDecorator} setValue={setFieldsValue} {...this.props} />
          </TabPane>
        </Tabs>
      </Form>
    );
  }
}

const Forms = Form.create()(IdAssignmentForm);

export default Forms;
