import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

export const socket = io(SOCKET_URL, {
  transports: ['websocket'],
});

// Connection logging
socket.on('connect', () => console.log('Connected to server'));
socket.on('disconnect', () => console.log('Disconnected from server'));
socket.on('connect_error', (error) => console.error('Connection error:', error));