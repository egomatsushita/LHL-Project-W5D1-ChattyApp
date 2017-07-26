import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("Rendering <MessgeList/>");
    const messages = this.props.messages;
    const messageList = messages.map((message) => {
      return <Message user={message.username} message={message.content} key={message.id}  />
    });

    return (
      <div>
        <main className="messages">
          {messageList}
        </main>
      </div>
    );
  }
}

export default MessageList;
