import React from 'react';

class Restaurant extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.selectRestaurant = this.selectRestaurant.bind(this);
    }
    selectRestaurant() {
        this.props.selectRestaurant && this.props.selectRestaurant(this.props.restaurant);
    }

    render() {
        return (
            <div style={{background: `url(${this.props.restaurant.thumb})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%', height: '100px'}} onClick={this.selectRestaurant} >
                <div style={{backgroundColor: 'rgb(255, 255, 255, 0.4)'}}>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{this.props.restaurant.name}</span>
                <span style={{marginLeft: '10px', }}>{this.props.restaurant.user_rating.aggregate_rating}</span>
                <div style={{ fontSize: '16px' }}>
                    <div>{this.props.restaurant.cuisines}</div>
                    <div>{this.props.restaurant.location.locality}</div>
                </div>
                </div>
            </div>
        );
    }
}
export default Restaurant;