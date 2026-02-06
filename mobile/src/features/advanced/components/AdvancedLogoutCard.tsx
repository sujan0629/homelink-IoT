import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../../stores/authStore';

interface AdvancedLogoutCardProps {}

export const AdvancedLogoutCard: React.FC<AdvancedLogoutCardProps> = () => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Clear auth state - RootLayout will automatically switch to auth navigator
            logout();
          },
        },
      ]
    );
  };

  return (
    <View className="mb-8">
      <View className="mb-6">
        <Text className="text-lg font-bold text-dark">Account</Text>
        <Text className="text-gray-500 text-sm">Manage your account settings</Text>
      </View>

      {/* Logout Button */}
      <Pressable
        onPress={handleLogout}
        className="bg-red-50 border border-red-200 rounded-lg p-4 active:bg-red-100"
      >
        <View className="flex-row items-center gap-2">
          <MaterialCommunityIcons name="logout" size={20} color="#DC2626" />
          <Text className="text-red-600 font-semibold text-base">Logout</Text>
        </View>
      </Pressable>
    </View>
  );
};