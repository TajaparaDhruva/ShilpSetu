import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Header } from '@/components/ui/Header';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useAuth } from '@/store/AuthContext';
import { useLanguage } from '@/store/LanguageContext';
import { Colors, Typography, Spacing, Palette, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

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

  const name = user?.name || 'Ramprasad Sharma';
  const category = user?.craftCategory || 'Woodwork & Carving';
  const location = user?.location || 'Jaipur, Rajasthan';
  const completion = user?.completionPercentage || 85;

  return (/*#__PURE__*/
    _jsxs(ScreenWrapper, { scrollable: true, contentContainerStyle: styles.container, children: [/*#__PURE__*/
      _jsx(Header, {
        title: t('profileTitle'),
        rightElement: /*#__PURE__*/
        _jsx(TouchableOpacity, { onPress: () => router.push('/(seller)/settings'), style: { padding: Spacing.xs }, children: /*#__PURE__*/
          _jsx(Text, { style: { fontSize: 20 }, children: "\u2699\uFE0F" }) }
        ) }

      ), /*#__PURE__*/


      _jsxs(View, { style: styles.headerSection, children: [/*#__PURE__*/
        _jsx(Avatar, {
          uri: user?.profilePhoto,
          name: name,
          size: 84,
          showProgressRing: true,
          completionPercentage: completion }
        ), /*#__PURE__*/

        _jsx(Text, { style: [Typography.h1, { color: theme.text, marginTop: Spacing.md }], children: name }), /*#__PURE__*/
        _jsxs(Text, { style: [Typography.body, { color: theme.primary, fontWeight: '600', marginTop: 2 }], children: ["\uD83C\uDFA8 ",
          category] }
        ), /*#__PURE__*/
        _jsxs(Text, { style: [Typography.bodySmall, { color: theme.textMuted, marginTop: 2 }], children: ["\uD83D\uDCCD ",
          location] }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.progressBox, children: [/*#__PURE__*/
          _jsxs(View, { style: styles.progressTextRow, children: [/*#__PURE__*/
            _jsx(Text, { style: [Typography.caption, { color: theme.textSecondary }], children:
              t('completionGauge') }
            ), /*#__PURE__*/
            _jsxs(Text, { style: [Typography.caption, { color: Palette.forestGreen, fontWeight: '700' }], children: [
              completion, "%"] }
            )] }
          ), /*#__PURE__*/
          _jsx(View, { style: [styles.track, { backgroundColor: theme.border }], children: /*#__PURE__*/
            _jsx(View, {
              style: [
              styles.fill,
              { width: `${completion}%`, backgroundColor: Palette.forestGreen }] }

            ) }
          )] }
        )] }
      ), /*#__PURE__*/


      _jsxs(View, { style: styles.menuSection, children: [/*#__PURE__*/
        _jsx(Card, {
          onPress: () => router.push('/(onboarding)/profile-setup'),
          style: styles.menuItem, children: /*#__PURE__*/

          _jsxs(View, { style: styles.menuRow, children: [/*#__PURE__*/
            _jsx(Text, { style: styles.menuIcon, children: "\u270F\uFE0F" }), /*#__PURE__*/
            _jsx(Text, { style: [Typography.body, { color: theme.text, flex: 1 }], children: "Edit Artisan Profile" }), /*#__PURE__*/
            _jsx(Text, { style: { color: theme.textMuted }, children: "\u2192" })] }
          ) }
        ), /*#__PURE__*/

        _jsx(Card, {
          onPress: () => router.push('/(seller)/products'),
          style: styles.menuItem, children: /*#__PURE__*/

          _jsxs(View, { style: styles.menuRow, children: [/*#__PURE__*/
            _jsx(Text, { style: styles.menuIcon, children: "\uD83D\uDCE6" }), /*#__PURE__*/
            _jsx(Text, { style: [Typography.body, { color: theme.text, flex: 1 }], children: t('myProductsTitle') }), /*#__PURE__*/
            _jsx(Text, { style: { color: theme.textMuted }, children: "\u2192" })] }
          ) }
        ), /*#__PURE__*/

        _jsx(Card, {
          onPress: () => router.push('/(seller)/settings'),
          style: styles.menuItem, children: /*#__PURE__*/

          _jsxs(View, { style: styles.menuRow, children: [/*#__PURE__*/
            _jsx(Text, { style: styles.menuIcon, children: "\u2699\uFE0F" }), /*#__PURE__*/
            _jsx(Text, { style: [Typography.body, { color: theme.text, flex: 1 }], children: t('settingsTitle') }), /*#__PURE__*/
            _jsx(Text, { style: { color: theme.textMuted }, children: "\u2192" })] }
          ) }
        ), /*#__PURE__*/


        _jsx(Card, { style: styles.menuItem, children: /*#__PURE__*/
          _jsxs(View, { style: styles.menuRow, children: [/*#__PURE__*/
            _jsx(Text, { style: styles.menuIcon, children: "\uD83C\uDF10" }), /*#__PURE__*/
            _jsx(Text, { style: [Typography.body, { color: theme.text, flex: 1 }], children: "App Language" }), /*#__PURE__*/
            _jsx(LanguageToggle, {})] }
          ) }
        )] }
      ), /*#__PURE__*/


      _jsx(View, { style: styles.logoutSection, children: /*#__PURE__*/
        _jsx(Button, {
          title: t('logout'),
          variant: "outline",
          size: "lg",
          onPress: () => setShowLogoutModal(true),
          style: styles.logoutBtn }
        ) }
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
  headerSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg
  },
  progressBox: {
    width: '100%',
    marginTop: Spacing.md,
    backgroundColor: Palette.creamSurface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs
  },
  track: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    borderRadius: 4
  },
  menuSection: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    gap: Spacing.xs
  },
  menuItem: {
    paddingVertical: Spacing.md
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuIcon: {
    fontSize: 20,
    marginRight: Spacing.md
  },
  logoutSection: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl
  },
  logoutBtn: {
    width: '100%'
  }
});