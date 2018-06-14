import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function restaurantsReducer(state = initialState.restaurants, action) {  
  switch(action.type) {
    case types.LOAD_RESTAURANTS_SUCCESS:
      return action.restaurants

    default: 
      return state;
  }
}