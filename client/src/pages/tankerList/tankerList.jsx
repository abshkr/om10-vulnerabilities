import React, { Component } from "react";

import { Page, Filter, DataTable, Download, Container } from "../../components";
import { Button, Modal, notification } from "antd";
import { tankerList } from "../../api";
import { search } from "../../utils";
import columns from "./columns";
import auth from "../../auth";
import Forms from "./forms";
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
    const { t } = this.props;

    Modal.info({
      title: !!object
        ? `${t("operations.editing")} (${object.tnkr_name} / ${
            object.tnkr_code
          })`
        : `${t("operations.create")}`,
      centered: true,
      width: "50vw",
      icon: !!object ? "edit" : "form",
      content: <Forms value={object} refresh={this.handleFetch} t={t} />,
      okButtonProps: {
        style: { display: "none" }
      }
    });
  };

  handleFetch = () => {
    const { t } = this.props;

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
          description: t("operations.create")
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
        page={t("pageMenu.schedules")}
        name={t("pageNames.tankerList")}
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
            {t("operations.create")}
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
