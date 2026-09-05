import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from './icon-symbol';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We could not load the requested craft data. Please try again.',
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <IconSymbol name="exclamationmark.triangle.fill" size={32} color={ShilpColors.error} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      <Pressable style={styles.retryBtn} onPress={onRetry}>
        <IconSymbol name="arrow.clockwise" size={16} color={ShilpColors.white} />
        <Text style={styles.retryBtnText}>Retry Now</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    backgroundColor: '#FFF5F5',
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: ShilpColors.error + '30',
    marginVertical: Spacing.md,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.pill,
    backgroundColor: ShilpColors.error + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.heading3,
    color: ShilpColors.error,
    marginBottom: Spacing.xs,
  },
  message: {
    ...Typography.bodySmall,
    color: ShilpColors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: ShilpColors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.pill,
  },
  retryBtnText: {
    ...Typography.button,
    fontSize: 14,
  },
});
