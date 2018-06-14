import React from 'react';
import PropTypes from 'prop-types';
import Restaurant from './Restaurant';
import CircularLoader from './Loader';


const RestaurantsList = ({restaurants, selectRestaurant, isLoading}) => {
  return (
      <ul style={{maxHeight: '700px', overflowY: 'auto', marginTop: '0px'}}>
        {restaurants.map(restaurant => 
        <li key={restaurant.restaurant.id} style={{borderBottom: '1px dashed lightgray', marginBottom: '10px'}}>
          <Restaurant restaurant={restaurant.restaurant} selectRestaurant={selectRestaurant}/>
        </li>
        )}
        <span style={{position: 'relative', top: '200px'}}>
           {restaurants.length === 0 && !isLoading && <span>No Restaurants Found, for your query!!!</span>}
           {isLoading && <CircularLoader/>}
        </span>
      </ul>
  );
};

RestaurantsList.propTypes = {
  restaurants: PropTypes.array.isRequired,
  selectRestaurant: PropTypes.func.isRequired
};

export default RestaurantsList;