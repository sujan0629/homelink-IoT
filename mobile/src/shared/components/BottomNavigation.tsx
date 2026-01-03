import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { name: 'Home', icon: 'home-automation' },
  { name: 'Insights', icon: 'chart-line' },
  { name: 'Ai Automation', icon: 'flash-outline' },
  { name: 'Advanced', icon: 'cog-outline' },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const handleTabPress = (tabName: string) => {
    console.log('🟢 BOTTOM NAV CLICKED:', tabName);
    if (tabName === 'Home') {
      console.log('➡️ Navigating to Home');
      navigation.navigate('Home');
      onTabChange(tabName);
    } else if (tabName === 'Insights') {
      console.log('➡️ Navigating to Insights');
      navigation.navigate('Insights');
      onTabChange(tabName);
    } else if (tabName === 'Ai Automation') {
      console.log('➡️ Navigating to AiAutomation');
      navigation.navigate('AiAutomation');
      onTabChange(tabName);
    } else if (tabName === 'Advanced') {
      console.log('➡️ Navigating to Advanced');
      navigation.navigate('Advanced');
      onTabChange(tabName);
    }
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <View
        style={{
          overflow: 'hidden',
        }}
      >
        <BlurView
          intensity={Platform.OS === 'ios' ? 100 : 0}
          tint="extraLight"
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderColor: 'rgba(237, 237, 237, 0.5)',
            paddingTop: 12,
            paddingBottom: insets.bottom,
            backgroundColor: Platform.OS === 'android' ? '#FFFFFF' : 'rgba(255,255,255,0.1)',
          }}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.name}
              onPress={() => handleTabPress(tab.name)}
              style={{
                flex: 1,
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons
                name={tab.icon as any}
                size={24}
                color={activeTab === tab.name ? '#1C555E' : '#9CA3AF'}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '500',
                  marginTop: 4,
                  color: activeTab === tab.name ? '#1C555E' : '#9CA3AF',
                }}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </BlurView>
      </View>
    </View>
  );
};
