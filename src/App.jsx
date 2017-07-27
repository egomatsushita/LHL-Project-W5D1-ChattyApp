import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: {name: "Anonymous"},
                  messages: []
                  };
    this.socket = "ws://localhost:3001";
    this.handleNewMessages = this.handleNewMessages.bind(this);
    this.handleNewNotifications = this.handleNewNotifications.bind(this);

  }


  handleNewMessages(newMessage) {
    // newMessage.id = this.state.messages.length + 1;
    const messages = this.state.messages.concat(newMessage);
    console.log("MESSAGEs >>> ", messages)

    let msg = {
      type: "postMessage",
      text: newMessage.content,
      id: newMessage.id,
      user: newMessage.username
    }

    this.ws.send(JSON.stringify(msg))
  }

  handleNewNotifications(newNotification) {
    console.log("NEW NOTIFICATION >>> ", newNotification)

    this.state.messages.concat(newNotification);
    this.state.currentUser.name = newNotification.username;

    let msg = {
      type: "postNotification",
      text: newNotification.notification,
      id: newNotification.id,
      user: newNotification.username
    }

    this.ws.send(JSON.stringify(msg))
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.ws = new WebSocket(this.socket);

    this.ws.onopen = (event) => {
      console.log("Connected to server");
    }

    this.ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      let updatedMessage = this.state.messages.concat(receivedMessage);
      this.setState({messages: updatedMessage})
    };

  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar username={this.state.currentUser.name} message={this.handleNewMessages} notification={this.handleNewNotifications} />
      </div>
    );
  }
}

export default App;
