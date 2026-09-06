import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import spacing from '../theme/spacing';

interface OutlineButtonProps {
  label: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const OutlineButton: React.FC<OutlineButtonProps> = ({
  label,
  onPress,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={disabled ? undefined : onPress}
      style={[
        styles.button,
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon && iconPosition === 'left' && <View style={styles.leftIcon}>{icon}</View>}
      <Text style={[styles.label, disabled && styles.disabledLabel, textStyle]}>
        {label}
      </Text>
      {icon && iconPosition === 'right' && <View style={styles.rightIcon}>{icon}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: spacing.buttonHeight,
    backgroundColor: 'transparent',
    borderRadius: spacing.borderRadius.pill,
    borderWidth: 1.5,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  disabled: {
    borderColor: colors.border,
  },
  label: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  disabledLabel: {
    color: colors.textMuted,
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    marginLeft: 10,
  },
});

export default OutlineButton;
