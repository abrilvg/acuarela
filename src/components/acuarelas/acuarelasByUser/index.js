import { connect } from 'react-redux';
import React from 'react';
import { Container } from 'semantic-ui-react';

import AcuarelasList from '../acuarelasList';
import { getAcuarelasByCurrentUser, getAllAcuarelas } from '../../../actions/acuarelaActions';
import { getAcuarelasByUser } from '../../../selectors/acuarelaSelectors';

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
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  acuarelas: getAcuarelasByUser(state.acuarelaStore, state.userStore.user.data._id),
  loading: state.acuarelaStore.loading
})

const mapDispatchToProps = dispatch => ({
  getAcuarelasByCurrentUser: () => getAcuarelasByCurrentUser(dispatch),
  getAllAcuarelas: () => getAllAcuarelas(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AcuarelasByUser);
