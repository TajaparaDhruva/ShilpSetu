import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Button } from './Button';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";






export const LoadingState = ({ message = 'Loading...', style }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (/*#__PURE__*/
    _jsxs(View, { style: [styles.centerContainer, style], children: [/*#__PURE__*/
      _jsx(ActivityIndicator, { size: "large", color: theme.primary }), /*#__PURE__*/
      _jsx(Text, { style: [Typography.body, { color: theme.textMuted, marginTop: Spacing.md }], children:
        message }
      )] }
    ));

};








export const ErrorState = ({
  title = 'Something went wrong',
  message = 'Kuch problem aa gayi. Please dobara try karein.',
  onRetry,
  style
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (/*#__PURE__*/
    _jsxs(View, { style: [styles.centerContainer, style], children: [/*#__PURE__*/
      _jsx(Text, { style: [Typography.display, { marginBottom: Spacing.sm }], children: "\u26A0\uFE0F" }), /*#__PURE__*/
      _jsx(Text, { style: [Typography.h2, { color: theme.text, textAlign: 'center' }], children: title }), /*#__PURE__*/
      _jsx(Text, {
        style: [
        Typography.body,
        { color: theme.textSecondary, textAlign: 'center', marginTop: Spacing.xs, marginBottom: Spacing.lg }], children:


        message }
      ),
      onRetry && /*#__PURE__*/_jsx(Button, { title: "Retry", variant: "primary", onPress: onRetry })] }
    ));

};










export const EmptyState = ({
  icon = '📦',
  title,
  subtitle,
  actionTitle,
  onAction,
  style
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (/*#__PURE__*/
    _jsxs(View, { style: [styles.centerContainer, style], children: [/*#__PURE__*/
      _jsx(Text, { style: [Typography.display, { fontSize: 48, marginBottom: Spacing.sm }], children: icon }), /*#__PURE__*/
      _jsx(Text, { style: [Typography.h2, { color: theme.text, textAlign: 'center' }], children: title }),
      subtitle && /*#__PURE__*/
      _jsx(Text, {
        style: [
        Typography.body,
        { color: theme.textMuted, textAlign: 'center', marginTop: Spacing.xs, marginBottom: Spacing.lg }], children:


        subtitle }
      ),

      actionTitle && onAction && /*#__PURE__*/
      _jsx(Button, { title: actionTitle, variant: "primary", onPress: onAction })] }

    ));

};








export const Skeleton = ({
  width = '100%',
  height = 20,
  borderRadius = BorderRadius.sm,
  style
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (/*#__PURE__*/
    _jsx(View, {
      style: [
      {
        width: width,
        height,
        borderRadius,
        backgroundColor: theme.border,
        opacity: 0.6
      },
      style] }

    ));

};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl
  }
});