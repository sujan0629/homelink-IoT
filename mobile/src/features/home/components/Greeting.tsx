import React from 'react';
import { View, Text } from 'react-native';

interface GreetingProps {
  userName: string;
}

export const Greeting: React.FC<GreetingProps> = ({ userName }) => {
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 18) return 'Afternoon';
    return 'Evening';
  };

  return (
    <View className="px-6 py-4">
      <Text className="text-gray-500 font-medium text-2xl">
        Good {getTimeOfDay()},
      </Text>
      <Text className="text-dark text-2xl font-semibold">{userName}</Text>
    </View>
  );
};
