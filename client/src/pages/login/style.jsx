import styled from 'styled-components';

const LoginContainer = styled.div`
  height: 100vh;
  background-color: #fdfdfd;
  display: flex;
`;

const FormContainer = styled.div`
  width: 33.3%;
  border: 1px solid #e2eefb;
  background-color: white;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

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

const LoginTitle = styled.div`
  font-family: 'Bungee';
  font-size: 30px;
  margin-bottom: 10px;

  & span {
    color: #68a4ec;
  }
`;

const LoginSubtitle = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const LoginFooter = styled.div`
  position: fixed;
  bottom: 10px;
  width: inherit;
  padding-left: 20px;
  padding-right: 20px;
`;

const LoginFooterLogo = styled.div`
  filter: grayscale(80%);
  transform: scale(0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginLinks = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: space-around;
  padding-left: 20px;
  padding-right: 20px;
`;

const GraphicContainer = styled.div`
  width: 66.6%;
`;

const FormBlock = styled.div`
  width: 100%;
  padding-left: 15%;
  padding-right: 15%;
`;

export {
  LoginContainer,
  FormContainer,
  LoginHeader,
  LoginSubtitle,
  LoginFooter,
  LoginLinks,
  LoginFooterLogo,
  GraphicContainer,
  FormBlock,
  LoginTitle
};
