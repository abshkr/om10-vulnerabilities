import React, { Component } from "react";
import axios from "axios";
import { search } from "../../../utils";
import { journal } from "../../../api";
import { Filter, DataTable, Download } from "../../../components";
import columns from "./columns";

export default class Live extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: "",
      isLoading: true
    };
  }

  handleFetch = () => {
    axios.all([journal.readJournal()]).then(
      axios.spread(journal => {
        this.setState({
          data: journal.data.records
        });
      })
    );
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

    this.setState({
      interval: setInterval(() => {
        this.handleFetch();
      }, 1000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    const { data, filtered, value } = this.state;
    const { config } = this.props;
    const results = !!filtered ? filtered : data;
    return (
      <div>
        <Filter value={value} search={this.handleSearch} loading={false} />
        <Download data={data} type={"base_products"} style={{ float: "right" }} loading={false} />
        <DataTable isLoading={false} rowKey="seq" columns={columns(results, config)} data={results} />
      </div>
    );
  }
}
