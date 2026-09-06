import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Button } from './Button';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";













export const ConfirmDialog = ({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = false,
  loading = false,
  onConfirm,
  onCancel
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (/*#__PURE__*/
    _jsx(Modal, { visible: visible, transparent: true, animationType: "fade", onRequestClose: onCancel, children: /*#__PURE__*/
      _jsx(TouchableWithoutFeedback, { onPress: onCancel, children: /*#__PURE__*/
        _jsx(View, { style: styles.overlay, children: /*#__PURE__*/
          _jsx(TouchableWithoutFeedback, { children: /*#__PURE__*/
            _jsxs(View, {
              style: [
              styles.dialog,
              { backgroundColor: theme.cardBg, borderColor: theme.border },
              Shadows.lg], children: [/*#__PURE__*/


              _jsx(Text, { style: [Typography.h2, { color: theme.text }], children: title }), /*#__PURE__*/
              _jsx(Text, {
                style: [
                Typography.body,
                { color: theme.textSecondary, marginTop: Spacing.sm, marginBottom: Spacing.lg }], children:


                message }
              ), /*#__PURE__*/

              _jsxs(View, { style: styles.buttonRow, children: [/*#__PURE__*/
                _jsx(Button, {
                  title: cancelText,
                  variant: "ghost",
                  onPress: onCancel,
                  disabled: loading,
                  style: styles.flexBtn }
                ), /*#__PURE__*/
                _jsx(Button, {
                  title: confirmText,
                  variant: isDanger ? 'danger' : 'primary',
                  onPress: onConfirm,
                  loading: loading,
                  style: styles.flexBtn }
                )] }
              )] }
            ) }
          ) }
        ) }
      ) }
    ));

};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg
  },
  dialog: {
    width: '100%',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm
  },
  flexBtn: {
    flex: 1
  }
});