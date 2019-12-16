import styled from 'styled-components';

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
  height: 300px;
  width: 30vw;
  top: 60px;
  left: 110px;
  background: white;
  padding: 0px;
  border-radius: 4px;
  opacity: ${props => props.opacity};
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.07);
`;

const SearchResults = styled.div`
  overflow: auto;
  word-wrap: break-word;
  line-height: 1.5;
`;

export { NavBarContainer, UserContainer, SearchContainer, SearchResults };
