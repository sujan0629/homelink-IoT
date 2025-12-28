# HomeLink

*Project - Kathmandu University (2nd Year, 1st Semester)*

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.72+-blue.svg)](https://reactnative.dev/)

An IoT-based smart home automation system that enables remote monitoring and control of household utilities through a mobile application. Built with ESP32, Express.js, Socket.IO, and React Native for real-time, cross-platform home automation.

## Features

- **Remote Control**: Control lights, fans, water pumps, and electronic door locks from your smartphone
- **Real-time Monitoring**: Live status updates and door position monitoring with sensors
- **Multi-device Support**: Manage multiple rooms and devices simultaneously
- **Cross-platform**: Works on both Android and iOS devices
- **Self-hosted**: No cloud dependency - run on your own server
- **Event Logging**: Track all activities and device states
- **Low Latency**: Sub-500ms response time using WebSocket technology

## Architecture

HomeLink uses a three-tier architecture:

- **Hardware Layer**: ESP32 microcontroller with Espruino firmware for GPIO control
- **Backend Layer**: Express.js server with Socket.IO for real-time communication and MongoDB for data persistence
- **Mobile Layer**: React Native app for cross-platform user interface

## Tech Stack

- **Embedded**: ESP32, Espruino, GPIO
- **Backend**: Node.js, Express.js, Socket.IO, MongoDB, Mongoose
- **Mobile**: React Native, Socket.IO client
- **Communication**: WebSocket via Socket.IO

## Installation

### Prerequisites

- Node.js 18+
- MongoDB 6.0+
- ESP32 DevKit
- React Native development environment

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/homelink.git
cd homelink/backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB connection and other settings

# Start the server
npm start
```

### Mobile App Setup

```bash
cd homelink/mobile

# Install dependencies
npm install

# For iOS
cd ios && pod install && cd ..

# Run on device/emulator
npm run android  # or npm run ios
```

### ESP32 Firmware

Flash Espruino firmware to ESP32 and upload the firmware code from `esp32/` directory.

## Usage

1. **Setup Hardware**: Connect ESP32 to relay modules and sensors as per pin configuration
2. **Configure Wi-Fi**: Update ESP32 code with your network credentials
3. **Register Devices**: Use the mobile app to register ESP32 devices with the server
4. **Control Devices**: Toggle switches, monitor door status, and view activity logs

## Hardware Requirements

| Component | Specification |
|-----------|---------------|
| Microcontroller | ESP32 DevKit (Wi-Fi enabled) |
| Relay Modules | 4-channel 5V relay board |
| Power Supply | 5V 2A adapter |
| Sensors | Magnetic door sensor |
| Server | Raspberry Pi 4 or standard PC |
| Mobile | Android 8.0+ or iOS 12.0+ |

## API Documentation

### WebSocket Events

- `control-device`: Send control commands to devices
- `device-state-changed`: Receive device state updates
- `status-update`: Device status broadcasts

## Development

### Project Structure

```
homelink/
├── backend/          # Express.js server
├── mobile/           # React Native app
├── esp32/            # ESP32 firmware
├── test.ts           # Test files
└── README.md
```

### Testing

```bash
# Run backend tests
cd backend && npm test

# Run mobile tests
cd mobile && npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This is a college project developed at Kathmandu University (2nd year, 1st semester - 3rd semester total) for educational purposes. Not intended for commercial use.

## Acknowledgments

- Built for educational purposes to demonstrate full-stack IoT development
- Inspired by the need for affordable, open-source home automation solutions
- Uses modern JavaScript stack from embedded systems to mobile applications

## Contact

For questions or support, please open an issue on GitHub.
