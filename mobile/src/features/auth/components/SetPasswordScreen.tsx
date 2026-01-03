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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SetPasswordScreenProps {
  visible: boolean;
  email: string;
  verificationCode: string;
  onClose: () => void;
  onPasswordSet?: () => void;
}

export const SetPasswordScreen: React.FC<SetPasswordScreenProps> = ({
  visible,
  email,
  verificationCode,
  onClose,
  onPasswordSet,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validatePassword = () => {
    if (password.length < 8) {
      Alert.alert("Invalid Password", "Password must be at least 8 characters long");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      Alert.alert("Invalid Password", "Password must contain at least one uppercase letter");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      Alert.alert("Invalid Password", "Password must contain at least one lowercase letter");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      Alert.alert("Invalid Password", "Password must contain at least one number");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSetPassword = async () => {
    if (!validatePassword()) return;

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API endpoint
      const API_URL = __DEV__ ? 'http://192.168.1.77:3001' : 'https://your-api-url.com';
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        setIsSubmitting(false);
        if (onPasswordSet) {
          onPasswordSet();
        }
      }, 1500);

      /* Uncomment when backend is ready:
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          code: verificationCode,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to set password. Please try again.");
      }

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        setIsSubmitting(false);
        if (onPasswordSet) {
          onPasswordSet();
        }
      }, 1500);
      */
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
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
        {showSuccess ? (
          // Success Loading Screen
          <View className="flex-1 items-center justify-center">
            <View className="items-center">
              <ActivityIndicator size="large" color="#1C555E" />
            </View>
          </View>
        ) : (
          <>
            {/* Header */}
            <View className="px-4 mt-2 py-3 border-b border-gray-200">
              <View className="flex-row items-center mt-2 mb-2 justify-between">
                <TouchableOpacity onPress={onClose} className="w-10" disabled={isSubmitting}>
                  <MaterialCommunityIcons name="chevron-left" size={26} color="#5F9598" />
                </TouchableOpacity>

                <View className="flex-1 items-center justify-center px-2">
                  <Text className="text-dark text-lg font-semibold text-center" numberOfLines={1}>
                    Set Password
                  </Text>
                </View>

                <View className="w-10" />
              </View>
            </View>

            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
              keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
              <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 24, flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
              >
                <View className="flex-1">
                  {/* Title */}
                  <Text className="text-dark text-2xl font-bold text-center mb-3 mt-8">
                    Create your password
                  </Text>

                  {/* Description */}
                  <Text className="text-textSecondary text-base text-center mb-2">
                    Set a secure password for
                  </Text>
                  <Text className="text-dark text-base font-semibold text-center mb-12">
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
                        autoComplete="password-new"
                        textContentType="newPassword"
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
                    <Text className="text-textSecondary text-xs mt-2">
                      Must be 8+ characters with uppercase, lowercase, and number
                    </Text>
                  </View>

                  {/* Confirm Password Input */}
                  <View className="mb-6">
                    <Text className="text-dark text-sm font-medium mb-3">
                      Confirm Password
                    </Text>
                    <View
                      className="flex-row items-center bg-light rounded-2xl px-4 border border-gray-300"
                      style={{ height: 56 }}
                    >
                      <TextInput
                        placeholder="Confirm your password"
                        placeholderTextColor="#9ca3af"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!confirmPasswordVisible}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="password-new"
                        textContentType="newPassword"
                        style={{
                          flex: 1,
                          color: "#061E29",
                          fontSize: 14,
                          fontFamily: "Inter-Regular",
                          textAlignVertical: "center",
                        }}
                      />
                      <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                        <MaterialCommunityIcons
                          name={confirmPasswordVisible ? "eye-off" : "eye"}
                          size={22}
                          color="#5F9598"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Set Password Button */}
                  <TouchableOpacity
                    className="w-full rounded-2xl py-4 mb-4"
                    style={{ backgroundColor: "#1C555E", opacity: isSubmitting ? 0.7 : 1 }}
                    onPress={handleSetPassword}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <ActivityIndicator color="#ffffff" />
                    ) : (
                      <Text className="text-white text-center text-base font-semibold">
                        Continue
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </>
        )}
      </View>
    </Modal>
  );
};
