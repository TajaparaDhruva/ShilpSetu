import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle, StyleProp } from 'react-native';
import { Product } from '@/constants/mockData';
import { Card } from './Card';
import { Badge } from './Badge';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, style }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80';

  return (
    <Card onPress={onPress} style={[styles.card, style]}>
      <View style={styles.row}>
        <Image source={{ uri: primaryImage }} style={styles.image} resizeMode="cover" />

        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={[Typography.bodySmall, { color: theme.textMuted }]}>
              {product.category}
            </Text>
            <Badge status={product.status} />
          </View>

          <Text style={[Typography.h3, { color: theme.text, marginTop: 2 }]} numberOfLines={2}>
            {product.title}
          </Text>

          <Text style={[Typography.h2, { color: theme.primary, marginTop: Spacing.xs }]}>
            ₹{product.sellingPrice.toLocaleString('en-IN')}
          </Text>

          <View style={styles.metricsRow}>
            <Text style={[Typography.caption, { color: theme.textMuted }]}>
              👁 {product.views} views
            </Text>
            <Text style={[Typography.caption, { color: theme.textMuted, marginLeft: Spacing.md }]}>
              💬 {product.inquiries} inquiries
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
