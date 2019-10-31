import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import './i18n';

import 'antd/dist/antd.css';

import './styles/app.css';
import './styles/antd.css';

ReactDOM.render(<App />, document.getElementById('root'));
