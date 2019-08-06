import React, { Component } from "react";
import axios from "axios";
import Forms from "./forms";
import columns from "./columns";
import auth from "../../auth";
import search from "../../utils/search";
import { reportConfiguration } from "../../api";
import { Button, Modal, notification } from "antd";
import { Page, Filter, DataTable, Download, Container } from "../../components";

class ReportConfiguration extends Component {
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
      content: <Forms value={object} refresh={this.handleFetch} />,
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

  handleResize = () => {
    const { resize } = this.state;
    this.setState({
      resize: !resize
    });
  };

  handleFetch = () => {
    this.setState({
      isLoading: true
    });

    axios
      .all([reportConfiguration.readConfiguration()])
      .then(
        axios.spread(configuration => {
          this.setState({
            isLoading: false,
            data: configuration.data.records,
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
    const name = "Report Configuration";

    return (
      <Page page={"Reports"} name={name} block={true}>
        <Container>
          <Filter value={value} search={this.handleSearch} loading={isLoading} />

          <Button shape="round" type="primary" icon="reload" style={{ float: "right" }} onClick={this.handleFetch} loading={isLoading} />
          <Button shape="round" type="primary" icon={resize ? "shrink" : "arrows-alt"} style={{ float: "right", marginRight: 5 }} onClick={this.handleResize} loading={isLoading} />

          <Download data={data} type={"report_configuration"} style={{ float: "right", marginRight: 5 }} loading={isLoading} />

          <Button shape="round" type="primary" icon="container" style={{ float: "right", marginRight: 5 }} onClick={() => this.handleClick(null)} loading={isLoading}>
            Create Configuration
          </Button>

          <DataTable isLoading={isLoading} resize={resize} rowKey="report_file" columns={columns(results, configuration)} data={results} click={this.handleClick} />
        </Container>
      </Page>
    );
  }
}

export default auth(ReportConfiguration);
