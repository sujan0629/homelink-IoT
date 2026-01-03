import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { PrimaryButton, SecondaryButton, InputField } from "../../../shared/components";

interface RouteParams {
  email?: string;
}

export const PasswordLoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { email = "" } = (route.params as RouteParams) || {};

  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handlePasswordLogin = async () => {
    if (!password.trim()) {
      Alert.alert("Password required", "Please enter your password.");
      return;
    }

    setIsLoggingIn(true);

    try {
      // TODO: Replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setIsLoggingIn(false);
      setIsAuthenticating(true);

      setTimeout(() => {
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        setTimeout(() => setIsAuthenticating(false), 300);
      }, 150);
    } catch (error: any) {
      Alert.alert("Login Failed", error?.message || "Invalid credentials. Please try again.");
      setIsLoggingIn(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 mt-2 py-3 border-b border-gray-200">
        <View className="flex-row items-center mt-2 mb-2 justify-between">
          <Pressable onPress={() => navigation.goBack()} className="w-10">
            <MaterialCommunityIcons name="chevron-left" size={26} color="#5F9598" />
          </Pressable>

          <View className="flex-1 items-center justify-center px-2">
            <Text className="text-dark text-lg font-semibold text-center" numberOfLines={1}>
              Password
            </Text>
          </View>

          <View className="w-10" />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1">
          <Text className="text-dark text-xl font-bold text-center mb-3 mt-4">Enter your password</Text>
          <Text className="text-textSecondary text-xs text-center mb-2">To access your account</Text>
          <Text className="text-dark text-base font-semibold text-center mb-10">{email || "your email"}</Text>

          <InputField
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="password"
            textContentType="password"
            rightIcon={
              <MaterialCommunityIcons
                name={passwordVisible ? "eye-off" : "eye"}
                size={22}
                color="#5F9598"
              />
            }
            onRightIconPress={() => setPasswordVisible(!passwordVisible)}
          />

          <PrimaryButton
            title="Log In"
            onPress={handlePasswordLogin}
            loading={isLoggingIn}
            className="w-full mb-4"
          />

          <View className="mt-4">
            <Pressable onPress={() => {}} className="py-2">
              <Text className="text-center text-xs text-textSecondary">
                Dont remember your password? <Text className="text-primary font-semibold">Reset your password</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {isAuthenticating && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#EDF5F0",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999999,
            elevation: 999999,
          }}
        >
          <ActivityIndicator size="large" color="#1C555E" />
        </View>
      )}
    </SafeAreaView>
  );
};
