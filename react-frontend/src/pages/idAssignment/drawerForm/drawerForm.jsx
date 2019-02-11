import React, { Component } from "react";
import axios from "axios";
import { Form, Row, Modal, notification } from "antd";
import moment from "moment";
import { Buttons } from "../../../components/buttons";
import * as REQUEST from "./request";

import Id from "./fields/id";
import Issuer from "./fields/issuer";
import AssignmentType from "./fields/assignmenType";
import PhysicalType from "./fields/physicalType";
import TagText from "./fields/tagText";
import TimeCode from "./fields/timeCode";
import DateCreated from "./fields/dateCreated";
import Pin from "./fields/pin";
import CheckList from "./fields/checkList";
import Employer from "./fields/employer";
import Role from "./fields/role";
import Personnel from "./fields/personnel";
import Drawer from "./fields/drawer";
import Tanker from "./fields/tanker";
import Supplier from "./fields/supplier";
import EquipmentCarrier from "./fields/equipmentCarrier";
import TransportEquipment from "./fields/transportEquipment";
import OwnerCarrier from "./fields/ownerCarrier";

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      issuer: [],
      assignment: [],
      physicalType: [],
      isLoading: false,
      employer: [],
      role: [],
      personnel: [],
      drawer: [],
      supplier: [],
      tanker: [],
      equipmentCarrier: [],
      transportEquipment: []
    };
  }

  handleSubmit = e => {
    const { form, edit } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        Modal.confirm({
          title: "Confirm",
          content: `Are you sure you want to ${edit ? "update" : "create "} this record?`,
          okText: "Submit",
          cancelText: "Cancel",
          onOk: () => this.create(values),
          centered: true
        });
      }
    });
  };

  create = values => {
    const { update, close, form, edit } = this.props;

    axios
      .post(`https://10.1.10.66/api/idassignment/create.php`, {
        values
      })
      .then(function(response) {
        update();
        close();
        form.resetFields();
        notification.success({
          message: "Success!",
          description: `${edit ? "Updating" : "Creating"} the record was successful.`
        });
      })
      .catch(function(error) {
        notification.error({
          message: "Error!",
          description: `${edit ? "Updating" : "Creating"} the record has failed.`
        });
      });
  };

  request = form => {
    form.setFieldsValue({
      kya_key_created: moment().format("YYYY-MM-DD"),
      owner_carrier: "Owner",
      kya_timecode: "AL"
    });

    axios
      .all([
        REQUEST.id(),
        REQUEST.issuer(),
        REQUEST.assignment(),
        REQUEST.physicalType(),
        REQUEST.employer(),
        REQUEST.role(),
        REQUEST.personnel(),
        REQUEST.drawer(),
        REQUEST.supplier(),
        REQUEST.tanker()
      ])
      .then(
        axios.spread(
          (id, issuer, assignment, physicalType, employer, role, personnel, drawer, supplier, tanker) => {
            this.setState({
              id: id.data.records[0].count + 1,
              issuer: issuer.data.records,
              assignment: assignment.data.records,
              physicalType: physicalType.data.records,
              employer: employer.data.records,
              role: role.data.records,
              personnel: personnel.data.records,
              drawer: drawer.data.records,
              supplier: supplier.data.records,
              tanker: tanker.data.records,
              isLoading: false
            });
          }
        )
      );
  };

  componentDidMount() {
    const { form, data, edit } = this.props;

    if (!edit) {
      form.resetFields();
      this.request(form);
    }

    if (!!data && edit) {
      form.setFieldsValue(data);
      form.setFieldsValue({
        checklist: [data.kya_lock === "Y" ? "Locked?" : null, data.kya_adhoc === "Y" ? "Adhoc?" : null]
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { form, data, edit } = this.props;

    if (prevProps.data !== data) {
      if (!edit) {
        form.resetFields();
        this.request(form);
      }

      if (!!data && edit) {
        form.setFieldsValue(data);
        form.setFieldsValue({
          checklist: [data.kya_lock === "Y" ? "Locked?" : null, data.kya_adhoc === "Y" ? "Adhoc?" : null]
        });
      }
    }
  }
  render() {
    const { issuer, assignment, id, physicalType, isLoading } = this.state;
    const { edit, form, close, data } = this.props;
    const { getFieldDecorator } = form;

    const fieldValues = form.getFieldsValue();

    return (
      <div>
        <Form>
          <Row gutter={16}>
            <Id isLoading={isLoading} decorator={getFieldDecorator} edit={edit} id={id} />
            <Issuer isLoading={isLoading} decorator={getFieldDecorator} edit={edit} issuer={issuer} />
            <AssignmentType
              isLoading={isLoading}
              decorator={getFieldDecorator}
              edit={edit}
              assignment={assignment}
            />
            <PhysicalType isLoading={isLoading} decorator={getFieldDecorator} physicalType={physicalType} />
          </Row>

          <Row gutter={16}>
            <TagText isLoading={isLoading} decorator={getFieldDecorator} form={form} />
            <DateCreated decorator={getFieldDecorator} edit={edit} form={form} data={data} />
            <TimeCode isLoading={isLoading} decorator={getFieldDecorator} />
            <Pin isLoading={isLoading} decorator={getFieldDecorator} edit={edit} />
          </Row>

          <Row gutter={16}>
            <CheckList isLoading={isLoading} decorator={getFieldDecorator} edit={edit} />
          </Row>

          <Row gutter={16}>
            <Employer decorator={getFieldDecorator} values={fieldValues} {...this.state} />
            <Role isLoading={isLoading} decorator={getFieldDecorator} values={fieldValues} {...this.state} />
            <Personnel decorator={getFieldDecorator} values={fieldValues} {...this.state} />
            <Drawer decorator={getFieldDecorator} values={fieldValues} {...this.state} />
          </Row>

          <Row gutter={16}>
            <OwnerCarrier isLoading={isLoading} decorator={getFieldDecorator} edit={edit} />
          </Row>

          <Row gutter={16}>
            <Supplier decorator={getFieldDecorator} values={fieldValues} {...this.state} />
            <Tanker decorator={getFieldDecorator} values={fieldValues} form={form} {...this.state} />
            <EquipmentCarrier decorator={getFieldDecorator} values={fieldValues} {...this.state} />
            <TransportEquipment decorator={getFieldDecorator} values={fieldValues} {...this.state} />
          </Row>
        </Form>
        <Buttons edit={edit} close={close} submit={this.handleSubmit} isLoading={isLoading} />
      </div>
    );
  }
}

const DrawerForm = Form.create()(FormComponent);

export default DrawerForm;
