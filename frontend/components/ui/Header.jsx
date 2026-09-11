import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";










export const Header = ({
  title,
  showBack = false,
  onBackPress,
  rightElement,
  subtitle,
  style
}) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (/*#__PURE__*/
    _jsxs(View, { style: [styles.container, { borderBottomColor: theme.border }, style], children: [/*#__PURE__*/
      _jsxs(View, { style: styles.leftRow, children: [
        showBack && /*#__PURE__*/
        _jsx(TouchableOpacity, { onPress: handleBack, style: styles.backButton, activeOpacity: 0.7, children: /*#__PURE__*/
          _jsx(Text, { style: [Typography.h2, { color: theme.primary }], children: "\u2190" }) }
        ), /*#__PURE__*/

        _jsxs(View, { style: styles.titleContainer, children: [/*#__PURE__*/
          _jsx(Text, { style: [Typography.h2, { color: theme.text }], numberOfLines: 1, children:
            title }
          ),
          subtitle && /*#__PURE__*/
          _jsx(Text, { style: [Typography.caption, { color: theme.textMuted }], numberOfLines: 1, children:
            subtitle }
          )] }

        )] }
      ),

      rightElement && /*#__PURE__*/_jsx(View, { style: styles.rightContainer, children: rightElement })] }
    ));

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  backButton: {
    marginRight: Spacing.sm,
    paddingRight: Spacing.xs
  },
  titleContainer: {
    flex: 1
  },
  rightContainer: {
    marginLeft: Spacing.sm
  }
});