import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SignUpLinkProps {
  onSignUp: () => void;
}

export const SignUpLink = ({ onSignUp }: SignUpLinkProps) => {
  return (
    <View className="flex-row justify-center items-center mt-8">
      <Text className="text-base font-normal text-textPrimary">Already have an account ? </Text>
      <TouchableOpacity onPress={onSignUp} activeOpacity={0.7}>
        <Text className="text-base font-semibold text-primary">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};
