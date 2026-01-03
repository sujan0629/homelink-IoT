import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({ value, onChange, placeholder = "Select time" }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState('00');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const fadeAnim = useState(new Animated.Value(0))[0];

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

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
    const timeString = `${selectedHour}:${selectedMinute}`;
    onChange(timeString);
    setShowPicker(false);
  };

  const handleCancel = () => {
    setShowPicker(false);
  };

  const displayValue = value || placeholder;

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
          <View className="bg-white rounded-t-xl border border-gray-300 shadow-xl" style={{ height: 400 }}>
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <TouchableOpacity onPress={handleCancel}>
                <Text className="text-gray-500 text-base">Cancel</Text>
              </TouchableOpacity>
              <Text className="text-lg font-semibold text-dark">Select Time</Text>
              <TouchableOpacity onPress={handleConfirm}>
                <Text className="text-primary text-base font-semibold">Done</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row">
              <View className="flex-1">
                <Text className="text-center text-sm text-gray-500 py-2">Hour</Text>
                <Picker
                  selectedValue={selectedHour}
                  onValueChange={(itemValue) => setSelectedHour(itemValue)}
                  style={{ height: 150, backgroundColor: 'white', color: '#1f2937' }}
                  itemStyle={{ color: '#1f2937', fontSize: 16 }}
                >
                  {hours.map((hour) => (
                    <Picker.Item key={hour} label={hour} value={hour} />
                  ))}
                </Picker>
              </View>

              <View className="flex-1">
                <Text className="text-center text-sm text-gray-500 py-2">Minute</Text>
                <Picker
                  selectedValue={selectedMinute}
                  onValueChange={(itemValue) => setSelectedMinute(itemValue)}
                  style={{ height: 150, backgroundColor: 'white', color: '#1f2937' }}
                  itemStyle={{ color: '#1f2937', fontSize: 16 }}
                >
                  {minutes.map((minute) => (
                    <Picker.Item key={minute} label={minute} value={minute} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};