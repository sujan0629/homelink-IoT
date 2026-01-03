import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  change?: string;
  changeType?: 'up' | 'down';
}

export function StatCard({ label, value, icon, change, changeType }: StatCardProps) {
  return (
    <View className="flex-1 rounded-xl p-4 border bg-white" style={{ borderColor: '#EDEDED' }}>
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-xs text-gray-400">{label}</Text>
        {change && (
          <View className="flex-row items-center gap-1">
            <MaterialCommunityIcons 
              name={changeType === 'up' ? 'arrow-up' : 'arrow-down'} 
              size={14} 
              color={changeType === 'up' ? '#22c55e' : '#ef4444'} 
            />
            <Text 
              className="text-xs font-semibold" 
              style={{ color: changeType === 'up' ? '#22c55e' : '#ef4444' }}
            >
              {change}
            </Text>
          </View>
        )}
      </View>
      <Text className="text-2xl font-bold text-dark">{value}</Text>
    </View>
  );
}
