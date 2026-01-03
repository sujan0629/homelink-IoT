import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  InsightsHeader,
  StatCard,
  EnergyTrendChart,
  DeviceUsageChart,
  EnvironmentChart,
} from '../components';
import { BottomNavigation } from '../../../shared/components';

export function InsightsScreen() {
  const [activeTab, setActiveTab] = useState('Insights');

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        <InsightsHeader
          title="Insights"
          subtitle="Your home's performance at a glance"
        />

        {/* Quick Stats Grid */}
        <View className="px-6 mb-6">
          <View className="flex-row gap-3 mb-3">
            <StatCard
              label="Active Devices"
              value="4"
              icon="devices"
            />
            <StatCard
              label="Energy Saved"
              value="24%"
              icon="leaf"
            />
          </View>
          <View className="flex-row gap-3">
            <StatCard
              label="Avg Temperature"
              value="24°C"
              icon="thermometer"
            />
            <StatCard
              label="Humidity"
              value="45%"
              icon="water"
            />
          </View>
        </View>

        {/* Energy Trend Chart */}
        <EnergyTrendChart />

        {/* Device Usage Chart */}
        <DeviceUsageChart />

        {/* Environment Chart */}
        <EnvironmentChart />
        
        {/* Bottom padding for navigation */}
        <View className="h-24" />
      </ScrollView>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </SafeAreaView>
  );
}
