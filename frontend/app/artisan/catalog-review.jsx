import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Animated,
  Modal,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  HelpCircle,
  Sparkles,
  Layout,
  FileText,
  Shield,
  Palette,
  MapPin,
  Pencil,
  CheckCircle2,
  RotateCw,
  ArrowRight,
  X,
  Check,
  AlertCircle,
  Plus,
} from 'lucide-react-native';

import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import IndianMotifDivider from '../../components/shilpsetu/IndianMotifDivider';
import IndianCraftBorder from '../../components/shilpsetu/IndianCraftBorder';

const PRODUCT_IMAGE = require('../../assets/images/terracotta_vase_product.jpg');
const MASCOT_IMAGE = require('../../assets/images/shilpsetu_mascot.jpg');

const CATALOG_PRESETS = [
  {
    title: 'Handcrafted Terracotta Pot',
    category: 'Home Decor',
    craft: 'Terracotta Pottery',
    origin: 'Kutch, Gujarat',
    description:
      'I make traditional terracotta pots by hand using locally sourced clay. Each pot is shaped and decorated with beautiful patterns inspired by the folk art of my village. These pots are durable, eco-friendly, and perfect for both home decor and everyday use.',
    highlights: [
      '100% Handmade',
      'Eco Friendly',
      'Traditional Craft',
      'Sustainable',
      'Unique Design',
      'Locally Sourced',
    ],
  },
  {
    title: 'Earthy Clay Artisan Vessel',
    category: 'Kitchen & Dining',
    craft: 'Traditional Clay Craft',
    origin: 'Gorakhpur, Uttar Pradesh',
    description:
      'Hand-thrown on a manual potterΓÇÖs wheel and baked in wood-fired open kilns. Features intricate natural white clay burnishing with geometric tribal symbols passed down through generations.',
    highlights: [
      'Natural Cooling',
      'Zero Lead / Non-Toxic',
      'Artisan Heritage',
      'Organic Earth Clay',
      'Hand Burnished',
      'Fair Trade',
    ],
  },
  {
    title: 'Decorative Heritage Terracotta Urn',
    category: 'Art & Collectibles',
    craft: 'Kutch Folk Pottery',
    origin: 'Bhuj, Gujarat',
    description:
      'A mastercrafted decorative urn reflecting western Indian rural heritage. Shaped using alluvial riverbed clay, naturally sun-dried, and finished with delicate hand-carved floral swags.',
    highlights: [
      'Master Artisan Made',
      'Heritage Folk Art',
      'Eco Conscious',
      'Pristine Finish',
      'Authentic GI Origin',
      'Hand Painted',
    ],
  },
];

