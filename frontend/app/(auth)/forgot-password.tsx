import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Header } from '@/components/ui/Header';
import { useLanguage } from '@/store/LanguageContext';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

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

  return (
    <ScreenWrapper scrollable contentContainerStyle={styles.container}>
      <Header title="Forgot Password" showBack />

      <View style={styles.content}>
        <Text style={[Typography.h1, { color: theme.text, marginTop: Spacing.md }]}>
          Reset Password
        </Text>
        <Text style={[Typography.body, { color: theme.textSecondary, marginTop: Spacing.xs }]}>
          Enter your registered mobile number to receive a verification OTP.
        </Text>

        {!sent ? (
          <View style={styles.form}>
            <Input
              label={t('mobileNumber')}
              placeholder={t('mobilePlaceholder')}
              keyboardType="phone-pad"
              maxLength={10}
              value={mobile}
              onChangeText={setMobile}
              leftIcon={<Text style={{ fontSize: 16 }}>📱 +91</Text>}
            />

            <Button
              title={t('sendOTP')}
              variant="primary"
              size="lg"
              onPress={handleReset}
              style={styles.submitBtn}
            />
          </View>
        ) : (
          <View style={styles.successBox}>
            <Text style={[Typography.display, { marginBottom: Spacing.sm }]}>✅</Text>
            <Text style={[Typography.h2, { color: theme.text, textAlign: 'center' }]}>
              OTP Sent
            </Text>
            <Text
              style={[
                Typography.body,
                { color: theme.textSecondary, textAlign: 'center', marginTop: Spacing.xs },
              ]}
            >
              Check your mobile messages for the OTP code.
            </Text>
            <Button
              title="Go to Verification"
              variant="primary"
              size="lg"
              onPress={() => router.push({ pathname: '/(auth)/otp', params: { mobile } })}
              style={{ marginTop: Spacing.lg, width: '100%' }}
            />
          </View>
        )}
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
  form: {
    marginTop: Spacing.xl,
  },
  submitBtn: {
    marginTop: Spacing.lg,
  },
  successBox: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
});
