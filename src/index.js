import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { Provider } from "mobx-react";
import WeatherStore from './stores/WeatherStore';
const weatherstore = new WeatherStore();

ReactDOM.render(
    <Provider weatherstore={weatherstore}>
    <BrowserRouter>
    <CookiesProvider>
    <App/>
    </CookiesProvider>
    </BrowserRouter>
    </Provider>,
document.getElementById('root')
);