import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
}

export const PrimaryButton = ({ title, onPress, className }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      className={`py-4 px-8 rounded-xl items-center justify-center bg-primary ${className ?? ''}`}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text className="text-light text-lg font-semibold">{title}</Text>
    </TouchableOpacity>
  );
};
