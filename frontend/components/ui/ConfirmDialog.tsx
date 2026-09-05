import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Button } from './Button';

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
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
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.dialog,
                { backgroundColor: theme.cardBg, borderColor: theme.border },
                Shadows.lg,
              ]}
            >
              <Text style={[Typography.h2, { color: theme.text }]}>{title}</Text>
              <Text
                style={[
                  Typography.body,
                  { color: theme.textSecondary, marginTop: Spacing.sm, marginBottom: Spacing.lg },
                ]}
              >
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
    borderRadius: BorderRadius.lg,
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
