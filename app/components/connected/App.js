import React from 'react';
import CityPicker from './CityPicker';
import LandingPage from './LandingPage';
import { connect } from 'react-redux';
import localStore from '../../store/localStore';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let selectedCityName = this.props.selectedCity.name || localStore.getCity().name;
    return (
      <div>
        {selectedCityName ? <LandingPage /> : <CityPicker />}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    selectedCity: state.selectedCity
  };
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(App)  