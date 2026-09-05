import React from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from './icon-symbol';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFilterPress?: () => void;
  onSubmit?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search craft, artisans, products...',
  onFilterPress,
  onSubmit,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <IconSymbol name="magnifyingglass" size={20} color={ShilpColors.textMuted} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={ShilpColors.textMuted}
          returnKeyType="search"
          onSubmitEditing={onSubmit}
        />
        {value.length > 0 && (
          <Pressable onPress={() => onChangeText('')} hitSlop={10}>
            <IconSymbol name="xmark.circle.fill" size={18} color={ShilpColors.textMuted} />
          </Pressable>
        )}
      </View>

      {onFilterPress && (
        <Pressable style={styles.filterBtn} onPress={onFilterPress} accessibilityLabel="Open filters">
          <IconSymbol name="slider.horizontal.3" size={20} color={ShilpColors.textPrimary} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ShilpColors.surface,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.md,
    height: 48,
    gap: Spacing.xs,
  },
  input: {
    flex: 1,
    ...Typography.body,
    paddingVertical: 0,
  },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.pill,
    backgroundColor: ShilpColors.softPeach,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: ShilpColors.border,
  },
});
