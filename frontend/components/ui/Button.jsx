import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator } from




'react-native';
import { Colors, Typography, BorderRadius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";

















export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  testID = 'custom-button'
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const getContainerStyle = () => {
    let bg = theme.primary;
    let border = undefined;

    switch (variant) {
      case 'primary':
        bg = theme.primary;
        break;
      case 'secondary':
        bg = theme.secondary;
        break;
      case 'outline':
        bg = 'transparent';
        border = theme.primary;
        break;
      case 'ghost':
        bg = 'transparent';
        break;
      case 'danger':
        bg = theme.error;
        break;
    }

    if (disabled) {
      bg = theme.border;
      border = undefined;
    }

    let paddingVertical = Spacing.md;
    let paddingHorizontal = Spacing.lg;

    if (size === 'sm') {
      paddingVertical = Spacing.sm;
      paddingHorizontal = Spacing.md;
    } else if (size === 'lg') {
      paddingVertical = Spacing.md + 4;
      paddingHorizontal = Spacing.xl;
    }

    return {
      backgroundColor: bg,
      borderColor: border,
      borderWidth: border ? 1.5 : 0,
      paddingVertical,
      paddingHorizontal,
      borderRadius: BorderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      opacity: disabled || loading ? 0.7 : 1
    };
  };

  const getTextColor = () => {
    if (disabled) return theme.textMuted;
    switch (variant) {
      case 'outline':
      case 'ghost':
        return theme.primary;
      case 'primary':
      case 'secondary':
      case 'danger':
      default:
        return '#FFFFFF';
    }
  };

  return (/*#__PURE__*/
    _jsx(TouchableOpacity, {
      onPress: onPress,
      disabled: disabled || loading,
      activeOpacity: 0.8,
      style: [getContainerStyle(), style],
      accessibilityRole: "button",
      accessibilityState: { disabled: disabled || loading },
      testID: testID, children:

      loading ? /*#__PURE__*/
      _jsx(ActivityIndicator, { color: getTextColor(), size: "small" }) : /*#__PURE__*/

      _jsxs(_Fragment, { children: [
        icon && /*#__PURE__*/_jsx(React.Fragment, { children: icon }), /*#__PURE__*/
        _jsx(Text, {
          style: [
          Typography.button,
          { color: getTextColor(), marginLeft: icon ? Spacing.sm : 0 },
          textStyle], children:


          title }
        )] }
      ) }

    ));

};