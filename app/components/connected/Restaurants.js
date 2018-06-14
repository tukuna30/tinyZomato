import React from 'react';
import { connect } from 'react-redux';
import RestaurantsList from '../RestaurantsList';
import Modal from 'react-modal';
import RestaurantDetail from '../RestaurantDetails';
let Typeahead = require('react-typeahead').Typeahead;
import { loadRestaurants } from '../../actions/appActions';
import { bindActionCreators } from 'redux';
import localStore from '../../store/localStore';
import CityPicker from '../connected/CityPicker';

class Restaurants extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { modalIsOpen: false, restaurant: {}, restaurantChanged: false, showCityPicker: false };
        this.selectRestaurant = this.selectRestaurant.bind(this);
        this.showCityPicker = this.showCityPicker.bind(this);
        this.hideCityPicker = this.hideCityPicker.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
    }

    selectRestaurant(restaurant) {
        this.setState({ modalIsOpen: true, restaurant });
    }

    showCityPicker () {
        this.setState({showCityPicker: true});
    }

    hideCityPicker () {
        this.setState({showCityPicker: false});
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    afterOpenModal() {
        if (!this.state.modalIsOpen) {
            return;
        }
    }
    componentDidUpdate() {
        if (this.props.restaurants[0] && this.props.restaurants[0].restaurant.location.city_id !== localStore.getCity().id){
            this.props.actions.loadRestaurants(localStore.getCity().id);
        }
    }

    componentDidMount() {
        if (!this.props.restaurants.length) {
            this.props.actions.loadRestaurants(localStore.getCity().id);
        }
    }

    render() {
        const restaurants = this.props.restaurants;
        return (
            <div className='restaurants-container'>
                <Typeahead
                    options={restaurants}
                    filterOption={(inputVal, option) => {
                        return option.restaurant && option.restaurant.name.toLowerCase().indexOf(inputVal.toLowerCase()) !== -1;
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
                <div style={{marginLeft: '40px'}}>
                    <span>{this.props.selectedCity.name || localStore.getCity().name}</span>
                    <button onClick={this.showCityPicker}>Change Location</button>
                </div>
                <RestaurantsList restaurants={restaurants} selectRestaurant={this.selectRestaurant} />
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    ariaHideApp={false}
                >
                    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <button onClick={this.closeModal} style={{ fontSize: '16px', marginLeft: '10px' }} className="button">Close</button>
                    </div>
                    {this.state.restaurant.id && <RestaurantDetail restaurant={this.state.restaurant} />}
                </Modal>
                {this.state.showCityPicker && <CityPicker onClose={this.hideCityPicker}/>}
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        restaurants: state.restaurants,
        selectedCity: state.selectedCity
    };
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ loadRestaurants }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);