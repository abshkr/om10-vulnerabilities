import React, { Component } from 'react';

import { Page, Container, Search, Download } from '../../components';
import { tanks, baseProducts } from '../../api';
import { Button, Tabs, Modal } from 'antd';
import { search } from '../../utils/';
import auth from '../../auth';
import Summary from './summary';
import columns from './columns';
import Forms from './forms';
import Tanks from './tanks';
import axios from 'axios';

import _ from 'lodash';

import './tankView.css';

class TankView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: '',
      isLoading: false,
      products: [],
    };
  }

  handleClick = object => {
    const { configuration, t } = this.props;
    const { data, products } = this.state;

    const defaults = object ? object.defaults : null;

    Modal.info({
      title: !!object ? `Editing (${defaults.tank_code} / ${defaults.tank_name})` : 'Create',
      centered: true,
      icon: !!object ? 'edit' : 'form',
      width: object ? '90vw' : '40vw',
      content: (
        <Forms
          value={defaults}
          refresh={this.handleFetch}
          products={products}
          profile={configuration}
          t={t}
          data={data}
          tank={object}
        />
      ),
      okButtonProps: {
        style: { display: 'none' },
      },
    });
  };

  handleSearch = value => {
    this.setState({
      filtered: search(value, this.state.data),
      value,
    });
  };

  handleFetch = () => {
    const { data } = this.state;

    axios.all([tanks.readTanks(), baseProducts.readBaseProduct()]).then(
      axios.spread((tanks, products) => {
        if (!_.isEqual(tanks.data.records, data)) {
          this.setState({
            data: tanks.data.records,
            products: products.data.records,
          });
        }
      }),
    );
  };

  componentDidMount() {
    this.handleFetch();

    this.liveUpdate = setInterval(this.handleFetch, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.liveUpdate);
  }

  render() {
    const { data, filtered, value, isLoading, products } = this.state;
    const { configuration, t } = this.props;

    const results = !!filtered ? filtered : data;

    return (
      <Page page="Operations" name="Tank View" isLoading={isLoading} block>
        <Container>
          <Search value={value} search={this.handleSearch} />

          <Download
            data={results}
            columns={columns}
            type="Tank View"
            style={{ float: 'right', marginRight: 5 }}
          />

          <Button
            shape="round"
            icon="setting"
            type="primary"
            style={{ float: 'right', marginRight: 5 }}
            onClick={() => this.handleClick(null)}
          >
            Add Tank
          </Button>

          <Tabs defaultActiveKey="1" animated={false}>
            <Tabs.TabPane tab="Tank View" key="1" style={{ padding: 5 }} forceRender={true}>
              {!isLoading && (
                <Tanks
                  results={results}
                  products={products}
                  configuration={configuration}
                  handleClick={this.handleClick}
                />
              )}
            </Tabs.TabPane>

            <Tabs.TabPane tab="Summary" key="2" forceRender={true}>
              <Summary data={results} t={t} />
            </Tabs.TabPane>
          </Tabs>
        </Container>
      </Page>
    );
  }
}

export default auth(TankView);
