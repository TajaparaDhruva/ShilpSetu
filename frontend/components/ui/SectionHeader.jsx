import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";









export const SectionHeader = ({
  title,
  subtitle,
  actionText,
  onActionPress,
  style
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (/*#__PURE__*/
    _jsxs(View, { style: [styles.container, style], children: [/*#__PURE__*/
      _jsxs(View, { style: styles.textCol, children: [/*#__PURE__*/
        _jsx(Text, { style: [Typography.h3, { color: theme.text }], children: title }),
        subtitle && /*#__PURE__*/
        _jsx(Text, { style: [Typography.caption, { color: theme.textMuted, marginTop: 2 }], children:
          subtitle }
        )] }

      ),

      actionText && onActionPress && /*#__PURE__*/
      _jsx(TouchableOpacity, { onPress: onActionPress, activeOpacity: 0.7, children: /*#__PURE__*/
        _jsx(Text, { style: [Typography.label, { color: theme.primary }], children: actionText }) }
      )] }

    ));

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Spacing.md
  },
  textCol: {
    flex: 1,
    paddingRight: Spacing.sm
  }
});