import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Easing,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  HelpCircle,
  Pencil,
  Sparkles,
  Sun,
  Crosshair,
  Image as ImageIcon,
  Palette,
  RotateCw,
  ArrowRight,
  Info,
  RefreshCw,
  AlertCircle,
} from 'lucide-react-native';
import Svg, { Path, Circle } from 'react-native-svg';

import colors from '../../theme/colors';
import typography from '../../theme/typography';
import IndianMotifDivider from '../../components/shilpsetu/IndianMotifDivider';
import IndianCraftBorder from '../../components/shilpsetu/IndianCraftBorder';
import ImageEditorModal, { ImageEditSettings } from '../../components/shilpsetu/ImageEditorModal';
import ImageTipsBottomSheet from '../../components/shilpsetu/ImageTipsBottomSheet';
import Logo from '../../components/Logo';

// Local authentic craft images
const ORIGINAL_IMAGE = require('../../assets/images/terracotta_vase_product.jpg');

// 3 Enhanced variations for simulated AI regeneration
const ENHANCED_VARIANTS = [
  {
    id: 1,
    name: 'Studio Warm Glow',
    lighting: 'Warm Ambient Studio',
    details: 'Sharpened Handpainted Motifs',
    background: 'Neutral E-commerce Tabletop',
    colors: 'Rich Terracotta Pigment',
    tintOverlay: 'rgba(192, 74, 47, 0.05)',
    contrastBoost: 1.05,
    brightnessBoost: 1.02,
  },
  {
    id: 2,
    name: 'Heritage Daylight Crisp',
    lighting: 'Golden Hour Daylight',
    details: 'Ultra-clear Tribal Inlay',
    background: 'Subtle Artisan Atelier',
    colors: 'Earthy Clay Saturation',
    tintOverlay: 'rgba(231, 184, 74, 0.06)',
    contrastBoost: 1.1,
    brightnessBoost: 1.05,
  },
  {
    id: 3,
    name: 'Marketplace Premium',
    lighting: 'Even Softbox Lighting',
    details: 'High-definition Edge Clarity',
    background: 'Clean Parchment Texture',
    colors: 'Balanced Natural Warmth',
    tintOverlay: 'rgba(46, 107, 78, 0.04)',
    contrastBoost: 1.08,
    brightnessBoost: 1.03,
  },
];

