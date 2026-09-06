import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useAuth } from '@/store/AuthContext';
import { useLanguage } from '@/store/LanguageContext';
import { Colors, Typography, Spacing, Palette } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [pushNotifs, setPushNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
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

  return (
    <ScreenWrapper scrollable contentContainerStyle={styles.container}>
      <Header title={t('settingsTitle')} showBack />

      <View style={styles.content}>
        {/* Section 1: Account */}
        <Text style={[Typography.label, styles.sectionHeader, { color: theme.textSecondary }]}>
          Account & Workshop
        </Text>
        <Card style={styles.cardGroup}>
          <TouchableOpacity
            onPress={() => router.push('/(onboarding)/profile-setup')}
            activeOpacity={0.7}
            style={styles.settingItem}
          >
            <Text style={[Typography.body, { color: theme.text }]}>{t('accountSettings')}</Text>
            <Text style={{ color: theme.textMuted }}>{user?.mobile} →</Text>
          </TouchableOpacity>
        </Card>

        {/* Section 2: Language */}
        <Text style={[Typography.label, styles.sectionHeader, { color: theme.textSecondary }]}>
          {t('languageSettings')}
        </Text>
        <Card style={styles.cardGroup}>
          <View style={styles.settingItem}>
            <Text style={[Typography.body, { color: theme.text }]}>Preferred Interface Language</Text>
            <LanguageToggle />
          </View>
        </Card>

        {/* Section 3: Notifications */}
        <Text style={[Typography.label, styles.sectionHeader, { color: theme.textSecondary }]}>
          {t('notificationSettings')}
        </Text>
        <Card style={styles.cardGroup}>
          <View style={[styles.settingItem, styles.borderBottom]}>
            <Text style={[Typography.body, { color: theme.text }]}>Push Notifications</Text>
            <Switch
              value={pushNotifs}
              onValueChange={setPushNotifs}
              trackColor={{ false: theme.border, true: theme.primary }}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={[Typography.body, { color: theme.text }]}>SMS Alerts & Orders</Text>
            <Switch
              value={smsNotifs}
              onValueChange={setSmsNotifs}
              trackColor={{ false: theme.border, true: theme.primary }}
            />
          </View>
        </Card>

        {/* Section 4: Support & About */}
        <Text style={[Typography.label, styles.sectionHeader, { color: theme.textSecondary }]}>
          Support & Information
        </Text>
        <Card style={styles.cardGroup}>
          <TouchableOpacity activeOpacity={0.7} style={[styles.settingItem, styles.borderBottom]}>
            <Text style={[Typography.body, { color: theme.text }]}>{t('helpSupport')}</Text>
            <Text style={{ color: theme.textMuted }}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} style={[styles.settingItem, styles.borderBottom]}>
            <Text style={[Typography.body, { color: theme.text }]}>{t('privacyPolicy')}</Text>
            <Text style={{ color: theme.textMuted }}>→</Text>
          </TouchableOpacity>

          <View style={styles.settingItem}>
            <Text style={[Typography.body, { color: theme.text }]}>{t('aboutApp')}</Text>
            <Text style={[Typography.caption, { color: theme.textMuted }]}>v1.0.0 (SIH 26090)</Text>
          </View>
        </Card>

        {/* Logout Button */}
        <Button
          title={t('logout')}
          variant="danger"
          size="lg"
          onPress={() => setShowLogoutModal(true)}
          style={styles.logoutBtn}
        />
      </View>

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
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  sectionHeader: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  cardGroup: {
    paddingVertical: 0,
    paddingHorizontal: Spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#EADBCF',
  },
  logoutBtn: {
    marginTop: Spacing.xl,
    width: '100%',
  },
});
