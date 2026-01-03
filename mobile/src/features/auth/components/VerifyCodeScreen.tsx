import React, { useState, useRef } from "react";
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
import { SetPasswordScreen } from "./SetPasswordScreen";

interface VerifyCodeScreenProps {
  visible: boolean;
  email: string;
  onClose: () => void;
  onVerifySuccess?: () => void;
}

export const VerifyCodeScreen: React.FC<VerifyCodeScreenProps> = ({
  visible,
  email,
  onClose,
  onVerifySuccess,
}) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPasswordScreen, setShowPasswordScreen] = useState(false);
  const [verifiedCode, setVerifiedCode] = useState("");
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    // Only allow numbers
    if (text && !/^\d+$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = async () => {
    const fullCode = code.join("");
    
    if (fullCode.length !== 6) {
      Alert.alert("Code required", "Please enter the complete 6-digit verification code.");
      return;
    }

    setIsVerifying(true);

    try {
      // TODO: Replace with actual API endpoint
      const API_URL = __DEV__ ? 'http://192.168.1.77:3001' : 'https://your-api-url.com';
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccess(true);
      setVerifiedCode(fullCode);
      
      setTimeout(() => {
        setShowSuccess(false);
        setIsVerifying(false);
        setShowPasswordScreen(true);
      }, 1500);

      /* Uncomment when backend is ready:
      const response = await fetch(`${API_URL}/api/auth/verify-signup-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          code: fullCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Invalid verification code. Please try again.");
      }

      setShowSuccess(true);
      setVerifiedCode(fullCode);
      
      setTimeout(() => {
        setShowSuccess(false);
        setIsVerifying(false);
        setShowPasswordScreen(true);
      }, 1500);
      */
    } catch (error: any) {
      Alert.alert("Verification Failed", error?.message || "Invalid code. Please try again.");
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    try {
      // TODO: Replace with actual API endpoint
      Alert.alert("Code Sent", "A new verification code has been sent to your email.");
      
      /* Uncomment when backend is ready:
      const API_URL = __DEV__ ? 'http://192.168.1.77:3001' : 'https://your-api-url.com';
      const response = await fetch(`${API_URL}/api/auth/send-signup-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      if (response.ok) {
        Alert.alert("Code Sent", "A new verification code has been sent to your email.");
      }
      */
    } catch (error) {
      Alert.alert("Error", "Failed to resend code. Please try again.");
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
                <TouchableOpacity onPress={onClose} className="w-10" disabled={isVerifying}>
                  <MaterialCommunityIcons name="chevron-left" size={26} color="#5F9598" />
                </TouchableOpacity>

                <View className="flex-1 items-center justify-center px-2">
                  <Text className="text-dark text-lg font-semibold text-center" numberOfLines={1}>
                    Verify Email
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
                  Enter verification code
                </Text>

                {/* Description */}
                <Text className="text-textSecondary text-base text-center mb-2">
                  We sent a 6-digit code to
                </Text>
                <Text className="text-dark text-base font-semibold text-center mb-12">
                  {email}
                </Text>

                {/* Code Input Boxes */}
                <View className="mb-6">
                  <View className="flex-row justify-center gap-3">
                    {code.map((digit, index) => (
                      <View
                        key={index}
                        className="bg-light rounded-xl border border-gray-300"
                        style={{ width: 50, height: 60 }}
                      >
                        <TextInput
                          ref={(ref) => {
                            inputRefs.current[index] = ref;
                          }}
                          className="text-dark font-semibold text-2xl text-center"
                          value={digit}
                          onChangeText={(text) => handleCodeChange(text, index)}
                          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                          keyboardType="number-pad"
                          maxLength={1}
                          autoFocus={index === 0}
                          autoComplete="one-time-code"
                          textContentType="oneTimeCode"
                          secureTextEntry={false}
                          style={{ flex: 1 }}
                        />
                      </View>
                    ))}
                  </View>
                </View>

                {/* Verify Button */}
                <TouchableOpacity
                  className="w-full rounded-2xl py-4 mb-4"
                  style={{ backgroundColor: "#1C555E", opacity: isVerifying ? 0.7 : 1 }}
                  onPress={handleVerifyCode}
                  disabled={isVerifying}
                >
                  {isVerifying ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Text className="text-white text-center text-base font-semibold">
                      Verify & Continue
                    </Text>
                  )}
                </TouchableOpacity>

                {/* Resend Code Link */}
                <View className="mt-4">
                  <TouchableOpacity onPress={handleResendCode} disabled={isVerifying}>
                    <Text className="text-primary text-center text-sm font-medium">
                      Resend code
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </>
        )}
      </View>

      {/* Set Password Screen */}
      <SetPasswordScreen
        visible={showPasswordScreen}
        email={email}
        verificationCode={verifiedCode}
        onClose={() => {
          setShowPasswordScreen(false);
          onClose();
        }}
        onPasswordSet={() => {
          setShowPasswordScreen(false);
          onClose();
          if (onVerifySuccess) {
            onVerifySuccess();
          }
        }}
      />
    </Modal>
  );
};
