import styled from 'styled-components';

const DashboardContainer = styled.div`
  .ant-card-head {
    background: #a9bfd2;
  }

  .ant-card-head-title {
    font-size: 24px;
    color: black;
  }

  .ant-statistic-content {
    font-size: 20px;
  }

  .ant-descriptions-bordered .ant-descriptions-view {
    font-size: 20px;
    color: black;
  }

  .ant-descriptions-bordered.ant-descriptions-small .ant-descriptions-item-label,
  .ant-descriptions-bordered.ant-descriptions-small .ant-descriptions-item-content {
    font-size: 20px;
    color: black;
    font-weight: 500 !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    border-color: #bdc3c700 !important;
  }

  .ant-descriptions-bordered .ant-descriptions-item-label {
    font-weight: normal !important;
    background: #bdc3c700;
  }

  .ant-descriptions-bordered .ant-descriptions-view {
    border-color: #bdc3c700 !important;
  }

  .ant-descriptions-bordered .ant-descriptions-row {
    border-color: #f0f0f0 !important;
  }
`;

export { DashboardContainer };
