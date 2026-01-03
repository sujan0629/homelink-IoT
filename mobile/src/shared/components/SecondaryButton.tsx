import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
}

export const SecondaryButton = ({ title, onPress, className }: SecondaryButtonProps) => {
  return (
    <TouchableOpacity
      className={`py-4 px-8 rounded-xl items-center justify-center border border-gray-300 bg-light ${className ?? ''}`}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text className="text-textPrimary text-lg font-medium">{title}</Text>
    </TouchableOpacity>
  );
};
