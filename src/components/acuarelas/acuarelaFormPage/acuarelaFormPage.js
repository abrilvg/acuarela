import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';

import AcuarelaForm from '../acuarelaForm/acuarelaForm';
import { saveAcuarela } from '../../../actions/acuarelaActions';

//import './AcuarelaFormPage.css';

//TODO also to update acuarela
class AcuarelaFormPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (acuarela) => {
    this.props.saveAcuarela(acuarela);
    this.props.history.push('/');

    /*if(!contact._id) {
      return this.props.saveContact(contact)
        .then(response => this.setState({ redirect:true }))
        .catch(err => {
           throw new SubmissionError(this.props.errors)
         })
    } else {
      return this.props.updateContact(contact)
        .then(response => this.setState({ redirect:true }))
        .catch(err => {
           throw new SubmissionError(this.props.errors)
         })
    }*/
  }

  render() {
    return (
      <AcuarelaForm
        // acuarela={this.props.acuarela}
        loading={this.props.loading}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  // acuarela: state.acuarelaStore.acuarela,
  loading: state.acuarelaStore.loading
})

const mapDispatchToProps = dispatch => ({
  saveAcuarela: (acuarela) => saveAcuarela(dispatch, acuarela)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AcuarelaFormPage));
