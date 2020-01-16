import styled from 'styled-components';

const WorkInProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const IconContainer = styled.div`
  text-align: center;

  & h1 {
    font-weight: bold;
  }
`;

export { WorkInProgressContainer, IconContainer };
