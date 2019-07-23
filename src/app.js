import { connect } from 'react-redux';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AcuarelaDetail from './components/acuarelas/acuarelaDetail/acuarelaDetail';
import About from './components/about';
import AcuarelaFormPage from './components/acuarelas/acuarelaFormPage/acuarelaFormPage';
import AcuarelasByUser from './components/acuarelas/acuarelasByUser/acuarelasByUser';
import ErrorComponent from './components/error';
import Contact from './components/contact';
import Home from './components/home/home';
// import HistoryComponent from './Components/History';
import Login from './components/user/login/login';
import Navigation from './components/navigation/navigation';
import Signup from './components/user/signup/signup';
import PrivateRoute from './components/common/privateRoute/privateRoute';

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
          <Navigation />
          <Switch>
            <Route path='/' component={Home} exact />
            {/* <PrivateRoute authed={this.props.user.isLoggedIn} path='/history' component={HistoryComponent} /> */}
            <Route path='/about' component={About} />
            <Route path='/acuarela-detail/:id' component={AcuarelaDetail} />
            <PrivateRoute authed={this.props.user.isLoggedIn} path='/acuarelas-user' component={AcuarelasByUser} />
            <Route path='/contact' component={Contact} />
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
