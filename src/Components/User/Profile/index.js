import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { logoutUser } from '../../../Actions/userActions';

import './Profile.css';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleItemClick = (e, { value }) => {
    if (value === 'logout') {
      this.props.logoutUser();
      this.props.history.push('/login');
    }
  }

  render() {
    let {name} = this.props.user.data;

    let trigger = (
      <svg width="35" height="35">
        <circle cx="17" cy="17" r="17" fill="#aeaeae" />
        <text x="50%" y="50%" textAnchor="middle" fill="white" fontSize="20px" dy=".3em">
          {name.toUpperCase().charAt(0)}
        </text>
        Sorry, your browser does not support inline SVG.
      </svg>
    );

    const options = [
      {
        key: 'user',
        text: (
          <span>
            Signed in as <strong>{name}</strong>
          </span>
        ),
        disabled: true,
      },
      { key: 'settings', text: 'Settings', value: 'settings' },
      { key: 'myAcuarelas', text: 'My acuarelas', value: 'myAcuarelas' },
      { key: 'logout', text: 'Sign Out', value: 'logout' },
    ];

    return (
      <Dropdown
        trigger={trigger}
        options={options}
        pointing='top right'
        icon={null}
        onChange={this.handleItemClick}
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
