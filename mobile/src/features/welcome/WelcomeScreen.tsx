import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo, WelcomeTitle, ButtonGroup, SignUpLink } from './components';
import { AuthBottomSheet } from '../auth/components/AuthBottomSheet';

export default function WelcomeScreen() {
  const [isAuthSheetOpen, setIsAuthSheetOpen] = useState(false);

  const handleGetStarted = () => {
    setIsAuthSheetOpen(true);
  };

  const handleLogin = () => {
    setIsAuthSheetOpen(true);
  };

  const handleSignUp = () => {
    setIsAuthSheetOpen(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-light">
      <View className="flex-1 justify-between py-10 bg-light">
        <View className="flex-1 justify-center items-center">
          <Logo />
          <WelcomeTitle />
        </View>
        
        <View className="pb-5">
          <ButtonGroup 
            onGetStarted={handleGetStarted}
            onLogin={handleLogin}
          />
          <SignUpLink onSignUp={handleSignUp} />
        </View>
      </View>

      <AuthBottomSheet
        visible={isAuthSheetOpen}
        onClose={() => setIsAuthSheetOpen(false)}
      />
    </SafeAreaView>
  );
}
