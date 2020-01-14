import React from 'react';
import {Route} from 'react-router-dom'
// import LandingPage from './LandingPage/landingPage';
import LoginPage from './Login/login';
import ForgotPassword from './ForgotPassword/forgotPassword';
import Home from './Home/home';
import Profile from './Profile/profile';
import Notification from './Notifications/notification';
import Statements from './Statements/statements';
import ChangePassword from './Password/changePassword';
import PasswordSuccess from './Password/passwordSuccess';


function App() {
  return (
    <div className="">
      <Route path = '/' exact component= {LoginPage} />
      {/* <Route path = '/login' component= {LoginPage} /> */}
      <Route path = '/resetpassword' component= {ForgotPassword} />
      <Route path = '/home' component= {Home} />
      <Route path = '/profile' component= {Profile} />
      <Route path = '/notification' component= {Notification} />
      <Route path = '/statement' component= {Statements} />
      <Route path = '/security' component= {ChangePassword} />
      <Route path = '/success' component= {PasswordSuccess} />
    </div>
  );
}

export default App;
