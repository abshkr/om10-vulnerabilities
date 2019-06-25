import React, { Component } from "react";

import axios from "axios";
import Forms from "./forms";
import columns from "./columns";
import auth from "../../utils/auth";
import search from "../../utils/search";
import { logicalPrinters } from "../../api";
import { Button, Modal, notification } from "antd";
import { Page, Filter, DataTable, Download, Container } from "../../components";

class LogicalPrinters extends Component {
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
      title: !!object ? `Editing (${object.prt_printer})` : "Create",
      centered: true,
      icon: !!object ? "edit" : "form",
      width: 720,
      content: <Forms refresh={this.getLogicalPrinters} value={object} />,
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

  getLogicalPrinters = () => {
    this.setState({
      isLoading: true
    });

    axios
      .all([logicalPrinters.readLogicalPrinters()])
      .then(
        axios.spread(printers => {
          this.setState({
            isLoading: false,
            data: printers.data.records
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
    this.getLogicalPrinters();
  }

  render() {
    const { data, isLoading, filtered, value, resize } = this.state;
    const { configuration } = this.props;
    const results = !!filtered ? filtered : data;
    return (
      <Page page={"Printer Configuration"} name={"Logical Printers"} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} loading={isLoading} />
          <Button shape="round" type="primary" icon={resize ? "shrink" : "arrows-alt"} style={{ float: "right" }} onClick={this.handleResize} disabled={isLoading} />
          <Download data={data} type={"logical_printers"} style={{ float: "right", marginRight: 5 }} loading={isLoading} />
          <Button shape="round" type="primary" style={{ float: "right", marginRight: 5 }} onClick={() => this.handleClick(null)} disabled={isLoading}>
            Create Printer
          </Button>

          <DataTable data={results} resize={resize} rowKey="category_code" isLoading={isLoading} click={this.handleClick} columns={columns(results, configuration)} />
        </Container>
      </Page>
    );
  }
}

export default auth(LogicalPrinters);
