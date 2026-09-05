import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { IconSymbol } from './icon-symbol';
import { useApp } from '../../context/AppContext';

export const ProductCard = ({ product, horizontal = false }) => {
  const router = useRouter();
  const { toggleSaveProduct } = useApp();

  return (
    <Pressable
      style={[styles.card, horizontal && styles.horizontalCard]}
      onPress={() => router.push(`/product/${product.id}`)}>
      <Image
        source={{ uri: product.images[0] }}
        style={horizontal ? styles.horizontalImage : styles.cardImage}
      />

      <Pressable
        style={styles.favoriteButton}
        onPress={(e) => {
          e.stopPropagation();
          toggleSaveProduct(product.id);
        }}>
        <IconSymbol
          name={product.saved ? 'heart.fill' : 'heart'}
          size={16}
          color={product.saved ? ShilpColors.error : ShilpColors.textMuted}
        />
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.artisanTag} numberOfLines={1}>
          by {product.artisanName}
        </Text>

        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.footerRow}>
          <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
          <View style={styles.ratingBox}>
            <IconSymbol name="star.fill" size={12} color={ShilpColors.warning} />
            <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: ShilpColors.surfaceCard,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    position: 'relative',
    shadowColor: ShilpColors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  horizontalCard: {
    width: 200,
    marginRight: Spacing.md,
    marginBottom: 0,
  },
  cardImage: {
    width: '100%',
    height: 150,
    backgroundColor: ShilpColors.softPeach,
  },
  horizontalImage: {
    width: '100%',
    height: 130,
    backgroundColor: ShilpColors.softPeach,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: BorderRadius.pill,
    backgroundColor: ShilpColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  content: {
    padding: Spacing.md,
  },
  artisanTag: {
    ...Typography.caption,
    color: ShilpColors.primary,
    fontWeight: '600',
    marginBottom: 2,
  },
  productName: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: Spacing.xs,
    height: 40,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  price: {
    ...Typography.heading3,
    color: ShilpColors.primaryDark,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: ShilpColors.softPeach,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.pill,
  },
  ratingText: {
    ...Typography.caption,
    fontWeight: '700',
  },
});
