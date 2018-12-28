import React from 'react';
import { withRouter } from "react-router-dom";
import "./Navigation.css";
import { Input, Placeholder, Menu } from 'semantic-ui-react';
import Profile from '../../Components/Profile';

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

  render() {
    const { activeItem } = this.state;
    //verticalAlign="middle" centered

    return (
      <div>
        <Menu secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='history'
            active={activeItem === 'history'}
            onClick={this.handleItemClick}
          />
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
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item>
              <Profile/>
            </Menu.Item>
            {/* <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            /> */}
          </Menu.Menu>
        </Menu>
        <Placeholder className="ad">
          <Placeholder.Image />
        </Placeholder>
      </div>
    );
  }
}

export default withRouter(Navigation);
