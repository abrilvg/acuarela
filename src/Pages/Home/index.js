import React from "react";
import { Grid, Header, Button } from 'semantic-ui-react';
import "./Home.css";
import { connect } from 'react-redux';
import AcuarelasList from "../../Components/AcuarelasList";
import { getAllAcuarelas, cleanAcuarelas } from "../../Actions/acuarelaActions";
import { logoutUser } from "../../Actions/userActions";
import { withRouter } from "react-router-dom";

class Home extends React.Component {

  componentWillMount = () => {
    this.props.getAllAcuarelas();
  }

  addAcuarela = () => {
    this.props.history.push('/acuarela-form');
  }

  render() {
    return (
      <div className="home">
        <Grid.Row>
          <Header as='h2'>Francisco Tomé</Header>&nbsp;<span>127 results</span>
          <Button onClick={this.addAcuarela}>Add acuarela</Button>
        </Grid.Row>
        <AcuarelasList
          acuarelas={this.props.acuarelas}
          loading={this.props.loading}
          error={this.props.error}
          logoutUser={this.props.logoutUser}
          cleanAcuarelas={this.props.cleanAcuarelas}
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

export default connect(mapStateToProps, {getAllAcuarelas, logoutUser, cleanAcuarelas})(withRouter(Home));
