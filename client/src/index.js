import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';


import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
    </Switch>
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
