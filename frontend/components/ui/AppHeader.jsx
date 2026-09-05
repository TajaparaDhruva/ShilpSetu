import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from './icon-symbol';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { useApp } from '../../context/AppContext';

export const AppHeader = ({
  showBack = false,
  title,
  subtitle,
  showActions = true,
}) => {
  const router = useRouter();
  const { notifications } = useApp();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        {showBack ? (
          <Pressable
            style={styles.iconButton}
            onPress={() => router.back()}
            hitSlop={12}
            accessibilityLabel="Go back">
            <IconSymbol name="chevron.left" size={24} color={ShilpColors.textPrimary} />
          </Pressable>
        ) : (
          <Image
            source={require('../../assets/images/shilpsetu-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        )}

        {title ? (
          <View style={styles.titleWrapper}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {title}
            </Text>
            {subtitle && (
              <Text style={styles.headerSubtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
        ) : null}
      </View>

      {showActions && (
        <View style={styles.rightSection}>
          <Pressable
            style={styles.iconButton}
            onPress={() => router.push('/search')}
            accessibilityLabel="Search">
            <IconSymbol name="magnifyingglass" size={22} color={ShilpColors.textPrimary} />
          </Pressable>

          <Pressable
            style={styles.iconButton}
            onPress={() => router.push('/notifications')}
            accessibilityLabel="Notifications">
            <IconSymbol name="bell.fill" size={22} color={ShilpColors.textPrimary} />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount > 9 ? '9+' : unreadCount}</Text>
              </View>
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    backgroundColor: ShilpColors.surface,
    borderBottomWidth: 1,
    borderBottomColor: ShilpColors.borderLight,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 140,
    height: 38,
  },
  titleWrapper: {
    marginLeft: Spacing.sm,
    flex: 1,
  },
  headerTitle: {
    ...Typography.heading3,
  },
  headerSubtitle: {
    ...Typography.caption,
    color: ShilpColors.textMuted,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.pill,
    backgroundColor: ShilpColors.softPeach,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: ShilpColors.primary,
    borderRadius: BorderRadius.pill,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: ShilpColors.white,
    fontSize: 10,
    fontWeight: '700',
  },
});
