import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { AppProvider } from '../context/AppContext';
import { AuthProvider } from '../store/AuthContext';
import { LanguageProvider } from '../store/LanguageContext';
import { ShilpColors } from '../constants/theme';

// Protect against unhandled fatal crashes in Expo Go
if (typeof global !== 'undefined' && global.ErrorUtils) {
  const defaultHandler = global.ErrorUtils.getGlobalHandler();
  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    console.error('Captured Runtime Error:', error?.message || error);
    if (defaultHandler) {
      defaultHandler(error, false); // treat as non-fatal to keep app alive
    }
  });
}

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <LanguageProvider>
          <AppProvider>
            <StatusBar style="dark" />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: ShilpColors.background },
              }}>
            {/* Entry point — redirects to auth/splash */}
            <Stack.Screen name="index" options={{ headerShown: false }} />

            {/* Auth flow screens */}
            <Stack.Screen name="auth/splash" options={{ headerShown: false, animation: 'fade' }} />
            <Stack.Screen name="auth/onboarding-1" options={{ headerShown: false }} />
            <Stack.Screen name="auth/onboarding-2" options={{ headerShown: false }} />
            <Stack.Screen name="auth/onboarding-3" options={{ headerShown: false }} />
            <Stack.Screen name="auth/get-started" options={{ headerShown: false }} />
            <Stack.Screen name="auth/login" options={{ headerShown: false }} />
            <Stack.Screen name="auth/otp-verify" options={{ headerShown: false }} />
            <Stack.Screen name="auth/role-select" options={{ headerShown: false }} />

            {/* Setup / Onboarding flow */}
            <Stack.Screen name="setup/artisan-step-1" options={{ headerShown: false }} />
            <Stack.Screen name="setup/artisan-step-2" options={{ headerShown: false }} />
            <Stack.Screen name="setup/artisan-step-3" options={{ headerShown: false }} />
            <Stack.Screen name="setup/buyer-step-1" options={{ headerShown: false }} />
            <Stack.Screen name="setup/buyer-step-2" options={{ headerShown: false }} />
            <Stack.Screen name="setup/buyer-step-3" options={{ headerShown: false }} />

            {/* Buyer Marketplace Tabs */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Artisan Dashboard Tabs */}
            <Stack.Screen name="(artisan-tabs)" options={{ headerShown: false }} />

            {/* Buyer marketplace detail screens */}
            <Stack.Screen name="artisan/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="rfq/create" options={{ headerShown: false }} />
            <Stack.Screen name="request/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="quote/compare" options={{ headerShown: false }} />
            <Stack.Screen name="chat/index" options={{ headerShown: false }} />
            <Stack.Screen name="chat/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="notifications" options={{ headerShown: false }} />
            <Stack.Screen name="search" options={{ headerShown: false }} />
            <Stack.Screen name="filters" options={{ presentation: 'modal', headerShown: false }} />

            {/* Artisan workflow screens (Screens 17-28) */}
            <Stack.Screen name="artisan/voice-input" options={{ headerShown: false }} />
            <Stack.Screen name="artisan/image-studio" options={{ headerShown: false }} />
            <Stack.Screen name="artisan/catalog-review" options={{ headerShown: false }} />
            <Stack.Screen name="artisan/price-assistant" options={{ headerShown: false }} />
            <Stack.Screen name="artisan/publish-product" options={{ headerShown: false }} />
            <Stack.Screen name="artisan/product-detail" options={{ headerShown: false }} />
            <Stack.Screen name="artisan/product-library" options={{ headerShown: false }} />
            <Stack.Screen name="artisan/business-page" options={{ headerShown: false }} />
            <Stack.Screen name="artisan/capability-profile" options={{ headerShown: false }} />
            <Stack.Screen name="artisan/buyer-opportunities" options={{ headerShown: false }} />
            <Stack.Screen name="artisan/rfq-detail" options={{ headerShown: false }} />
            <Stack.Screen name="artisan/send-quotation" options={{ headerShown: false }} />

            {/* Buyer workflow screens (Screens 29-31) */}
            <Stack.Screen name="buyer/home" options={{ headerShown: false }} />
            <Stack.Screen name="buyer/requirement-creator" options={{ headerShown: false }} />
            <Stack.Screen name="buyer/requirement-review" options={{ headerShown: false }} />
            <Stack.Screen name="buyer/smart-match" options={{ headerShown: false }} />
          </Stack>
        </AppProvider>
      </LanguageProvider>
    </AuthProvider>
  </GestureHandlerRootView>
);
}
