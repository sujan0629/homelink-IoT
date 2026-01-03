import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SummaryCardProps {
  temperature: number;
  humidity: number;
  onCheckStats?: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  temperature,
  humidity,
  onCheckStats,
}) => {
  return (
    <View className="mx-6 mb-6">
      <View className="flex-row items-center px-2 mt-2 justify-between mb-4">
        <TouchableOpacity onPress={onCheckStats}>
          <Text className="text-gray-400 text-xs">View Stats</Text>
        </TouchableOpacity>
        <View />
      </View>
      
      <View className="rounded-xl p-5" style={{ backgroundColor: '#1C555E' }}>
        <View className="flex-row items-center justify-around">
          <View>
            <Text className="text-white opacity-70 text-xs mb-1.5">Temperature</Text>
            <View className="flex-row items-baseline gap-0.5">
              <Text className="text-3xl font-bold text-white">{temperature}</Text>
              <Text className="text-white opacity-70 text-base">°C</Text>
            </View>
          </View>
          
          <View className="h-12 w-px bg-white opacity-20" />
          
          <View>
            <Text className="text-white opacity-70 text-xs mb-1.5">Humidity</Text>
            <View className="flex-row items-baseline gap-0.5">
              <Text className="text-3xl font-bold text-white">{humidity}</Text>
              <Text className="text-white opacity-70 text-base">%</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
