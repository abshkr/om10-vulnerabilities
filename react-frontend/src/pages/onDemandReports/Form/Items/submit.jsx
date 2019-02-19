import React from "react";
import { Form, Button } from "antd";

const FormItem = Form.Item;

const SubmitForm = ({ generating, handleReset }) => {
  return (
    <FormItem style={{ marginBottom: 0 }}>
      <Button type="primary" htmlType="submit" loading={generating}>
        {generating ? "Generating" : "Submit"}
      </Button>
      <Button style={{ marginLeft: 8 }} onClick={handleReset}>
        Clear
      </Button>
    </FormItem>
  );
};

export default SubmitForm;
