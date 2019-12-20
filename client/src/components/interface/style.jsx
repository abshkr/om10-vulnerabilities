import styled from "styled-components";

const InterfaceContainer = styled.div`
  & .layout {
    min-height: 100vh;
  }

  .header {
    background-color: white;
    box-shadow: 0 4px 5px rgba(15, 17, 51, 0.08);
    padding-left: 0px;
    padding-right: 10px;
    z-index: 10;
    height: 50px;
  }

  .content {
    background-color: white;
    padding-top: 10px;
    padding-left: 5px;
    padding-right: 5px;
  }
`;

export { InterfaceContainer };
