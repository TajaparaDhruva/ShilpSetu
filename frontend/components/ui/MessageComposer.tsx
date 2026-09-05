import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from './icon-symbol';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';

interface MessageComposerProps {
  onSend: (text: string) => void;
  placeholder?: string;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({
  onSend,
  placeholder = 'Type your message...',
}) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor={ShilpColors.textMuted}
        multiline
      />

      <Pressable
        style={[styles.sendButton, !text.trim() && styles.disabledSendButton]}
        onPress={handleSend}
        disabled={!text.trim()}>
        <IconSymbol name="paperplane.fill" size={18} color={ShilpColors.white} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: ShilpColors.surface,
    borderTopWidth: 1,
    borderTopColor: ShilpColors.borderLight,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    ...Typography.body,
    backgroundColor: ShilpColors.surfaceCard,
    borderRadius: BorderRadius.pill,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 4,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.pill,
    backgroundColor: ShilpColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledSendButton: {
    backgroundColor: ShilpColors.border,
  },
});
