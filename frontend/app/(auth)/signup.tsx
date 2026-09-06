import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Header } from '@/components/ui/Header';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useAuth } from '@/store/AuthContext';
import { useLanguage } from '@/store/LanguageContext';
import { Colors, Typography, Spacing, Palette, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function SignupScreen() {
  const router = useRouter();
  const { signup, isLoading } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [category, setCategory] = useState('Woodwork & Carving');
  const [errors, setErrors] = useState<{ name?: string; mobile?: string }>({});

  const categories = [
    'Woodwork & Carving',
    'Pottery & Terracotta',
    'Handloom & Textiles',
    'Artisan Jewelry',
    'Brass & Metal Craft',
    'Traditional Painting',
    'Other Traditional Handicraft',
  ];

  const handleSignup = async () => {
    const errs: { name?: string; mobile?: string } = {};

    if (!name.trim()) errs.name = 'Full name is required';
    if (!mobile.trim() || mobile.trim().length < 10) errs.mobile = 'Enter valid 10-digit mobile number';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    const res = await signup({
      name,
      mobile,
      preferredLanguage: language,
      craftCategory: category,
    });

    if (res.success) {
      router.push({
        pathname: '/(auth)/otp',
        params: { mobile },
      });
    }
  };

  return (
    <ScreenWrapper scrollable contentContainerStyle={styles.container}>
      <Header
        title={t('createNewAccount')}
        showBack
        rightElement={<LanguageToggle />}
      />

      <View style={styles.content}>
        <Text style={[Typography.h1, { color: theme.text, marginTop: Spacing.md }]}>
          {t('createNewAccount')}
        </Text>
        <Text style={[Typography.body, { color: theme.textSecondary, marginTop: Spacing.xs }]}>
          Join ShilpSetu to take your traditional handicraft to global buyers.
        </Text>

        <View style={styles.form}>
          <Input
            label={t('fullName')}
            placeholder={t('fullNamePlaceholder')}
            value={name}
            onChangeText={(v) => {
              setName(v);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            error={errors.name}
            leftIcon={<Text style={{ fontSize: 16 }}>👤</Text>}
          />

          <Input
            label={t('mobileNumber')}
            placeholder={t('mobilePlaceholder')}
            keyboardType="phone-pad"
            maxLength={10}
            value={mobile}
            onChangeText={(v) => {
              setMobile(v);
              if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: undefined }));
            }}
            error={errors.mobile}
            leftIcon={<Text style={{ fontSize: 16 }}>📱 +91</Text>}
          />

          {/* Craft Category Picker */}
          <Text style={[Typography.label, { color: theme.textSecondary, marginTop: Spacing.md, marginBottom: Spacing.xs }]}>
            {t('craftCategory')}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
            {categories.map((cat) => {
              const selected = category === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategory(cat)}
                  activeOpacity={0.8}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: selected ? theme.primary : theme.surface,
                      borderColor: selected ? theme.primary : theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      Typography.caption,
                      { color: selected ? '#FFFFFF' : theme.text, fontWeight: '600' },
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <Button
            title={t('createAccount')}
            variant="primary"
            size="lg"
            loading={isLoading}
            onPress={handleSignup}
            style={styles.submitBtn}
          />
        </View>

        <View style={styles.footerRow}>
          <Text style={[Typography.bodySmall, { color: theme.textMuted }]}>
            {t('alreadyHaveAccount')}
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={[Typography.label, { color: theme.primary, marginLeft: Spacing.xs }]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
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
    marginTop: Spacing.lg,
  },
  categoryScroll: {
    gap: Spacing.xs,
    paddingVertical: Spacing.xs,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  submitBtn: {
    marginTop: Spacing.xl,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
});
