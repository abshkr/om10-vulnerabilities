import styled from 'styled-components';

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  & span {
    font-weight: bold;
  }
`;

const StatusContainer = styled.div`
  position: fixed;
  right: 5px;
  bottom: 5px;
  display: flex;
  justify-content: space-between;
`;

export { StatusContainer, FooterContainer };
