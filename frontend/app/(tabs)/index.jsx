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
import { AppHeader } from '../../components/ui/AppHeader';
import { SearchBar } from '../../components/ui/SearchBar';
import { CategoryChip } from '../../components/ui/CategoryChip';
import { ArtisanCard } from '../../components/ui/ArtisanCard';
import { ProductCard } from '../../components/ui/ProductCard';
import { CATEGORIES } from '../../constants/mockData';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { IconSymbol } from '../../components/ui/icon-symbol';

export default function DiscoverScreen() {
  const router = useRouter();
  const { artisans, products } = useApp();
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCat === 'All' || p.category === selectedCat;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.artisanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroBanner}>
          <View style={styles.heroTextWrapper}>
            <Text style={styles.tagline}>HUNAR SE BAZAAR TAK</Text>
            <Text style={styles.heroTitle}>Discover Authentic Indian Artisans</Text>
            <Text style={styles.heroSubtitle}>
              Directly connect with master craftspeople across India.
            </Text>

            <Pressable
              style={styles.rfqButton}
              onPress={() => router.push('/rfq/create')}>
              <IconSymbol name="plus.circle.fill" size={16} color={ShilpColors.white} />
              <Text style={styles.rfqButtonText}>Post Requirement / RFQ</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionPadding}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={() => router.push('/filters')}
            onSubmit={() => router.push({ pathname: '/search', params: { q: searchQuery } })}
          />
        </View>

        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Browse Craft Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}>
            <CategoryChip
              label="All Crafts"
              selected={selectedCat === 'All'}
              onPress={() => setSelectedCat('All')}
              iconName="sparkles"
            />
            {CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat.id}
                label={cat.name}
                selected={selectedCat === cat.name}
                onPress={() => setSelectedCat(cat.name)}
                iconName={cat.icon}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionMargin}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Master Artisans</Text>
            <Pressable onPress={() => router.push('/search')}>
              <Text style={styles.seeAllText}>See All →</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}>
            {artisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} horizontal />
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionPadding}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Handcrafted Products</Text>
            <Text style={styles.resultsCount}>{filteredProducts.length} Items</Text>
          </View>

          <View style={styles.productGrid}>
            {filteredProducts.map((product) => (
              <View key={product.id} style={styles.gridItem}>
                <ProductCard product={product} />
              </View>
            ))}
          </View>
        </View>

        <Pressable style={styles.aiBanner} onPress={() => router.push('/(tabs)/ai')}>
          <View style={styles.aiIconCircle}>
            <IconSymbol name="sparkles" size={24} color={ShilpColors.white} />
          </View>
          <View style={styles.aiTextWrapper}>
            <Text style={styles.aiTitle}>Need help finding a specific craft?</Text>
            <Text style={styles.aiSub}>Ask ShilpSetu AI Assistant for recommendations</Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={ShilpColors.primary} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ShilpColors.background,
  },
  scrollContent: {
    paddingBottom: Spacing['3xl'],
  },
  heroBanner: {
    backgroundColor: ShilpColors.primary,
    margin: Spacing.md,
    borderRadius: BorderRadius.card,
    padding: Spacing.lg,
  },
  heroTextWrapper: {
    alignItems: 'flex-start',
  },
  tagline: {
    ...Typography.caption,
    color: ShilpColors.softPeach,
    letterSpacing: 1.5,
    fontWeight: '700',
    marginBottom: 4,
  },
  heroTitle: {
    ...Typography.heading1,
    color: ShilpColors.white,
    fontSize: 24,
    marginBottom: 4,
  },
  heroSubtitle: {
    ...Typography.bodySmall,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: Spacing.md,
  },
  rfqButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: ShilpColors.primaryDark,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 4,
    borderRadius: BorderRadius.pill,
  },
  rfqButtonText: {
    ...Typography.button,
    fontSize: 14,
  },
  sectionPadding: {
    paddingHorizontal: Spacing.md,
  },
  sectionMargin: {
    marginBottom: Spacing.lg,
  },
  categorySection: {
    marginBottom: Spacing.lg,
  },
  categoriesScroll: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.heading2,
    fontSize: 19,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xs,
  },
  seeAllText: {
    ...Typography.bodySmall,
    color: ShilpColors.primary,
    fontWeight: '700',
  },
  resultsCount: {
    ...Typography.caption,
    color: ShilpColors.textMuted,
  },
  horizontalScroll: {
    paddingHorizontal: Spacing.md,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '47.5%',
  },
  aiBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ShilpColors.surfaceCard,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: ShilpColors.border,
  },
  aiIconCircle: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.pill,
    backgroundColor: ShilpColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  aiTextWrapper: {
    flex: 1,
  },
  aiTitle: {
    ...Typography.heading3,
    fontSize: 14,
  },
  aiSub: {
    ...Typography.caption,
    color: ShilpColors.textSecondary,
  },
});
