import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import spacing from '../theme/spacing';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";










export const PrimaryButton = ({
  label,
  onPress,
  disabled = false,
  style,
  textStyle,
  showArrow = true
}) => {
  return (/*#__PURE__*/
    _jsxs(TouchableOpacity, {
      activeOpacity: 0.85,
      onPress: disabled ? undefined : onPress,
      style: [
      styles.button,
      disabled && styles.disabled,
      style], children: [/*#__PURE__*/


      _jsx(Text, { style: [styles.label, disabled && styles.disabledLabel, textStyle], children:
        label }
      ),
      showArrow && /*#__PURE__*/
      _jsx(ArrowRight, { size: 20, color: disabled ? colors.textMuted : colors.white, style: styles.icon })] }

    ));

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
    elevation: 3
  },
  disabled: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0
  },
  label: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 16,
    color: colors.white,
    fontWeight: '600'
  },
  disabledLabel: {
    color: colors.textMuted
  },
  icon: {
    marginLeft: 8
  }
});

export default PrimaryButton;