export default function AIImageStudioScreen() {
  const router = useRouter();

  // Screen & UI states
  const [screenState, setScreenState] = useState('NORMAL');
  const [currentVariantIdx, setCurrentVariantIdx] = useState(0);
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [isTipsVisible, setIsTipsVisible] = useState(false);

  // Active original image settings from editor
  const [editSettings, setEditSettings] = useState({
    rotation: 0,
    aspectRatio: 'original',
    brightness: 0,
    contrast: 'natural',
  });

  // Feature chips toggle state (which enhancements are active)
  const [activeChips, setActiveChips] = useState({
    lighting: true,
    details: true,
    background: true,
    colors: true,
  });

  // Animation values for AI Processing state
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [processingStepText, setProcessingStepText] = useState(
    'Optimizing lighting balance...'
  );

  // Spin animation controller
  useEffect(() => {
    if (screenState === 'AI_PROCESSING') {
      // Rotation loop
      spinAnim.setValue(0);
      const spinLoop = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1800,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      spinLoop.start();

      // Pulse loop
      pulseAnim.setValue(1);
      const pulseLoop = Animated.loop(
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

      // Progress bar fill
      progressAnim.setValue(0);
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 1800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }).start();

      // Processing message steps
      const timer1 = setTimeout(() => {
        setProcessingStepText('Enhancing handcrafted details & contours...');
      }, 600);

      const timer2 = setTimeout(() => {
        setProcessingStepText('Generating marketplace-ready studio output...');
      }, 1200);

      const completeTimer = setTimeout(() => {
        spinLoop.stop();
        pulseLoop.stop();
        // Cycle to next variant
        setCurrentVariantIdx((prev) => (prev + 1) % ENHANCED_VARIANTS.length);
        setScreenState('AI_RESULT');
      }, 1900);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(completeTimer);
        spinLoop.stop();
        pulseLoop.stop();
      };
    }
  }, [screenState]);

  const spinInterpolate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // Action handlers
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(artisan-tabs)/home');
    }
  };

  const handleRegenerate = () => {
    setScreenState('AI_PROCESSING');
  };

  const handleSimulateError = () => {
    setScreenState('ERROR');
  };

  const handleAcceptAndContinue = () => {
    // Navigate to Screen 18 (Voice Input)
    router.push({
      pathname: '/artisan/voice-input',
      params: {
        enhancedVariantId: ENHANCED_VARIANTS[currentVariantIdx].id,
        variantName: ENHANCED_VARIANTS[currentVariantIdx].name,
      },
    });
  };

  const toggleChip = (chipKey) => {
    setActiveChips((prev) => ({
      ...prev,
      [chipKey]: !prev[chipKey],
    }));
  };

  const currentVariant = ENHANCED_VARIANTS[currentVariantIdx];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.studioCream} />

      {/* TOP HEADER */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={handleBack}
          style={styles.circleBtn}
          activeOpacity={0.7}
          accessibilityLabel="Go back"
        >
          <ChevronLeft size={22} color={colors.studioDarkBrown} />
        </TouchableOpacity>

        {/* Center Official ShilpSetu Logo */}
        <Logo size="sm" showSubtitle={true} />

        {/* Help Button */}
        <TouchableOpacity
          onPress={() => setIsTipsVisible(true)}
          style={styles.circleBtn}
          activeOpacity={0.7}
          accessibilityLabel="Photo tips and guidance"
        >
          <HelpCircle size={21} color={colors.studioDarkBrown} />
        </TouchableOpacity>
      </View>

      {/* MAIN SCROLLABLE CONTENT */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* SCREEN TITLE & SUBTITLE */}
        <View style={styles.titleSection}>
          <Text style={styles.screenTitle}>AI Image Studio</Text>
          <Text style={styles.screenSubtitle}>
            Enhance your product images with AI for a marketplace-ready look.
          </Text>

          {/* Decorative Indian Ornamental Flourish */}
          <IndianMotifDivider width={240} color={colors.studioTerracotta} />
        </View>

        {/* ORIGINAL IMAGE CARD */}
        <View style={styles.card}>
          {/* Card Header Row */}
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardTitleWithIcon}>
              <ImageIcon size={18} color={colors.studioTerracotta} style={{ marginRight: 6 }} />
              <Text style={styles.cardTitleOriginal}>Original Image</Text>
            </View>

            {/* Edit Action Button */}
            <TouchableOpacity
              style={styles.editPillBtn}
              onPress={() => setIsEditorVisible(true)}
              activeOpacity={0.75}
            >
              <Pencil size={13} color={colors.studioDarkBrown} style={{ marginRight: 4 }} />
              <Text style={styles.editPillText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Original Product Photo */}
          <View style={styles.imageContainer}>
            <Image
              source={ORIGINAL_IMAGE}
              style={[
                styles.productImage,
                {
                  transform: [{ rotate: `${editSettings.rotation}deg` }],
                  opacity: editSettings.brightness === -1 ? 0.82 : editSettings.brightness === 1 ? 1 : 0.94,
                },
              ]}
              resizeMode="cover"
            />
          </View>

          {/* 3 Pagination Dots */}
          <View style={styles.paginationRow}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* AI ENHANCED PREVIEW CARD */}
        <View style={[styles.card, styles.enhancedCard]}>
          {/* Enhanced Card Header */}
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardTitleWithIcon}>
              <Sparkles size={18} color={colors.studioGreen} style={{ marginRight: 6 }} />
              <Text style={styles.cardTitleEnhanced}>AI Enhanced Preview</Text>
            </View>

            {/* AI Suggested Badge */}
            <View style={styles.aiSuggestedBadge}>
              <Text style={styles.aiSuggestedBadgeText}>AI Suggested</Text>
            </View>
          </View>

          {/* Enhanced Product Image or Loading State */}
          <View style={styles.enhancedImageContainer}>
            {screenState === 'AI_PROCESSING' ? (
              <View style={styles.processingContainer}>
                <Animated.View
                  style={[
                    styles.spinnerCircle,
                    {
                      transform: [{ rotate: spinInterpolate }, { scale: pulseAnim }],
                    },
                  ]}
                >
                  <Svg width={54} height={54} viewBox="0 0 60 60">
                    <Circle cx="30" cy="30" r="26" stroke="#E7DCC4" strokeWidth="4" fill="none" />
                    <Circle
                      cx="30"
                      cy="30"
                      r="26"
                      stroke={colors.studioTerracotta}
                      strokeWidth="4"
                      strokeDasharray="60 120"
                      fill="none"
                    />
                    <Circle cx="30" cy="4" r="4" fill={colors.studioTerracotta} />
                  </Svg>
                </Animated.View>

                <Text style={styles.processingTitle}>AI Studio is Enhancing...</Text>
                <Text style={styles.processingSub}>{processingStepText}</Text>

                {/* Progress Bar */}
                <View style={styles.progressBarTrack}>
                  <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
                </View>
              </View>
            ) : screenState === 'ERROR' ? (
              <View style={styles.errorContainer}>
                <AlertCircle size={36} color={colors.error} style={{ marginBottom: 8 }} />
                <Text style={styles.errorTitle}>Enhancement Failed</Text>
                <Text style={styles.errorSub}>
                  Something went wrong while enhancing your image. Please try again.
                </Text>
                <TouchableOpacity
                  style={styles.retryBtn}
                  onPress={handleRegenerate}
                  activeOpacity={0.8}
                >
                  <RefreshCw size={15} color={colors.white} style={{ marginRight: 6 }} />
                  <Text style={styles.retryBtnText}>Try Again</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.imageWrapperRelative}>
                <Image
                  source={ORIGINAL_IMAGE}
                  style={[
                    styles.productImage,
                    {
                      transform: [{ rotate: `${editSettings.rotation}deg` }],
                    },
                  ]}
                  resizeMode="cover"
                />

                {/* Subtle Enhanced Studio Lighting / Warmth Scrim */}
                <View
                  style={[
                    StyleSheet.absoluteFill,
                    {
                      backgroundColor: currentVariant.tintOverlay,
                      borderRadius: 12,
                    },
                  ]}
                  pointerEvents="none"
                />

                {/* Variant Tag Floating on Image */}
                <View style={styles.floatingVariantBadge}>
                  <Text style={styles.floatingVariantText}>
                    Preset: {currentVariant.name}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* 4 ENHANCEMENT FEATURE CHIPS */}
          <View style={styles.chipsRow}>
            {/* 1. Better Lighting */}
            <TouchableOpacity
              style={[
                styles.featureChip,
                activeChips.lighting && styles.featureChipActive,
              ]}
              onPress={() => toggleChip('lighting')}
              activeOpacity={0.7}
            >
              <Sun
                size={18}
                color={activeChips.lighting ? colors.studioTerracotta : colors.textMuted}
              />
              <Text style={styles.chipText}>Better{'\n'}Lighting</Text>
            </TouchableOpacity>

            {/* 2. Sharper Details */}
            <TouchableOpacity
              style={[
                styles.featureChip,
                activeChips.details && styles.featureChipActive,
              ]}
              onPress={() => toggleChip('details')}
              activeOpacity={0.7}
            >
              <Crosshair
                size={18}
                color={activeChips.details ? colors.studioTerracotta : colors.textMuted}
              />
              <Text style={styles.chipText}>Sharper{'\n'}Details</Text>
            </TouchableOpacity>

            {/* 3. Clean Background */}
            <TouchableOpacity
              style={[
                styles.featureChip,
                activeChips.background && styles.featureChipActive,
              ]}
              onPress={() => toggleChip('background')}
              activeOpacity={0.7}
            >
              <ImageIcon
                size={18}
                color={activeChips.background ? colors.studioTerracotta : colors.textMuted}
              />
              <Text style={styles.chipText}>Clean{'\n'}Background</Text>
            </TouchableOpacity>

            {/* 4. Vibrant Colors */}
            <TouchableOpacity
              style={[
                styles.featureChip,
                activeChips.colors && styles.featureChipActive,
              ]}
              onPress={() => toggleChip('colors')}
              activeOpacity={0.7}
            >
              <PaletteIcon
                size={18}
                color={activeChips.colors ? colors.studioTerracotta : colors.textMuted}
              />
              <Text style={styles.chipText}>Vibrant{'\n'}Colors</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* PRIMARY ACTION BUTTONS */}
        <View style={styles.actionButtonsRow}>
          {/* Regenerate Button */}
          <TouchableOpacity
            style={styles.regenerateBtn}
            onPress={handleRegenerate}
            disabled={screenState === 'AI_PROCESSING'}
            activeOpacity={0.8}
          >
            <RotateCw size={17} color={colors.studioTerracotta} style={{ marginRight: 6 }} />
            <Text style={styles.regenerateBtnText}>Regenerate</Text>
          </TouchableOpacity>

          {/* Accept & Continue Button */}
          <TouchableOpacity
            style={styles.acceptBtn}
            onPress={handleAcceptAndContinue}
            disabled={screenState === 'AI_PROCESSING'}
            activeOpacity={0.85}
          >
            <Text style={styles.acceptBtnText}>Accept & Continue</Text>
            <ArrowRight size={18} color={colors.white} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>

        {/* INFO PILL BANNER */}
        <View style={styles.infoBanner}>
          <Info size={16} color={colors.studioTerracotta} style={{ marginRight: 8 }} />
          <Text style={styles.infoBannerText}>
            You can edit more in the next step (Voice Input).
          </Text>
        </View>

        {/* TRADITIONAL INDIAN BOTTOM CRAFT BORDER */}
        <IndianCraftBorder color={colors.studioTerracotta} height={46} />
      </ScrollView>

      {/* MODALS */}
      <ImageEditorModal
        visible={isEditorVisible}
        imageSource={ORIGINAL_IMAGE}
        initialSettings={editSettings}
        onClose={() => setIsEditorVisible(false)}
        onSave={(newSettings) => setEditSettings(newSettings)}
      />

      <ImageTipsBottomSheet
        visible={isTipsVisible}
        onClose={() => setIsTipsVisible(false)}
      />
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
  logoCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 21,
    color: colors.studioDarkBrown,
    letterSpacing: 0.5,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 20,
  },
  titleSection: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 10,
  },
  screenTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 27,
    color: colors.studioDarkBrown,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  screenSubtitle: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13.5,
    color: colors.textBody,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 16,
    lineHeight: 19,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 14,
    shadowColor: colors.studioDarkBrown,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  enhancedCard: {
    marginBottom: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  cardTitleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitleOriginal: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.studioTerracotta,
  },
  cardTitleEnhanced: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.studioDarkBrown,
  },
  editPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 3.5,
    backgroundColor: colors.surface,
  },
  editPillText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.studioDarkBrown,
  },
  imageContainer: {
    width: '100%',
    height: 185,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#EBE2D5',
  },
  enhancedImageContainer: {
    width: '100%',
    height: 195,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#EBE2D5',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapperRelative: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  floatingVariantBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(42, 27, 18, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  floatingVariantText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.white,
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D5C2B4',
  },
  dotActive: {
    width: 16,
    backgroundColor: colors.studioTerracotta,
  },
  aiSuggestedBadge: {
    borderWidth: 1.2,
    borderColor: colors.studioGreen,
    backgroundColor: colors.studioGreenBg,
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  aiSuggestedBadgeText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11,
    color: colors.studioGreen,
  },
  chipsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 6,
  },
  featureChip: {
    flex: 1,
    backgroundColor: '#FAF6F0',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureChipActive: {
    borderColor: '#D4B8A0',
    backgroundColor: '#FDF7EE',
  },
  chipText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.studioDarkBrown,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 14,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 10,
    gap: 10,
  },
  regenerateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.studioTerracotta,
    borderRadius: 26,
    paddingVertical: 13,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  regenerateBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14.5,
    color: colors.studioTerracotta,
  },
  acceptBtn: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.studioTerracotta,
    borderRadius: 26,
    paddingVertical: 13,
    paddingHorizontal: 18,
    shadowColor: colors.studioTerracotta,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  acceptBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.white,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.studioInfoBg,
    borderWidth: 1,
    borderColor: colors.studioInfoBorder,
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  infoBannerText: {
    flex: 1,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textBody,
  },
  processingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    width: '100%',
  },
  spinnerCircle: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  processingTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.studioDarkBrown,
    marginBottom: 4,
  },
  processingSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textBody,
    marginBottom: 12,
    textAlign: 'center',
  },
  progressBarTrack: {
    width: '70%',
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.studioTerracotta,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  errorTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.error,
    marginBottom: 4,
  },
  errorSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textBody,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 17,
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.studioTerracotta,
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  retryBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
    color: colors.white,
  },
});