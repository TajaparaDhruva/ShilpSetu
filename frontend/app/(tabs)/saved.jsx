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
import { ArtisanCard } from '../../components/ui/ArtisanCard';
import { ProductCard } from '../../components/ui/ProductCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { useApp } from '../../context/AppContext';

export default function SavedArtisansScreen() {
  const router = useRouter();
  const appContext = useApp() || {};
  const artisans = Array.isArray(appContext.artisans) ? appContext.artisans : [];
  const products = Array.isArray(appContext.products) ? appContext.products : [];
  const [activeTab, setActiveTab] = useState('artisans');

  const savedArtisans = artisans.filter((a) => a && (a.saved || a.isSaved));
  const savedProducts = products.filter((p) => p && (p.saved || p.isSaved));

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Saved Favorites" subtitle="Your bookmarked artisans and craft items" />

      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === 'artisans' && styles.activeTab]}
          onPress={() => setActiveTab('artisans')}>
          <Text style={[styles.tabText, activeTab === 'artisans' && styles.activeTabText]}>
            Artisans ({savedArtisans.length})
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === 'products' && styles.activeTab]}
          onPress={() => setActiveTab('products')}>
          <Text style={[styles.tabText, activeTab === 'products' && styles.activeTabText]}>
            Products ({savedProducts.length})
          </Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'artisans' ? (
          savedArtisans.length > 0 ? (
            savedArtisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))
          ) : (
            <EmptyState
              iconName="heart.fill"
              title="No Saved Artisans"
              description="Tap the heart icon on any artisan profile to save them for quick access."
              actionLabel="Discover Artisans"
              onAction={() => router.push('/(tabs)')}
            />
          )
        ) : savedProducts.length > 0 ? (
          <View style={styles.productGrid}>
            {savedProducts.map((prod) => (
              <View key={prod.id} style={styles.gridItem}>
                <ProductCard product={prod} />
              </View>
            ))}
          </View>
        ) : (
          <EmptyState
            iconName="heart.fill"
            title="No Saved Products"
            description="Tap the heart icon on any craft product to save it to your collection."
            actionLabel="Browse Products"
            onAction={() => router.push('/(tabs)')}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: ShilpColors.surface,
    padding: Spacing.xs,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    borderRadius: BorderRadius.pill,
    borderWidth: 1,
    borderColor: ShilpColors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.xs + 4,
    borderRadius: BorderRadius.pill,
  },
  activeTab: {
    backgroundColor: ShilpColors.primary,
  },
  tabText: {
    ...Typography.bodySmall,
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
