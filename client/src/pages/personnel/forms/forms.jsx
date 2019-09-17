import React from "react";

import { Form, Button, Tabs, notification, Modal } from "antd";
import { Employer, Code, Name, SLP, Department, Email, Role, TimeCode, DriverLicence, Status, Comment, Lock } from "./fields";
import { Expiry } from "../../../components";
import PasswordReset from "./passwordReset";
import { personnel } from "../../../api";
import BulkEdit from "./bulkEdit";
import axios from "axios";

const TabPane = Tabs.TabPane;

const FormModal = ({ form, refresh, value, t, expiry, data }) => {
  const handleCreate = () => {
    form.validateFields((err, values) => {
      if (!err) {
        Modal.confirm({
          title: t("prompts.create"),
          okText: t("operations.yes"),
          okType: "primary",
          cancelText: t("operations.no"),
          centered: true,
          onOk: () => {
            axios
              .all([personnel.createPersonnel(values)])
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
              .all([personnel.updatePersonnel(values)])
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
      .all([personnel.deletePersonnel(value)])
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

  return (
    <div>
      <Form>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane className="ant-tab-window" tab={t("tabColumns.general")} forceRender={true} key="1">
            <Employer form={form} value={value} t={t} />
            <Code form={form} value={value} t={t} data={data} />
            <Name form={form} value={value} t={t} />
            <SLP form={form} value={value} t={t} />
            <Department form={form} value={value} t={t} />
            <Email form={form} value={value} t={t} />
            <Role form={form} value={value} t={t} />
            <TimeCode form={form} value={value} t={t} />
            <DriverLicence form={form} value={value} t={t} />
            <Status form={form} value={value} t={t} />
            <Comment form={form} value={value} t={t} />
          </TabPane>
          <TabPane className="ant-tab-window" tab={t("tabColumns.expiryDates")} forceRender={true} key="2">
            <Expiry form={form} value={value} t={t} types={expiry} />
          </TabPane>

          <TabPane className="ant-tab-window" tab={t("tabColumns.areaAccess")} forceRender={true} key="3">
            <Lock form={form} value={value} t={t} />
          </TabPane>

          <TabPane className="ant-tab-window" tab={t("tabColumns.resetPassword")} forceRender={true} key="4" disabled={!value}>
            <PasswordReset value={value} t={t} />
          </TabPane>

          <TabPane
            className="ant-tab-window"
            tab={t("tabColumns.bulkEdit")}
            forceRender={true}
            key="5"
            disabled={(!!value && value.tnkr_name === "") || !value}
          >
            <BulkEdit form={form} value={value} t={t} />
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
