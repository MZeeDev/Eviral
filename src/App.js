import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home'
import Partners from './components/pages/partners';
import LandingPage from './components/LandingPage';
import { useMoralis } from "react-moralis";

function App() {
  const { authenticate, isAuthenticated, user } = useMoralis();
  if (!isAuthenticated) {
    return (
      <Router>
        <LandingPage />
      </Router>
    );
  }

  return (
    <>
      <Router>
      <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/partners' exact component={Partners} />
        </Switch>
      </Router>
      
    </>    
  );
}

export default App;
