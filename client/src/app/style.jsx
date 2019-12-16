import styled from 'styled-components';

const GlobalContainer = styled.div`
  font-family: 'Rubik', sans-serif;
  margin: 0;
  background-color: #f9f7f7;
  font-weight: normal;

  & .layout {
    min-height: 100vh;
  }

  .header {
    background-color: white;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.07);
    padding-left: 10px;
    padding-right: 10px;
    z-index: 10;
    height: 50px;
  }

  .content {
    background-color: #f9f7f7;
    padding: 10px;
  }

  .slider {
    background-color: #000e1c;
  }

  .ant-layout-sider-trigger {
    background: #00182f;
  }
`;

export { GlobalContainer };
