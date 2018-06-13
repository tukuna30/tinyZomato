import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import Restaurants from './components/connected/Restaurants';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { loadRestaurants } from './actions/restaurantsActions';
import './styles/app.scss';

const store = configureStore();
store.dispatch(loadRestaurants());

render(
    <Provider store={store}>
        <App>
            <Restaurants/>
        </App>
    </Provider>,
    document.getElementById('react-app')
);
