/**
 * @description
 * Base Products Screen
 * Lets the user perform simple CRUD operations to manipulate the Base Products Data.
 */

import React, { Component } from "react";
import auth from "../../utils/auth";
import { Button, Modal, notification } from "antd";
import { Page, Filter, DataTable, Download, Container } from "../../components";
import { personnel } from "../../api";
import axios from "axios";
import search from "../../utils/search";
import columns from "./columns";
import Forms from "./forms";

class Personnel extends Component {
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
      title: !!object ? `Editing (${object.per_code} / ${object.per_name})` : "Create",
      centered: true,
      width: 720,
      icon: !!object ? "edit" : "form",
      content: <Forms value={object} refresh={this.getPersonnel} />,
      okButtonProps: {
        style: { display: "none" }
      }
    });
  };

  getPersonnel = () => {
    this.setState({
      isLoading: true
    });

    axios
      .all([personnel.readPersonnel()])
      .then(
        axios.spread(personnel => {
          this.setState({
            isLoading: false,
            data: personnel.data.records,
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
    this.getPersonnel();
  }

  render() {
    const { data, isLoading, filtered, value, resize } = this.state;
    const results = !!filtered ? filtered : data;
    const name = "Personnel";
    return (
      <Page page={"Access Control"} name={name} isLoading={isLoading} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} loading={isLoading} />
          <Button shape="round" type="primary" icon={resize ? "shrink" : "arrows-alt"} style={{ float: "right" }} onClick={this.handleResize} disabled={isLoading} />
          <Download data={data} type={"personnel"} style={{ float: "right", marginRight: 5 }} loading={isLoading} />
          <Button shape="round" type="primary" style={{ float: "right", marginRight: 5 }} onClick={() => this.handleClick(null)} disabled={isLoading}>
            Create Personnel
          </Button>
          <DataTable rowKey="per_code" resize={resize} columns={columns(results)} data={results} isLoading={isLoading} scroll={2400} click={this.handleClick} />
        </Container>
      </Page>
    );
  }
}

export default auth(Personnel);
