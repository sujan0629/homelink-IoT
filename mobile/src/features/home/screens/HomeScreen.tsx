import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
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

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState('Home');

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
              <DoorCard isLocked={doorLocked} onToggle={setDoorLocked} />
              <FanCard isOn={fanOn} power={60} onToggle={setFanOn} />
              <LightCard isOn={lightOn} power={40} onToggle={setLightOn} />
              <WaterPumpCard isActive={automationActive} onToggle={setAutomationActive} />
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
