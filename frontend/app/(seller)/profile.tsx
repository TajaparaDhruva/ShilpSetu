import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Header } from '@/components/ui/Header';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useAuth } from '@/store/AuthContext';
import { useLanguage } from '@/store/LanguageContext';
import { Colors, Typography, Spacing, Palette, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout();
      setShowLogoutModal(false);
      router.replace('/(auth)/login');
    } finally {
      setLogoutLoading(false);
    }
  };

  const name = user?.name || 'Ramprasad Sharma';
  const category = user?.craftCategory || 'Woodwork & Carving';
  const location = user?.location || 'Jaipur, Rajasthan';
  const completion = user?.completionPercentage || 85;

  return (
    <ScreenWrapper scrollable contentContainerStyle={styles.container}>
      <Header
        title={t('profileTitle')}
        rightElement={
          <TouchableOpacity onPress={() => router.push('/(seller)/settings')} style={{ padding: Spacing.xs }}>
            <Text style={{ fontSize: 20 }}>⚙️</Text>
          </TouchableOpacity>
        }
      />

      {/* Main Profile Header Card */}
      <View style={styles.headerSection}>
        <Avatar
          uri={user?.profilePhoto}
          name={name}
          size={84}
          showProgressRing
          completionPercentage={completion}
        />

        <Text style={[Typography.h1, { color: theme.text, marginTop: Spacing.md }]}>{name}</Text>
        <Text style={[Typography.body, { color: theme.primary, fontWeight: '600', marginTop: 2 }]}>
          🎨 {category}
        </Text>
        <Text style={[Typography.bodySmall, { color: theme.textMuted, marginTop: 2 }]}>
          📍 {location}
        </Text>

        {/* Completion Bar */}
        <View style={styles.progressBox}>
          <View style={styles.progressTextRow}>
            <Text style={[Typography.caption, { color: theme.textSecondary }]}>
              {t('completionGauge')}
            </Text>
            <Text style={[Typography.caption, { color: Palette.forestGreen, fontWeight: '700' }]}>
              {completion}%
            </Text>
          </View>
          <View style={[styles.track, { backgroundColor: theme.border }]}>
            <View
              style={[
                styles.fill,
                { width: `${completion}%`, backgroundColor: Palette.forestGreen },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Menu Actions */}
      <View style={styles.menuSection}>
        <Card
          onPress={() => router.push('/(onboarding)/profile-setup')}
          style={styles.menuItem}
        >
          <View style={styles.menuRow}>
            <Text style={styles.menuIcon}>✏️</Text>
            <Text style={[Typography.body, { color: theme.text, flex: 1 }]}>Edit Artisan Profile</Text>
            <Text style={{ color: theme.textMuted }}>→</Text>
          </View>
        </Card>

        <Card
          onPress={() => router.push('/(seller)/products')}
          style={styles.menuItem}
        >
          <View style={styles.menuRow}>
            <Text style={styles.menuIcon}>📦</Text>
            <Text style={[Typography.body, { color: theme.text, flex: 1 }]}>{t('myProductsTitle')}</Text>
            <Text style={{ color: theme.textMuted }}>→</Text>
          </View>
        </Card>

        <Card
          onPress={() => router.push('/(seller)/settings')}
          style={styles.menuItem}
        >
          <View style={styles.menuRow}>
            <Text style={styles.menuIcon}>⚙️</Text>
            <Text style={[Typography.body, { color: theme.text, flex: 1 }]}>{t('settingsTitle')}</Text>
            <Text style={{ color: theme.textMuted }}>→</Text>
          </View>
        </Card>

        {/* Language Selection Card */}
        <Card style={styles.menuItem}>
          <View style={styles.menuRow}>
            <Text style={styles.menuIcon}>🌐</Text>
            <Text style={[Typography.body, { color: theme.text, flex: 1 }]}>App Language</Text>
            <LanguageToggle />
          </View>
        </Card>
      </View>

      {/* Logout Action */}
      <View style={styles.logoutSection}>
        <Button
          title={t('logout')}
          variant="outline"
          size="lg"
          onPress={() => setShowLogoutModal(true)}
          style={styles.logoutBtn}
        />
      </View>

      {/* Logout Dialog */}
      <ConfirmDialog
        visible={showLogoutModal}
        title={t('logoutConfirmTitle')}
        message={t('logoutConfirmMsg')}
        confirmText={t('logout')}
        isDanger
        loading={logoutLoading}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.xxl,
  },
  headerSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  progressBox: {
    width: '100%',
    marginTop: Spacing.md,
    backgroundColor: Palette.creamSurface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  track: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  menuSection: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    gap: Spacing.xs,
  },
  menuItem: {
    paddingVertical: Spacing.md,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: Spacing.md,
  },
  logoutSection: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
  },
  logoutBtn: {
    width: '100%',
  },
});
