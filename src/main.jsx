import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import WebApp from '@twa-dev/sdk';

WebApp.ready();
WebApp.expand();
WebApp.MainButton.hide();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
