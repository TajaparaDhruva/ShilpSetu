import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useAuth } from '@/store/AuthContext';
import { useLanguage } from '@/store/LanguageContext';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const handleSendOTP = async () => {
    setError('');
    if (!mobile || mobile.trim().length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    const res = await login({ mobile });
    if (res.success) {
      router.push({
        pathname: '/(auth)/otp',
        params: { mobile }
      });
    } else {
      setError(res.message || t('error'));
    }
  };

  return (/*#__PURE__*/
    _jsxs(ScreenWrapper, { scrollable: true, contentContainerStyle: styles.container, children: [/*#__PURE__*/

      _jsxs(View, { style: styles.headerBar, children: [/*#__PURE__*/
        _jsx(Text, { style: [Typography.h3, { color: theme.primary }], children: t('appName') }), /*#__PURE__*/
        _jsx(LanguageToggle, {})] }
      ), /*#__PURE__*/


      _jsxs(View, { style: styles.content, children: [/*#__PURE__*/
        _jsx(Text, { style: [Typography.display, { color: theme.text }], children: t('welcome') }), /*#__PURE__*/
        _jsx(Text, { style: [Typography.body, { color: theme.textSecondary, marginTop: Spacing.xs }], children:
          t('welcomeSubtitle') }
        ), /*#__PURE__*/

        _jsxs(View, { style: styles.form, children: [/*#__PURE__*/
          _jsx(Input, {
            label: t('mobileNumber'),
            placeholder: t('mobilePlaceholder'),
            keyboardType: "phone-pad",
            maxLength: 10,
            value: mobile,
            onChangeText: (v) => {
              setMobile(v);
              if (error) setError('');
            },
            error: error,
            leftIcon: /*#__PURE__*/_jsx(Text, { style: { fontSize: 16 }, children: "\uD83D\uDCF1 +91" }) }
          ), /*#__PURE__*/

          _jsx(Button, {
            title: t('sendOTP'),
            variant: "primary",
            size: "lg",
            loading: isLoading,
            onPress: handleSendOTP,
            style: styles.submitBtn }
          )] }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.footerRow, children: [/*#__PURE__*/
          _jsx(Text, { style: [Typography.bodySmall, { color: theme.textMuted }], children:
            t('alreadyHaveAccount') === 'Already have an account?' ? "Don't have an account?" : 'खाता नहीं है?' }
          ), /*#__PURE__*/
          _jsx(TouchableOpacity, { onPress: () => router.push('/(auth)/signup'), children: /*#__PURE__*/
            _jsx(Text, { style: [Typography.label, { color: theme.primary, marginLeft: Spacing.xs }], children:
              t('createNewAccount') }
            ) }
          )] }
        )] }
      )] }
    ));

}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    justifyContent: 'space-between'
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  form: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg
  },
  submitBtn: {
    marginTop: Spacing.lg
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.lg
  }
});