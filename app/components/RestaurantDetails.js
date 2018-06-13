import React from 'react';
import Restaurant from './Restaurant';

const RestaurantDetail = (props) => {
    return <div>
        <Restaurant restaurant={props.restaurant}/>
        <div>Other details</div> 
    </div>
}

export default RestaurantDetail;
