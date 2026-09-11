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
  Bell,
  Check,
  Pencil,
  FileText,
  Package,
  IndianRupee,
  Compass,
  Palette,
  MapPin,
  Truck,
  Plus,
  ArrowLeft,
  Send,
  Home,
  Inbox,
  User,
  Image as ImageIcon,
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

export default function RequirementReviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const product = params.product || 'Handcrafted Terracotta Mugs';
  const quantity = params.quantity || '500 pieces';
  const targetPrice = params.targetPrice || '₹180 – ₹250 per piece';
  const location = params.location || 'Delhi, India';
  const requiredBy = params.requiredBy || 'Within 30 days';
  const purpose = params.purpose || 'For home decor retail store';
  const designPreference =
    params.designPreference || 'Traditional Indian designs, matte finish';
  const desc =
    params.prompt ||
    'I need 500 handmade terracotta mugs for my home decor store in Delhi. Looking for traditional designs with matte finish. Required within 30 days.';

  const handlePublish = () => {
    router.push({
      pathname: '/buyer/smart-match',
      params: {
        product: product,
        quantity: quantity,
        location: location,
        requiredBy: requiredBy,
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
            <Text style={styles.heroTitle}>Review Your Requirement</Text>
            <Text style={styles.heroSubtitle}>
              Please review the details below before publishing.
            </Text>
          </View>
          <View style={styles.mottoStamp}>
            <Text style={styles.mottoLine}>Right</Text>
            <Text style={styles.mottoLine}>Requirements</Text>
            <Text style={styles.mottoLine}>Create</Text>
            <Text style={styles.mottoLine}>Real Opportunities</Text>
            <BotanicalLeaf />
          </View>
        </View>

        {/* Stepper Progress Bar */}
        <View style={styles.stepperContainer}>
          {/* Step 1 */}
          <View style={styles.stepItem}>
            <View style={styles.stepCheckCircle}>
              <Check size={12} color={colors.white} strokeWidth={3} />
            </View>
            <Text style={styles.stepItemText}>Describe</Text>
          </View>

          {/* Line 1 */}
          <View style={styles.stepLineActive} />

          {/* Step 2 */}
          <View style={styles.stepItem}>
            <View style={styles.stepCheckCircle}>
              <Check size={12} color={colors.white} strokeWidth={3} />
            </View>
            <Text style={styles.stepItemTextActive}>Review</Text>
          </View>

          {/* Line 2 */}
          <View style={styles.stepLineInactive} />

          {/* Step 3 */}
          <View style={styles.stepItem}>
            <View style={styles.stepNumCircle}>
              <Text style={styles.stepNumText}>3</Text>
            </View>
            <Text style={styles.stepItemText}>Publish</Text>
          </View>
        </View>

        {/* Requirement Summary Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <FileText size={16} color={colors.studioTerracotta} />
              <Text style={styles.cardTitle}>Requirement Summary</Text>
            </View>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => router.back()}
            >
              <Pencil size={12} color={colors.studioTerracotta} />
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.summaryBody}>
            <Image source={PRODUCT_IMAGE} style={styles.summaryImg} />
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryTitle}>{product}</Text>
              <Text style={styles.summaryDesc} numberOfLines={3}>
                {desc}
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
          </View>
        </View>

        {/* Requirement Details Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <FileText size={16} color={colors.studioTerracotta} />
              <Text style={styles.cardTitle}>Requirement Details</Text>
            </View>
          </View>

          <View style={styles.gridContainer}>
            {/* Left Column */}
            <View style={styles.gridCol}>
              {/* Quantity */}
              <View style={styles.gridCell}>
                <View style={styles.cellIconCircle}>
                  <Package size={13} color={colors.studioTerracotta} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cellLabel}>Quantity</Text>
                  <Text style={styles.cellValue}>{quantity}</Text>
                </View>
              </View>

              {/* Target Price */}
              <View style={styles.gridCell}>
                <View style={styles.cellIconCircle}>
                  <IndianRupee size={13} color={colors.studioTerracotta} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cellLabel}>Target Price</Text>
                  <Text style={styles.cellValue}>{targetPrice}</Text>
                </View>
              </View>

              {/* Purpose */}
              <View style={styles.gridCell}>
                <View style={styles.cellIconCircle}>
                  <Compass size={13} color={colors.studioTerracotta} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cellLabel}>Purpose</Text>
                  <Text style={styles.cellValue}>{purpose}</Text>
                </View>
              </View>

              {/* Design Preference */}
              <View style={styles.gridCell}>
                <View style={styles.cellIconCircle}>
                  <Palette size={13} color={colors.studioTerracotta} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cellLabel}>Design Preference</Text>
                  <Text style={styles.cellValue}>{designPreference}</Text>
                </View>
              </View>
            </View>

            {/* Vertical divider */}
            <View style={styles.verticalSep} />

            {/* Right Column */}
            <View style={styles.gridCol}>
              {/* Delivery Location */}
              <View style={styles.gridCell}>
                <View style={styles.cellIconCircle}>
                  <MapPin size={13} color={colors.studioTerracotta} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cellLabel}>Delivery Location</Text>
                  <Text style={styles.cellValue}>{location}</Text>
                </View>
              </View>

              {/* Delivery Timeline */}
              <View style={styles.gridCell}>
                <View style={styles.cellIconCircle}>
                  <Truck size={13} color={colors.studioTerracotta} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cellLabel}>Delivery Timeline</Text>
                  <Text style={styles.cellValue}>{requiredBy}</Text>
                </View>
              </View>

              {/* Additional Notes */}
              <View style={styles.gridCell}>
                <View style={styles.cellIconCircle}>
                  <FileText size={13} color={colors.studioTerracotta} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cellLabel}>Additional Notes</Text>
                  <Text style={styles.cellValue}>
                    Interested in long-term partnership with reliable artisans.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Attachments Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <ImageIcon size={16} color={colors.studioTerracotta} />
              <Text style={styles.cardTitle}>Attachments (Optional)</Text>
            </View>
            <TouchableOpacity style={styles.editBtn}>
              <Pencil size={12} color={colors.studioTerracotta} />
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.attachmentsRow}>
              {/* Add Images slot */}
              <TouchableOpacity style={styles.addSlot} activeOpacity={0.7}>
                <Plus size={18} color={colors.studioTerracotta} />
                <Text style={styles.addSlotText}>Add Images</Text>
              </TouchableOpacity>

              {/* Previews */}
              <View style={styles.thumbWrapper}>
                <Image source={PRODUCT_IMAGE} style={styles.thumbImg} />
                <Text style={styles.thumbLabel}>reference1.jpg</Text>
              </View>

              <View style={styles.thumbWrapper}>
                <Image source={PRODUCT_IMAGE} style={styles.thumbImg} />
                <Text style={styles.thumbLabel}>reference2.jpg</Text>
              </View>

              <View style={styles.thumbWrapper}>
                <Image source={PRODUCT_IMAGE} style={styles.thumbImg} />
                <Text style={styles.thumbLabel}>design_inspiration.jpg</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={16} color={colors.studioDarkBrown} />
            <Text style={styles.backBtnText}>Back to Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.publishBtn}
            onPress={handlePublish}
            activeOpacity={0.85}
          >
            <Send size={16} color={colors.white} />
            <Text style={styles.publishBtnText}>Publish Requirement</Text>
          </TouchableOpacity>
        </View>

        <IndianCraftBorder />
        <View style={{ height: 100 }} />
      </ScrollView>

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
          onPress={() => router.push('/(tabs)/requests')}
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
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 16,
  },
  stepItem: {
    alignItems: 'center',
    gap: 4,
  },
  stepCheckCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#2E6B4E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FAF4EE',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11,
    color: colors.textMuted,
  },
  stepItemText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  stepItemTextActive: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11,
    color: '#2E6B4E',
  },
  stepLineActive: {
    width: 60,
    height: 2,
    backgroundColor: '#2E6B4E',
    marginHorizontal: 8,
    marginBottom: 16,
  },
  stepLineInactive: {
    width: 60,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: 8,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 15,
    color: colors.studioDarkBrown,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  editText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11.5,
    color: colors.studioTerracotta,
  },
  summaryBody: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryImg: {
    width: 84,
    height: 84,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  summaryInfo: {
    flex: 1,
  },
  summaryTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 14,
    color: colors.studioDarkBrown,
    marginBottom: 3,
  },
  summaryDesc: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    lineHeight: 15,
    marginBottom: 6,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  tagPill: {
    backgroundColor: '#FAF0EB',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagPillText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11.5,
    color: colors.studioTerracotta,
  },
  gridContainer: {
    flexDirection: 'row',
  },
  gridCol: {
    flex: 1,
    gap: 10,
  },
  verticalSep: {
    width: 1,
    backgroundColor: '#F0E8DC',
    marginHorizontal: 10,
  },
  gridCell: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  cellIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FAF4EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  cellLabel: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
  },
  cellValue: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11,
    color: colors.studioDarkBrown,
    lineHeight: 14,
    marginTop: 1,
  },
  attachmentsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 4,
  },
  addSlot: {
    width: 75,
    height: 70,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF4EE',
    gap: 4,
  },
  addSlotText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  thumbWrapper: {
    width: 75,
    height: 70,
    alignItems: 'center',
  },
  thumbImg: {
    width: 75,
    height: 52,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  thumbLabel: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  backBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 24,
    paddingVertical: 13,
  },
  backBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.studioDarkBrown,
  },
  publishBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.studioTerracotta,
    borderRadius: 24,
    paddingVertical: 13,
  },
  publishBtnText: {
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