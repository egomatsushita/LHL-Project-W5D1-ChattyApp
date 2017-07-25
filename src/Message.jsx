import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("Rendering <Message/>");
    const username = this.props.user;
    const aMessage = this.props.message;

    return (
      <div className="message">
        <span className="message-username">{username}</span>
        <span className="message-content">{aMessage}</span>
      </div>
    );
  }
}

export default Message;

