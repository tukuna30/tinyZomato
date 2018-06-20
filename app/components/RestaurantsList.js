import React from 'react';
import PropTypes from 'prop-types';
import Restaurant from './Restaurant';
import CircularLoader from './Loader';
let throttle = require('lodash.throttle');

class RestaurantsList extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleScroll = throttle(this.handleScroll, 400);
  }

  handleScroll(e) {
    let scrollHolder = document.querySelector('#scroll-holder');
    let listContainer = document.querySelector('#list-container');
    if (!this.props.isFiltering && (scrollHolder.scrollTop + scrollHolder.clientHeight > listContainer.clientHeight)) {
      this.props.loadMore();
    }
  }

  componentWillUnmount() {
    document.querySelector('#scroll-holder').removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <div id="scroll-holder" style={{ maxHeight: '700px', overflowY: 'auto' }} onScroll={this.handleScroll}>
        <ul id="list-container" style={{ overflowY: 'auto', marginTop: '0px' }}>
          <div className="list-header">
            <h2 style={{margin: '0'}}>Restaurants in your city</h2>
            {this.props.restaurants.length > 0 && <h6 style={{margin: '0'}}>Filter matching {this.props.restaurants.length} restaurants </h6>}
          </div>
          <span className='results-note'>
            {!this.props.isLoading && this.props.restaurants.length === 0 && <span>No Restaurants Found, for your query!!!</span>}
            {this.props.isLoading && <CircularLoader />}
          </span>
          {this.props.restaurants.map((restaurant, index) =>
            <li className={index == 0 ? "first" : ''} key={restaurant.restaurant.id} style={{ borderBottom: '1px dashed lightgray', marginBottom: '10px' }}>
              <Restaurant restaurant={restaurant.restaurant} selectRestaurant={this.props.selectRestaurant} />
            </li>
          )}
        </ul>
      </div>
    );
  }
};

RestaurantsList.propTypes = {
  restaurants: PropTypes.array.isRequired,
  selectRestaurant: PropTypes.func.isRequired
};

export default RestaurantsList;