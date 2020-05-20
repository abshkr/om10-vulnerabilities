import styled from 'styled-components';
import { SETTINGS } from '../../constants';

const InterfaceContainer = styled.div`
  & .ant-layout {
    background: rgb(95, 126, 152);
    background: linear-gradient(250deg, rgba(95, 126, 152, 1) 0%, rgba(168, 181, 189, 1) 100%);
  }

  & .layout {
    min-height: 100vh;
  }

  .ant-layout-header {
    height: 50px !important;
    padding: 0px;
  }

  .ant-layout-content {
    padding: 10px;
  }
`;

export { InterfaceContainer };
