import {createStore, applyMiddleware} from 'redux';  
import rootReducer from '../reducers/rootReducer';  
import thunk from 'redux-thunk';

const customMiddleWare = store => next => action => {
  console.log("Middleware triggered:", action);
  next(action);
}

export default function configureStore() {  
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
}