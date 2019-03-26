import React, { Component } from 'react';

import './App.css';
import MonitoringPage from './components/MonitoringPage';
import { NavContextProvider } from './components/Contexts/NavContext';
import Navigation from './components/Navigation'
import Header from './components/Header';
import axios from 'axios'

  
class App extends Component {
  constructor() {
    super();
    this.state = { timeout: false };
  }
 
  componentDidMount() {
    setInterval(() => {
      this.setState({ timeout: true });
    }, 30000);

  }

  render() {
    return (
      <div className="App">
      <Header/>
      <NavContextProvider>
        
       <MonitoringPage timeout={this.state.timeout} />
       <Navigation />
      
      </NavContextProvider>
      </div>
    );
  }
}

export default App;
