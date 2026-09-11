import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppHeader } from '../../components/ui/AppHeader';
import { IconSymbol } from '../../components/ui/icon-symbol';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { ErrorState } from '../../components/ui/ErrorState';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { products, artisans, toggleSaveProduct, getOrCreateConversation } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = products.find((p) => p.id === id);
  const artisan = artisans.find((a) => a.id === product?.artisanId);

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader showBack title="Product Details" />
        <View style={styles.padding}>
          <ErrorState
            title="Product Not Found"
            message="The requested craft product details could not be found."
            onRetry={() => router.back()}
          />
        </View>
      </SafeAreaView>
    );
  }

  const handleStartChat = () => {
    if (!artisan) return;
    const convId = getOrCreateConversation(
      artisan.id,
      artisan.name,
      artisan.profileImage,
      artisan.craft
    );
    router.push(`/chat/${convId}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader showBack title={product.name} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageGalleryWrapper}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const slide = Math.ceil(
                e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
              );
              if (slide !== activeImageIndex) setActiveImageIndex(slide);
            }}
            scrollEventThrottle={16}>
            {product.images.map((imgUri, index) => (
              <Image key={index} source={{ uri: imgUri }} style={styles.galleryImage} />
            ))}
          </ScrollView>

          {product.images.length > 1 && (
            <View style={styles.paginationDots}>
              {product.images.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    activeImageIndex === i && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          )}

          <Pressable
            style={styles.favFloatingBtn}
            onPress={() => toggleSaveProduct(product.id)}>
            <IconSymbol
              name={product.saved ? 'heart.fill' : 'heart'}
              size={20}
              color={product.saved ? ShilpColors.error : ShilpColors.textMuted}
            />
          </Pressable>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.categoryRow}>
            <Text style={styles.categoryPill}>{product.category}</Text>
            <View style={styles.ratingBadge}>
              <IconSymbol name="star.fill" size={14} color={ShilpColors.warning} />
              <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
            </View>
          </View>

          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.productPrice}>₹{Number(product.price ?? product.sellingPrice ?? 0).toLocaleString('en-IN')}</Text>

          {artisan && (
            <Pressable
              style={styles.artisanStrip}
              onPress={() => router.push(`/artisan/${artisan.id}`)}>
              <Image source={{ uri: artisan.profileImage }} style={styles.artisanAvatar} />
              <View style={styles.artisanMeta}>
                <Text style={styles.artisanLabel}>Crafted by</Text>
                <Text style={styles.artisanName}>{artisan.name}</Text>
                <Text style={styles.artisanLocation}>{artisan.location}</Text>
              </View>
              <IconSymbol name="chevron.right" size={18} color={ShilpColors.primary} />
            </Pressable>
          )}

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Craft Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Product Specifications</Text>
            <View style={styles.specCard}>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Materials Used</Text>
                <Text style={styles.specVal}>{product.material}</Text>
              </View>
              <View style={styles.specDivider} />
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Dimensions</Text>
                <Text style={styles.specVal}>{product.dimensions}</Text>
              </View>
              <View style={styles.specDivider} />
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Availability</Text>
                <Text style={styles.specVal}>
                  {product.stock > 0 ? `${product.stock} Units In Stock` : 'Made to Order'}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Tags & Keywords</Text>
            <View style={styles.tagsContainer}>
              {product.tags.map((tag, idx) => (
                <View key={idx} style={styles.tagPill}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable style={styles.chatIconCTA} onPress={handleStartChat}>
          <IconSymbol name="bubble.left.and.bubble.right.fill" size={20} color={ShilpColors.primary} />
        </Pressable>

        <Pressable
          style={styles.primaryCTA}
          onPress={() =>
            router.push({
              pathname: '/rfq/create',
              params: {
                title: `Custom Order: ${product.name}`,
                category: product.category,
              },
            })
          }>
          <IconSymbol name="plus.circle.fill" size={18} color={ShilpColors.white} />
          <Text style={styles.primaryCTAText}>Request Custom Order / RFQ</Text>
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
    paddingBottom: 100,
  },
  padding: {
    padding: Spacing.md,
  },
  imageGalleryWrapper: {
    width: SCREEN_WIDTH,
    height: 300,
    position: 'relative',
    backgroundColor: ShilpColors.softPeach,
  },
  galleryImage: {
    width: SCREEN_WIDTH,
    height: 300,
  },
  paginationDots: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    width: 20,
    backgroundColor: ShilpColors.primary,
  },
  favFloatingBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 44,
    height: 44,
    borderRadius: BorderRadius.pill,
    backgroundColor: ShilpColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  detailsContainer: {
    padding: Spacing.lg,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  categoryPill: {
    ...Typography.caption,
    fontWeight: '700',
    color: ShilpColors.primary,
    backgroundColor: ShilpColors.softPeach,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: ShilpColors.softPeach,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  ratingText: {
    ...Typography.caption,
    fontWeight: '700',
  },
  productTitle: {
    ...Typography.heading1,
    fontSize: 22,
    marginBottom: 4,
  },
  productPrice: {
    ...Typography.displayLarge,
    fontSize: 26,
    color: ShilpColors.primaryDark,
    marginBottom: Spacing.lg,
  },
  artisanStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ShilpColors.surfaceCard,
    padding: Spacing.md,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    marginBottom: Spacing.xl,
  },
  artisanAvatar: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.pill,
    marginRight: Spacing.md,
  },
  artisanMeta: {
    flex: 1,
  },
  artisanLabel: {
    ...Typography.caption,
    color: ShilpColors.textMuted,
  },
  artisanName: {
    ...Typography.heading3,
    fontSize: 16,
  },
  artisanLocation: {
    ...Typography.caption,
    color: ShilpColors.textSecondary,
  },
  sectionBlock: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.heading3,
    fontSize: 17,
    marginBottom: Spacing.xs,
  },
  descriptionText: {
    ...Typography.body,
    color: ShilpColors.textSecondary,
    lineHeight: 22,
  },
  specCard: {
    backgroundColor: ShilpColors.surfaceCard,
    borderRadius: BorderRadius.medium,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: ShilpColors.borderLight,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  specLabel: {
    ...Typography.bodySmall,
    color: ShilpColors.textMuted,
  },
  specVal: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: ShilpColors.textPrimary,
  },
  specDivider: {
    height: 1,
    backgroundColor: ShilpColors.borderLight,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  tagPill: {
    backgroundColor: ShilpColors.surface,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.pill,
  },
  tagText: {
    ...Typography.caption,
    color: ShilpColors.textSecondary,
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
  chatIconCTA: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.pill,
    backgroundColor: ShilpColors.softPeach,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: ShilpColors.border,
  },
  primaryCTA: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: ShilpColors.primary,
    height: 48,
    borderRadius: BorderRadius.pill,
  },
  primaryCTAText: {
    ...Typography.button,
    fontSize: 15,
  },
});
