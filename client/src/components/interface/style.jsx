import styled from 'styled-components';
import { SETTINGS } from '../../constants';

const InterfaceContainer = styled.div`
  & .ant-layout {
    background: ${SETTINGS.IS_DEVELOPMENT ? '#f0f2f5' : '#75a9f9'} !important;
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
