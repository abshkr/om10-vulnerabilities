import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11';

import 'typeface-open-sans';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

import './i18n';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'antd/dist/antd.css';

ReactDOM.render(<App />, document.getElementById('root'));
