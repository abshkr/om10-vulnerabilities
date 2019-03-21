import React, { Component } from "react";
import auth from "../../utils/auth";
import Page from "../../components/page";
import Filter from "../../components/filter";
import Table from "./table";
import axios from "axios";
import Container from "../../components/container";
import Search from "../../utils/search";

class IdAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: null,
      filtered: null,
      isLoading: true
    };
  }

  fetchIdAssignments = () => {
    axios.get(`https://10.1.10.66/api/idassignment/read.php`).then(response => {
      const data = response.data.records;
      this.setState({
        data: data,
        isLoading: false
      });
    });
  };

  searchObjects = query => {
    const { value } = query.target;
    const filtered = Search(value, this.state.data);
    this.setState({ filtered, value });
  };

  searchTrigger = value => {
    const filtered = Search(value, this.state.data);
    this.setState({ filtered, value });
  };

  componentDidMount() {
    this.fetchIdAssignments();
  }

  render() {
    const { data, isLoading, filtered, value } = this.state;

    return (
      <Page page={"Access Control"} name={"ID Assignment"} isLoading={isLoading} block={true}>
        <Container>
          <Filter value={value} search={this.searchObjects} />
          <Table
            data={!!filtered ? filtered : data}
            update={this.fetchIdAssignments}
            search={this.searchTrigger}
            type="personnel"
          />
        </Container>
      </Page>
    );
  }
}

export default auth(IdAssignment);
