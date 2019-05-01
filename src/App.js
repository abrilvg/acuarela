import { connect } from 'react-redux';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AcuarelaDetail from './Components/Acuarelas/AcuarelaDetail';
import About from './Components/About';
import AcuarelaFormPage from './Components/Acuarelas/AcuarelaFormPage';
import ErrorComponent from './Components/Error';
import Contact from './Components/Contact';
import Home from './Components/Home';
import HistoryComponent from './Components/History';
import Login from './Components/User/Login';
import Navigation from './Components/Navigation';
import Signup from './Components/User/Signup';
import PrivateRoute from './Components/Common/PrivateRoute';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <BrowserRouter>
        <div className='main'>
          {this.props.user.isLoggedIn && <Navigation />}
          <Switch>
            <PrivateRoute authed={this.props.user.isLoggedIn} path='/' component={Home} exact />
            {/* <PrivateRoute authed={this.props.user.isLoggedIn} path='/history' component={HistoryComponent} /> */}
            <PrivateRoute authed={this.props.user.isLoggedIn} path='/about' component={About} />
            <PrivateRoute authed={this.props.user.isLoggedIn} path='/acuarela-detail/:id' component={AcuarelaDetail} />
            <PrivateRoute authed={this.props.user.isLoggedIn} path='/contact' component={Contact} />
            <PrivateRoute authed={this.props.user.isLoggedIn} path='/acuarela-form' component={AcuarelaFormPage} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
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
