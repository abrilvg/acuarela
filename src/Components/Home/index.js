import { connect } from 'react-redux';
import React from 'react';
import { Container } from 'semantic-ui-react';

import AcuarelasList from '../Acuarelas/AcuarelasList';
import { getAllAcuarelas, clearAcuarelasError } from '../../Actions/acuarelaActions';
import { logoutUser } from '../../Actions/userActions';

import './Home.css';

class Home extends React.Component {

  componentWillMount = () => {
    //TODO other place?
    this.props.getAllAcuarelas();
  }

  render() {
    return (
      <Container style={{paddingTop:'20px'}}>
        {/* <Header as='h2'>Francisco Tomé</Header>&nbsp;<span>127 results</span> */}
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

const mapStateToProps = state => ({
  acuarelas: state.acuarelaStore.acuarelas,
  loading: state.acuarelaStore.loading,
  error: state.acuarelaStore.error
})

const mapDispatchToProps = dispatch => ({
  getAllAcuarelas: () => getAllAcuarelas(dispatch),
  logoutUser: () => logoutUser(dispatch),
  clearAcuarelasError: () => clearAcuarelasError(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
