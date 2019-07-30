import React, { Component } from "react";
import auth from "../../auth";
import { Page, Filter, DataTable, Container, Download, IButton } from "../../components";
import { Button, Modal } from "antd";
import columns from "./columns";
import axios from "axios";
import search from "../../utils/search";
import Forms from "./forms";

class IdAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: null,
      filtered: null,
      isLoading: true,
      iButtonPayload: null,
      iButtonVisibility: false
    };
  }

  handleClick = object => {
    Modal.info({
      title: !!object ? "Edit" : "Create",
      centered: true,
      width: 720,
      maskClosable: true,
      content: <Forms value={object} edit={!!object} />
    });
  };

  searchObjects = query => {
    const { value } = query.target;
    this.setState({
      filtered: search(value, this.state.data),
      value
    });
  };

  searchTrigger = value => {
    this.setState({
      filtered: search(value, this.state.data),
      iButtonVisibility: false,
      iButtonPayload: value,
      value
    });
  };

  componentDidMount() {
    axios.get(`https://10.1.10.66/api/pages/idassignment/read.php`).then(response => {
      this.setState({
        data: response.data.records,
        isLoading: false
      });
    });
  }

  render() {
    const { data, isLoading, filtered, value, iButtonVisibility } = this.state;
    const results = !!filtered ? filtered : data;
    return (
      <Page page={"Access Control"} name={"ID Assignment"} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} />
          <Download data={results} type={"ID Assignment"} style={{ float: "right" }} />

          <Button type="primary" style={{ float: "right", marginRight: 5 }} onClick={() => this.handleClick(null)}>
            Create Assignment
          </Button>

          <Button type="primary" style={{ float: "right", marginRight: 5 }} onClick={() => this.setState({ iButtonVisibility: true })}>
            Scan I-Button
          </Button>

          <IButton
            submit={this.searchTrigger}
            visible={iButtonVisibility}
            close={() =>
              this.setState({
                iButtonVisibility: false
              })
            }
          />
          <DataTable data={results} rowKey="kya_key_no" isLoading={isLoading} click={this.handleClick} columns={columns(results)} />
        </Container>
      </Page>
    );
  }
}

export default auth(IdAssignment);
