import React, { Component } from "react";
import auth from "../../auth";
import Forms from "./forms";
import { Page, Download, Container, DataTable, Filter } from "../../components";
import { Button, Modal } from "antd";
import axios from "axios";
import search from "../../utils/search";
import { area } from "../../api";
import generate from "../../utils/generateOptions";

import "./area.css";

class Area extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      resize: false,
      value: ""
    };
  }

  handleClick = (object, data) => {
    Modal.info({
      title: !!object ? `Editing (${object.area_k} / ${object.area_name})` : "Create",
      centered: true,
      icon: !!object ? "edit" : "form",
      width: 720,
      content: <Forms refresh={this.getData} value={object} data={data} />,
      okButtonProps: {
        style: { display: "none" }
      }
    });
  };

  handleResize = () => {
    const { resize } = this.state;
    this.setState({
      resize: !resize
    });
  };

  getData = () => {
    this.setState({ isLoading: true });
    axios.all([area.readArea()]).then(
      axios.spread(area => {
        this.setState({
          isLoading: false,
          data: area.data.records
        });
      })
    );
  };

  searchObjects = query => {
    const { value } = query.target;
    // console.log(value);
    this.setState({
      filtered: search(value, this.state.data),
      value
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { isLoading, data, filtered, resize } = this.state;
    const results = !!filtered ? filtered : data;

    const columns = data => [
      {
        title: "Area ID",
        dataIndex: "area_k",
        key: "area_k",
        sorter: (a, b) => a.area_k - b.area_k
      },
      {
        title: "Area Name",
        dataIndex: "area_name",
        key: "area_name",
        sorter: (a, b) => {
          return a.area_name.localeCompare(b.area_name);
        },
        filters: generate(data, "area_name"),
        onFilter: (value, record) => record.area_name.indexOf(value) === 0
      }
    ];

    return (
      <Page page={"Access Control"} name={"Area"} isLoading={isLoading} block={true}>
        <Container>
          <Filter value={this.state.value} search={this.searchObjects} />
          <Button
            shape="round"
            type="primary"
            icon={resize ? "shrink" : "arrows-alt"}
            style={{ float: "right" }}
            onClick={this.handleResize}
            disabled={isLoading}
          />
          <Download data={data} type={"Area"} style={{ float: "right", marginRight: 5 }} />
          <Button
            shape="round"
            type="primary"
            icon="environment"
            style={{ float: "right", marginRight: 5 }}
            onClick={() => this.handleClick(null, results)}
            disabled={isLoading}
          >
            Create Area
          </Button>
          <DataTable
            columns={columns(results)}
            resize={resize}
            data={results}
            isLoading={isLoading}
            click={this.handleClick}
            scroll={300}
          />
        </Container>
      </Page>
    );
  }
}

export default auth(Area);
