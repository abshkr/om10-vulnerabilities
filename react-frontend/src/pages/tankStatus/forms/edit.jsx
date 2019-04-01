import React, { Component } from "react";
import { Modal, Form, Button, Tabs, Row, Col, Divider } from "antd";

import Terminal from "./fields/terminal";
import Tank from "./fields/tank";
import ProductCode from "./fields/productCode";
import ProductName from "./fields/productName";
import Area from "./fields/area";
import Ullage from "./fields/ullage";
import TankStatus from "./fields/tankStatus";
import RefTemp from "./fields/refTemp";
import Sulphur from "./fields/sulphur";
import FlashPoint from "./fields/flashPoint";

import H from "./fields/h";
import HH from "./fields/hh";
import L from "./fields/l";
import LL from "./fields/ll";
import UserH from "./fields/userH";
import UserL from "./fields/userL";

import StandardDensity from "./fields/standardDensity";
import Density from "./fields/density";
import API from "./fields/api";
import ProductLevel from "./fields/productLevel";
import ExpCoeff from "./fields/expCoeff";
import ObservedTemperature from "./fields/obsvdTemp";
import AmbientVolume from "./fields/ambVolume";
import StandardVolume from "./fields/standardVolume";
import LiquidMass from "./fields/liquidMass";

import GaugingMethod from "./fields/gaugingMethod";
import LevelAlarmState from "./fields/levelAlarmState";
import LeakDetection from "./fields/leakDetection";
import TankGroup from "./fields/tankGroup";
import GaugeIdentifer from "./fields/gaugeIdentifer";
import InterfaceType from "./fields/interfaceType";
import Auxiliary from "./fields/auxiliary";
import Channel from "./fields/channel";
import Instance from "./fields/instance";
import PollInterval from "./fields/pollInterval";
import RegisterOffset from "./fields/registerOffset";

class EditForm extends Component {
  state = {
    context: null
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  setContext = context => {
    this.setState({
      context
    });
  };

  render() {
    const { visible, cancel, form, value } = this.props;
    const { getFieldDecorator, setFieldsValue } = form;
    const { context } = this.state;
    const TabPane = Tabs.TabPane;
    return (
      <Modal
        visible={visible}
        title={!!value ? `Edit → ${value.tank_code} - ${value.tank_base} - ${value.tank_base_name}` : "Edit"}
        onCancel={cancel}
        onOk={this.handleCreate}
        width={800}
        destroyOnClose={true}
        bodyStyle={{
          overflowY: "scroll",
          height: 640,
          overflowX: "hidden"
        }}
        footer={[
          <Button key="cancel" onClick={cancel}>
            Cancel
          </Button>,
          <Button key="update" onClick={this.handleSubmit}>
            Edit
          </Button>
        ]}
      >
        <Form>
          <Tabs defaultActiveKey="1">
            <TabPane tab="General" key="1">
              <Terminal decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Tank decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <ProductCode decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <ProductName decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Area decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <TankStatus decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
            </TabPane>

            <TabPane tab="Status" key="2">
              <Row type="flex" justify="space-between">
                <Col span={4}>
                  <HH decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
                <Col span={4}>
                  <H decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
                <Col span={4}>
                  <L decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
                <Col span={4}>
                  <LL decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
                <Col span={4}>
                  <UserH decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
                <Col span={4}>
                  <UserL decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
              </Row>

              <Row type="flex" justify="space-between">
                <Col span={4}>
                  <Ullage decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
                <Col span={4}>
                  <RefTemp decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
                <Col span={4}>
                  <Sulphur decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
                <Col span={4}>
                  <FlashPoint decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>

                <Col span={4}>
                  <div />
                </Col>

                <Col span={4}>
                  <div />
                </Col>
              </Row>

              <Divider />

              <Row type="flex" justify="space-between">
                <Col span={4}>
                  <ExpCoeff decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
                <Col span={4}>
                  <ObservedTemperature
                    decorator={getFieldDecorator}
                    value={value}
                    setValue={setFieldsValue}
                  />
                </Col>
                <Col span={4}>
                  <AmbientVolume decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
                <Col span={4}>
                  <StandardVolume decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
                <Col span={4}>
                  <LiquidMass decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
              </Row>

              <Row type="flex" justify="space-between">
                <Col span={4}>
                  <StandardDensity
                    decorator={getFieldDecorator}
                    value={value}
                    setValue={setFieldsValue}
                    setContext={this.setContext}
                    context={context}
                  />
                </Col>
                <Col span={4}>
                  <Density
                    decorator={getFieldDecorator}
                    value={value}
                    setValue={setFieldsValue}
                    setContext={this.setContext}
                    context={context}
                  />
                </Col>
                <Col span={4}>
                  <API
                    decorator={getFieldDecorator}
                    value={value}
                    setValue={setFieldsValue}
                    setContext={this.setContext}
                    context={context}
                  />
                </Col>
                <Col span={4}>
                  <ProductLevel decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>

                <Col span={4}>
                  <div />
                </Col>
              </Row>

              <Row type="flex" justify="space-around" style={{ marginTop: 30 }}>
                <Col>
                  <Button type="primary">Calculate Density</Button>
                </Col>
                <Col>
                  <Button type="primary">Calculate Quantity by Level</Button>
                </Col>
                <Col>
                  <Button type="primary">Calculate Quantity</Button>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Gauging" key="3">
              <GaugingMethod decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <LevelAlarmState decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <LeakDetection decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <TankGroup decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Divider />

              <Row type="flex" justify="space-between">
                <Col span={4}>
                  <Channel decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
                <Col span={4}>
                  <Instance decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
                <Col span={4}>
                  <PollInterval decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
                <Col span={4}>
                  <RegisterOffset decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
              </Row>

              <Row type="flex" justify="space-between">
                <Col span={4}>
                  <GaugeIdentifer decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
                <Col span={4}>
                  <InterfaceType decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
                <Col span={4}>
                  <Auxiliary decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
                </Col>
                <Col span={4}>
                  <div />
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}

const Edit = Form.create()(EditForm);
export default Edit;
