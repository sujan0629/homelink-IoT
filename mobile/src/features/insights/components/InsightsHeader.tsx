import React from 'react';
import { View, Text } from 'react-native';

interface InsightsHeaderProps {
  title: string;
  subtitle?: string;
}

export const InsightsHeader: React.FC<InsightsHeaderProps> = ({ title, subtitle }) => {
  return (
    <View className="px-6 pt-6 pb-4">
      <Text className="text-2xl font-bold text-dark mb-1">{title}</Text>
      {subtitle && <Text className="text-sm text-textSecondary">{subtitle}</Text>}
    </View>
  );
};
