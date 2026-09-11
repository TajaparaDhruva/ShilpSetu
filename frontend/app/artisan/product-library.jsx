import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Search,
  Bell,
  User,
  SlidersHorizontal,
  ChevronDown,
  MoreVertical,
  Plus,
  Home,
  Package,
  Check,
} from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import IndianCraftBorder from '../../components/shilpsetu/IndianCraftBorder';

// ─── Types ───────────────────────────────────────────────────────────────────

// ─── Asset ───────────────────────────────────────────────────────────────────
const PRODUCT_IMAGE = require('../../assets/images/terracotta_vase_product.jpg');

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_PRODUCTS = [
  { id: '1',  title: 'Terracotta Mug',       category: 'Home Decor',    price: 250, status: 'published', stock: 100, image: PRODUCT_IMAGE },
  { id: '2',  title: 'Decorative Vase',      category: 'Home Decor',    price: 450, status: 'published', stock: 50,  image: PRODUCT_IMAGE },
  { id: '3',  title: 'Clay Diya Set',        category: 'Festive Decor', price: 300, status: 'published', stock: 200, image: PRODUCT_IMAGE },
  { id: '4',  title: 'Wind Chime',           category: 'Home Decor',    price: 600, status: 'draft',     stock: 0,   image: PRODUCT_IMAGE },
  { id: '5',  title: 'Terracotta Plate',     category: 'Dining',        price: 350, status: 'published', stock: 80,  image: PRODUCT_IMAGE },
  { id: '6',  title: 'Mini Planter',         category: 'Home Decor',    price: 200, status: 'published', stock: 120, image: PRODUCT_IMAGE },
  { id: '7',  title: 'Handcrafted Elephant', category: 'Showpiece',     price: 550, status: 'draft',     stock: 0,   image: PRODUCT_IMAGE },
  { id: '8',  title: 'Painted Bottle',       category: 'Home Decor',    price: 400, status: 'archived',  stock: 0,   image: PRODUCT_IMAGE },
  { id: '9',  title: 'Pottery Bowl',         category: 'Dining',        price: 320, status: 'published', stock: 60,  image: PRODUCT_IMAGE },
  { id: '10', title: 'Terracotta Lamp',      category: 'Home Decor',    price: 480, status: 'published', stock: 40,  image: PRODUCT_IMAGE },
  { id: '11', title: 'Jute Basket',          category: 'Storage',       price: 180, status: 'draft',     stock: 0,   image: PRODUCT_IMAGE },
  { id: '12', title: 'Brass Incense Stand',  category: 'Pooja',         price: 650, status: 'published', stock: 30,  image: PRODUCT_IMAGE },
];

const SORT_OPTIONS = [
  { label: 'Newest',      value: 'newest' },
  { label: 'Oldest',      value: 'oldest' },
  { label: 'Price: Low',  value: 'price_asc' },
  { label: 'Price: High', value: 'price_desc' },
  { label: 'A to Z',      value: 'name' },
];

const FILTER_TABS = [
  { label: 'All Products', value: 'all' },
  { label: 'Published',    value: 'published' },
  { label: 'Drafts',       value: 'draft' },
  { label: 'Archived',     value: 'archived' },
];

// ─── Status badge config ──────────────────────────────────────────────────────
const STATUS_CONFIG = {
  published: { label: 'Published', dot: '#2E6B4E', bg: '#E6F4ED', text: '#2E6B4E' },
  draft:     { label: 'Draft',     dot: '#C97A1F', bg: '#FEF3E2', text: '#C97A1F' },
  archived:  { label: 'Archived',  dot: '#C23B22', bg: '#FDECEA', text: '#C23B22' },
};

// ─── StatusBadge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <View style={[sb.badge, { backgroundColor: cfg.bg }]}>
      <View style={[sb.dot, { backgroundColor: cfg.dot }]} />
      <Text style={[sb.label, { color: cfg.text }]}>{cfg.label}</Text>
    </View>
  );
}

const sb = StyleSheet.create({
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start',
  },
  dot:   { width: 6, height: 6, borderRadius: 3 },
  label: { fontFamily: typography.fonts.bodySemiBold, fontSize: 11 },
});

// ─── ProductCard ──────────────────────────────────────────────────────────────
function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity
      style={pc.card}
      onPress={() => onPress(product)}
      activeOpacity={0.75}
      accessibilityLabel={"Open " + product.title}
    >
      <Image source={product.image} style={pc.image} />
      <View style={pc.info}>
        <View style={pc.titleRow}>
          <Text style={pc.title} numberOfLines={1}>{product.title}</Text>
          <TouchableOpacity hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }} accessibilityLabel="Product options">
            <MoreVertical size={15} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
        <Text style={pc.category} numberOfLines={1}>{product.category}</Text>
        <Text style={pc.price}>Rs.{product.price}</Text>
        <StatusBadge status={product.status} />
        <Text style={pc.stock}>Stock: {product.stock}</Text>
      </View>
    </TouchableOpacity>
  );
}

