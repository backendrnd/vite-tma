import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AppStoreProvider } from './stores/AppProvider';

window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();
window.Telegram.WebApp.disableVerticalSwipes();
window.Telegram.WebApp.enableClosingConfirmation();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppStoreProvider>
            <App />
        </AppStoreProvider>
    </React.StrictMode>,
);
