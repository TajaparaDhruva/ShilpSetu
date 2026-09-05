import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AppHeader } from '../../components/ui/AppHeader';
import { IconSymbol } from '../../components/ui/icon-symbol';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { useApp } from '../../context/AppContext';

export default function BuyerProfileScreen() {
  const router = useRouter();
  const { requests, notifications } = useApp();

  const activeRequests = requests.filter((r) => r.status === 'Active' || r.status === 'Quotes Received').length;
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="My Profile" showActions={false} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* User Card */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300' }}
            style={styles.userAvatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Rajesh Sharma</Text>
            <Text style={styles.userEmail}>rajesh.sharma@example.com</Text>
            <View style={styles.locationRow}>
              <IconSymbol name="mappin.circle.fill" size={14} color={ShilpColors.primary} />
              <Text style={styles.locationText}>New Delhi, Delhi</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats Strip */}
        <View style={styles.statsStrip}>
          <Pressable style={styles.statBox} onPress={() => router.push('/(tabs)/requests')}>
            <Text style={styles.statNumber}>{activeRequests}</Text>
            <Text style={styles.statLabel}>Active RFQs</Text>
          </Pressable>

          <View style={styles.statDivider} />

          <Pressable style={styles.statBox} onPress={() => router.push('/(tabs)/saved')}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Saved Artisans</Text>
          </Pressable>

          <View style={styles.statDivider} />

          <Pressable style={styles.statBox} onPress={() => router.push('/notifications')}>
            <Text style={styles.statNumber}>{unreadNotifs}</Text>
            <Text style={styles.statLabel}>Notifications</Text>
          </Pressable>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.menuHeader}>Marketplace Activities</Text>

          <Pressable style={styles.menuItem} onPress={() => router.push('/(tabs)/requests')}>
            <IconSymbol name="doc.text.fill" size={20} color={ShilpColors.primary} />
            <Text style={styles.menuTitle}>My Custom Requirements (RFQs)</Text>
            <IconSymbol name="chevron.right" size={16} color={ShilpColors.textMuted} />
          </Pressable>

          <Pressable style={styles.menuItem} onPress={() => router.push('/chat')}>
            <IconSymbol name="bubble.left.and.bubble.right.fill" size={20} color={ShilpColors.primary} />
            <Text style={styles.menuTitle}>Artisan Messages</Text>
            <IconSymbol name="chevron.right" size={16} color={ShilpColors.textMuted} />
          </Pressable>

          <Pressable style={styles.menuItem} onPress={() => router.push('/(tabs)/saved')}>
            <IconSymbol name="heart.fill" size={20} color={ShilpColors.primary} />
            <Text style={styles.menuTitle}>Saved Artisans & Products</Text>
            <IconSymbol name="chevron.right" size={16} color={ShilpColors.textMuted} />
          </Pressable>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuHeader}>App Preferences & Help</Text>

          <View style={styles.menuItem}>
            <IconSymbol name="globe" size={20} color={ShilpColors.textSecondary} />
            <Text style={styles.menuTitle}>Preferred Language</Text>
            <Text style={styles.menuValue}>English / Hindi</Text>
          </View>

          <View style={styles.menuItem}>
            <IconSymbol name="bell.fill" size={20} color={ShilpColors.textSecondary} />
            <Text style={styles.menuTitle}>Notification Settings</Text>
            <IconSymbol name="chevron.right" size={16} color={ShilpColors.textMuted} />
          </View>

          <View style={styles.menuItem}>
            <IconSymbol name="questionmark.circle.fill" size={20} color={ShilpColors.textSecondary} />
            <Text style={styles.menuTitle}>Help & Craft Support</Text>
            <IconSymbol name="chevron.right" size={16} color={ShilpColors.textMuted} />
          </View>
        </View>

        {/* Logout UI */}
        <Pressable style={styles.logoutBtn}>
          <IconSymbol name="arrow.right.square" size={18} color={ShilpColors.error} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ShilpColors.background,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ShilpColors.surfaceCard,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.pill,
    marginRight: Spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...Typography.heading2,
    fontSize: 20,
    marginBottom: 2,
  },
  userEmail: {
    ...Typography.bodySmall,
    color: ShilpColors.textMuted,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    ...Typography.caption,
    color: ShilpColors.textSecondary,
    fontWeight: '600',
  },
  statsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ShilpColors.surface,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    borderColor: ShilpColors.borderLight,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    ...Typography.heading2,
    color: ShilpColors.primary,
  },
  statLabel: {
    ...Typography.caption,
    color: ShilpColors.textMuted,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: ShilpColors.borderLight,
  },
  menuSection: {
    marginBottom: Spacing.xl,
  },
  menuHeader: {
    ...Typography.label,
    marginBottom: Spacing.xs,
    color: ShilpColors.textMuted,
    paddingLeft: Spacing.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ShilpColors.surfaceCard,
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    borderColor: ShilpColors.borderLight,
    marginBottom: Spacing.xs,
    gap: Spacing.md,
  },
  menuTitle: {
    ...Typography.body,
    fontWeight: '600',
    flex: 1,
  },
  menuValue: {
    ...Typography.caption,
    color: ShilpColors.primary,
    fontWeight: '700',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFF0F0',
    borderWidth: 1,
    borderColor: ShilpColors.error + '40',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.pill,
    marginTop: Spacing.md,
  },
  logoutText: {
    ...Typography.button,
    color: ShilpColors.error,
    fontSize: 15,
  },
});
