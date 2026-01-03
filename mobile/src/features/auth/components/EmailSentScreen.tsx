import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  Linking,
  Platform,
  ActionSheetIOS,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PasswordLoginScreen } from "./PasswordLoginScreen";

interface EmailSentScreenProps {
  visible: boolean;
  email: string;
  isSignup?: boolean;
  onClose: () => void;
}

export const EmailSentScreen: React.FC<EmailSentScreenProps> = ({
  visible,
  email,
  isSignup = false,
  onClose,
}) => {
  const [showEmailPicker, setShowEmailPicker] = useState(false);
  const [showPasswordScreen, setShowPasswordScreen] = useState(false);

  const emailApps = [
    { 
      name: "Gmail", 
      iosScheme: "googlegmail://", 
      androidPackage: "com.google.android.gm", 
      fallback: "https://mail.google.com" 
    },
    { 
      name: "Outlook", 
      iosScheme: "ms-outlook://", 
      androidPackage: "com.microsoft.office.outlook", 
      fallback: "https://outlook.live.com" 
    },
    { 
      name: "Mail (iOS)", 
      iosScheme: "message://", 
      androidPackage: null, 
      fallback: null, 
      ios: true 
    },
    { 
      name: "Yahoo Mail", 
      iosScheme: "ymail://", 
      androidPackage: "com.yahoo.mobile.client.android.mail", 
      fallback: "https://mail.yahoo.com" 
    },
  ];

  const openEmailApp = async (app: typeof emailApps[0]) => {
    try {
      if (Platform.OS === "ios") {
        const canOpen = await Linking.canOpenURL(app.iosScheme);
        if (canOpen) {
          await Linking.openURL(app.iosScheme);
        } else if (app.fallback) {
          await Linking.openURL(app.fallback);
        }
      } else if (Platform.OS === "android") {
        if (!app.androidPackage) {
          if (app.fallback) {
            await Linking.openURL(app.fallback);
          }
          return;
        }
        const intentURL = `intent://#Intent;package=${app.androidPackage};end`;
        try {
          await Linking.openURL(intentURL);
        } catch (error) {
          // App not installed, fallback to web
          if (app.fallback) {
            await Linking.openURL(app.fallback);
          }
        }
      }
    } catch (error) {
      console.error(`Error opening ${app.name}:`, error);
    }
    setShowEmailPicker(false);
  };

  const handleOpenEmailApp = () => {
    if (Platform.OS === "ios") {
      const options = [
        ...emailApps.filter(app => !app.ios || Platform.OS === "ios").map(app => app.name),
        "Cancel"
      ];
      
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: options.length - 1,
          title: "Choose Email App",
        },
        (buttonIndex) => {
          if (buttonIndex < emailApps.length) {
            openEmailApp(emailApps[buttonIndex]);
          }
        }
      );
    } else {
      setShowEmailPicker(true);
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
                Email Sent
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
          <View className="items-center">
            {/* Email Illustration Placeholder */}
            <View
              className="bg-light rounded-full items-center justify-center mb-8"
              style={{
                width: 160,
                height: 160,
              }}
            >
              <MaterialCommunityIcons name="email-check" size={80} color="#1C555E" />
            </View>

            {/* Title */}
            <Text className="text-dark text-2xl font-bold text-center mb-3">
              Check your email!
            </Text>

            {/* Description */}
            <Text className="text-textSecondary text-base text-center mb-2">
              We sent a confirmation link to
            </Text>
            <Text className="text-dark text-base font-semibold text-center mb-8">
              {email}
            </Text>

            {/* Open Email App Button */}
            <TouchableOpacity
              className="w-full rounded-2xl py-4 mb-4"
              style={{ backgroundColor: "#1C555E" }}
              onPress={handleOpenEmailApp}
            >
              <Text className="text-white text-center text-base font-semibold">
                Open Email App
              </Text>
            </TouchableOpacity>

            {/* Password Login Option */}
            <View className="mt-4">
              <TouchableOpacity onPress={() => setShowPasswordScreen(true)}>
                <Text className="text-xs text-textSecondary text-center leading-5">
                  Having trouble?{" "}
                  <Text className="text-primary font-medium">
                    Enter password instead
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Android Email Picker Modal */}
      {Platform.OS === "android" && (
        <Modal
          visible={showEmailPicker}
          transparent
          animationType="fade"
          onRequestClose={() => setShowEmailPicker(false)}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "flex-end",
            }}
            activeOpacity={1}
            onPress={() => setShowEmailPicker(false)}
          >
            <View
              className="bg-white rounded-t-3xl pb-8"
            >
              <View className="px-6 py-4 border-b border-gray-200">
                <Text className="text-dark text-lg font-bold">Choose Email App</Text>
              </View>
              <View className="px-6 py-4">
                {emailApps.map((app, index) => (
                  <TouchableOpacity
                    key={index}
                    className="flex-row items-center py-4 border-b border-gray-200"
                    onPress={() => openEmailApp(app)}
                  >
                    <View
                      className="rounded-full items-center justify-center mr-3"
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: "#1C555E",
                      }}
                    >
                      <MaterialCommunityIcons name="email" size={20} color="#ffffff" />
                    </View>
                    <Text className="text-dark text-base font-medium flex-1">
                      {app.name}
                    </Text>
                    <MaterialCommunityIcons name="chevron-right" size={20} color="#5F9598" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      {/* Password Login Screen */}
      <PasswordLoginScreen
        visible={showPasswordScreen}
        email={email}
        onClose={() => setShowPasswordScreen(false)}
        onCloseParent={onClose}
      />
    </Modal>
  );
};
