import React from "react";
import axios from "axios";
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

const Create = Form.create()(
  class extends React.Component {
    state = {
      color: "#fff"
    };

    changeColor = color => {
      this.setState({ color });
    };

    post = values => {
      axios({
        method: "post",
        url: "https://10.1.10.66/api/pages/base_prod/create.php",
        data: values
      }).then(function(response) {
        console.log(response);
      });
    };

    createConfirm = values => {
      Modal.confirm({
        centered: true,
        title: "Confirm Creation",
        content: "Are you sure you want to Create this Base Product?",
        okText: "Create",
        cancelText: "Cancel",
        onOk: this.post(values),
        cancelButtonProps: {
          className: "primary"
        }
      });
    };

    handleSubmit = e => {
      e.preventDefault();
      const { color } = this.state;
      this.props.form.validateFields((err, values) => {
        if (!err) {
          values["base_color"] = color;
          this.createConfirm(values);
        }
      });
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
            <Button key="update" onClick={this.handleSubmit}>
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

export default Create;
