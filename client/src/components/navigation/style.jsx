import styled from "styled-components";

const MenuContainer = styled.div`
  .ant-menu-dark,
  .ant-menu-dark .ant-menu-sub {
    font-weight: bold;
  }

  .ant-menu-item {
    display: flex;
    align-items: center;
  }

  .ant-menu-dark .ant-menu-item-selected .anticon + span {
    font-weight: bold;
  }
`;

const LogoContainer = styled.div`
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  & img {
    margin-top: 3px;
    transform: scale(0.12);
  }
`;

export { LogoContainer, MenuContainer };
