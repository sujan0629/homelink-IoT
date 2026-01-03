import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface DeviceUsageChartProps {
  title?: string;
}

const screenWidth = Dimensions.get('window').width;

export function DeviceUsageChart({ title = "Top Devices by Usage" }: DeviceUsageChartProps) {
  const chartData = {
    labels: ['Lights', 'AC', 'Fan', 'Pump', 'Door'],
    datasets: [
      {
        data: [45, 68, 32, 28, 15],
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
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#F0F0F0',
    },
    barPercentage: 0.6,
  };

  return (
    <View className="mx-6 mb-6">
      <View className="flex-row items-center justify-between mb-4 px-1">
        <View>
          <Text className="text-base font-semibold text-dark">{title}</Text>
          <Text className="text-xs text-gray-400">Hours this week</Text>
        </View>
      </View>
      
      <View className="rounded-xl border p-0 overflow-hidden" style={{ borderColor: '#EDEDED', backgroundColor: '#ffffff' }}>
        <BarChart
          data={chartData}
          width={screenWidth - 44}
          height={220}
          chartConfig={chartConfig}
          style={{
            marginVertical: 8,
            borderRadius: 12,
          }}
          yAxisLabel=""
          yAxisSuffix="h"
          showValuesOnTopOfBars
          fromZero
        />
      </View>
    </View>
  );
}
