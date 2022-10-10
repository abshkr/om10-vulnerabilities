import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11';

import 'typeface-poppins';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'antd/dist/antd.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

import './i18n';

ReactDOM.render(<App />, document.getElementById('root'));
