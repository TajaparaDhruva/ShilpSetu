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

import { Colors, Typography, Spacing, Palette, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function ArtisanHomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [products, setProducts] = useState([]);
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

  return (/*#__PURE__*/
    _jsxs(ScreenWrapper, {
      scrollable: true,
      contentContainerStyle: styles.container,
      refreshControl: /*#__PURE__*/
      _jsx(RefreshControl, { refreshing: refreshing, onRefresh: onRefresh, colors: [theme.primary] }), children: [/*#__PURE__*/



      _jsxs(View, { style: styles.topHeader, children: [/*#__PURE__*/
        _jsxs(View, { style: styles.userCol, children: [/*#__PURE__*/
          _jsx(Avatar, { uri: user?.profilePhoto, name: name, size: 48, showProgressRing: true, completionPercentage: 85 }), /*#__PURE__*/
          _jsxs(View, { style: styles.userText, children: [/*#__PURE__*/
            _jsx(Text, { style: [Typography.caption, { color: theme.textMuted }], children: t('welcome') }), /*#__PURE__*/
            _jsxs(Text, { style: [Typography.h2, { color: theme.text }], numberOfLines: 1, children: [
              firstName, " \uD83D\uDC4B"] }
            )] }
          )] }
        ), /*#__PURE__*/

        _jsx(LanguageToggle, {})] }
      ), /*#__PURE__*/


      _jsxs(View, { style: styles.quickActionsContainer, children: [/*#__PURE__*/
        _jsx(Text, { style: [Typography.label, { color: theme.textSecondary, marginBottom: Spacing.xs }], children:
          t('quickActionsTitle') }
        ), /*#__PURE__*/

        _jsxs(View, { style: styles.actionsGrid, children: [/*#__PURE__*/

          _jsxs(TouchableOpacity, {
            activeOpacity: 0.85,
            onPress: () => router.push('/(seller)/products/create'),
            style: [styles.actionCard, { backgroundColor: Palette.terracotta }], children: [/*#__PURE__*/

            _jsx(Text, { style: styles.actionIcon, children: "\u2795" }), /*#__PURE__*/
            _jsx(Text, { style: [Typography.button, styles.actionText], children:
              t('addProductBtn') }
            ), /*#__PURE__*/
            _jsx(Text, { style: [Typography.caption, styles.actionSub], children: "Manual cataloging" })] }
          ), /*#__PURE__*/


          _jsxs(TouchableOpacity, {
            activeOpacity: 0.85,
            onPress: () => {
              // Navigation integration point for Ronak's voice feature
              router.push('/(seller)/products/create');
            },
            style: [styles.actionCard, { backgroundColor: Palette.forestGreen }], children: [/*#__PURE__*/

            _jsx(Text, { style: styles.actionIcon, children: "\uD83C\uDF99\uFE0F" }), /*#__PURE__*/
            _jsx(Text, { style: [Typography.button, styles.actionText], children:
              t('voiceProductBtn') }
            ), /*#__PURE__*/
            _jsx(Text, { style: [Typography.caption, styles.actionSub], children: "Describe in mother tongue" })] }
          ), /*#__PURE__*/


          _jsxs(TouchableOpacity, {
            activeOpacity: 0.85,
            onPress: () => {
              // Navigation integration point for Ronak's AI studio
              router.push('/(seller)/products/create');
            },
            style: [styles.actionCard, { backgroundColor: Palette.earthBrown }], children: [/*#__PURE__*/

            _jsx(Text, { style: styles.actionIcon, children: "\u2728" }), /*#__PURE__*/
            _jsx(Text, { style: [Typography.button, styles.actionText], children:
              t('aiPhotoBtn') }
            ), /*#__PURE__*/
            _jsx(Text, { style: [Typography.caption, styles.actionSub], children: "Studio background enhancement" })] }
          )] }
        )] }
      ), /*#__PURE__*/


      _jsxs(View, { style: styles.statsSection, children: [/*#__PURE__*/
        _jsx(SectionHeader, { title: t('businessSummary') }), /*#__PURE__*/

        _jsxs(View, { style: styles.statsGrid, children: [/*#__PURE__*/
          _jsx(StatCard, {
            label: t('totalProducts'),
            value: totalProds,
            icon: "\uD83D\uDCE6",
            subtext: "Active listings",
            style: styles.statItem }
          ), /*#__PURE__*/
          _jsx(StatCard, {
            label: t('totalViews'),
            value: totalViews,
            icon: "\uD83D\uDC41\uFE0F",
            subtext: "+18% this week",
            style: styles.statItem }
          ), /*#__PURE__*/
          _jsx(StatCard, {
            label: t('totalInquiries'),
            value: totalInquiries,
            icon: "\uD83D\uDCAC",
            subtext: "Buyer messages",
            style: styles.statItem }
          ), /*#__PURE__*/
          _jsx(StatCard, {
            label: t('totalRevenue'),
            value: `₹${(totalRevenue / 1000).toFixed(1)}k`,
            icon: "\uD83D\uDCB0",
            subtext: "Est. inventory",
            style: styles.statItem }
          )] }
        )] }
      ), /*#__PURE__*/


      _jsxs(View, { style: styles.productsSection, children: [/*#__PURE__*/
        _jsx(SectionHeader, {
          title: t('yourProductsTitle'),
          actionText: t('seeAll'),
          onActionPress: () => router.push('/(seller)/products') }
        ), /*#__PURE__*/


        _jsx(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: styles.tabsScroll, children:
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
        _jsx(LoadingState, { message: "Loading your crafts...", style: { height: 180 } }) :
        products.length === 0 ? /*#__PURE__*/
        _jsx(EmptyState, {
          title: t('emptyProductsTitle'),
          subtitle: t('emptyProductsSub'),
          actionTitle: t('addFirstProduct'),
          onAction: () => router.push('/(seller)/products'),
          style: { paddingVertical: Spacing.xl } }
        ) :

        products.map((item) => /*#__PURE__*/
        _jsx(ProductCard, {

          product: item,
          onPress: () => router.push({ pathname: '/(seller)/products/[id]', params: { id: item.id } }) }, item.id
        )
        )] }

      )] }
    ));

}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md
  },
  userCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  userText: {
    marginLeft: Spacing.sm
  },
  quickActionsContainer: {
    marginVertical: Spacing.xs
  },
  actionsGrid: {
    gap: Spacing.xs + 2
  },
  actionCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center'
  },
  actionIcon: {
    fontSize: 22,
    marginBottom: 2
  },
  actionText: {
    color: '#FFFFFF'
  },
  actionSub: {
    color: '#F5EBE6',
    marginTop: 2
  },
  statsSection: {
    marginVertical: Spacing.sm
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs
  },
  statItem: {
    width: '48%'
  },
  productsSection: {
    marginVertical: Spacing.sm
  },
  tabsScroll: {
    gap: Spacing.xs,
    marginBottom: Spacing.md
  },
  tabChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1
  }
});