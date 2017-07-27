// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Currently connected clients
let conversation = {};


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', function connection(ws) {
  console.log('Client connected');


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
        console.log(aMessage.text);
        break;
      default:
        throw new Error(`Unknown event type ${aMessage.type}`);


    }

  });

// Broadcast to all
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  })
}

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});