import { createGlobalStyle } from 'styled-components';

const GlobalStyleProvider = createGlobalStyle`
  body {
        font-family: 'Poppins', sans-serif;
        background-color: white;
        margin: 0px;
    }
  
  a {
    color: #68a4ec !important;
  }

  .editable-cell {
    position: relative;
  }
  
  .editable-cell-value-wrap {
    padding: 5px 12px;
    cursor: pointer;
  }
  
  .editable-row:hover .editable-cell-value-wrap {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    padding: 4px 11px;
  }

`;
export default GlobalStyleProvider;
