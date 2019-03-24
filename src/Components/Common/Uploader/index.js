import React from 'react';
import * as firebase from 'firebase';
import UploadImage from "./UploadImage";

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
      allFiles : {}
    }
  }

  handleOnChange (event) {

    const files = event.target.files;
    Array.from(files).forEach(file => {
      const storageRef = firebase.storage().ref(`pictures/${file.name}`);
      const task = storageRef.put(file);

      task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
          allFiles: {
            [file.name]: { ...percentage }
          }
        })
      }, (error) => {
        this.setState({
          message: `Error when uploading ${error}`
        });
      }, () => {
        let me = this;
        task.snapshot.ref.getDownloadURL().then(function(url) {
          me.setState({
            allFiles: {
              [file.name]: { url, percentage: 100 }
            }
          })
        });
      })
    });
  }

  render () {
    return (
      <div>
        <input type='file' onChange={this.handleOnChange.bind(this)} multiple/>
        {
          Object.keys(this.state.allFiles).map((key, index) => {
            console.log('### start ###', key, index, '############## end ##########');
            let file = this.state.allFiles[key];
            return (
              <UploadImage
                key={index}
                url={file? file.url: ''}
                percentage={file? file.percentage: 0}
              />
            );
          })
        }
      </div>
    )
  }
}

export default Uploader;
