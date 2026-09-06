import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import colors from '../../theme/colors';
import typography from '../../theme/typography';

const { width: W, height: H } = Dimensions.get('window');

// ─── Asset references ────────────────────────────────────────────────────────
const MASCOT = require('../../assets/images/shilpsetu_mascot.jpg');
const BOTTOM_SCENE = require('../../assets/images/shilpsetu_bottom_scene.jpg');
const MANDALA = require('../../assets/images/shilpsetu_mandala.jpg');

// ─── ArtisanThread — SVG flowing red thread ──────────────────────────────────
function ArtisanThread() {
  // Path that flows from left edge, curves up, then loops and exits right
  // Matches the reference: left → center curve → loop/knot right side → bottom-right
  const threadPath = `
    M -10 ${H * 0.465}
    C ${W * 0.12} ${H * 0.41}, ${W * 0.28} ${H * 0.435}, ${W * 0.42} ${H * 0.44}
    C ${W * 0.55} ${H * 0.445}, ${W * 0.65} ${H * 0.42}, ${W * 0.72} ${H * 0.39}
    C ${W * 0.82} ${H * 0.36}, ${W * 0.88} ${H * 0.38}, ${W * 0.92} ${H * 0.41}
    C ${W * 0.96} ${H * 0.44}, ${W * 0.94} ${H * 0.46}, ${W * 0.9} ${H * 0.455}
    C ${W * 0.86} ${H * 0.45}, ${W * 0.84} ${H * 0.47}, ${W * 0.88} ${H * 0.49}
    C ${W * 0.92} ${H * 0.51}, ${W * 1.05} ${H * 0.52}
  `;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width={W} height={H} style={StyleSheet.absoluteFill}>
        <Path
          d={threadPath}
          stroke="#C0472A"
          strokeWidth={3.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

// ─── Main Splash Screen ───────────────────────────────────────────────────────
export default function SplashScreen() {
  const router = useRouter();
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate progress bar to ~55%
    Animated.timing(progressAnim, {
      toValue: 0.55,
      duration: 1800,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      router.replace('/auth/onboarding-1' as any);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

      {/* ── Layer 1: Warm parchment background ── */}
      <View style={[StyleSheet.absoluteFill, styles.paperBg]} />

      {/* ── Layer 2: Top-right mandala (partially cropped) ── */}
      <Image
        source={MANDALA}
        style={styles.mandala}
        resizeMode="contain"
        fadeDuration={0}
      />

      {/* ── Layer 3: Bottom scene (pottery + heritage + handloom + textile) ── */}
      <View style={styles.bottomSceneContainer}>
        <Image
          source={BOTTOM_SCENE}
          style={styles.bottomSceneImage}
          resizeMode="cover"
          fadeDuration={0}
        />
        {/* Blend the top edge of the scene into the background */}
        <View style={styles.bottomSceneFadeTop} />
      </View>

      {/* ── Layer 4: Red artisan thread ── */}
      <ArtisanThread />

      {/* ── Layer 5: Top-left decorative text ── */}
      <View style={styles.topLeft} pointerEvents="none">
        {/* Small leaf symbol */}
        <Text style={styles.leafSymbol}>✦</Text>
        <View style={styles.topLeftRow}>
          <View style={styles.verticalLine} />
          <View style={styles.topLeftTextBlock}>
            <Text style={styles.topLeftLine}>Crafting</Text>
            <Text style={styles.topLeftLine}>Connections</Text>
            <Text style={styles.topLeftLine}>for a Brighter</Text>
            <Text style={styles.topLeftLine}>Tomorrow</Text>
          </View>
        </View>
      </View>

      {/* ── Layer 6: Central Logo lockup ── */}
      <View style={styles.centerBlock}>
        {/* Mascot image */}
        <Image
          source={MASCOT}
          style={styles.mascotImage}
          resizeMode="contain"
          fadeDuration={0}
        />

        {/* SHILPSETU wordmark */}
        <Text style={styles.wordmark}>SHILPSETU</Text>

        {/* Tagline with side dashes */}
        <View style={styles.taglineRow}>
          <View style={styles.taglineDash} />
          <Text style={styles.tagline}> Hunar se Bazaar Tak </Text>
          <View style={styles.taglineDash} />
        </View>

        {/* Progress bar */}
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>

        {/* Progress label */}
        <Text style={styles.progressLabel}>BUILDING A BRIGHTER TOMORROW</Text>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // Paper parchment background — warm ivory with very subtle noise feel
  paperBg: {
    backgroundColor: '#F5EDD8',
  },

  // ── Mandala ──────────────────────────────────────────────────
  mandala: {
    position: 'absolute',
    top: -W * 0.18,
    right: -W * 0.18,
    width: W * 0.62,
    height: W * 0.62,
    opacity: 0.18,
    tintColor: '#C8A97A',
  },

  // ── Bottom scene ─────────────────────────────────────────────
  bottomSceneContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: H * 0.42,
    overflow: 'hidden',
  },
  bottomSceneImage: {
    width: '100%',
    height: '100%',
    opacity: 0.88,
  },
  bottomSceneFadeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '35%',
    backgroundColor: 'rgba(245, 237, 216, 0.65)',
  },

  // ── Top-left decoration ──────────────────────────────────────
  topLeft: {
    position: 'absolute',
    top: H * 0.085,
    left: 24,
  },
  leafSymbol: {
    fontSize: 13,
    color: '#5E8A4A',
    marginBottom: 4,
    marginLeft: 4,
  },
  topLeftRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 8,
  },
  verticalLine: {
    width: 2,
    backgroundColor: colors.primary,
    borderRadius: 1,
    marginTop: 2,
    marginBottom: 2,
  },
  topLeftTextBlock: {
    flexDirection: 'column',
  },
  topLeftLine: {
    fontFamily: typography.fonts.serifSemiBold,
    fontSize: 13,
    fontStyle: 'italic',
    color: '#3A2515',
    lineHeight: 19,
  },

  // ── Center logo block ────────────────────────────────────────
  centerBlock: {
    position: 'absolute',
    top: H * 0.16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  mascotImage: {
    width: W * 0.62,
    height: W * 0.62,
    marginBottom: -8,
  },

  // SHILPSETU wordmark — bold black with white stroke effect
  wordmark: {
    fontFamily: typography.fonts.wordmark,
    fontSize: W * 0.118,
    fontWeight: '900',
    color: '#1A0F07',
    letterSpacing: 2,
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: -2, height: -2 },
    textShadowRadius: 0,
    marginTop: 2,
  },

  // Tagline row
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 10,
  },
  taglineDash: {
    flex: 1,
    height: 1,
    backgroundColor: colors.primary,
    opacity: 0.5,
    maxWidth: 28,
  },
  tagline: {
    fontFamily: typography.fonts.serifSemiBold,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#5A3520',
    letterSpacing: 0.3,
  },

  // Progress bar
  progressTrack: {
    width: 190,
    height: 8,
    backgroundColor: '#E0CEB6',
    borderRadius: 999,
    marginTop: 28,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 999,
  },

  // Progress label
  progressLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 9.5,
    letterSpacing: 2.2,
    color: '#8A7060',
    marginTop: 10,
    textAlign: 'center',
  },
});
