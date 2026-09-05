import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AppHeader } from '../components/ui/AppHeader';
import { CATEGORIES } from '../constants/mockData';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { IconSymbol } from '../components/ui/icon-symbol';

const LOCATIONS = ['All India', 'Uttar Pradesh', 'Rajasthan', 'Karnataka', 'Delhi'];
const RATINGS = [0, 4.0, 4.5, 4.8];
const PRICE_PRESETS = [2000, 5000, 15000, 50000];

export default function FiltersModalScreen() {
  const router = useRouter();
  const { filters, updateFilters, resetFilters } = useApp();

  const [selectedCat, setSelectedCat] = useState(filters.category);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);
  const [minRating, setMinRating] = useState(filters.minRating);
  const [location, setLocation] = useState(filters.location);

  const handleApply = () => {
    updateFilters({
      category: selectedCat,
      maxPrice,
      minRating,
      location,
    });
    router.back();
  };

  const handleReset = () => {
    resetFilters();
    setSelectedCat('All');
    setMaxPrice(50000);
    setMinRating(0);
    setLocation('All India');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader showBack title="Filter Crafts & Artisans" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Craft Category</Text>
          <View style={styles.pillWrap}>
            <Pressable
              style={[styles.pill, selectedCat === 'All' && styles.activePill]}
              onPress={() => setSelectedCat('All')}>
              <Text style={[styles.pillText, selectedCat === 'All' && styles.activePillText]}>
                All Categories
              </Text>
            </Pressable>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat.id}
                style={[styles.pill, selectedCat === cat.name && styles.activePill]}
                onPress={() => setSelectedCat(cat.name)}>
                <Text style={[styles.pillText, selectedCat === cat.name && styles.activePillText]}>
                  {cat.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Max Price Budget</Text>
          <Text style={styles.selectedVal}>Up to ₹{maxPrice.toLocaleString('en-IN')}</Text>
          <View style={styles.pillWrap}>
            {PRICE_PRESETS.map((price) => (
              <Pressable
                key={price}
                style={[styles.pill, maxPrice === price && styles.activePill]}
                onPress={() => setMaxPrice(price)}>
                <Text style={[styles.pillText, maxPrice === price && styles.activePillText]}>
                  Under ₹{price.toLocaleString('en-IN')}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Minimum Rating</Text>
          <View style={styles.pillWrap}>
            {RATINGS.map((rating) => (
              <Pressable
                key={rating}
                style={[styles.pill, minRating === rating && styles.activePill]}
                onPress={() => setMinRating(rating)}>
                <View style={styles.ratingRow}>
                  <IconSymbol
                    name="star.fill"
                    size={14}
                    color={minRating === rating ? ShilpColors.white : ShilpColors.warning}
                  />
                  <Text style={[styles.pillText, minRating === rating && styles.activePillText]}>
                    {rating === 0 ? 'Any Rating' : `${rating}+ Stars`}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Artisan Location</Text>
          <View style={styles.pillWrap}>
            {LOCATIONS.map((loc) => (
              <Pressable
                key={loc}
                style={[styles.pill, location === loc && styles.activePill]}
                onPress={() => setLocation(loc)}>
                <Text style={[styles.pillText, location === loc && styles.activePillText]}>
                  {loc}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetBtnText}>Reset All</Text>
        </Pressable>

        <Pressable style={styles.applyBtn} onPress={handleApply}>
          <Text style={styles.applyBtnText}>Apply Filters</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ShilpColors.background,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: 90,
  },
  filterSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.heading3,
    fontSize: 16,
    marginBottom: Spacing.xs,
  },
  selectedVal: {
    ...Typography.heading2,
    color: ShilpColors.primary,
    marginBottom: Spacing.sm,
  },
  pillWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs + 2,
  },
  pill: {
    backgroundColor: ShilpColors.surface,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.pill,
  },
  activePill: {
    backgroundColor: ShilpColors.primary,
    borderColor: ShilpColors.primary,
  },
  pillText: {
    ...Typography.bodySmall,
    color: ShilpColors.textPrimary,
    fontWeight: '600',
  },
  activePillText: {
    color: ShilpColors.white,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ShilpColors.surface,
    borderTopWidth: 1,
    borderTopColor: ShilpColors.borderLight,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  resetBtn: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.pill,
    borderWidth: 1,
    borderColor: ShilpColors.border,
  },
  resetBtnText: {
    ...Typography.button,
    color: ShilpColors.textSecondary,
    fontSize: 14,
  },
  applyBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ShilpColors.primary,
    height: 48,
    borderRadius: BorderRadius.pill,
  },
  applyBtnText: {
    ...Typography.button,
    fontSize: 15,
  },
});
