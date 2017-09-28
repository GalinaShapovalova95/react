//Created by Galina on 01.09.17.
require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { browserHistory } from 'react-router';
import MapContainer from './MapContainer';
import {isEqual} from 'lodash';

class CityEdit extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.editCity = this.editCity.bind(this);
    this.showplacesChange = this.showplacesChange.bind(this);
    this.addShowplace = this.addShowplace.bind(this);
    this.changeShowplace = this.changeShowplace.bind(this);
    this.deleteShowplace = this.deleteShowplace.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.changePage = this.changePage.bind(this);
    this.state = {
      name: this.props.city.name,
      strength: this.props.city.strength,
      coordinatesLat: this.props.city.coordinates.lat,
      coordinatesLng: this.props.city.coordinates.lng,
      showplaces: this.props.city.showplaces,
      value: '',
      valueRating: 1,
    };
  }

  handleChange(value, type){
    // this.setState({ [type]: value });
    if (type === 'name') {this.setState({name: value})}
    if (type === 'strength') {this.setState({strength: value})}
    if (type === 'coordinatesLat') {this.setState({coordinatesLat: value})}
    if (type === 'coordinatesLng') {this.setState({coordinatesLng: value})}
  }

  editCity(){
    if (this.state.name.trim().length) {
      var state = this.state;
      state.showplaces = state.showplaces.filter(item => item.name.trim().length != 0);
      this.props.editCity(state, this.props.city.id);
      this.props.history.push(`/city/${this.props.city.id}`);
    }
  }

  showplacesChange(event){
    this.setState({value: event.target.value});
  }
  addShowplace(value){
    if(this.state.value.trim().length) {
      let idShowplace = 1 - 0.5 + Math.random() * (1000000 - 1 + 1);
      idShowplace = Math.round(idShowplace);
      this.props.addShowplace(this.state.value, this.props.city, idShowplace, this.state.valueRating);
      this.setState({value: ""});   // очищаем input после добавления
    }
  }
  changeShowplace(value, id){
    var newShowplaces = this.state.showplaces.map(item => {
        if (item.id === id) {
          return {
            id: id,
            name: value
          }
        }
        return item;
      });
    this.setState({showplaces: newShowplaces});
  }
  deleteShowplace(idShowplace){
    this.props.deleteShowplace(this.props.city, idShowplace);
  }
  handleSelectChange(event){
    this.setState({valueRating: event.target.value});
  }
  changePage(){
    this.props.history.push("/");
  }

  render() {
    return(
      <div className="city__edit">
        <div className="city__params">
        <ul className="city__list_edit">
          <li className="city__item">City Name: <input className="form-control city__input_style" type="text" value={this.state.name} onChange={(event) => this.handleChange(event.target.value, 'name')} /></li>
          <li className="city__item">Population: <input className="form-control city__input_style" type="number" value={this.state.strength} onChange={(event) => this.handleChange(event.target.value, 'strength')} /></li>
          <li className="city__item">Geographical coordinates: <input className="form-control city__input_coord" type="number" value={this.state.coordinatesLat} onChange={(event) => this.handleChange(event.target.value, 'coordinatesLat')} /><input className="form-control city__input_coord" type="number" value={this.state.coordinatesLng} onChange={(event) => this.handleChange(event.target.value, 'coordinatesLng')} /></li>
          <li className="city__item">Showplaces:</li>

          { _.sortBy(this.state.showplaces, ['rating']).reverse().map(item =>
              <li key={item.id} className="city__item">
                <input className="form-control city__input_style" type="text" value={item.name} onChange={(event) => this.changeShowplace(event.target.value, item.id)} />
                <span className="city__rating">
                  {item.rating}
                </span>
                <button className="btn btn-outline-danger btn-sm button" onClick={() => this.deleteShowplace(item.id)}>x</button>
              </li>
          )}
        </ul>
        <input className="input-showplaces form-control" type="text" value={this.state.value} onChange={this.showplacesChange} placeholder="Showplaces..."/>
        <select className="rating" value={this.state.valueRating} onChange={this.handleSelectChange}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>
        <button className="btn btn-outline-success button" onClick={this.addShowplace}>Add</button>

        <div className="contain__button">
          <button className="btn btn-outline-secondary button" onClick={this.changePage}>Back</button>
          <button className="btn btn-outline-success button" onClick={this.editCity}>Save</button>
        </div>
          </div>
        <div className="city__map">
          <Route component={(props) => <MapContainer city={this.state} {... props}/>} />
        </div>
      </div>

    )

  }
}

CityEdit.defaultProps = {
};

export default CityEdit;

