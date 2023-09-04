const https = require('http');

const fs = require('fs');
const path =require("path")
const express = require('express'); // Import Express.js
const app = express(); // Create an Express application

var count=0;
const server = https.createServer(app);
const io = require('socket.io')(server, {
  cors: {
   
    origin: '*', 
    methods: ['GET', 'POST']
  },
  pingTimeout: 5000,
  pingInterval: 10000
});

app.get('/', (req, res) => {
  // Return "Hello, world!" when accessing the root route
  console.log(req)
  res.end('Hello, world!');
});


app.get('/q', (req, res) => {
  // Return "Hello, world!" when accessing the root route
  console.log(req)
  res.end('Hello, world!');
});

io.on('connection', (socket) => {
  console.log('A client connected');
  count++;
  io.sockets.emit("visitorCount", count);

  socket.on('message', (data) => {
    console.log('Received:', data);
    io.sockets.emit("datamessage", data);
    // Handle the data received from the client
  });

  socket.on('disconnect', () => {
    count--;
    io.sockets.emit("visitorCount", count);
    console.log('A client disconnected');
  });
});

server.listen(3000, () => {
  console.log('WebSocket server listening on port 3000');
});
