import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("Rendering <MessageList/>");
    const messages = this.props.messages;

    const messageList = messages.map((message, index) => {
      return <Message messageProps={message} key={index} />
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
