import styled from 'styled-components';
import { SETTINGS } from '../../constants';

const InterfaceContainer = styled.div`
  & .ant-layout {
    background: ${false
      ? '#f0f2f5'
      : 'background: linear-gradient(0deg, rgba(237, 239, 241, 1) 17%, rgba(207, 235, 246, 1) 100%);'} !important;
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
