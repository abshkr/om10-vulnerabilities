import styled from "styled-components";

const MenuContainer = styled.div`
  .ant-menu-item {
    display: flex;
    align-items: center;
  }

  .ant-menu-vertical .ant-menu-item,
  .ant-menu-vertical-left .ant-menu-item,
  .ant-menu-vertical-right .ant-menu-item,
  .ant-menu-inline .ant-menu-item,
  .ant-menu-vertical .ant-menu-submenu-title,
  .ant-menu-vertical-left .ant-menu-submenu-title,
  .ant-menu-vertical-right .ant-menu-submenu-title,
  .ant-menu-inline .ant-menu-submenu-title {
    font-size: 13px;
    font-weight: 600;
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
