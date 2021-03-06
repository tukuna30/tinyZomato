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
import Filter from '../Filter';
import Sorter from '../Sorter';
import Categories from '../connected/Categories';

class LandingPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { modalIsOpen: false, restaurant: {}, restaurants: [], showCityPicker: false, isLoading: true, selectedCategory: {}, isFiltering: false };
        this.selectRestaurant = this.selectRestaurant.bind(this);
        this.showCityPicker = this.showCityPicker.bind(this);
        this.hideCityPicker = this.hideCityPicker.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateRestaurantsList = this.updateRestaurantsList.bind(this);
        this.sortRestaurantsList = this.sortRestaurantsList.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
    }

    selectRestaurant(restaurant) {
        this.setState({ modalIsOpen: true, restaurant });
    }

    showCityPicker() {
        this.setState({ showCityPicker: true });
    }

    hideCityPicker() {
        this.setState({ showCityPicker: false });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    componentDidMount() {
        if (!this.props.restaurants.length) {
            this.props.actions.loadRestaurants(localStore.getCity().id);
        }
    }
    _isCityChanged(nextProps) {
        return this.props.selectedCity.id !== nextProps.selectedCity.id;
    }
    _isCategoryChanged(nextProps) {
        return this.props.selectedCategory.id && this.props.selectedCategory.id !== nextProps.selectedCategory.id;
    }

    loadMore () {
        this.setState({ isLoading: true, isFiltering: false });
        this.props.actions.loadRestaurants(localStore.getCity().id, this.state.selectedCategory.id, this.state.restaurants.length).then(() => {
            this.setState({ isLoading: false});
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.restaurants) {
            if (this._isCityChanged(nextProps) || this._isCategoryChanged(nextProps)) {
                this.setState({ isLoading: true });
                this.props.actions.loadRestaurants(localStore.getCity().id, nextProps.selectedCategory.id, 0, true).then(() => {
                    this.setState({ isLoading: false});
                });
            } else {
                this.setState({ restaurants: nextProps.restaurants, isLoading: false, selectedCategory: nextProps.selectedCategory });
            }
        }
    }

    updateRestaurantsList(rating) {
        let filteredRestaurants = this.props.restaurants.filter((res) => {
            return parseFloat(res.restaurant.user_rating.aggregate_rating) >= parseFloat(rating);
        });
        this.setState({ restaurants: filteredRestaurants, isLoading: false, isFiltering: true });
    }

    resetFilter () {
        this.setState({isFiltering: false});
    }

    sortRestaurantsList(order) {
        let filteredRestaurants = this.props.restaurants.sort((rest1, rest2) => {
            let a = parseFloat(rest1.restaurant.user_rating.aggregate_rating);
            let b = parseFloat(rest2.restaurant.user_rating.aggregate_rating);
            if (order === 'asc') {
                return a > b ? 1 : -1;
            }
            else {
                return a > b ? -1 : 1;
            }
        });
        this.setState({ restaurants: filteredRestaurants });
    }

    render() {
        const restaurants = this.state.restaurants;
        return (
            <div className='restaurants-container' style={{ display: 'flex' }}>
                <button id='drawer' onClick={(e) => {
                    document.querySelector('.left').classList.toggle('show');
                }}>{'<<->>'}</button>
                <div className='left' style={{ padding: '20px 30px' }}>
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
                    <div style={{ padding: '10px' }}>
                        <span>{this.props.selectedCity.name || localStore.getCity().name}</span>
                        <button style={{marginLeft: '5px'}} onClick={this.showCityPicker}>Change City</button>
                    </div>
                    <Filter onChange={this.updateRestaurantsList} isFiltering={this.state.isFiltering} resetFilter={this.resetFilter}/>
                    <Sorter onSelection={this.sortRestaurantsList} />
                    <div>
                        <Categories onChange={this.getRestaurantsByCuisine} />
                    </div>

                </div>
                <div className='right'>
                    <RestaurantsList isLoading={this.state.isLoading} restaurants={restaurants} selectRestaurant={this.selectRestaurant} 
                    loadMore={this.loadMore} isFiltering={this.state.isFiltering}/>
                    {this.state.showCityPicker && <CityPicker onClose={this.hideCityPicker} />}
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    ariaHideApp={false}
                    style={{
                        content: { zIndex: '2' }, overlay: {
                            position: 'absolute'
                        }
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <button onClick={this.closeModal} style={{ fontSize: '16px', marginLeft: '10px' }} className="button">Close</button>
                    </div>
                    {this.state.restaurant.id && <RestaurantDetail restaurant={this.state.restaurant} />}
                </Modal>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        restaurants: state.restaurants,
        selectedCity: state.selectedCity,
        selectedCategory: state.selectedCategory
    };
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ loadRestaurants }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);