import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Provider from './context';
import './App.css';
import Contacts from './components/Contacts/Contacts';
import Header from './components/Header/Header';
import About from './components/pages/About';
import AddContact from './components/Contacts/AddContact/AddContact';
import NotFound from './components/pages/Notfound';
import EditContact from './components/EditContact';
// const React = require('react');

class App extends React.Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route path="/contacts/add" component={AddContact} />
                <Route path="/about" component={About} />
                <Route path="/edit/contact/:id" component={EditContact} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
