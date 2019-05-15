import { connect } from 'react-redux';
import React from 'react';
import { Container } from 'semantic-ui-react';

import AcuarelasList from '../AcuarelasList';
import { getAcuarelasByCurrentUser, clearAcuarelasError, getAllAcuarelas } from '../../../Actions/acuarelaActions';
import { logoutUser } from '../../../Actions/userActions';
import { getAcuarelasByUser } from '../../../Selectors/acuarelaSelectors';

class AcuarelasByUser extends React.Component {

  componentWillMount = () => {
    //TODO other place?
    // this.props.getAcuarelasByCurrentUser();
    //should work without having to load again, it supposed store was already filled
    this.props.getAllAcuarelas();
  }

  render() {
    return (
      <Container style={{paddingTop:'20px'}}>
        <AcuarelasList
          acuarelas={this.props.acuarelas}
          loading={this.props.loading}
          error={this.props.error}
          logoutUser={this.props.logoutUser}
          clearAcuarelasError={this.props.clearAcuarelasError}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    acuarelas: getAcuarelasByUser(state.acuarelaStore, state.userStore.user.data._id),
    loading: state.acuarelaStore.loading,
    error: state.acuarelaStore.error
  }
}

export default connect(mapStateToProps, {
  getAcuarelasByCurrentUser,
  logoutUser,
  clearAcuarelasError,
  getAllAcuarelas
})(AcuarelasByUser);
