/**
 * Created by user on 08.09.17.
 */
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick(props, marker, e) {
    console.log(props, marker, e)
}

  render() {
    console.log(12345, this.props)
    return (
      <div id="map">
      <Map google={this.props.google}
           className={'map'}
           onClick={this.onMarkerClick}
           initialCenter={{
             lat: this.props.city.coordinatesLat,
             lng: this.props.city.coordinatesLng
           }}
           zoom={14}>
        <Marker
          title={this.props.city.name}
          name={'SOMA'}
          position={{lat: this.props.city.coordinatesLat, lng: this.props.city.coordinatesLng}} />
      </Map>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB_1R80ZbjP2Px3yYGD-Ke3ACalPY62eq4'

})(MapContainer)
