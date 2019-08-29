import React from "react";
import axios from "axios";
import { area } from "../../../api";
import { Area, AreaName } from "./fields";
import { Form, Button, Tabs, notification, Modal } from "antd";

const FormModal = ({ form, refresh, value, t, data }) => {
  const handleCreate = () => {
    form.validateFields((err, values) => {
      if (!err) {
        Modal.confirm({
          title: t("prompts.delete"),
          okText: t("operations.yes"),
          okType: "danger",
          cancelText: t("operations.no"),
          centered: true,
          onOk: () => {
            axios
              .all([area.createArea(values)])
              .then(
                axios.spread(response => {
                  refresh();

                  Modal.destroyAll();
                  notification.success({
                    message: t("messages.createSuccess"),
                    description: t("messages.createSuccess")
                  });
                })
              )
              .catch(error => {
                notification.error({
                  message: error.message,
                  description: t("messages.createFailed")
                });
              });
          }
        });
      }
    });
  };

  const handleUpdate = () => {
    form.validateFields((err, values) => {
      if (!err) {
        Modal.confirm({
          title: t("prompts.update"),
          okText: t("operations.yes"),
          okType: "primary",
          cancelText: t("operations.no"),
          centered: true,
          onOk: () => {
            axios
              .all([area.updateArea(values)])
              .then(
                axios.spread(response => {
                  refresh();

                  Modal.destroyAll();
                  notification.success({
                    message: t("messages.updateSuccess"),
                    description: t("messages.updateSuccess")
                  });
                })
              )
              .catch(error => {
                notification.error({
                  message: error.message,
                  description: t("messages.updateFailed")
                });
              });
          }
        });
      }
    });
  };

  const handleDelete = () => {
    axios
      .all([area.deleteArea(value)])
      .then(
        axios.spread(response => {
          refresh();

          Modal.destroyAll();
          notification.success({
            message: t("messages.deleteSuccess"),
            description: `${t("descriptions.deleteSuccess")} ${value.prt_printer}`
          });
        })
      )
      .catch(error => {
        notification.error({
          message: error.message,
          description: t("descriptions.deleteFailed")
        });
      });
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: t("prompts.delete"),
      okText: t("operations.yes"),
      okType: "danger",
      cancelText: t("operations.no"),
      centered: true,
      onOk: handleDelete
    });
  };

  const TabPane = Tabs.TabPane;

  return (
    <div>
      <Form style={{ height: "30vh" }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="General" key="1">
            <Area form={form} value={value} t={t} data={data} />
            <AreaName form={form} value={value} t={t} data={data} />
          </TabPane>
        </Tabs>
      </Form>

      <Button shape="round" icon="close" style={{ float: "right" }} onClick={() => Modal.destroyAll()}>
        {t("operations.cancel")}
      </Button>

      <Button
        shape="round"
        type="primary"
        icon={!!value ? "edit" : "plus"}
        style={{ float: "right", marginRight: 5 }}
        onClick={!!value ? handleUpdate : handleCreate}
      >
        {!!value ? t("operations.update") : t("operations.create")}
      </Button>

      {!!value && (
        <Button shape="round" type="danger" icon="delete" style={{ float: "right", marginRight: 5 }} onClick={showDeleteConfirm}>
          {t("operations.delete")}
        </Button>
      )}
    </div>
  );
};

const Forms = Form.create()(FormModal);

export default Forms;
