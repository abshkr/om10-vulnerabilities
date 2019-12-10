import styled from "styled-components";

const GlobalContainer = styled.body`
  font-family: "Rubik", sans-serif;
  margin: 0;
  background-color: #f9f7f7;
  font-weight: normal;

  & .layout {
    min-height: 100vh;
  }

  .header {
    background-color: white;
    padding: 5px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.07);
    z-index: 10;
    height: 50px;
  }

  .content {
    background-color: #f9f7f7;
  }

  .slider {
    background-color: #000e1c;
  }

  .ant-layout-sider-trigger {
    background: #00182f;
  }
`;

export { GlobalContainer };
