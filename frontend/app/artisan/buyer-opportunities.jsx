import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Search,
  Bell,
  User,
  SlidersHorizontal,
  ChevronDown,
  Calendar,
  Users,
  MapPin,
  Home,
  Plus,
  Package,
  ArrowRight,
  Briefcase,
  FileText,
} from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import IndianCraftBorder from '../../components/shilpsetu/IndianCraftBorder';

const PRODUCT_IMAGE = require('../../assets/images/terracotta_vase_product.jpg');

const OPPORTUNITIES = [
  {
    id: '1',
    tag: 'Bulk Order',
    tagType: 'bulk',
    title: 'Decorative Lamps for Resort Chain',
    description:
      'Looking for 500 handmade terracotta decorative lamps for our new resort properties across Rajasthan.',
    buyer: 'The Rustic Retreats',
    location: 'Jaipur, Rajasthan',
    postedAgo: 'Posted 2 days ago',
    closesIn: 'Closes in 12 days',
    quantity: '500 pieces',
    image: PRODUCT_IMAGE,
  },
  {
    id: '2',
    tag: 'Export Inquiry',
    tagType: 'export',
    title: 'Handpainted Planters for European Market',
    description:
      'Seeking suppliers for handpainted ceramic planters with eco-friendly colors. Interested in long-term partnership.',
    buyer: 'GreenHome Imports',
    location: 'Berlin, Germany',
    postedAgo: 'Posted 4 days ago',
    closesIn: 'Closes in 18 days',
    quantity: '1,000 pieces',
    image: PRODUCT_IMAGE,
  },
  {
    id: '3',
    tag: 'Custom Order',
    tagType: 'custom',
    title: 'Eco-friendly Storage Baskets',
    description:
      'Looking for customized jute storage baskets in different sizes and natural colors for our retail stores.',
    buyer: 'NatureNest Living',
    location: 'Bengaluru, Karnataka',
    postedAgo: 'Posted 1 day ago',
    closesIn: 'Closes in 10 days',
    quantity: '300 pieces',
    image: PRODUCT_IMAGE,
  },
  {
    id: '4',
    tag: 'Festive Demand',
    tagType: 'festive',
    title: 'Diwali Gift Sets',
    description:
      'Require 2,000 handcrafted diya sets for corporate gifting. Custom branding possible. Share your catalog and pricing.',
    buyer: 'FestiveKart',
    location: 'Mumbai, Maharashtra',
    postedAgo: 'Posted 3 days ago',
    closesIn: 'Closes in 15 days',
    quantity: '2,000 pieces',
    image: PRODUCT_IMAGE,
  },
];

const CATEGORIES = [
  'All Categories',
  'Home Decor',
  'Lifestyle',
  'Festive',
  'Fashion',
  '••• More',
];

function BotanicalLeaf() {
  return (
    <Svg width={20} height={32} viewBox="0 0 20 32">
      <Path
        d="M10 30 C10 30 1 22 1 13 C1 5 4 1 10 1 C16 1 19 5 19 13 C19 22 10 30 10 30Z"
        fill="none"
        stroke="#B5502B"
        strokeWidth={1}
        opacity={0.35}
      />
      <Path d="M10 30 L10 1" stroke="#B5502B" strokeWidth={0.8} opacity={0.2} />
    </Svg>
  );
}

