import React, { Component } from "react";

import axios from "axios";
import columns from "./columns";
import Forms from "./forms";
import auth from "../../utils/auth";
import search from "../../utils/search";
import { physicalPrinters } from "../../api";
import { Button, Modal, notification } from "antd";
import { Page, Filter, DataTable, Download, Container } from "../../components";

class PhysicalPrinters extends Component {
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
      content: <Forms refresh={this.getPhysicalPrinters} value={object} />,
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

  getPhysicalPrinters = () => {
    this.setState({
      isLoading: true
    });

    axios
      .all([physicalPrinters.readPhysicalPrinters()])
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
    this.getPhysicalPrinters();
  }

  render() {
    const { data, isLoading, filtered, value, resize } = this.state;
    const { configuration } = this.props;
    const results = !!filtered ? filtered : data;
    return (
      <Page page={"Printer Configuration"} name={"Physical Printers"} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} loading={isLoading} />
          <Button shape="round" type="primary" icon={resize ? "shrink" : "arrows-alt"} style={{ float: "right" }} onClick={this.handleResize} disabled={isLoading} />
          <Download data={data} type={"physical_printers"} style={{ float: "right", marginRight: 5 }} loading={isLoading} />
          <Button shape="round" type="primary" style={{ float: "right", marginRight: 5 }} onClick={() => this.handleClick(null)} disabled={isLoading}>
            Create Printer
          </Button>

          <DataTable data={results} resize={resize} rowKey="category_code" isLoading={isLoading} click={this.handleClick} columns={columns(results, configuration)} />
        </Container>
      </Page>
    );
  }
}

export default auth(PhysicalPrinters);
