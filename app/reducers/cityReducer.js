import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function citiesReducer(state = initialState.selectedCity, action) {  
  switch(action.type) {
    case types.CITY_SELECTION_SUCCESS:
      return action.city

    default: 
      return state;
  }
}