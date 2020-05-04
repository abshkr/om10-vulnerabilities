import styled from 'styled-components';

const DashboardContainer = styled.div`
  & .ant-card {
    box-shadow: 0 0 13px 0 rgba(82, 63, 105, 0.05);
  }

  & .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
    color: #0054a4;
  }
`;
export { DashboardContainer };
