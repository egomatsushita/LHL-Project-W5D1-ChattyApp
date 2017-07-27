import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("Rendering <Message/>");
    const messageProps = this.props.messageProps;
    const username = messageProps.user;
    const aMessage = messageProps.text;
    console.log(" MESSAGE PROPS ", messageProps)
    console.log("MESSAGE PROPS TYPE", messageProps.type);

    if (messageProps.type === "incomingMessage") {
      return (
        <div className="message">
          <span className="message-username">{username}</span>
          <span className="message-content">{aMessage}</span>
        </div>
      );
    } else  {
      return (
        <div className="message system">{aMessage}</div>
      );
    }
  }
}

export default Message;

