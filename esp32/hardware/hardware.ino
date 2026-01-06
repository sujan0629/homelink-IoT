#include <WiFi.h>
#include <SocketIOclient.h>
#include <ArduinoJson.h>
#include "DHT.h"

// WiFi credentials
const char* ssid     = "Connect With God_2.4";
const char* password = "mabhandin@";

// Nested JSON buffer size
#define JSON_BUFFER_SIZE 1024

// Socket.IO server config
const char* socketIO_host = "192.168.1.104";  // replace with your server IP
const uint16_t socketIO_port = 3000;         // your backend port

// Setup DHT22
#define DHTPIN 26
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

//led
#define LEDPIN 2

// SocketIOclient instance
SocketIOclient socketIO;

bool isSocketConnected = false;

// Last send timestamp
unsigned long lastSendTime = 0;
const unsigned long sendInterval = 10000; // every 5s

// Handle Socket.IO events
void socketIOEvent(socketIOmessageType_t type, uint8_t *payload, size_t length) {
  switch(type) {
    case sIOtype_DISCONNECT:
      isSocketConnected = false;
      Serial.println("🔌 Socket.IO Disconnected");
      break;

    case sIOtype_CONNECT: {
      isSocketConnected = true;
      Serial.println("🔗 Socket.IO Connected!");

      // You can emit an initial event on connect
      DynamicJsonDocument doc(256);
      JsonArray arr = doc.to<JsonArray>();
      arr.add("device_connected");
      JsonObject data = arr.createNestedObject();
      data["device"] = "ESP32";
      data["message"] = "Hello Server!";
      String msg;
      serializeJson(doc, msg);
      socketIO.sendEVENT(msg);
      break;
    }

    case sIOtype_EVENT: {
      Serial.print("📩 Event received: ");
      Serial.write(payload, length);
      Serial.println();

      handleSocketEvent(payload, length);
      break;
    }

    default:
      break;
  }
}

void sendSensorData() {
  if (!isSocketConnected) {
    Serial.println("⚠️ Not connected to server—skip send");
    return;
  }

  float humidity    = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("❌ Failed DHT read");
    return;
  }

  DynamicJsonDocument doc(JSON_BUFFER_SIZE);
  JsonArray arr = doc.to<JsonArray>();

  // Socket.IO event name
  arr.add("sensor_data");

  // Event payload
  JsonObject payload = arr.createNestedObject();
  payload["device"]      = "ESP32";
  payload["temperature"] = temperature;
  payload["humidity"]    = humidity;
  payload["timestamp"]   = millis();

  String out;
  serializeJson(doc, out);
  socketIO.sendEVENT(out);

  Serial.println("📤 Sensor data sent:");
  Serial.println(out);
}

void onLightToggle(JsonObject data) {
  Serial.println("📨 Received: light_toggle");
  if (data.containsKey("on")) {
    bool state = data["on"];
    Serial.print("💡 LED state: ");
    Serial.println(state ? "ON" : "OFF");
    // Control your LED here
    digitalWrite(LEDPIN, state ? HIGH : LOW);
  }
}

//Routing Events


void handleSocketEvent(uint8_t *payload, size_t length) {
  // Parse the incoming Socket.IO event
  DynamicJsonDocument doc(JSON_BUFFER_SIZE);
  DeserializationError error = deserializeJson(doc, payload, length);
  
  if (error) {
    Serial.print("❌ JSON parse error: ");
    Serial.println(error.c_str());
    return;
  }
  
  // Socket.IO events come as an array: ["event_name", {...data}]
  if (!doc.is<JsonArray>()) {
    Serial.println("⚠️ Expected JSON array");
    return;
  }
  
  JsonArray arr = doc.as<JsonArray>();
  if (arr.size() < 1) {
    Serial.println("⚠️ Empty event array");
    return;
  }
  
  // Get event name (first element)
  const char* eventName = arr[0];
  
  // Get event data (second element, if exists)
  JsonObject eventData;
  if (arr.size() > 1 && arr[1].is<JsonObject>()) {
    eventData = arr[1].as<JsonObject>();
  }
  
  Serial.print("🎯 Event: ");
  Serial.println(eventName);
  
  // Route to appropriate handler
  if (strcmp(eventName, "toggle_light") == 0) {
    onLightToggle(eventData);
  }
  else {
    Serial.print("⚠️ Unknown event: ");
    Serial.println(eventName);
  }
}

void setup() {
  Serial.begin(115200);
  delay(1000);

  pinMode(LEDPIN, OUTPUT);      // Set pin as output
  digitalWrite(LEDPIN, LOW);    // Turn OFF by default
  
  dht.begin();
  Serial.println("🌡️ DHT22 Initialized");

  WiFi.begin(ssid, password);
  Serial.print("📶 Connecting WiFi ");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("\n✅ WiFi Connected!");
  Serial.print("📍 IP Address: ");
  Serial.println(WiFi.localIP());

  // Start Socket.IO with correct path (WebSocket only)
  String path = "/socket.io/?EIO=3&transport=websocket";
  socketIO.begin(socketIO_host, socketIO_port, "/socket.io/?EIO=3&transport=websocket");
  socketIO.onEvent(socketIOEvent);
  socketIO.setReconnectInterval(5000);

}

void loop() {
  socketIO.loop();

  // send data periodically
  if (millis() - lastSendTime > sendInterval) {

    lastSendTime = millis();
    sendSensorData();

    // socketIO.sendEVENT("[\"join_device\", {\"locked\":true}]");

    
  }
}


