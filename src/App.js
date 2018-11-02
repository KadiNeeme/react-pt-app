import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import Calendar from './components/Calendar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <span className="App-title">Personal Trainer database</span>
        </header>
         
        <BrowserRouter baseline>
          <div>
             <Navbar />
        

            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/customers" component={Customers}/>
              <Route path="/trainings" component={Trainings}/>
              <Route path="/calendar" component={Calendar}/>
            </Switch>

          </div>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
