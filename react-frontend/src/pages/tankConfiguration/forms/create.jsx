import React from "react";
import axios from "axios";
import { Modal, Form, Button } from "antd";
import Terminal from "./fields/terminal";
import TankCode from "./fields/tankCode";
import Product from "./fields/product";
import TankName from "./fields/tankName";
import Density from "./fields/density";
import DailyVariancePercent from "./fields/dailyVariancePercent";
import DailyVarianceVol from "./fields/dailyVarianceVol";
import MonthlyVariancePercent from "./fields/monthlyVariancePercent";
import MonthlyVarianceVol from "./fields/montlyVarianceVol";

const Create = Form.create()(
  class extends React.Component {
    post = values => {
      axios({
        method: "post",
        url: "https://10.1.10.66/api/base_prod/create.php",
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
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.createConfirm(values);
        }
      });
    };

    render() {
      const { visible, cancel, form } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title="Create A Tank Configuration"
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
            <Terminal decorator={getFieldDecorator} />
            <TankCode decorator={getFieldDecorator} />
            <Product decorator={getFieldDecorator} />
            <TankName decorator={getFieldDecorator} />
            <Density decorator={getFieldDecorator} />
            <DailyVariancePercent decorator={getFieldDecorator} />
            <DailyVarianceVol decorator={getFieldDecorator} />
            <MonthlyVariancePercent decorator={getFieldDecorator} />
            <MonthlyVarianceVol decorator={getFieldDecorator} />
          </Form>
        </Modal>
      );
    }
  }
);

export default Create;
