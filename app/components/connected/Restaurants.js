import React from 'react';
import { connect } from 'react-redux';
import RestaurantsList from '../RestaurantsList';
import Modal from 'react-modal';
import RestaurantDetail from '../RestaurantDetails';
let Typeahead = require('react-typeahead').Typeahead;

class Restaurants extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { modalIsOpen: false, restaurant: {}, restaurantChanged: false };
        this.selectRestaurant = this.selectRestaurant.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
    }

    selectRestaurant(restaurant) {
        this.setState({ modalIsOpen: true, restaurant });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }


    afterOpenModal() {
        if (!this.state.modalIsOpen) {
            return;
        }
    }

    render() {
        const restaurants = this.props.restaurants;
        return (
            <div className='restaurants-container'>
                <Typeahead
                    options={restaurants}
                    filterOption={(inputVal, option) => {
                        return option.restaurant && option.restaurant.name.toLowerCase().indexOf(inputVal.toLowerCase())!== -1;
                    }}
                    displayOption={(option) => {
                        let restaurant = option.restaurant;
                        return `${restaurant.name} ${restaurant.cuisines} ${restaurant.location.locality} ${restaurant.user_rating.aggregate_rating}`;
                    }}
                    placeholder="Find a restaurant"
                    onOptionSelected={(option) => {
                        this.selectRestaurant(option.restaurant);
                    }}
                    maxVisible={5}
                />
                <RestaurantsList restaurants={restaurants} selectRestaurant={this.selectRestaurant} />
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                >
                    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <button onClick={this.closeModal} style={{ fontSize: '16px', marginLeft: '10px' }} className="button">Close</button>
                    </div>
                   {this.state.restaurant.id && <RestaurantDetail restaurant={this.state.restaurant}/>}
                </Modal>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        restaurants: state.restaurants
    };
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);