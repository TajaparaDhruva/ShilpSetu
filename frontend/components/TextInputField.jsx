import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import spacing from '../theme/spacing';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";










export const TextInputField = ({
  label,
  required = false,
  icon,
  rightElement,
  containerStyle,
  error,
  ...rest
}) => {
  return (/*#__PURE__*/
    _jsxs(View, { style: [styles.wrapper, containerStyle], children: [
      label && /*#__PURE__*/
      _jsxs(Text, { style: styles.label, children: [
        label,
        required && /*#__PURE__*/_jsx(Text, { style: styles.asterisk, children: " *" })] }
      ), /*#__PURE__*/


      _jsxs(View, { style: [styles.fieldContainer, error ? styles.errorBorder : null], children: [
        icon && /*#__PURE__*/
        _jsx(View, { style: styles.iconBadge, children:
          icon }
        ), /*#__PURE__*/


        _jsx(TextInput, {
          style: styles.input,
          placeholderTextColor: colors.textMuted, ...
          rest }
        ),

        rightElement && /*#__PURE__*/_jsx(View, { style: styles.rightElement, children: rightElement })] }
      ),

      error && /*#__PURE__*/_jsx(Text, { style: styles.errorText, children: error })] }
    ));

};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    width: '100%'
  },
  label: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 6
  },
  asterisk: {
    color: colors.primary,
    fontWeight: 'bold'
  },
  fieldContainer: {
    height: spacing.inputHeight,
    backgroundColor: colors.bgAlt,
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12
  },
  errorBorder: {
    borderColor: colors.warning
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryTint10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  input: {
    flex: 1,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 14,
    color: colors.textDark,
    paddingVertical: 8
  },
  rightElement: {
    marginLeft: 8
  },
  errorText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.warning,
    marginTop: 4
  }
});

export default TextInputField;