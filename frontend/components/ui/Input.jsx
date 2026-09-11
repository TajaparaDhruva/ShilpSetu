import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet } from



'react-native';
import { Colors, Typography, BorderRadius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";











export const Input = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  helperText,
  editable = true,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [isFocused, setIsFocused] = useState(false);

  const getBorderColor = () => {
    if (error) return theme.error;
    if (isFocused) return theme.primary;
    return theme.border;
  };

  return (/*#__PURE__*/
    _jsxs(View, { style: [styles.container, containerStyle], children: [
      label && /*#__PURE__*/
      _jsx(Text, { style: [Typography.label, { color: theme.textSecondary, marginBottom: Spacing.xs }], children:
        label }
      ), /*#__PURE__*/


      _jsxs(View, {
        style: [
        styles.inputWrapper,
        {
          borderColor: getBorderColor(),
          backgroundColor: editable ? theme.surfaceElevated : theme.surface
        }], children: [


        leftIcon && /*#__PURE__*/_jsx(View, { style: styles.iconLeft, children: leftIcon }), /*#__PURE__*/

        _jsx(TextInput, {
          style: [
          styles.textInput,
          Typography.body,
          { color: theme.text },
          inputStyle],

          placeholderTextColor: theme.textMuted,
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
          editable: editable, ...
          props }
        ),

        rightIcon && /*#__PURE__*/_jsx(View, { style: styles.iconRight, children: rightIcon })] }
      ),

      error ? /*#__PURE__*/
      _jsx(Text, { style: [Typography.caption, { color: theme.error, marginTop: Spacing.xs }], children:
        error }
      ) :
      helperText ? /*#__PURE__*/
      _jsx(Text, { style: [Typography.caption, { color: theme.textMuted, marginTop: Spacing.xs }], children:
        helperText }
      ) :
      null] }
    ));

};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    minHeight: 50
  },
  textInput: {
    flex: 1,
    paddingVertical: Spacing.sm
  },
  iconLeft: {
    marginRight: Spacing.sm
  },
  iconRight: {
    marginLeft: Spacing.sm
  }
});