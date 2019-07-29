import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import columns from "./columns";
import { journal } from "../../../api";
import { search } from "../../../utils";
import { Calendar, DataTable, Download, Filter } from "../../../components";

export default class Historical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      start: moment()
        .subtract(1, "day")
        .format("YYYY-MM-DD h:mm"),
      end: moment().format("YYYY-MM-DD h:mm"),
      value: "",
      filtered: null,
      isLoading: false
    };
  }

  handleSearch = query => {
    const { value } = query.target;

    this.setState({
      filtered: search(value, this.state.data),
      value
    });
  };

  handleFetch = (start, end) => {
    this.setState({ isLoading: true });

    axios.all([journal.searchJournal(start, end)]).then(
      axios.spread(journal => {
        this.setState({
          data: journal.data.records,
          isLoading: false
        });
      })
    );
  };

  componentDidMount() {
    const { start, end } = this.state;

    this.handleFetch(start, end);
  }

  render() {
    const { start, end, value, data, filtered, isLoading } = this.state;
    const { config } = this.props;
    return (
      <div>
        <Filter value={value} search={this.handleSearch} />
        <Calendar start={start} end={end} change={this.handleFetch} style={{ marginLeft: 5 }} />
        <Download data={data} type={`journal_${start}-${end}`} style={{ float: "right" }} />
        <DataTable rowKey="seq" columns={columns(data, config)} data={!!filtered ? filtered : data} isLoading={isLoading} />
      </div>
    );
  }
}
