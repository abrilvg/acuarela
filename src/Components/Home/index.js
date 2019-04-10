import { connect } from 'react-redux';
import React from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import AcuarelasList from '../Acuarelas/AcuarelasList';
import { getAllAcuarelas, clearAcuarelasError } from '../../Actions/acuarelaActions';
import { logoutUser } from '../../Actions/userActions';

import './Home.css';

class Home extends React.Component {

  componentWillMount = () => {
    //TODO other place?
    this.props.getAllAcuarelas();
  }

  handleAddAcuarela = () => {
    this.props.history.push('/acuarela-form');
  }

  render() {
    return (
      <div>
        <Grid.Row>
          <Header as='h2'>Francisco Tomé</Header>&nbsp;<span>127 results</span>
          <Button onClick={ this.handleAddAcuarela }>Add acuarela</Button>
        </Grid.Row>
        <AcuarelasList
          acuarelas={this.props.acuarelas}
          loading={this.props.loading}
          error={this.props.error}
          logoutUser={this.props.logoutUser}
          clearAcuarelasError={this.props.clearAcuarelasError}
        />
      </div>
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

export default connect(mapStateToProps, {getAllAcuarelas, logoutUser, clearAcuarelasError})(withRouter(Home));
