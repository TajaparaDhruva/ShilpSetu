import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { OTPInput } from '@/components/ui/OTPInput';
import { Header } from '@/components/ui/Header';
import { useAuth } from '@/store/AuthContext';
import { useLanguage } from '@/store/LanguageContext';
import { Colors, Typography, Spacing, Palette } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function OTPScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ mobile?: string }>();
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
    let interval: any = null;
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

  return (
    <ScreenWrapper scrollable contentContainerStyle={styles.container}>
      <Header title={t('verifyOTPTitle')} showBack />

      <View style={styles.content}>
        <Text style={[Typography.h1, { color: theme.text, marginTop: Spacing.md }]}>
          {t('verifyOTPTitle')}
        </Text>
        <Text style={[Typography.body, { color: theme.textSecondary, marginTop: Spacing.xs }]}>
          {t('otpSentTo')} <Text style={{ fontWeight: '700', color: theme.text }}>{maskedMobile}</Text>
        </Text>

        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: Spacing.xs }}>
          <Text style={[Typography.caption, { color: theme.primary }]}>
            {t('changeMobile')}
          </Text>
        </TouchableOpacity>

        {/* 6 Digit Grid */}
        <View style={styles.otpWrapper}>
          <OTPInput
            codeLength={6}
            onChangeCode={(c) => {
              setCode(c);
              if (error) setError('');
            }}
            onCodeFilled={(c) => {
              setCode(c);
            }}
            error={!!error}
          />
          {error ? (
            <Text style={[Typography.caption, { color: theme.error, marginTop: Spacing.xs, textAlign: 'center' }]}>
              {error}
            </Text>
          ) : null}
        </View>

        {/* Timer & Resend */}
        <View style={styles.resendRow}>
          {timer > 0 ? (
            <Text style={[Typography.bodySmall, { color: theme.textMuted }]}>
              {t('resendIn')} <Text style={{ fontWeight: '700', color: theme.primary }}>{timer}s</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={[Typography.label, { color: theme.primary }]}>
                {t('resendOTP')}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Button
          title={t('verifyAndContinue')}
          variant="primary"
          size="lg"
          loading={isLoading}
          disabled={code.length < 6}
          onPress={handleVerify}
          style={styles.verifyBtn}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.xl,
  },
  content: {
    paddingHorizontal: Spacing.lg,
  },
  otpWrapper: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  resendRow: {
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  verifyBtn: {
    marginTop: Spacing.lg,
  },
});
