import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { ChevronRight } from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import ProgressDots from '../../components/ProgressDots';
import ScriptCaption from '../../components/ScriptCaption';
import MandalaBackground from '../../components/MandalaBackground';

const { width: W, height: H } = Dimensions.get('window');
const IMAGE_HEIGHT = H * 0.72;

// ─── Assets ──────────────────────────────────────────────────────────────────
const ARTISAN_PHOTO = require('../../assets/images/onboarding_artisan_1.jpg');
const MASCOT_LOGO = require('../../assets/images/shilpsetu_mascot.jpg');

// ─── Organic Wave Shape ──────────────────────────────────────────────────────
function WaveTransition() {
  // Creates the organic curved boundary between the photo and the cream section
  const waveHeight = 70;
  const wavePath = `
    M 0 ${waveHeight}
    C ${W * 0.15} ${waveHeight * 0.3}, ${W * 0.3} ${waveHeight * 0.15}, ${W * 0.45} ${waveHeight * 0.35}
    C ${W * 0.6} ${waveHeight * 0.55}, ${W * 0.75} ${waveHeight * 0.8}, ${W} ${waveHeight * 0.25}
    L ${W} ${waveHeight}
    L 0 ${waveHeight}
    Z
  `;

  return (
    <View style={styles.waveContainer}>
      <Svg width={W} height={waveHeight} viewBox={`0 0 ${W} ${waveHeight}`}>
        <Path d={wavePath} fill={colors.bg} />
      </Svg>
    </View>
  );
}

// ─── Image Overlay Gradient (SVG-based) ──────────────────────────────────────
function ImageOverlay() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width={W} height={IMAGE_HEIGHT} style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="overlayGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="rgba(30,18,10,0)" stopOpacity="0" />
            <Stop offset="0.35" stopColor="rgba(30,18,10,0)" stopOpacity="0" />
            <Stop offset="0.6" stopColor="rgba(30,18,10,0.25)" stopOpacity="0.25" />
            <Stop offset="0.82" stopColor="rgba(30,18,10,0.55)" stopOpacity="0.55" />
            <Stop offset="1" stopColor="rgba(30,18,10,0.72)" stopOpacity="0.72" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width={W} height={IMAGE_HEIGHT} fill="url(#overlayGrad)" />
      </Svg>
    </View>
  );
}

// ─── Small Leaf Decoration ───────────────────────────────────────────────────
function LeafDecoration() {
  return (
    <View style={styles.leafContainer} pointerEvents="none">
      <Svg width={32} height={44} viewBox="0 0 32 44">
        <Path
          d="M16 2 C8 8, 2 18, 4 28 C6 36, 14 40, 16 42 C18 40, 26 36, 28 28 C30 18, 24 8, 16 2 Z"
          fill="none"
          stroke="#C8A97A"
          strokeWidth="1.2"
          opacity={0.4}
        />
        <Path
          d="M16 8 L16 38"
          stroke="#C8A97A"
          strokeWidth="0.8"
          opacity={0.35}
        />
      </Svg>
    </View>
  );
}

