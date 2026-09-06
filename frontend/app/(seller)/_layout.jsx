import React from 'react';
import { Text } from 'react-native';
import { Tabs } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLanguage } from '@/store/LanguageContext';
import { notificationService } from '@/services/notifications/notificationService';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function SellerTabsLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { t } = useLanguage();

  const unreadCount = notificationService.getUnreadCount();

  return (/*#__PURE__*/
    _jsxs(Tabs, {
      screenOptions: {
        headerShown: false,
        tabBarActiveTintColor: theme.tabIconSelected,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          backgroundColor: theme.surfaceElevated,
          borderTopColor: theme.border,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600'
        }
      }, children: [/*#__PURE__*/

      _jsx(Tabs.Screen, {
        name: "home",
        options: {
          title: 'Home',
          tabBarIcon: ({ color }) => /*#__PURE__*/_jsx(Text, { style: { fontSize: 20, color }, children: "\uD83C\uDFE0" })
        } }
      ), /*#__PURE__*/
      _jsx(Tabs.Screen, {
        name: "products",
        options: {
          title: 'My Products',
          tabBarIcon: ({ color }) => /*#__PURE__*/_jsx(Text, { style: { fontSize: 20, color }, children: "\uD83D\uDCE6" })
        } }
      ), /*#__PURE__*/
      _jsx(Tabs.Screen, {
        name: "notifications",
        options: {
          title: 'Notifications',
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
          tabBarIcon: ({ color }) => /*#__PURE__*/_jsx(Text, { style: { fontSize: 20, color }, children: "\uD83D\uDD14" })
        } }
      ), /*#__PURE__*/
      _jsx(Tabs.Screen, {
        name: "profile",
        options: {
          title: 'Profile',
          tabBarIcon: ({ color }) => /*#__PURE__*/_jsx(Text, { style: { fontSize: 20, color }, children: "\uD83D\uDC64" })
        } }
      ), /*#__PURE__*/
      _jsx(Tabs.Screen, {
        name: "settings",
        options: {
          href: null // Hide settings from bottom tabs, accessed from profile header
        } }
      )] }
    ));

}