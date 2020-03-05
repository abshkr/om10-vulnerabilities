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


  ::-webkit-scrollbar {
    width: 5px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #68a4ec;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
`;
export default GlobalStyleProvider;
