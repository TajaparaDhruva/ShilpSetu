import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from './icon-symbol';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';

interface EmptyStateProps {
  iconName?: any;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  iconName = 'tray.fill',
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <IconSymbol name={iconName} size={36} color={ShilpColors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {actionLabel && onAction && (
        <Pressable style={styles.actionBtn} onPress={onAction}>
          <Text style={styles.actionBtnText}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['2xl'],
    backgroundColor: ShilpColors.surface,
    borderRadius: BorderRadius.card,
    marginVertical: Spacing.md,
    borderWidth: 1,
    borderColor: ShilpColors.borderLight,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.pill,
    backgroundColor: ShilpColors.softPeach,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.heading2,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  description: {
    ...Typography.bodySmall,
    color: ShilpColors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  actionBtn: {
    backgroundColor: ShilpColors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.pill,
  },
  actionBtnText: {
    ...Typography.button,
    fontSize: 15,
  },
});
