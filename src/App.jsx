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

  }

  handleNewMessages(newMessage) {
    newMessage.id = this.state.messages.length + 1;
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages});

    let msg = {
      type: "message",
      text: newMessage.content,
      id: newMessage.id,
      user: newMessage.username
    }
    console.log("handle message >>> ", msg)
    this.ws.send(JSON.stringify(msg))
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    /*setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);*/


    this.ws = new WebSocket(this.socket);
    this.ws.onmessage = (event) => {
      console.log("Connected to server");
      const receivedMessage = JSON.parse(event.data);
      let updatedMessage = this.state.messages.concat(receivedMessage);
      this.setState({messages: updatedMessage})
      console.log("received message >>> ", updatedMessage);

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
        <ChatBar username={this.state.currentUser.name} message={this.handleNewMessages.bind(this)} />
      </div>
    );
  }
}

export default App;
