import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface HouseSelectorProps {
  houseName: string;
  deviceCount: number;
  onPress?: () => void;
  isSheetOpen?: boolean;
}

export const HouseSelector: React.FC<HouseSelectorProps> = ({
  houseName,
  deviceCount,
  onPress,
  isSheetOpen = false,
}) => {
  return (
    <View className="mx-6 mt-2">
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center justify-between px-4 py-3 bg-white border rounded-lg"
        style={{ borderColor: '#EDEDED' }}
      >
        <Text className="text-dark text-sm font-semibold">
          {houseName.toUpperCase()} <Text className="text-gray-400 text-sm font-normal">({deviceCount} DEVICES)</Text>
        </Text>
        <MaterialCommunityIcons 
          name={isSheetOpen ? "chevron-down" : "chevron-right"} 
          size={24} 
          color="#343434" 
        />
      </TouchableOpacity>
    </View>
  );
};
