import { Menu, Icon } from 'semantic-ui-react';
import React from 'react';
import { withRouter } from 'react-router-dom';

import Profile from '../User/Profile';

import './Navigation.css';

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

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu secondary>
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
        </Menu>
      </div>
    );
  }
}

export default withRouter(Navigation);
