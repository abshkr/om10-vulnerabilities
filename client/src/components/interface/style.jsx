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
    padding: 0 10px 10px 10px;
  }

  .ant-layout-footer {
    height: 30px;
    padding: 12px 5px 10px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    background: #a9bfd2;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12),
      0 5px 12px 4px rgba(0, 0, 0, 0.09);

    border: 1px solid #0054a400 !important;
  }

  .navigation-slider::-webkit-scrollbar {
    display: none;
  }
`;

export { InterfaceContainer };
