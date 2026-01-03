import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EmailSentScreen } from "./EmailSentScreen";

interface AuthBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

export const AuthBottomSheet: React.FC<AuthBottomSheetProps> = ({
  visible,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [magicLinkSending, setMagicLinkSending] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [magicLinkError, setMagicLinkError] = useState<string | null>(null);
  const [showEmailSent, setShowEmailSent] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleSendMagicLink = async () => {
    if (!email.trim()) {
      Alert.alert("Email required", "Please enter your email to continue.");
      return;
    }

    setMagicLinkError(null);
    setMagicLinkSent(false);
    setMagicLinkSending(true);

    try {
      // TODO: Replace with actual API endpoint
      const API_URL = __DEV__ ? 'http://192.168.1.77:3001' : 'https://your-api-url.com';
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, show email sent screen
      setIsSignup(false);
      setMagicLinkSent(true);
      setShowEmailSent(true);
      
      /* Uncomment when backend is ready:
      const response = await fetch(`${API_URL}/api/auth/send-login-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to send sign-in email.");
      }

      setIsSignup(false);
      setMagicLinkSent(true);
      setShowEmailSent(true);
      */
    } catch (error: any) {
      setMagicLinkError(error?.message || "Something went wrong. Please try again.");
    } finally {
      setMagicLinkSending(false);
    }
  };

  const resetState = () => {
    setEmail("");
    setMagicLinkSending(false);
    setMagicLinkSent(false);
    setMagicLinkError(null);
    setShowEmailSent(false);
    setIsSignup(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="px-4 mt-2 py-3 border-b border-gray-200">
          <View className="flex-row items-center mt-2 mb-2 justify-between">
            <View className="w-10" />

            <View className="flex-1 items-center justify-center px-2">
              <Text className="text-dark text-lg font-semibold text-center" numberOfLines={1}>
                Sign in
              </Text>
            </View>

            <TouchableOpacity onPress={handleClose} className="w-10 items-end">
              <MaterialCommunityIcons name="close" size={24} color="#5F9598" />
            </TouchableOpacity>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View className="px-6 pt-6 pb-8">
              <Text className="text-dark text-2xl font-semibold mb-2 text-center">
                Enter your email
              </Text>
              <Text className="text-textSecondary text-sm mb-8 text-center">
                We'll send you a magic link to sign in.
              </Text>

              {/* Email Input */}
              <View className="mb-4">
                <View
                  className="flex-row items-center bg-light rounded-2xl px-4 border border-gray-300"
                  style={{ height: 56 }}
                >
                  <TextInput
                    placeholder="name@example.com"
                    placeholderTextColor="#9ca3af"
                    value={email}
                    onChangeText={(value) => {
                      // Only allow valid email characters
                      const cleanedValue = value.replace(/[^a-zA-Z0-9@._-]/g, '');
                      setEmail(cleanedValue.toLowerCase());
                    }}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoComplete="email"
                    textContentType="emailAddress"
                    style={{
                      flex: 1,
                      color: "#061E29",
                      fontSize: 14,
                      fontFamily: "Inter-Regular",
                      textAlignVertical: "center",
                    }}
                  />
                </View>

                {magicLinkError ? (
                  <View className="flex-row items-center mt-2 gap-2 px-1">
                    <MaterialCommunityIcons name="alert-circle" size={16} color="#ef4444" />
                    <Text className="text-red-500 text-xs flex-1">
                      {magicLinkError}
                    </Text>
                  </View>
                ) : null}

                {magicLinkSent ? (
                  <View className="flex-row items-center mt-2 gap-2 px-1">
                    <MaterialCommunityIcons name="check-circle" size={16} color="#22c55e" />
                    <Text className="text-green-600 text-xs flex-1">
                      Link sent. Check your email!
                    </Text>
                  </View>
                ) : null}
              </View>

              {/* Sign In Button */}
              <TouchableOpacity
                className="rounded-2xl py-4 flex-row items-center justify-center mb-6"
                style={{ backgroundColor: "#1C555E", opacity: magicLinkSending ? 0.7 : 1 }}
                onPress={handleSendMagicLink}
                disabled={magicLinkSending}
              >
                {magicLinkSending ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text className="text-white text-base font-semibold">
                    Sign In with Email
                  </Text>
                )}
              </TouchableOpacity>

              {/* Footer notes */}
              <View className="px-2">
                <Text className="text-xs text-textSecondary text-center leading-5 mb-3">
                  By continuing, you agree to our Terms of Service and Privacy Policy.
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      {/* Email Sent Screen */}
      <EmailSentScreen
        visible={showEmailSent}
        email={email}
        isSignup={isSignup}
        onClose={() => {
          setShowEmailSent(false);
          if (isSignup) {
            resetState();
            onClose();
          }
        }}
      />
    </Modal>
  );
};
