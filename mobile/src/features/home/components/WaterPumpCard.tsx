import React from 'react';
import { View, Text, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface WaterPumpCardProps {
  isActive: boolean;
  onToggle: (value: boolean) => void;
}

export const WaterPumpCard: React.FC<WaterPumpCardProps> = ({ isActive, onToggle }) => {
  return (
    <View 
      className={`rounded-xl p-5 border ${isActive ? 'bg-[#F5F5F5]' : 'bg-white'}`} 
      style={{ width: '48%', borderColor: '#EDEDED' }}
    >
      <View className="mb-3">
        <MaterialCommunityIcons name="water-pump" size={28} color="#343434" />
      </View>
      
      <Text className="text-dark text-base font-semibold mb-1">Water Pump</Text>
      <Text className="text-gray-400 text-xs mb-1">Power</Text>
      <Text className="text-gray-400 text-sm font-semibold mb-3">
        1HP
      </Text>
      
      <View className="flex-row items-center justify-between">
        <Text className="text-dark text-xs font-medium">
          {isActive ? 'ON' : 'OFF'}
        </Text>
        <Switch
          value={isActive}
          onValueChange={onToggle}
          trackColor={{ false: '#E5E7EB', true: '#061E29' }}
          thumbColor="#ffffff"
        />
      </View>
    </View>
  );
};
