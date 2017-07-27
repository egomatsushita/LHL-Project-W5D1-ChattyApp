import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      content: ""
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      let newMessage = { username: this.textInput.value, content: e.target.value};
      this.props.message(newMessage);
      e.target.value = ""
    }
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" type="text" placeholder="Your Name (Optional)" defaultValue={this.props.username}  ref={(input) => {this.textInput = input;}} />
        <input className="chatbar-message" type="text" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress.bind(this)} />
      </footer>
    );
  }
}

export default ChatBar;
