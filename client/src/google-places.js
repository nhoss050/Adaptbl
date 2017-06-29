import React, { Component } from 'react';
const google = window.google;

class GooglePlaces extends Component {


  componentWillReceiveProps(nextProps) {
    if (nextProps.lat){
      let map = new google.maps.Map(this.refs.map, {
        zoom: 12,
        center: {
          lat: nextProps.lat,
          lng: nextProps.lng
        }
      })

      let place = new google.maps.LatLng(nextProps.lat, nextProps.lng);

      let request = {
      location: place,
      radius: '500',
      query: nextProps.typeFood,
      type: 'restaurant'
      };
      let places = []
      let service = new google.maps.places.PlacesService(map);
      service.textSearch(request, (result, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK){
          for (var i = 0; i < 2; i++){
            places.push(result[i]);
          }
        }
      });
      console.log(places)
    }
  }


  render(){
    return <div ref='map' />
  }

}

export default GooglePlaces;