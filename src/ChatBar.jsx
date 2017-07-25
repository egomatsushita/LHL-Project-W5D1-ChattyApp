import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    // this.state = {username: document.getElementsByClassName("chatbar-username")[0].val(),
                  // message: document.getElementsByClassName("chatbar-message")[0].val()}
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" type="text" placeholder={this.props.username} />
        <input className="chatbar-message" type="text" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;

