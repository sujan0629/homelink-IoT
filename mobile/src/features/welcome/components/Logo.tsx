import React from 'react';
import { View, Image } from 'react-native';

export const Logo = () => {
  return (
    <View className="items-center justify-center mb-5">
      <Image 
        source={require('../../../../assets/logo.png')}
        style={{ width: 200, height: 160 }}
        resizeMode="contain"
      />
    </View>
  );
};
