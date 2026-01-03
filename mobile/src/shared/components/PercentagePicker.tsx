import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface PercentagePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const PercentagePicker: React.FC<PercentagePickerProps> = ({ value, onChange, placeholder = "Select %" }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedPercentage, setSelectedPercentage] = useState('20');
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Percentage range from 5% to 50% in 5% increments
  const percentages = Array.from({ length: 10 }, (_, i) => ((i + 1) * 5).toString());

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
    onChange(selectedPercentage);
    setShowPicker(false);
  };

  const handleCancel = () => {
    setShowPicker(false);
  };

  const displayValue = value ? `${value}%` : placeholder;

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
              <Text className="text-lg font-semibold text-dark">Select Percentage</Text>
              <TouchableOpacity onPress={handleConfirm}>
                <Text className="text-primary text-base font-semibold">Done</Text>
              </TouchableOpacity>
            </View>

            <Picker
              selectedValue={selectedPercentage}
              onValueChange={(itemValue) => setSelectedPercentage(itemValue)}
              style={{ height: 200, backgroundColor: 'white', color: '#1f2937' }}
              itemStyle={{ color: '#1f2937', fontSize: 16 }}
            >
              {percentages.map((percentage) => (
                <Picker.Item key={percentage} label={`${percentage}%`} value={percentage} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </>
  );
};