import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigation } from '../../../shared/components';
import {
  AdvancedLightCard,
  AdvancedFanCard,
  AdvancedDoorCard,
  AdvancedWaterPumpCard,
  AdvancedLogoutCard,
} from '../components';

export function AdvancedScreen() {
  const [activeTab, setActiveTab] = useState('Advanced');

  // Light automation state
  const [lightTurnOnWhenInside, setLightTurnOnWhenInside] = useState(false);
  const [lightAutomatedSettings, setLightAutomatedSettings] = useState(false);
  const [lightTurnOffTime, setLightTurnOffTime] = useState('');
  const [lightTurnOnTime, setLightTurnOnTime] = useState('');
  const [lightBiometrics, setLightBiometrics] = useState(false);

  // Fan automation state
  const [fanTurnOnWhenInside, setFanTurnOnWhenInside] = useState(false);
  const [fanAutomatedSettings, setFanAutomatedSettings] = useState(false);
  const [fanTemperatureThreshold, setFanTemperatureThreshold] = useState('');
  const [fanBiometrics, setFanBiometrics] = useState(false);

  // Door automation state
  const [doorAutoLockWhenOutside, setDoorAutoLockWhenOutside] = useState(false);
  const [doorAutomatedSettings, setDoorAutomatedSettings] = useState(false);
  const [doorLockTime, setDoorLockTime] = useState('');
  const [doorUnlockTime, setDoorUnlockTime] = useState('');
  const [doorBiometrics, setDoorBiometrics] = useState(false);

  // Water pump automation state
  const [pumpAutoStartWhenLow, setPumpAutoStartWhenLow] = useState(false);
  const [pumpAutomatedSettings, setPumpAutomatedSettings] = useState(false);
  const [pumpWaterLevelThreshold, setPumpWaterLevelThreshold] = useState('');
  const [pumpBiometrics, setPumpBiometrics] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top', 'bottom']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-6">
          {/* Header Section */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-dark mb-2">Advanced Settings</Text>
            <Text className="text-textSecondary text-sm">Configure advanced device settings and automation</Text>
          </View>

          {/* Device Settings Cards */}
          <View className="space-y-4">
            {/* Light Settings */}
            <View className="bg-white rounded-xl p-4 border border-gray-100 mb-4">
              <AdvancedLightCard
                turnOnWhenInside={lightTurnOnWhenInside}
                automatedSettings={lightAutomatedSettings}
                turnOffTime={lightTurnOffTime}
                turnOnTime={lightTurnOnTime}
                biometricsEnabled={lightBiometrics}
                onTurnOnWhenInsideChange={setLightTurnOnWhenInside}
                onAutomatedSettingsChange={setLightAutomatedSettings}
                onTurnOffTimeChange={setLightTurnOffTime}
                onTurnOnTimeChange={setLightTurnOnTime}
                onBiometricsChange={setLightBiometrics}
              />
            </View>

            {/* Fan Settings */}
            <View className="bg-white rounded-xl p-4 border border-gray-100 mb-4">
              <AdvancedFanCard
                turnOnWhenInside={fanTurnOnWhenInside}
                automatedSettings={fanAutomatedSettings}
                temperatureThreshold={fanTemperatureThreshold}
                biometricsEnabled={fanBiometrics}
                onTurnOnWhenInsideChange={setFanTurnOnWhenInside}
                onAutomatedSettingsChange={setFanAutomatedSettings}
                onTemperatureThresholdChange={setFanTemperatureThreshold}
                onBiometricsChange={setFanBiometrics}
              />
            </View>

            {/* Door Settings */}
            <View className="bg-white rounded-xl p-4 border border-gray-100 mb-4">
              <AdvancedDoorCard
                autoLockWhenOutside={doorAutoLockWhenOutside}
                automatedSettings={doorAutomatedSettings}
                lockTime={doorLockTime}
                unlockTime={doorUnlockTime}
                biometricsEnabled={doorBiometrics}
                onAutoLockWhenOutsideChange={setDoorAutoLockWhenOutside}
                onAutomatedSettingsChange={setDoorAutomatedSettings}
                onLockTimeChange={setDoorLockTime}
                onUnlockTimeChange={setDoorUnlockTime}
                onBiometricsChange={setDoorBiometrics}
              />
            </View>

            {/* Water Pump Settings */}
            <View className="bg-white rounded-xl p-4 border border-gray-100 mb-4">
              <AdvancedWaterPumpCard
                autoStartWhenLow={pumpAutoStartWhenLow}
                automatedSettings={pumpAutomatedSettings}
                waterLevelThreshold={pumpWaterLevelThreshold}
                biometricsEnabled={pumpBiometrics}
                onAutoStartWhenLowChange={setPumpAutoStartWhenLow}
                onAutomatedSettingsChange={setPumpAutomatedSettings}
                onWaterLevelThresholdChange={setPumpWaterLevelThreshold}
                onBiometricsChange={setPumpBiometrics}
              />
            </View>

            {/* Account Settings */}
            <View className="bg-white rounded-xl p-4 border border-gray-100 mb-4">
              <AdvancedLogoutCard />
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </SafeAreaView>
  );
}
