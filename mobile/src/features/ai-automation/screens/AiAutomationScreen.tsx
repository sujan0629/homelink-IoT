import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigation } from '../../../shared/components';

export function AiAutomationScreen() {
  const [activeTab, setActiveTab] = useState('Ai Automation');

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-dark">AI Automation</Text>
        <Text className="text-sm text-gray-400 mt-2">Coming Soon</Text>
      </View>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </SafeAreaView>
  );
}
