// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import Signup from './components/Signup';
import Upload from './components/Upload';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/upload" component={Upload} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
