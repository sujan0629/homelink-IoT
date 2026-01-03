import React from 'react';
import { View, Text } from 'react-native';

export const WelcomeTitle = () => {
  return (
    <View className="mb-15 px-10">
      <Text className="text-[32px] text-center leading-10">
        <Text className="font-bold text-primary">Home</Text>
        <Text className="font-normal text-textPrimary">, Simply Within Reach</Text>
      </Text>
    </View>
  );
};
