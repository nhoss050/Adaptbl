import React, { Component } from 'react';
import { Thumbnail, Button } from 'react-bootstrap';


const google = window.google;

class GooglePlaces extends Component {
  constructor(props){
    super(props);
    this.state = {
      place: []
    }
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.food != nextProps.food){
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
      radius: '3000',
      query: nextProps.food
      };
      let places = []
      let service = new google.maps.places.PlacesService(map);
      service.textSearch(request, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK){
          for (var i = 0; i < 2; i++){
            // let term = result[i].name
            // let city = nextProps.city

            // fetch( `/yelp?term=${term}&city=${city}`, {
            //   credentials: 'same-origin'
            // })
            // .then(res => res.json())
            // .then(data => {
            //   console.log(data)
            // })

            places.push(result[i])
          }
          this.setState({
            place:  places
          });
        }
      });


    }
  }

  handleClick = (e) => {
    console.log(typeof e.target.name)
    let name = e.target.name
    fetch(`/users/likes`, {
      method: 'POST',
      headers: {'content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'},
      credentials: "include",
      body: JSON.stringify({
        name
      })
    })
    .then((response) => { console.log(response.json()) })
  }


  render(){

    const thumbnailPlace = this.state.place.map(elem => {
      const address = elem.formatted_address;
      const rating = elem.rating;
      const open = elem.opening_hours ? elem.opening_hours.open_now : false;
      const name = elem.name;

      return (
        <div className="col-sm-4 col-sm-offset-1" key={elem.id}>
          <Thumbnail  >
          <h3> {name} </h3>
          <p> {address} </p>
          <p> {open ? "Open Now" : "Closed"} </p>
          <p> {rating ? `Google rating: ${rating}` : ''} </p>
          <Button bsStyle="default" name={name} onClick={this.handleClick}>Like</Button>
          </Thumbnail>
        </div>
      );
    })


    return (
    <div >
      <div ref='map' />
      <div className="row">
        {this.state.place ? thumbnailPlace : <div> Loading... </div>}
      </div>
    </div>
    );
  }

}

export default GooglePlaces;