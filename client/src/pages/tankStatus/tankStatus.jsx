/**
 * @description
 * Tank Status Screen
 * Lets the user perform simple CRUD operations to manipulate the Tank Status Data.
 */

import React, { Component } from "react";
import auth from "../../utils/auth";
import { Page, Download, Container, DataTable, Filter } from "../../components";
import { Modal, notification, Button } from "antd";
import axios from "axios";
import search from "../../utils/search";
import columns from "./columns";
import Forms from "./forms";

class TankStatus extends Component {
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
    Modal.info({
      title: !!object ? `Editing (${object.tank_code} / ${object.tank_name})` : "Create",
      centered: true,
      width: 720,
      content: <Forms value={object} refresh={this.getTanks} />,
      okButtonProps: {
        style: { display: "none" }
      }
    });
  };

  getTanks = () => {
    this.setState({
      isLoading: true
    });

    axios
      .get(`https://10.1.10.66/api/pages/tank/read.php`)
      .then(response => {
        const data = response.data.records;
        this.setState({
          data: data,
          isLoading: false
        });
      })
      .catch(function(error) {
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

  searchObjects = query => {
    const { value } = query.target;
    this.setState({
      filtered: search(value, this.state.data),
      value
    });
  };

  componentDidMount() {
    this.getTanks();
  }

  render() {
    const { data, isLoading, filtered, value, resize } = this.state;
    const results = !!filtered ? filtered : data;
    const name = "Tank Status";
    return (
      <Page page={"Gantry"} name={name} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} />
          <Button type="primary" icon={resize ? "shrink" : "arrows-alt"} style={{ float: "right" }} onClick={this.handleResize} disabled={isLoading} />
          <Download data={data} type={"Tank Status"} style={{ float: "right", marginRight: 5 }} loading={isLoading} />
          <DataTable resize={resize} rowKey="tank_code" columns={columns(results)} data={results} isLoading={isLoading} scroll={5000} click={this.handleClick} />
        </Container>
      </Page>
    );
  }
}

export default auth(TankStatus);
