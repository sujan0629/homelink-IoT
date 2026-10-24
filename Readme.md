# HomeLink · connected-home system

Remote device control and environmental monitoring across an ESP32, a NestJS/Socket.IO backend, and a React Native mobile client.

<img src="https://github.com/user-attachments/assets/7bbe527c-9f92-4080-8111-cb126b52a9b1" alt="HomeLink mobile screen 1" width="240" />
<img src="https://github.com/user-attachments/assets/840611e9-eebb-48e8-94d4-dcfb35b44576" alt="HomeLink mobile screen 2" width="240" />
<img src="https://github.com/user-attachments/assets/391a363f-43ae-47ea-9e06-60ff0998277f" alt="HomeLink mobile screen 3" width="240" />

## What the system connects

- **Hardware:** ESP32 firmware, a DHT22 sensor, and device-control pins for lights, a fan, and a door mechanism.
- **Backend:** NestJS modules for authentication, device/environment handling, MongoDB persistence, and Socket.IO communication.
- **Mobile:** an Expo/React Native interface for monitoring and control.
- **Workspace:** pnpm and Turborepo coordinate backend, mobile, and shared code.

## Architecture

```text
ESP32 firmware <-> Socket.IO / NestJS API <-> React Native client
                              |
                           MongoDB
```

The firmware is in [esp32](esp32), API modules in [backend/src](backend/src), and the mobile application in [mobile](mobile). Check the gateways and firmware for the actual event names rather than assuming a generic Socket.IO protocol.

## Local development

Use the pnpm version declared in [package.json](package.json). Install dependencies at the root and start the workspace:

```bash
pnpm install
pnpm dev
```

Configure a development MongoDB connection via `MONGODB_URI` and review [authentication setup](AUTHENTICATION.md) before connecting clients. The backend supports `PORT` configuration. A physical phone and the ESP32 need a reachable LAN address, not the development computer's localhost.

Open [the firmware](esp32/hardware/hardware.ino) in the Arduino toolchain with ESP32 support and its Socket.IO, ArduinoJson, and DHT dependencies. Set your own network/server configuration and verify pin assignments against your hardware. Use low-voltage test loads when developing device control.

## Scope and history

This repository demonstrates the hardware/backend/mobile integration. Deployment, network access controls, credentials, and physical wiring need review for a real installation. Existing project attribution and the original educational/non-commercial usage statement are preserved in [project history](docs/PROJECT-HISTORY.md).
