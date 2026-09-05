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
import { EmptyState } from '../../components/ui/EmptyState';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { useApp } from '../../context/AppContext';

export default function ChatListScreen() {
  const router = useRouter();
  const { conversations } = useApp();

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader showBack title="Artisan Messages" subtitle="Buyer ↔ Artisan Discussions" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {conversations.length > 0 ? (
          conversations.map((conv) => (
            <Pressable
              key={conv.id}
              style={styles.convCard}
              onPress={() => router.push(`/chat/${conv.id}`)}>
              <Image source={{ uri: conv.artisanAvatar }} style={styles.avatar} />

              <View style={styles.convContent}>
                <View style={styles.topRow}>
                  <Text style={styles.artisanName} numberOfLines={1}>
                    {conv.artisanName}
                  </Text>
                  <Text style={styles.timestamp}>{conv.lastTimestamp}</Text>
                </View>

                <Text style={styles.craftTag}>{conv.artisanCraft}</Text>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {conv.lastMessage}
                </Text>
              </View>

              {conv.unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{conv.unreadCount}</Text>
                </View>
              )}
            </Pressable>
          ))
        ) : (
          <EmptyState
            iconName="bubble.left.and.bubble.right.fill"
            title="No Conversations Yet"
            description="Start exploring artisans or products to message them directly."
            actionLabel="Discover Artisans"
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
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing['3xl'],
  },
  convCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ShilpColors.surfaceCard,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.pill,
    backgroundColor: ShilpColors.softPeach,
    marginRight: Spacing.md,
  },
  convContent: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  artisanName: {
    ...Typography.heading3,
    fontSize: 16,
    flex: 1,
    marginRight: Spacing.xs,
  },
  timestamp: {
    ...Typography.caption,
    color: ShilpColors.textMuted,
  },
  craftTag: {
    ...Typography.caption,
    color: ShilpColors.primary,
    fontWeight: '600',
    marginBottom: 2,
  },
  lastMessage: {
    ...Typography.bodySmall,
    color: ShilpColors.textSecondary,
  },
  badge: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.pill,
    backgroundColor: ShilpColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.xs,
  },
  badgeText: {
    ...Typography.caption,
    fontSize: 11,
    color: ShilpColors.white,
    fontWeight: '700',
  },
});
