import { connect } from 'react-redux';
import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

import AcuarelasList from '../acuarelasList/acuarelaList';
import { getAcuarelasByCurrentUser, getAllAcuarelas } from '../../../actions/acuarelaActions';
import { getAcuarelasByUser } from '../../../selectors/acuarelaSelectors';

class AcuarelasByUser extends React.Component {

  componentWillMount = () => { }

  render() {
    return (
      <Segment style={{ minHeight: 500, padding: '50px' }}>
        <Container style={{paddingTop:'20px'}}>
          <AcuarelasList
            acuarelas={this.props.acuarelas}
            loading={this.props.loading}
          />
        </Container>
      </Segment>
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
