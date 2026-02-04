import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

// Override console.error to suppress socket.io websocket errors
const originalError = console.error;
console.error = (...args: any[]) => {
  const errorMsg = String(args[0]);
  // Suppress websocket and connection errors
  if (errorMsg.includes('websocket') || errorMsg.includes('Connection error')) {
    return;
  }
  // Call original for other errors
  originalError(...args);
};

export const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  reconnection: true,
  reconnectionDelay: 2000,
  reconnectionDelayMax: 10000,
  // Remove reconnectionAttempts limit - keep trying indefinitely
});

// Connection logging
socket.on('connect', () => {
  console.log('✅ Connected to ESP32');
});

socket.on('disconnect', () => {
  console.warn('⚠️ Disconnected from ESP32');
});

socket.on('connect_error', () => {
  // Silently track but show warning on final failure
});

// Show warning when reconnection fails
socket.on('reconnect_failed', () => {
  console.warn('⚠️ ESP32 is offline - connect your device to get started');
});