const pc = StyleSheet.create({
  card: {
    flex: 1, backgroundColor: colors.white, borderRadius: 14,
    borderWidth: 1, borderColor: colors.border, overflow: 'hidden', margin: 5,
  },
  image:    { width: '100%', aspectRatio: 1, resizeMode: 'cover' },
  info:     { padding: 9 },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 2 },
  title:    { flex: 1, fontFamily: typography.fonts.bodySemiBold, fontSize: 13, color: colors.studioDarkBrown },
  category: { fontFamily: typography.fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted, marginBottom: 4 },
  price:    { fontFamily: typography.fonts.serifBold, fontSize: 16, color: colors.studioDarkBrown, marginBottom: 5 },
  stock:    { fontFamily: typography.fonts.bodyRegular, fontSize: 11, color: colors.textMuted, marginTop: 4 },
});

// ─── Botanical leaf SVG ───────────────────────────────────────────────────────
function BotanicalLeaf() {
  return (
    <Svg width={22} height={36} viewBox="0 0 22 36">
      <Path
        d="M11 34 C11 34 1 25 1 14 C1 6 5 2 11 2 C17 2 21 6 21 14 C21 25 11 34 11 34Z"
        fill="none" stroke="#B5502B" strokeWidth={1.1} opacity={0.35}
      />
      <Path d="M11 34 L11 2" stroke="#B5502B" strokeWidth={0.8} opacity={0.2} />
      <Path d="M11 11 C7 14 5 19 7 23" stroke="#B5502B" strokeWidth={0.6} opacity={0.2} fill="none" />
      <Path d="M11 16 C15 19 17 24 15 28" stroke="#B5502B" strokeWidth={0.6} opacity={0.2} fill="none" />
    </Svg>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function ProductLibraryScreen() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showSortModal, setShowSortModal] = useState(false);

  // Derived product list
  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    if (activeTab !== 'all') {
      result = result.filter((p) => p.status === activeTab);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'newest':     result.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10)); break;
      case 'oldest':     result.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10)); break;
      case 'price_asc':  result.sort((a, b) => a.price - b.price);                       break;
      case 'price_desc': result.sort((a, b) => b.price - a.price);                       break;
      case 'name':       result.sort((a, b) => a.title.localeCompare(b.title));          break;
    }

    return result;
  }, [activeTab, searchQuery, sortBy]);

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? 'Newest';

  const handleProductPress = (product) => {
    router.push({
      pathname: '/artisan/product-detail',
      params: {
        id: product.id,
        title: product.title,
        price: String(product.price),
        category: product.category,
        stock: String(product.stock),
      },
    });
  };

  const handleAddProduct = () => {
    router.push({ pathname: '/artisan/image-studio' });
  };

  // ── Empty state ──────────────────────────────────────────────────────────────
  const renderEmptyState = () => (
    <View style={s.emptyWrap}>
      <View style={s.emptyIcon}>
        <Package size={34} color={colors.studioTerracotta} />
      </View>
      <Text style={s.emptyTitle}>{searchQuery ? 'No products found' : 'No products yet'}</Text>
      <Text style={s.emptySub}>
        {searchQuery
          ? 'Try a different search term or clear the filter.'
          : 'Start creating your first handcrafted product.'}
      </Text>
      {!searchQuery && (
        <TouchableOpacity style={s.emptyBtn} onPress={handleAddProduct} activeOpacity={0.85}>
          <Plus size={15} color={colors.white} />
          <Text style={s.emptyBtnText}>Create First Product</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  // ── 2-column grid ────────────────────────────────────────────────────────────
  const renderGrid = () => {
    if (filteredProducts.length === 0) return renderEmptyState();
    const rows = [];
    for (let i = 0; i < filteredProducts.length; i += 2) {
      rows.push(filteredProducts.slice(i, i + 2));
    }
    return rows.map((row, rowIdx) => (
      <View key={rowIdx} style={s.gridRow}>
        {row.map((p) => (
          <ProductCard key={p.id} product={p} onPress={handleProductPress} />
        ))}
        {row.length === 1 && <View style={{ flex: 1, margin: 5 }} />}
      </View>
    ));
  };

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      {/* Header */}
      <View style={s.header}>
        <Logo size="sm" showSubtitle={true} />
        <View style={s.headerRight}>
          <TouchableOpacity style={s.iconBtn} accessibilityLabel="Search">
            <Search size={20} color={colors.studioDarkBrown} />
          </TouchableOpacity>
          <View style={s.iconBtnWrap}>
            <TouchableOpacity style={s.iconBtn} accessibilityLabel="Notifications">
              <Bell size={20} color={colors.studioDarkBrown} />
            </TouchableOpacity>
            <View style={s.bellDot} />
          </View>
          <TouchableOpacity style={s.iconBtn} accessibilityLabel="Profile">
            <User size={20} color={colors.studioDarkBrown} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={s.heroRow}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={s.heroTitle}>Product Library</Text>
            <Text style={s.heroSub}>Manage and showcase your creations</Text>
          </View>
          <View style={s.mottoBlock}>
            <View style={s.mottoStamp}>
              <Text style={s.mottoLine}>Handmade</Text>
              <Text style={s.mottoLine}>Stories</Text>
              <Text style={s.mottoLine}>Stronger</Text>
              <Text style={s.mottoLine}>Communities</Text>
            </View>
            <BotanicalLeaf />
          </View>
        </View>

        {/* Filter tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.tabsRow}
          style={{ marginBottom: 14 }}
        >
          {FILTER_TABS.map((tab) => (
            <TouchableOpacity
              key={tab.value}
              style={[s.tab, activeTab === tab.value && s.tabActive]}
              onPress={() => setActiveTab(tab.value)}
              activeOpacity={0.75}
              accessibilityLabel={"Filter: " + tab.label}
            >
              <Text style={[s.tabText, activeTab === tab.value && s.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Search + Filter */}
        <View style={s.searchRow}>
          <View style={s.searchBox}>
            <Search size={16} color={colors.textMuted} />
            <TextInput
              style={s.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search your products..."
              placeholderTextColor={colors.textMuted}
              accessibilityLabel="Search products"
              returnKeyType="search"
            />
          </View>
          <TouchableOpacity style={s.filterBtn} activeOpacity={0.7} accessibilityLabel="Filter products">
            <SlidersHorizontal size={15} color={colors.studioDarkBrown} />
            <Text style={s.filterBtnText}>Filter</Text>
            <ChevronDown size={13} color={colors.studioDarkBrown} />
          </TouchableOpacity>
        </View>

        {/* Count + Sort */}
        <View style={s.countSortRow}>
          <Text style={s.countText}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
          </Text>
          <TouchableOpacity
            style={s.sortBtn}
            onPress={() => setShowSortModal(true)}
            activeOpacity={0.7}
            accessibilityLabel="Sort products"
          >
            <Text style={s.sortBtnText}>Sort by: {currentSortLabel}</Text>
            <ChevronDown size={13} color={colors.studioDarkBrown} />
          </TouchableOpacity>
        </View>

        {/* Product grid */}
        <View style={s.grid}>{renderGrid()}</View>

        <IndianCraftBorder />
        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Floating Add button */}
      <TouchableOpacity
        style={s.fab}
        onPress={handleAddProduct}
        activeOpacity={0.85}
        accessibilityLabel="Add new product"
      >
        <Plus size={17} color={colors.white} />
        <Text style={s.fabText}>Add New Product</Text>
      </TouchableOpacity>

      {/* Bottom nav */}
      <View style={s.bottomNav}>
        <TouchableOpacity style={s.navItem} onPress={() => router.push({ pathname: '/(artisan-tabs)' })} activeOpacity={0.7}>
          <Home size={22} color={colors.textMuted} />
          <Text style={s.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.navItem} activeOpacity={0.7}>
          <Search size={22} color={colors.textMuted} />
          <Text style={s.navLabel}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.navFab} onPress={handleAddProduct} activeOpacity={0.8} accessibilityLabel="New request">
          <Plus size={24} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={s.navItem} activeOpacity={0.7}>
          <Package size={22} color={colors.studioTerracotta} />
          <Text style={[s.navLabel, { color: colors.studioTerracotta }]}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.navItem} activeOpacity={0.7}>
          <User size={22} color={colors.textMuted} />
          <Text style={s.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Sort modal */}
      <Modal visible={showSortModal} transparent animationType="fade">
        <TouchableOpacity style={s.overlay} activeOpacity={1} onPress={() => setShowSortModal(false)}>
          <View style={s.sortSheet}>
            <View style={s.sheetHandle} />
            <Text style={s.sheetTitle}>Sort By</Text>
            {SORT_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[s.sortOption, sortBy === opt.value && s.sortOptionActive]}
                onPress={() => { setSortBy(opt.value); setShowSortModal(false); }}
                activeOpacity={0.7}
              >
                <Text style={[s.sortOptionText, sortBy === opt.value && s.sortOptionTextActive]}>
                  {opt.label}
                </Text>
                {sortBy === opt.value && <Check size={16} color={colors.studioTerracotta} />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.studioCream },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
    backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  headerRight:  { flexDirection: 'row', gap: 8, alignItems: 'center' },
  iconBtn: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.studioCream,
    borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center',
  },
  iconBtnWrap: { position: 'relative' },
  bellDot: {
    position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#E53935', borderWidth: 1.5, borderColor: colors.white,
    pointerEvents: 'none',
  },

  scroll: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 },

  heroRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 },
  heroTitle: { fontFamily: typography.fonts.serifBold, fontSize: 30, color: colors.studioDarkBrown, lineHeight: 36, marginBottom: 4 },
  heroSub:   { fontFamily: typography.fonts.bodyRegular, fontSize: 14, color: colors.studioTerracotta },
  mottoBlock: { alignItems: 'center', gap: 2 },
  mottoStamp: {
    backgroundColor: '#F5ECD8', borderRadius: 12, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 10, paddingVertical: 7, alignItems: 'center',
  },
  mottoLine: { fontFamily: typography.fonts.script, fontSize: 11.5, color: colors.studioDarkBrown, lineHeight: 17 },

  tabsRow: { flexDirection: 'row', gap: 8, paddingRight: 4 },
  tab: {
    paddingHorizontal: 16, paddingVertical: 9, borderRadius: 22,
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
  },
  tabActive:     { backgroundColor: colors.studioTerracotta, borderColor: colors.studioTerracotta },
  tabText:       { fontFamily: typography.fonts.bodyMedium, fontSize: 13.5, color: colors.textBody },
  tabTextActive: { color: colors.white, fontFamily: typography.fonts.bodySemiBold },

  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  searchBox: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.white, borderRadius: 22, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 14, paddingVertical: 10,
  },
  searchInput: {
    flex: 1, fontFamily: typography.fonts.bodyRegular, fontSize: 13.5,
    color: colors.studioDarkBrown, padding: 0,
  },
  filterBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: colors.white, borderRadius: 22, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 13, paddingVertical: 10,
  },
  filterBtnText: { fontFamily: typography.fonts.bodyMedium, fontSize: 13, color: colors.studioDarkBrown },

  countSortRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  countText:    { fontFamily: typography.fonts.bodySemiBold, fontSize: 14, color: colors.studioDarkBrown },
  sortBtn:      { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sortBtnText:  { fontFamily: typography.fonts.bodyMedium, fontSize: 13, color: colors.studioDarkBrown },

  grid:    { marginHorizontal: -5 },
  gridRow: { flexDirection: 'row' },

  emptyWrap: { alignItems: 'center', paddingVertical: 48, paddingHorizontal: 24 },
  emptyIcon: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: '#FEF0EC',
    borderWidth: 1.5, borderColor: colors.studioTerracotta,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  emptyTitle: { fontFamily: typography.fonts.serifBold, fontSize: 20, color: colors.studioDarkBrown, marginBottom: 8 },
  emptySub:   {
    fontFamily: typography.fonts.bodyRegular, fontSize: 13.5, color: colors.textBody,
    textAlign: 'center', lineHeight: 20, marginBottom: 20,
  },
  emptyBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.studioTerracotta, borderRadius: 22,
    paddingVertical: 12, paddingHorizontal: 22,
  },
  emptyBtnText: { fontFamily: typography.fonts.bodySemiBold, fontSize: 14, color: colors.white },

  fab: {
    position: 'absolute', bottom: 78, right: 16,
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.studioTerracotta, borderRadius: 28,
    paddingVertical: 13, paddingHorizontal: 20,
    shadowColor: colors.studioTerracotta, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  fabText: { fontFamily: typography.fonts.bodySemiBold, fontSize: 14, color: colors.white },

  bottomNav: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
    backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.border,
    paddingVertical: 8, paddingBottom: 10,
    position: 'absolute', bottom: 0, left: 0, right: 0,
  },
  navItem:  { alignItems: 'center', gap: 3, flex: 1 },
  navLabel: { fontFamily: typography.fonts.bodyRegular, fontSize: 12, color: colors.textMuted },
  navFab: {
    width: 52, height: 52, borderRadius: 26, backgroundColor: colors.studioTerracotta,
    alignItems: 'center', justifyContent: 'center', marginTop: -16,
    shadowColor: colors.studioTerracotta, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },

  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' },
  sortSheet: {
    backgroundColor: colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 32,
  },
  sheetHandle: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.border, alignSelf: 'center', marginBottom: 14 },
  sheetTitle:  { fontFamily: typography.fonts.serifBold, fontSize: 16, color: colors.studioDarkBrown, marginBottom: 10 },
  sortOption: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 13, borderBottomWidth: 0.8, borderBottomColor: colors.border,
  },
  sortOptionActive:     { backgroundColor: '#FEF6F3', marginHorizontal: -20, paddingHorizontal: 20 },
  sortOptionText:       { fontFamily: typography.fonts.bodyMedium, fontSize: 14, color: colors.textBody },
  sortOptionTextActive: { color: colors.studioTerracotta, fontFamily: typography.fonts.bodySemiBold },
});