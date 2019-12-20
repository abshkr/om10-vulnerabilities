import styled from "styled-components";

const NavBarContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: none;

  & .ant-input {
    border: none;
  }

  .ant-input:hover {
    border: none;
  }

  .ant-input:focus {
    border: none;
    box-shadow: none;
  }

  .ant-avatar {
    cursor: pointer;
    transition: 0.5s all;
  }

  .ant-avatar:hover {
    background: #0055a5;
  }
`;

const UserContainer = styled.div`
  height: 50px;
  width: 45px;
  display: flex;
  align-items: center;
  margin-top: 0px;
  flex-direction: row-reverse;
`;

const SearchContainer = styled.div`
  position: absolute;
  height: 40vh;
  width: calc(100vw - 250px);
  top: 65px;
  left: 240px;
  background: white;
  padding: 0px;
  border-radius: 4px;
  box-shadow: 0 39px 68px rgba(15, 17, 51, 0.08);
  border: 1px solid ghostwhite;
`;

const SearchResults = styled.div`
  overflow: auto;
  word-wrap: break-word;
  line-height: 1.5;
`;

export { NavBarContainer, UserContainer, SearchContainer, SearchResults };
