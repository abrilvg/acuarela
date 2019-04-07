import React from "react";
//import "./PictureDetailForm.css";
import PropTypes from 'prop-types';
import AcuarelaForm from "../../Components/AcuarelaForm";
import { connect } from 'react-redux';
import { saveAcuarela } from "../../Actions/acuarelaActions";
import { withRouter } from "react-router-dom";

class AcuarelaFormPage extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired
  };
  static defaultProps = {
    open: false
  };

  constructor(props) {
    super(props);
    this.state = {
      name: 'pepe'
    };
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
      <div>
        {this.state.name}
        <AcuarelaForm
          contact={this.props.acuarela}
          loading={this.props.loading}
          onSubmit={this.submit}
          error={this.props.error}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    acuarela: state.acuarelaStore.acuarela,
    error: state.acuarelaStore.error,
    loading: state.acuarelaStore.loading
  }
}

export default connect(mapStateToProps, {saveAcuarela})(withRouter(AcuarelaFormPage));
