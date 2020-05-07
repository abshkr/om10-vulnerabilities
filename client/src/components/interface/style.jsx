import styled from 'styled-components';

const InterfaceContainer = styled.div`
  & .layout {
    min-height: 100vh;
  }

  .ant-layout-header {
    background-color: white;
    box-shadow: 0 0 40px 0 rgba(82, 63, 105, 0.1);
    padding-left: 0px;
    z-index: 1;
    height: 50px;
    position: fixed;
    width: 100%;
  }

  .ant-layout-content {
    padding-top: 65px;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export { InterfaceContainer };
