//Created by Galina on 30.08.17.

require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import CityItem from './CityItem';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class CityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
  }

  add() {
    if(this.state.value.trim().length) {
      let id = 1 - 0.5 + Math.random() * (1000000 - 1 + 1);
      id = Math.round(id);
      this.props.addNewCity(this.state.value, id);
      this.setState({value: ""});   // очищаем input после добавления
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    const id = this ? this.props.id : undefined;
    return (
      <div className="list">
        <ul className="city-list">
          {this.props.cities.map(function(item) { //трансформируем массив
            return (
              <CityItem city={item} key={item.id} id={id} />
            )
          })
          }
        </ul>
        <input className="input-city form-control" type="text" value={this.state.value} onChange={this.handleChange} placeholder="City..."/>
        <button className="btn btn-outline-success button" onClick={this.add}>Add</button>
      </div>
    );
  }
}

CityList.defaultProps = {
};

export default CityList;
