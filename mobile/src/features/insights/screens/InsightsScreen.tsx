import React, { useState, useEffect } from 'react';
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
import { statisticsApi } from '../../../lib/statistics';
import type { InsightsData } from '@shared/src/types/Statistics/Statistics';

export function InsightsScreen() {
  const [activeTab, setActiveTab] = useState('Insights');
  const [insightsData, setInsightsData] = useState<InsightsData | null>(null);

  useEffect(() => {
    fetchInsightsData();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchInsightsData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchInsightsData = async () => {
    try {
      const data = await statisticsApi.getInsights();
      setInsightsData(data);
    } catch (err) {
      console.error('Error fetching insights:', err);
    }
  };

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
              value={insightsData?.activeDevices?.toString() || "0"}
              icon="devices"
            />
            <StatCard
              label="Energy Saved"
              value={`${insightsData?.energySaved || 0}%`}
              icon="leaf"
            />
          </View>
          <View className="flex-row gap-3">
            <StatCard
              label="Avg Temperature"
              value={`${insightsData?.avgTemperature || 0}°C`}
              icon="thermometer"
            />
            <StatCard
              label="Humidity"
              value={`${insightsData?.avgHumidity || 0}%`}
              icon="water"
            />
          </View>
        </View>

        {/* Energy Trend Chart */}
        <EnergyTrendChart data={insightsData?.weeklyEnergyUsage} />

        {/* Device Usage Chart */}
        <DeviceUsageChart data={insightsData?.deviceUsage} />

        {/* Environment Chart */}
        <EnvironmentChart data={insightsData?.environmentHistory} />
        
        {/* Bottom padding for navigation */}
        <View className="h-24" />
      </ScrollView>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </SafeAreaView>
  );
}
