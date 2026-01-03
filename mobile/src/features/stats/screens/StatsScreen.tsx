import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function StatsScreen() {
  const navigation = useNavigation();
  
  console.log('🔴 STATS SCREEN IS RENDERING');

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
                <Text className="text-dark text-2xl font-bold">26°C</Text>
                <Text className="text-gray-400 text-xs mt-1">2:30 PM</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-400 text-xs mb-1">Average</Text>
                <Text className="text-dark text-2xl font-bold">24°C</Text>
              </View>
              <View className="items-end">
                <Text className="text-gray-400 text-xs mb-1">Low</Text>
                <Text className="text-dark text-2xl font-bold">22°C</Text>
                <Text className="text-gray-400 text-xs mt-1">6:00 AM</Text>
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
                <Text className="text-dark text-2xl font-bold">52%</Text>
                <Text className="text-gray-400 text-xs mt-1">7:00 AM</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-400 text-xs mb-1">Average</Text>
                <Text className="text-dark text-2xl font-bold">45%</Text>
              </View>
              <View className="items-end">
                <Text className="text-gray-400 text-xs mb-1">Low</Text>
                <Text className="text-dark text-2xl font-bold">38%</Text>
                <Text className="text-gray-400 text-xs mt-1">3:00 PM</Text>
              </View>
            </View>
          </View>

          {/* Insights */}
          <Text className="text-dark text-lg font-semibold mb-4">Insights</Text>
          
          <View className="p-4 rounded-xl border mb-3" style={{ borderColor: '#EDEDED', backgroundColor: '#F0F9FA' }}>
            <View className="flex-row items-start gap-3">
              <MaterialCommunityIcons name="check-circle" size={20} color="#1C555E" />
              <View className="flex-1">
                <Text className="text-dark text-sm font-semibold mb-1">Optimal Temperature</Text>
                <Text className="text-gray-400 text-xs">Your home temperature is within the comfortable range of 20-26°C</Text>
              </View>
            </View>
          </View>

          <View className="p-4 rounded-xl border mb-3" style={{ borderColor: '#EDEDED', backgroundColor: '#F0F9FA' }}>
            <View className="flex-row items-start gap-3">
              <MaterialCommunityIcons name="check-circle" size={20} color="#1C555E" />
              <View className="flex-1">
                <Text className="text-dark text-sm font-semibold mb-1">Good Humidity Level</Text>
                <Text className="text-gray-400 text-xs">Humidity is in the ideal range of 30-50% for indoor comfort</Text>
              </View>
            </View>
          </View>

          <View className="p-4 rounded-xl border" style={{ borderColor: '#EDEDED', backgroundColor: '#F0F9FA' }}>
            <View className="flex-row items-start gap-3">
              <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color="#1C555Es" />
              <View className="flex-1">
                <Text className="text-dark text-sm font-semibold mb-1">Energy Tip</Text>
                <Text className="text-gray-400 text-xs">Consider adjusting your AC to 24°C for optimal comfort and energy efficiency</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
