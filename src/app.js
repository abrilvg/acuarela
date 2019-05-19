import { connect } from 'react-redux';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AcuarelaDetail from './components/acuarelas/acuarelaDetail';
import About from './components/about';
import AcuarelaFormPage from './components/acuarelas/acuarelaFormPage';
import AcuarelasByUser from './components/acuarelas/acuarelasByUser';
import ErrorComponent from './components/error';
import Contact from './components/contact';
import Home from './components/home';
// import HistoryComponent from './Components/History';
import Login from './components/user/login';
import Navigation from './components/navigation';
import Signup from './components/user/signup';
import PrivateRoute from './components/common/privateRoute';

import './app.css';

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
            <PrivateRoute authed={this.props.user.isLoggedIn} path='/acuarelas-user' component={AcuarelasByUser} />
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

const mapStateToProps = state => ({
  user: state.userStore.user
})

export default connect(mapStateToProps, {})(App);