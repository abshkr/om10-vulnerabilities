/**
 * @description
 * Base Products Screen
 * Lets the user perform simple CRUD operations to manipulate the Base Products Data.
 */

import React, { Component } from "react";
import axios from "axios";
import Forms from "./forms";
import columns from "./columns";
import auth from "../../utils/auth";
import search from "../../utils/search";
import { baseProducts } from "../../api";
import { Button, Modal, notification } from "antd";
import { Page, Filter, DataTable, Download, Container } from "../../components";

class BaseProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: "",
      resize: false,
      isLoading: true
    };
  }

  handleClick = object => {
    Modal.info({
      title: !!object ? `Editing (${object.base_code} / ${object.base_name})` : "Create",
      centered: true,
      width: 720,
      icon: !!object ? "edit" : "form",
      content: <Forms value={object} refresh={this.getBaseProducts} baseProducts={this.state.baseProducts} />,
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

  getBaseProducts = () => {
    this.setState({
      isLoading: true
    });

    axios
      .all([baseProducts.readBaseProduct()])
      .then(
        axios.spread(baseProducts => {
          this.setState({
            isLoading: false,
            data: baseProducts.data.records,
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
    this.getBaseProducts();
  }

  render() {
    const { data, isLoading, filtered, value, resize } = this.state;
    const results = !!filtered ? filtered : data;
    const name = "Base Products";
    return (
      <Page page={"Gantry"} name={name} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} loading={isLoading} />
          <Button type="primary" icon={resize ? "shrink" : "arrows-alt"} style={{ float: "right" }} onClick={this.handleResize} disabled={isLoading} />
          <Download data={data} type={"base_products"} style={{ float: "right", marginRight: 5 }} loading={isLoading} />
          <Button type="primary" style={{ float: "right", marginRight: 5 }} onClick={() => this.handleClick(null)} disabled={isLoading}>
            Create Base Product
          </Button>

          <DataTable isLoading={isLoading} resize={resize} rowKey="base_code" columns={columns(results)} data={results} scroll={3600} click={this.handleClick} />
        </Container>
      </Page>
    );
  }
}

export default auth(BaseProducts);
