import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { StatCard } from '@/components/ui/StatCard';
import { ProductCard } from '@/components/ui/ProductCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Avatar } from '@/components/ui/Avatar';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { useAuth } from '@/store/AuthContext';
import { useLanguage } from '@/store/LanguageContext';
import { productService } from '@/services/products/productService';
import { Product } from '@/constants/mockData';
import { Colors, Typography, Spacing, Palette, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ArtisanHomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  const loadData = async () => {
    try {
      const data = await productService.getProducts(statusFilter);
      setProducts(data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const name = user?.name || 'Ramprasad Sharma';
  const firstName = name.split(' ')[0];

  // Business Summary Metrics
  const totalProds = products.length;
  const totalViews = products.reduce((acc, p) => acc + p.views, 0);
  const totalInquiries = products.reduce((acc, p) => acc + p.inquiries, 0);
  const totalRevenue = products.reduce((acc, p) => acc + p.sellingPrice * p.inventory, 0);

  const filterTabs = ['All', 'Published', 'Draft', 'Pending', 'Rejected'];

  return (
    <ScreenWrapper
      scrollable
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.primary]} />
      }
    >
      {/* Top Artisan Header Bar */}
      <View style={styles.topHeader}>
        <View style={styles.userCol}>
          <Avatar uri={user?.profilePhoto} name={name} size={48} showProgressRing completionPercentage={85} />
          <View style={styles.userText}>
            <Text style={[Typography.caption, { color: theme.textMuted }]}>{t('welcome')}</Text>
            <Text style={[Typography.h2, { color: theme.text }]} numberOfLines={1}>
              {firstName} 👋
            </Text>
          </View>
        </View>

        <LanguageToggle />
      </View>

      {/* Primary Quick Craft Actions */}
      <View style={styles.quickActionsContainer}>
        <Text style={[Typography.label, { color: theme.textSecondary, marginBottom: Spacing.xs }]}>
          {t('quickActionsTitle')}
        </Text>

        <View style={styles.actionsGrid}>
          {/* Action 1: Add Product */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push('/(seller)/products/create')}
            style={[styles.actionCard, { backgroundColor: Palette.terracotta }]}
          >
            <Text style={styles.actionIcon}>➕</Text>
            <Text style={[Typography.button, styles.actionText]}>
              {t('addProductBtn')}
            </Text>
            <Text style={[Typography.caption, styles.actionSub]}>Manual cataloging</Text>
          </TouchableOpacity>

          {/* Action 2: Voice Product (Ronak Integration) */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              // Navigation integration point for Ronak's voice feature
              router.push('/(seller)/products/create');
            }}
            style={[styles.actionCard, { backgroundColor: Palette.forestGreen }]}
          >
            <Text style={styles.actionIcon}>🎙️</Text>
            <Text style={[Typography.button, styles.actionText]}>
              {t('voiceProductBtn')}
            </Text>
            <Text style={[Typography.caption, styles.actionSub]}>Describe in mother tongue</Text>
          </TouchableOpacity>

          {/* Action 3: AI Photo Studio (Ronak Integration) */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              // Navigation integration point for Ronak's AI studio
              router.push('/(seller)/products/create');
            }}
            style={[styles.actionCard, { backgroundColor: Palette.earthBrown }]}
          >
            <Text style={styles.actionIcon}>✨</Text>
            <Text style={[Typography.button, styles.actionText]}>
              {t('aiPhotoBtn')}
            </Text>
            <Text style={[Typography.caption, styles.actionSub]}>Studio background enhancement</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Business Summary Overview */}
      <View style={styles.statsSection}>
        <SectionHeader title={t('businessSummary')} />

        <View style={styles.statsGrid}>
          <StatCard
            label={t('totalProducts')}
            value={totalProds}
            icon="📦"
            subtext="Active listings"
            style={styles.statItem}
          />
          <StatCard
            label={t('totalViews')}
            value={totalViews}
            icon="👁️"
            subtext="+18% this week"
            style={styles.statItem}
          />
          <StatCard
            label={t('totalInquiries')}
            value={totalInquiries}
            icon="💬"
            subtext="Buyer messages"
            style={styles.statItem}
          />
          <StatCard
            label={t('totalRevenue')}
            value={`₹${(totalRevenue / 1000).toFixed(1)}k`}
            icon="💰"
            subtext="Est. inventory"
            style={styles.statItem}
          />
        </View>
      </View>

      {/* Your Products Section */}
      <View style={styles.productsSection}>
        <SectionHeader
          title={t('yourProductsTitle')}
          actionText={t('seeAll')}
          onActionPress={() => router.push('/(seller)/products')}
        />

        {/* Status Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
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

        {/* Product Cards List */}
        {loading ? (
          <LoadingState message="Loading your crafts..." style={{ height: 180 }} />
        ) : products.length === 0 ? (
          <EmptyState
            title={t('emptyProductsTitle')}
            subtitle={t('emptyProductsSub')}
            actionTitle={t('addFirstProduct')}
            onAction={() => router.push('/(seller)/products')}
            style={{ paddingVertical: Spacing.xl }}
          />
        ) : (
          products.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onPress={() => router.push({ pathname: '/(seller)/products/[id]', params: { id: item.id } })}
            />
          ))
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  userCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userText: {
    marginLeft: Spacing.sm,
  },
  quickActionsContainer: {
    marginVertical: Spacing.xs,
  },
  actionsGrid: {
    gap: Spacing.xs + 2,
  },
  actionCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 22,
    marginBottom: 2,
  },
  actionText: {
    color: '#FFFFFF',
  },
  actionSub: {
    color: '#F5EBE6',
    marginTop: 2,
  },
  statsSection: {
    marginVertical: Spacing.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  statItem: {
    width: '48%',
  },
  productsSection: {
    marginVertical: Spacing.sm,
  },
  tabsScroll: {
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  tabChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
});
