import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useAuth } from '@/store/AuthContext';
import { useLanguage } from '@/store/LanguageContext';
import { Colors, Typography, Spacing, Palette } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

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
        params: { mobile },
      });
    } else {
      setError(res.message || t('error'));
    }
  };

  return (
    <ScreenWrapper scrollable contentContainerStyle={styles.container}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <Text style={[Typography.h3, { color: theme.primary }]}>{t('appName')}</Text>
        <LanguageToggle />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={[Typography.display, { color: theme.text }]}>{t('welcome')}</Text>
        <Text style={[Typography.body, { color: theme.textSecondary, marginTop: Spacing.xs }]}>
          {t('welcomeSubtitle')}
        </Text>

        <View style={styles.form}>
          <Input
            label={t('mobileNumber')}
            placeholder={t('mobilePlaceholder')}
            keyboardType="phone-pad"
            maxLength={10}
            value={mobile}
            onChangeText={(v) => {
              setMobile(v);
              if (error) setError('');
            }}
            error={error}
            leftIcon={<Text style={{ fontSize: 16 }}>📱 +91</Text>}
          />

          <Button
            title={t('sendOTP')}
            variant="primary"
            size="lg"
            loading={isLoading}
            onPress={handleSendOTP}
            style={styles.submitBtn}
          />
        </View>

        {/* Link to Signup */}
        <View style={styles.footerRow}>
          <Text style={[Typography.bodySmall, { color: theme.textMuted }]}>
            {t('alreadyHaveAccount') === 'Already have an account?' ? "Don't have an account?" : 'खाता नहीं है?'}
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={[Typography.label, { color: theme.primary, marginLeft: Spacing.xs }]}>
              {t('createNewAccount')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  submitBtn: {
    marginTop: Spacing.lg,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
});
