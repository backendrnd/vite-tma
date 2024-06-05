import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import WebApp from '@twa-dev/sdk';
import { AppStoreProvider } from './stores/AppProvider';

WebApp.expand();
window.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
window.scrollTo(0, 100);
WebApp.ready();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppStoreProvider>
            <App />
        </AppStoreProvider>
    </React.StrictMode>,
);
