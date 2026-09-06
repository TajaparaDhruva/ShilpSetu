import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Typography, BorderRadius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
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

  const getBorderColor = (): string => {
    if (error) return theme.error;
    if (isFocused) return theme.primary;
    return theme.border;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[Typography.label, { color: theme.textSecondary, marginBottom: Spacing.xs }]}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: getBorderColor(),
            backgroundColor: editable ? theme.surfaceElevated : theme.surface,
          },
        ]}
      >
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

        <TextInput
          style={[
            styles.textInput,
            Typography.body,
            { color: theme.text },
            inputStyle,
          ]}
          placeholderTextColor={theme.textMuted}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={editable}
          {...props}
        />

        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>

      {error ? (
        <Text style={[Typography.caption, { color: theme.error, marginTop: Spacing.xs }]}>
          {error}
        </Text>
      ) : helperText ? (
        <Text style={[Typography.caption, { color: theme.textMuted, marginTop: Spacing.xs }]}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    minHeight: 50,
  },
  textInput: {
    flex: 1,
    paddingVertical: Spacing.sm,
  },
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
  },
});
