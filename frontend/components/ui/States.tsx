import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Button } from './Button';

interface LoadingStateProps {
  message?: string;
  style?: ViewStyle;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...', style }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.centerContainer, style]}>
      <ActivityIndicator size="large" color={theme.primary} />
      <Text style={[Typography.body, { color: theme.textMuted, marginTop: Spacing.md }]}>
        {message}
      </Text>
    </View>
  );
};

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'Kuch problem aa gayi. Please dobara try karein.',
  onRetry,
  style,
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.centerContainer, style]}>
      <Text style={[Typography.display, { marginBottom: Spacing.sm }]}>⚠️</Text>
      <Text style={[Typography.h2, { color: theme.text, textAlign: 'center' }]}>{title}</Text>
      <Text
        style={[
          Typography.body,
          { color: theme.textSecondary, textAlign: 'center', marginTop: Spacing.xs, marginBottom: Spacing.lg },
        ]}
      >
        {message}
      </Text>
      {onRetry && <Button title="Retry" variant="primary" onPress={onRetry} />}
    </View>
  );
};

interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
  actionTitle?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📦',
  title,
  subtitle,
  actionTitle,
  onAction,
  style,
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.centerContainer, style]}>
      <Text style={[Typography.display, { fontSize: 48, marginBottom: Spacing.sm }]}>{icon}</Text>
      <Text style={[Typography.h2, { color: theme.text, textAlign: 'center' }]}>{title}</Text>
      {subtitle && (
        <Text
          style={[
            Typography.body,
            { color: theme.textMuted, textAlign: 'center', marginTop: Spacing.xs, marginBottom: Spacing.lg },
          ]}
        >
          {subtitle}
        </Text>
      )}
      {actionTitle && onAction && (
        <Button title={actionTitle} variant="primary" onPress={onAction} />
      )}
    </View>
  );
};

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = BorderRadius.sm,
  style,
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: theme.border,
          opacity: 0.6,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
});
