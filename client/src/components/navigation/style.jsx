import styled from 'styled-components';

const MenuContainer = styled.div`
  .ant-menu-inline-collapsed > .ant-menu-item .anticon,
  .ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-item .anticon,
  .ant-menu-inline-collapsed
    > .ant-menu-item-group
    > .ant-menu-item-group-list
    > .ant-menu-submenu
    > .ant-menu-submenu-title
    .anticon,
  .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title .anticon {
    font-size: 19px !important;
    margin-left: -5px;
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
