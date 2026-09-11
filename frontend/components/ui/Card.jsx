import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Colors, ShilpColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const Card = ({
  children,
  style,
  onPress,
  elevation = 'sm',
  bordered = true,
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors?.[colorScheme ?? 'light'] || Colors?.light || {};

  const shadowStyle = (Shadows && typeof Shadows === 'object' && Shadows[elevation]) || {};

  const containerStyle = {
    backgroundColor: theme.cardBg || ShilpColors.surfaceCard || '#FFFFFF',
    borderRadius: BorderRadius?.lg || BorderRadius?.large || 16,
    padding: Spacing?.md || 12,
    borderWidth: bordered ? 1 : 0,
    borderColor: theme.border || ShilpColors.borderLight || '#F0DEC9',
    ...shadowStyle,
  };

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={[containerStyle, style]}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[containerStyle, style]}>{children}</View>;
};

export default Card;