import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: {name: "Bob"},
                  messages: [
                    {
                      id: 1,
                      username: "Bob",
                      content: "Has anyone seen my marbles?",
                    },
                    {
                      id: 2,
                      username: "Anonymous",
                      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
                    }
                  ]
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

    this.connection.send(JSON.stringify(msg))
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);


    this.connection = new WebSocket(this.socket);
    this.connection.onopen = function() {
      console.log("Connected to server");
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
