import styled from 'styled-components';

export const TankContainer = styled.div`
  .apexcharts-canvas {
    background-image: url(${(props) => props?.img || ''});
    background-attachment: relative;
    background-repeat: no-repeat;
    background-position: center bottom;
  }

  .ant-badge-status-processing {
    background-color: #c4371a !important;
  }

  .ant-badge-status-processing::after {
    border-color: #c4371a !important;
  }

  .ant-card-body {
    display: flex !important;
    justify-content: center !important;
  }
`;
