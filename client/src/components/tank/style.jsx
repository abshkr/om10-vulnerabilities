import styled from 'styled-components';

export const TankContainer = styled.div`
  .ant-badge-status-processing {
    background-color: #c4371a !important;
  }

  .ant-badge-status-processing::after {
    border-color: #c4371a !important;
  }

  .ant-card-body {
    display: flex !important;
    justify-content: center !important;
    height: 300px;
    width: 100%;
    background: ${(props) => (props?.critical ? 'rgba(236,110,104, 0.3)' : props?.status?.colour)};
  }
`;

export const TankWidget = styled.div`
  width: 410px;
  height: 300px;
  transition: all 0.3s;
  border: 1px solid #538aef36;
  position: relative;
  flex-grow: 1;
  margin: 5px;
  border-radius: 4px;
  box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 0.082);

  .ant-badge-status-processing {
    background-color: #c4371a !important;
  }

  .ant-badge-status-processing::after {
    border-color: #c4371a !important;
  }
`;

export const TankChart = styled.div`
  position: absolute;
  z-index: 1;
  width: 410px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const TankImage = styled.div`
  position: absolute;
  z-index: 0;
  width: 410px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-items: center;
  justify-content: center;
`;

export const TankIndicators = styled.div`
  position: absolute;
  ${(props) => (props.position === 'left' ? 'left: 20px' : 'right: 20px')};
  top: ${(props) => props.height}px;
  display: flex;
  flex-direction: column;
`;

export const TankVolume = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  font-weight: bold;
`;
