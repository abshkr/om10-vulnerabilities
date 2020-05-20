import styled from 'styled-components';

const MenuContainer = styled.div`
  & .ant-menu-item .anticon + span,
  .ant-menu-submenu-title .anticon + span {
    margin-left: 10px;
    font-weight: 500;
  }

  .ant-menu-inline-collapsed > .ant-menu-item .anticon,
  .ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-item .anticon,
  .ant-menu-inline-collapsed
    > .ant-menu-item-group
    > .ant-menu-item-group-list
    > .ant-menu-submenu
    > .ant-menu-submenu-title
    .anticon,
  .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title .anticon {
    line-height: 0px !important;
    font-size: 64px !important;
  }

  .ant-menu-inline-collapsed > .ant-menu-item,
  .ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-item,
  .ant-menu-inline-collapsed
    > .ant-menu-item-group
    > .ant-menu-item-group-list
    > .ant-menu-submenu
    > .ant-menu-submenu-title,
  .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
    padding: 5px 25px !important;
  }

  .ant-menu-inline-collapsed > .ant-menu-item,
  .ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-item,
  .ant-menu-inline-collapsed
    > .ant-menu-item-group
    > .ant-menu-item-group-list
    > .ant-menu-submenu
    > .ant-menu-submenu-title,
  .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
    height: 80px;
  }

  .ant-menu-item .anticon,
  .ant-menu-submenu-title .anticon {
    font-size: 45px;
    vertical-align: middle;
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
