import React from 'react';
import 'react-toastify/dist/ReactToastify.css'; // import first
import { ToastContainer, toast } from 'react-toastify'; // then this
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import './App.css';
// import io from 'socket.io-client'
import MyProfile from './components/pages/myprofile';
import Projects from './components/pages/projects';
import Wallet from './components/pages/wallet';
import ProjectData from './components/ProjectData';
import Home from './components/pages/home';
import Profiles from './components/pages/profiles';
import UserProfilePage from './components/ProfilePage';
import ChatPage from './components/ChatPage';
import TokenSwap from './components/TokenSwap';
import HelmetMetaData from './components/HelmetMetaData';
import Header from './components/V2/Header';
import Footer from './components/V2/Footer';
import Homepage from './components/V2/Homepage';
import TokenPrices from './components/TokenPrices';
import Feed from './components/feed/index';
import MyFeed from './components/feed/myFeed';
import MyLikes from './components/feed/myLikes';
import MyShares from './components/feed/myShares';


function App() {
  const history = useHistory();

  return (
    <div>


      <HelmetMetaData></HelmetMetaData>

      <ToastContainer />
      <Router history={history}>

        <Header />
        <TokenPrices />
        <Switch id="website-contents">
          <Route path='/' exact component={Home} />
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
          <Route path='/wallet' exact component={Wallet} />
          <Route path='/swap' exact component={TokenSwap} />
          <Route path='/homepage' exact component={Homepage} />
          <Route path='/feed' exact component={Feed} />
          <Route path='/myfeed' exact component={MyFeed} />
          <Route path='/mylikes' exact component={MyLikes} />
          <Route path='/myshares' exact component={MyShares} />
        </Switch>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
