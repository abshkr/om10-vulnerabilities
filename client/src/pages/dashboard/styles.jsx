import styled from 'styled-components';

const DashboardContainer = styled.div`
  margin-top: 10px;

  .ant-card-head {
    background: #a9bfd2;
  }

  .ant-card-head-title {
    font-size: 24px;
    color: black;
  }

  .statistic td {
    font-size: 20px;
    color: black;
    font-weight: 500;
  }

  .statistic .first {
    border-bottom: 1px solid #f0f0f0;
  }
`;

export { DashboardContainer };
