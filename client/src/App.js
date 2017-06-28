import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

class App extends Component {

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    return fetch(`/users`, {
      credentials: 'include'
    })
    .then(response => {
      console.log(response);
      return response.json();
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2> Welcome to Adaptabl</h2>
        </div>
        <div className="col-sm-4 col-sm-offset-4" >
          <Form horizontal>
          <FormGroup  controlId="formHorizontalSelect">
            <ControlLabel className="form-label">Select a city</ControlLabel>
            <FormControl componentClass="select" name="grade"  placeholder="select">
              <option value="select">select</option>
              <option value="one">testing</option>
              <option value="two">testing2</option>
              <option value="three">testing3</option>
            </FormControl>
            <FormControl.Feedback />
          </FormGroup>
        </Form>
        </div>
      </div>
    );
  }
}

export default App;
