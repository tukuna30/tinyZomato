import React from 'react';
import Restaurant from './Restaurant';

const RestaurantDetail = (props) => {
    return <div>
        <Restaurant restaurant={props.restaurant} />
        <div>
            Avg. Cost per two :- {props.restaurant.currency} {props.restaurant.average_cost_for_two}
            <img style={{width: '100%'}} src={props.restaurant.featured_image} />
        </div>
    </div>
}

export default RestaurantDetail;
