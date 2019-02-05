import React from "react";
import { Modal, Form, Button } from "antd";
import BaseProductCode from "./fields/baseProductCode";
import BaseProductName from "./fields/baseProductName";
import BaseProductClassifications from "./fields/baseProductClassification";
import BaseProductGroup from "./fields/baseProductGroup";
import BaseProductColor from "./fields/baseProductColor";
import RefTempSpec from "./fields/refTempSpec";
import DensityRangeLow from "./fields/densityRangeLow";
import DensityRangeHigh from "./fields/densityRangeHigh";
import CorrectionMethod from "./fields/correctionMethod";

export const Create = Form.create()(
  class extends React.Component {
    state = {
      color: "#fff"
    };

    changeColor = color => {
      this.setState({ color });
    };

    render() {
      const { visible, cancel, form } = this.props;
      const { color } = this.state;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title="Create A Base Product"
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
            <Button key="update" onClick={this.confirmCreate}>
              Create
            </Button>
          ]}
        >
          <Form>
            <BaseProductCode decorator={getFieldDecorator} />
            <BaseProductName decorator={getFieldDecorator} />
            <BaseProductClassifications decorator={getFieldDecorator} />
            <BaseProductGroup decorator={getFieldDecorator} />
            <RefTempSpec decorator={getFieldDecorator} />
            <CorrectionMethod decorator={getFieldDecorator} />
            <DensityRangeLow decorator={getFieldDecorator} />
            <DensityRangeHigh decorator={getFieldDecorator} />

            <BaseProductColor decorator={getFieldDecorator} color={color} change={this.changeColor} />
          </Form>
        </Modal>
      );
    }
  }
);
