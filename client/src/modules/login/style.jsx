import styled from "styled-components";

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row-reverse;
`;

const LoginView = styled.div`
  background: linear-gradient(90deg, #0055a5 0%, #000851 100%);
  width: 66.66vw;

  & p {
    font-weight: bold;
    padding-left: 5px;
    padding-top: 5px;
    color: white;
  }
`;

const LoginModal = styled.div`
  height: 100vh;
  width: 33.33vw;
  background-color: white;

  padding: 20px;
  display: flex;
  align-items: center;
  align-content: space-between;

  & .ant-form {
    width: 100%;
  }

  .login-button {
    width: 100%;
  }
`;

const LoginTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #0055a5;
`;

const ForgotPasswordTitle = styled.div`
  color: #0055a5;
  width: 100%;
  text-align: center;
  margin-top: 5vh;
  transition: 0.3s all;
  font-weight: bold;

  &:hover {
    color: #2f9aff;
  }

  span {
    cursor: pointer;
  }
`;

export {
  LoginContainer,
  LoginModal,
  LoginTitle,
  ForgotPasswordTitle,
  LoginView
};
