/**
 * @description
 * Tank Configurations Screen
 * Lets the user perform simple CRUD operations to manipulate the Tank Configurations Data.
 */

import React, { Component } from "react";

import axios from "axios";
import Forms from "./forms";
import columns from "./columns";

import { tanks, baseProducts } from "../../api";
import auth from "../../utils/auth";
import search from "../../utils/search";
import { Button, Modal, notification } from "antd";
import { Page, Filter, DataTable, Download, Container } from "../../components";

class TankConfiguration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: "",
      resize: false,
      isLoading: true,
      baseProducts: []
    };
  }

  handleClick = object => {
    Modal.info({
      title: !!object ? `Editing (${object.tank_code} / ${object.tank_name})` : "Create",
      centered: true,
      icon: !!object ? "edit" : "form",
      width: 720,
      content: <Forms value={object} refresh={this.getTanks} baseProducts={this.state.baseProducts} />,
      okButtonProps: {
        style: { display: "none" }
      }
    });
  };

  searchObjects = query => {
    const { value } = query.target;
    this.setState({
      filtered: search(value, this.state.data),
      value
    });
  };

  handleResize = () => {
    const { resize } = this.state;
    this.setState({
      resize: !resize
    });
  };

  getTanks = () => {
    this.setState({
      isLoading: true
    });

    axios
      .all([tanks.readTanks(), baseProducts.readBaseProduct()])
      .then(
        axios.spread((tanks, baseProducts) => {
          this.setState({
            isLoading: false,
            data: tanks.data.records,
            baseProducts: baseProducts.data.records,
            filtered: null,
            value: ""
          });
        })
      )
      .catch(function(error) {
        notification.error({
          message: error.message,
          description: "Failed to make the request."
        });
      });
  };

  componentDidMount() {
    this.getTanks();
  }

  render() {
    const { data, isLoading, filtered, value, resize } = this.state;
    const results = !!filtered ? filtered : data;
    return (
      <Page page={"Gantry"} name={"Tank Configuration"} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} loading={isLoading} />
          <Button type="primary" icon={resize ? "shrink" : "arrows-alt"} style={{ float: "right" }} onClick={this.handleResize} disabled={isLoading} />
          <Download data={data} type={"Tank Configuration"} style={{ float: "right", marginRight: 5 }} loading={isLoading} />
          <Button type="primary" style={{ float: "right", marginRight: 5 }} onClick={() => this.handleClick(null)} disabled={isLoading}>
            Create Tank Configuration
          </Button>

          <DataTable scroll={2600} data={results} resize={resize} rowKey="tank_code" isLoading={isLoading} click={this.handleClick} columns={columns(results)} />
        </Container>
      </Page>
    );
  }
}

export default auth(TankConfiguration);
