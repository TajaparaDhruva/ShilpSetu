import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ShilpColors, Spacing, BorderRadius } from '../../constants/theme';

export const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.cardSkeleton}>
          <View style={styles.imagePlaceholder} />
          <View style={styles.contentPlaceholder}>
            <View style={styles.lineTitle} />
            <View style={styles.lineSub} />
            <View style={styles.lineShort} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.md,
  },
  cardSkeleton: {
    backgroundColor: ShilpColors.surface,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: ShilpColors.borderLight,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: '100%',
    height: 140,
    backgroundColor: ShilpColors.softPeach,
    opacity: 0.6,
  },
  contentPlaceholder: {
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  lineTitle: {
    width: '70%',
    height: 18,
    backgroundColor: ShilpColors.border,
    borderRadius: 4,
  },
  lineSub: {
    width: '40%',
    height: 14,
    backgroundColor: ShilpColors.borderLight,
    borderRadius: 4,
  },
  lineShort: {
    width: '90%',
    height: 12,
    backgroundColor: ShilpColors.borderLight,
    borderRadius: 4,
    marginTop: 4,
  },
});
