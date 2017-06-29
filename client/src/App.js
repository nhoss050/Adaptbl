import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import GooglePlaces from './google-places';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  handleChange = (e) => {
    const input = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    console.log(value)
    if (value == ('vancouver' || 'burnaby' || 'richmond') ){
      this.setState({
        value
      })
    } else {
      this.setState({
        typeFood: value
      })
    }
    this.getLatLng(e.target.value);

  }

  getLatLng = (name) => {
    if (name == 'vancouver' ){
      this.setState({
        lat: 49.278101,
        lng: -123.122190,
        category: ['Vietnamese Food', 'Greek Food']
      })
    }
    if (name == 'burnaby'){
      this.setState({
        lat: 49.248378,
        lng: -122.980383,
        category: ['Chinese Food', 'Italian Food']
      })
    }
    if (name == 'richmond'){
      this.setState({
        lat: 49.174856,
        lng: -123.133577,
        category: ['Iranian Food', 'Fast Food']
      })
    }
  }



  render() {

      const types = this.state.category ? this.state.category.map( elem => {
        return (
          <option key={elem} value={elem}>{elem}</option>
        );
      }) :  <option value=""></option>;

    return (
      <div className="App">
        <div className="App-header">
          <h2> Welcome to Adaptabl</h2>
        </div>
        <div className="row" >
          <div className="col-sm-4 col-sm-offset-1" >
            <Form horizontal>
            <FormGroup  controlId="formHorizontalSelect" onChange={this.handleChange}>
              <ControlLabel className="form-label">Select a city</ControlLabel>
              <FormControl componentClass="select" name="grade"  placeholder="select">
                <option value="select"></option>
                <option value="vancouver">Vancouver</option>
                <option value="burnaby">Burnaby</option>
                <option value="richmond">Richmond</option>
              </FormControl>
              <FormControl.Feedback />
            </FormGroup>
            </Form>
          </div>
          <div className="col-sm-4 col-sm-offset-1" >
            <Form horizontal>
              <FormGroup  controlId="formHorizontalSelect" onChange={this.handleChange}>
                <ControlLabel className="form-label">Select a restaurant category</ControlLabel>
                <FormControl componentClass="select" name="grade"  placeholder="select">
                  <option value="select"></option>
                  {types}
                </FormControl>
                <FormControl.Feedback />
              </FormGroup>
            </Form>
          </div>
        </div>
        <GooglePlaces lat={this.state.lat} lng={this.state.lng} food={this.state.typeFood} />
      </div>
    );
  }
}

export default App;
