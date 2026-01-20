import '../global.css';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, Text as RNText } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { WelcomeScreen } from './features/welcome';
import { HomeScreen } from './features/home';
import { StatsScreen } from './features/stats';
import { InsightsScreen } from './features/insights';
import { AiAutomationScreen } from './features/ai-automation';
import { AdvancedScreen } from './features/advanced';
import { AuthEmailScreen } from './features/auth/screens/AuthEmailScreen';
import { PasswordLoginScreen } from './features/auth/screens/PasswordLoginScreen';
import { VerifyCodeScreen } from './features/auth/screens/VerifyCodeScreen';
import { SetPasswordScreen } from './features/auth/screens/SetPasswordScreen';
import { useAuthStore } from './stores/authStore';

console.log('🟡 InsightsScreen imported:', InsightsScreen?.name);
console.log('🟡 StatsScreen imported:', StatsScreen?.name);

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter_18pt-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter_18pt-Medium.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter_18pt-SemiBold.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter_18pt-Bold.ttf'),
  });

  const { isAuthenticated, isLoading, setLoading } = useAuthStore();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
      setLoading(false);
    }
  }, [loaded, error, setLoading]);

  useEffect(() => {
    if (loaded) {
      (RNText as any).defaultProps = (RNText as any).defaultProps || {};
      const existingStyle = ((RNText as any).defaultProps as any).style || {};
      ((RNText as any).defaultProps as any).style = [{ fontFamily: 'Inter-Regular' }, existingStyle];
    }
  }, [loaded]);

  // Show loading screen while fonts are loading or auth state is being determined
  if (!loaded && !error || isLoading) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#F3F4F4" />
        <NavigationContainer>
          {isAuthenticated ? (
            // Authenticated user - show main app
            <Stack.Navigator
              id="authenticated-stack"
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#F3F4F4' },
              }}
              initialRouteName="Home"
            >
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  animation: 'fade',
                  animationDuration: 150
                }}
              />
              <Stack.Screen
                name="Stats"
                component={StatsScreen}
                options={{
                  animation: 'fade',
                  animationDuration: 150
                }}
              />
              <Stack.Screen
                name="Insights"
                component={InsightsScreen}
                options={{
                  animation: 'fade',
                  animationDuration: 150
                }}
              />
              <Stack.Screen
                name="AiAutomation"
                component={AiAutomationScreen}
                options={{
                  animation: 'fade',
                  animationDuration: 150
                }}
              />
              <Stack.Screen
                name="Advanced"
                component={AdvancedScreen}
                options={{
                  animation: 'fade',
                  animationDuration: 150
                }}
              />
            </Stack.Navigator>
          ) : (
            // Unauthenticated user - show auth flow
            <Stack.Navigator
              id="auth-stack"
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#F3F4F4' },
              }}
              initialRouteName="Welcome"
            >
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="AuthEmail" component={AuthEmailScreen} />
              <Stack.Screen name="PasswordLogin" component={PasswordLoginScreen} />
              <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
              <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
