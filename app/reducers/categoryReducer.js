import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function categoryReducer(state = initialState.selectedCategory, action) {  
  switch(action.type) {
    case types.CATEGORY_SELECTION_SUCCESS:
      return action.category

    default: 
      return state;
  }
}