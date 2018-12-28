import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from "./Pages/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import ErrorComponent from "./Components/Error";
import Navigation from "./Pages/Navigation";
import HistoryComponent from "./Components/History";
import Login from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";
import PrivateRoute from "./Components/Common/PrivateRoute";
import { connect } from 'react-redux';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    let navigation;
    if (this.props.user.isLoggedIn) {
      navigation = <Navigation/>;
    }

    return (
      <BrowserRouter>
        <div className="main">
          {navigation}
          <Switch>
            <PrivateRoute authed={this.props.user.isLoggedIn} path="/" component={Home} exact/>
            <PrivateRoute authed={this.props.user.isLoggedIn} path="/history" component={HistoryComponent} />
            <PrivateRoute authed={this.props.user.isLoggedIn} path="/about" component={About} />
            <PrivateRoute authed={this.props.user.isLoggedIn} path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route component={ErrorComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userStore.user
  }
}

export default connect(mapStateToProps, {})(App);
