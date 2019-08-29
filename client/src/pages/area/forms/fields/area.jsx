import React, { useEffect } from "react";
import { Form, Input } from "antd";
import _ from "lodash";

const Area = ({ form, value, t, data }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        area_k: value.area_k
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const match = _.find(data, ["area_k", input]);

    if (input === "" || !input) {
      callback(`${t("validate.set")} ─ ${t("fields.areaId")}`);
    }

    if (input && !!match && !value) {
      callback(t("descriptions.alreadyExists"));
    }

    if (input && input.length > 4) {
      callback(`${t("placeholder.maxCharacters")}: 4 ─ ${t("descriptions.maxCharacters")}`);
    }

    if (input && !_.isInteger(parseInt(input))) {
      callback(`${t("placeholder.wrongType")} ─ ${t("descriptions.mustBeInteger")}`);
    }

    callback();
  };

  return (
    <Form.Item label={t("fields.areaId")}>
      {getFieldDecorator("area_k", {
        rules: [{ required: true, validator: validate }]
      })(<Input disabled={!!value} />)}
    </Form.Item>
  );
};

export default Area;
