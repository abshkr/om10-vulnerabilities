import styled from 'styled-components';

const OverviewContainer = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  height: 100%
  overflow-y: auto;
`;

const Container = styled.div`
  width: 50%;
  display: flex;
  justify-content: ${(props) => (props.centered ? 'center' : null)};
  align-content: center;
  align-items: center;
`;

export { OverviewContainer, Container };
