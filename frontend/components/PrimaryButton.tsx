import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import spacing from '../theme/spacing';

interface PrimaryButtonProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  showArrow?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  disabled = false,
  style,
  textStyle,
  showArrow = true,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={disabled ? undefined : onPress}
      style={[
        styles.button,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.label, disabled && styles.disabledLabel, textStyle]}>
        {label}
      </Text>
      {showArrow && (
        <ArrowRight size={20} color={disabled ? colors.textMuted : colors.white} style={styles.icon} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: spacing.buttonHeight,
    backgroundColor: colors.primary,
    borderRadius: spacing.borderRadius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  disabled: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  label: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
  },
  disabledLabel: {
    color: colors.textMuted,
  },
  icon: {
    marginLeft: 8,
  },
});

export default PrimaryButton;
