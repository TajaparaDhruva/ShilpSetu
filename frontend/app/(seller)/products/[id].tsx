import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { LoadingState, ErrorState } from '@/components/ui/States';
import { useLanguage } from '@/store/LanguageContext';
import { productService } from '@/services/products/productService';
import { Product } from '@/constants/mockData';
import { Colors, Typography, Spacing, Palette, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProductDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchProduct = async () => {
    if (!params.id) return;
    try {
      const data = await productService.getProductById(params.id);
      setProduct(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const handleTogglePublish = async () => {
    if (!product) return;
    setActionLoading(true);
    try {
      const updated = await productService.togglePublishStatus(product.id);
      if (updated) setProduct(updated);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!product) return;
    setActionLoading(true);
    try {
      await productService.deleteProduct(product.id);
      setShowDeleteModal(false);
      router.back();
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <ScreenWrapper>
        <Header title={t('productDetailsTitle')} showBack />
        <LoadingState message="Loading craft details..." />
      </ScreenWrapper>
    );
  }

  if (!product) {
    return (
      <ScreenWrapper>
        <Header title={t('productDetailsTitle')} showBack />
        <ErrorState title="Product Not Found" message="The requested craft listing could not be found." onRetry={router.back} />
      </ScreenWrapper>
    );
  }

  const images = product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80'];

  return (
    <ScreenWrapper scrollable contentContainerStyle={styles.container}>
      <Header
        title={t('productDetailsTitle')}
        showBack
        rightElement={
          <TouchableOpacity onPress={() => setShowDeleteModal(true)} style={{ padding: Spacing.xs }}>
            <Text style={{ fontSize: 20 }}>🗑️</Text>
          </TouchableOpacity>
        }
      />

      {/* Main Image Gallery */}
      <View style={styles.imageGallery}>
        <Image
          source={{ uri: images[selectedImgIndex] }}
          style={styles.mainImage}
          resizeMode="cover"
        />

        {images.length > 1 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thumbScroll}>
            {images.map((img, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedImgIndex(idx)}
                activeOpacity={0.8}
                style={[
                  styles.thumbBorder,
                  idx === selectedImgIndex && { borderColor: theme.primary, borderWidth: 2 },
                ]}
              >
                <Image source={{ uri: img }} style={styles.thumbImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Title & Price Header */}
      <View style={styles.section}>
        <View style={styles.badgeRow}>
          <Text style={[Typography.caption, { color: theme.textMuted }]}>{product.category}</Text>
          <Badge status={product.status} />
        </View>

        <Text style={[Typography.h1, { color: theme.text, marginTop: Spacing.xs }]}>
          {product.title}
        </Text>

        <View style={styles.priceRow}>
          <Text style={[Typography.display, { color: theme.primary }]}>
            ₹{product.sellingPrice.toLocaleString('en-IN')}
          </Text>
          <Text style={[Typography.bodySmall, { color: theme.textMuted, marginLeft: Spacing.md }]}>
            AI Suggested: ₹{product.suggestedPrice.toLocaleString('en-IN')}
          </Text>
        </View>

        <Text style={[Typography.body, { color: theme.textSecondary, marginTop: Spacing.md }]}>
          {product.description}
        </Text>
      </View>

      {/* Specifications Card */}
      <Card style={styles.specsCard}>
        <Text style={[Typography.h3, { color: theme.text, marginBottom: Spacing.md }]}>
          Craft Specifications
        </Text>

        <View style={styles.specRow}>
          <Text style={[Typography.label, { color: theme.textMuted }]}>{t('materials')}:</Text>
          <Text style={[Typography.body, { color: theme.text }]}>
            {product.materials.join(', ')}
          </Text>
        </View>

        <View style={styles.specRow}>
          <Text style={[Typography.label, { color: theme.textMuted }]}>{t('technique')}:</Text>
          <Text style={[Typography.body, { color: theme.text }]}>{product.technique}</Text>
        </View>

        <View style={styles.specRow}>
          <Text style={[Typography.label, { color: theme.textMuted }]}>{t('dimensions')}:</Text>
          <Text style={[Typography.body, { color: theme.text }]}>{product.dimensions}</Text>
        </View>

        <View style={styles.specRow}>
          <Text style={[Typography.label, { color: theme.textMuted }]}>{t('weight')}:</Text>
          <Text style={[Typography.body, { color: theme.text }]}>{product.weight}</Text>
        </View>

        <View style={styles.specRow}>
          <Text style={[Typography.label, { color: theme.textMuted }]}>{t('inventory')}:</Text>
          <Text style={[Typography.body, { color: Palette.forestGreen, fontWeight: '700' }]}>
            {product.inventory} units available
          </Text>
        </View>
      </Card>

      {/* Pricing Breakdown Card */}
      <Card style={styles.specsCard}>
        <Text style={[Typography.h3, { color: theme.text, marginBottom: Spacing.md }]}>
          Pricing & Cost Breakdown
        </Text>

        <View style={styles.costRow}>
          <Text style={[Typography.body, { color: theme.textSecondary }]}>{t('rawCost')}</Text>
          <Text style={[Typography.label, { color: theme.text }]}>₹{product.rawMaterialCost}</Text>
        </View>

        <View style={styles.costRow}>
          <Text style={[Typography.body, { color: theme.textSecondary }]}>{t('laborCost')}</Text>
          <Text style={[Typography.label, { color: theme.text }]}>₹{product.laborCost}</Text>
        </View>

        <View style={styles.costRow}>
          <Text style={[Typography.body, { color: theme.textSecondary }]}>{t('packagingCost')}</Text>
          <Text style={[Typography.label, { color: theme.text }]}>₹{product.packagingCost}</Text>
        </View>

        <View style={[styles.costRow, styles.totalCostRow]}>
          <Text style={[Typography.label, { color: theme.text }]}>Total Artisan Cost</Text>
          <Text style={[Typography.h3, { color: theme.primary }]}>
            ₹{product.rawMaterialCost + product.laborCost + product.packagingCost}
          </Text>
        </View>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Button
          title={product.status === 'Published' ? t('unpublishProduct') : t('publishProduct')}
          variant={product.status === 'Published' ? 'outline' : 'primary'}
          size="lg"
          loading={actionLoading}
          onPress={handleTogglePublish}
          style={styles.actionBtn}
        />

        <Button
          title={t('delete')}
          variant="danger"
          size="lg"
          onPress={() => setShowDeleteModal(true)}
          style={styles.actionBtn}
        />
      </View>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        visible={showDeleteModal}
        title={t('deleteConfirmTitle')}
        message={t('deleteConfirmMsg')}
        confirmText={t('delete')}
        isDanger
        loading={actionLoading}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.xxl,
  },
  imageGallery: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  mainImage: {
    width: '100%',
    height: 260,
    borderRadius: BorderRadius.xl,
  },
  thumbScroll: {
    gap: Spacing.xs,
    marginTop: Spacing.sm,
  },
  thumbBorder: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  thumbImage: {
    width: 60,
    height: 60,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: Spacing.xs,
  },
  specsCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing.xs,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  totalCostRow: {
    borderTopWidth: 1,
    borderTopColor: '#EADBCF',
    marginTop: Spacing.xs,
    paddingTop: Spacing.sm,
  },
  actionsContainer: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  actionBtn: {
    width: '100%',
  },
});
