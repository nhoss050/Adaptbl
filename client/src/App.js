import React, { Component } from 'react';
import logo from './logo.svg';


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
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Portal de Automacao Usina 2</h2>
        </div>

      </div>
    );
  }
}

export default App;
