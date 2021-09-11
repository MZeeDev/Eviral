import React from 'react';
import Navbar from './components/Navbar';

import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import './App.css';
import Home from './components/pages/home';
import Platform from './components/pages/platform';
import MyProfile from './components/pages/myprofile';
import Projects from './components/pages/projects';
import ProjectData from './components/ProjectData';
import Profiles from './components/pages/profiles';
import UserProfilePage from './components/UserProfileData';
import ChatPage from './components/ChatPage';


function App() {
  const history = useHistory();
  
  return (
    <>
      <Router history= {history}>
      <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/platform' exact component={Platform} />
          <Route path='/projects' exact component={Projects} />
          <Route path='/projects/:title'>
            <ProjectData />
          </Route>
          <Route path='/profiles' exact component={Profiles} />
          <Route path='/profiles/:username'>
            <UserProfilePage />
          </Route>
          <Route path='/myprofile' exact component={MyProfile} />
          <Route path='/myprofile/projects/:title'>
            <ProjectData />
          </Route>
          <Route path='/chat' exact component={ChatPage} />
        </Switch>      
      </Router>
      
    </>    
  );
}

export default App;
