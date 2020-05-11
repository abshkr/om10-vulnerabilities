import styled from 'styled-components';

const InterfaceContainer = styled.div`
  & .layout {
    min-height: 100vh;
  }

  .ant-layout-header {
    padding: 0px;
  }

  .ant-layout-content {
    padding: 10px;
  }
`;

export { InterfaceContainer };
