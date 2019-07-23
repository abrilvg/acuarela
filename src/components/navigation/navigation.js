import { connect } from 'react-redux';
import { Menu, Icon, Container, Button } from 'semantic-ui-react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import Profile from '../user/profile/profile';

import './navigation.css';

class Navigation extends React.Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if (name === 'home') {
      this.props.history.push('/');
    } else {
      this.props.history.push(`/${name}`);
    }
  }

  handleUploadAcuarela = () => {
    this.props.history.push('/acuarela-form');
  }

  handleLogin = () => {
    this.props.history.push('/login');
  }

  handleSignup = () => {
    this.props.history.push('/signup');
  }

  render() {
    const { activeItem } = this.state;
    const { fixed, location } = this.props;

    if (location.pathname === '/login' || location.pathname === '/signup') {
      return ('');
    }

    return (
      <div
        // style={{ paddingBottom: '13px' }}
      >
        <Menu 
          fixed={fixed ? 'top' : null}
          inverted={!fixed}
          pointing={!fixed}
          secondary={!fixed}
          size='large'
        >
          <Container>
            <Menu.Item
              name='home'
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            />
            {/* <Menu.Item
              name='history'
              active={activeItem === 'history'}
              onClick={this.handleItemClick}
            /> */}
            <Menu.Item
              name='contact'
              active={activeItem === 'contact'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='about'
              active={activeItem === 'about'}
              onClick={this.handleItemClick}
            />
            {this.props.user.isLoggedIn? (
              <Menu.Menu position='right'>
                <Menu.Item>
                  {/*TODO <Input icon='search' placeholder='Search...' /> */}
                </Menu.Item>
                <Menu.Item>
                  <Icon name='upload' onClick={this.handleUploadAcuarela}/>
                </Menu.Item>
                <Menu.Item>
                  <Profile />
                </Menu.Item>
              </Menu.Menu>
            ): '' }
            {!this.props.user.isLoggedIn? (
              <Menu.Item position='right' style={{paddingTop:'25px'}}>
                <Button as='a' inverted={!fixed} onClick={this.handleLogin}>
                  Log in
                </Button>
                <Button as='a' 
                  inverted={!fixed} 
                  primary={fixed} 
                  style={{ marginLeft: '0.5em' }}
                  onClick={this.handleSignup}
                >
                  Sign Up
                </Button>
              </Menu.Item>
            ): '' }
          </Container>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userStore.user
})

export default withRouter(connect(mapStateToProps, {})(Navigation));
