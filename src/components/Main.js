require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


import MainPage from './MainPage';
import CityEdit from './CityEdit';
import MapWrapper from './other examples/MapWrapper';


let yeomanImage = require('../images/yeoman.png');



class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.addNewCity = this.addNewCity.bind(this);
    this.deleteCity = this.deleteCity.bind(this);
    this.editCity = this.editCity.bind(this);
    this.addShowplace = this.addShowplace.bind(this);
    this.deleteShowplace = this.deleteShowplace.bind(this);
    this.state = {
      cities: [{
        id: 0,
        name: 'Taganrog',
        strength: 250000,
        coordinates: {lat: 47.2361700, lng: 38.8968800},
        showplaces: [{name: 'Alferaki Palace', id:1, rating: 10}, {name: 'Monument to Peter I', id:2, rating: 9},{name: 'Church of St. Nicholas the Wonderworker', id:3, rating: 8},{name: 'The stone staircase', id:4, rating: 7},{name: 'Museum house of Chekhov', id:5, rating: 6}]
      }, {
        id: 1,
        name: 'Sochi',
        strength: 411524,
        coordinates: {lat: 43.5991700, lng: 39.7256900},
        showplaces: [{name: 'Singing waterfalls', id:1, rating: 10}, {name: 'Aquarium', id:2, rating: 9},{name: 'Sochi Park', id:3, rating: 8},{name: 'Ice Palace', id:4, rating: 7},{name: 'Olympic park', id:5, rating: 6}]
      }, {
        id: 2,
        name: 'Krasnodar',
        strength: 773970,
        coordinates: {lat: 45.0448400, lng: 38.9760300},
        showplaces: [{name: 'The Central Concert Hall', id:1, rating: 10}, {name: 'The Avrora cinemacentre', id:2, rating: 9},{name: 'The Theater Square', id:3, rating: 8},{name: 'The Krasnodar Musical Theater', id:4, rating: 7},{name: 'Kuban postal museum', id:5, rating: 6}]
      }, {
        id: 3,
        name: 'Moscow',
        strength: 12000000,
        coordinates: {lat: 55.7522200, lng: 37.6155600},
        showplaces: [{name: 'The Red Square', id:1, rating: 10}, {name: 'The Bolshoi and Theaters', id:2, rating: 9},{name: 'Saint Basils Cathedral', id:3, rating: 8},{name: 'The Historical Museum', id:4, rating: 7},{name: 'The Armoury Chamber', id:5, rating: 6}]
      }]
    };
  }
  addNewCity(city, id){
    var cities = this.state.cities;
    cities.push({name: city, id: id, showplaces: [], coordinates: {}});
    this.setState({cities: cities});
}
  editCity(state,id){
    console.log(11111, state)
    var cities = this.state.cities;
    var newCities = cities.map(city => {
      if (city.id === id) { return{
        id: id,
        name: state.name,
        strength: state.strength,
        coordinates: {lat: state.coordinatesLat, lng: state.coordinatesLng},
        showplaces: state.showplaces,
      }
      }
      return city;
    });
    this.setState({cities: newCities});
}

  deleteCity(id){
    var cities = this.state.cities;
    var newCities = cities.filter(item => item.id != id);  //удаляем элементы, id которых передали
    this.setState({cities: newCities});
  }

  addShowplace(showplace, city, idShowplace, rating){
    var cities = this.state.cities;
    city.showplaces.push({name: showplace, id: idShowplace, rating: +rating});
    this.setState({cities: cities});
  }

  deleteShowplace(city, idShowplace){
    var cities = this.state.cities;
    var newCities = cities.map(item => {
      if (city.id === item.id) { return{
        id: item.id,
        name: item.name,
        strength: item.strength,
        coordinates: item.coordinates,
        showplaces: item.showplaces.filter(showplace => showplace.id != idShowplace),
      }
      }
      return item;
    });
    this.setState({cities: newCities});
  }

  render() {
    return (
      <Router>
      <div className="index">
        <Route exact path="/" component={(props) => (<MainPage cities={this.state.cities} addNewCity={this.addNewCity} {... props}/>)} />
        <Route exact path="/city/:id" component={(props) => (<MainPage cities={this.state.cities} city={this.state.cities.find(city => city.id == props.match.params.id)} addNewCity={this.addNewCity} deleteCity={this.deleteCity} {... props}/>)} />
        <Route path="/edit/:id" component={(props) => <CityEdit city={this.state.cities.find(city => city.id == props.match.params.id)} editCity={this.editCity} addShowplace={this.addShowplace} deleteShowplace={this.deleteShowplace} {... props}/>} />
        <Route path="/map" component={(props) => <MapWrapper props={this.props} {... props} />} />
      </div>
      </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
