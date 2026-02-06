import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as LocalAuthentication from 'expo-local-authentication';
import { BottomNavigation } from '../../../shared/components';
import {
  AdvancedLightCard,
  AdvancedFanCard,
  AdvancedDoorCard,
  AdvancedWaterPumpCard,
  AdvancedLogoutCard,
} from '../components';
import { useBiometricsStore } from '../../../stores/biometricsStore';

export function AdvancedScreen() {
  const [activeTab, setActiveTab] = useState('Advanced');

  // Light automation state
  const [lightTurnOnWhenInside, setLightTurnOnWhenInside] = useState(false);
  const [lightAutomatedSettings, setLightAutomatedSettings] = useState(false);
  const [lightTurnOffTime, setLightTurnOffTime] = useState('');
  const [lightTurnOnTime, setLightTurnOnTime] = useState('');
  const {
    lightBiometrics,
    fanBiometrics,
    doorBiometrics,
    pumpBiometrics,
    setLightBiometrics,
    setFanBiometrics,
    setDoorBiometrics,
    setPumpBiometrics,
  } = useBiometricsStore();

  // Fan automation state
  const [fanTurnOnWhenInside, setFanTurnOnWhenInside] = useState(false);
  const [fanAutomatedSettings, setFanAutomatedSettings] = useState(false);
  const [fanTemperatureThreshold, setFanTemperatureThreshold] = useState('');

  // Door automation state
  const [doorAutoLockWhenOutside, setDoorAutoLockWhenOutside] = useState(false);
  const [doorAutomatedSettings, setDoorAutomatedSettings] = useState(false);
  const [doorLockTime, setDoorLockTime] = useState('');
  const [doorUnlockTime, setDoorUnlockTime] = useState('');

  // Water pump automation state
  const [pumpAutoStartWhenLow, setPumpAutoStartWhenLow] = useState(false);
  const [pumpAutomatedSettings, setPumpAutomatedSettings] = useState(false);
  const [pumpWaterLevelThreshold, setPumpWaterLevelThreshold] = useState('');

  const requestBiometrics = async (title: string) => {
    const [hasHardware, supportedTypes, isEnrolled] = await Promise.all([
      LocalAuthentication.hasHardwareAsync(),
      LocalAuthentication.supportedAuthenticationTypesAsync(),
      LocalAuthentication.isEnrolledAsync(),
    ]);

    const supportsFaceId = supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION);
    const supportsFingerprint = supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT);
    const supportsIris = supportedTypes.includes(LocalAuthentication.AuthenticationType.IRIS);

    const authLabel = supportsFaceId
      ? 'Face ID'
      : supportsFingerprint
        ? 'fingerprint'
        : supportsIris
          ? 'iris'
          : 'device passcode';

    if (!hasHardware && !supportsFaceId && !supportsFingerprint && !supportsIris) {
      Alert.alert('Biometrics unavailable', 'Biometric authentication is not available. You can still use your device passcode.');
    } else if (!isEnrolled) {
      Alert.alert('No biometrics enrolled', 'Set up Face ID or fingerprint to use biometrics, or continue with passcode.');
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: `Authenticate with ${authLabel} to ${title}`,
      cancelLabel: 'Cancel',
      fallbackLabel: 'Use Passcode',
    });

    if (!result.success) {
      Alert.alert('Authentication failed', 'Biometric verification was not successful.');
    }

    return result.success;
  };

  const handleBiometricsChange = async (label: string, nextValue: boolean, setter: (value: boolean) => void) => {
    const approved = await requestBiometrics(`${nextValue ? 'enable' : 'disable'} ${label} biometrics`);
    if (!approved) {
      return;
    }

    setter(nextValue);
  };

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
                onBiometricsChange={(value) => handleBiometricsChange('light', value, setLightBiometrics)}
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
                onBiometricsChange={(value) => handleBiometricsChange('fan', value, setFanBiometrics)}
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
                onBiometricsChange={(value) => handleBiometricsChange('door', value, setDoorBiometrics)}
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
                onBiometricsChange={(value) => handleBiometricsChange('water pump', value, setPumpBiometrics)}
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
