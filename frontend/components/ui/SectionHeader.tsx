import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionText,
  onActionPress,
  style,
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, style]}>
      <View style={styles.textCol}>
        <Text style={[Typography.h3, { color: theme.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[Typography.caption, { color: theme.textMuted, marginTop: 2 }]}>
            {subtitle}
          </Text>
        )}
      </View>

      {actionText && onActionPress && (
        <TouchableOpacity onPress={onActionPress} activeOpacity={0.7}>
          <Text style={[Typography.label, { color: theme.primary }]}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  textCol: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
});
