import React, { Component } from "react";
import auth from "../../utils/auth";
import Page from "../../components/page";
import Filters from "./filters";
import axios from "axios";
import DataTable from "../../components/table";
import columns from "./columns";
import Container from "../../components/container";
import Download from "../../components/download";
import "./metering.css";

class Metering extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      mass: "kg",
      volume: "litre",
      filteredInfo: null,
      isLoading: true
    };
  }

  setVolume = volume => {
    this.setState({ isLoading: true });
    axios
      .get(`https://10.1.10.66/api/metering/read.php?mass_unit=${this.state.mass}&vol_unit=${volume}`)
      .then(res => {
        this.setState({
          data: res.data.records,
          volume,
          isLoading: false
        });
      });
  };

  setMass = mass => {
    this.setState({ isLoading: true });
    axios
      .get(`https://10.1.10.66/api/metering/read.php?mass_unit=${mass}&vol_unit=${this.state.volume}`)
      .then(res => {
        this.setState({
          data: res.data.records,
          mass,
          isLoading: false
        });
      });
  };

  fetchData = () => {
    this.setState({ isLoading: true });
    axios.get(`https://10.1.10.66/api/metering/read.php?mass_unit=kg&vol_unit=litre`).then(res => {
      this.setState({ data: res.data.records, isLoading: false });
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { isLoading, data } = this.state;

    return (
      <Page page={"Stock Management"} name={"Metering"} isLoading={isLoading} block={true}>
        <Container>
          <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
            <Filters setVolume={this.setVolume} setMass={this.setMass} />
            <Download data={data} type={"Metering"} />
          </div>
          <DataTable
            rowKey="metercode"
            columns={columns(data)}
            data={data}
            loading={true}
            scroll={300}
            click={this.showEdit}
          />
        </Container>
      </Page>
    );
  }
}

export default auth(Metering);
