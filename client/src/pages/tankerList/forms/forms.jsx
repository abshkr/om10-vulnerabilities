import React from "react";

import { Form, Button, Tabs, notification, Modal } from "antd";
import { logicalPrinters } from "../../../api";
import {
  Depot,
  Owner,
  Code,
  Name,
  EquipmentType,
  Carrier,
  TotalTrips,
  LastTrip,
  Comments,
  TankerPrompt,
  Pin,
  MaxKg,
  Destination,
  LastDepot,
  CurrentDepot,
  Locks
} from "./fields";
import axios from "axios";
import Compartments from "./compartments";

const TabPane = Tabs.TabPane;

const FormModal = ({ form, value, t }) => {
  const handleCreate = () => {
    form.validateFields((err, values) => {
      if (!err) {
        axios
          .all([logicalPrinters.createLogicalPrinters(values)])
          .then(
            axios.spread(response => {
              this.props.refresh();
              Modal.destroyAll();
              notification.success({
                message: t("messages.createSuccess"),
                description: `${t("descriptions.createSuccess")} ${
                  value.prt_printer
                }`
              });
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: t("descriptions.createFailed")
            });
          });
      } else {
        notification.error({
          message: t("messages.validationFailed"),
          description: t("descriptions.validationFailed")
        });
      }
    });
  };

  const handleUpdate = () => {
    form.validateFields((err, values) => {
      if (!err) {
        axios
          .all([logicalPrinters.updateLogicalPrinters(values)])
          .then(
            axios.spread(response => {
              this.props.refresh();
              Modal.destroyAll();
              notification.success({
                message: t("messages.updateSuccess"),
                description: `${t("descriptions.updateSuccess")} ${
                  value.prt_printer
                }`
              });
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: t("descriptions.updateFailed")
            });
          });
      } else {
        notification.error({
          message: t("messages.validationFailed"),
          description: t("descriptions.validationFailed")
        });
      }
    });
  };

  const handleDelete = () => {
    axios
      .all([logicalPrinters.deleteLogicalPrinters(value)])
      .then(
        axios.spread(response => {
          this.props.refresh();
          Modal.destroyAll();
          notification.success({
            message: t("messages.deleteSuccess"),
            description: `${t("descriptions.deleteSuccess")} ${
              value.prt_printer
            }`
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

  const showUpdateConfirm = () => {
    Modal.confirm({
      title: t("prompts.update"),
      okText: t("operations.yes"),
      okType: "primary",
      cancelText: t("operations.no"),
      centered: true,
      onOk: handleUpdate
    });
  };

  const showCreateConfirm = () => {
    Modal.confirm({
      title: t("prompts.create"),
      okText: t("operations.yes"),
      okType: "primary",
      cancelText: t("operations.no"),
      centered: true,
      onOk: handleCreate
    });
  };

  return (
    <div>
      <Form>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane
            className="ant-tab-window"
            tab={t("tabColumns.general")}
            forceRender={true}
            key="1"
          >
            <Depot form={form} value={value} t={t} />
            <Owner form={form} value={value} t={t} />
            <Code form={form} value={value} t={t} />
            <Name form={form} value={value} t={t} />
            <TotalTrips form={form} value={value} t={t} />
            <LastTrip form={form} value={value} t={t} />
            <Locks form={form} value={value} t={t} />
            <Comments form={form} value={value} t={t} />
          </TabPane>
          <TabPane
            className="ant-tab-window"
            tab={t("tabColumns.tanker")}
            forceRender={true}
            key="2"
          >
            <EquipmentType form={form} value={value} t={t} />
            <Carrier form={form} value={value} t={t} />
            <TankerPrompt form={form} value={value} t={t} />
            <Destination form={form} value={value} t={t} />
            <LastDepot form={form} value={value} t={t} />
            <CurrentDepot form={form} value={value} t={t} />
            <Pin form={form} value={value} t={t} />
            <MaxKg form={form} value={value} t={t} />
          </TabPane>
          <TabPane
            className="ant-tab-window"
            tab={t("tabColumns.compartments")}
            forceRender={true}
            key="3"
          >
            <Compartments form={form} value={value} t={t} />
          </TabPane>
          <TabPane
            className="ant-tab-window"
            tab={t("tabColumns.expiryDates")}
            forceRender={true}
            key="4"
          />
          <TabPane
            className="ant-tab-window"
            tab={t("tabColumns.bulkEdit")}
            forceRender={true}
            key="5"
          />
        </Tabs>
      </Form>

      <Button
        shape="round"
        icon="close"
        style={{ float: "right" }}
        onClick={() => Modal.destroyAll()}
      >
        {t("operations.cancel")}
      </Button>

      <Button
        shape="round"
        type="primary"
        icon={!!value ? "edit" : "plus"}
        style={{ float: "right", marginRight: 5 }}
        onClick={!!value ? showUpdateConfirm : showCreateConfirm}
      >
        {!!value ? t("operations.update") : t("operations.create")}
      </Button>

      {!!value && (
        <Button
          shape="round"
          type="danger"
          icon="delete"
          style={{ float: "right", marginRight: 5 }}
          onClick={showDeleteConfirm}
        >
          {t("operations.delete")}
        </Button>
      )}
    </div>
  );
};

const Forms = Form.create()(FormModal);

export default Forms;
