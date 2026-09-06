import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Typography, Palette, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  showProgressRing?: boolean;
  completionPercentage?: number;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  size = 56,
  showProgressRing = false,
  completionPercentage = 85,
  style,
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const getInitials = (n?: string) => {
    if (!n) return 'A';
    const parts = n.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
  };

  const ringColor = completionPercentage >= 80 ? Palette.forestGreen : Palette.ochreYellow;

  return (
    <View
      style={[
        styles.container,
        {
          width: size + (showProgressRing ? 8 : 0),
          height: size + (showProgressRing ? 8 : 0),
          borderRadius: (size + (showProgressRing ? 8 : 0)) / 2,
          borderColor: showProgressRing ? ringColor : 'transparent',
          borderWidth: showProgressRing ? 2.5 : 0,
        },
        style,
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.placeholder,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: theme.primaryLight,
            },
          ]}
        >
          <Text style={[Typography.h3, { color: theme.primary }]}>
            {getInitials(name)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
