import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PrimaryButton, InputField } from "../../../shared/components";
import api from "../../../lib/axios";

export const AuthEmailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckEmail = async () => {
    if (!email.trim()) {
      Alert.alert("Email required", "Please enter your email to continue.");
      return;
    }

    setIsChecking(true);
    setError(null);

    try {
      const response = await api.post("/auth/check-email", { 
        email: email.trim() 
      });

      const userExists = response.data.exists;

      if (userExists) {
        // User exists - go to password login
        navigation.navigate("PasswordLogin", { email: email.trim() });
      } else {
        // User doesn't exist - ask if they want to create account
        Alert.alert(
          "New Account",
          "This email is not registered. Would you like to create an account?",
          [
            {
              text: "Cancel",
              onPress: () => setIsChecking(false),
              style: "cancel",
            },
            {
              text: "Create Account",
              onPress: async () => {
                setIsChecking(false);
                // Send verification code
                try {
                  await api.post("/auth/send-code", { 
                    email: email.trim() 
                  });

                  // Go to verify code screen
                  navigation.navigate("VerifyCode", { email: email.trim(), isSignup: true });
                } catch (err: any) {
                  Alert.alert("Error", err.response?.data?.message || "Failed to send verification code");
                }
              },
            },
          ]
        );
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to check email";
      setError(errorMessage);
      Alert.alert("Error", errorMessage);
      setIsChecking(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 mt-2 py-3 border-b border-gray-200">
        <View className="flex-row items-center mt-2 mb-2 justify-between">
          <Pressable onPress={() => navigation.goBack()} className="w-10 items-start" disabled={isChecking}>
            <MaterialCommunityIcons name="chevron-left" size={24} color="#5F9598" />
          </Pressable>
          <View className="flex-1 items-center justify-center px-2">
            <Text className="text-dark text-lg font-semibold text-center" numberOfLines={1}>
              Sign in
            </Text>
          </View>
          <View className="w-10" />
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6 pt-6 pb-8">
            <Text className="text-dark text-xl font-semibold mb-2 text-center">Enter your email</Text>
            <Text className="text-textSecondary text-xs mb-8 text-center">
              We'll check if you have an existing account.
            </Text>

            <InputField
              placeholder="name@example.com"
              value={email}
              onChangeText={(value) => {
                const cleanedValue = value.replace(/[^a-zA-Z0-9@._-]/g, "");
                setEmail(cleanedValue.toLowerCase());
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              errorText={error}
              containerClassName="mb-6"
              editable={!isChecking}
            />

            <PrimaryButton
              title="Continue"
              onPress={handleCheckEmail}
              loading={isChecking}
              className="w-full"
            />

         
            <View className="px-2 mt-4">
              <Text className="text-xs text-textSecondary text-center leading-5 mb-3">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
