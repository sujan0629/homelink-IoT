import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface TemperaturePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TemperaturePicker: React.FC<TemperaturePickerProps> = ({ value, onChange, placeholder = "Select temp" }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTemp, setSelectedTemp] = useState('25');
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Temperature range from 15°C to 40°C
  const temperatures = Array.from({ length: 26 }, (_, i) => (15 + i).toString());

  useEffect(() => {
    if (showPicker) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showPicker, fadeAnim]);

  const handlePresentModalPress = () => {
    setShowPicker(true);
  };

  const handleConfirm = () => {
    onChange(selectedTemp);
    setShowPicker(false);
  };

  const handleCancel = () => {
    setShowPicker(false);
  };

  const displayValue = value ? `${value}°C` : placeholder;

  return (
    <>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        className="border border-gray-300 rounded-lg px-3 py-2"
      >
        <Text className={`text-sm ${value ? 'text-dark' : 'text-gray-400'}`}>
          {displayValue}
        </Text>
      </TouchableOpacity>

      <Modal visible={showPicker} transparent animationType="slide">
        <Animated.View className="absolute inset-0" style={{ backgroundColor: 'transparent' }} />
        <View className="flex-1 justify-end">
          <View className="bg-white rounded-t-xl border border-gray-300 shadow-xl">
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <TouchableOpacity onPress={handleCancel}>
                <Text className="text-gray-500 text-base">Cancel</Text>
              </TouchableOpacity>
              <Text className="text-lg font-semibold text-dark">Select Temperature</Text>
              <TouchableOpacity onPress={handleConfirm}>
                <Text className="text-primary text-base font-semibold">Done</Text>
              </TouchableOpacity>
            </View>

            <Picker
              selectedValue={selectedTemp}
              onValueChange={(itemValue) => setSelectedTemp(itemValue)}
              style={{ height: 200, backgroundColor: 'white', color: '#1f2937' }}
              itemStyle={{ color: '#1f2937', fontSize: 16 }}
            >
              {temperatures.map((temp) => (
                <Picker.Item key={temp} label={`${temp}°C`} value={temp} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </>
  );
};