import * as types from './actionTypes';

import CaseStudyCSAPIS from '../api/caseStudyCSApis';

export function loadRestaurants(id) { 
  let cityId = id || '6'; 
  return function(dispatch) {
    return CaseStudyCSAPIS.getRestaurants(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&start=0&count=50&collection_id=1`).then(response => {
      dispatch(loadRestaurantsSuccess(response.restaurants));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadCities() {  
  return function(dispatch) {
    return CaseStudyCSAPIS.getCities("https://developers.zomato.com/api/v2.1/cities?city_ids=1,2,3,4%,5,6,7,8,9,10")
    .then(response => {
      dispatch(loadCitiesSuccess(response.location_suggestions));
    }).catch(error => {
      throw(error);
    });
  };
}

export function setCity(city) {
  return function(dispatch) {
    dispatch(citySelectionSuccess(city));
  }
} 

export function loadRestaurantsSuccess(restaurants) {  
    return {type: types.LOAD_RESTAURANTS_SUCCESS, restaurants};
}

export function loadCitiesSuccess(cities) {  
  return {type: types.LOAD_CITIES_SUCCESS, cities};
}

export function citySelectionSuccess(city) {
  return {type: types.CITY_SELECTION_SUCCESS, city}
}