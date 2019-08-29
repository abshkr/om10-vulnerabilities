import React, { useEffect } from "react";
import { Form, Checkbox } from "antd";

const Locks = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        tnkr_lock: value.tnkr_lock,
        tnkr_active: value.tnkr_active,
        tnkr_bay_loop_ch: value.tnkr_bay_loop_ch,
        tnkr_archive: value.tnkr_archive
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t("fields.locks")}>
      {getFieldDecorator("tnkr_lock", {
        valuePropName: "checked"
      })(<Checkbox> {t("fields.locked")} </Checkbox>)}

      {getFieldDecorator("tnkr_active", {
        valuePropName: "checked"
      })(<Checkbox> {t("fields.active")} </Checkbox>)}

      {getFieldDecorator("tnkr_bay_loop_ch", {
        valuePropName: "checked"
      })(<Checkbox> {t("fields.bayCheck")} </Checkbox>)}

      {getFieldDecorator("tnkr_archive", {
        valuePropName: "checked"
      })(<Checkbox>{t("fields.archived")} </Checkbox>)}
    </Form.Item>
  );
};

export default Locks;