// ─── Main Onboarding Screen 1 ────────────────────────────────────────────────
export default function Onboarding1() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* ── TOP: Full-bleed artisan photograph ── */}
      <View style={styles.imageSection}>
        <Image
          source={ARTISAN_PHOTO}
          style={styles.artisanImage}
          resizeMode="cover"
          fadeDuration={0}
        />

        {/* Gradient overlay for text readability */}
        <ImageOverlay />

        {/* Logo — upper left */}
        <View style={styles.logoContainer}>
          <Image
            source={MASCOT_LOGO}
            style={styles.logoImage}
            resizeMode="contain"
            fadeDuration={0}
          />
        </View>

        {/* Skip — upper right */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.replace('/auth/get-started' as any)}
          accessibilityLabel="Skip onboarding"
          accessibilityRole="button"
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.skipText}>Skip</Text>
          <ChevronRight size={16} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>

        {/* Headline overlaid on lower part of image */}
        <View style={styles.headlineContainer}>
          <Text style={styles.headlineWhite}>Your Craft</Text>
          <Text style={styles.headlineWhite}>Deserves to</Text>
          <Text style={styles.headlineGold}>Be Seen</Text>

          {/* Decorative underline */}
          <View style={styles.decorativeUnderline} />

          {/* Description */}
          <Text style={styles.description}>
            Turn your handmade products{'\n'}into beautiful digital catalogs{'\n'}with AI.
          </Text>
        </View>

        {/* Wave transition at the bottom of the image */}
        <WaveTransition />
      </View>

      {/* ── BOTTOM: Warm cream content panel ── */}
      <View style={styles.creamSection}>
        {/* Faint bottom-left mandala */}
        <MandalaBackground position="bottom-left" size={150} opacity={0.1} />

        {/* Leaf decoration — right side near wave */}
        <LeafDecoration />

        {/* Progress dots */}
        <ProgressDots total={3} active={1} />

        {/* Continue button */}
        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.85}
          onPress={() => router.push('/auth/onboarding-2' as any)}
          accessibilityLabel="Continue to next screen"
          accessibilityRole="button"
        >
          <Text style={styles.continueText}>Continue</Text>
          <ChevronRight size={20} color="#FFFFFF" strokeWidth={2.5} style={{ marginLeft: 6 }} />
        </TouchableOpacity>

        {/* Bottom-right script caption */}
        <View style={styles.scriptFooter}>
          <ScriptCaption lines={['Tradition', 'Creates', 'Tomorrow']} align="right" />
        </View>
      </View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // ── Image section ────────────────────────────────────────────
  imageSection: {
    height: IMAGE_HEIGHT,
    width: '100%',
    position: 'relative',
  },
  artisanImage: {
    width: '100%',
    height: '100%',
  },

  // ── Logo ─────────────────────────────────────────────────────
  logoContainer: {
    position: 'absolute',
    top: 52,
    left: 18,
    zIndex: 10,
  },
  logoImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },

  // ── Skip ─────────────────────────────────────────────────────
  skipButton: {
    position: 'absolute',
    top: 58,
    right: 22,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipText: {
    fontFamily: typography.fonts.serifSemiBold,
    fontSize: 15,
    color: '#FFFFFF',
    marginRight: 2,
    letterSpacing: 0.3,
  },

  // ── Headline ─────────────────────────────────────────────────
  headlineContainer: {
    position: 'absolute',
    bottom: 90,
    left: 26,
    right: 26,
    zIndex: 5,
  },
  headlineWhite: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 34,
    color: '#FFFFFF',
    lineHeight: 42,
    letterSpacing: 0.3,
  },
  headlineGold: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 34,
    color: '#F2C87A',
    lineHeight: 42,
    letterSpacing: 0.3,
    marginBottom: 10,
  },

  // ── Decorative underline ─────────────────────────────────────
  decorativeUnderline: {
    width: 90,
    height: 3,
    backgroundColor: '#E8C87A',
    borderRadius: 2,
    marginBottom: 14,
    opacity: 0.8,
  },

  // ── Description ──────────────────────────────────────────────
  description: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 14.5,
    color: 'rgba(255,255,255,0.88)',
    lineHeight: 22,
    letterSpacing: 0.2,
  },

  // ── Wave ─────────────────────────────────────────────────────
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  // ── Cream section ────────────────────────────────────────────
  creamSection: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 26,
    paddingTop: 6,
    paddingBottom: 28,
    justifyContent: 'space-between',
  },

  // ── Continue button ──────────────────────────────────────────
  continueButton: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
  },
  continueText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  // ── Leaf decoration ──────────────────────────────────────────
  leafContainer: {
    position: 'absolute',
    top: -8,
    right: 30,
    opacity: 0.5,
  },

  // ── Script footer ────────────────────────────────────────────
  scriptFooter: {
    alignItems: 'flex-end',
  },
});
