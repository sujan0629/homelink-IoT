import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface HouseSelectorProps {
  houseName: string;
  deviceCount: number;
  onPress?: () => void;
}

export const HouseSelector: React.FC<HouseSelectorProps> = ({
  houseName,
  deviceCount,
  onPress,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View className="mx-6 mt-2">
      <TouchableOpacity
        onPress={toggleDropdown}
        className="flex-row items-center justify-between px-4 py-3 bg-white border rounded-lg"
        style={{ borderColor: '#EDEDED' }}
      >
        <Text className="text-dark text-sm font-semibold">
          {houseName.toUpperCase()} <Text className="text-gray-400 text-sm font-normal">({deviceCount} DEVICES)</Text>
        </Text>
        <MaterialCommunityIcons 
          name={isOpen ? "chevron-up" : "chevron-down"} 
          size={24} 
          color="#343434" 
        />
      </TouchableOpacity>

      {isOpen && (
        <View className="bg-white border rounded-lg mt-1" style={{ borderColor: '#EDEDED' }}>
          <TouchableOpacity 
            className="px-4 py-3 border-b bg-gray-50"
            style={{ borderColor: '#EDEDED' }}
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setIsOpen(false);
              onPress?.();
            }}
          >
            <Text className="text-dark text-sm font-semibold">{houseName.toUpperCase()}</Text>
            <Text className="text-gray-400 text-xs mt-0.5">{deviceCount} devices</Text>
          </TouchableOpacity>
          
          <View className="px-4 py-3">
            <Text className="text-gray-400 text-sm">No other house connected</Text>
          </View>
        </View>
      )}
    </View>
  );
};
