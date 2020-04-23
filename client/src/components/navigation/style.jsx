import styled from 'styled-components';

const MenuContainer = styled.div`
  & .ant-menu-item .anticon + span,
  .ant-menu-submenu-title .anticon + span {
    margin-left: 10px;
    font-weight: 500;
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
