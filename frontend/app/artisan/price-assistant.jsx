import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Bell,
  User,
  ChevronDown,
  Leaf,
  TrendingUp,
  Camera,
  IndianRupee,
  Sparkles,
  Home,
  Search,
  Plus,
  ClipboardList,
  Check,
} from 'lucide-react-native';
import Svg, { Circle, G } from 'react-native-svg';

import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import IndianCraftBorder from '../../components/shilpsetu/IndianCraftBorder';

const PRODUCT_IMAGE = require('../../assets/images/terracotta_vase_product.jpg');

const CATEGORY_OPTIONS = [
  { label: 'Home Decor', value: 'home-decor' },
  { label: 'Kitchen & Dining', value: 'kitchen' },
  { label: 'Jewellery & Accessories', value: 'jewellery' },
  { label: 'Textiles', value: 'textiles' },
  { label: 'Sculpture & Art', value: 'sculpture' },
];

const MATERIAL_OPTIONS = [
  { label: 'Terracotta Clay', value: 'terracotta' },
  { label: 'Bamboo', value: 'bamboo' },
  { label: 'Jute', value: 'jute' },
  { label: 'Brass', value: 'brass' },
  { label: 'Silk', value: 'silk' },
  { label: 'Cotton', value: 'cotton' },
  { label: 'Wood', value: 'wood' },
];

const SIZE_OPTIONS = [
  { label: '100 ml', value: '100ml' },
  { label: '250 ml', value: '250ml' },
  { label: 'Small (< 20 cm)', value: 'small' },
  { label: 'Medium (20-40 cm)', value: 'medium' },
  { label: 'Large (40+ cm)', value: 'large' },
];

const QTY_OPTIONS = [
  { label: '10 pieces', value: '10' },
  { label: '25 pieces', value: '25' },
  { label: '50 pieces', value: '50' },
  { label: '100 pieces', value: '100' },
  { label: '200 pieces', value: '200' },
  { label: '500 pieces', value: '500' },
];

const BREAKDOWN = [
  { label: 'Raw Materials', pct: 35, color: '#8B2E1A' },
  { label: 'Artisan Labor', pct: 40, color: '#C04A2F' },
  { label: 'Finishing & Packaging', pct: 15, color: '#D4866B' },
  { label: 'Marketplace & Logistics', pct: 10, color: '#E7DCC4' },
];

function DonutChart({ avgCost }) {
  const R = 52;
  const STROKE = 16;
  const CX = 72;
  const CY = 72;
  const circumference = 2 * Math.PI * R;

  let currentOffset = 0;
  const segments = BREAKDOWN.map((seg) => {
    const dashLen = (seg.pct / 100) * circumference;
    const offset = currentOffset;
    currentOffset += dashLen;
    return { ...seg, dashLen, startOffset: offset };
  });

  return (
    <View style={donutStyles.wrapper}>
      <Svg width={144} height={144} viewBox="0 0 144 144">
        <Circle cx={CX} cy={CY} r={R} fill="none" stroke="#F0E8DC" strokeWidth={STROKE} />
        <G rotation={-90} origin={`${CX}, ${CY}`}>
          {segments.map((seg, i) => (
            <Circle
              key={i}
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke={seg.color}
              strokeWidth={STROKE}
              strokeDasharray={`${seg.dashLen - 2} ${circumference - seg.dashLen + 2}`}
              strokeDashoffset={-seg.startOffset}
              strokeLinecap="butt"
            />
          ))}
        </G>
      </Svg>
      <View style={donutStyles.center}>
        <Text style={donutStyles.centerAmount}>Rs.{avgCost}</Text>
        <Text style={donutStyles.centerLabel}>avg. cost</Text>
      </View>
    </View>
  );
}

const donutStyles = StyleSheet.create({
  wrapper: { width: 144, height: 144, alignItems: 'center', justifyContent: 'center' },
  center: { position: 'absolute', alignItems: 'center' },
  centerAmount: { fontFamily: typography.fonts.serifBold, fontSize: 16, color: colors.studioDarkBrown },
  centerLabel: { fontFamily: typography.fonts.bodyRegular, fontSize: 12, color: colors.textBody },
});

