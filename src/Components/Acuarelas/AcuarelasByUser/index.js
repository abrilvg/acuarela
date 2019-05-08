import { connect } from 'react-redux';
import React from 'react';
import { Container } from 'semantic-ui-react';

import AcuarelasList from '../AcuarelasList';
import { getAcuarelasByCurrentUser, clearAcuarelasError } from '../../../Actions/acuarelaActions';
import { logoutUser } from '../../../Actions/userActions';

class AcuarelasByUser extends React.Component {

  componentWillMount = () => {
    //TODO other place?
    this.props.getAcuarelasByCurrentUser();
  }

  //TODO ask Tobby if it is ok to put the same acuarelas all users acuarelas and other time just current acuarelas
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
    acuarelas: state.acuarelaStore.acuarelas,
    loading: state.acuarelaStore.loading,
    error: state.acuarelaStore.error
  }
}

export default connect(mapStateToProps, {getAcuarelasByCurrentUser, logoutUser, clearAcuarelasError})(AcuarelasByUser);
