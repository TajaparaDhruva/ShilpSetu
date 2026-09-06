import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';

type StatusType = 'In Stock' | 'Low Stock' | 'Delivered' | 'Processing';

interface StatusBadgeProps {
  status: StatusType;
  style?: ViewStyle;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, style }) => {
  const isSuccess = status === 'In Stock' || status === 'Delivered';

  return (
    <View
      style={[
        styles.badge,
        isSuccess ? styles.successBg : styles.warningBg,
        style,
      ]}
    >
      <Text style={[styles.text, isSuccess ? styles.successText : styles.warningText]}>
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  successBg: {
    backgroundColor: colors.successBg,
  },
  warningBg: {
    backgroundColor: colors.warningBg,
  },
  text: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11,
    fontWeight: '600',
  },
  successText: {
    color: colors.success,
  },
  warningText: {
    color: colors.warning,
  },
});

export default StatusBadge;
