import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Palette, Typography, BorderRadius, Spacing } from '@/constants/theme';

export type BadgeStatus = 'Draft' | 'Published' | 'Pending' | 'Rejected' | 'Custom';

interface BadgeProps {
  status?: BadgeStatus;
  label?: string;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  status = 'Published',
  label,
  color,
  backgroundColor,
  style,
}) => {
  const getColors = () => {
    if (color && backgroundColor) return { text: color, bg: backgroundColor };

    switch (status) {
      case 'Published':
        return { text: Palette.forestGreen, bg: Palette.forestGreenLight };
      case 'Pending':
        return { text: Palette.warning, bg: Palette.ochreYellowLight };
      case 'Draft':
        return { text: Palette.textSecondary, bg: Palette.borderLight };
      case 'Rejected':
        return { text: Palette.rustRed, bg: Palette.rustRedLight };
      default:
        return { text: Palette.terracotta, bg: Palette.terracottaMuted };
    }
  };

  const { text, bg } = getColors();
  const displayText = label || status;

  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      <Text style={[Typography.caption, { color: text, fontWeight: '600' }]}>
        {displayText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
});
