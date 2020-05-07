import styled from 'styled-components';

const DashboardContainer = styled.div`
  & .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
    color: #0054a4;
  }

  .ant-card {
    border: 1px solid #0054a43b;
  }

  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
    background: #0054a4;
    color: white;
  }

  .ant-statistic-content {
    font-weight: bold;
    font-size: 36px;
  }

  .ant-card-head {
    background: #fafafa;
    color: rgb(0, 84, 164);
  }
`;
export { DashboardContainer };
