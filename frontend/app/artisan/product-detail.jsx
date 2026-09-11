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
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  Heart,
  Share2,
  Star,
  HandMetal,
  Leaf,
  ShieldCheck,
  Gift,
  List,
  MapPin,
  ChevronRight,
  ShoppingBag,
  Home,
  Search,
  Plus,
  Package,
  User,
  Check,
} from 'lucide-react-native';

import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import IndianCraftBorder from '../../components/shilpsetu/IndianCraftBorder';

const PRODUCT_IMAGE = require('../../assets/images/terracotta_vase_product.jpg');
const ARTISAN_IMAGE = require('../../assets/images/onboarding_artisan_1.jpg');

const GALLERY_IMAGES = [
  PRODUCT_IMAGE,
  PRODUCT_IMAGE,
  PRODUCT_IMAGE,
  PRODUCT_IMAGE,
  PRODUCT_IMAGE,
];

const HIGHLIGHT_ITEMS = [
  {
    id: 'eco',
    label: 'Eco-friendly',
    Icon: Leaf,
    color: '#2E6B4E',
    bg: '#EAF4EE',
  },
  {
    id: 'handmade',
    label: 'Handmade',
    Icon: HandMetal,
    color: '#C04A2F',
    bg: '#FAF0EB',
  },
  {
    id: 'durable',
    label: 'Durable',
    Icon: ShieldCheck,
    color: '#5A3926',
    bg: '#F5ECE4',
  },
  {
    id: 'gift',
    label: 'Great for Gifting',
    Icon: Gift,
    color: '#C04A2F',
    bg: '#FAF0EB',
  },
];

