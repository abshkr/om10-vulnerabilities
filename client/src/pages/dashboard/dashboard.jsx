import React, { Component } from "react";
import auth from "../../auth";
import { Page, Navigation } from "../../components";
import { Layout, Menu, Breadcrumb, Icon, PageHeader, Input } from "antd";
import "./dashboard.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const routes = [
  {
    path: "index",
    breadcrumbName: "First-level Menu"
  },
  {
    path: "first",
    breadcrumbName: "Second-level Menu"
  },
  {
    path: "second",
    breadcrumbName: "Third-level Menu"
  }
];

class Dashboard extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({
      collapsed
    });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" style={{ marginBottom: 60 }} />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <div className="search" style={{ background: "#fff", padding: 10, height: 60, paddingLeft: 40 }}>
            <Icon type="search" />
            <Input placeholder="Type to Search" size="large" onSearch={value => console.log(value)} style={{ width: "50%" }} />
          </div>
          <Content style={{ margin: "0 16px" }}>
            <PageHeader title="Dashboard" breadcrumb={{ routes }} />
            <Page page={"Dashboard"} isLoading={false} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default auth(Dashboard);
