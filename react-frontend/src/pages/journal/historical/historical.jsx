import React, { Component } from "react";
import axios from "axios";
import * as API from "../../../constants/api";
import { Button, Input, Icon } from "antd";
import moment from "moment";
import Generate from "../../../utils/generateOptions";
import Calendar from "../../../components/calendar";
import DataTable from "../../../components/table";
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
      filtered: null
    };
  }

  fetchHistoricalJournal(start, end) {
    axios.get(`https://${API.URL}/api/journal/search.php?start_date=${start}&end_date=${end}`).then(res => {
      this.setState({
        data: res.data.records
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
    const { start, end, value, data, filtered } = this.state;

    const columns = [
      {
        title: "Date/Time",
        dataIndex: "gen_date",
        key: "gen_date"
      },
      {
        title: "Event",
        dataIndex: "msg_event",
        key: "msg_event",
        filters: Generate(this.state.data, "msg_event"),
        onFilter: (value, record) => record.msg_event.indexOf(value) === 0
      },
      {
        title: "Details",
        dataIndex: "message",
        key: "message",
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder="Search Nessage"
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={this.handleSearch(selectedKeys, confirm)}
            />
            <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>
              Search
            </Button>
            <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
          </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? "#108ee9" : "#aaa" }} />,
        onFilter: (value, record) => record.message.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            });
          }
        },
        render: text => {
          const { searchText } = this.state;
          return searchText ? (
            <span>
              {text.split(new RegExp(`(${searchText})`, "gi")).map((fragment, i) =>
                fragment.toLowerCase() === searchText.toLowerCase() ? (
                  <span key={i} className="highlight">
                    {fragment}
                  </span>
                ) : (
                  fragment
                )
              )}
            </span>
          ) : (
            text
          );
        }
      }
    ];

    return (
      <div>
        <Calendar start={start} end={end} change={this.onChange} />
        <Filter value={value} search={this.searchText} />
        <DataTable rowKey="seq" columns={columns} data={!!filtered ? filtered : data} />
      </div>
    );
  }
}