export default function AICatalogReviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Screen states
  const [screenState, setScreenState] = useState('NORMAL');
  const [presetIndex, setPresetIndex] = useState(0);
  const [catalog, setCatalog] = useState({
    ...CATALOG_PRESETS[0],
    description:
      (params.transcript) ||
      CATALOG_PRESETS[0].description,
  });

  // Edit Modal State
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  const [editForm, setEditForm] = useState(catalog);
  const [newHighlightInput, setNewHighlightInput] = useState('');

  // Regeneration Animation state
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [regenPercentage, setRegenPercentage] = useState(15);

  useEffect(() => {
    let progressTimer= null;
    let pulseLoop= null;

    if (screenState === 'REGENERATING') {
      setRegenPercentage(15);
      progressAnim.setValue(0.15);

      pulseAnim.setValue(1);
      pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
      pulseLoop.start();

      // Simulated percentage increments
      const step1 = setTimeout(() => {
        setRegenPercentage(40);
        progressAnim.setValue(0.4);
      }, 500);

      const step2 = setTimeout(() => {
        setRegenPercentage(75);
        progressAnim.setValue(0.75);
      }, 1100);

      const finishTimer = setTimeout(() => {
        setRegenPercentage(100);
        progressAnim.setValue(1);
        pulseLoop.stop();

        // Switch to next preset
        const nextIdx = (presetIndex + 1) % CATALOG_PRESETS.length;
        setPresetIndex(nextIdx);
        setCatalog(CATALOG_PRESETS[nextIdx]);
        setEditForm(CATALOG_PRESETS[nextIdx]);
        setScreenState('NORMAL');
      }, 1700);

      return () => {
        clearTimeout(step1);
        clearTimeout(step2);
        clearTimeout(finishTimer);
        if (progressTimer) clearInterval(progressTimer);
        if (pulseLoop) pulseLoop.stop();
      };
    }
  }, [screenState, presetIndex]);

  const handleRegenerate = () => {
    setScreenState('REGENERATING');
  };

  const handleOpenEdit = () => {
    setEditForm({ ...catalog });
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    setCatalog({ ...editForm });
    setIsEditModalVisible(false);
  };

  const handleRemoveHighlight = (index) => {
    setEditForm((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  const handleAddHighlight = () => {
    if (newHighlightInput.trim()) {
      setEditForm((prev) => ({
        ...prev,
        highlights: [...prev.highlights, newHighlightInput.trim()],
      }));
      setNewHighlightInput('');
    }
  };

  const handleAcceptAndContinue = () => {
    // Navigate forward to Screen 20: Capability Profile
    router.push({
      pathname: '/artisan/capability-profile',
      params: {
        title: catalog.title,
        category: catalog.category,
        craft: catalog.craft,
        origin: catalog.origin,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.studioCream} />

      {/* ── TOP HEADER ── */}
      <View style={styles.header}>
        {/* Back Button returning to Screen 18 */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.circleBtn}
          activeOpacity={0.7}
          accessibilityLabel="Back to Screen 18 Voice Input"
        >
          <ChevronLeft size={22} color={colors.studioDarkBrown} />
        </TouchableOpacity>

        {/* Center Official ShilpSetu Logo */}
        <Logo size="sm" showSubtitle={true} />

        {/* Help Button */}
        <TouchableOpacity
          onPress={() => setIsHelpModalVisible(true)}
          style={styles.circleBtn}
          activeOpacity={0.7}
          accessibilityLabel="Catalog review assistance"
        >
          <HelpCircle size={21} color={colors.studioDarkBrown} />
        </TouchableOpacity>
      </View>

      {/* ── MAIN SCROLLABLE CONTENT ── */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* SCREEN TITLE & SUBTITLE */}
        <View style={styles.titleSection}>
          <Text style={styles.screenTitle}>AI Catalog Review</Text>
          <IndianMotifDivider width={220} color={colors.studioTerracotta} />
          <Text style={styles.screenSubtitle}>
            We've created a catalog for your product using your image and voice input. Please review and confirm or edit the details.
          </Text>
        </View>

        {/* STATE: REGENERATING WITH ANIMATED MASCOT */}
        {screenState === 'REGENERATING' ? (
          <View style={styles.regeneratingCard}>
            <Animated.View
              style={[
                styles.mascotPulseWrap,
                { transform: [{ scale: pulseAnim }] },
              ]}
            >
              <Image source={MASCOT_IMAGE} style={styles.mascotRegenImg} resizeMode="contain" />
            </Animated.View>

            <Text style={styles.regenTitle}>AI is improving your product catalog...</Text>
            <Text style={styles.regenPercentage}>{regenPercentage}%</Text>

            <View style={styles.regenTrack}>
              <View style={[styles.regenFill, { width: `${regenPercentage}%` }]} />
            </View>
          </View>
        ) : screenState === 'ERROR' ? (
          <View style={styles.errorCard}>
            <AlertCircle size={42} color={colors.error} style={{ marginBottom: 8 }} />
            <Text style={styles.errorTitle}>We couldn't generate the catalog right now.</Text>
            <TouchableOpacity
              style={styles.retryBtn}
              onPress={handleRegenerate}
              activeOpacity={0.8}
            >
              <Text style={styles.retryBtnText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* ── CARD 1: PRODUCT PREVIEW ── */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Layout size={17} color={colors.studioTerracotta} style={{ marginRight: 6 }} />
                <Text style={styles.cardHeaderTitle}>Product Preview</Text>
              </View>

              <View style={styles.productPreviewRow}>
                {/* Left: Product Photo from Screen 17 */}
                <View style={styles.productImageContainer}>
                  <Image source={PRODUCT_IMAGE} style={styles.productImage} resizeMode="cover" />
                </View>

                {/* Right: Metadata */}
                <View style={styles.productMetaCol}>
                  <Text style={styles.productTitleText} numberOfLines={2}>
                    {catalog.title}
                  </Text>

                  {/* AI Generated Badge */}
                  <View style={styles.aiBadge}>
                    <Sparkles size={10} color={colors.studioGreen} style={{ marginRight: 3 }} />
                    <Text style={styles.aiBadgeText}>AI Generated</Text>
                  </View>

                  {/* Category */}
                  <View style={styles.metaRow}>
                    <Shield size={14} color={colors.studioTerracotta} style={styles.metaIcon} />
                    <View>
                      <Text style={styles.metaLabel}>Category</Text>
                      <Text style={styles.metaValue}>{catalog.category}</Text>
                    </View>
                  </View>

                  {/* Craft */}
                  <View style={styles.metaRow}>
                    <CraftIcon size={14} color={colors.studioTerracotta} style={styles.metaIcon} />
                    <View>
                      <Text style={styles.metaLabel}>Craft</Text>
                      <Text style={styles.metaValue}>{catalog.craft}</Text>
                    </View>
                  </View>

                  {/* Origin */}
                  <View style={styles.metaRow}>
                    <MapPin size={14} color={colors.studioTerracotta} style={styles.metaIcon} />
                    <View>
                      <Text style={styles.metaLabel}>Origin</Text>
                      <Text style={styles.metaValue}>{catalog.origin}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* ── CARD 2: DESCRIPTION ── */}
            <View style={styles.card}>
              <View style={styles.cardHeaderBetween}>
                <View style={styles.headerLeftWithIcon}>
                  <FileText size={17} color={colors.studioTerracotta} style={{ marginRight: 6 }} />
                  <Text style={styles.cardHeaderTitle}>Description</Text>
                </View>
                <View style={styles.aiBadge}>
                  <Sparkles size={10} color={colors.studioGreen} style={{ marginRight: 3 }} />
                  <Text style={styles.aiBadgeText}>AI Generated</Text>
                </View>
              </View>

              <Text style={styles.descriptionBody}>{catalog.description}</Text>
            </View>

            {/* ── CARD 3: KEY HIGHLIGHTS ── */}
            <View style={styles.card}>
              <View style={styles.cardHeaderBetween}>
                <View style={styles.headerLeftWithIcon}>
                  <Sparkles size={17} color={colors.studioTerracotta} style={{ marginRight: 6 }} />
                  <Text style={styles.cardHeaderTitle}>Key Highlights</Text>
                </View>
                <View style={styles.aiBadge}>
                  <Sparkles size={10} color={colors.studioGreen} style={{ marginRight: 3 }} />
                  <Text style={styles.aiBadgeText}>AI Generated</Text>
                </View>
              </View>

              <View style={styles.highlightsWrap}>
                {catalog.highlights.map((item, idx) => (
                  <View key={idx} style={styles.highlightChip}>
                    <CheckCircle2 size={14} color={colors.studioGreen} style={{ marginRight: 5 }} />
                    <Text style={styles.highlightText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* ── EDIT DETAILS TRIGGER ROW ── */}
            <View style={styles.editTriggerRow}>
              <Text style={styles.editTriggerPrompt}>Something not right?</Text>
              <TouchableOpacity
                style={styles.editTriggerBtn}
                onPress={handleOpenEdit}
                activeOpacity={0.7}
              >
                <Text style={styles.editTriggerBtnText}>Edit Details</Text>
                <Pencil size={14} color={colors.studioTerracotta} style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>

            {/* ── ACTION BUTTONS ── */}
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={handleAcceptAndContinue}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryBtnText}>Looks Good, Continue</Text>
              <ArrowRight size={18} color={colors.white} style={{ marginLeft: 8 }} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={handleRegenerate}
              activeOpacity={0.8}
            >
              <RotateCw size={16} color={colors.studioTerracotta} style={{ marginRight: 6 }} />
              <Text style={styles.secondaryBtnText}>Regenerate Catalog</Text>
            </TouchableOpacity>
          </>
        )}

        {/* TRADITIONAL INDIAN BOTTOM CRAFT BORDER */}
        <IndianCraftBorder color={colors.studioTerracotta} height={46} />
      </ScrollView>

      {/* ── EDIT DETAILS MODAL ── */}
      <Modal
        visible={isEditModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Product Details</Text>
              <TouchableOpacity
                onPress={() => setIsEditModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <X size={18} color={colors.studioDarkBrown} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 420 }}>
              {/* Title Input */}
              <Text style={styles.inputLabel}>Product Title</Text>
              <TextInput
                style={styles.textInput}
                value={editForm.title}
                onChangeText={(val) => setEditForm((p) => ({ ...p, title: val }))}
                placeholder="Product Title"
              />

              {/* Category Input */}
              <Text style={styles.inputLabel}>Category</Text>
              <TextInput
                style={styles.textInput}
                value={editForm.category}
                onChangeText={(val) => setEditForm((p) => ({ ...p, category: val }))}
                placeholder="Category"
              />

              {/* Craft Input */}
              <Text style={styles.inputLabel}>Craft Type</Text>
              <TextInput
                style={styles.textInput}
                value={editForm.craft}
                onChangeText={(val) => setEditForm((p) => ({ ...p, craft: val }))}
                placeholder="Craft Type"
              />

              {/* Origin Input */}
              <Text style={styles.inputLabel}>Origin / Location</Text>
              <TextInput
                style={styles.textInput}
                value={editForm.origin}
                onChangeText={(val) => setEditForm((p) => ({ ...p, origin: val }))}
                placeholder="Origin"
              />

              {/* Description Input */}
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.textInput, styles.multilineInput]}
                multiline
                numberOfLines={4}
                value={editForm.description}
                onChangeText={(val) => setEditForm((p) => ({ ...p, description: val }))}
                placeholder="Description"
              />

              {/* Highlights */}
              <Text style={styles.inputLabel}>Highlights</Text>
              <View style={styles.editChipsWrap}>
                {editForm.highlights.map((h, i) => (
                  <View key={i} style={styles.editChip}>
                    <Text style={styles.editChipText}>{h}</Text>
                    <TouchableOpacity onPress={() => handleRemoveHighlight(i)}>
                      <X size={13} color={colors.studioDarkBrown} style={{ marginLeft: 4 }} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              {/* Add Highlight */}
              <View style={styles.addHighlightRow}>
                <TextInput
                  style={[styles.textInput, { flex: 1, marginBottom: 0 }]}
                  value={newHighlightInput}
                  onChangeText={setNewHighlightInput}
                  placeholder="Add a new highlight..."
                />
                <TouchableOpacity
                  style={styles.addHighlightBtn}
                  onPress={handleAddHighlight}
                >
                  <Plus size={16} color={colors.white} />
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* Modal Actions */}
            <View style={styles.modalActionRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSaveBtn} onPress={handleSaveEdit}>
                <Check size={16} color={colors.white} style={{ marginRight: 6 }} />
                <Text style={styles.modalSaveText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ── HELP GUIDANCE MODAL ── */}
      <Modal
        visible={isHelpModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsHelpModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>About Catalog Review</Text>
              <TouchableOpacity
                onPress={() => setIsHelpModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <X size={18} color={colors.studioDarkBrown} />
              </TouchableOpacity>
            </View>

            <Text style={styles.helpText}>
              • AI extracts product attributes like craft heritage, raw materials, and utility from your photos and voice recordings.
            </Text>
            <Text style={styles.helpText}>
              • You always retain 100% control. Use "Edit Details" anytime to tailor titles, descriptions, and origin badges.
            </Text>
            <Text style={styles.helpText}>
              • Once satisfied, tap "Looks Good, Continue" to proceed to capability profiling!
            </Text>

            <TouchableOpacity
              style={styles.gotItBtn}
              onPress={() => setIsHelpModalVisible(false)}
            >
              <Text style={styles.gotItBtnText}>Understood</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.studioCream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
  },
  circleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 24,
  },
  titleSection: {
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 12,
  },
  screenTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 26,
    color: colors.studioDarkBrown,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  screenSubtitle: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 14,
    lineHeight: 18.5,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
    shadowColor: colors.studioDarkBrown,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardHeaderBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerLeftWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.studioDarkBrown,
  },
  productPreviewRow: {
    flexDirection: 'row',
    gap: 12,
  },
  productImageContainer: {
    width: 124,
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#EBE2D5',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productMetaCol: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productTitleText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.studioDarkBrown,
    lineHeight: 20,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.studioGreenBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.studioGreen,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginVertical: 4,
  },
  aiBadgeText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12.5,
    color: colors.studioGreen,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 3,
  },
  metaIcon: {
    marginRight: 6,
    marginTop: 2,
  },
  metaLabel: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textMuted,
    lineHeight: 13,
  },
  metaValue: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.studioDarkBrown,
  },
  descriptionBody: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13,
    color: colors.studioDarkBrown,
    lineHeight: 20,
  },
  highlightsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  highlightChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCFAF7',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  highlightText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11.5,
    color: colors.studioDarkBrown,
  },
  editTriggerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 2,
    marginBottom: 14,
  },
  editTriggerPrompt: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textBody,
  },
  editTriggerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editTriggerBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
    color: colors.studioTerracotta,
  },
  primaryBtn: {
    backgroundColor: colors.studioTerracotta,
    borderRadius: 26,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.studioTerracotta,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 10,
  },
  primaryBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.white,
  },
  secondaryBtn: {
    backgroundColor: colors.white,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: colors.studioTerracotta,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  secondaryBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14.5,
    color: colors.studioTerracotta,
  },
  regeneratingCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  mascotPulseWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#FFFDF9',
    marginBottom: 14,
  },
  mascotRegenImg: {
    width: '100%',
    height: '100%',
  },
  regenTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.studioDarkBrown,
    textAlign: 'center',
    marginBottom: 6,
  },
  regenPercentage: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
    color: colors.studioTerracotta,
    marginBottom: 10,
  },
  regenTrack: {
    width: '75%',
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  regenFill: {
    height: '100%',
    backgroundColor: colors.studioTerracotta,
  },
  errorCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    alignItems: 'center',
    marginVertical: 20,
  },
  errorTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.error,
    textAlign: 'center',
    marginBottom: 14,
  },
  retryBtn: {
    backgroundColor: colors.studioTerracotta,
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 22,
  },
  retryBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
    color: colors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 20, 16, 0.55)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10,
  },
  modalTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 18,
    color: colors.studioDarkBrown,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FAF4EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLabel: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12.5,
    color: colors.studioDarkBrown,
    marginTop: 8,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: '#FAF6F0',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13,
    color: colors.studioDarkBrown,
    marginBottom: 6,
  },
  multilineInput: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  editChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  editChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF4EE',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  editChipText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11.5,
    color: colors.studioDarkBrown,
  },
  addHighlightRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addHighlightBtn: {
    backgroundColor: colors.studioTerracotta,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  modalCancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 13.5,
    color: colors.textBody,
  },
  modalSaveBtn: {
    flex: 1.5,
    backgroundColor: colors.studioTerracotta,
    borderRadius: 22,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSaveText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.white,
  },
  helpText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    lineHeight: 20,
    marginBottom: 10,
  },
  gotItBtn: {
    backgroundColor: colors.studioTerracotta,
    borderRadius: 22,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  gotItBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.white,
  },
});