import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Modal from 'react-modal';
import {loadCities, setCity} from '../../actions/appActions';
let Typeahead = require('react-typeahead').Typeahead;
import localStore from '../../store/localStore';

class CityPicker extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { modalIsOpen: true, selectedCity: {} };
        this.selectCity = this.selectCity.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    selectCity(city) {
        localStore.setCity(city);
        this.props.actions.setCity(city);
        this.closeModal();
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
        this.props.onClose && this.props.onClose();
    }

    componentDidMount() {
        if (!this.props.cities.length){
           this.props.actions.loadCities();
        }
    }

    render() {
        const cities = this.props.cities;
        const customStyles = {
            content : {
              top                   : '20%',
              left                  : '20%',
              right                 : 'auto',
              bottom                : '20%',
            }
        };
        return (
            <div className='city'>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    ariaHideApp={false}
                    style={customStyles}
                >
                    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <button onClick={this.closeModal} style={{ fontSize: '16px', marginLeft: '10px' }} className="button">Close</button>
                    </div>
                    <Typeahead
                        options={cities}
                        filterOption={(inputVal, option) => {
                            return option.name.toLowerCase().indexOf(inputVal.toLowerCase()) !== -1;
                        }}
                        displayOption={(option) => {
                            return option.name;
                        }}
                        placeholder="Pick your City"
                        onOptionSelected={(city) => {
                            this.selectCity(city);
                        }}
                        maxVisible={5}
                    />
                </Modal>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        cities: state.cities
    };
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({setCity, loadCities}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CityPicker);