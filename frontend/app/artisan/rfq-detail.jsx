import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  Bookmark,
  MoreVertical,
  Building2,
  MapPin,
  Calendar,
  Package,
  IndianRupee,
  Truck,
  List,
  ShieldCheck,
  FileText,
  Star,
  ArrowRight,
  MessageCircle,
  Send,
  Home,
  Search,
  Plus,
  User,
  Info,
} from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import IndianCraftBorder from '../../components/shilpsetu/IndianCraftBorder';

const PRODUCT_IMAGE = require('../../assets/images/terracotta_vase_product.jpg');

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

export default function RFQDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const rfqTitle = params.title || 'Handcrafted Terracotta Mugs';
  const rfqBuyer = params.buyer || 'Earth & Home Retail Pvt. Ltd.';
  const rfqQuantity = params.quantity || '500 pieces';

  const handleSendQuote = () => {
    router.push({
      pathname: '/artisan/send-quotation',
      params: {
        title: rfqTitle,
        buyer: rfqBuyer,
        quantity: rfqQuantity,
      },
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
        >
          <ChevronLeft size={22} color={colors.studioDarkBrown} />
        </TouchableOpacity>

        <Logo size="sm" showSubtitle={true} />

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.circleBtn} activeOpacity={0.7}>
            <Bookmark size={18} color={colors.studioDarkBrown} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleBtn} activeOpacity={0.7}>
            <MoreVertical size={18} color={colors.studioDarkBrown} />
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
            <Text style={styles.heroTitle}>RFQ Detail</Text>
            <Text style={styles.heroSubtitle}>
              Review the buyer's requirements and send your best quote
            </Text>
          </View>
          <View style={styles.mottoStamp}>
            <Text style={styles.mottoLine}>Real</Text>
            <Text style={styles.mottoLine}>Opportunities</Text>
            <Text style={styles.mottoLine}>for</Text>
            <Text style={styles.mottoLine}>Real Artisans</Text>
            <BotanicalLeaf />
          </View>
        </View>

        {/* RFQ Header Card */}
        <View style={styles.rfqHeaderCard}>
          <Image source={PRODUCT_IMAGE} style={styles.rfqImage} />

          <View style={styles.rfqInfo}>
            <View style={styles.bulkBadge}>
              <Text style={styles.bulkBadgeText}>Bulk Order</Text>
            </View>

            <Text style={styles.rfqMainTitle}>{rfqTitle}</Text>
            <Text style={styles.rfqMainDesc}>
              Looking to source handcrafted terracotta mugs with traditional
              Indian designs for our home decor retail stores.
            </Text>

            <View style={styles.buyerMetaRow}>
              <Building2 size={12} color={colors.textMuted} />
              <Text style={styles.buyerMetaText}>{rfqBuyer}</Text>
            </View>
            <View style={styles.buyerMetaRow}>
              <MapPin size={12} color={colors.textMuted} />
              <Text style={styles.buyerMetaText}>Delhi, India</Text>
            </View>
          </View>

          <View style={styles.dateCloseBox}>
            <View style={styles.postedRow}>
              <Calendar size={11} color={colors.textMuted} />
              <Text style={styles.postedDateText}>Posted on 12 Sep 2025</Text>
            </View>
            <View style={styles.closesBox}>
              <Text style={styles.closesLabel}>Closes in</Text>
              <Text style={styles.closesDays}>10 days</Text>
            </View>
          </View>
        </View>

        {/* Requirements Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <FileText size={16} color={colors.studioTerracotta} />
            <Text style={styles.cardTitle}>Requirements</Text>
          </View>

          {/* 4 Metric Columns */}
          <View style={styles.metricGrid}>
            <View style={styles.metricCell}>
              <Package size={16} color={colors.studioTerracotta} />
              <Text style={styles.metricCellLabel}>Quantity</Text>
              <Text style={styles.metricCellValue}>{rfqQuantity}</Text>
            </View>
            <View style={styles.metricCell}>
              <IndianRupee size={16} color={colors.studioTerracotta} />
              <Text style={styles.metricCellLabel}>Target Price</Text>
              <Text style={styles.metricCellValue}>₹180 – ₹250</Text>
              <Text style={styles.metricCellSub}>per piece</Text>
            </View>
            <View style={styles.metricCell}>
              <MapPin size={16} color={colors.studioTerracotta} />
              <Text style={styles.metricCellLabel}>Delivery Location</Text>
              <Text style={styles.metricCellValue}>Delhi, India</Text>
            </View>
            <View style={styles.metricCell}>
              <Truck size={16} color={colors.studioTerracotta} />
              <Text style={styles.metricCellLabel}>Delivery Timeline</Text>
              <Text style={styles.metricCellValue}>Within 30 days</Text>
            </View>
          </View>

          {/* Product Specifications */}
          <View style={styles.specsSection}>
            <View style={styles.specsHeader}>
              <List size={14} color={colors.studioDarkBrown} />
              <Text style={styles.specsTitle}>Product Specifications</Text>
            </View>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>• Material: Natural Terracotta</Text>
              <Text style={styles.bulletItem}>• Capacity: 250–300 ml</Text>
              <Text style={styles.bulletItem}>
                • Design: Traditional Indian motifs (open to variations)
              </Text>
              <Text style={styles.bulletItem}>• Finish: Matte or natural finish</Text>
              <Text style={styles.bulletItem}>
                • Custom branding possible (discuss)
              </Text>
            </View>
          </View>
        </View>

        {/* Buyer Info & Additional Info Row / Stack */}
        <View style={styles.twoCardsRow}>
          {/* Buyer Information Card */}
          <View style={[styles.card, { flex: 1 }]}>
            <View style={styles.cardHeader}>
              <Building2 size={16} color={colors.studioTerracotta} />
              <Text style={styles.cardTitle}>Buyer Information</Text>
            </View>
            <Text style={styles.buyerNameText}>{rfqBuyer}</Text>
            <Text style={styles.buyerDescText}>
              A sustainable lifestyle brand with 20+ retail stores across India.
            </Text>
            <View style={styles.metaRowItem}>
              <MapPin size={12} color={colors.textMuted} />
              <Text style={styles.metaRowLabel}>Delhi, India</Text>
            </View>
            <View style={styles.verifiedBuyerBadge}>
              <ShieldCheck size={12} color="#2E6B4E" />
              <Text style={styles.verifiedBuyerText}>Verified Buyer</Text>
            </View>
            <View style={styles.metaRowItem}>
              <FileText size={12} color={colors.textMuted} />
              <Text style={styles.metaRowLabel}>12 RFQs Posted</Text>
            </View>
            <View style={styles.metaRowItem}>
              <Star size={12} color="#E7B84A" fill="#E7B84A" />
              <Text style={styles.metaRowLabel}>4.6 (28 reviews)</Text>
            </View>
            <TouchableOpacity style={styles.viewBuyerBtn}>
              <Text style={styles.viewBuyerText}>View Buyer Profile</Text>
              <ArrowRight size={12} color={colors.studioTerracotta} />
            </TouchableOpacity>
          </View>

          {/* Additional Information Card */}
          <View style={[styles.card, { flex: 1 }]}>
            <View style={styles.cardHeader}>
              <Info size={16} color={colors.studioTerracotta} />
              <Text style={styles.cardTitle}>Additional Information</Text>
            </View>
            <View style={styles.kvRow}>
              <Text style={styles.kText}>Category</Text>
              <Text style={styles.vText}>Home Decor</Text>
            </View>
            <View style={styles.kvRow}>
              <Text style={styles.kText}>Sub-category</Text>
              <Text style={styles.vText}>Drinkware</Text>
            </View>
            <View style={styles.kvRow}>
              <Text style={styles.kText}>RFQ ID</Text>
              <Text style={styles.vText}>RFQ20250912-001</Text>
            </View>
            <View style={styles.kvRow}>
              <Text style={styles.kText}>Payment Terms</Text>
              <Text style={styles.vText}>Standard (Negotiable)</Text>
            </View>
            <View style={styles.kvRow}>
              <Text style={styles.kText}>Inquiries</Text>
              <Text style={styles.vText}>15 suppliers</Text>
            </View>
            <View style={styles.noteBox}>
              <Text style={styles.noteTitle}>Buyer's Note</Text>
              <Text style={styles.noteBody}>
                "Looking for skilled artisan partners who can ensure consistent
                quality and timely delivery. Long-term collaboration
                opportunities available."
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.askBtn} activeOpacity={0.8}>
            <MessageCircle size={18} color={colors.studioDarkBrown} />
            <Text style={styles.askBtnText}>Ask a Question</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sendQuoteBtn}
            onPress={handleSendQuote}
            activeOpacity={0.85}
          >
            <Send size={18} color={colors.white} />
            <Text style={styles.sendQuoteBtnText}>Send Quote</Text>
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
          onPress={() => router.push({ pathname: '/artisan/buyer-opportunities' })}
          activeOpacity={0.7}
        >
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
    paddingVertical: 6,
    alignItems: 'center',
  },
  mottoLine: {
    fontFamily: typography.fonts.script,
    fontSize: 11,
    color: colors.studioDarkBrown,
    lineHeight: 14,
  },
  rfqHeaderCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 10,
    marginBottom: 16,
  },
  rfqImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  rfqInfo: {
    flex: 1,
  },
  bulkBadge: {
    backgroundColor: '#EAF4EE',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  bulkBadgeText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11.5,
    color: '#2E6B4E',
  },
  rfqMainTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 14,
    color: colors.studioDarkBrown,
    marginBottom: 3,
  },
  rfqMainDesc: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    lineHeight: 15,
    marginBottom: 6,
  },
  buyerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  buyerMetaText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textMuted,
  },
  dateCloseBox: {
    width: 85,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  postedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  postedDateText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    textAlign: 'right',
  },
  closesBox: {
    backgroundColor: '#FAF4EE',
    borderRadius: 8,
    padding: 6,
    alignItems: 'center',
    width: '100%',
  },
  closesLabel: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  closesDays: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 14,
    color: colors.studioTerracotta,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  cardTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 15,
    color: colors.studioDarkBrown,
  },
  metricGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  metricCell: {
    flex: 1,
    backgroundColor: '#FAF4EE',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
  },
  metricCellLabel: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  metricCellValue: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11,
    color: colors.studioDarkBrown,
    marginTop: 2,
    textAlign: 'center',
  },
  metricCellSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
  },
  specsSection: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  specsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  specsTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
    color: colors.studioDarkBrown,
  },
  bulletList: {
    gap: 4,
    paddingLeft: 4,
  },
  bulletItem: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textBody,
    lineHeight: 18,
  },
  twoCardsRow: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 16,
  },
  buyerNameText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.studioDarkBrown,
    marginBottom: 4,
  },
  buyerDescText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textBody,
    lineHeight: 16,
    marginBottom: 8,
  },
  metaRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  metaRowLabel: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  verifiedBuyerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EAF4EE',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginVertical: 4,
  },
  verifiedBuyerText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: '#2E6B4E',
  },
  viewBuyerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    paddingVertical: 4,
  },
  viewBuyerText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11.5,
    color: colors.studioTerracotta,
  },
  kvRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0E8DC',
  },
  kText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
  },
  vText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11.5,
    color: colors.studioDarkBrown,
  },
  noteBox: {
    backgroundColor: '#FAF4EE',
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
  },
  noteTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11,
    color: colors.studioDarkBrown,
    marginBottom: 2,
  },
  noteBody: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    lineHeight: 15,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  askBtn: {
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
  askBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.studioDarkBrown,
  },
  sendQuoteBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.studioTerracotta,
    borderRadius: 24,
    paddingVertical: 13,
  },
  sendQuoteBtnText: {
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