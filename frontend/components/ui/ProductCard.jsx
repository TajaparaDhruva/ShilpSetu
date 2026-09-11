import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from './Card';
import { Badge } from './Badge';
import { Colors, ShilpColors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const ProductCard = ({ product, onPress, style }) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'] || Colors.light || {};

  if (!product) return null;

  const primaryImage =
    (Array.isArray(product.images) && product.images[0]) ||
    product.image ||
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80';

  const price = Number(product.sellingPrice ?? product.price ?? 0);
  const formattedPrice = isNaN(price) ? '0' : price.toLocaleString('en-IN');
  const title = product.title || product.name || 'Handcrafted Art';
  const category = product.category || 'Handicraft';
  const status = product.status || 'In Stock';
  const views = product.views ?? 0;
  const inquiries = product.inquiries ?? 0;

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (product.id) {
      router.push({ pathname: '/product/[id]', params: { id: String(product.id) } });
    }
  };

  return (
    <Card onPress={handlePress} style={[styles.card, style]}>
      <View style={styles.row}>
        <Image source={{ uri: primaryImage }} style={styles.image} resizeMode="cover" />

        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={[Typography.bodySmall, { color: theme.textMuted || ShilpColors.textMuted }]}>
              {category}
            </Text>
            <Badge status={status} />
          </View>

          <Text
            style={[Typography.h3, { color: theme.text || ShilpColors.text, marginTop: 2 }]}
            numberOfLines={2}>
            {title}
          </Text>

          <Text
            style={[Typography.h2, { color: theme.primary || ShilpColors.primary, marginTop: Spacing.xs }]}>
            ₹{formattedPrice}
          </Text>

          <View style={styles.metricsRow}>
            <Text style={[Typography.caption, { color: theme.textMuted || ShilpColors.textMuted }]}>
              👁 {views} views
            </Text>
            <Text
              style={[
                Typography.caption,
                { color: theme.textMuted || ShilpColors.textMuted, marginLeft: Spacing.md },
              ]}>
              💬 {inquiries} inquiries
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: Spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: BorderRadius.md,
  },
  content: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
});

export default ProductCard;