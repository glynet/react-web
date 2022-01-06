import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { store } from "./scripts/stores"

declare global {
    interface Window {
        GLOBAL_ENV: {
            API_URL: string,
            CDN_URL: string
        };
    }
}

window.GLOBAL_ENV = {
    API_URL: "http://localhost:1900/glynet.com",
    CDN_URL: "http://localhost:1900/glynet.com",
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
