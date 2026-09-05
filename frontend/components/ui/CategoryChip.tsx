import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { IconSymbol } from './icon-symbol';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';

interface CategoryChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  iconName?: any;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  label,
  selected,
  onPress,
  iconName,
}) => {
  return (
    <Pressable
      style={[styles.chip, selected && styles.selectedChip]}
      onPress={onPress}>
      {iconName && (
        <IconSymbol
          name={iconName}
          size={14}
          color={selected ? ShilpColors.white : ShilpColors.primary}
        />
      )}
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: ShilpColors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.pill,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    marginRight: Spacing.sm,
  },
  selectedChip: {
    backgroundColor: ShilpColors.primary,
    borderColor: ShilpColors.primary,
  },
  label: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: ShilpColors.textPrimary,
  },
  selectedLabel: {
    color: ShilpColors.white,
  },
});
