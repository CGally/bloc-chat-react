import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
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
  constructor(props) {
    super(props);
    this.state = {
      currentRoom: ''
    };
    this.setCurrentRoom = this.setCurrentRoom.bind(this);
  }
  setCurrentRoom(room) {
  this.setState({ currentRoom: room })
  }
  render() {
    return (
      <div>
        <RoomList firebase={ firebase } setCurrentRoom={this.setCurrentRoom} />
        <div>{ this.state.currentRoom.name }</div>
        <MessageList firebase={firebase} currentRoom={this.state.currentRoom.key}/>
      </div>
    );
  }
}

export default App;
