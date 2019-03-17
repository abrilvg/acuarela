import React from 'react';
import * as firebase from 'firebase';
import { Progress, Button } from 'semantic-ui-react';

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

  constructor () {
    super()
    this.state = {
      uploadValue: 0
    }
  }

  handleOnChange (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`pictures/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        uploadValue: percentage
      })
    }, (error) => {
      this.setState({
        message: `Error when uploading ${error}`
      });
    }, () => {
      let me = this;
      task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        me.setState({
          picture: downloadURL
        })
      });
    })
  }

  render () {
    return (
      <div>
        <Progress percent={this.state.uploadValue} progress success={this.state.uploadValue === 100}></Progress>
        <input type='file' onChange={this.handleOnChange.bind(this)}/>
        <img width='90' src={this.state.picture} />
      </div>
    )
  }
}

export default Uploader;
