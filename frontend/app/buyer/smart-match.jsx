import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  Bell,
  Star,
  MapPin,
  Package,
  Truck,
  Leaf,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
  Sparkles,
  Home,
  Compass,
  Plus,
  Inbox,
  User,
  CheckCircle2,
} from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import IndianCraftBorder from '../../components/shilpsetu/IndianCraftBorder';

const PRODUCT_IMAGE = require('../../assets/images/terracotta_vase_product.jpg');
const ARTISAN_IMAGE = require('../../assets/images/onboarding_artisan_1.jpg');

const ARTISAN_MATCHES = [
  {
    id: '1',
    badge: 'Best Match',
    badgeType: 'best',
    name: 'Savita Kumari',
    business: 'The Rustic Retreats',
    location: 'Jaipur, Rajasthan',
    chips: ['Terracotta', 'Home Decor', 'Custom Orders'],
    rating: '4.8',
    reviews: '124',
    orders: '500+ orders',
    delivery: '20–25 days',
    feature: 'Eco-friendly',
    avatar: ARTISAN_IMAGE,
  },
  {
    id: '2',
    badge: 'High Quality Match',
    badgeType: 'quality',
    name: 'Ramesh Patel',
    business: 'Kutch Kala Crafts',
    location: 'Kutch, Gujarat',
    chips: ['Ceramics', 'Traditional Design', 'Bulk Orders'],
    rating: '4.6',
    reviews: '98',
    orders: '1,000+ orders',
    delivery: '25–30 days',
    feature: 'Customizable',
    avatar: ARTISAN_IMAGE,
  },
  {
    id: '3',
    badge: 'Competitive Pricing',
    badgeType: 'price',
    name: 'Meena Devi',
    business: 'Vishwakarma Handicrafts',
    location: 'Varanasi, Uttar Pradesh',
    chips: ['Terracotta', 'Matte Finish', 'Export Ready'],
    rating: '4.7',
    reviews: '112',
    orders: '750+ orders',
    delivery: '20–28 days',
    feature: 'Pan India Shipping',
    avatar: ARTISAN_IMAGE,
  },
  {
    id: '4',
    badge: 'Nearby Supplier',
    badgeType: 'nearby',
    name: 'Amit Soni',
    business: 'Mittika Creations',
    location: 'Delhi, India',
    chips: ['Handmade', 'Modern & Traditional', 'Small MOQ'],
    rating: '4.5',
    reviews: '76',
    orders: '300+ orders',
    delivery: '15–20 days',
    feature: 'Custom Branding',
    avatar: ARTISAN_IMAGE,
  },
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

export default function SmartMatchResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const product = params.product || 'Handcrafted Terracotta Mugs';
  const quantity = params.quantity || '500 pieces';
  const location = params.location || 'Delhi, India';
  const requiredBy = params.requiredBy || 'Within 30 days';

  const [activeTab, setActiveTab] = useState('all');
  const [inquirySentArtisan, setInquirySentArtisan] = useState(null);

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'best':
        return { bg: '#EAF4EE', text: '#2E6B4E' };
      case 'quality':
        return { bg: '#E8F0FE', text: '#1967D2' };
      case 'price':
        return { bg: '#FEF3E2', text: '#C97A1F' };
      case 'nearby':
        return { bg: '#F3E8FD', text: '#7E22CE' };
    }
  };

  const handleSendInquiry = (artisan) => {
    setInquirySentArtisan(artisan.name);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Logo size="sm" showSubtitle={true} />
        <View style={styles.headerRight}>
          <View style={styles.bellWrapper}>
            <TouchableOpacity style={styles.circleBtn}>
              <Bell size={18} color={colors.studioDarkBrown} />
            </TouchableOpacity>
            <View style={styles.bellDot} />
          </View>
          <View style={styles.avatarRS}>
            <Text style={styles.avatarRSText}>RS</Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Title */}
        <View style={styles.heroRow}>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>Smart Match Results</Text>
            <Text style={styles.heroSubtitle}>
              We found the best artisan partners for your requirement using
              AI-powered matching.
            </Text>
          </View>
          <View style={styles.mottoStamp}>
            <Text style={styles.mottoLine}>Right</Text>
            <Text style={styles.mottoLine}>Artisans</Text>
            <Text style={styles.mottoLine}>Real</Text>
            <Text style={styles.mottoLine}>Solutions</Text>
            <BotanicalLeaf />
          </View>
        </View>

        {/* Requirement Context Card */}
        <View style={styles.contextCard}>
          <Image source={PRODUCT_IMAGE} style={styles.contextImg} />
          <View style={styles.contextInfo}>
            <Text style={styles.contextTitle}>{product}</Text>
            <Text style={styles.contextMeta}>
              {quantity} • {location} • {requiredBy}
            </Text>
            <View style={styles.tagsRow}>
              <View style={styles.tagPill}>
                <Text style={styles.tagPillText}>Home Decor</Text>
              </View>
              <View style={styles.tagPill}>
                <Text style={styles.tagPillText}>Traditional Design</Text>
              </View>
              <View style={styles.tagPill}>
                <Text style={styles.tagPillText}>Matte Finish</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.viewReqBtn}
            onPress={() => router.push({ pathname: '/buyer/requirement-review' })}
          >
            <Text style={styles.viewReqBtnText}>View Requirement</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
        >
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.tabActive]}
            onPress={() => setActiveTab('all')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'all' && styles.tabTextActive,
              ]}
            >
              All Matches (12)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'best' && styles.tabActive]}
            onPress={() => setActiveTab('best')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'best' && styles.tabTextActive,
              ]}
            >
              Best Match (5)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'nearby' && styles.tabActive]}
            onPress={() => setActiveTab('nearby')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'nearby' && styles.tabTextActive,
              ]}
            >
              Nearby (4)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'new' && styles.tabActive]}
            onPress={() => setActiveTab('new')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'new' && styles.tabTextActive,
              ]}
            >
              New Artisans (3)
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Filters Dropdown Row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersDropdownRow}
        >
          <TouchableOpacity style={styles.filterPill}>
            <SlidersHorizontal size={13} color={colors.studioDarkBrown} />
            <Text style={styles.filterPillText}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterPillText}>Location</Text>
            <ChevronDown size={13} color={colors.studioDarkBrown} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterPillText}>Price Range</Text>
            <ChevronDown size={13} color={colors.studioDarkBrown} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterPillText}>Min. Rating</Text>
            <ChevronDown size={13} color={colors.studioDarkBrown} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterPill}>
            <ArrowUpDown size={12} color={colors.studioDarkBrown} />
            <Text style={styles.filterPillText}>Sort</Text>
            <ChevronDown size={13} color={colors.studioDarkBrown} />
          </TouchableOpacity>
        </ScrollView>

        {/* Artisan Match Cards */}
        <View style={styles.artisanList}>
          {ARTISAN_MATCHES.map((artisan) => {
            const badgeStyle = getBadgeStyle(artisan.badgeType);
            return (
              <View key={artisan.id} style={styles.artisanCard}>
                {/* Match Badge */}
                <View
                  style={[
                    styles.matchBadge,
                    { backgroundColor: badgeStyle.bg },
                  ]}
                >
                  <Star size={11} color={badgeStyle.text} fill={badgeStyle.text} />
                  <Text style={[styles.matchBadgeText, { color: badgeStyle.text }]}>
                    {artisan.badge}
                  </Text>
                </View>

                {/* Main Card Content */}
                <View style={styles.cardMainRow}>
                  {/* Left Col: Avatar & Info */}
                  <View style={styles.cardLeftCol}>
                    <View style={styles.avatarWrap}>
                      <Image source={artisan.avatar} style={styles.avatarImg} />
                      <View style={styles.onlineDot} />
                    </View>

                    <View style={styles.artisanDetails}>
                      <Text style={styles.artisanName}>{artisan.name}</Text>
                      <Text style={styles.artisanBusiness}>
                        {artisan.business}
                      </Text>
                      <View style={styles.locRow}>
                        <MapPin size={11} color={colors.studioTerracotta} />
                        <Text style={styles.locText}>{artisan.location}</Text>
                      </View>
                      <View style={styles.chipsRow}>
                        {artisan.chips.map((chip, idx) => (
                          <View key={idx} style={styles.chipPill}>
                            <Text style={styles.chipText}>{chip}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>

                  {/* Right Col: Stats & Actions */}
                  <View style={styles.cardRightCol}>
                    <View style={styles.statsGrid}>
                      <View style={styles.statItem}>
                        <Star size={11} color="#E7B84A" fill="#E7B84A" />
                        <Text style={styles.statText}>
                          {artisan.rating} ({artisan.reviews})
                        </Text>
                      </View>
                      <View style={styles.statItem}>
                        <Package size={11} color={colors.textMuted} />
                        <Text style={styles.statText}>{artisan.orders}</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Truck size={11} color={colors.textMuted} />
                        <Text style={styles.statText}>{artisan.delivery}</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Leaf size={11} color="#2E6B4E" />
                        <Text style={styles.statText}>{artisan.feature}</Text>
                      </View>
                    </View>

                    <View style={styles.cardActionsCol}>
                      <TouchableOpacity
                        style={styles.sendInquiryBtn}
                        onPress={() => handleSendInquiry(artisan)}
                        activeOpacity={0.85}
                      >
                        <Text style={styles.sendInquiryText}>Send Inquiry</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.viewProfileBtn}
                        onPress={() =>
                          router.push({ pathname: '/artisan/business-page' })
                        }
                        activeOpacity={0.7}
                      >
                        <Text style={styles.viewProfileText}>View Profile</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Bottom Refine Card */}
        <View style={styles.refineCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 }}>
            <Sparkles size={16} color={colors.studioTerracotta} />
            <View style={{ flex: 1 }}>
              <Text style={styles.refineTitle}>Not finding the right match?</Text>
              <Text style={styles.refineSub}>
                Refine your filters or create a custom request to reach more
                artisans.
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.modifyBtn}
            onPress={() => router.push({ pathname: '/buyer/requirement-creator' })}
          >
            <Text style={styles.modifyBtnText}>Modify Requirement</Text>
          </TouchableOpacity>
        </View>

        <IndianCraftBorder />
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Inquiry Sent Confirmation Modal */}
      <Modal visible={!!inquirySentArtisan} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIcon}>
              <CheckCircle2 size={46} color="#2E6B4E" />
            </View>
            <Text style={styles.modalTitle}>Inquiry Sent!</Text>
            <Text style={styles.modalDesc}>
              Your requirement has been forwarded to {inquirySentArtisan}. They
              will review and send a custom quotation.
            </Text>
            <TouchableOpacity
              style={styles.modalCTA}
              onPress={() => setInquirySentArtisan(null)}
            >
              <Text style={styles.modalCTAText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push({ pathname: '/buyer/home' })}
          activeOpacity={0.7}
        >
          <Home size={22} color={colors.textMuted} />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Compass size={22} color={colors.studioTerracotta} />
          <Text style={[styles.navLabel, { color: colors.studioTerracotta }]}>
            Discover
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navFab}
          onPress={() => router.push({ pathname: '/buyer/requirement-creator' })}
          activeOpacity={0.8}
        >
          <Plus size={24} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push({ pathname: '/artisan/buyer-opportunities' })}
          activeOpacity={0.7}
        >
          <Inbox size={22} color={colors.textMuted} />
          <Text style={styles.navLabel}>Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/(tabs)/profile')}
          activeOpacity={0.7}
        >
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
    width: 38,
    height: 38,
    borderRadius: 19,
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
  avatarRS: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F7E7DF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarRSText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
    color: colors.studioTerracotta,
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
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: 'center',
  },
  mottoLine: {
    fontFamily: typography.fonts.script,
    fontSize: 12.5,
    color: colors.studioDarkBrown,
    lineHeight: 14,
  },
  contextCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    gap: 10,
    marginBottom: 14,
    alignItems: 'center',
  },
  contextImg: {
    width: 64,
    height: 64,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  contextInfo: {
    flex: 1,
  },
  contextTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 13,
    color: colors.studioDarkBrown,
    marginBottom: 2,
  },
  contextMeta: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textMuted,
    marginBottom: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  tagPill: {
    backgroundColor: '#FAF0EB',
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 1.5,
  },
  tagPillText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11,
    color: colors.studioTerracotta,
  },
  viewReqBtn: {
    borderWidth: 1,
    borderColor: colors.studioTerracotta,
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  viewReqBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.studioTerracotta,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabActive: {
    backgroundColor: colors.studioTerracotta,
    borderColor: colors.studioTerracotta,
  },
  tabText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.textBody,
  },
  tabTextActive: {
    fontFamily: typography.fonts.bodySemiBold,
    color: colors.white,
  },
  filtersDropdownRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  filterPillText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.studioDarkBrown,
  },
  artisanList: {
    gap: 12,
    marginBottom: 16,
  },
  artisanCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  matchBadgeText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
  },
  cardMainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLeftCol: {
    flexDirection: 'row',
    flex: 1,
    gap: 10,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatarImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    resizeMode: 'cover',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2E6B4E',
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  artisanDetails: {
    flex: 1,
  },
  artisanName: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 13.5,
    color: colors.studioDarkBrown,
  },
  artisanBusiness: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 2,
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 4,
  },
  locText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textMuted,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  chipPill: {
    backgroundColor: '#FAF4EE',
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  chipText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textBody,
  },
  cardRightCol: {
    width: 110,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  statsGrid: {
    gap: 3,
    alignItems: 'flex-end',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  statText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.studioDarkBrown,
  },
  cardActionsCol: {
    width: '100%',
    gap: 4,
    marginTop: 8,
  },
  sendInquiryBtn: {
    backgroundColor: colors.studioTerracotta,
    borderRadius: 12,
    paddingVertical: 5,
    alignItems: 'center',
    width: '100%',
  },
  sendInquiryText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12.5,
    color: colors.white,
  },
  viewProfileBtn: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 4,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FAF4EE',
  },
  viewProfileText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12.5,
    color: colors.studioDarkBrown,
  },
  refineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  refineTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 12.5,
    color: colors.studioDarkBrown,
  },
  refineSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textMuted,
    lineHeight: 14,
  },
  modifyBtn: {
    borderWidth: 1,
    borderColor: colors.studioTerracotta,
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#FAF0EB',
  },
  modifyBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12.5,
    color: colors.studioTerracotta,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '100%',
  },
  modalIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#EAF4EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 20,
    color: colors.studioDarkBrown,
    marginBottom: 8,
  },
  modalDesc: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  modalCTA: {
    backgroundColor: colors.studioTerracotta,
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  modalCTAText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
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