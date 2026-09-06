import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useAuth } from '@/store/AuthContext';
import { useLanguage } from '@/store/LanguageContext';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function SettingsScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [pushNotifs, setPushNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout();
      setShowLogoutModal(false);
      router.replace('/(auth)/login');
    } finally {
      setLogoutLoading(false);
    }
  };

  return (/*#__PURE__*/
    _jsxs(ScreenWrapper, { scrollable: true, contentContainerStyle: styles.container, children: [/*#__PURE__*/
      _jsx(Header, { title: t('settingsTitle'), showBack: true }), /*#__PURE__*/

      _jsxs(View, { style: styles.content, children: [/*#__PURE__*/

        _jsx(Text, { style: [Typography.label, styles.sectionHeader, { color: theme.textSecondary }], children: "Account & Workshop" }

        ), /*#__PURE__*/
        _jsx(Card, { style: styles.cardGroup, children: /*#__PURE__*/
          _jsxs(TouchableOpacity, {
            onPress: () => router.push('/(onboarding)/profile-setup'),
            activeOpacity: 0.7,
            style: styles.settingItem, children: [/*#__PURE__*/

            _jsx(Text, { style: [Typography.body, { color: theme.text }], children: t('accountSettings') }), /*#__PURE__*/
            _jsxs(Text, { style: { color: theme.textMuted }, children: [user?.mobile, " \u2192"] })] }
          ) }
        ), /*#__PURE__*/


        _jsx(Text, { style: [Typography.label, styles.sectionHeader, { color: theme.textSecondary }], children:
          t('languageSettings') }
        ), /*#__PURE__*/
        _jsx(Card, { style: styles.cardGroup, children: /*#__PURE__*/
          _jsxs(View, { style: styles.settingItem, children: [/*#__PURE__*/
            _jsx(Text, { style: [Typography.body, { color: theme.text }], children: "Preferred Interface Language" }), /*#__PURE__*/
            _jsx(LanguageToggle, {})] }
          ) }
        ), /*#__PURE__*/


        _jsx(Text, { style: [Typography.label, styles.sectionHeader, { color: theme.textSecondary }], children:
          t('notificationSettings') }
        ), /*#__PURE__*/
        _jsxs(Card, { style: styles.cardGroup, children: [/*#__PURE__*/
          _jsxs(View, { style: [styles.settingItem, styles.borderBottom], children: [/*#__PURE__*/
            _jsx(Text, { style: [Typography.body, { color: theme.text }], children: "Push Notifications" }), /*#__PURE__*/
            _jsx(Switch, {
              value: pushNotifs,
              onValueChange: setPushNotifs,
              trackColor: { false: theme.border, true: theme.primary } }
            )] }
          ), /*#__PURE__*/
          _jsxs(View, { style: styles.settingItem, children: [/*#__PURE__*/
            _jsx(Text, { style: [Typography.body, { color: theme.text }], children: "SMS Alerts & Orders" }), /*#__PURE__*/
            _jsx(Switch, {
              value: smsNotifs,
              onValueChange: setSmsNotifs,
              trackColor: { false: theme.border, true: theme.primary } }
            )] }
          )] }
        ), /*#__PURE__*/


        _jsx(Text, { style: [Typography.label, styles.sectionHeader, { color: theme.textSecondary }], children: "Support & Information" }

        ), /*#__PURE__*/
        _jsxs(Card, { style: styles.cardGroup, children: [/*#__PURE__*/
          _jsxs(TouchableOpacity, { activeOpacity: 0.7, style: [styles.settingItem, styles.borderBottom], children: [/*#__PURE__*/
            _jsx(Text, { style: [Typography.body, { color: theme.text }], children: t('helpSupport') }), /*#__PURE__*/
            _jsx(Text, { style: { color: theme.textMuted }, children: "\u2192" })] }
          ), /*#__PURE__*/

          _jsxs(TouchableOpacity, { activeOpacity: 0.7, style: [styles.settingItem, styles.borderBottom], children: [/*#__PURE__*/
            _jsx(Text, { style: [Typography.body, { color: theme.text }], children: t('privacyPolicy') }), /*#__PURE__*/
            _jsx(Text, { style: { color: theme.textMuted }, children: "\u2192" })] }
          ), /*#__PURE__*/

          _jsxs(View, { style: styles.settingItem, children: [/*#__PURE__*/
            _jsx(Text, { style: [Typography.body, { color: theme.text }], children: t('aboutApp') }), /*#__PURE__*/
            _jsx(Text, { style: [Typography.caption, { color: theme.textMuted }], children: "v1.0.0 (SIH 26090)" })] }
          )] }
        ), /*#__PURE__*/


        _jsx(Button, {
          title: t('logout'),
          variant: "danger",
          size: "lg",
          onPress: () => setShowLogoutModal(true),
          style: styles.logoutBtn }
        )] }
      ), /*#__PURE__*/

      _jsx(ConfirmDialog, {
        visible: showLogoutModal,
        title: t('logoutConfirmTitle'),
        message: t('logoutConfirmMsg'),
        confirmText: t('logout'),
        isDanger: true,
        loading: logoutLoading,
        onConfirm: handleLogout,
        onCancel: () => setShowLogoutModal(false) }
      )] }
    ));

}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.xxl
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md
  },
  sectionHeader: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xs
  },
  cardGroup: {
    paddingVertical: 0,
    paddingHorizontal: Spacing.md
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#EADBCF'
  },
  logoutBtn: {
    marginTop: Spacing.xl,
    width: '100%'
  }
});