import { createGlobalStyle } from 'styled-components';

const GlobalStyleProvider = createGlobalStyle`
  body {
        font-family: 'Poppins', sans-serif;
        background-color: white;
        margin: 0px;
        min-width: 920px;
    }
  
  a {
    color: ${(props) => props.primary} !important;
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

  .ag-theme-balham .ag-row-selected {
      background-color: #0776ff42;
  }

  .ag-theme-balham .ag-cell.ag-cell-inline-editing {
    display: flex;
    align-items: center;
  }

  .ag-react-container {
    width: 100%;
  }

  .ag-theme-balham .ag-header {
    color: black;
    
  }

  .ag-theme-balham .ag-header {
    font-size: 14px;
  }
  
  .ag-theme-balham .ag-cell {
    font-size: 14px;
    color: black;
  }

  .editable-ag-grid-cell {
    background: #faf0af;
  }

  .ag-row-selected .selected-editable-ag-grid-cell {
    background: #faf0af;
  }
`;
export default GlobalStyleProvider;
