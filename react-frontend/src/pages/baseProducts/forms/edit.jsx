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

class EditForm extends React.Component {
  state = {
    color: null
  };

  changeColor = color => {
    this.setState({ color });
  };

  resetColor = () => {
    this.setState({ color: null });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = values["base_color"] = this.state.color;
        console.log(values);
      }
    });
  };

  render() {
    const { visible, cancel, form, value } = this.props;
    const { getFieldDecorator, setFieldsValue } = form;

    return (
      <Modal
        visible={visible}
        title="Edit A Base Product"
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
          <BaseProductCode decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
          <BaseProductName decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
          <BaseProductClassifications decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
          <BaseProductGroup decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
          <RefTempSpec decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
          <CorrectionMethod decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
          <DensityRangeLow decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
          <DensityRangeHigh decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
          <BaseProductColor
            decorator={getFieldDecorator}
            value={value}
            color={this.state.color}
            setValue={setFieldsValue}
            change={this.changeColor}
            reset={this.resetColor}
          />
        </Form>
      </Modal>
    );
  }
}

const Edit = Form.create()(EditForm);
export default Edit;
