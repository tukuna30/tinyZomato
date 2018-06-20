import * as types from './actionTypes';

import CaseStudyCSAPIS from '../api/caseStudyCSApis';

export function loadRestaurants(id, categoryId = '1', start = 0, isChanged) {
  let cityId = id || '6';
  return function (dispatch) {
    return CaseStudyCSAPIS.getRestaurants(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&start=${start}&count=20&collection_id=${categoryId}`).then(response => {
      let restaurantsWithUniqueIds = response.restaurants.map((restaurant) => {
        restaurant.restaurant.id = restaurant.restaurant.id + Date.now();
        restaurant.restaurant.name = start === 0 ? restaurant.restaurant.name : restaurant.restaurant.name + start;
        return restaurant;
      });
      if (isChanged) {
        dispatch(reloadRestaurantsSuccess(restaurantsWithUniqueIds));
        return;
      }
      dispatch(loadRestaurantsSuccess(restaurantsWithUniqueIds));
    }).catch(error => {
      throw (error);
    });
  };
}

export function loadCities() {
  return function (dispatch) {
    return CaseStudyCSAPIS.getCities("https://developers.zomato.com/api/v2.1/cities?city_ids=1,2,3,4%,5,6,7,8,9,10")
      .then(response => {
        dispatch(loadCitiesSuccess(response.location_suggestions));
      }).catch(error => {
        throw (error);
      });
  };
}

export function setCity(city) {
  return function (dispatch) {
    dispatch(citySelectionSuccess(city));
  }
}

export function setCategory(category) {
  return function (dispatch) {
    dispatch(categorySelectionSuccess(category));
  }
}

export function loadRestaurantsSuccess(restaurants) {
  return { type: types.LOAD_RESTAURANTS_SUCCESS, restaurants };
}

export function reloadRestaurantsSuccess(restaurants) {
  return { type: types.RELOAD_RESTAURANTS_SUCCESS, restaurants };
}

export function loadCitiesSuccess(cities) {
  return { type: types.LOAD_CITIES_SUCCESS, cities };
}

export function citySelectionSuccess(city) {
  return { type: types.CITY_SELECTION_SUCCESS, city }
}

export function categorySelectionSuccess(category) {
  return { type: types.CATEGORY_SELECTION_SUCCESS, category }
}