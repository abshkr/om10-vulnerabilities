import styled from 'styled-components';

export const TankViewContainer = styled.div`
  .apexcharts-canvas {
    background-image: url(${(props) => props.img});
    background-attachment: relative;
    background-repeat: no-repeat;
    background-position: center bottom;
  }
`;
