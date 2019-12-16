import React, { Component } from 'react';

import { Button, Tabs, Modal, Spin, Icon, Select } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { Page, Search, Download } from '../../components';
import { search } from '../../utils/';
import { tanks } from '../../api';

import columns from './columns';
import auth from '../../auth';

import Summary from './summary';
import Forms from './forms';
import Tanks from './tanks';

import './tank-view.css';

class TankView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: '',
      isLoading: true,
      sorter: 'tank_code',
      order: 'asc',
    };
  }

  handleClick = object => {
    const { configuration, t } = this.props;
    const { data } = this.state;

    const defaults = object ? object.defaults : null;

    Modal.info({
      title: object ? (
        <div className="tank-modal-title">
          Editing {defaults.tank_code} / {defaults.tank_name}{' '}
        </div>
      ) : (
        'Create'
      ),
      centered: true,
      icon: object ? 'edit' : 'form',
      width: '40vw',
      content: (
        <Forms
          value={defaults}
          refresh={this.handleFetch}
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
      value,
    });
  };

  handleFetch = () => {
    const { sorter, order } = this.state;

    axios.all([tanks.readTanks()]).then(
      axios.spread(tanks => {
        this.setState({
          data: _.orderBy(tanks.data.records, [sorter], [order]),
          isLoading: false,
        });
      }),
    );
  };

  handleSorting = value => {
    this.setState({
      sorter: value,
      isLoading: true,
    });
  };

  handleSortOrder = value => {
    this.setState({
      order: value,
      isLoading: true,
    });
  };

  componentDidMount() {
    this.handleFetch();
    this.liveUpdate = setInterval(this.handleFetch, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.liveUpdate);
  }

  render() {
    const { data, value, isLoading, products, sorter, order } = this.state;
    const { configuration, t } = this.props;

    const results = search(value, data);

    return (
      <Page page="Operations" name="Tank View">
        <Spin
          spinning={isLoading}
          indicator={<Icon type="loading" style={{ fontSize: 24, color: '#68a4ec' }} spin />}
        >
          <Search value={value} search={this.handleSearch} />

          <Select
            value={sorter}
            style={{ width: 190, marginRight: 5 }}
            onChange={this.handleSorting}
          >
            <Select.Option value="tank_base_name">Sort By Product Name</Select.Option>
            <Select.Option value="tank_group">Sort By Group</Select.Option>
            <Select.Option value="tank_name">Sort By Tank Name</Select.Option>
            <Select.Option value="tank_code">Sort By Tank Code</Select.Option>
            <Select.Option value="tank_status_name">Sort By Tank Status</Select.Option>
          </Select>

          <Select value={order} style={{ width: 190 }} onChange={this.handleSortOrder}>
            <Select.Option value="asc">Order By Ascending</Select.Option>
            <Select.Option value="desc">Order By Descending</Select.Option>
          </Select>

          <Download data={results} columns={columns} type="Tank View" style={{ float: 'right' }} />

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
              <Tanks
                results={results}
                products={products}
                configuration={configuration}
                handleClick={this.handleClick}
              />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Summary" key="2" forceRender={true}>
              <Summary data={results} t={t} />
            </Tabs.TabPane>
          </Tabs>
        </Spin>
      </Page>
    );
  }
}

export default auth(TankView);
