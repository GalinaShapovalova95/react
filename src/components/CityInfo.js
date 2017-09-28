//Created by Galina on 31.08.17.

require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';
import { browserHistory } from 'react-router';
import {isEqual} from 'lodash';


class CityInfo extends React.Component {
  constructor(props) {
    super(props);
    this.deleteCity = this.deleteCity.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  deleteCity(){
    let id = this.props.city.id;
    this.props.deleteCity(id);
    this.props.history.push("/");
  }

  changePage(){
   this.props.history.push(`/edit/${this.props.city.id}`);
  }

  render() {
    if (this.props.city !== undefined) {
      return (
        <div className="list_info">
          <ul className="list__info_city">
            <li className="list__link">City Name: {this.props.city.name}</li>
            <li className="list__link">Population: {this.props.city.strength} people</li>
            {this.props.city.coordinates ?
            <li className="list__link">Geographical coordinates: {this.props.city.coordinates.lat}n.l. and {this.props.city.coordinates.lng}e.l.</li>
              : false}
            {this.props.city.coordinates ?
            <li className="list__link list__link_bold">Top 5 showplaces:</li>
               : false}
            {this.props.city.showplaces? _.sortBy(this.props.city.showplaces, ['rating']).reverse().slice(0, 5).map(item =>
              <li key={item.id} className="list__link">{item.name}</li>

            ): false}

          </ul>
          <button className="btn btn-outline-secondary button" onClick={this.changePage}>Edit</button>
          <button className="btn btn-outline-danger button" onClick={this.deleteCity}>Delete</button>
        </div>
      );
    } else {
      return false;
    }
  }
}

CityInfo.defaultProps = {
};

export default CityInfo;

