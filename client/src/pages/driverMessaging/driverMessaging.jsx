import React, { Component } from "react";
import axios from "axios";
import columns from "./columns";
import auth from "../../auth";
import search from "../../utils/search";
import { baseProducts } from "../../api";
import { Button, Modal, notification } from "antd";
import { Page, Filter, DataTable, Download, Container } from "../../components";

class DriverMessaging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: "",
      resize: false,
      isLoading: true
    };
  }

  handleClick = () => {
    Modal.info({
      title: "Create Message",
      centered: true,
      width: 720,
      icon: "message",
      content: <div refresh={this.handleFetch} />,
      okButtonProps: {
        style: { display: "none" }
      }
    });
  };

  handleSearch = query => {
    const { value } = query.target;
    this.setState({
      filtered: search(value, this.state.data),
      value
    });
  };

  handleFetch = () => {
    this.setState({ isLoading: true });

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
      .catch(error => {
        notification.error({
          message: error.message,
          description: "Failed to make the request."
        });
      });
  };

  componentDidMount() {
    this.handleFetch();
  }

  render() {
    const { data, isLoading, filtered, value, resize } = this.state;
    const { configuration } = this.props;

    const results = !!filtered ? filtered : data;
    const name = "Driver Messaging";

    return (
      <Page page={"Operations"} name={name} block={true}>
        <Container>
          <Filter value={value} search={this.handleSearch} loading={isLoading} />

          <Download data={data} type={"base_products"} style={{ float: "right", marginRight: 5 }} loading={isLoading} />
          <Button shape="round" type="primary" icon="message" style={{ float: "right", marginRight: 5 }} onClick={() => this.handleClick(null)} loading={isLoading}>
            Create Message
          </Button>

          <DataTable isLoading={isLoading} resize={resize} rowKey="base_code" columns={columns(results, configuration)} data={results} scroll={2800} />
        </Container>
      </Page>
    );
  }
}
export default auth(DriverMessaging);
