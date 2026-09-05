import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';

export const ChatBubble = ({ message }) => {
  return (
    <View style={[styles.wrapper, message.isMe ? styles.myWrapper : styles.theirWrapper]}>
      <View style={[styles.bubble, message.isMe ? styles.myBubble : styles.theirBubble]}>
        <Text style={[styles.text, message.isMe ? styles.myText : styles.theirText]}>
          {message.text}
        </Text>
        <Text style={[styles.timestamp, message.isMe ? styles.myTimestamp : styles.theirTimestamp]}>
          {message.timestamp}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 4,
    width: '100%',
    flexDirection: 'row',
  },
  myWrapper: {
    justifyContent: 'flex-end',
  },
  theirWrapper: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.large,
  },
  myBubble: {
    backgroundColor: ShilpColors.primary,
    borderBottomRightRadius: 2,
  },
  theirBubble: {
    backgroundColor: ShilpColors.surfaceCard,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    borderBottomLeftRadius: 2,
  },
  text: {
    ...Typography.body,
  },
  myText: {
    color: ShilpColors.white,
  },
  theirText: {
    color: ShilpColors.textPrimary,
  },
  timestamp: {
    ...Typography.caption,
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  myTimestamp: {
    color: 'rgba(255, 255, 255, 0.75)',
  },
  theirTimestamp: {
    color: ShilpColors.textMuted,
  },
});
