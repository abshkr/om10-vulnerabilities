import React, { Component } from "react";
import axios from "axios";
import * as API from "../../../constants/api";
import moment from "moment";
import Generate from "../../../utils/generateOptions";
import Calendar from "../../../components/calendar";
import DataTable from "../../../components/table";
import Download from "../../../components/download";
import Search from "../../../utils/search";
import Filter from "../../../components/filter";

export default class HistoricalJournal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      start: moment()
        .subtract(1, "day")
        .format("YYYY-MM-DD h:mm"),
      end: moment().format("YYYY-MM-DD h:mm"),
      searchText: "",
      value: "",
      filtered: null,
      isLoading: true
    };
  }

  fetchHistoricalJournal(start, end) {
    this.setState({
      isLoading: true
    });
    axios.get(`https://${API.URL}/api/journal/search.php?start_date=${start}&end_date=${end}`).then(res => {
      this.setState({
        data: res.data.records,
        isLoading: false
      });
    });
  }

  onChange = dates => {
    const start = dates[0].format("YYYY-MM-DD HH:mm");
    const end = dates[1].format("YYYY-MM-DD HH:mm");
    this.fetchHistoricalJournal(end, start);
  };

  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  searchText = e => {
    const { value } = e.target;
    const filtered = Search(value, this.state.data);
    this.setState({ filtered, value });
  };

  componentDidMount() {
    const { start, end } = this.state;
    this.fetchHistoricalJournal(start, end);
  }

  render() {
    const { start, end, value, data, filtered, isLoading } = this.state;

    const columns = [
      {
        title: "Date/Time",
        dataIndex: "gen_date",
        key: "gen_date",
        width: 400,
        fixed: "left",
        render: text => moment(text.slice(0, -6)).format("DD/MM/YYYY h:mm:ss A")
      },
      {
        title: "Event",
        dataIndex: "msg_event",
        key: "msg_event",
        filters: Generate(data, "msg_event"),
        onFilter: (value, record) => record.msg_event.indexOf(value) === 0
      },
      {
        title: "Details",
        dataIndex: "message",
        key: "message"
      }
    ];

    return (
      <div>
        <Calendar start={start} end={end} change={this.onChange} />
        <Filter value={value} search={this.searchText} />
        <Download data={data} type={`journal_${start}-${end}`} style={{ float: "right" }} />
        <DataTable
          rowKey="seq"
          columns={columns}
          data={!!filtered ? filtered : data}
          isLoading={isLoading}
          offset={0}
          scroll={300}
        />
      </div>
    );
  }
}
