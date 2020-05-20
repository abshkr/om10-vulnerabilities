import styled from 'styled-components';

const LoginContainer = styled.div`
  height: 100vh;
  background-color: #0054a4;
  display: flex;

  .ant-input::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #838383 !important;
    opacity: 1 !important;
  }
`;

const FormContainer = styled.div`
  width: 33.3vw;
  border: 1px solid #e2eefb;
  background-color: #a9bfd2;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & .ant-btn-primary {
    margin-top: 10px;
    width: 100%;
  }

  & .ant-input-affix-wrapper > input.ant-input {
    font-weight: 500;
    color: black !important;
  }
`;

const LoginHeader = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #040d17;
  margin-top: -10px;
  text-align: center;
`;

const LoginTitle = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
  margin-top: -10vh;
`;

const LoginSubtitle = styled.div`
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 10px;
  font-weight: bold;
  color: black;
`;

const LoginFooter = styled.div`
  position: fixed;
  bottom: 10px;
  width: inherit;
  padding-left: 20px;
  padding-right: 20px;
`;

const LoginFooterLogo = styled.div`
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

const SliderContainer = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-content: center;
  text-align: center;
  color: white;

  & h3 {
    color: white;
    font-weight: 600px;
  }
`;

const GraphicContainer = styled.div`
  width: 66vw;
  height: 100vh;

  & .ant-carousel {
    background: #0054a4;
    height: 100vh;
  }

  .ant-carousel .slick-slide {
    text-align: center;
    height: 100vh;
    overflow: hidden;
  }

  & .ant-carousel .slick-dots-bottom {
    right: 38px;
    top: 50px;
  }
`;

const FormBlock = styled.div`
  width: 100%;
  padding-left: 15%;
  padding-right: 15%;
`;

const Version = styled.div`
  position: absolute;
  right: 0;
  font-weight: 500;
  color: white;
  margin-right: 5px;
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
  LoginTitle,
  SliderContainer,
  Version,
};
