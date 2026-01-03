import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface EnvironmentChartProps {
  title?: string;
}

const screenWidth = Dimensions.get('window').width;

export function EnvironmentChart({ title = "Temperature & Humidity" }: EnvironmentChartProps) {
  const chartData = {
    labels: ['12am', '4am', '8am', '12pm', '4pm', '8pm'],
    datasets: [
      {
        data: [22, 21, 23, 26, 25, 24],
        color: (opacity = 1) => `rgba(28, 85, 94, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [65, 68, 62, 58, 60, 63],
        color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Temperature (°C)', 'Humidity (%)'],
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
      r: '4',
      strokeWidth: '2',
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#F0F0F0',
    },
  };

  return (
    <View className="mx-6 mb-6">
      <View className="flex-row items-center justify-between mb-4 px-1">
        <View>
          <Text className="text-base font-semibold text-dark">{title}</Text>
          <Text className="text-xs text-gray-400">Last 24 hours</Text>
        </View>
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
