import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';

import AcuarelaForm from '../AcuarelaForm';
import { saveAcuarela } from '../../../Actions/acuarelaActions';

//import './AcuarelaFormPage.css';

//TODO also to update acuarela
class AcuarelaFormPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = (acuarela) => {
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
        onSubmit={this.submit}
        error={this.props.error}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    // acuarela: state.acuarelaStore.acuarela,
    error: state.acuarelaStore.error,
    loading: state.acuarelaStore.loading
  }
}

export default connect(mapStateToProps, {saveAcuarela})(withRouter(AcuarelaFormPage));
