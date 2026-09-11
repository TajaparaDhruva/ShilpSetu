import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Share2,
  MoreVertical,
  Pencil,
  MapPin,
  ShieldCheck,
  Package,
  Users,
  Star,
  ShoppingBag,
  Heart,
  MessageCircle,
  Leaf,
  ChevronRight,
  Home,
  Search,
  Plus,
  User,
  ArrowRight,
} from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import IndianCraftBorder from '../../components/shilpsetu/IndianCraftBorder';

const ARTISAN_IMAGE = require('../../assets/images/onboarding_artisan_1.jpg');
const PRODUCT_IMAGE = require('../../assets/images/terracotta_vase_product.jpg');
const BANNER_BG = require('../../assets/images/shilpsetu_bottom_scene.jpg');

const FEATURED_PRODUCTS = [
  {
    id: '1',
    title: 'Terracotta Mug',
    price: 250,
    inStock: true,
    image: PRODUCT_IMAGE,
  },
  {
    id: '2',
    title: 'Clay Diya Set',
    price: 300,
    inStock: true,
    image: PRODUCT_IMAGE,
  },
  {
    id: '3',
    title: 'Decorative Vase',
    price: 450,
    inStock: true,
    image: PRODUCT_IMAGE,
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

export default function BusinessPageScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('products');
  const [isFollowing, setIsFollowing] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: "Check out Savita's Terracotta Crafts on ShilpSetu!",
        title: "Savita's Terracotta Crafts",
      });
    } catch {}
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.circleBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
          accessibilityLabel="Back"
        >
          <ChevronLeft size={22} color={colors.studioDarkBrown} />
        </TouchableOpacity>

        <Logo size="sm" showSubtitle={true} />

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.circleBtn}
            onPress={handleShare}
            activeOpacity={0.7}
            accessibilityLabel="Share profile"
          >
            <Share2 size={18} color={colors.studioDarkBrown} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.circleBtn}
            activeOpacity={0.7}
            accessibilityLabel="More options"
          >
            <MoreVertical size={18} color={colors.studioDarkBrown} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner Card */}
        <View style={styles.bannerCard}>
          <Image source={BANNER_BG} style={styles.bannerImageBg} />
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Tradition{"\n"}in Every Detail</Text>
            <Text style={styles.bannerSub}>Handmade • Sustainable • Rooted in India</Text>
          </View>
          <Image source={PRODUCT_IMAGE} style={styles.bannerProductThumb} />
        </View>

        {/* Profile Card */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image source={ARTISAN_IMAGE} style={styles.avatarImage} />
            <View style={styles.onlineDot} />
          </View>

          <View style={styles.profileInfo}>
            <View style={styles.profileTopRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.businessName}>Savita's Terracotta Crafts</Text>
                <View style={styles.locationRow}>
                  <MapPin size={12} color={colors.studioTerracotta} />
                  <Text style={styles.locationText}>Jaipur, Rajasthan</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.editPageBtn} activeOpacity={0.75}>
                <Pencil size={13} color={colors.studioDarkBrown} />
                <Text style={styles.editPageText}>Edit Page</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.verifiedBadge}>
              <ShieldCheck size={12} color="#2E6B4E" />
              <Text style={styles.verifiedText}>Verified Artisan</Text>
            </View>

            <Text style={styles.tagline}>
              Bringing traditional terracotta art to modern homes.
            </Text>
          </View>
        </View>

        {/* Metrics Card */}
        <View style={styles.metricsCard}>
          <View style={styles.metricCol}>
            <Package size={16} color={colors.studioTerracotta} />
            <Text style={styles.metricVal}>24</Text>
            <Text style={styles.metricLbl}>Products</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricCol}>
            <Users size={16} color={colors.studioTerracotta} />
            <Text style={styles.metricVal}>1.2K</Text>
            <Text style={styles.metricLbl}>Followers</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricCol}>
            <Star size={16} color="#E7B84A" fill="#E7B84A" />
            <Text style={styles.metricVal}>4.8</Text>
            <Text style={styles.metricLbl}>Rating (124)</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricCol}>
            <ShoppingBag size={16} color={colors.studioTerracotta} />
            <Text style={styles.metricVal}>350+</Text>
            <Text style={styles.metricLbl}>Total Sales</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabBar}>
          {(['products', 'about', 'reviews', 'contact']).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
              {activeTab === tab && <View style={styles.activeTabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Products */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity
            style={styles.viewAllRow}
            onPress={() => router.push({ pathname: '/artisan/product-library' })}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <ArrowRight size={13} color={colors.studioTerracotta} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredRow}
        >
          {FEATURED_PRODUCTS.map((prod) => (
            <TouchableOpacity
              key={prod.id}
              style={styles.productCard}
              onPress={() =>
                router.push({
                  pathname: '/artisan/product-detail',
                  params: { id: prod.id, title: prod.title, price: String(prod.price) },
                })
              }
              activeOpacity={0.8}
            >
              <View style={styles.prodImgWrapper}>
                <Image source={prod.image} style={styles.prodImg} />
                <View style={styles.favBadge}>
                  <Heart size={12} color={colors.white} fill={colors.white} />
                </View>
              </View>
              <Text style={styles.prodTitle} numberOfLines={1}>
                {prod.title}
              </Text>
              <Text style={styles.prodPrice}>₹{prod.price}</Text>
              <View style={styles.inStockBadge}>
                <View style={styles.inStockDot} />
                <Text style={styles.inStockText}>In Stock</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* About My Business Card */}
        <View style={styles.aboutCard}>
          <View style={styles.aboutHeader}>
            <View style={styles.leafIconCircle}>
              <Leaf size={14} color={colors.studioTerracotta} />
            </View>
            <Text style={styles.aboutTitle}>About My Business</Text>
          </View>
          <View style={styles.aboutBody}>
            <Text style={styles.aboutDesc}>
              I am Savita Kumari, a passionate artisan from Jaipur, creating
              handmade terracotta products that reflect the rich heritage and
              culture of Rajasthan. Each piece is crafted with love, care and a
              commitment to sustainability.
            </Text>
            <View style={styles.mottoStamp}>
              <Text style={styles.mottoLine}>Artisans</Text>
              <Text style={styles.mottoLine}>Communities</Text>
              <Text style={styles.mottoLine}>Stronger</Text>
              <Text style={styles.mottoLine}>Tomorrows</Text>
              <BotanicalLeaf />
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.messageBtn} activeOpacity={0.8}>
            <MessageCircle size={18} color={colors.studioDarkBrown} />
            <Text style={styles.messageBtnText}>Message</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.followBtn}
            onPress={() => setIsFollowing((f) => !f)}
            activeOpacity={0.85}
          >
            <ShoppingBag size={18} color={colors.white} />
            <Text style={styles.followBtnText}>
              {isFollowing ? 'Following' : 'Follow Shop'}
            </Text>
          </TouchableOpacity>
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
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push({ pathname: '/artisan/product-library' })}
          activeOpacity={0.7}
        >
          <Package size={22} color={colors.studioTerracotta} />
          <Text style={[styles.navLabel, { color: colors.studioTerracotta }]}>
            Products
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  bannerCard: {
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
    backgroundColor: '#3A2016',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  bannerImageBg: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
    opacity: 0.25,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(58, 32, 22, 0.75)',
  },
  bannerContent: {
    flex: 1,
    zIndex: 2,
  },
  bannerTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 22,
    color: colors.white,
    lineHeight: 28,
    marginBottom: 4,
  },
  bannerSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: '#E7D8C3',
  },
  bannerProductThumb: {
    width: 90,
    height: 110,
    borderRadius: 12,
    resizeMode: 'cover',
    zIndex: 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  profileSection: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  avatarImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: colors.white,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#2E6B4E',
    borderWidth: 2,
    borderColor: colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  businessName: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 16,
    color: colors.studioDarkBrown,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  locationText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
  },
  editPageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.white,
  },
  editPageText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11.5,
    color: colors.studioDarkBrown,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EAF4EE',
    borderRadius: 12,
    paddingHorizontal: 7,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  verifiedText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12.5,
    color: '#2E6B4E',
  },
  tagline: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textBody,
    lineHeight: 16,
  },
  metricsCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  metricCol: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  metricVal: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 15,
    color: colors.studioDarkBrown,
  },
  metricLbl: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
  },
  metricDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.border,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    position: 'relative',
  },
  tabItemActive: {},
  tabText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 13.5,
    color: colors.textMuted,
  },
  tabTextActive: {
    fontFamily: typography.fonts.bodySemiBold,
    color: colors.studioTerracotta,
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 12,
    right: 12,
    height: 2.5,
    backgroundColor: colors.studioTerracotta,
    borderRadius: 2,
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
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  viewAllText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.studioTerracotta,
  },
  featuredRow: {
    gap: 10,
    paddingBottom: 4,
    marginBottom: 16,
  },
  productCard: {
    width: 130,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 8,
  },
  prodImgWrapper: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 6,
  },
  prodImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prodTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.studioDarkBrown,
    marginBottom: 2,
  },
  prodPrice: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 14,
    color: colors.studioTerracotta,
    marginBottom: 4,
  },
  inStockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EAF4EE',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  inStockDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#2E6B4E',
  },
  inStockText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: '#2E6B4E',
  },
  aboutCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 16,
  },
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  leafIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FAF0EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 14,
    color: colors.studioDarkBrown,
  },
  aboutBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  aboutDesc: {
    flex: 1,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textBody,
    lineHeight: 18,
  },
  mottoStamp: {
    backgroundColor: '#F5ECD8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: 'center',
    gap: 2,
  },
  mottoLine: {
    fontFamily: typography.fonts.script,
    fontSize: 12.5,
    color: colors.studioDarkBrown,
    lineHeight: 13,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  messageBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 24,
    paddingVertical: 13,
  },
  messageBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.studioDarkBrown,
  },
  followBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.studioTerracotta,
    borderRadius: 24,
    paddingVertical: 13,
  },
  followBtnText: {
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