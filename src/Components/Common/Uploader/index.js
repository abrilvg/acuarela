
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { Form} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import IDGenerator from '../IdGenerator';
import {
  errorLoadingPictures,
  successLoadingPictures,
  startLoadingPictures
} from '../../../Actions/acuarelaActions';

//TODO how to handle this?
var config = {
  apiKey: "AIzaSyBD4K23nKLiuNpiBVjiy4oTVABNL3KHiAA",
  authDomain: "acuarela-30846.firebaseapp.com",
  databaseURL: "https://acuarela-30846.firebaseio.com",
  projectId: "acuarela-30846",
  storageBucket: "acuarela-30846.appspot.com",
  messagingSenderId: "375639310472"
};
firebase.initializeApp(config);

class Uploader extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor () {
    super();
    this.state = {
      files: [],
      allAmount: 0 //amount of files that will be loaded
    }
  }

  handleChange = (event) => {
    const files = event.target.files;

    this.setState({
      allAmount: this.state.allAmount + files.length
    });
    this.props.startLoadingPictures();

    Array.from(files).forEach(file => {
      const fileName = IDGenerator.generateId();
      const storageRef = firebase.storage().ref(`pictures/${fileName}`);
      const task = storageRef.put(file);

      task.on('state_changed', (snapshot) => {
        //TODO do something with the percentage
        // let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }, (error) => {
        this.props.errorLoadingPictures(`Error when uploading ${error}`);
      }, () => {
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          //here we are duplicanting save downloadURL in parent and current state
          this.setState({
            files: [...this.state.files, downloadURL ]
          }, () => {
            if (this.state.files.length === this.state.allAmount) {
              this.props.successLoadingPictures();
            }
          })
          //to save in db
          this.props.onChange({
            name: fileName,
            url: downloadURL
          });
        });
      })
    });
  }

  render () {
    return (
      <div>
        <Form.Input
          label={this.props.label}
          onChange={this.handleChange}
          type='file'
          multiple
          required
        />
        {
          this.state.files.map((url, index) => {
            return (
              // <Progress percent={this.props.percentage} progress success={this.props.percentage === 100}></Progress>
              <img key={index} width='190' src={url} alt={`Acuarela nro ${index}`} />
            );
          })
        }
      </div>
    )
  }
}
function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps, {startLoadingPictures, successLoadingPictures, errorLoadingPictures})(Uploader);
