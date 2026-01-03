import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface EnergyTrendChartProps {
  title?: string;
}

const screenWidth = Dimensions.get('window').width;

export function EnergyTrendChart({ title = "Energy Usage This Week" }: EnergyTrendChartProps) {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [18, 22, 15, 28, 20, 24, 18],
        color: (opacity = 1) => `rgba(28, 85, 94, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(28, 85, 94, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#1C555E',
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#F0F0F0',
    },
  };

  return (
    <View className="mx-6 mb-6">
      <View className="mb-4 px-1">
        <Text className="text-base font-semibold text-dark">{title}</Text>
        <Text className="text-xs text-gray-400">kWh per day</Text>
      </View>
      
      <View className="rounded-xl border overflow-hidden" style={{ borderColor: '#EDEDED', backgroundColor: '#ffffff' }}>
        <LineChart
          data={chartData}
          width={screenWidth - 44}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 12,
          }}
        />
      </View>
    </View>
  );
}
