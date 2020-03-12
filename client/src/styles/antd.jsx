import { createGlobalStyle } from 'styled-components';

const AntdStyleProvider = createGlobalStyle`


  .ant-tab-window {
    height: 70vh;
    overflow-y: auto;
    padding-right: 10px;
    margin-bottom: 10px;
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
    color: #68a4ec;
    box-shadow: none;
    font-size: 14px !important;
  }
  
  .ant-btn-primary:active,
  .ant-btn-primary.active {
    background-color: #68a4ec;
    border: 1px solid #43454a1f;
  }
  
  .ant-btn-primary:hover,
  .ant-btn-primary:focus {
    background-color: #68a4ec;
    border: 1px solid #43454a1f;
  }
  
  .ant-notification-notice-message {
    color: #36393f;
  }
  
  .ant-form-item {
    margin-bottom: 10px !important;
  }
    
  .ant-modal-confirm .ant-modal-body {
    padding: 20px !important;
    padding-top: 20px !important;
  }
  
  .ant-modal-confirm-body .ant-modal-confirm-content {
    margin-left: 0px !important;
  }
  
  .ant-tabs-nav .ant-tabs-tab:hover {
    color: #68a4ec;
  }
  
  .ant-tabs-nav .ant-tabs-tab-active {
    color: #68a4ec;
  }
  
  .ant-tabs-ink-bar {
    background-color: #68a4ec;
  }
  
  .ant-checkbox-checked::after {
    border-color: #68a4ec;
  }
  
  .ant-checkbox-checked .ant-checkbox-inner {
    border-color: #68a4ec;
    background-color: #68a4ec;
  }
  
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #68a4ec;
  }
  
  .ant-modal-confirm-info .ant-modal-confirm-body > .anticon {
    color: #68a4ec;
  }
  
  .ant-pagination-item-active {
    border-color: #68a4ec;
  }
  
  .ant-switch-checked {
    background-color: #68a4ec;
  }
  
  .ant-modal-confirm .ant-modal-confirm-btns {
    margin-top: 15px !important;
  }
  
  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
  }
  
  .ant-btn:hover,
  .ant-btn:focus {
    color: #68a4ec;
    border-color: #68a4ec;
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
    border-color: #68a4ec;
  }
  
  .ant-input:hover {
    box-shadow: none;
    border-color: #68a4ec;
  }
  
  .ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    background: #68a4ec;
    border-color: #68a4ec;
  }
  
  .ant-radio-button-wrapper:hover {
    color: #68a4ec;
  }
  
  .ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
    background: #5696e5;
    border-color: #5696e5;
  }
  
  
`;
export default AntdStyleProvider;
