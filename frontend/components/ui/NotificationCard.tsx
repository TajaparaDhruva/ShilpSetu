import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { NotificationItem } from '../../constants/mockData';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { IconSymbol } from './icon-symbol';
import { useApp } from '../../context/AppContext';

interface NotificationCardProps {
  notification: NotificationItem;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const router = useRouter();
  const { markNotificationAsRead } = useApp();

  const handlePress = () => {
    markNotificationAsRead(notification.id);
    if (notification.targetScreen === 'request-detail' && notification.targetId) {
      router.push(`/request/${notification.targetId}`);
    } else if (notification.targetScreen === 'chat' && notification.targetId) {
      router.push(`/chat/${notification.targetId}`);
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'quote':
        return 'indianrupeesign.circle.fill';
      case 'message':
        return 'bubble.left.fill';
      case 'request':
        return 'checkmark.seal.fill';
      default:
        return 'bell.fill';
    }
  };

  return (
    <Pressable
      style={[styles.card, !notification.read && styles.unreadCard]}
      onPress={handlePress}>
      <View style={styles.iconContainer}>
        <IconSymbol name={getIcon() as any} size={22} color={ShilpColors.primary} />
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.title} numberOfLines={1}>
            {notification.title}
          </Text>
          <Text style={styles.timestamp}>{notification.timestamp}</Text>
        </View>

        <Text style={styles.message} numberOfLines={2}>
          {notification.message}
        </Text>
      </View>

      {!notification.read && <View style={styles.unreadDot} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: ShilpColors.surfaceCard,
    borderRadius: BorderRadius.large,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    position: 'relative',
  },
  unreadCard: {
    backgroundColor: '#FFFDF9',
    borderColor: ShilpColors.primary,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.pill,
    backgroundColor: ShilpColors.softPeach,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    ...Typography.heading3,
    fontSize: 15,
    flex: 1,
    marginRight: Spacing.xs,
  },
  timestamp: {
    ...Typography.caption,
    color: ShilpColors.textMuted,
  },
  message: {
    ...Typography.bodySmall,
    color: ShilpColors.textSecondary,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: BorderRadius.pill,
    backgroundColor: ShilpColors.primary,
    position: 'absolute',
    top: 12,
    right: 12,
  },
});