export default function BuyerOpportunitiesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const getTagStyle = (type) => {
    switch (type) {
      case 'bulk':
        return { bg: '#EAF4EE', text: '#2E6B4E' };
      case 'export':
        return { bg: '#E8F0FE', text: '#1967D2' };
      case 'custom':
        return { bg: '#FEF3E2', text: '#C97A1F' };
      case 'festive':
        return { bg: '#FCE8E6', text: '#C23B22' };
    }
  };

  const handleOpportunityPress = (opp) => {
    router.push({
      pathname: '/artisan/rfq-detail',
      params: {
        id: opp.id,
        title: opp.title,
        buyer: opp.buyer,
        quantity: opp.quantity,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Logo size="sm" showSubtitle={true} />
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.circleBtn} accessibilityLabel="Search">
            <Search size={18} color={colors.studioDarkBrown} />
          </TouchableOpacity>
          <View style={styles.bellWrapper}>
            <TouchableOpacity style={styles.circleBtn} accessibilityLabel="Notifications">
              <Bell size={18} color={colors.studioDarkBrown} />
            </TouchableOpacity>
            <View style={styles.bellDot} />
          </View>
          <TouchableOpacity style={styles.circleBtn} accessibilityLabel="Profile">
            <User size={18} color={colors.studioDarkBrown} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Title */}
        <View style={styles.heroRow}>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>Buyer Opportunities</Text>
            <Text style={styles.heroSubtitle}>
              Discover genuine buying inquiries from across India and beyond
            </Text>
          </View>
          <View style={styles.mottoStamp}>
            <Text style={styles.mottoLine}>More Orders</Text>
            <Text style={styles.mottoLine}>Brighter</Text>
            <Text style={styles.mottoLine}>Futures</Text>
            <BotanicalLeaf />
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'all' && styles.tabBtnActive]}
            onPress={() => setActiveTab('all')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'all' && styles.tabTextActive,
              ]}
            >
              All Opportunities
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'domestic' && styles.tabBtnActive,
            ]}
            onPress={() => setActiveTab('domestic')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'domestic' && styles.tabTextActive,
              ]}
            >
              Domestic
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'international' && styles.tabBtnActive,
            ]}
            onPress={() => setActiveTab('international')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'international' && styles.tabTextActive,
              ]}
            >
              International
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Search size={16} color={colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search by product, buyer or location..."
              placeholderTextColor={colors.textMuted}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
            <SlidersHorizontal size={14} color={colors.studioDarkBrown} />
            <Text style={styles.filterBtnText}>Filter</Text>
            <ChevronDown size={13} color={colors.studioDarkBrown} />
          </TouchableOpacity>
        </View>

        {/* Category Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Opportunities List */}
        <View style={styles.listContainer}>
          {OPPORTUNITIES.map((opp) => {
            const tagStyle = getTagStyle(opp.tagType);
            return (
              <View key={opp.id} style={styles.oppCard}>
                <Image source={opp.image} style={styles.oppImage} />

                <View style={styles.oppMain}>
                  {/* Tag */}
                  <View
                    style={[
                      styles.tagBadge,
                      { backgroundColor: tagStyle.bg },
                    ]}
                  >
                    <Text style={[styles.tagText, { color: tagStyle.text }]}>
                      {opp.tag}
                    </Text>
                  </View>

                  {/* Title & Description */}
                  <Text style={styles.oppTitle} numberOfLines={2}>
                    {opp.title}
                  </Text>
                  <Text style={styles.oppDesc} numberOfLines={2}>
                    {opp.description}
                  </Text>

                  {/* Buyer & Location */}
                  <View style={styles.metaRow}>
                    <Users size={12} color={colors.textMuted} />
                    <Text style={styles.metaText} numberOfLines={1}>
                      {opp.buyer}
                    </Text>
                  </View>
                  <View style={styles.metaRow}>
                    <MapPin size={12} color={colors.textMuted} />
                    <Text style={styles.metaText} numberOfLines={1}>
                      {opp.location}
                    </Text>
                  </View>
                </View>

                {/* Right Column */}
                <View style={styles.oppRightCol}>
                  <View style={styles.timeInfo}>
                    <View style={styles.calendarRow}>
                      <Calendar size={11} color={colors.textMuted} />
                      <Text style={styles.postedText}>{opp.postedAgo}</Text>
                    </View>
                    <Text style={styles.closesText}>{opp.closesIn}</Text>
                  </View>

                  <View style={styles.qtyBox}>
                    <Text style={styles.qtyLabel}>Quantity</Text>
                    <Text style={styles.qtyValue}>{opp.quantity}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.viewDetailsBtn}
                    onPress={() => handleOpportunityPress(opp)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.viewDetailsText}>View Details</Text>
                    <ArrowRight size={12} color={colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        <IndianCraftBorder />
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push({ pathname: '/(artisan-tabs)' })}
          activeOpacity={0.7}
        >
          <Home size={22} color={colors.textMuted} />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Search size={22} color={colors.textMuted} />
          <Text style={styles.navLabel}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navFab}
          onPress={() => router.push({ pathname: '/artisan/image-studio' })}
          activeOpacity={0.8}
        >
          <Plus size={24} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <FileText size={22} color={colors.studioTerracotta} />
          <Text style={[styles.navLabel, { color: colors.studioTerracotta }]}>
            Opportunities
          </Text>
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
  container: {
    flex: 1,
    backgroundColor: colors.studioCream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.studioCream,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellWrapper: {
    position: 'relative',
  },
  bellDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E53935',
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  heroText: {
    flex: 1,
    paddingRight: 10,
  },
  heroTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 28,
    color: colors.studioDarkBrown,
    lineHeight: 34,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    lineHeight: 18,
  },
  mottoStamp: {
    backgroundColor: '#F5ECD8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignItems: 'center',
    gap: 1,
  },
  mottoLine: {
    fontFamily: typography.fonts.script,
    fontSize: 11,
    color: colors.studioDarkBrown,
    lineHeight: 14,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabBtnActive: {
    backgroundColor: colors.studioTerracotta,
    borderColor: colors.studioTerracotta,
  },
  tabText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.textBody,
  },
  tabTextActive: {
    fontFamily: typography.fonts.bodySemiBold,
    color: colors.white,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.studioDarkBrown,
    padding: 0,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterBtnText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.studioDarkBrown,
  },
  categoryRow: {
    gap: 8,
    paddingBottom: 4,
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: '#FAF0EB',
    borderColor: colors.studioTerracotta,
  },
  categoryText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.studioDarkBrown,
  },
  categoryTextActive: {
    fontFamily: typography.fonts.bodySemiBold,
    color: colors.studioTerracotta,
  },
  listContainer: {
    gap: 12,
    marginBottom: 16,
  },
  oppCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    gap: 10,
  },
  oppImage: {
    width: 76,
    height: 90,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  oppMain: {
    flex: 1,
    justifyContent: 'space-between',
  },
  tagBadge: {
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  tagText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11.5,
  },
  oppTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 13,
    color: colors.studioDarkBrown,
    marginBottom: 2,
  },
  oppDesc: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    lineHeight: 15,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textMuted,
  },
  oppRightCol: {
    width: 90,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  timeInfo: {
    alignItems: 'flex-end',
  },
  calendarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  postedText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
  },
  closesText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11.5,
    color: colors.studioTerracotta,
  },
  qtyBox: {
    backgroundColor: '#FAF4EE',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    alignItems: 'center',
    width: '100%',
  },
  qtyLabel: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  qtyValue: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12.5,
    color: colors.studioDarkBrown,
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    backgroundColor: colors.studioTerracotta,
    borderRadius: 14,
    paddingVertical: 5,
    paddingHorizontal: 8,
    width: '100%',
  },
  viewDetailsText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.white,
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 8,
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    gap: 3,
    flex: 1,
  },
  navLabel: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
  },
  navFab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.studioTerracotta,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -16,
    shadowColor: colors.studioTerracotta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});