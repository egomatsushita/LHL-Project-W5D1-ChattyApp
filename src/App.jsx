import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: {name: "Anonymous"},
                  messages: [],
                  clients: {},
                  myself: "",
                  totalOfConnections: 0
                  };
    this.socket = "ws://localhost:3001";
    this.handleNewMessages = this.handleNewMessages.bind(this);
    this.handleNewNotifications = this.handleNewNotifications.bind(this);

  }

  handleNewMessages(newMessage) {
    const messages = this.state.messages.concat(newMessage);
    const clientId = this.state.clients.data.id;
    const clients = this.state.clients.data.connectedClients;
    const color = clients[clientId].color;

    let msg = {
      type: "postMessage",
      text: newMessage.content,
      id: newMessage.id,
      user: newMessage.username,
      color: color
    }

    this.ws.send(JSON.stringify(msg))
  }

  handleNewNotifications(newNotification) {
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
      let incoming = JSON.parse(event.data);
      let messages;
      switch (incoming.type) {
        case 'setup':
          this.setState({clients: incoming});
          // this.setState({clients: incoming.data.connectedClients});
          this.setState({myself: this.state.clients[incoming.data.id]});
          break;
        case 'connection':
          this.setState({totalOfConnections: incoming.totalOfConnections});
          break;
        case 'disconnection':
          this.setState({totalOfConnections: incoming.totalOfConnections});
          delete this.state.clients[incoming.data.id];
          break;
        case 'incomingMessage':
        case 'incomingNotification':
          let updatedMessage = this.state.messages.concat(incoming);
          this.setState({messages: updatedMessage})
        default:
          break;
      }
    }
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="connections">{this.state.totalOfConnections} users online</span>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar username={this.state.currentUser.name} message={this.handleNewMessages} notification={this.handleNewNotifications} />
      </div>
    );
  }
}

export default App;
