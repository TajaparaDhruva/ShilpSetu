import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '@/store/LanguageContext';
import { Colors, Typography, BorderRadius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";





export const LanguageToggle = ({ style }) => {
  const { language, setLanguage } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (/*#__PURE__*/
    _jsxs(View, { style: [styles.container, { backgroundColor: theme.surface, borderColor: theme.border }, style], children: [/*#__PURE__*/
      _jsx(TouchableOpacity, {
        onPress: () => setLanguage('hi'),
        activeOpacity: 0.8,
        style: [
        styles.pill,
        language === 'hi' && { backgroundColor: theme.primary }], children: /*#__PURE__*/


        _jsx(Text, {
          style: [
          Typography.caption,
          {
            fontWeight: '700',
            color: language === 'hi' ? '#FFFFFF' : theme.textSecondary
          }], children:

          "\u0939\u093F\u0902\u0926\u0940" }

        ) }
      ), /*#__PURE__*/

      _jsx(TouchableOpacity, {
        onPress: () => setLanguage('en'),
        activeOpacity: 0.8,
        style: [
        styles.pill,
        language === 'en' && { backgroundColor: theme.primary }], children: /*#__PURE__*/


        _jsx(Text, {
          style: [
          Typography.caption,
          {
            fontWeight: '700',
            color: language === 'en' ? '#FFFFFF' : theme.textSecondary
          }], children:

          "EN" }

        ) }
      )] }
    ));

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    padding: 2
  },
  pill: {
    paddingHorizontal: Spacing.sm + 4,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full
  }
});