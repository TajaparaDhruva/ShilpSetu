import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import spacing from '../theme/spacing';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";











export const OutlineButton = ({
  label,
  onPress,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  disabled = false
}) => {
  return (/*#__PURE__*/
    _jsxs(TouchableOpacity, {
      activeOpacity: 0.7,
      onPress: disabled ? undefined : onPress,
      style: [
      styles.button,
      disabled && styles.disabled,
      style], children: [


      icon && iconPosition === 'left' && /*#__PURE__*/_jsx(View, { style: styles.leftIcon, children: icon }), /*#__PURE__*/
      _jsx(Text, { style: [styles.label, disabled && styles.disabledLabel, textStyle], children:
        label }
      ),
      icon && iconPosition === 'right' && /*#__PURE__*/_jsx(View, { style: styles.rightIcon, children: icon })] }
    ));

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
    paddingHorizontal: 24
  },
  disabled: {
    borderColor: colors.border
  },
  label: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600'
  },
  disabledLabel: {
    color: colors.textMuted
  },
  leftIcon: {
    marginRight: 10
  },
  rightIcon: {
    marginLeft: 10
  }
});

export default OutlineButton;