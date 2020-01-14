import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fdfdfd;
`;

const FormContainer = styled.div`
  width: 500px;
  border-radius: 4px;
  box-shadow: 0 39px 68px rgba(15, 17, 51, 0.08);
  padding: 15px;
  border: 1px solid #e2eefb;
  background-color: white;

  & .ant-btn-primary {
    margin-top: 10px;
    width: 100%;
  }
`;

const LoginHeader = styled.div`
  font-size: 40px;
  font-weight: bolder;
  text-align: center;
  color: #68a4ec;

  & span {
    font-size: 13px;
  }
`;

const LoginSubtitle = styled.div`
  font-size: 13px;
  text-align: center;
  margin-bottom: 10px;
`;

const LoginFooter = styled.div`
  position: fixed;
  bottom: 30px;
  width: 150px;
`;

const LoginIcons = styled.div`
  font-size: 24px;
  display: flex;
  justify-content: space-around;
  color: #ababab;
  transition-duration: 0.5s all;

  & :hover {
    color: #68a4ec;
  }
`;

export { LoginContainer, FormContainer, LoginHeader, LoginSubtitle, LoginFooter, LoginIcons };
