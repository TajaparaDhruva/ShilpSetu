import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppHeader } from '../components/ui/AppHeader';
import { SearchBar } from '../components/ui/SearchBar';
import { ArtisanCard } from '../components/ui/ArtisanCard';
import { ProductCard } from '../components/ui/ProductCard';
import { EmptyState } from '../components/ui/EmptyState';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function SearchScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { artisans, products, filters } = useApp();

  const [query, setQuery] = useState(params.q || '');
  const [activeTab, setActiveTab] = useState('all');

  const filteredArtisans = artisans.filter((art) => {
    const matchesQuery =
      !query ||
      art.name.toLowerCase().includes(query.toLowerCase()) ||
      art.craft.toLowerCase().includes(query.toLowerCase()) ||
      art.location.toLowerCase().includes(query.toLowerCase());
    const matchesRating = art.rating >= filters.minRating;
    return matchesQuery && matchesRating;
  });

  const filteredProducts = products.filter((prod) => {
    const matchesQuery =
      !query ||
      prod.name.toLowerCase().includes(query.toLowerCase()) ||
      prod.category.toLowerCase().includes(query.toLowerCase()) ||
      prod.artisanName.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = filters.category === 'All' || prod.category === filters.category;
    const matchesPrice = prod.price <= filters.maxPrice;
    const matchesRating = prod.rating >= filters.minRating;
    return matchesQuery && matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader showBack title="Search Crafts & Artisans" />

      <View style={styles.searchPadding}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onFilterPress={() => router.push('/filters')}
        />
      </View>

      <View style={styles.tabsRow}>
        <Pressable
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}>
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            All Results ({filteredArtisans.length + filteredProducts.length})
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === 'artisans' && styles.activeTab]}
          onPress={() => setActiveTab('artisans')}>
          <Text style={[styles.tabText, activeTab === 'artisans' && styles.activeTabText]}>
            Artisans ({filteredArtisans.length})
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === 'products' && styles.activeTab]}
          onPress={() => setActiveTab('products')}>
          <Text style={[styles.tabText, activeTab === 'products' && styles.activeTabText]}>
            Products ({filteredProducts.length})
          </Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {(activeTab === 'all' || activeTab === 'artisans') && filteredArtisans.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Artisans ({filteredArtisans.length})</Text>
            {filteredArtisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </View>
        )}

        {(activeTab === 'all' || activeTab === 'products') && filteredProducts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Products ({filteredProducts.length})</Text>
            <View style={styles.productGrid}>
              {filteredProducts.map((prod) => (
                <View key={prod.id} style={styles.gridItem}>
                  <ProductCard product={prod} />
                </View>
              ))}
            </View>
          </View>
        )}

        {filteredArtisans.length === 0 && filteredProducts.length === 0 && (
          <EmptyState
            iconName="magnifyingglass"
            title="No Results Found"
            description={`We couldn't find any craft match for "${query}". Try adjusting your filters or keyword.`}
            actionLabel="Reset Search & Filters"
            onAction={() => {
              setQuery('');
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ShilpColors.background,
  },
  searchPadding: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xs,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: ShilpColors.surface,
    padding: Spacing.xs,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.pill,
    borderWidth: 1,
    borderColor: ShilpColors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.pill,
  },
  activeTab: {
    backgroundColor: ShilpColors.primary,
  },
  tabText: {
    ...Typography.caption,
    fontWeight: '700',
    color: ShilpColors.textSecondary,
  },
  activeTabText: {
    color: ShilpColors.white,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing['3xl'],
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.heading2,
    fontSize: 18,
    marginBottom: Spacing.sm,
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
});
