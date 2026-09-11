import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Header } from '@/components/ui/Header';
import { useAuth } from '@/store/AuthContext';
import { useLanguage } from '@/store/LanguageContext';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function ProfileSetupScreen() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [name, setName] = useState(user?.name || 'Ramprasad Sharma');
  const [location, setLocation] = useState(user?.location || 'Jaipur, Rajasthan');
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    try {
      await updateProfile({
        name,
        location,
        completionPercentage: 100
      });
      router.replace('/(seller)/home');
    } finally {
      setLoading(false);
    }
  };

  return (/*#__PURE__*/
    _jsxs(ScreenWrapper, { scrollable: true, contentContainerStyle: styles.container, children: [/*#__PURE__*/
      _jsx(Header, { title: t('profileSetupTitle') }), /*#__PURE__*/

      _jsxs(View, { style: styles.content, children: [/*#__PURE__*/
        _jsx(Text, { style: [Typography.h1, { color: theme.text, marginTop: Spacing.md }], children:
          t('profileSetupTitle') }
        ), /*#__PURE__*/
        _jsx(Text, { style: [Typography.body, { color: theme.textSecondary, marginTop: Spacing.xs }], children:
          t('profileSetupSubtitle') }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.photoContainer, children: [/*#__PURE__*/
          _jsx(Avatar, {
            uri: user?.profilePhoto,
            name: name,
            size: 88,
            showProgressRing: true,
            completionPercentage: 85 }
          ), /*#__PURE__*/
          _jsx(TouchableOpacity, { style: [styles.photoBadge, { backgroundColor: theme.primary }], children: /*#__PURE__*/
            _jsx(Text, { style: { fontSize: 14 }, children: "\uD83D\uDCF7" }) }
          ), /*#__PURE__*/
          _jsx(Text, { style: [Typography.caption, { color: theme.primary, marginTop: Spacing.sm }], children:
            t('uploadPhoto') }
          )] }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.form, children: [/*#__PURE__*/
          _jsx(Input, {
            label: t('fullName'),
            value: name,
            onChangeText: setName,
            leftIcon: /*#__PURE__*/_jsx(Text, { style: { fontSize: 16 }, children: "\uD83D\uDC64" }) }
          ), /*#__PURE__*/

          _jsx(Input, {
            label: t('craftCategory'),
            value: user?.craftCategory || 'Woodwork & Carving',
            editable: false,
            leftIcon: /*#__PURE__*/_jsx(Text, { style: { fontSize: 16 }, children: "\uD83C\uDFA8" }) }
          ), /*#__PURE__*/

          _jsx(Input, {
            label: t('location'),
            placeholder: t('locationPlaceholder'),
            value: location,
            onChangeText: setLocation,
            leftIcon: /*#__PURE__*/_jsx(Text, { style: { fontSize: 16 }, children: "\uD83D\uDCCD" }) }
          ), /*#__PURE__*/

          _jsx(Button, {
            title: t('completeProfile'),
            variant: "primary",
            size: "lg",
            loading: loading,
            onPress: handleComplete,
            style: styles.submitBtn }
          )] }
        )] }
      )] }
    ));

}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.xl
  },
  content: {
    paddingHorizontal: Spacing.lg
  },
  photoContainer: {
    alignItems: 'center',
    marginVertical: Spacing.lg,
    position: 'relative'
  },
  photoBadge: {
    position: 'absolute',
    bottom: 24,
    right: '36%',
    padding: Spacing.xs + 2,
    borderRadius: BorderRadius.full
  },
  form: {
    marginTop: Spacing.sm
  },
  submitBtn: {
    marginTop: Spacing.xl
  }
});