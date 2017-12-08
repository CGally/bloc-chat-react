import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.setRoom = this.setRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }
  setRoom(e) {
    this.setState({newRoomName: e.target.value});
  }
  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push( {name: this.state.newRoomName} );
    this.setState({newRoomName: ''})
  }
  chooseRoom(room) {
    this.props.setCurrentRoom(room);
  }
  deleteRoom(roomKey, index) {
    const room = this.props.firebase.database().ref('rooms/' + roomKey);
    room.remove();
    let arr = this.state.rooms;
    arr.splice( index, 1 )
    this.setState({ rooms: arr });
  }
  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) });
     });
  }
  render() {
    return (
      <div>
        <h1>Bloc Chat</h1>
        <h2>Chat Rooms</h2>
        <ul>
          {
            this.state.rooms.map((chatRoom, index) => {
              return <li key={chatRoom.key} onClick={ (e) => this.chooseRoom(chatRoom) }>{ chatRoom.name }<button onClick={ () => this.deleteRoom(chatRoom.key, index)}>Delete room</button></li>
            })
          }
        </ul>
        <form onSubmit={this.createRoom}>
          <label>Enter room name</label>
          <input type='text' value={this.state.newRoomName} onChange={this.setRoom}/>
          <button type='submit'>Create room</button>
        </form>
      </div>
    );
  }
}
export default RoomList;
