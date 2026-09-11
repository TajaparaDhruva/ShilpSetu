import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  Bell,
  Building2,
  Calendar,
  FileText,
  CheckSquare,
  Square,
  Upload,
  X,
  Send,
  Home,
  Compass,
  Plus,
  Inbox,
  User,
  CheckCircle2,
  ArrowRight,
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

export default function SendQuotationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const rfqTitle = params.title || 'Handcrafted Terracotta Mugs';
  const rfqBuyer = params.buyer || 'Earth & Home Retail Pvt. Ltd.';
  const defaultQty = parseInt(params.quantity || '500', 10) || 500;

  // Form State
  const [unitPrice, setUnitPrice] = useState('200');
  const [moq, setMoq] = useState(String(defaultQty));
  const [deliveryDays, setDeliveryDays] = useState('25');
  const [details, setDetails] = useState(
    'We will provide high-quality handcrafted terracotta mugs with traditional Indian designs and matte finish. Custom branding is possible your requirement.'
  );

  // Checkboxes
  const [canSample, setCanSample] = useState(true);
  const [openPartnership, setOpenPartnership] = useState(true);
  const [canCustomize, setCanCustomize] = useState(true);

  // Attachments
  const [attachments, setAttachments] = useState([
    { id: '1', name: 'mug_sample.jpg', img: PRODUCT_IMAGE },
    { id: '2', name: 'design_variation.jpg', img: PRODUCT_IMAGE },
    { id: '3', name: 'packaging.jpg', img: PRODUCT_IMAGE },
  ]);

  // Success Modal
  const [showSuccess, setShowSuccess] = useState(false);

  // Deterministic calculations
  const priceNum = parseFloat(unitPrice) || 0;
  const moqNum = parseInt(moq, 10) || 0;
  const totalAmount = priceNum * moqNum;
  const formattedTotal = '₹' + totalAmount.toLocaleString('en-IN');

  const handleSendQuotation = () => {
    if (!unitPrice || priceNum <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid offered price.');
      return;
    }
    if (!deliveryDays) {
      Alert.alert('Validation Error', 'Please enter estimated delivery time.');
      return;
    }
    setShowSuccess(true);
  };

  const removeAttachment = (id) => {
    setAttachments((prev) => prev.filter((item) => item.id !== id));
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
            <Text style={styles.heroTitle}>Send Quotation</Text>
            <Text style={styles.heroSubtitle}>
              Share your best price and terms with the buyer.
            </Text>
          </View>
          <View style={styles.mottoStamp}>
            <Text style={styles.mottoLine}>Fair</Text>
            <Text style={styles.mottoLine}>Quotes</Text>
            <Text style={styles.mottoLine}>Stronger</Text>
            <Text style={styles.mottoLine}>Communities</Text>
            <BotanicalLeaf />
          </View>
        </View>

        {/* Target RFQ Summary Card */}
        <View style={styles.rfqCard}>
          <Image source={PRODUCT_IMAGE} style={styles.rfqImage} />
          <View style={styles.rfqDetails}>
            <View style={styles.openBadge}>
              <Text style={styles.openBadgeText}>Open</Text>
            </View>
            <Text style={styles.rfqCardTitle}>{rfqTitle}</Text>
            <Text style={styles.rfqMetaText}>
              {moq} pieces • Delhi, India
            </Text>
            <View style={styles.iconRow}>
              <Building2 size={11} color={colors.textMuted} />
              <Text style={styles.iconRowText}>Posted by {rfqBuyer}</Text>
            </View>
            <View style={styles.iconRow}>
              <Calendar size={11} color={colors.textMuted} />
              <Text style={styles.iconRowText}>
                Closes in 10 days (12 Sep 2025)
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.viewDetailsBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.viewDetailsText}>View Details</Text>
            <ArrowRight size={10} color={colors.studioTerracotta} />
          </TouchableOpacity>
        </View>

        {/* Your Quotation Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <FileText size={16} color={colors.studioTerracotta} />
            <Text style={styles.cardTitle}>Your Quotation</Text>
          </View>

          {/* Row 1: Offered Price & Total Amount */}
          <View style={styles.inputRow}>
            <View style={styles.inputCol}>
              <Text style={styles.fieldLabel}>
                Offered Price (per piece) <Text style={{ color: colors.error }}>*</Text>
              </Text>
              <View style={styles.rupeeInputBox}>
                <Text style={styles.rupeePrefix}>₹</Text>
                <TextInput
                  style={styles.priceTextInput}
                  value={unitPrice}
                  onChangeText={setUnitPrice}
                  keyboardType="numeric"
                  placeholder="200"
                />
              </View>
              <Text style={styles.targetHintText}>
                Buyer's target: ₹180 – ₹250
              </Text>
            </View>

            <View style={styles.inputCol}>
              <Text style={styles.fieldLabel}>Total Amount</Text>
              <View style={styles.totalAmountBox}>
                <Text style={styles.totalAmountText}>{formattedTotal}</Text>
              </View>
              <Text style={styles.calcSubText}>
                ({moq} pieces × ₹{unitPrice || '0'})
              </Text>
            </View>
          </View>

          {/* Row 2: MOQ & Delivery Time */}
          <View style={styles.inputRow}>
            <View style={styles.inputCol}>
              <Text style={styles.fieldLabel}>Minimum Order Quantity</Text>
              <View style={styles.unitInputBox}>
                <TextInput
                  style={styles.unitTextInput}
                  value={moq}
                  onChangeText={setMoq}
                  keyboardType="numeric"
                />
                <Text style={styles.unitText}>pieces</Text>
              </View>
            </View>

            <View style={styles.inputCol}>
              <Text style={styles.fieldLabel}>
                Estimated Delivery Time <Text style={{ color: colors.error }}>*</Text>
              </Text>
              <View style={styles.unitInputBox}>
                <TextInput
                  style={styles.unitTextInput}
                  value={deliveryDays}
                  onChangeText={setDeliveryDays}
                  keyboardType="numeric"
                />
                <Text style={styles.unitText}>days</Text>
              </View>
            </View>
          </View>

          {/* Customization details */}
          <Text style={styles.fieldLabel}>Product Details / Customization</Text>
          <TextInput
            style={styles.detailsTextArea}
            value={details}
            onChangeText={setDetails}
            multiline
            numberOfLines={3}
            maxLength={500}
            textAlignVertical="top"
          />
          <Text style={styles.charCountText}>{details.length}/500</Text>
        </View>

        {/* Additional Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitleSmall}>Additional Information</Text>

          <TouchableOpacity
            style={styles.checkRow}
            onPress={() => setCanSample((c) => !c)}
            activeOpacity={0.7}
          >
            {canSample ? (
              <CheckSquare size={16} color={colors.studioTerracotta} />
            ) : (
              <Square size={16} color={colors.border} />
            )}
            <Text style={styles.checkLabel}>
              I can provide sample before bulk order
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkRow}
            onPress={() => setOpenPartnership((o) => !o)}
            activeOpacity={0.7}
          >
            {openPartnership ? (
              <CheckSquare size={16} color={colors.studioTerracotta} />
            ) : (
              <Square size={16} color={colors.border} />
            )}
            <Text style={styles.checkLabel}>
              I am open to long-term partnership
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkRow}
            onPress={() => setCanCustomize((z) => !z)}
            activeOpacity={0.7}
          >
            {canCustomize ? (
              <CheckSquare size={16} color={colors.studioTerracotta} />
            ) : (
              <Square size={16} color={colors.border} />
            )}
            <Text style={styles.checkLabel}>
              I can customize design / branding
            </Text>
          </TouchableOpacity>
        </View>

        {/* Attachments Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitleSmall}>Attachments (Optional)</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.attachmentsRow}>
              {/* Upload button slot */}
              <TouchableOpacity style={styles.uploadSlot} activeOpacity={0.7}>
                <Plus size={18} color={colors.studioTerracotta} />
                <Text style={styles.uploadText}>
                  Upload Images{"\n"}(Brochure, Samples, etc.)
                </Text>
              </TouchableOpacity>

              {/* Uploaded previews */}
              {attachments.map((att) => (
                <View key={att.id} style={styles.attWrapper}>
                  <Image source={att.img} style={styles.attImage} />
                  <TouchableOpacity
                    style={styles.attRemoveBtn}
                    onPress={() => removeAttachment(att.id)}
                  >
                    <X size={10} color={colors.white} />
                  </TouchableOpacity>
                  <Text style={styles.attName} numberOfLines={1}>
                    {att.name}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sendBtn}
            onPress={handleSendQuotation}
            activeOpacity={0.85}
          >
            <Send size={16} color={colors.white} />
            <Text style={styles.sendBtnText}>Send Quotation</Text>
          </TouchableOpacity>
        </View>

        <IndianCraftBorder />
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIcon}>
              <CheckCircle2 size={46} color="#2E6B4E" />
            </View>
            <Text style={styles.modalTitle}>Quotation Sent!</Text>
            <Text style={styles.modalDesc}>
              Your quotation of {formattedTotal} has been submitted for{" "}
              {rfqTitle}. The buyer will review and respond.
            </Text>
            <TouchableOpacity
              style={styles.modalCTA}
              onPress={() => {
                setShowSuccess(false);
                router.push({ pathname: '/artisan/buyer-opportunities' });
              }}
            >
              <Text style={styles.modalCTAText}>Back to Opportunities</Text>
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
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Inbox size={22} color={colors.studioTerracotta} />
          <Text style={[styles.navLabel, { color: colors.studioTerracotta }]}>
            Requests
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
  rfqCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    gap: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  rfqImage: {
    width: 72,
    height: 72,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  rfqDetails: {
    flex: 1,
  },
  openBadge: {
    backgroundColor: '#EAF4EE',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 1,
    alignSelf: 'flex-start',
    marginBottom: 3,
  },
  openBadgeText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11.5,
    color: '#2E6B4E',
  },
  rfqCardTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 13,
    color: colors.studioDarkBrown,
    marginBottom: 2,
  },
  rfqMetaText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textMuted,
    marginBottom: 2,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 1,
  },
  iconRowText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderWidth: 1,
    borderColor: colors.studioTerracotta,
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  viewDetailsText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.studioTerracotta,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 14,
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
  cardTitleSmall: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 14,
    color: colors.studioDarkBrown,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  inputCol: {
    flex: 1,
  },
  fieldLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11.5,
    color: colors.studioDarkBrown,
    marginBottom: 4,
  },
  rupeeInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: colors.white,
    height: 40,
  },
  rupeePrefix: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.studioDarkBrown,
    marginRight: 4,
  },
  priceTextInput: {
    flex: 1,
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.studioDarkBrown,
    padding: 0,
  },
  targetHintText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 3,
  },
  totalAmountBox: {
    justifyContent: 'center',
    backgroundColor: '#F8ECE7',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  totalAmountText: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 15,
    color: colors.studioDarkBrown,
  },
  calcSubText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: 3,
  },
  unitInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    height: 40,
  },
  unitTextInput: {
    flex: 1,
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13.5,
    color: colors.studioDarkBrown,
    padding: 0,
  },
  unitText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginLeft: 4,
  },
  detailsTextArea: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.studioDarkBrown,
    minHeight: 70,
    backgroundColor: colors.white,
  },
  charCountText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'right',
    marginTop: 3,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 5,
  },
  checkLabel: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textBody,
  },
  attachmentsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 4,
  },
  uploadSlot: {
    width: 95,
    height: 75,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF4EE',
    padding: 4,
  },
  uploadText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
  attWrapper: {
    width: 75,
    height: 75,
    position: 'relative',
    alignItems: 'center',
  },
  attImage: {
    width: 75,
    height: 60,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  attRemoveBtn: {
    position: 'absolute',
    top: 3,
    right: 3,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  attName: {
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
  cancelBtn: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 24,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.studioDarkBrown,
  },
  sendBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.studioTerracotta,
    borderRadius: 24,
    paddingVertical: 13,
  },
  sendBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.white,
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