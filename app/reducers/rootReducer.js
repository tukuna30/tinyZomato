import {combineReducers} from 'redux';  
import restaurants from './restaurantsReducer';
import cities from './citiesReducer';
import selectedCity from './cityReducer';
import selectedCategory from './categoryReducer';

const rootReducer = combineReducers({  
  restaurants,
  cities,
  selectedCity,
  selectedCategory
})

export default rootReducer;