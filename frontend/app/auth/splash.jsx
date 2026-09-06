import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  StatusBar } from
'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import colors from '../../theme/colors';
import typography from '../../theme/typography';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

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

  return (/*#__PURE__*/
    _jsx(View, { style: StyleSheet.absoluteFill, pointerEvents: "none", children: /*#__PURE__*/
      _jsx(Svg, { width: W, height: H, style: StyleSheet.absoluteFill, children: /*#__PURE__*/
        _jsx(Path, {
          d: threadPath,
          stroke: "#C0472A",
          strokeWidth: 3.5,
          fill: "none",
          strokeLinecap: "round",
          strokeLinejoin: "round" }
        ) }
      ) }
    ));

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
      useNativeDriver: false
    }).start();

    const timer = setTimeout(() => {
      router.replace('/auth/onboarding-1');
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (/*#__PURE__*/
    _jsxs(View, { style: styles.root, children: [/*#__PURE__*/
      _jsx(StatusBar, { barStyle: "dark-content", backgroundColor: colors.bg }), /*#__PURE__*/


      _jsx(View, { style: [StyleSheet.absoluteFill, styles.paperBg] }), /*#__PURE__*/


      _jsx(Image, {
        source: MANDALA,
        style: styles.mandala,
        resizeMode: "contain",
        fadeDuration: 0 }
      ), /*#__PURE__*/


      _jsxs(View, { style: styles.bottomSceneContainer, children: [/*#__PURE__*/
        _jsx(Image, {
          source: BOTTOM_SCENE,
          style: styles.bottomSceneImage,
          resizeMode: "cover",
          fadeDuration: 0 }
        ), /*#__PURE__*/

        _jsx(View, { style: styles.bottomSceneFadeTop })] }
      ), /*#__PURE__*/


      _jsx(ArtisanThread, {}), /*#__PURE__*/


      _jsxs(View, { style: styles.topLeft, pointerEvents: "none", children: [/*#__PURE__*/

        _jsx(Text, { style: styles.leafSymbol, children: "\u2726" }), /*#__PURE__*/
        _jsxs(View, { style: styles.topLeftRow, children: [/*#__PURE__*/
          _jsx(View, { style: styles.verticalLine }), /*#__PURE__*/
          _jsxs(View, { style: styles.topLeftTextBlock, children: [/*#__PURE__*/
            _jsx(Text, { style: styles.topLeftLine, children: "Crafting" }), /*#__PURE__*/
            _jsx(Text, { style: styles.topLeftLine, children: "Connections" }), /*#__PURE__*/
            _jsx(Text, { style: styles.topLeftLine, children: "for a Brighter" }), /*#__PURE__*/
            _jsx(Text, { style: styles.topLeftLine, children: "Tomorrow" })] }
          )] }
        )] }
      ), /*#__PURE__*/


      _jsxs(View, { style: styles.centerBlock, children: [/*#__PURE__*/

        _jsx(Image, {
          source: MASCOT,
          style: styles.mascotImage,
          resizeMode: "contain",
          fadeDuration: 0 }
        ), /*#__PURE__*/


        _jsx(Text, { style: styles.wordmark, children: "SHILPSETU" }), /*#__PURE__*/


        _jsxs(View, { style: styles.taglineRow, children: [/*#__PURE__*/
          _jsx(View, { style: styles.taglineDash }), /*#__PURE__*/
          _jsx(Text, { style: styles.tagline, children: " Hunar se Bazaar Tak " }), /*#__PURE__*/
          _jsx(View, { style: styles.taglineDash })] }
        ), /*#__PURE__*/


        _jsx(View, { style: styles.progressTrack, children: /*#__PURE__*/
          _jsx(Animated.View, { style: [styles.progressFill, { width: progressWidth }] }) }
        ), /*#__PURE__*/


        _jsx(Text, { style: styles.progressLabel, children: "BUILDING A BRIGHTER TOMORROW" })] }
      )] }
    ));

}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg
  },

  // Paper parchment background — warm ivory with very subtle noise feel
  paperBg: {
    backgroundColor: '#F5EDD8'
  },

  // ── Mandala ──────────────────────────────────────────────────
  mandala: {
    position: 'absolute',
    top: -W * 0.18,
    right: -W * 0.18,
    width: W * 0.62,
    height: W * 0.62,
    opacity: 0.18,
    tintColor: '#C8A97A'
  },

  // ── Bottom scene ─────────────────────────────────────────────
  bottomSceneContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: H * 0.42,
    overflow: 'hidden'
  },
  bottomSceneImage: {
    width: '100%',
    height: '100%',
    opacity: 0.88
  },
  bottomSceneFadeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '35%',
    backgroundColor: 'rgba(245, 237, 216, 0.65)'
  },

  // ── Top-left decoration ──────────────────────────────────────
  topLeft: {
    position: 'absolute',
    top: H * 0.085,
    left: 24
  },
  leafSymbol: {
    fontSize: 13,
    color: '#5E8A4A',
    marginBottom: 4,
    marginLeft: 4
  },
  topLeftRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 8
  },
  verticalLine: {
    width: 2,
    backgroundColor: colors.primary,
    borderRadius: 1,
    marginTop: 2,
    marginBottom: 2
  },
  topLeftTextBlock: {
    flexDirection: 'column'
  },
  topLeftLine: {
    fontFamily: typography.fonts.serifSemiBold,
    fontSize: 13,
    fontStyle: 'italic',
    color: '#3A2515',
    lineHeight: 19
  },

  // ── Center logo block ────────────────────────────────────────
  centerBlock: {
    position: 'absolute',
    top: H * 0.16,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  mascotImage: {
    width: W * 0.62,
    height: W * 0.62,
    marginBottom: -8
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
    marginTop: 2
  },

  // Tagline row
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 10
  },
  taglineDash: {
    flex: 1,
    height: 1,
    backgroundColor: colors.primary,
    opacity: 0.5,
    maxWidth: 28
  },
  tagline: {
    fontFamily: typography.fonts.serifSemiBold,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#5A3520',
    letterSpacing: 0.3
  },

  // Progress bar
  progressTrack: {
    width: 190,
    height: 8,
    backgroundColor: '#E0CEB6',
    borderRadius: 999,
    marginTop: 28,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 999
  },

  // Progress label
  progressLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 9.5,
    letterSpacing: 2.2,
    color: '#8A7060',
    marginTop: 10,
    textAlign: 'center'
  }
});