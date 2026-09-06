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

import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { TouchableOpacity } from 'react-native';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function MyProductsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [products, setProducts] = useState([]);
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

  return (/*#__PURE__*/
    _jsxs(ScreenWrapper, { style: styles.flex, children: [/*#__PURE__*/
      _jsx(Header, {
        title: t('myProductsTitle'),
        rightElement: /*#__PURE__*/
        _jsx(Button, {
          title: "+ Add Craft",
          variant: "primary",
          size: "sm",
          onPress: () => router.push('/(seller)/products/create') }
        ) }

      ), /*#__PURE__*/

      _jsxs(View, { style: styles.container, children: [/*#__PURE__*/

        _jsx(Input, {
          placeholder: t('searchPlaceholder'),
          value: searchQuery,
          onChangeText: setSearchQuery,
          leftIcon: /*#__PURE__*/_jsx(Text, { style: { fontSize: 16 }, children: "\uD83D\uDD0D" }),
          containerStyle: styles.searchContainer }
        ), /*#__PURE__*/


        _jsx(ScrollView, {
          horizontal: true,
          showsHorizontalScrollIndicator: false,
          contentContainerStyle: styles.tabsScroll, children:

          filterTabs.map((tab) => {
            const isSelected = statusFilter === tab;
            return (/*#__PURE__*/
              _jsx(TouchableOpacity, {

                onPress: () => setStatusFilter(tab),
                activeOpacity: 0.8,
                style: [
                styles.tabChip,
                {
                  backgroundColor: isSelected ? theme.primary : theme.surface,
                  borderColor: isSelected ? theme.primary : theme.border
                }], children: /*#__PURE__*/


                _jsx(Text, {
                  style: [
                  Typography.caption,
                  { color: isSelected ? '#FFFFFF' : theme.text, fontWeight: '600' }], children:


                  tab }
                ) }, tab
              ));

          }) }
        ),


        loading ? /*#__PURE__*/
        _jsx(LoadingState, { message: "Fetching products..." }) :
        error ? /*#__PURE__*/
        _jsx(ErrorState, { onRetry: fetchProducts }) :
        products.length === 0 ? /*#__PURE__*/
        _jsx(EmptyState, {
          title: t('emptyProductsTitle'),
          subtitle: t('emptyProductsSub'),
          actionTitle: t('addFirstProduct'),
          onAction: () => router.push('/(seller)/products/create') }
        ) : /*#__PURE__*/

        _jsx(FlatList, {
          data: products,
          keyExtractor: (item) => item.id,
          renderItem: ({ item }) => /*#__PURE__*/
          _jsx(ProductCard, {
            product: item,
            onPress: () =>
            router.push({
              pathname: '/(seller)/products/[id]',
              params: { id: item.id }
            }) }

          ),

          contentContainerStyle: styles.listContent,
          showsVerticalScrollIndicator: false,
          refreshControl: /*#__PURE__*/
          _jsx(RefreshControl, { refreshing: refreshing, onRefresh: onRefresh, colors: [theme.primary] }) }

        )] }

      )] }
    ));

}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm
  },
  searchContainer: {
    marginBottom: Spacing.xs
  },
  tabsScroll: {
    gap: Spacing.xs,
    marginVertical: Spacing.xs,
    paddingBottom: Spacing.xs
  },
  tabChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1
  },
  listContent: {
    paddingBottom: Spacing.xl
  }
});