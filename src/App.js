import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
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
      currentRoom: '',
      user: '',
      signedIn: false
    };
    this.setCurrentRoom = this.setCurrentRoom.bind(this);
    this.setUser = this.setUser.bind(this);
    this.changeSignIn = this.changeSignIn.bind(this);
  }
  componentDidMount() {
    firebase.auth().signOut().then(() => {
      this.setUser('');
      this.setState({ signedIn: false })
    });
  }
  changeSignIn(current) {
    this.setState({ signedIn: current })
  }
  setCurrentRoom(room) {
  this.setState({ currentRoom: room })
  }
  setUser(user) {
    this.setState({ user: user})
  }
  render() {
    return (
      <div>
        <User firebase={ firebase } setUser={this.setUser} user={this.state.user} changeSignIn={this.changeSignIn} signedIn={this.state.signedIn}/>
        <RoomList firebase={ firebase } setCurrentRoom={this.setCurrentRoom} />
        <div>{ this.state.currentRoom.name }</div>
        <MessageList firebase={firebase} currentRoom={this.state.currentRoom.key} user={this.state.user}/>
      </div>
    );
  }
}

export default App;
