/**
 * @description
 * Tank Configurations Screen
 * Lets the user perform simple CRUD operations to manipulate the Tank Configurations Data.
 */

import React, { Component } from "react";
import auth from "../../utils/auth";
import { Page, Filter, DataTable, Download, Container } from "../../components";

import axios from "axios";
import search from "../../utils/search";
import columns from "./columns";
import { Button, Modal } from "antd";
import Forms from "./forms";

class TankConfiguration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: "",
      resize: false
    };
  }

  handleClick = object => {
    Modal.info({
      title: !!object ? `Editing ${object.tank_code}` : "Create",
      centered: true,
      width: 720,
      maskClosable: true,
      content: <Forms value={object} />,
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
    axios.get(`https://10.1.10.66/api/tank/read.php`).then(response => {
      const data = response.data.records;
      this.setState({
        data: data,
        isLoading: false
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
          <Filter value={value} search={this.searchObjects} />
          <Button
            type="primary"
            icon={resize ? "shrink" : "arrows-alt"}
            style={{ float: "right" }}
            onClick={this.handleResize}
          />
          <Download data={data} type={"Tank Configuration"} style={{ float: "right", marginRight: 5 }} />
          <Button
            type="primary"
            style={{ float: "right", marginRight: 5 }}
            onClick={() => this.handleClick(null)}
          >
            Create Tank Configuration
          </Button>

          <DataTable
            scroll={2000}
            data={results}
            resize={resize}
            rowKey="base_code"
            isLoading={isLoading}
            click={this.handleClick}
            columns={columns(results)}
          />
        </Container>
      </Page>
    );
  }
}

export default auth(TankConfiguration);
