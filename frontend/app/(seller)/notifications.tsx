import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { useLanguage } from '@/store/LanguageContext';
import { notificationService } from '@/services/notifications/notificationService';
import { AppNotification } from '@/constants/mockData';
import { Colors, Typography, Spacing, Palette, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function NotificationsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifs = async () => {
    try {
      const data = await notificationService.getNotifications();
      setNotifications(data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  const handleMarkAllRead = async () => {
    await notificationService.markAllAsRead();
    fetchNotifs();
  };

  const handleItemPress = async (item: AppNotification) => {
    await notificationService.markAsRead(item.id);
    fetchNotifs();

    if (item.relatedEntityId) {
      router.push({
        pathname: '/(seller)/products/[id]',
        params: { id: item.relatedEntityId },
      });
    }
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'product_published':
        return '🎉';
      case 'product_rejected':
        return '⚠️';
      case 'new_inquiry':
        return '💬';
      case 'ai_completed':
        return '✨';
      default:
        return '🔔';
    }
  };

  return (
    <ScreenWrapper style={styles.flex}>
      <Header
        title={t('notificationsTitle')}
        rightElement={
          <TouchableOpacity onPress={handleMarkAllRead} style={{ padding: Spacing.xs }}>
            <Text style={[Typography.caption, { color: theme.primary, fontWeight: '600' }]}>
              {t('markAllRead')}
            </Text>
          </TouchableOpacity>
        }
      />

      <View style={styles.container}>
        {loading ? (
          <LoadingState message="Loading notifications..." />
        ) : notifications.length === 0 ? (
          <EmptyState title={t('noNotifications')} icon="🔔" />
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card
                onPress={() => handleItemPress(item)}
                style={[
                  styles.card,
                  !item.isRead && { backgroundColor: Palette.creamSurface, borderColor: Palette.terracottaMuted },
                ]}
              >
                <View style={styles.row}>
                  <Text style={styles.icon}>{getNotifIcon(item.type)}</Text>

                  <View style={styles.textCol}>
                    <View style={styles.titleRow}>
                      <Text style={[Typography.h3, { color: theme.text, flex: 1 }]} numberOfLines={1}>
                        {item.title}
                      </Text>
                      {!item.isRead && <View style={styles.unreadDot} />}
                    </View>

                    <Text style={[Typography.bodySmall, { color: theme.textSecondary, marginTop: 2 }]}>
                      {item.description}
                    </Text>

                    <Text style={[Typography.caption, { color: theme.textMuted, marginTop: Spacing.xs }]}>
                      {item.timestamp}
                    </Text>
                  </View>
                </View>
              </Card>
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchNotifs} colors={[theme.primary]} />
            }
          />
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  listContent: {
    paddingBottom: Spacing.xl,
  },
  card: {
    marginVertical: Spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 24,
    marginRight: Spacing.md,
    marginTop: 2,
  },
  textCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.terracotta,
    marginLeft: Spacing.xs,
  },
});
