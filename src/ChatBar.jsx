import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      if (e.target) {
        let newMessage = { username: this.props.username, content: e.target.value };
        this.props.message(newMessage);
        e.target.value = ""
      }
    }
  }

  handleUsername(event) {
    if (event.key === 'Enter') {
      let aUsername = event.target.value;
      let notificationMessage = { username: aUsername, notification: `User ${this.props.username} changed to User ${aUsername}`};
      this.props.notification(notificationMessage);
    }
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" type="text" placeholder="Your Name (Optional)" defaultValue={this.props.username} onKeyPress={this.handleUsername.bind(this)} />
        <input className="chatbar-message" type="text" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress.bind(this)} />
      </footer>
    );
  }
}

export default ChatBar;
