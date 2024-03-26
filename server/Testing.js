// const io = require('socket.io-client');

// const SERVER_URL = 'http://localhost:3000'; // Replace with your server URL

// const NUM_CONNECTIONS = 100; // Number of socket connections to establish

// // Function to create a single client connection to the server using Socket.IO
// function createClientConnection() {
//     const socket = io(SERVER_URL);

//     socket.on('connect', () => {
//         console.log('Connected to server');
//         // You can perform additional actions after connection if needed
//     });

//     socket.on('message', (data) => {
//         console.log('Received message from server:', data);
//     });

//     socket.on('disconnect', () => {
//         console.log('Disconnected from server');
//     });

//     // Optionally, you can emit events to the server after connection
//     // socket.emit('custom-event', 'Hello, server!');
// }

// // Function to create multiple client connections
// function createMultipleConnections(numConnections) {
//     for (let i = 0; i < numConnections; i++) {
//         createClientConnection();
//     }
// }

// // Create multiple client connections
// createMultipleConnections(NUM_CONNECTIONS);
