import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { Card } from './Card';
import { Badge } from './Badge';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";







export const ProductCard = ({ product, onPress, style }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80';

  return (/*#__PURE__*/
    _jsx(Card, { onPress: onPress, style: [styles.card, style], children: /*#__PURE__*/
      _jsxs(View, { style: styles.row, children: [/*#__PURE__*/
        _jsx(Image, { source: { uri: primaryImage }, style: styles.image, resizeMode: "cover" }), /*#__PURE__*/

        _jsxs(View, { style: styles.content, children: [/*#__PURE__*/
          _jsxs(View, { style: styles.headerRow, children: [/*#__PURE__*/
            _jsx(Text, { style: [Typography.bodySmall, { color: theme.textMuted }], children:
              product.category }
            ), /*#__PURE__*/
            _jsx(Badge, { status: product.status })] }
          ), /*#__PURE__*/

          _jsx(Text, { style: [Typography.h3, { color: theme.text, marginTop: 2 }], numberOfLines: 2, children:
            product.title }
          ), /*#__PURE__*/

          _jsxs(Text, { style: [Typography.h2, { color: theme.primary, marginTop: Spacing.xs }], children: ["\u20B9",
            product.sellingPrice.toLocaleString('en-IN')] }
          ), /*#__PURE__*/

          _jsxs(View, { style: styles.metricsRow, children: [/*#__PURE__*/
            _jsxs(Text, { style: [Typography.caption, { color: theme.textMuted }], children: ["\uD83D\uDC41 ",
              product.views, " views"] }
            ), /*#__PURE__*/
            _jsxs(Text, { style: [Typography.caption, { color: theme.textMuted, marginLeft: Spacing.md }], children: ["\uD83D\uDCAC ",
              product.inquiries, " inquiries"] }
            )] }
          )] }
        )] }
      ) }
    ));

};

const styles = StyleSheet.create({
  card: {
    marginVertical: Spacing.xs
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: BorderRadius.md
  },
  content: {
    flex: 1,
    marginLeft: Spacing.md
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs
  }
});