import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Colors, ShilpColors, Typography, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Button } from './Button';

export const ConfirmDialog = ({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = false,
  loading = false,
  onConfirm,
  onCancel,
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors?.[colorScheme ?? 'light'] || Colors?.light || {};
  const shadowStyle = Shadows?.lg || {};

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.dialog,
                {
                  backgroundColor: theme.cardBg || ShilpColors.surfaceCard || '#FFFFFF',
                  borderColor: theme.border || ShilpColors.borderLight || '#F0DEC9',
                },
                shadowStyle,
              ]}>
              <Text style={[Typography.heading2, { color: theme.text || ShilpColors.textPrimary }]}>
                {title}
              </Text>
              <Text
                style={[
                  Typography.body,
                  {
                    color: theme.textSecondary || ShilpColors.textSecondary,
                    marginTop: Spacing.sm,
                    marginBottom: Spacing.lg,
                  },
                ]}>
                {message}
              </Text>

              <View style={styles.buttonRow}>
                <Button
                  title={cancelText}
                  variant="ghost"
                  onPress={onCancel}
                  disabled={loading}
                  style={styles.flexBtn}
                />
                <Button
                  title={confirmText}
                  variant={isDanger ? 'danger' : 'primary'}
                  onPress={onConfirm}
                  loading={loading}
                  style={styles.flexBtn}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  dialog: {
    width: '100%',
    borderRadius: BorderRadius.large || 16,
    padding: Spacing.lg,
    borderWidth: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
  },
  flexBtn: {
    flex: 1,
  },
});

export default ConfirmDialog;