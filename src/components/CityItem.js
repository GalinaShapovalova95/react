//Created by Galina on 30.08.17.

require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class CityItem extends React.Component {
  render() {
    return (
      <li className={`city-list__city list-group-item ${this.props.id == this.props.city.id ? 'active' : ''}`}>
        <Link to={`/city/${this.props.city.id}`} className="city__link ">
            {this.props.city.name}
        </Link>
      </li>
    );
  }
}

CityItem.defaultProps = {
};

export default CityItem;
