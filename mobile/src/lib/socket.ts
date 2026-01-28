import { io } from 'socket.io-client';

// const SOCKET_URL = 'http://localhost:3000';
const SOCKET_URL = 'http://10.110.132.7:3000';
// const SOCKET_URL = 'http://192.168.1.104:3000';

export const socket = io(SOCKET_URL, {
  transports: ['websocket'],
});

// Connection loggingd
socket.on('connect', () => console.log('Connected to server'));
socket.on('disconnect', () => console.log('Disconnected from server'));
socket.on('connect_error', (error) => console.error('Connection error:', error));
socket.emit('mobile_connected');