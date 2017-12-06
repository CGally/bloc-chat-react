import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
var config = {
  apiKey: "AIzaSyCbbNgxfdDeM_in3oHZmEUzYJLsrxPnICA",
  authDomain: "bloc-chat-react-9d90a.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-9d90a.firebaseio.com",
  projectId: "bloc-chat-react-9d90a",
  storageBucket: "bloc-chat-react-9d90a.appspot.com",
  messagingSenderId: "742125275685"
};
firebase.initializeApp(config);
class App extends Component {
  render() {
    return (
      <div>
        <RoomList firebase={ firebase } />
      </div>
    );
  }
}

export default App;
