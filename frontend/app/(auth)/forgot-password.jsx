import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Header } from '@/components/ui/Header';
import { useLanguage } from '@/store/LanguageContext';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [mobile, setMobile] = useState('');
  const [sent, setSent] = useState(false);

  const handleReset = () => {
    if (mobile.length >= 10) {
      setSent(true);
    }
  };

  return (/*#__PURE__*/
    _jsxs(ScreenWrapper, { scrollable: true, contentContainerStyle: styles.container, children: [/*#__PURE__*/
      _jsx(Header, { title: "Forgot Password", showBack: true }), /*#__PURE__*/

      _jsxs(View, { style: styles.content, children: [/*#__PURE__*/
        _jsx(Text, { style: [Typography.h1, { color: theme.text, marginTop: Spacing.md }], children: "Reset Password" }

        ), /*#__PURE__*/
        _jsx(Text, { style: [Typography.body, { color: theme.textSecondary, marginTop: Spacing.xs }], children: "Enter your registered mobile number to receive a verification OTP." }

        ),

        !sent ? /*#__PURE__*/
        _jsxs(View, { style: styles.form, children: [/*#__PURE__*/
          _jsx(Input, {
            label: t('mobileNumber'),
            placeholder: t('mobilePlaceholder'),
            keyboardType: "phone-pad",
            maxLength: 10,
            value: mobile,
            onChangeText: setMobile,
            leftIcon: /*#__PURE__*/_jsx(Text, { style: { fontSize: 16 }, children: "\uD83D\uDCF1 +91" }) }
          ), /*#__PURE__*/

          _jsx(Button, {
            title: t('sendOTP'),
            variant: "primary",
            size: "lg",
            onPress: handleReset,
            style: styles.submitBtn }
          )] }
        ) : /*#__PURE__*/

        _jsxs(View, { style: styles.successBox, children: [/*#__PURE__*/
          _jsx(Text, { style: [Typography.display, { marginBottom: Spacing.sm }], children: "\u2705" }), /*#__PURE__*/
          _jsx(Text, { style: [Typography.h2, { color: theme.text, textAlign: 'center' }], children: "OTP Sent" }

          ), /*#__PURE__*/
          _jsx(Text, {
            style: [
            Typography.body,
            { color: theme.textSecondary, textAlign: 'center', marginTop: Spacing.xs }], children:

            "Check your mobile messages for the OTP code." }

          ), /*#__PURE__*/
          _jsx(Button, {
            title: "Go to Verification",
            variant: "primary",
            size: "lg",
            onPress: () => router.push({ pathname: '/(auth)/otp', params: { mobile } }),
            style: { marginTop: Spacing.lg, width: '100%' } }
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
  form: {
    marginTop: Spacing.xl
  },
  submitBtn: {
    marginTop: Spacing.lg
  },
  successBox: {
    alignItems: 'center',
    marginTop: Spacing.xxl
  }
});