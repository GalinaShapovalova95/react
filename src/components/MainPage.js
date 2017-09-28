//Created by Galina on 05.09.17.

require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/bootstrap.css');

import React from 'react';
import CityList from './CityList';
import CityInfo from './CityInfo';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {citySelect: true};
  }

  render() {
    return (
      <div>
        <CityList citySelect={this.state.citySelect} cities={this.props.cities} addNewCity={this.props.addNewCity} id={this.props.match.params.id}/>
        {this.state.citySelect &&
          <CityInfo city={this.props.city} deleteCity={this.props.deleteCity} {...this.props}/>
        }

      </div>
    );
  }
}

MainPage.defaultProps = {
};

export default MainPage;

