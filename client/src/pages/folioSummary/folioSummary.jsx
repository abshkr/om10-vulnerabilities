import React, { Component } from "react";
import axios from "axios";
import columns from "./columns";
import auth from "../../utils/auth";
import Forms from "./forms";
import { search } from "../../utils";
import { folioSummary } from "../../api";
import { Button, Modal, notification } from "antd";
import { Page, Filter, DataTable, Container } from "../../components";

import "./folioSummary.css";

class FolioSummary extends Component {
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
      title: !!object ? `Editing ${object.closeout_nr}` : "Create",
      centered: true,
      width: "95%",
      icon: !!object ? "edit" : "form",
      content: <Forms payload={object} />,
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
      .all([folioSummary.readFolioSummary()])
      .then(
        axios.spread(folioSummary => {
          this.setState({
            isLoading: false,
            data: folioSummary.data.records
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

  handlePDS = () => {
    this.setState({
      isLoading: true
    });

    axios.all([folioSummary.createPDS()]).then(
      axios.spread(() => {
        notification.success({
          message: "Create PDS File",
          description: "PDS File Successfully created."
        });
        this.setState({
          isLoading: false
        });
      })
    );
  };

  handloeFolioClose = () => {
    this.setState({
      isLoading: true
    });

    axios.all([folioSummary.closeFolio()]).then(
      axios.spread(() => {
        notification.success({
          message: "Close First Frozen Folio",
          description: "Closed First Frozen Folio Successfully."
        });
        this.setState({
          isLoading: false
        });
      })
    );
  };

  componentDidMount() {
    this.handleFetch();
  }

  render() {
    const { data, isLoading, filtered, value, resize } = this.state;
    const { configuration } = this.props;
    const results = !!filtered ? filtered : data;
    return (
      <Page page={"Gantry"} name={"Folio Summary"} block={true}>
        <Container>
          <Filter value={value} search={this.handleSearch} loading={isLoading} />
          <Button shape="round" type="primary" icon="reload" style={{ float: "right", marginRight: 5 }} onClick={this.handleFetch} disabled={isLoading} />
          <Button shape="round" type="primary" style={{ float: "right", marginRight: 5 }} disabled={isLoading} onClick={this.handloeFolioClose}>
            Close First Frozen Folio
          </Button>
          <Button shape="round" type="primary" style={{ float: "right", marginRight: 5 }} disabled={isLoading} onClick={this.handlePDS}>
            Create PDS File
          </Button>
          <DataTable isLoading={isLoading} resize={resize} rowKey="closeout_nr" columns={columns(results, configuration)} data={results} click={this.handleClick} />
        </Container>
      </Page>
    );
  }
}

export default auth(FolioSummary);
