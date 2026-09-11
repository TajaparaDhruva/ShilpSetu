import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { useLanguage } from '@/store/LanguageContext';
import { notificationService } from '@/services/notifications/notificationService';

import { Colors, Typography, Spacing, Palette } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function NotificationsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [notifications, setNotifications] = useState([]);
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

  const handleItemPress = async (item) => {
    await notificationService.markAsRead(item.id);
    fetchNotifs();

    if (item.relatedEntityId) {
      router.push({
        pathname: '/(seller)/products/[id]',
        params: { id: item.relatedEntityId }
      });
    }
  };

  const getNotifIcon = (type) => {
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

  return (/*#__PURE__*/
    _jsxs(ScreenWrapper, { style: styles.flex, children: [/*#__PURE__*/
      _jsx(Header, {
        title: t('notificationsTitle'),
        rightElement: /*#__PURE__*/
        _jsx(TouchableOpacity, { onPress: handleMarkAllRead, style: { padding: Spacing.xs }, children: /*#__PURE__*/
          _jsx(Text, { style: [Typography.caption, { color: theme.primary, fontWeight: '600' }], children:
            t('markAllRead') }
          ) }
        ) }

      ), /*#__PURE__*/

      _jsx(View, { style: styles.container, children:
        loading ? /*#__PURE__*/
        _jsx(LoadingState, { message: "Loading notifications..." }) :
        notifications.length === 0 ? /*#__PURE__*/
        _jsx(EmptyState, { title: t('noNotifications'), icon: "\uD83D\uDD14" }) : /*#__PURE__*/

        _jsx(FlatList, {
          data: notifications,
          keyExtractor: (item) => item.id,
          renderItem: ({ item }) => /*#__PURE__*/
          _jsx(Card, {
            onPress: () => handleItemPress(item),
            style: [
            styles.card,
            !item.isRead && { backgroundColor: Palette.creamSurface, borderColor: Palette.terracottaMuted }], children: /*#__PURE__*/


            _jsxs(View, { style: styles.row, children: [/*#__PURE__*/
              _jsx(Text, { style: styles.icon, children: getNotifIcon(item.type) }), /*#__PURE__*/

              _jsxs(View, { style: styles.textCol, children: [/*#__PURE__*/
                _jsxs(View, { style: styles.titleRow, children: [/*#__PURE__*/
                  _jsx(Text, { style: [Typography.h3, { color: theme.text, flex: 1 }], numberOfLines: 1, children:
                    item.title }
                  ),
                  !item.isRead && /*#__PURE__*/_jsx(View, { style: styles.unreadDot })] }
                ), /*#__PURE__*/

                _jsx(Text, { style: [Typography.bodySmall, { color: theme.textSecondary, marginTop: 2 }], children:
                  item.description }
                ), /*#__PURE__*/

                _jsx(Text, { style: [Typography.caption, { color: theme.textMuted, marginTop: Spacing.xs }], children:
                  item.timestamp }
                )] }
              )] }
            ) }
          ),

          contentContainerStyle: styles.listContent,
          showsVerticalScrollIndicator: false,
          refreshControl: /*#__PURE__*/
          _jsx(RefreshControl, { refreshing: refreshing, onRefresh: fetchNotifs, colors: [theme.primary] }) }

        ) }

      )] }
    ));

}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md
  },
  listContent: {
    paddingBottom: Spacing.xl
  },
  card: {
    marginVertical: Spacing.xs
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  icon: {
    fontSize: 24,
    marginRight: Spacing.md,
    marginTop: 2
  },
  textCol: {
    flex: 1
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.terracotta,
    marginLeft: Spacing.xs
  }
});