export default function ProductDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const productTitle = params.title || 'Terracotta Mug';
  const productPrice = params.price || '250';
  const productCategory = params.category || 'Home Decor';
  const productStock = params.stock || '100';

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInLibrary, setIsInLibrary] = useState(true);

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out ' + productTitle + ' on ShilpSetu - Handcrafted by traditional Indian artisans!',
        title: productTitle,
      });
    } catch {
      // ignore
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted((prev) => !prev);
  };

  const handleLibraryToggle = () => {
    setIsInLibrary((prev) => !prev);
  };

  const handleViewArtisanProfile = () => {
    router.push({
      pathname: '/artisan/capability-profile',
      params: { artisanName: 'Savita Kumari', craft: 'Terracotta Pottery' },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.circleBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
          accessibilityLabel="Back to product library"
        >
          <ChevronLeft size={22} color={colors.studioDarkBrown} />
        </TouchableOpacity>

        <Logo size="sm" showSubtitle={true} />

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.circleBtn}
            onPress={handleWishlistToggle}
            activeOpacity={0.7}
            accessibilityLabel="Toggle wishlist"
          >
            <Heart
              size={18}
              color={isWishlisted ? '#E53935' : colors.studioTerracotta}
              fill={isWishlisted ? '#E53935' : 'transparent'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.circleBtn}
            onPress={handleShare}
            activeOpacity={0.7}
            accessibilityLabel="Share product"
          >
            <Share2 size={18} color={colors.studioDarkBrown} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Hero Gallery */}
        <View style={styles.galleryContainer}>
          {/* Main Large Image */}
          <View style={styles.mainImageWrapper}>
            <Image
              source={GALLERY_IMAGES[activeImageIndex]}
              style={styles.mainImage}
            />

            <View style={styles.handmadeBadge}>
              <HandMetal size={13} color={colors.studioTerracotta} />
              <Text style={styles.handmadeText}>Handmade</Text>
            </View>

            <View style={styles.counterBadge}>
              <Text style={styles.counterText}>
                {(activeImageIndex + 1) + '/' + GALLERY_IMAGES.length}
              </Text>
            </View>
          </View>

          {/* Right Thumbnails Column */}
          <View style={styles.thumbnailsColumn}>
            {GALLERY_IMAGES.slice(1, 5).map((img, idx) => {
              const itemIndex = idx + 1;
              const isActive = activeImageIndex === itemIndex;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.thumbnailWrapper,
                    isActive && styles.thumbnailActive,
                  ]}
                  onPress={() => setActiveImageIndex(itemIndex)}
                  activeOpacity={0.8}
                >
                  <Image source={img} style={styles.thumbnailImage} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Title, Price, Ratings & In Stock */}
        <View style={styles.productSummarySection}>
          <View style={styles.titlePriceRow}>
            <Text style={styles.productTitle}>{productTitle}</Text>
            <Text style={styles.productPrice}>₹{productPrice}</Text>
          </View>

          <View style={styles.ratingStockRow}>
            <View style={styles.ratingInfo}>
              <Star size={15} color="#E7B84A" fill="#E7B84A" />
              <Text style={styles.ratingScore}>4.8</Text>
              <Text style={styles.ratingCount}>(124 reviews)</Text>
              <View style={styles.ratingDivider} />
              <Text style={styles.soldCount}>50+ sold</Text>
            </View>

            <View style={styles.stockBadge}>
              <View style={styles.stockDot} />
              <Text style={styles.stockText}>In Stock</Text>
            </View>
          </View>

          <Text style={styles.descriptionText}>
            Handcrafted terracotta mug with traditional Indian motifs. Perfect
            for everyday use.
          </Text>
        </View>

        {/* Highlights Row */}
        <View style={styles.highlightsRow}>
          {HIGHLIGHT_ITEMS.map((item) => (
            <View key={item.id} style={styles.highlightCard}>
              <View
                style={[styles.highlightIconCircle, { backgroundColor: item.bg }]}
              >
                <item.Icon size={18} color={item.color} />
              </View>
              <Text style={styles.highlightLabel} numberOfLines={2}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Product Details Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderIcon}>
              <List size={16} color={colors.studioTerracotta} />
            </View>
            <Text style={styles.cardHeaderTitle}>Product Details</Text>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailCol}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Material</Text>
                <Text style={styles.detailValue}>Terracotta Clay</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Size (approx.)</Text>
                <Text style={styles.detailValue}>250 ml (H 9 cm)</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Weight (approx.)</Text>
                <Text style={styles.detailValue}>300 grams</Text>
              </View>
            </View>

            <View style={styles.detailsVerticalDivider} />

            <View style={styles.detailCol}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Category</Text>
                <Text style={styles.detailValue}>{productCategory}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>SKU</Text>
                <Text style={styles.detailValue}>SP-TRM-001</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Stock Quantity</Text>
                <Text style={styles.detailValue}>{productStock} pieces</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Crafted By Artisan Card */}
        <View style={styles.artisanCard}>
          <Image source={ARTISAN_IMAGE} style={styles.artisanAvatar} />
          <View style={styles.artisanInfo}>
            <Text style={styles.craftedByText}>Crafted by</Text>
            <Text style={styles.artisanName}>Savita Kumari</Text>
            <View style={styles.locationRow}>
              <MapPin size={12} color={colors.studioTerracotta} />
              <Text style={styles.locationText}>Jaipur, Rajasthan</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.viewProfileBtn}
            onPress={handleViewArtisanProfile}
            activeOpacity={0.75}
            accessibilityLabel="View artisan profile"
          >
            <Text style={styles.viewProfileText}>View Artisan Profile</Text>
            <ChevronRight size={14} color={colors.studioTerracotta} />
          </TouchableOpacity>
        </View>

        {/* Bottom Action Buttons */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            style={[
              styles.wishlistBtn,
              isWishlisted && styles.wishlistBtnActive,
            ]}
            onPress={handleWishlistToggle}
            activeOpacity={0.8}
            accessibilityLabel="Add to Wishlist"
          >
            <Heart
              size={18}
              color={colors.studioTerracotta}
              fill={isWishlisted ? colors.studioTerracotta : 'transparent'}
            />
            <Text style={styles.wishlistBtnText}>
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.libraryBtn}
            onPress={handleLibraryToggle}
            activeOpacity={0.85}
            accessibilityLabel="Add to Library"
          >
            {isInLibrary ? (
              <Check size={18} color={colors.white} />
            ) : (
              <ShoppingBag size={18} color={colors.white} />
            )}
            <Text style={styles.libraryBtnText}>
              {isInLibrary ? 'In Library' : 'Add to Library'}
            </Text>
          </TouchableOpacity>
        </View>

        <IndianCraftBorder />
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation Bar */}
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
          accessibilityLabel="New request"
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
  headerActions: {
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  galleryContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  mainImageWrapper: {
    flex: 1,
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#ECE3D7',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  handmadeBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  handmadeText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.studioDarkBrown,
  },
  counterBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(42, 27, 18, 0.65)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  counterText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11,
    color: colors.white,
  },
  thumbnailsColumn: {
    width: 68,
    gap: 8,
    justifyContent: 'space-between',
  },
  thumbnailWrapper: {
    width: 68,
    height: 56,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'transparent',
    backgroundColor: '#ECE3D7',
  },
  thumbnailActive: {
    borderColor: colors.studioTerracotta,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productSummarySection: {
    marginBottom: 16,
  },
  titlePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  productTitle: {
    flex: 1,
    fontFamily: typography.fonts.serifBold,
    fontSize: 26,
    color: colors.studioDarkBrown,
    lineHeight: 32,
    paddingRight: 10,
  },
  productPrice: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 26,
    color: colors.studioTerracotta,
  },
  ratingStockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingScore: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13.5,
    color: colors.studioDarkBrown,
  },
  ratingCount: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
  },
  ratingDivider: {
    width: 1,
    height: 12,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  soldCount: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#EAF4EE',
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  stockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2E6B4E',
  },
  stockText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11.5,
    color: '#2E6B4E',
  },
  descriptionText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13.5,
    color: colors.textBody,
    lineHeight: 20,
  },
  highlightsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  highlightCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  highlightLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11,
    color: colors.studioDarkBrown,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  cardHeaderIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FAF0EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeaderTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 16,
    color: colors.studioDarkBrown,
  },
  detailsGrid: {
    flexDirection: 'row',
  },
  detailCol: {
    flex: 1,
    gap: 12,
  },
  detailsVerticalDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 12,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
  },
  detailValue: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.studioDarkBrown,
    textAlign: 'right',
  },
  artisanCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 16,
  },
  artisanAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    resizeMode: 'cover',
    marginRight: 10,
  },
  artisanInfo: {
    flex: 1,
  },
  craftedByText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  artisanName: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 15,
    color: colors.studioDarkBrown,
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  locationText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
  },
  viewProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FAF4EE',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  viewProfileText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11,
    color: colors.studioTerracotta,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  wishlistBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.studioTerracotta,
    borderRadius: 26,
    paddingVertical: 14,
  },
  wishlistBtnActive: {
    backgroundColor: '#FAF0EB',
  },
  wishlistBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.studioTerracotta,
  },
  libraryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.studioTerracotta,
    borderRadius: 26,
    paddingVertical: 14,
  },
  libraryBtnText: {
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