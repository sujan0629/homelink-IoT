import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  HouseSelector,
  Greeting,
  SummaryCard,
  RoomTabs,
  DoorCard,
  FanCard,
  LightCard,
  WaterPumpCard,
} from '../components';
import { BottomNavigation } from '../../../shared/components';
import { socket } from '../../../lib/socket';

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState('Home');
  const [isConnected, setIsConnected] = useState(socket.connected);

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

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* House Selector */}
        <HouseSelector
          houseName="My House"
          deviceCount={4}
          onPress={() => {
            // TODO: Open house selector modal
            console.log('Select house');
          }}
        />

        {/* Connection Status */}
        <View className={`mx-6 mb-4 p-3 rounded-lg ${isConnected ? 'bg-green-50' : 'bg-yellow-50'}`}>
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
              <DoorCard isLocked={doorLocked} onToggle={handleDoorToggle} />
              <FanCard isOn={fanOn} power={60} onToggle={handleFanToggle} />
              <LightCard isOn={lightOn} power={40} onToggle={handleLightToggle} />
              <WaterPumpCard isActive={automationActive} onToggle={handlePumpToggle} />
            </View>
          ) : (
            <View className="py-12 items-center">
              <Text className="text-gray-400 text-base font-medium">No devices</Text>
            </View>
          )}
        </View>
      </ScrollView>
      
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
