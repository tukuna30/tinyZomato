import * as types from './actionTypes';

import CaseStudyCSAPIS from '../api/caseStudyCSApis';

export function loadRestaurants() {  
  return function(dispatch) {
    return CaseStudyCSAPIS.getRestaurants("https://developers.zomato.com/api/v2.1/search?entity_id=6&entity_type=city&start=0&count=100&collection_id=1").then(response => {
      dispatch(loadRestaurantsSuccess(response.restaurants));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadRestaurantsSuccess(restaurants) {  
    return {type: types.LOAD_RESTAURANTS_SUCCESS, restaurants};
}