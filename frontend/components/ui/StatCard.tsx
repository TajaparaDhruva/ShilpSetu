import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Card } from './Card';
import { Colors, Typography, Spacing, Palette } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
  subtext?: string;
  style?: StyleProp<ViewStyle>;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  subtext,
  style,
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <Card style={[styles.card, style]} bordered elevation="sm">
      <View style={styles.header}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text style={[Typography.caption, { color: theme.textMuted, flex: 1 }]} numberOfLines={1}>
          {label}
        </Text>
      </View>
      <Text style={[Typography.h1, { color: theme.primary, marginTop: Spacing.xs }]}>
        {value}
      </Text>
      {subtext && (
        <Text style={[Typography.caption, { color: Palette.forestGreen, marginTop: 2 }]}>
          {subtext}
        </Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md - 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
});
