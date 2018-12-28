import React from "react";
import { Dropdown, Image } from 'semantic-ui-react';
import "./Profile.css";
import { connect } from 'react-redux';
import { logoutUser } from "../../Actions/userActions";
import { withRouter } from "react-router-dom";

class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userData: {
        // name: 'Nicholas Hoult',
        // age: 28,
        // city: 'California',
        // email: 'nicholas.hoult@gmail.com',
        image: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg'
      }
    };
  }

  handleItemClick = (e, { name }) => {
    console.log(e);
  }

  handleChange = (e, { value }) => {
    if (value === 'logout') {
      this.props.logoutUser();
      this.props.history.push('/login');
    }
  }

  render() {
    let {data} = this.props.user;

    let trigger = (
      <span>
        <Image avatar src={this.state.userData.image} /> {data.name}
      </span>
    )

    let options = [
      { key: 'user', text: 'Account', icon: 'user', value: 'account' },
      { key: 'settings', text: 'Settings', icon: 'settings', value: 'settings' },
      { key: 'sign-out', text: 'Sign Out', icon: 'sign out', value: 'logout' },
    ]

    return (
      <Dropdown
        trigger={trigger}
        options={options}
        pointing='top left'
        icon={null}
        onChange={this.handleChange}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userStore.user
  }
}

export default withRouter(connect(mapStateToProps, {logoutUser})(Profile));
