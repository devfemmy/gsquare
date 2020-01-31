import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
// import LandingPage from './LandingPage/landingPage';
import LoginPage from './Login/login';
import ForgotPassword from './ForgotPassword/forgotPassword';
import Home from './Home/home';
import Profile from './Profile/profile';
import Notification from './Notifications/notification';
import Statements from './Statements/statements';
import ChangePassword from './Password/changePassword';
import PasswordSuccess from './Password/passwordSuccess';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './pageTransitions/slideTransition.scss';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevDepth: this.getPathDepth(this.props.location)
    };
  }
  componentWillReceiveProps() {
    //When props are updated, update the current path 
    //props supplies us with the location object which has a router location info
    this.setState({ prevDepth: this.getPathDepth(this.props.location) });
  }
  getPathDepth(location) {
    let pathArr = location.pathname.split("/");
    pathArr = pathArr.filter(n => n !== "");
    return pathArr.length;
  }
    render() {
      const {location} = this.props;
      const currentKey = location.pathname.split("/")[1] || "/";
      //Specify the duration of the animation (on enter and on exit)
      const timeout = { enter: 800, exit: 400 };
      return (
        <div className="">
                 <TransitionGroup component="div" className="App">
                 <CSSTransition
                 key={currentKey}
                 timeout={timeout}
                 classNames="pageSlider"
                 mountOnEnter={false}
                 unmountOnExit={true}>
                  <div className={
                      this.getPathDepth(location) - this.state.prevDepth >= 0
                        ? "left"
                        : "right"
                    }>
                  <Switch location= {location}>
                 <Route path = '/' exact component= {LoginPage} />
                 <Route path = '/resetpassword' component= {ForgotPassword} />
                 <Route path = '/home' component= {Home} />
                 <Route path = '/profile' component= {Profile} />
                 <Route path = '/notification' component= {Notification} />
                 <Route path = '/statement' component= {Statements} />
                 <Route path = '/security' component= {ChangePassword} />
                 <Route path = '/success' component= {PasswordSuccess} />
                 </Switch>
                  </div>   
            
                 </CSSTransition>
                 </TransitionGroup>
          
     
    
       
    
        </div>
      );
    }

}

export default withRouter (App);
