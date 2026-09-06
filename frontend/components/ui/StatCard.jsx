import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './Card';
import { Colors, Typography, Spacing, Palette } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";









export const StatCard = ({
  label,
  value,
  icon,
  subtext,
  style
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (/*#__PURE__*/
    _jsxs(Card, { style: [styles.card, style], bordered: true, elevation: "sm", children: [/*#__PURE__*/
      _jsxs(View, { style: styles.header, children: [
        icon && /*#__PURE__*/_jsx(Text, { style: styles.icon, children: icon }), /*#__PURE__*/
        _jsx(Text, { style: [Typography.caption, { color: theme.textMuted, flex: 1 }], numberOfLines: 1, children:
          label }
        )] }
      ), /*#__PURE__*/
      _jsx(Text, { style: [Typography.h1, { color: theme.primary, marginTop: Spacing.xs }], children:
        value }
      ),
      subtext && /*#__PURE__*/
      _jsx(Text, { style: [Typography.caption, { color: Palette.forestGreen, marginTop: 2 }], children:
        subtext }
      )] }

    ));

};

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md - 2
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    fontSize: 16,
    marginRight: Spacing.xs
  }
});