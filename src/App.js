import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/home'
import Partners from './components/pages/partners';
import Users from './components/pages/users';
import Projects from './components/pages/projects';
import User from './components/pages/user';

function App() {
  
  return (
    <>
      <Router>
      <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/partners' exact component={Partners} />
          <Route path='/projects' exact component={Projects} />
          <Route path='/users' exact component={Users} />
          <Route path='/users/:repo' component={ User } />
        </Switch>
      <Footer />
      </Router>
      
    </>    
  );
}

export default App;
