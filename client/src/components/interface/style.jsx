import styled from 'styled-components';

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
    padding-top: 15px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .ant-layout-footer {
    height: 45px;
    padding-top: 8px;
    dispaly: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: none;
  }
`;

export { InterfaceContainer };
