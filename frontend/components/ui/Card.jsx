import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Colors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx } from "react/jsx-runtime";









export const Card = ({
  children,
  style,
  onPress,
  elevation = 'sm',
  bordered = true
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const shadowStyle = Shadows[elevation];

  const containerStyle = {
    backgroundColor: theme.cardBg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: bordered ? 1 : 0,
    borderColor: theme.border,
    ...shadowStyle
  };

  if (onPress) {
    return (/*#__PURE__*/
      _jsx(TouchableOpacity, {
        activeOpacity: 0.85,
        onPress: onPress,
        style: [containerStyle, style], children:

        children }
      ));

  }

  return /*#__PURE__*/_jsx(View, { style: [containerStyle, style], children: children });
};