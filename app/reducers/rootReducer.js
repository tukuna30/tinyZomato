import {combineReducers} from 'redux';  
import restaurants from './restaurantsReducer';
import cities from './citiesReducer';
import selectedCity from './cityReducer';

const rootReducer = combineReducers({  
  restaurants,
  cities,
  selectedCity
})

export default rootReducer;