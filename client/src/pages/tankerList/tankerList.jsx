import React, { Component } from "react";

import { Page, Filter, DataTable, Download, Container } from "../../components";
import { Button, Modal, notification } from "antd";
import { tankerList } from "../../api";
import { search } from "../../utils";
import columns from "./columns";
import auth from "../../auth";
import axios from "axios";

class TankerList extends Component {
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
      title: !!object
        ? `Editing (${object.eqpt_id} / ${object.eqpt_code})`
        : "Create",
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
    this.setState({ isLoading: true });

    axios
      .all([tankerList.tankers()])
      .then(
        axios.spread(payload => {
          this.setState({
            isLoading: false,
            data: payload.data.records
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
    const { configuration, t } = this.props;

    const results = !!filtered ? filtered : data;

    return (
      <Page
        page={"Schedules"}
        name={"Tanker List"}
        isLoading={isLoading}
        block={true}
      >
        <Container>
          <Filter
            value={value}
            search={this.handleSearch}
            loading={isLoading}
          />
          <Button
            shape="round"
            type="primary"
            icon={resize ? "shrink" : "arrows-alt"}
            style={{ float: "right" }}
            onClick={this.handleResize}
            disabled={isLoading}
          />
          <Download
            data={data}
            type={"equipment_list"}
            style={{ float: "right", marginRight: 5 }}
            loading={isLoading}
          />
          <Button
            shape="round"
            icon="plus"
            type="primary"
            style={{ float: "right", marginRight: 5 }}
            onClick={() => this.handleClick(null)}
            disabled={isLoading}
          >
            Create
          </Button>
          <DataTable
            rowKey="tnkr_code"
            resize={resize}
            columns={columns(results, configuration)}
            data={results}
            isLoading={isLoading}
            click={this.handleClick}
          />
        </Container>
      </Page>
    );
  }
}

export default auth(TankerList);
