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
import { Colors, Typography, Spacing, Palette, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

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
        completionPercentage: 100,
      });
      router.replace('/(seller)/home');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper scrollable contentContainerStyle={styles.container}>
      <Header title={t('profileSetupTitle')} />

      <View style={styles.content}>
        <Text style={[Typography.h1, { color: theme.text, marginTop: Spacing.md }]}>
          {t('profileSetupTitle')}
        </Text>
        <Text style={[Typography.body, { color: theme.textSecondary, marginTop: Spacing.xs }]}>
          {t('profileSetupSubtitle')}
        </Text>

        {/* Profile Photo Picker */}
        <View style={styles.photoContainer}>
          <Avatar
            uri={user?.profilePhoto}
            name={name}
            size={88}
            showProgressRing
            completionPercentage={85}
          />
          <TouchableOpacity style={[styles.photoBadge, { backgroundColor: theme.primary }]}>
            <Text style={{ fontSize: 14 }}>📷</Text>
          </TouchableOpacity>
          <Text style={[Typography.caption, { color: theme.primary, marginTop: Spacing.sm }]}>
            {t('uploadPhoto')}
          </Text>
        </View>

        {/* Fields */}
        <View style={styles.form}>
          <Input
            label={t('fullName')}
            value={name}
            onChangeText={setName}
            leftIcon={<Text style={{ fontSize: 16 }}>👤</Text>}
          />

          <Input
            label={t('craftCategory')}
            value={user?.craftCategory || 'Woodwork & Carving'}
            editable={false}
            leftIcon={<Text style={{ fontSize: 16 }}>🎨</Text>}
          />

          <Input
            label={t('location')}
            placeholder={t('locationPlaceholder')}
            value={location}
            onChangeText={setLocation}
            leftIcon={<Text style={{ fontSize: 16 }}>📍</Text>}
          />

          <Button
            title={t('completeProfile')}
            variant="primary"
            size="lg"
            loading={loading}
            onPress={handleComplete}
            style={styles.submitBtn}
          />
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
  photoContainer: {
    alignItems: 'center',
    marginVertical: Spacing.lg,
    position: 'relative',
  },
  photoBadge: {
    position: 'absolute',
    bottom: 24,
    right: '36%',
    padding: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
  },
  form: {
    marginTop: Spacing.sm,
  },
  submitBtn: {
    marginTop: Spacing.xl,
  },
});
