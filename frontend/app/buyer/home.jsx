import React from 'react';
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
  SlidersHorizontal,
  ArrowRight,
  Star,
  MapPin,
  Calendar,
  ChevronRight,
  Home,
  Compass,
  Plus,
  Inbox,
  User,
  Coffee,
  Gift,
  Shirt,
  ShoppingBag,
  MoreHorizontal,
  Flame,
} from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import IndianCraftBorder from '../../components/shilpsetu/IndianCraftBorder';

const PRODUCT_IMAGE = require('../../assets/images/terracotta_vase_product.jpg');
const ARTISAN_SAVITA = require('../../assets/images/onboarding_artisan_1.jpg');

const CATEGORIES = [
  { id: '1', label: 'Home Decor', icon: Flame },
  { id: '2', label: 'Lifestyle', icon: Coffee },
  { id: '3', label: 'Festive', icon: Gift },
  { id: '4', label: 'Fashion', icon: Shirt },
  { id: '5', label: 'Accessories', icon: ShoppingBag },
  { id: '6', label: 'More', icon: MoreHorizontal },
];

const ARTISANS = [
  {
    id: '1',
    name: 'Savita Kumari',
    location: 'Jaipur, Rajasthan',
    craft: 'Terracotta Crafts',
    rating: '4.8',
    reviews: '124',
    image: ARTISAN_SAVITA,
  },
  {
    id: '2',
    name: 'Ramesh Patel',
    location: 'Kutch, Gujarat',
    craft: 'Handwoven Textiles',
    rating: '4.6',
    reviews: '98',
    image: ARTISAN_SAVITA,
  },
  {
    id: '3',
    name: 'Meena Devi',
    location: 'Varanasi, Uttar Pradesh',
    craft: 'Wooden Handicrafts',
    rating: '4.7',
    reviews: '112',
    image: ARTISAN_SAVITA,
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

export default function BuyerHomeScreen() {
  const router = useRouter();

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
            <Text style={styles.heroTitle}>Welcome, Buyer!</Text>
            <Text style={styles.heroSubtitle}>
              Source authentic handmade products from skilled artisans across
              India.
            </Text>
          </View>
          <View style={styles.mottoStamp}>
            <Text style={styles.mottoLine}>Handmade</Text>
            <Text style={styles.mottoLine}>People</Text>
            <Text style={styles.mottoLine}>Stronger</Text>
            <Text style={styles.mottoLine}>Communities</Text>
            <BotanicalLeaf />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Search size={16} color={colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for products, artisans, or opportunities..."
              placeholderTextColor={colors.textMuted}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
            <SlidersHorizontal size={14} color={colors.studioDarkBrown} />
            <Text style={styles.filterBtnText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.bannerTextCol}>
            <Text style={styles.bannerTitle}>
              Authentic Crafts.{"\n"}Real Opportunities.
            </Text>
            <Text style={styles.bannerSub}>
              Connect with skilled artisans and bring unique handmade products to
              your business.
            </Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => router.push({ pathname: '/buyer/requirement-creator' })}
              activeOpacity={0.85}
            >
              <Text style={styles.exploreBtnText}>Explore Now</Text>
              <ArrowRight size={12} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Image source={PRODUCT_IMAGE} style={styles.bannerImg} />
          {/* Carousel dots */}
          <View style={styles.dotsRow}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Shop by Category */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <TouchableOpacity style={styles.viewAllBtn}>
            <Text style={styles.viewAllText}>View All</Text>
            <ArrowRight size={12} color={colors.studioTerracotta} />
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryItem}
              activeOpacity={0.7}
            >
              <View style={styles.catIconCircle}>
                <cat.icon size={18} color={colors.studioTerracotta} />
              </View>
              <Text style={styles.catLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Artisans */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Artisans</Text>
          <TouchableOpacity
            style={styles.viewAllBtn}
            onPress={() => router.push({ pathname: '/buyer/smart-match' })}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <ArrowRight size={12} color={colors.studioTerracotta} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.artisansRow}
        >
          {ARTISANS.map((art) => (
            <View key={art.id} style={styles.artisanCard}>
              <Image source={art.image} style={styles.artisanImg} />
              <Text style={styles.artisanName}>{art.name}</Text>
              <View style={styles.locRow}>
                <MapPin size={10} color={colors.studioTerracotta} />
                <Text style={styles.locText}>{art.location}</Text>
              </View>
              <Text style={styles.craftText}>{art.craft}</Text>
              <View style={styles.ratingRow}>
                <Star size={11} color="#E7B84A" fill="#E7B84A" />
                <Text style={styles.ratingText}>
                  {art.rating} ({art.reviews})
                </Text>
              </View>
              <TouchableOpacity
                style={styles.profileBtn}
                onPress={() => router.push({ pathname: '/artisan/business-page' })}
              >
                <Text style={styles.profileBtnText}>View Profile</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Recent Buyer Opportunities */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Buyer Opportunities</Text>
          <TouchableOpacity
            style={styles.viewAllBtn}
            onPress={() => router.push({ pathname: '/artisan/buyer-opportunities' })}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <ArrowRight size={12} color={colors.studioTerracotta} />
          </TouchableOpacity>
        </View>

        <View style={styles.oppsList}>
          {/* Opp 1 */}
          <TouchableOpacity
            style={styles.oppListItem}
            onPress={() => router.push({ pathname: '/artisan/rfq-detail' })}
            activeOpacity={0.7}
          >
            <Image source={PRODUCT_IMAGE} style={styles.oppListImg} />
            <View style={styles.oppListInfo}>
              <View style={styles.openPill}>
                <Text style={styles.openPillText}>Open</Text>
              </View>
              <Text style={styles.oppListTitle}>Handcrafted Terracotta Mugs</Text>
              <Text style={styles.oppListMeta}>500 pieces • Delhi, India</Text>
            </View>
            <View style={styles.oppListRight}>
              <View style={styles.oppTimeRow}>
                <Calendar size={11} color={colors.textMuted} />
                <Text style={styles.oppTimeText}>Closes in 10 days</Text>
              </View>
              <ChevronRight size={16} color={colors.textMuted} />
            </View>
          </TouchableOpacity>

          {/* Opp 2 */}
          <TouchableOpacity
            style={styles.oppListItem}
            onPress={() => router.push({ pathname: '/artisan/rfq-detail' })}
            activeOpacity={0.7}
          >
            <Image source={PRODUCT_IMAGE} style={styles.oppListImg} />
            <View style={styles.oppListInfo}>
              <View style={styles.inProgressPill}>
                <Text style={styles.inProgressPillText}>In Progress</Text>
              </View>
              <Text style={styles.oppListTitle}>Jute Storage Baskets</Text>
              <Text style={styles.oppListMeta}>300 pieces • Mumbai, India</Text>
            </View>
            <View style={styles.oppListRight}>
              <View style={styles.oppTimeRow}>
                <Calendar size={11} color={colors.textMuted} />
                <Text style={styles.oppTimeText}>Closes in 5 days</Text>
              </View>
              <ChevronRight size={16} color={colors.textMuted} />
            </View>
          </TouchableOpacity>
        </View>

        <IndianCraftBorder />
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Home size={22} color={colors.studioTerracotta} />
          <Text style={[styles.navLabel, { color: colors.studioTerracotta }]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push({ pathname: '/buyer/smart-match' })}
          activeOpacity={0.7}
        >
          <Compass size={22} color={colors.textMuted} />
          <Text style={styles.navLabel}>Discover</Text>
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
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignItems: 'center',
  },
  mottoLine: {
    fontFamily: typography.fonts.script,
    fontSize: 11,
    color: colors.studioDarkBrown,
    lineHeight: 14,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
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
  heroBanner: {
    height: 150,
    backgroundColor: '#3E2519',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    position: 'relative',
    marginBottom: 20,
  },
  bannerTextCol: {
    flex: 1,
    paddingRight: 10,
  },
  bannerTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 18,
    color: colors.white,
    lineHeight: 23,
    marginBottom: 4,
  },
  bannerSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12.5,
    color: '#D8C3B5',
    lineHeight: 14,
    marginBottom: 8,
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.studioTerracotta,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  exploreBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11,
    color: colors.white,
  },
  bannerImg: {
    width: 95,
    height: 120,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  dotsRow: {
    position: 'absolute',
    bottom: 8,
    right: 16,
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dotActive: {
    backgroundColor: colors.white,
    width: 8,
    borderRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 16,
    color: colors.studioDarkBrown,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  viewAllText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.studioTerracotta,
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    gap: 4,
    width: 52,
  },
  catIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FAF0EB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F2DFC7',
  },
  catLabel: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.studioDarkBrown,
    textAlign: 'center',
  },
  artisansRow: {
    gap: 12,
    paddingBottom: 4,
    marginBottom: 20,
  },
  artisanCard: {
    width: 140,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    alignItems: 'center',
  },
  artisanImg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    resizeMode: 'cover',
    marginBottom: 6,
  },
  artisanName: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 13,
    color: colors.studioDarkBrown,
    textAlign: 'center',
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 1,
  },
  locText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
  },
  craftText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.studioTerracotta,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 3,
    marginBottom: 8,
  },
  ratingText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.studioDarkBrown,
  },
  profileBtn: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 4,
    alignItems: 'center',
    backgroundColor: '#FAF4EE',
  },
  profileBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12.5,
    color: colors.studioDarkBrown,
  },
  oppsList: {
    gap: 10,
    marginBottom: 16,
  },
  oppListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    gap: 10,
  },
  oppListImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  oppListInfo: {
    flex: 1,
  },
  openPill: {
    backgroundColor: '#EAF4EE',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    alignSelf: 'flex-start',
    marginBottom: 3,
  },
  openPillText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11.5,
    color: '#2E6B4E',
  },
  inProgressPill: {
    backgroundColor: '#FEF3E2',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    alignSelf: 'flex-start',
    marginBottom: 3,
  },
  inProgressPillText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11.5,
    color: '#C97A1F',
  },
  oppListTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 13,
    color: colors.studioDarkBrown,
    marginBottom: 2,
  },
  oppListMeta: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  oppListRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 50,
  },
  oppTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  oppTimeText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
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