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

export const AuthEmailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [magicLinkSending, setMagicLinkSending] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [magicLinkError, setMagicLinkError] = useState<string | null>(null);

  const handlePasswordLogin = () => {
    navigation.navigate("PasswordLogin", { email: email.trim() });
  };

  const handleSendMagicLink = async () => {
    if (!email.trim()) {
      Alert.alert("Email required", "Please enter your email to continue.");
      return;
    }

    setMagicLinkError(null);
    setMagicLinkSent(false);
    setMagicLinkSending(true);

    try {
      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 500));
      setMagicLinkSent(true);
      navigation.navigate("EmailSent", { email: email.trim(), isSignup: false });
    } catch (error: any) {
      setMagicLinkError(error?.message || "Something went wrong. Please try again.");
    } finally {
      setMagicLinkSending(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 mt-2 py-3 border-b border-gray-200">
        <View className="flex-row items-center mt-2 mb-2 justify-between">
          <Pressable onPress={() => navigation.goBack()} className="w-10 items-start">
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
              We'll send you a magic link to sign in.
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
              errorText={magicLinkError}
              containerClassName="mb-6"
            />

            <PrimaryButton
              title="Sign in"
              onPress={handleSendMagicLink}
              loading={magicLinkSending}
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
