import React, { forwardRef, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { Check } from 'lucide-react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Device = 'door' | 'fan' | 'light' | 'waterPump';

interface DeviceSelectionSheetProps {
  selectedDevices: Device[];
  onToggleDevice: (device: Device) => void;
  onSheetChange?: (index: number) => void;
}

const DEVICES = [
  { id: 'door' as Device, name: 'Main Door', icon: 'door' },
  { id: 'fan' as Device, name: 'Smart Fan', icon: 'fan' },
  { id: 'light' as Device, name: 'Main Light', icon: 'lightbulb-outline' },
  { id: 'waterPump' as Device, name: 'Water Pump', icon: 'water-pump' },
];

export const DeviceSelectionSheet = forwardRef<BottomSheet, DeviceSelectionSheetProps>(
  ({ selectedDevices, onToggleDevice, onSheetChange }, ref) => {
    const snapPoints = useMemo(() => ['50%'], []);

    const renderBackdrop = (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: '#fff' }}
        onChange={onSheetChange}
      >
        <BottomSheetView className="flex-1 px-5 pt-3 pb-5">
          <Text className="text-lg font-bold text-gray-800 mb-1">Devices</Text>
          <Text className="text-[13px] text-gray-400 mb-6">Select devices to show on home</Text>

          <View className="gap-3">
            {DEVICES.map((device) => {
              const isSelected = selectedDevices.includes(device.id);
              return (
                <TouchableOpacity
                  key={device.id}
                  className="flex-row items-center justify-between py-4 px-3 bg-gray-50 rounded-lg border border-gray-200"
                  onPress={() => onToggleDevice(device.id)}
                >
                  <View className="flex-row items-center gap-3">
                    <MaterialCommunityIcons name={device.icon as any} size={22} color="#343434" />
                    <Text className="text-base font-medium text-gray-800">{device.name}</Text>
                  </View>
                  <View className={`w-5 h-5 rounded border-2 items-center justify-center ${
                    isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                  }`}>
                    {isSelected && <Check size={16} color="#fff" />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);
