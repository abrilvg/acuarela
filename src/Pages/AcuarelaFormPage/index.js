import React from "react";
//import "./PictureDetailForm.css";
import PropTypes from 'prop-types';
import AcuarelaForm from "../../Components/AcuarelaForm";
import { connect } from 'react-redux';
import { saveAcuarela } from "../../Actions/acuarelaActions";

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
    console.log('submit acuarela', acuarela);
    this.props.saveAcuarela(acuarela);
    this.close();

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
        <AcuarelaForm contact={this.props.acuarela} loading={this.props.loading} onSubmit={this.submit} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    acuarela: state.acuarelaStore.acuarela,
    errors: state.acuarelaStore.errors,
    loading: state.acuarelaStore.loading
  }
}

export default connect(mapStateToProps, {saveAcuarela})(AcuarelaFormPage);
