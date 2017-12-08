import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider).then((result) => {
      this.props.setUser(result.user);
      this.setState({ signedIn: true })
    });
  }
  signOut() {
    this.props.firebase.auth().signOut().then(() => {
      this.props.setUser('');
      this.setState({ signedIn: false })
    });
  }
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }
  render() {
      if(!this.state.signedIn) {
        return (<div>
          <h1>Guest</h1>
          <button onClick={this.signIn}>Sign in</button>
          </div> );
      } else {
        return (<div>
          <h1>{this.props.user.displayName}</h1>
            <button onClick={this.signOut}>Sign out</button>
        </div>);
      }
  }
}
export default User;
