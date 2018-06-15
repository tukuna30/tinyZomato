import React from 'react';
import PropTypes from 'prop-types';
import Restaurant from './Restaurant';
import CircularLoader from './Loader';


const RestaurantsList = ({ restaurants, selectRestaurant, isLoading }) => {
  return (
    <ul style={{ maxHeight: '700px', overflowY: 'auto', marginTop: '0px' }}>
      <h2 className="list-header">Restaurants in your city</h2>
      <span className='results-note'>
        { !isLoading && restaurants.length === 0 && <span>No Restaurants Found, for your query!!!</span>}
        {isLoading && <CircularLoader />}
      </span>
      {restaurants.map((restaurant, index) =>
        <li className={index == 0 ? "first" : ''} key={restaurant.restaurant.id} style={{ borderBottom: '1px dashed lightgray', marginBottom: '10px' }}>
          <Restaurant restaurant={restaurant.restaurant} selectRestaurant={selectRestaurant} />
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