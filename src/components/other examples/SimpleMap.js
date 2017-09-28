//Created by Galina on 07.09.17.

import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { browserHistory } from 'react-router';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


class SimpleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.city.coordinatesLat,
      lng: this.props.city.coordinatesLng
    };
  }
  static defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9
  };

  render() {
    console.log('alalalla', this.props);
    return (
      <div id="map">
      <GoogleMapReact
        defaultCenter={this.state}
        defaultZoom={this.props.zoom}
      >
        <Map google={this.props.google}>
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
        </Map>
      </GoogleMapReact>
      </div>
    );
  }
}



export default SimpleMap;
