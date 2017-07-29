// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');
const WebSocket = require('ws');
let totalOfConnections = 0;

// assign a colour to each user
const colours = ['#FF9800', '#388E3C', '#D32F2F', '#0288D1'];

// Currently connected clients
let clients = {};

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', function connection(ws) {
  const day = new Date();
  console.log(`Client connected on ${day}`);

  // Increment total of connections
  totalOfConnections++;

  // Broadcast to all
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  }

  // initialize a new client id
  const clientId = uuid();

  // send initial client data
  clientConnected(ws, clientId);

  // connection event
  function clientConnected(client, clientId) {
    const index = (totalOfConnections - 1) % 4;
    // create client data
    clients[clientId] = {
      id: clientId,
      color: colours[index]
    }

    // setup message to be set to the client
    // includes all currently connected clients
    const setupMsg = {
      type: 'setup',
      data: {
              id: clientId,
              connectedClients: clients
            }
    }

    // connection message to be sent to the client
    // tells teh client who they are
    const connectionMsg = {
      type: 'connection',
      data: clients[clientId],
      totalOfConnections: totalOfConnections
    }

    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(setupMsg));
    }

    wss.broadcast(JSON.stringify(connectionMsg))
    console.log(`>> ${clients[clientId].id}`)
  }


  ws.on('message', function incoming(data) {
    const aMessage = JSON.parse(data);
    switch (aMessage.type) {
      case 'postMessage':
        aMessage.id = uuid.v4();
        aMessage.type = "incomingMessage";
        wss.broadcast(JSON.stringify(aMessage));
        console.log(`User ${aMessage.user} said ${aMessage.text}`);
        break;
      case 'postNotification':
        aMessage.id = uuid.v4();
        aMessage.type = "incomingNotification";
        wss.broadcast(JSON.stringify(aMessage));
        break;
      default:
        throw new Error(`Unknown event type ${aMessage.type}`);
        break;

    }

  });



  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    const day = new Date();
    console.log(`Client disconnected on ${day}`)
    totalOfConnections--;

    clientDisconected(clientId);

    // diconnection event
    function clientDisconected(clientId) {
      const client = clients[clientId];
      if(!client) return;

      const disconnectionMsg = {
        type: 'disconnection',
        data: client,
        totalOfConnections: totalOfConnections
      }
      wss.broadcast(JSON.stringify(disconnectionMsg))
      console.log(`<< Client (${clientId} disconnected`);
      delete clients[clientId];
    }
  });
});















