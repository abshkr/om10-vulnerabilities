import styled from 'styled-components';

const NavBarContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e3ebf6;
  & .ant-input-affix-wrapper {
    border: none;
  }

  .ant-input-affix-wrapper {
    border: none;
  }

  .ant-input-affix-wrapper {
    border: none;
    box-shadow: none;
  }
`;

const SearchContainer = styled.div`
  position: absolute;
  height: 40vh;
  width: 50%;
  top: 65px;
  background: white;
  padding: 0px;
  border-radius: 4px;
  box-shadow: 0 39px 68px rgba(15, 17, 51, 0.08);
  border: 1px solid ghostwhite;
  margin-left: 10px;
`;

const SearchResults = styled.div`
  overflow: auto;
  word-wrap: break-word;
  line-height: 1.5;
`;

const NavExtras = styled.div`
  position: fixed;
  right: 15px;
  top: -3px;

  & .anticon {
    color: #0054a4;
    font-size: 25px;
  }
`;

export { NavBarContainer, SearchContainer, SearchResults, NavExtras };
