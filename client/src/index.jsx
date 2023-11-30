import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11';

import 'typeface-poppins';
// import '@fontsource/poppins/latin.css';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
// import 'antd/dist/antd.min.css';
import 'antd/dist/reset.css';

import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import App from './app';

import './i18n';

// ReactDOM.render(<App />, document.getElementById('root'));
const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer); // createRoot(rootContainer!) if you use TypeScript
root.render(<App />);

/*
When you first install React 18, you will see a warning in the console:

Console
ReactDOM.render is no longer supported in React 18. Use createRoot instead. 
Until you switch to the new API, your app will behave as if it’s running React 17. 
Learn more: https://reactjs.org/link/switch-to-createroot

React 18 introduces a new root API which provides better ergonomics for managing roots. 
The new root API also enables the new concurrent renderer, which allows you to opt-into concurrent features.

// Changes for React 18
// Before
import { render } from 'react-dom';
const container = document.getElementById('app');
render(<App tab="home" />, container);

// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
*/
