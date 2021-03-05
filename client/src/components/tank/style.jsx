import styled from 'styled-components';

const levelStatusColour = {
  success: '#50c878',
  error: '#c85064',
  default: '#d9d9d9',
};

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
    transition: 0.5s all;
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

export const TankLevel = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

export const WaterLevel = styled.div`
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

export const TankIndicator = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  transition: 0.5s all;

  background-color: ${(props) => levelStatusColour[props?.status]};
`;

export const IndicatorContainer = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 4px;
  }
`;
