import { connect } from 'react-redux';
import React from 'react';
import { Container } from 'semantic-ui-react';

import AcuarelasList from '../acuarelas/acuarelasList';
import { getAllAcuarelas } from '../../actions/acuarelaActions';

import './home.css';

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
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  acuarelas: state.acuarelaStore.acuarelas,
  loading: state.acuarelaStore.loading,
})

const mapDispatchToProps = dispatch => ({
  getAllAcuarelas: () => getAllAcuarelas(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
