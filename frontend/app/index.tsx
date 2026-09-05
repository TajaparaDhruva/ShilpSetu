import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useLanguage } from '@/store/LanguageContext';
import { Colors, Typography, Spacing, Palette, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function IntroSplash() {
  const router = useRouter();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <ScreenWrapper scrollable contentContainerStyle={styles.container}>
      {/* Top Header with Language Toggle */}
      <View style={styles.topBar}>
        <View style={styles.badgePill}>
          <Text style={[Typography.caption, { color: Palette.terracotta, fontWeight: '700' }]}>
            SIH 26090
          </Text>
        </View>
        <LanguageToggle />
      </View>

      {/* Hero Visual Card */}
      <View style={styles.heroCard}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80',
          }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay}>
          <Text style={[Typography.display, styles.brandTitle]}>{t('appName')}</Text>
          <Text style={[Typography.h3, styles.brandTagline]}>{t('tagline')}</Text>
        </View>
      </View>

      {/* Supporting Hinglish Banner */}
      <View style={[styles.hinglishBanner, { backgroundColor: Palette.terracottaMuted }]}>
        <Text style={[Typography.body, { color: Palette.terracotta, textAlign: 'center', fontWeight: '600' }]}>
          “{t('introSubtitle')}”
        </Text>
      </View>

      {/* 3 Pillars: PHOTO • VOICE • AI */}
      <View style={styles.pillarsContainer}>
        <View style={[styles.pillarItem, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <Text style={styles.pillarIcon}>📸</Text>
          <Text style={[Typography.label, { color: theme.text }]}>PHOTO</Text>
          <Text style={[Typography.caption, { color: theme.textMuted, textAlign: 'center' }]}>
            Quick camera capture
          </Text>
        </View>

        <View style={[styles.pillarItem, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <Text style={styles.pillarIcon}>🎙</Text>
          <Text style={[Typography.label, { color: theme.text }]}>VOICE</Text>
          <Text style={[Typography.caption, { color: theme.textMuted, textAlign: 'center' }]}>
            Mother-tongue speech
          </Text>
        </View>

        <View style={[styles.pillarItem, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <Text style={styles.pillarIcon}>✨</Text>
          <Text style={[Typography.label, { color: theme.text }]}>AI</Text>
          <Text style={[Typography.caption, { color: theme.textMuted, textAlign: 'center' }]}>
            Smart cataloging
          </Text>
        </View>
      </View>

      {/* Call to Actions */}
      <View style={styles.ctaContainer}>
        <Button
          title={t('introActionSignup')}
          variant="primary"
          size="lg"
          onPress={() => router.push('/(onboarding)/onboarding')}
          style={styles.primaryBtn}
        />

        <Button
          title={t('introActionLogin')}
          variant="outline"
          size="lg"
          onPress={() => router.push('/(auth)/login')}
          style={styles.secondaryBtn}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  badgePill: {
    backgroundColor: Palette.terracottaMuted,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  heroCard: {
    height: 260,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: Spacing.md,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(35, 25, 22, 0.72)',
    padding: Spacing.lg,
  },
  brandTitle: {
    color: '#FFF8F6',
  },
  brandTagline: {
    color: Palette.borderLight,
    marginTop: Spacing.xs,
  },
  hinglishBanner: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginVertical: Spacing.sm,
  },
  pillarsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.xs,
    marginVertical: Spacing.md,
  },
  pillarItem: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  pillarIcon: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  ctaContainer: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  primaryBtn: {
    width: '100%',
  },
  secondaryBtn: {
    width: '100%',
  },
});
