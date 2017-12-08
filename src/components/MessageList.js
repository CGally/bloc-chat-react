import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: ''
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.setMessage = this.setMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  setMessage(e) {
    this.setState({newMessage: e.target.value});
  }
  sendMessage(e) {
    e.preventDefault();
    if(this.props.currentRoom === undefined || this.props.user === null) {
      this.setState({newMessage: ''});
    } else {
      this.messagesRef.push({
        username: this.props.user.displayName,
        roomId: this.props.currentRoom,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        content: this.state.newMessage
      });
    }
    this.setState({newMessage: ''});
  }
  componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat( message ) });
     });
  }
  render() {
    return (
      <div>
        <ul>
          {
            this.state.messages.map((message) => {
              if(message.roomId === this.props.currentRoom) {
                return <li key={message.key} >{ message.username } : { message.content }</li>
              } else {
                return null;
              }
            })
          }
        </ul>
        <form onSubmit={this.sendMessage}>
          <input type='text' value={this.state.newMessage} onChange={this.setMessage}/>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}
export default MessageList;
