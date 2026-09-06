import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import { Colors, Typography, BorderRadius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  testID = 'custom-button',
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const getContainerStyle = (): ViewStyle => {
    let bg = theme.primary;
    let border: string | undefined = undefined;

    switch (variant) {
      case 'primary':
        bg = theme.primary;
        break;
      case 'secondary':
        bg = theme.secondary;
        break;
      case 'outline':
        bg = 'transparent';
        border = theme.primary;
        break;
      case 'ghost':
        bg = 'transparent';
        break;
      case 'danger':
        bg = theme.error;
        break;
    }

    if (disabled) {
      bg = theme.border;
      border = undefined;
    }

    let paddingVertical = Spacing.md;
    let paddingHorizontal = Spacing.lg;

    if (size === 'sm') {
      paddingVertical = Spacing.sm;
      paddingHorizontal = Spacing.md;
    } else if (size === 'lg') {
      paddingVertical = Spacing.md + 4;
      paddingHorizontal = Spacing.xl;
    }

    return {
      backgroundColor: bg,
      borderColor: border,
      borderWidth: border ? 1.5 : 0,
      paddingVertical,
      paddingHorizontal,
      borderRadius: BorderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      opacity: disabled || loading ? 0.7 : 1,
    };
  };

  const getTextColor = (): string => {
    if (disabled) return theme.textMuted;
    switch (variant) {
      case 'outline':
      case 'ghost':
        return theme.primary;
      case 'primary':
      case 'secondary':
      case 'danger':
      default:
        return '#FFFFFF';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[getContainerStyle(), style]}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          {icon && <React.Fragment>{icon}</React.Fragment>}
          <Text
            style={[
              Typography.button,
              { color: getTextColor(), marginLeft: icon ? Spacing.sm : 0 },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};
