import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import WebApp from '@twa-dev/sdk';
import { AppStoreProvider } from './stores/AppProvider';

WebApp.ready();
WebApp.expand();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppStoreProvider>
            <App />
        </AppStoreProvider>
    </React.StrictMode>,
);
