import React from 'react';
import { Text } from 'react-native';
import { Tabs } from 'expo-router';
import { ShilpColors, Typography } from '../../constants/theme';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function SellerTabsLayout() {
  return (/*#__PURE__*/
    _jsxs(Tabs, {
      screenOptions: {
        headerShown: false,
        tabBarActiveTintColor: ShilpColors.primary,
        tabBarInactiveTintColor: ShilpColors.textMuted,
        tabBarStyle: {
          backgroundColor: ShilpColors.surface,
          borderTopColor: ShilpColors.borderLight,
          height: 64,
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