import React from 'react';
import { View, Text, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FanCardProps {
  isOn: boolean;
  power: number;
  onToggle: (value: boolean) => void;
}

export const FanCard: React.FC<FanCardProps> = ({ isOn, power, onToggle }) => {
  return (
    <View 
      className={`rounded-xl p-5 border ${isOn ? 'bg-[#F5F5F5]' : 'bg-white'}`} 
      style={{ width: '48%', borderColor: '#EDEDED' }}
    >
      <View className="mb-3">
        <MaterialCommunityIcons name="fan" size={28} color="#343434" />
      </View>
      
      <Text className="text-dark text-base font-semibold mb-1">Smart Fan</Text>
      <Text className="text-gray-400 text-xs mb-1">Power</Text>
      <Text className="text-gray-400 text-sm font-semibold mb-3">{power}W</Text>
      
      <View className="flex-row items-center justify-between">
        <Text className="text-dark text-xs font-medium">
          {isOn ? 'ON' : 'OFF'}
        </Text>
        <Switch
          value={isOn}
          onValueChange={onToggle}
          trackColor={{ false: '#E5E7EB', true: '#061E29' }}
          thumbColor="#ffffff"
        />
      </View>
    </View>
  );
};
