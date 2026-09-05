import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Header } from '@/components/ui/Header';
import { Input } from '@/components/ui/Input';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { LoadingState, EmptyState, ErrorState } from '@/components/ui/States';
import { useLanguage } from '@/store/LanguageContext';
import { productService } from '@/services/products/productService';
import { Product } from '@/constants/mockData';
import { Colors, Typography, Spacing, Palette, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { TouchableOpacity } from 'react-native';

export default function MyProductsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchProducts = async () => {
    try {
      setError(false);
      const data = await productService.getProducts(statusFilter, searchQuery);
      setProducts(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [statusFilter, searchQuery]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  const filterTabs = ['All', 'Published', 'Draft', 'Pending', 'Rejected'];

  return (
    <ScreenWrapper style={styles.flex}>
      <Header
        title={t('myProductsTitle')}
        rightElement={
          <Button
            title="+ Add Craft"
            variant="primary"
            size="sm"
            onPress={() => router.push('/(seller)/products/create')}
          />
        }
      />

      <View style={styles.container}>
        {/* Search Input */}
        <Input
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Text style={{ fontSize: 16 }}>🔍</Text>}
          containerStyle={styles.searchContainer}
        />

        {/* Status Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScroll}
        >
          {filterTabs.map((tab) => {
            const isSelected = statusFilter === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setStatusFilter(tab)}
                activeOpacity={0.8}
                style={[
                  styles.tabChip,
                  {
                    backgroundColor: isSelected ? theme.primary : theme.surface,
                    borderColor: isSelected ? theme.primary : theme.border,
                  },
                ]}
              >
                <Text
                  style={[
                    Typography.caption,
                    { color: isSelected ? '#FFFFFF' : theme.text, fontWeight: '600' },
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Product List / States */}
        {loading ? (
          <LoadingState message="Fetching products..." />
        ) : error ? (
          <ErrorState onRetry={fetchProducts} />
        ) : products.length === 0 ? (
          <EmptyState
            title={t('emptyProductsTitle')}
            subtitle={t('emptyProductsSub')}
            actionTitle={t('addFirstProduct')}
            onAction={() => router.push('/(seller)/products/create')}
          />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() =>
                  router.push({
                    pathname: '/(seller)/products/[id]',
                    params: { id: item.id },
                  })
                }
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.primary]} />
            }
          />
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  searchContainer: {
    marginBottom: Spacing.xs,
  },
  tabsScroll: {
    gap: Spacing.xs,
    marginVertical: Spacing.xs,
    paddingBottom: Spacing.xs,
  },
  tabChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  listContent: {
    paddingBottom: Spacing.xl,
  },
});
