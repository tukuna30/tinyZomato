import React from 'react';
import PropTypes from 'prop-types';
import Restaurant from './Restaurant';

const RestaurantsList = ({restaurants, selectRestaurant}) => {
  return (
      <ul style={{maxHeight: '700px', overflowY: 'auto'}}>
        {restaurants.map(restaurant => 
        <li key={restaurant.restaurant.id} style={{borderBottom: '1px dashed lightgray', marginBottom: '10px'}}>
          <Restaurant restaurant={restaurant.restaurant} selectRestaurant={selectRestaurant}/>
        </li>
        )}
      </ul>
  );
};

RestaurantsList.propTypes = {
  restaurants: PropTypes.array.isRequired,
  selectRestaurant: PropTypes.func.isRequired
};

export default RestaurantsList;