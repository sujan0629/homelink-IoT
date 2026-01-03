import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface PasswordLoginScreenProps {
  visible: boolean;
  email: string;
  onClose: () => void;
  onLoginSuccess?: () => void;
  onCloseParent?: () => void;
}

export const PasswordLoginScreen: React.FC<PasswordLoginScreenProps> = ({
  visible,
  email,
  onClose,
  onLoginSuccess,
  onCloseParent,
}) => {
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handlePasswordLogin = async () => {
    if (!password.trim()) {
      Alert.alert("Password required", "Please enter your password.");
      return;
    }

    setIsLoggingIn(true);

    try {
      // TODO: Replace with actual API endpoint
      const API_URL = __DEV__ ? 'http://192.168.1.77:3001' : 'https://your-api-url.com';
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, close modals
      onClose();
      if (onCloseParent) {
        onCloseParent();
      }
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
      /* Uncomment when backend is ready:
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Invalid password. Please try again.");
      }

      // Login successful
      onClose();
      if (onCloseParent) {
        onCloseParent();
      }
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      */
    } catch (error: any) {
      Alert.alert("Login Failed", error?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="px-4 mt-2 py-3 border-b border-gray-200">
          <View className="flex-row items-center mt-2 mb-2 justify-between">
            <TouchableOpacity onPress={onClose} className="w-10">
              <MaterialCommunityIcons name="chevron-left" size={26} color="#5F9598" />
            </TouchableOpacity>

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
        >
          <View className="flex-1">
            {/* Title */}
            <Text className="text-dark text-2xl font-bold text-center mb-3 mt-8">
              Enter your password
            </Text>

            {/* Description */}
            <Text className="text-textSecondary text-base text-center mb-2">
              To access your account
            </Text>
            <Text className="text-dark text-base font-semibold text-center mb-10">
              {email}
            </Text>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="text-dark text-sm font-medium mb-3">
                Password
              </Text>
              <View
                className="flex-row items-center bg-light rounded-2xl px-4 border border-gray-300"
                style={{ height: 56 }}
              >
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#9ca3af"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!passwordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="password"
                  textContentType="password"
                  autoFocus
                  style={{
                    flex: 1,
                    color: "#061E29",
                    fontSize: 14,
                    fontFamily: "Inter-Regular",
                    textAlignVertical: "center",
                  }}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                  <MaterialCommunityIcons
                    name={passwordVisible ? "eye-off" : "eye"}
                    size={22}
                    color="#5F9598"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              className="w-full rounded-2xl py-4 mb-4"
              style={{ backgroundColor: "#1C555E", opacity: isLoggingIn ? 0.7 : 1 }}
              onPress={handlePasswordLogin}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text className="text-white text-center text-base font-semibold">
                  Log In
                </Text>
              )}
            </TouchableOpacity>

            {/* Forgot Password Link */}
            <View className="mt-4">
              <TouchableOpacity>
                <Text className="text-primary text-center text-sm font-medium">
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
