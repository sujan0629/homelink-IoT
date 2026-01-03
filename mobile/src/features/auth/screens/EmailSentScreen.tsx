import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Linking,
  Platform,
  ActionSheetIOS,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

interface RouteParams {
  email?: string;
  isSignup?: boolean;
}

const emailApps = [
  { name: "Gmail", iosScheme: "googlegmail://", androidPackage: "com.google.android.gm", fallback: "https://mail.google.com" },
  { name: "Outlook", iosScheme: "ms-outlook://", androidPackage: "com.microsoft.office.outlook", fallback: "https://outlook.live.com" },
  { name: "Mail (iOS)", iosScheme: "message://", androidPackage: null, fallback: null, ios: true },
  { name: "Yahoo Mail", iosScheme: "ymail://", androidPackage: "com.yahoo.mobile.client.android.mail", fallback: "https://mail.yahoo.com" },
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
    } else {
      if (app.androidPackage) {
        const intentURL = `intent://#Intent;package=${app.androidPackage};end`;
        try {
          await Linking.openURL(intentURL);
          return;
        } catch (error) {
          // fall through to fallback handling
        }
      }
      if (app.fallback) {
        await Linking.openURL(app.fallback);
      }
    }
  } catch (error) {
    console.error(`Error opening ${app.name}:`, error);
  }
};

export const EmailSentScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { email = "", isSignup = false } = (route.params as RouteParams) || {};

  const handleOpenEmailApp = () => {
    if (Platform.OS === "ios") {
      const options = ["Gmail", "Outlook", "Mail (iOS)", "Yahoo Mail", "Cancel"];
      ActionSheetIOS.showActionSheetWithOptions(
        { options, cancelButtonIndex: options.length - 1, title: "Choose Email App" },
        (buttonIndex) => {
          if (buttonIndex < emailApps.length) {
            openEmailApp(emailApps[buttonIndex]);
          }
        }
      );
      return;
    }

    openEmailApp(emailApps[0]);
  };

  const handleSecondaryAction = () => {
    if (isSignup) {
      navigation.navigate("VerifyCode", { email });
    } else {
      navigation.navigate("PasswordLogin", { email });
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
          <View
            className="bg-light rounded-full items-center justify-center mb-8"
            style={{ width: 100, height: 100 }}
          >
            <MaterialCommunityIcons name="email-check" size={50} color="#1C555E" />
          </View>

          <Text className="text-dark text-xl font-bold text-center mb-3">Check your email!</Text>
          <Text className="text-textSecondary text-xs text-center mb-2">We sent a confirmation link to</Text>
          <Text className="text-dark text-base font-semibold text-center mb-8">{email || "your email"}</Text>

          <Pressable
            className="w-full rounded-2xl py-4 mb-4"
            style={{ backgroundColor: "#1C555E" }}
            onPress={handleOpenEmailApp}
          >
            <Text className="text-white text-center text-base font-semibold">Open Email App</Text>
          </Pressable>

          <View className="mt-4">
            <Pressable onPress={handleSecondaryAction}>
              <Text className="text-xs text-textSecondary text-center leading-5">
                Having trouble? <Text className="text-primary font-medium">{isSignup ? "Enter verification code instead" : "Enter password instead"}</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
