import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { OTPInput } from '@/components/ui/OTPInput';
import { Header } from '@/components/ui/Header';
import { useAuth } from '@/store/AuthContext';
import { useLanguage } from '@/store/LanguageContext';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function OTPScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { verifyOTP, isLoading } = useAuth();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const mobileNum = params.mobile || '9876543210';
  const maskedMobile = `+91 ******${mobileNum.slice(-4)}`;

  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    setError('');
    if (code.length < 6) {
      setError(t('invalidOTP'));
      return;
    }

    const res = await verifyOTP({ mobile: mobileNum, otp: code });
    if (res.success) {
      // Route to profile setup for new users or home for verified users
      router.replace('/(onboarding)/profile-setup');
    } else {
      setError(res.message || t('invalidOTP'));
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      setError('');
    }
  };

  return (/*#__PURE__*/
    _jsxs(ScreenWrapper, { scrollable: true, contentContainerStyle: styles.container, children: [/*#__PURE__*/
      _jsx(Header, { title: t('verifyOTPTitle'), showBack: true }), /*#__PURE__*/

      _jsxs(View, { style: styles.content, children: [/*#__PURE__*/
        _jsx(Text, { style: [Typography.h1, { color: theme.text, marginTop: Spacing.md }], children:
          t('verifyOTPTitle') }
        ), /*#__PURE__*/
        _jsxs(Text, { style: [Typography.body, { color: theme.textSecondary, marginTop: Spacing.xs }], children: [
          t('otpSentTo'), " ", /*#__PURE__*/_jsx(Text, { style: { fontWeight: '700', color: theme.text }, children: maskedMobile })] }
        ), /*#__PURE__*/

        _jsx(TouchableOpacity, { onPress: () => router.back(), style: { marginTop: Spacing.xs }, children: /*#__PURE__*/
          _jsx(Text, { style: [Typography.caption, { color: theme.primary }], children:
            t('changeMobile') }
          ) }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.otpWrapper, children: [/*#__PURE__*/
          _jsx(OTPInput, {
            codeLength: 6,
            onChangeCode: (c) => {
              setCode(c);
              if (error) setError('');
            },
            onCodeFilled: (c) => {
              setCode(c);
            },
            error: !!error }
          ),
          error ? /*#__PURE__*/
          _jsx(Text, { style: [Typography.caption, { color: theme.error, marginTop: Spacing.xs, textAlign: 'center' }], children:
            error }
          ) :
          null] }
        ), /*#__PURE__*/


        _jsx(View, { style: styles.resendRow, children:
          timer > 0 ? /*#__PURE__*/
          _jsxs(Text, { style: [Typography.bodySmall, { color: theme.textMuted }], children: [
            t('resendIn'), " ", /*#__PURE__*/_jsxs(Text, { style: { fontWeight: '700', color: theme.primary }, children: [timer, "s"] })] }
          ) : /*#__PURE__*/

          _jsx(TouchableOpacity, { onPress: handleResend, children: /*#__PURE__*/
            _jsx(Text, { style: [Typography.label, { color: theme.primary }], children:
              t('resendOTP') }
            ) }
          ) }

        ), /*#__PURE__*/

        _jsx(Button, {
          title: t('verifyAndContinue'),
          variant: "primary",
          size: "lg",
          loading: isLoading,
          disabled: code.length < 6,
          onPress: handleVerify,
          style: styles.verifyBtn }
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
  otpWrapper: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.md
  },
  resendRow: {
    alignItems: 'center',
    marginVertical: Spacing.md
  },
  verifyBtn: {
    marginTop: Spacing.lg
  }
});