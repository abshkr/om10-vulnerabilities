import styled from "styled-components";

const RootContainer = styled.div`
  height: 100vh;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & .loading {
    font-size: 24px;
    color: #0055a5;
  }
`;

export { RootContainer };
