import React from 'react';
import { render } from 'react-dom';
import App from './components/connected/App';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import './styles/app.scss';

const store = configureStore();

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('react-app')
);
