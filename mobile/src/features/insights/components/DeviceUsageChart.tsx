import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { DeviceUsageStats } from '@shared/src/types/Statistics/Statistics';

interface DeviceUsageChartProps {
  title?: string;
  data?: DeviceUsageStats[];
}

const screenWidth = Dimensions.get('window').width;

export function DeviceUsageChart({ title = "Top Devices by Usage", data }: DeviceUsageChartProps) {
  const deviceLabels: { [key: string]: string } = {
    'light': 'Lights',
    'fan': 'Fan',
    'door': 'Door',
    'waterPump': 'Pump',
  };
  
  const labels = data?.map(d => deviceLabels[d.deviceType] || d.deviceType) || ['Lights', 'Fan', 'Door', 'Pump'];
  const values = data?.map(d => d.totalHours) || [0, 0, 0, 0];
  
  const chartData = {
    labels: labels.slice(0, 5),
    datasets: [
      {
        data: values.slice(0, 5).length > 0 ? values.slice(0, 5) : [0],
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
