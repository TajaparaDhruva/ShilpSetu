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

import { Colors, Typography, Spacing, Palette, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function ProductDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [product, setProduct] = useState(null);
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
    return (/*#__PURE__*/
      _jsxs(ScreenWrapper, { children: [/*#__PURE__*/
        _jsx(Header, { title: t('productDetailsTitle'), showBack: true }), /*#__PURE__*/
        _jsx(LoadingState, { message: "Loading craft details..." })] }
      ));

  }

  if (!product) {
    return (/*#__PURE__*/
      _jsxs(ScreenWrapper, { children: [/*#__PURE__*/
        _jsx(Header, { title: t('productDetailsTitle'), showBack: true }), /*#__PURE__*/
        _jsx(ErrorState, { title: "Product Not Found", message: "The requested craft listing could not be found.", onRetry: router.back })] }
      ));

  }

  const images = product.images.length > 0 ?
  product.images :
  ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80'];

  return (/*#__PURE__*/
    _jsxs(ScreenWrapper, { scrollable: true, contentContainerStyle: styles.container, children: [/*#__PURE__*/
      _jsx(Header, {
        title: t('productDetailsTitle'),
        showBack: true,
        rightElement: /*#__PURE__*/
        _jsx(TouchableOpacity, { onPress: () => setShowDeleteModal(true), style: { padding: Spacing.xs }, children: /*#__PURE__*/
          _jsx(Text, { style: { fontSize: 20 }, children: "\uD83D\uDDD1\uFE0F" }) }
        ) }

      ), /*#__PURE__*/


      _jsxs(View, { style: styles.imageGallery, children: [/*#__PURE__*/
        _jsx(Image, {
          source: { uri: images[selectedImgIndex] },
          style: styles.mainImage,
          resizeMode: "cover" }
        ),

        images.length > 1 && /*#__PURE__*/
        _jsx(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: styles.thumbScroll, children:
          images.map((img, idx) => /*#__PURE__*/
          _jsx(TouchableOpacity, {

            onPress: () => setSelectedImgIndex(idx),
            activeOpacity: 0.8,
            style: [
            styles.thumbBorder,
            idx === selectedImgIndex && { borderColor: theme.primary, borderWidth: 2 }], children: /*#__PURE__*/


            _jsx(Image, { source: { uri: img }, style: styles.thumbImage }) }, idx
          )
          ) }
        )] }

      ), /*#__PURE__*/


      _jsxs(View, { style: styles.section, children: [/*#__PURE__*/
        _jsxs(View, { style: styles.badgeRow, children: [/*#__PURE__*/
          _jsx(Text, { style: [Typography.caption, { color: theme.textMuted }], children: product.category }), /*#__PURE__*/
          _jsx(Badge, { status: product.status })] }
        ), /*#__PURE__*/

        _jsx(Text, { style: [Typography.h1, { color: theme.text, marginTop: Spacing.xs }], children:
          product.title }
        ), /*#__PURE__*/

        _jsxs(View, { style: styles.priceRow, children: [/*#__PURE__*/
          _jsxs(Text, { style: [Typography.display, { color: theme.primary }], children: ["\u20B9",
            Number(product.sellingPrice ?? product.price ?? 0).toLocaleString('en-IN')] }
          ), /*#__PURE__*/
          _jsxs(Text, { style: [Typography.bodySmall, { color: theme.textMuted, marginLeft: Spacing.md }], children: ["AI Suggested: \u20B9",
            Number(product.suggestedPrice ?? 0).toLocaleString('en-IN')] }
          )] }
        ), /*#__PURE__*/

        _jsx(Text, { style: [Typography.body, { color: theme.textSecondary, marginTop: Spacing.md }], children:
          product.description }
        )] }
      ), /*#__PURE__*/


      _jsxs(Card, { style: styles.specsCard, children: [/*#__PURE__*/
        _jsx(Text, { style: [Typography.h3, { color: theme.text, marginBottom: Spacing.md }], children: "Craft Specifications" }

        ), /*#__PURE__*/

        _jsxs(View, { style: styles.specRow, children: [/*#__PURE__*/
          _jsxs(Text, { style: [Typography.label, { color: theme.textMuted }], children: [t('materials'), ":"] }), /*#__PURE__*/
          _jsx(Text, { style: [Typography.body, { color: theme.text }], children:
            product.materials.join(', ') }
          )] }
        ), /*#__PURE__*/

        _jsxs(View, { style: styles.specRow, children: [/*#__PURE__*/
          _jsxs(Text, { style: [Typography.label, { color: theme.textMuted }], children: [t('technique'), ":"] }), /*#__PURE__*/
          _jsx(Text, { style: [Typography.body, { color: theme.text }], children: product.technique })] }
        ), /*#__PURE__*/

        _jsxs(View, { style: styles.specRow, children: [/*#__PURE__*/
          _jsxs(Text, { style: [Typography.label, { color: theme.textMuted }], children: [t('dimensions'), ":"] }), /*#__PURE__*/
          _jsx(Text, { style: [Typography.body, { color: theme.text }], children: product.dimensions })] }
        ), /*#__PURE__*/

        _jsxs(View, { style: styles.specRow, children: [/*#__PURE__*/
          _jsxs(Text, { style: [Typography.label, { color: theme.textMuted }], children: [t('weight'), ":"] }), /*#__PURE__*/
          _jsx(Text, { style: [Typography.body, { color: theme.text }], children: product.weight })] }
        ), /*#__PURE__*/

        _jsxs(View, { style: styles.specRow, children: [/*#__PURE__*/
          _jsxs(Text, { style: [Typography.label, { color: theme.textMuted }], children: [t('inventory'), ":"] }), /*#__PURE__*/
          _jsxs(Text, { style: [Typography.body, { color: Palette.forestGreen, fontWeight: '700' }], children: [
            product.inventory, " units available"] }
          )] }
        )] }
      ), /*#__PURE__*/


      _jsxs(Card, { style: styles.specsCard, children: [/*#__PURE__*/
        _jsx(Text, { style: [Typography.h3, { color: theme.text, marginBottom: Spacing.md }], children: "Pricing & Cost Breakdown" }

        ), /*#__PURE__*/

        _jsxs(View, { style: styles.costRow, children: [/*#__PURE__*/
          _jsx(Text, { style: [Typography.body, { color: theme.textSecondary }], children: t('rawCost') }), /*#__PURE__*/
          _jsxs(Text, { style: [Typography.label, { color: theme.text }], children: ["\u20B9", product.rawMaterialCost] })] }
        ), /*#__PURE__*/

        _jsxs(View, { style: styles.costRow, children: [/*#__PURE__*/
          _jsx(Text, { style: [Typography.body, { color: theme.textSecondary }], children: t('laborCost') }), /*#__PURE__*/
          _jsxs(Text, { style: [Typography.label, { color: theme.text }], children: ["\u20B9", product.laborCost] })] }
        ), /*#__PURE__*/

        _jsxs(View, { style: styles.costRow, children: [/*#__PURE__*/
          _jsx(Text, { style: [Typography.body, { color: theme.textSecondary }], children: t('packagingCost') }), /*#__PURE__*/
          _jsxs(Text, { style: [Typography.label, { color: theme.text }], children: ["\u20B9", product.packagingCost] })] }
        ), /*#__PURE__*/

        _jsxs(View, { style: [styles.costRow, styles.totalCostRow], children: [/*#__PURE__*/
          _jsx(Text, { style: [Typography.label, { color: theme.text }], children: "Total Artisan Cost" }), /*#__PURE__*/
          _jsxs(Text, { style: [Typography.h3, { color: theme.primary }], children: ["\u20B9",
            product.rawMaterialCost + product.laborCost + product.packagingCost] }
          )] }
        )] }
      ), /*#__PURE__*/


      _jsxs(View, { style: styles.actionsContainer, children: [/*#__PURE__*/
        _jsx(Button, {
          title: product.status === 'Published' ? t('unpublishProduct') : t('publishProduct'),
          variant: product.status === 'Published' ? 'outline' : 'primary',
          size: "lg",
          loading: actionLoading,
          onPress: handleTogglePublish,
          style: styles.actionBtn }
        ), /*#__PURE__*/

        _jsx(Button, {
          title: t('delete'),
          variant: "danger",
          size: "lg",
          onPress: () => setShowDeleteModal(true),
          style: styles.actionBtn }
        )] }
      ), /*#__PURE__*/


      _jsx(ConfirmDialog, {
        visible: showDeleteModal,
        title: t('deleteConfirmTitle'),
        message: t('deleteConfirmMsg'),
        confirmText: t('delete'),
        isDanger: true,
        loading: actionLoading,
        onConfirm: handleDelete,
        onCancel: () => setShowDeleteModal(false) }
      )] }
    ));

}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.xxl
  },
  imageGallery: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md
  },
  mainImage: {
    width: '100%',
    height: 260,
    borderRadius: BorderRadius.xl
  },
  thumbScroll: {
    gap: Spacing.xs,
    marginTop: Spacing.sm
  },
  thumbBorder: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden'
  },
  thumbImage: {
    width: 60,
    height: 60
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: Spacing.xs
  },
  specsCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing.xs
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs
  },
  totalCostRow: {
    borderTopWidth: 1,
    borderTopColor: '#EADBCF',
    marginTop: Spacing.xs,
    paddingTop: Spacing.sm
  },
  actionsContainer: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    gap: Spacing.md
  },
  actionBtn: {
    width: '100%'
  }
});