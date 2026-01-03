import React from 'react';
import { View } from 'react-native';
import { PrimaryButton } from '../../../shared/components/PrimaryButton';
import { SecondaryButton } from '../../../shared/components/SecondaryButton';

interface ButtonGroupProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const ButtonGroup = ({ onGetStarted, onLogin }: ButtonGroupProps) => {
  return (
    <View className="w-full px-10 gap-4">
      <SecondaryButton 
        title="Get Started" 
        onPress={onGetStarted}
        className="w-full"
      />
      <PrimaryButton 
        title="Login" 
        onPress={onLogin}
        className="w-full"
      />
    </View>
  );
};
