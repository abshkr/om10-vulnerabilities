/**
 * @description
 * Base Products Screen
 * Lets the user perform simple CRUD operations to manipulate the Base Products Data.
 */

import React, { Component } from "react";
import auth from "../../auth";
import { Button, Modal, notification } from "antd";
import { Page, Filter, DataTable, Download, Container } from "../../components";
import Forms from "./forms";
import { equipmentList } from "../../api";
import axios from "axios";
import { search } from "../../utils";
import columns from "./columns";

import "./equipmentList.css";

class EquipmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: [],
      resize: false,
      isLoading: true
    };
  }

  handleClick = object => {
    const { data } = this.state;

    Modal.info({
      title: !!object ? `Editing (${object.eqpt_id} / ${object.eqpt_code})` : "Create",
      centered: true,
      width: 1024,
      icon: !!object ? "edit" : "form",
      content: <Forms value={object} refresh={this.handleFetch} data={data} />,
      okButtonProps: {
        style: { display: "none" }
      }
    });
  };

  handleFetch = () => {
    this.setState({ isLoading: true });

    axios
      .all([equipmentList.readEquipment()])
      .then(
        axios.spread(equipment => {
          this.setState({
            isLoading: false,
            data: equipment.data.records,
            filtered: null,
            value: ""
          });
        })
      )
      .catch(error => {
        notification.error({
          message: error.message,
          description: "Failed to make the request."
        });
      });
  };

  handleResize = () => {
    const { resize } = this.state;

    this.setState({
      resize: !resize
    });
  };

  handleSearch = query => {
    const { value } = query.target;

    this.setState({
      filtered: search(value, this.state.data),
      value
    });
  };

  componentDidMount() {
    this.handleFetch();
  }

  render() {
    const { data, isLoading, filtered, value, resize } = this.state;
    const { configuration } = this.props;

    const results = !!filtered ? filtered : data;

    return (
      <Page page={"Access Control"} name={"Equipment List"} isLoading={isLoading} block={true}>
        <Container>
          <Filter value={value} search={this.handleSearch} loading={isLoading} />
          <Button shape="round" type="primary" icon={resize ? "shrink" : "arrows-alt"} style={{ float: "right" }} onClick={this.handleResize} disabled={isLoading} />
          <Download data={data} type={"equipment_list"} style={{ float: "right", marginRight: 5 }} loading={isLoading} />
          <Button shape="round" icon="build" type="primary" style={{ float: "right", marginRight: 5 }} onClick={() => this.handleClick(null)} disabled={isLoading}>
            Create Equipment
          </Button>
          <DataTable rowKey="eqpt_id" resize={resize} columns={columns(results, configuration)} data={results} isLoading={isLoading} click={this.handleClick} />
        </Container>
      </Page>
    );
  }
}

export default auth(EquipmentList);
