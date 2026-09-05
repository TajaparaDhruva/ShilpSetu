import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useLanguage } from '@/store/LanguageContext';
import { Colors, Typography, BorderRadius, Spacing, Palette } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface LanguageToggleProps {
  style?: ViewStyle;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ style }) => {
  const { language, setLanguage } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }, style]}>
      <TouchableOpacity
        onPress={() => setLanguage('hi')}
        activeOpacity={0.8}
        style={[
          styles.pill,
          language === 'hi' && { backgroundColor: theme.primary },
        ]}
      >
        <Text
          style={[
            Typography.caption,
            {
              fontWeight: '700',
              color: language === 'hi' ? '#FFFFFF' : theme.textSecondary,
            },
          ]}
        >
          हिंदी
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setLanguage('en')}
        activeOpacity={0.8}
        style={[
          styles.pill,
          language === 'en' && { backgroundColor: theme.primary },
        ]}
      >
        <Text
          style={[
            Typography.caption,
            {
              fontWeight: '700',
              color: language === 'en' ? '#FFFFFF' : theme.textSecondary,
            },
          ]}
        >
          EN
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    padding: 2,
  },
  pill: {
    paddingHorizontal: Spacing.sm + 4,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
});
