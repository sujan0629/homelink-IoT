import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { statisticsApi } from '../../../lib/statistics';
import type { DailyStats } from '@shared/src/types/Statistics/Statistics';

export function StatsScreen() {
  const navigation = useNavigation();
  const [dailyStats, setDailyStats] = useState<DailyStats | null>(null);
  
  console.log('🔴 STATS SCREEN IS RENDERING');

  useEffect(() => {
    fetchDailyStats();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchDailyStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDailyStats = async () => {
    try {
      const data = await statisticsApi.getDailyStats();
      setDailyStats(data);
    } catch (err) {
      console.error('Error fetching daily stats:', err);
    }
  };

  const getTemperatureInsight = () => {
    if (!dailyStats) return null;
    const temp = dailyStats.temperature.average;
    if (temp >= 20 && temp <= 26) {
      return {
        icon: 'check-circle',
        title: 'Optimal Temperature',
        message: 'Your home temperature is within the comfortable range of 20-26°C'
      };
    } else if (temp > 26) {
      return {
        icon: 'alert-circle',
        title: 'Temperature Above Optimal',
        message: 'Consider turning on cooling systems for better comfort'
      };
    } else {
      return {
        icon: 'alert-circle',
        title: 'Temperature Below Optimal',
        message: 'Consider turning on heating systems for better comfort'
      };
    }
  };

  const getHumidityInsight = () => {
    if (!dailyStats) return null;
    const humidity = dailyStats.humidity.average;
    if (humidity >= 30 && humidity <= 50) {
      return {
        icon: 'check-circle',
        title: 'Good Humidity Level',
        message: 'Humidity is in the ideal range of 30-50% for indoor comfort'
      };
    } else if (humidity > 50) {
      return {
        icon: 'alert-circle',
        title: 'High Humidity',
        message: 'Consider using a dehumidifier or improving ventilation'
      };
    } else {
      return {
        icon: 'alert-circle',
        title: 'Low Humidity',
        message: 'Consider using a humidifier for better comfort'
      };
    }
  };

  const tempInsight = getTemperatureInsight();
  const humidityInsight = getHumidityInsight();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-6 py-4 border-b" style={{ borderColor: '#EDEDED' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={28} color="#111111" />
        </TouchableOpacity>
        <View className="flex-1 items-center" style={{ marginLeft: -28 }}>
          <Text className="text-dark text-lg font-semibold">Environment Statistics</Text>
        </View>
      </View> 

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Current Stats Overview */}
        <View className="px-6 py-6">
        
      
          {/* Daily Stats */}
          <Text className="text-dark text-lg font-semibold mb-4">Today's Range</Text>
          
          <View className="p-5 rounded-xl mb-6" style={{ backgroundColor: '#F5F5F5' }}>
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons name="thermometer" size={20} color="#1C555E" />
                <Text className="text-dark text-base font-semibold">Temperature</Text>
              </View>
            </View>
            
            <View className="flex-row justify-between mb-3">
              <View>
                <Text className="text-gray-400 text-xs mb-1">High</Text>
                <Text className="text-dark text-2xl font-bold">{dailyStats?.temperature.high || 0}°C</Text>
                {dailyStats?.temperature.highTime && (
                  <Text className="text-gray-400 text-xs mt-1">{dailyStats.temperature.highTime}</Text>
                )}
              </View>
              <View className="items-center">
                <Text className="text-gray-400 text-xs mb-1">Average</Text>
                <Text className="text-dark text-2xl font-bold">{dailyStats?.temperature.average || 0}°C</Text>
              </View>
              <View className="items-end">
                <Text className="text-gray-400 text-xs mb-1">Low</Text>
                <Text className="text-dark text-2xl font-bold">{dailyStats?.temperature.low || 0}°C</Text>
                {dailyStats?.temperature.lowTime && (
                  <Text className="text-gray-400 text-xs mt-1">{dailyStats.temperature.lowTime}</Text>
                )}
              </View>
            </View>
          </View>

          <View className="p-5 rounded-xl mb-6" style={{ backgroundColor: '#F5F5F5' }}>
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons name="water-percent" size={20} color="#1C555E" />
                <Text className="text-dark text-base font-semibold">Humidity</Text>
              </View>
            </View>
            
            <View className="flex-row justify-between mb-3">
              <View>
                <Text className="text-gray-400 text-xs mb-1">High</Text>
                <Text className="text-dark text-2xl font-bold">{dailyStats?.humidity.high || 0}%</Text>
                {dailyStats?.humidity.highTime && (
                  <Text className="text-gray-400 text-xs mt-1">{dailyStats.humidity.highTime}</Text>
                )}
              </View>
              <View className="items-center">
                <Text className="text-gray-400 text-xs mb-1">Average</Text>
                <Text className="text-dark text-2xl font-bold">{dailyStats?.humidity.average || 0}%</Text>
              </View>
              <View className="items-end">
                <Text className="text-gray-400 text-xs mb-1">Low</Text>
                <Text className="text-dark text-2xl font-bold">{dailyStats?.humidity.low || 0}%</Text>
                {dailyStats?.humidity.lowTime && (
                  <Text className="text-gray-400 text-xs mt-1">{dailyStats.humidity.lowTime}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Insights */}
          <Text className="text-dark text-lg font-semibold mb-4">Insights</Text>
          
          {tempInsight && (
            <View className="p-4 rounded-xl border mb-3" style={{ borderColor: '#EDEDED', backgroundColor: '#F0F9FA' }}>
              <View className="flex-row items-start gap-3">
                <MaterialCommunityIcons name={tempInsight.icon as any} size={20} color="#1C555E" />
                <View className="flex-1">
                  <Text className="text-dark text-sm font-semibold mb-1">{tempInsight.title}</Text>
                  <Text className="text-gray-400 text-xs">{tempInsight.message}</Text>
                </View>
              </View>
            </View>
          )}

          {humidityInsight && (
            <View className="p-4 rounded-xl border mb-3" style={{ borderColor: '#EDEDED', backgroundColor: '#F0F9FA' }}>
              <View className="flex-row items-start gap-3">
                <MaterialCommunityIcons name={humidityInsight.icon as any} size={20} color="#1C555E" />
                <View className="flex-1">
                  <Text className="text-dark text-sm font-semibold mb-1">{humidityInsight.title}</Text>
                  <Text className="text-gray-400 text-xs">{humidityInsight.message}</Text>
                </View>
              </View>
            </View>
          )}

          <View className="p-4 rounded-xl border" style={{ borderColor: '#EDEDED', backgroundColor: '#F0F9FA' }}>
            <View className="flex-row items-start gap-3">
              <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color="#1C555E" />
              <View className="flex-1">
                <Text className="text-dark text-sm font-semibold mb-1">Energy Tip</Text>
                <Text className="text-gray-400 text-xs">
                  {dailyStats?.temperature.average && dailyStats.temperature.average > 24
                    ? 'Consider adjusting your AC to 24°C for optimal comfort and energy efficiency'
                    : 'Your temperature settings are optimized for energy efficiency'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
