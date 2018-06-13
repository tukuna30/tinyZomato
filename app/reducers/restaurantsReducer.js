import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function restaurantssReducer(state = initialState.restaurants, action) {  
  switch(action.type) {
    case types.LOAD_RESTAURANTS_SUCCESS:
      return action.restaurants

    case types.EDIT_ARTICLE_SUCCESS: 
    return state.map(article =>
      article.id === action.restaurant.id ?
        {id: action.restaurant.id, description: action.restaurant.description, name: restaurant.name} :
        restaurant
    )
    default: 
      return state;
  }
}