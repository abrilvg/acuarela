import React from "react";
import { Modal, Button } from 'semantic-ui-react';
//import "./PictureDetailForm.css";
import PropTypes from 'prop-types';
import AcuarelaForm from "../../Components/AcuarelaForm";
import { connect } from 'react-redux';
import { saveAcuarela } from "../../Actions/acuarelaActions";
import Uploader from '../../Components/Common/Uploader';

class AcuarelaFormPage extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    onCloseModal: PropTypes.func.isRequired,
  };
  static defaultProps = {
    open: false,
    onCloseModal: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      closeOnDimmerClick: false,
      name: 'pepe'
    };
  }


  close = () => {
    this.setState({
      closeOnDimmerClick: true
    });
    this.props.onCloseModal();
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
        <Modal
          open={this.props.open}
          closeOnDimmerClick={this.state.closeOnDimmerClick}
        >
          <Modal.Content>
            {this.state.name}
            <Uploader />
            <AcuarelaForm contact={this.props.acuarela} loading={this.props.loading} onSubmit={this.submit} />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
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
