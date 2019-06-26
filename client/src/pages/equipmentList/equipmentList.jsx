/**
 * @description
 * Base Products Screen
 * Lets the user perform simple CRUD operations to manipulate the Base Products Data.
 */

import React, { Component } from "react";
import auth from "../../utils/auth";
import { Button, Modal, notification } from "antd";
import { Page, Filter, DataTable, Download, Container } from "../../components";
import { equipmentList } from "../../api";
import axios from "axios";
import search from "../../utils/search";
import columns from "./columns";

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
      title: !!object ? `Editing (${object.per_code} / ${object.per_name})` : "Create",
      centered: true,
      width: 1024,
      icon: !!object ? "edit" : "form",
      content: <div value={object} refresh={this.handleFetch} data={data} />,
      okButtonProps: {
        style: { display: "none" }
      }
    });
  };

  handleFetch = () => {
    this.setState({
      isLoading: true
    });

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
          <Button shape="round" icon="user" type="primary" style={{ float: "right", marginRight: 5 }} onClick={() => this.handleClick(null)} disabled={isLoading}>
            Create Personnel
          </Button>
          <DataTable rowKey="per_code" resize={resize} columns={columns(results, configuration)} data={results} isLoading={isLoading} click={this.handleClick} />
        </Container>
      </Page>
    );
  }
}

export default auth(EquipmentList);
