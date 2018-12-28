import React from "react";
import { Grid, Header, Button } from 'semantic-ui-react';
import "./Home.css";
import { connect } from 'react-redux';
import AcuarelaFormPage from "../AcuarelaFormPage";
import AcuarelasList from "../../Components/AcuarelasList";
import { getAllAcuarelas, cleanAcuarelas } from "../../Actions/acuarelaActions";
import { logoutUser } from "../../Actions/userActions";

class Home extends React.Component {

  componentWillMount = () => {
    this.props.getAllAcuarelas();
  }

  state = {
    openNewPicture: false
  }

  closeConfigShow = () => () => this.setState({ openNewPicture: true })

  closeModal = () => this.setState({ openNewPicture: false })

  render() {
    return (
      <div className="home">
        <Grid.Row>
          <Header as='h2'>Francisco Tomé</Header>&nbsp;<span>127 results</span>
          <Button onClick={this.closeConfigShow()}>No Close on Dimmer Click</Button>
        </Grid.Row>
        <AcuarelasList
          acuarelas={this.props.acuarelas}
          loading={this.props.loading}
          error={this.props.error}
          logoutUser={this.props.logoutUser}
          cleanAcuarelas={this.props.cleanAcuarelas}
        />
        <AcuarelaFormPage open={this.state.openNewPicture} onCloseModal={this.closeModal}/>
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

export default connect(mapStateToProps, {getAllAcuarelas, logoutUser, cleanAcuarelas})(Home);
