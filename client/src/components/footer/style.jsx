import styled from 'styled-components';

const FooterContainer = styled.div`
  position: fixed;
  bottom: 10px;
  width: 100%;

  & span {
    font-weight: bold;
  }
`;

const StatusContainer = styled.div`
  position: fixed;
  right: 5px;
  display: flex;
  justify-content: space-between;
`;

export { StatusContainer, FooterContainer };
