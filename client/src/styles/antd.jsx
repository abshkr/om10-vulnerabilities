import { createGlobalStyle } from 'styled-components';

const AntdStyleProvider = createGlobalStyle`


  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
    color: #0054a4;
  }

  .ant-card {
    border: 1px solid #0054a43b !important;
  }

  .ant-card-actions {
    background: white;
  }
  
  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
    background: #0054a4;
    color: white;
  }

  .ant-statistic-content {
    font-weight: bold;
    font-size: 36px;
  }

  .ant-card-head {
    background: #fafafa;
    color: rgb(0, 84, 164);
  }

  .ant-tab-window {
    height: calc(85vh - 200px);
    overflow-y: auto;
    padding-right: 10px;
    margin-bottom: 10px;
  }

  .ant-drawer-form {
    height: calc(50vh - 210px);
    overflow-y: auto;
    padding-right: 10px;
    margin-bottom: 10px;
  }

  .ant-tab-window-no-margin {
    height: calc(85vh - 200px);
    overflow-y: auto;
    padding-right: 10px;
  }

  .ant-btn-primary.disabled,
  .ant-btn-primary[disabled],
  .ant-btn-primary.disabled:hover,
  .ant-btn-primary[disabled]:hover,
  .ant-btn-primary.disabled:focus,
  .ant-btn-primary[disabled]:focus,
  .ant-btn-primary.disabled:active,
  .ant-btn-primary[disabled]:active,
  .ant-btn-primary.disabled.active,
  .ant-btn-primary[disabled].active {
    color: #c9c9c9;
    background-color: rgba(0, 0, 0, 0.021) !important;
    border: 1px solid transparent !important;
  }
  
  .ant-input-disabled {
    background-color: #f5f5f56b;
  }
  
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: rgba(0, 0, 0, 0);
  }
  
  .ant-btn {
    font-weight: 600;
  }
  
  .ant-select-selection {
    border-top-width: 1px !important;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  }
  
  .ant-btn-primary {
    background-color: #fff;
    border: 1px solid #43454a1f;
    color: ${(props) => props.primary};
    box-shadow: none;
    font-size: 14px !important;
  }
  

  .ant-btn-primary:active,
  .ant-btn-primary.active {
    background-color: ${(props) => props.primary};
    border: 1px solid #43454a1f;
  }
  
  .ant-btn-primary:hover,
  .ant-btn-primary:focus {
    background-color: ${(props) => props.primary};
    border: 1px solid #43454a1f;
  }
  
  .ant-notification-notice-message {
    color: #36393f;
  }
  
  .ant-form-item {
    margin-bottom: 10px !important;
  }

  .ant-modal-confirm-body .ant-modal-confirm-content {
    margin-left: 0px !important;
  }
  
  .ant-tabs-nav .ant-tabs-tab:hover {
    color: ${(props) => props.primary};
  }
  
  .ant-tabs-nav .ant-tabs-tab-active {
    color: ${(props) => props.primary};
  }
  
  .ant-tabs-ink-bar {
    background-color: ${(props) => props.primary};
  }
  
  .ant-checkbox-checked::after {
    border-color: ${(props) => props.primary};
  }
  
  .ant-checkbox-checked .ant-checkbox-inner {
    border-color: ${(props) => props.primary};
    background-color: ${(props) => props.primary};
  }
  
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${(props) => props.primary};
  }
  
  .ant-modal-confirm-info .ant-modal-confirm-body > .anticon {
    color: ${(props) => props.primary};
  }
  
  .ant-pagination-item-active {
    border-color: ${(props) => props.primary};
  }
  
  .ant-switch-checked {
    background-color: ${(props) => props.primary};
  }
  
  .ant-modal-confirm .ant-modal-confirm-btns {
    margin-top: 0px !important;
  }
  
  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
  }
  
  .ant-btn:hover,
  .ant-btn:focus {
    color: ${(props) => props.primary};
    border-color: ${(props) => props.primary};
  }
  
  .ant-btn-primary:hover,
  .ant-btn-primary:focus {
    color: white;
  }
  
  .ant-btn-danger:hover,
  .ant-btn-danger:focus {
    color: white;
    border-color: #ff4d4f;
  }
  
  .ant-input:focus {
    box-shadow: none;
    border-color: ${(props) => props.primary};
  }
  
  .ant-input:hover {
    box-shadow: none;
    border-color: ${(props) => props.primary};
  }
  
  .ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    background: ${(props) => props.primary};
    border-color: ${(props) => props.primary};
  }
  
  .ant-radio-button-wrapper:hover {
    color: ${(props) => props.primary};
  }
  
  .ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
    background: #5696e5;
    border-color: #5696e5;
  }
  

  .ant-layout-sider {
    background: #040d17
  }

  .ant-menu-dark, .ant-menu-dark .ant-menu-sub {
    background: #040d17
  } 

  .ant-menu.ant-menu-dark, .ant-menu-dark .ant-menu-sub {
    background: #040d17
  }

  .ant-layout-sider-trigger {
    background: #010b15
  }

  .ant-card {
    border: 2px solid #edf2f9
  }
  
  .ant-page-header-heading-title {
    color: #040d17 !important;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 0px;
    padding-right: 5px;

  }

  .ant-page-header-compact .ant-page-header-heading {
    margin-top: 0px;
  }
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: #0054A4;
  }

  .ant-picker {
    padding-top: 6px;
  }

 .ant-picker-input > input {
    text-align: center;
    .ant-picker-cell-in-view.ant-picker-cell-in-range::before {
      background: none;
    }
  }

  .ant-tabs .ant-tabs-left-bar .ant-tabs-tab, .ant-tabs .ant-tabs-right-bar .ant-tabs-tab {
    text-align: right;
  }

  .ant-table.ant-table-small .ant-table-title, .ant-table.ant-table-small .ant-table-footer, .ant-table.ant-table-small .ant-table-thead > tr > th, .ant-table.ant-table-small .ant-table-tbody > tr > td, .ant-table.ant-table-small tfoot > tr > th, .ant-table.ant-table-small tfoot > tr > td {
    padding: 2px;
  }
`;
export default AntdStyleProvider;
