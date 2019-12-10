import styled from "styled-components";

const LoginContainer = styled.div`
  height: 100vh;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginModal = styled.div`
  height: 300px;
  width: 500px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.07);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;

  & .ant-form {
    width: 100%;
  }

  .login-button {
    width: 100%;
  }
`;

const LoginTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  color: #4c4c4c;
`;

export { LoginContainer, LoginModal, LoginTitle };
