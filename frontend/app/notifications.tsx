import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AppHeader } from '../components/ui/AppHeader';
import { NotificationCard } from '../components/ui/NotificationCard';
import { EmptyState } from '../components/ui/EmptyState';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function NotificationsScreen() {
  const router = useRouter();
  const { notifications } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader showBack title="Notifications" subtitle="Updates on quotes, messages & RFQs" />

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, filter === 'all' && styles.activeTab]}
          onPress={() => setFilter('all')}>
          <Text style={[styles.tabText, filter === 'all' && styles.activeTabText]}>
            All ({notifications.length})
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, filter === 'unread' && styles.activeTab]}
          onPress={() => setFilter('unread')}>
          <Text style={[styles.tabText, filter === 'unread' && styles.activeTabText]}>
            Unread ({notifications.filter((n) => !n.read).length})
          </Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((notif) => <NotificationCard key={notif.id} notification={notif} />)
        ) : (
          <EmptyState
            iconName="bell.fill"
            title="No Notifications"
            description="You are all caught up! New quotes, messages, and updates will appear here."
            actionLabel="Discover Crafts"
            onAction={() => router.push('/(tabs)/index')}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ShilpColors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: ShilpColors.surface,
    padding: Spacing.xs,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    borderRadius: BorderRadius.pill,
    borderWidth: 1,
    borderColor: ShilpColors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.xs + 4,
    borderRadius: BorderRadius.pill,
  },
  activeTab: {
    backgroundColor: ShilpColors.primary,
  },
  tabText: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: ShilpColors.textSecondary,
  },
  activeTabText: {
    color: ShilpColors.white,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing['3xl'],
  },
});
