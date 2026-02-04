import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  HouseSelector,
  Greeting,
  SummaryCard,
  RoomTabs,
  DoorCard,
  FanCard,
  LightCard,
  WaterPumpCard,
  DeviceSelectionSheet,
} from '../components';
import { BottomNavigation } from '../../../shared/components';
import { socket } from '../../../lib/socket';

type Device = 'door' | 'fan' | 'light' | 'waterPump';

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState('Home');
  const [isConnected, setIsConnected] = useState(socket.connected);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>(['door', 'fan', 'light', 'waterPump']);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Stats') {
      navigation.navigate('Stats');
    }
  };
  
  // Device states
  const [doorLocked, setDoorLocked] = useState(true);
  const [fanOn, setFanOn] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [automationActive, setAutomationActive] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('LIVING ROOM');

  // Socket event handlers and connection status
  useEffect(() => {
    // Connection status handlers
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('ESP32 connected');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('ESP32 disconnected');
    });

    // Device state handlers
    socket.on('door-on', (data: { locked: boolean }) => {
      setDoorLocked(data.locked);
    });
    socket.on('fan-on', (data: { on: boolean }) => {
      setFanOn(data.on);
    });
    socket.on('light-on', (data: { on: boolean }) => {
      setLightOn(data.on);
    });
    socket.on('water-pump-on', (data: { active: boolean }) => {
      setAutomationActive(data.active);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('door-pump-on');
      socket.off('fan-on');
      socket.off('light-on');
      socket.off('water-pump-on');
    };
  }, []);

  const handleDoorToggle = (value: boolean) => {
    if (!isConnected) {
      Alert.alert('Device Offline', 'ESP32 is not connected. Please connect your device first.');
      return;
    }
    setDoorLocked(value);
    socket.emit('toggle-door', { locked: value });
  };

  const handleFanToggle = (value: boolean) => {
    if (!isConnected) {
      Alert.alert('Device Offline', 'ESP32 is not connected. Please connect your device first.');
      return;
    }
    setFanOn(value);
    socket.emit('toggle-fan', { on: value });
  };

  const handleLightToggle = (value: boolean) => {
    if (!isConnected) {
      Alert.alert('Device Offline', 'ESP32 is not connected. Please connect your device first.');
      return;
    }
    setLightOn(value);
    socket.emit('toggle-light', { on: value });
  };

  const handlePumpToggle = (value: boolean) => {
    if (!isConnected) {
      Alert.alert('Device Offline', 'ESP32 is not connected. Please connect your device first.');
      return;
    }
    setAutomationActive(value);
    socket.emit('toggle-pump', { active: value });
  };

  const handleToggleDevice = (device: Device) => {
    setSelectedDevices((prev) =>
      prev.includes(device) ? prev.filter((d) => d !== device) : [...prev, device]
    );
  };

  const handleOpenDeviceSelector = () => {
    bottomSheetRef.current?.expand();
    setIsSheetOpen(true);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* House Selector */}
          <HouseSelector
            houseName="My House"
            deviceCount={selectedDevices.length}
            onPress={handleOpenDeviceSelector}
            isSheetOpen={isSheetOpen}
          />

        {/* Connection Status */}
        <View className={`mx-6 mt-2 mb-4 p-3 rounded-lg ${isConnected ? 'bg-green-50' : 'bg-yellow-50'}`}>
          <Text className={`text-sm font-semibold ${isConnected ? 'text-green-700' : 'text-yellow-700'}`}>
            {isConnected ? '✓ ESP32 Connected' : '⚠ ESP32 Offline - Connect your device to control'}
          </Text>
        </View>

        {/* Greeting */}
        <Greeting userName="Sujan" />

        {/* Summary Card */}
        <SummaryCard
          temperature={24}
          humidity={45}
          onCheckStats={() => {
            navigation.navigate('Stats' as never);
          }}
        />

        {/* Room Tabs Section */}
        <View className="px-6 pb-6">
          <RoomTabs selectedRoom={selectedRoom} onSelectRoom={setSelectedRoom} />

          {selectedRoom === 'LIVING ROOM' ? (
            <View className="flex-row flex-wrap gap-3">
              {selectedDevices.includes('door') && (
                <DoorCard isLocked={doorLocked} onToggle={handleDoorToggle} />
              )}
              {selectedDevices.includes('fan') && (
                <FanCard isOn={fanOn} power={60} onToggle={handleFanToggle} />
              )}
              {selectedDevices.includes('light') && (
                <LightCard isOn={lightOn} power={40} onToggle={handleLightToggle} />
              )}
              {selectedDevices.includes('waterPump') && (
                <WaterPumpCard isActive={automationActive} onToggle={handlePumpToggle} />
              )}
            </View>
          ) : (
            <View className="py-12 items-center">
              <Text className="text-gray-400 text-base font-medium">No devices</Text>
            </View>
          )}
        </View>
      </ScrollView>
      
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      <DeviceSelectionSheet
        ref={bottomSheetRef}
        selectedDevices={selectedDevices}
        onToggleDevice={handleToggleDevice}
        onSheetChange={(index) => setIsSheetOpen(index !== -1)}
      />
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}