function Dropdown({ label, selected, options, onSelect }) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((o) => o.value === selected)?.label ?? selected;
  return (
    <>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TouchableOpacity style={styles.dropdownBtn} onPress={() => setOpen(true)} activeOpacity={0.7}>
        <Text style={styles.dropdownText}>{selectedLabel}</Text>
        <ChevronDown size={16} color={colors.textBody} />
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setOpen(false)}>
          <View style={styles.dropdownSheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{label}</Text>
            <ScrollView>
              {options.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={[styles.sheetOption, selected === opt.value && styles.sheetOptionActive]}
                  onPress={() => { onSelect(opt.value); setOpen(false); }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.sheetOptionText, selected === opt.value && styles.sheetOptionTextActive]}>
                    {opt.label}
                  </Text>
                  {selected === opt.value && <Check size={16} color={colors.studioTerracotta} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

export default function PriceAssistantScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('estimate');
  const [category, setCategory] = useState('home-decor');
  const [material, setMaterial] = useState('terracotta');
  const [size, setSize] = useState('250ml');
  const [quantity, setQuantity] = useState('100');
  const [screenState, setScreenState] = useState('idle');
  const [priceMin, setPriceMin] = useState(200);
  const [priceMax, setPriceMax] = useState(350);
  const [avgCost, setAvgCost] = useState(275);
  const resultAnim = useRef(new Animated.Value(0)).current;

  const handleGetEstimate = () => {
    setScreenState('calculating');
    setTimeout(() => {
      const qtyNum = parseInt(quantity, 10);
      const baseCost = material === 'silk' ? 180 : material === 'brass' ? 160 : 120;
      const scaledCost = Math.round(baseCost * (100 / Math.max(qtyNum, 10)));
      const minPrice = Math.round(scaledCost * 1.5);
      const maxPrice = Math.round(scaledCost * 2.2);
      const avg = Math.round((minPrice + maxPrice) / 2);
      setPriceMin(minPrice);
      setPriceMax(maxPrice);
      setAvgCost(avg);
      setScreenState('result');
      resultAnim.setValue(0);
      Animated.timing(resultAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }, 2200);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Logo size="sm" showSubtitle={true} />
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Bell size={20} color={colors.studioDarkBrown} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <User size={20} color={colors.studioDarkBrown} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.heroRow}>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>Price Assistant</Text>
            <Text style={styles.heroSubtitle}>
              Get fair price estimates for handmade products based on materials, effort and market trends.
            </Text>
          </View>
          <View style={styles.mottoStamp}>
            <Text style={styles.mottoLine}>Fair Prices</Text>
            <View style={styles.mottoDivider} />
            <Text style={styles.mottoLine}>Stronger Artisans</Text>
            <View style={styles.mottoDivider} />
            <Text style={styles.mottoLine}>Brighter Tomorrows</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'estimate' && styles.tabBtnActive]}
            onPress={() => setActiveTab('estimate')}
            activeOpacity={0.7}
          >
            <IndianRupee size={15} color={activeTab === 'estimate' ? colors.white : colors.studioTerracotta} />
            <Text style={[styles.tabText, activeTab === 'estimate' && styles.tabTextActive]}>Get Estimate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, styles.tabBtnOutline, activeTab === 'compare' && styles.tabBtnActive]}
            onPress={() => setActiveTab('compare')}
            activeOpacity={0.7}
          >
            <TrendingUp size={15} color={activeTab === 'compare' ? colors.white : colors.studioTerracotta} />
            <Text style={[styles.tabText, styles.tabTextOutline, activeTab === 'compare' && styles.tabTextActive]}>
              Compare Prices
            </Text>
          </TouchableOpacity>
        </View>

        {/* Product Details Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Product Details</Text>
            <TouchableOpacity>
              <Text style={styles.needHelp}>Need help?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productDetailsInner}>
            <View style={styles.photoCol}>
              <Image source={PRODUCT_IMAGE} style={styles.productPhoto} />
              <View style={styles.changePhotoBtn}>
                <Camera size={12} color={colors.white} />
                <Text style={styles.changePhotoText}>Change{'\n'}Photo</Text>
              </View>
            </View>
            <View style={styles.fieldsCol}>
              <Text style={styles.fieldLabel}>Product Name</Text>
              <View style={styles.textFieldBox}>
                <Text style={styles.textFieldValue}>Terracotta Mug</Text>
              </View>
              <Dropdown label="Category" selected={category} options={CATEGORY_OPTIONS} onSelect={setCategory} />
              <Dropdown label="Material" selected={material} options={MATERIAL_OPTIONS} onSelect={setMaterial} />
            </View>
          </View>
          <View style={styles.rowFields}>
            <View style={styles.halfField}>
              <Dropdown label="Size (approx.)" selected={size} options={SIZE_OPTIONS} onSelect={setSize} />
            </View>
            <View style={[styles.halfField, { marginLeft: 10 }]}>
              <Dropdown label="Qty" selected={quantity} options={QTY_OPTIONS} onSelect={setQuantity} />
            </View>
          </View>
          {screenState !== 'calculating' ? (
            <TouchableOpacity style={styles.estimateCTA} onPress={handleGetEstimate} activeOpacity={0.85}>
              <Sparkles size={16} color={colors.white} />
              <Text style={styles.estimateCTAText}>Get Price Estimate</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.calculatingRow}>
              <ActivityIndicator size="small" color={colors.studioTerracotta} />
              <Text style={styles.calculatingText}>Finding a fair price...</Text>
            </View>
          )}
        </View>

        {/* Estimated Price Range */}
        {screenState === 'result' && (
          <Animated.View
            style={[
              styles.card,
              {
                opacity: resultAnim,
                transform: [{ translateY: resultAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
              },
            ]}
          >
            <View style={styles.priceRangeHeader}>
              <View style={styles.priceRangeLeft}>
                <View style={styles.rupeeIcon}>
                  <IndianRupee size={16} color={colors.studioTerracotta} />
                </View>
                <View>
                  <Text style={styles.priceRangeTitle}>Estimated Price Range</Text>
                  <Text style={styles.priceRangeSub}>Based on current market trends</Text>
                </View>
              </View>
              <View style={styles.demandBadge}>
                <TrendingUp size={12} color="#C97A1F" />
                <Text style={styles.demandText}>Medium Demand</Text>
              </View>
            </View>
            <View style={styles.priceDisplayRow}>
              <Text style={styles.priceDisplay}>Rs.{priceMin} - Rs.{priceMax}</Text>
              <Text style={styles.perPiece}>per piece</Text>
            </View>
            <Text style={styles.priceDisclaimer}>
              Prices may vary based on design complexity, finishing and order quantity.
            </Text>
          </Animated.View>
        )}

        {/* Price Breakdown */}
        {screenState === 'result' && (
          <Animated.View
            style={[
              styles.card,
              {
                opacity: resultAnim,
                transform: [{ translateY: resultAnim.interpolate({ inputRange: [0, 1], outputRange: [28, 0] }) }],
              },
            ]}
          >
            <Text style={styles.cardTitle}>Price Breakdown</Text>
            <Text style={styles.breakdownSub}>How your estimated price is structured</Text>
            <View style={styles.breakdownBody}>
              <DonutChart avgCost={avgCost} />
              <View style={styles.legend}>
                {BREAKDOWN.map((seg) => (
                  <View key={seg.label} style={styles.legendRow}>
                    <View style={[styles.legendDot, { backgroundColor: seg.color }]} />
                    <Text style={styles.legendLabel}>{seg.label}</Text>
                    <Text style={styles.legendPct}>{seg.pct}%</Text>
                  </View>
                ))}
              </View>
            </View>
          </Animated.View>
        )}

        {/* Pro Tip */}
        {screenState === 'result' && (
          <Animated.View
            style={[
              styles.proTipCard,
              {
                opacity: resultAnim,
                transform: [{ translateY: resultAnim.interpolate({ inputRange: [0, 1], outputRange: [36, 0] }) }],
              },
            ]}
          >
            <Leaf size={18} color={colors.studioGreen} />
            <Text style={styles.proTipText}>
              <Text style={{ fontFamily: typography.fonts.bodySemiBold }}>Pro Tip: </Text>
              Unique designs, customizations and bulk orders can help you get better value and higher margins.
            </Text>
          </Animated.View>
        )}

        {/* Continue */}
        {screenState === 'result' && (
          <Animated.View style={{ opacity: resultAnim }}>
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={() => router.push({ pathname: '/artisan/publish-product' })}
              activeOpacity={0.85}
            >
              <Text style={styles.continueBtnText}>Continue to Publish Product</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        <IndianCraftBorder />
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Home size={22} color={colors.textMuted} />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Search size={22} color={colors.textMuted} />
          <Text style={styles.navLabel}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navFab} activeOpacity={0.8}>
          <Plus size={24} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <ClipboardList size={22} color={colors.studioTerracotta} />
          <Text style={[styles.navLabel, { color: colors.studioTerracotta }]}>Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <User size={22} color={colors.textMuted} />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.studioCream },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.white,
  },
  headerRight: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: colors.studioCream, borderWidth: 1, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  scroll: { paddingHorizontal: 16, paddingTop: 18, paddingBottom: 20 },
  heroRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 18, gap: 12 },
  heroText: { flex: 1 },
  heroTitle: { fontFamily: typography.fonts.serifBold, fontSize: 26, color: colors.studioDarkBrown, lineHeight: 32, marginBottom: 6 },
  heroSubtitle: { fontFamily: typography.fonts.bodyRegular, fontSize: 13, color: colors.textBody, lineHeight: 19 },
  mottoStamp: {
    backgroundColor: '#F5ECD8', borderRadius: 10, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 10, paddingVertical: 8, alignItems: 'center', minWidth: 108,
  },
  mottoLine: { fontFamily: typography.fonts.bodyMedium, fontSize: 11.5, color: colors.studioDarkBrown, textAlign: 'center' },
  mottoDivider: { width: 70, height: 0.8, backgroundColor: colors.border, marginVertical: 3 },
  tabRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  tabBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: colors.studioTerracotta, borderRadius: 22, paddingVertical: 11, paddingHorizontal: 14,
  },
  tabBtnOutline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.studioTerracotta },
  tabBtnActive: { backgroundColor: colors.studioTerracotta },
  tabText: { fontFamily: typography.fonts.bodySemiBold, fontSize: 13, color: colors.white },
  tabTextOutline: { color: colors.studioTerracotta },
  tabTextActive: { color: colors.white },
  card: { backgroundColor: colors.white, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 14 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  cardTitle: { fontFamily: typography.fonts.serifBold, fontSize: 16, color: colors.studioDarkBrown },
  needHelp: { fontFamily: typography.fonts.bodyMedium, fontSize: 12, color: colors.studioTerracotta, textDecorationLine: 'underline' },
  productDetailsInner: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  photoCol: { width: 90 },
  productPhoto: { width: 90, height: 110, borderRadius: 12, resizeMode: 'cover' },
  changePhotoBtn: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(42,27,18,0.7)',
    borderBottomLeftRadius: 12, borderBottomRightRadius: 12,
    paddingVertical: 5, alignItems: 'center', justifyContent: 'center',
    flexDirection: 'row', gap: 3,
  },
  changePhotoText: { fontFamily: typography.fonts.bodyRegular, fontSize: 11, color: colors.white, lineHeight: 12 },
  fieldsCol: { flex: 1 },
  fieldLabel: { fontFamily: typography.fonts.bodyMedium, fontSize: 11.5, color: colors.textBody, marginBottom: 4, marginTop: 8 },
  textFieldBox: { borderWidth: 1, borderColor: colors.border, borderRadius: 9, paddingHorizontal: 11, paddingVertical: 9, backgroundColor: colors.studioCream },
  textFieldValue: { fontFamily: typography.fonts.bodyRegular, fontSize: 13, color: colors.studioDarkBrown },
  dropdownBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: colors.border, borderRadius: 9,
    paddingHorizontal: 11, paddingVertical: 9, backgroundColor: colors.studioCream,
  },
  dropdownText: { fontFamily: typography.fonts.bodyRegular, fontSize: 13, color: colors.studioDarkBrown, flex: 1 },
  rowFields: { flexDirection: 'row', marginBottom: 4 },
  halfField: { flex: 1 },
  estimateCTA: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: colors.studioTerracotta, borderRadius: 24, paddingVertical: 13, marginTop: 16,
  },
  estimateCTAText: { fontFamily: typography.fonts.bodySemiBold, fontSize: 15, color: colors.white },
  calculatingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 16 },
  calculatingText: { fontFamily: typography.fonts.bodyMedium, fontSize: 14, color: colors.studioTerracotta },
  priceRangeHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 },
  priceRangeLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  rupeeIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FEF0EC', alignItems: 'center', justifyContent: 'center' },
  priceRangeTitle: { fontFamily: typography.fonts.bodySemiBold, fontSize: 14, color: colors.studioDarkBrown },
  priceRangeSub: { fontFamily: typography.fonts.bodyRegular, fontSize: 11, color: colors.textBody },
  demandBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.warningBg, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  demandText: { fontFamily: typography.fonts.bodyMedium, fontSize: 11, color: '#C97A1F' },
  priceDisplayRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 8 },
  priceDisplay: { fontFamily: typography.fonts.serifBold, fontSize: 28, color: colors.studioTerracotta },
  perPiece: { fontFamily: typography.fonts.bodyRegular, fontSize: 13, color: colors.textBody },
  priceDisclaimer: { fontFamily: typography.fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted, lineHeight: 17 },
  breakdownSub: { fontFamily: typography.fonts.bodyRegular, fontSize: 12, color: colors.textBody, marginTop: 3, marginBottom: 16 },
  breakdownBody: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  legend: { flex: 1, gap: 10 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendLabel: { flex: 1, fontFamily: typography.fonts.bodyRegular, fontSize: 11.5, color: colors.textBody },
  legendPct: { fontFamily: typography.fonts.bodySemiBold, fontSize: 12, color: colors.studioDarkBrown },
  proTipCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    backgroundColor: colors.studioGreenBg, borderRadius: 14, borderWidth: 1, borderColor: '#B8DCCB',
    padding: 14, marginBottom: 14,
  },
  proTipText: { flex: 1, fontFamily: typography.fonts.bodyRegular, fontSize: 13, color: '#1E4D38', lineHeight: 19 },
  continueBtn: { backgroundColor: colors.studioDarkBrown, borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginBottom: 16 },
  continueBtnText: { fontFamily: typography.fonts.bodySemiBold, fontSize: 15, color: colors.white },
  bottomNav: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
    backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.border,
    paddingVertical: 8, paddingBottom: 10, position: 'absolute', bottom: 0, left: 0, right: 0,
  },
  navItem: { alignItems: 'center', gap: 3, flex: 1 },
  navLabel: { fontFamily: typography.fonts.bodyRegular, fontSize: 12, color: colors.textMuted },
  navFab: {
    width: 52, height: 52, borderRadius: 26, backgroundColor: colors.studioTerracotta,
    alignItems: 'center', justifyContent: 'center', marginTop: -16,
    shadowColor: colors.studioTerracotta, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' },
  dropdownSheet: {
    backgroundColor: colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 32, maxHeight: '55%',
  },
  sheetHandle: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.border, alignSelf: 'center', marginBottom: 14 },
  sheetTitle: { fontFamily: typography.fonts.serifBold, fontSize: 16, color: colors.studioDarkBrown, marginBottom: 10 },
  sheetOption: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 13, borderBottomWidth: 0.8, borderBottomColor: colors.border,
  },
  sheetOptionActive: { backgroundColor: '#FEF6F3', marginHorizontal: -20, paddingHorizontal: 20 },
  sheetOptionText: { fontFamily: typography.fonts.bodyMedium, fontSize: 14, color: colors.textBody },
  sheetOptionTextActive: { color: colors.studioTerracotta, fontFamily: typography.fonts.bodySemiBold },
});