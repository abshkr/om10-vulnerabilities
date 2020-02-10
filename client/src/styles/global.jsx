import { createGlobalStyle } from 'styled-components';

const GlobalStyleProvider = createGlobalStyle`
  body {
        font-family: 'Open Sans', sans-serif;
        background-color: white;
        margin: 0px;
    }
  
  a {
    color: #68a4ec !important;
  }
  
`;
export default GlobalStyleProvider;
