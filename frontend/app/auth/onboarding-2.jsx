import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View } from
'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import {
  Bookmark,
  ChevronRight,
  FileText,
  Grid2X2,
  Hash,
  Tag,
  Sparkles } from
'lucide-react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';

// ──────────────────────────────────────────────────────────────────────────────
//  Onboarding Step 2 — "From Product to Professional Catalog"
//  Spec: 390×844 base, safe-area aware, ~62% photo / ~38% cream split
//  Theme tokens are sourced from theme/colors • theme/typography — no inline
//  magic hex codes except overlay scrim which uses colors.overlayDark.
// ──────────────────────────────────────────────────────────────────────────────
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const { width: W, height: H } = Dimensions.get('window');

// Responsive tuning: keep proportions on 375×812 (SE/mini) and 390×844.
// Uses flex-percentage layout per spec — no hard absolute pixel positions for wave/cream.
const HERO_HEIGHT = Math.min(Math.max(H * 0.62, 520), 580);
const WAVE_HEIGHT = 74;
const PRODUCT_WIDTH = Math.min(Math.max(W * 0.42, 136), 168);
const PRODUCT_HEIGHT = PRODUCT_WIDTH * 1.32;
const PHONE_W = Math.min(Math.max(W * 0.38, 148), 166);
const PHONE_H = PHONE_W * 1.84;

// Assets — TODO: replace with final production photography (same aspect ratios)
const BG = require('../../assets/images/onboarding_2_bg.jpg');
const VASE = require('../../assets/images/terracotta_vase_product.jpg');
const LOGO_IMG = require('../../assets/images/shilpsetu_mascot.jpg');
const MANDALA_IMG = require('../../assets/images/shilpsetu_mandala.jpg');
const TEXTILE = require('../../assets/images/shilpsetu_bottom_scene.jpg');

// ─── 1. Photo scrim (dark gradient so white text/icons pop) ─────────────────
// Uses react-native-svg LinearGradient — equivalent to expo-linear-gradient
// dark scrim `rgba(20,12,7,0)` → `rgba(20,12,7,0.55)` per spec.
function PhotoScrim() {
  return (/*#__PURE__*/
    _jsx(View, { style: StyleSheet.absoluteFill, pointerEvents: "none", children: /*#__PURE__*/
      _jsxs(Svg, { width: W, height: HERO_HEIGHT, style: StyleSheet.absoluteFill, children: [/*#__PURE__*/
        _jsx(Defs, { children: /*#__PURE__*/
          _jsxs(LinearGradient, { id: "photoScrim2", x1: "0", y1: "0", x2: "0", y2: "1", children: [/*#__PURE__*/
            _jsx(Stop, { offset: "0", stopColor: "#140C07", stopOpacity: 0.06 }), /*#__PURE__*/
            _jsx(Stop, { offset: "0.42", stopColor: "#140C07", stopOpacity: 0.12 }), /*#__PURE__*/
            _jsx(Stop, { offset: "0.68", stopColor: "#140C07", stopOpacity: 0.38 }), /*#__PURE__*/
            _jsx(Stop, { offset: "1", stopColor: "#140C07", stopOpacity: 0.58 })] }
          ) }
        ), /*#__PURE__*/
        _jsx(Rect, { x: "0", y: "0", width: W, height: HERO_HEIGHT, fill: "url(#photoScrim2)" })] }
      ) }
    ));

}

// ─── 2. Organic wave/blob transition ─────────────────────────────────────────
// Concave dip on the left, rising higher on the right — cream section peeks
// through as an organic shape. Implemented as an SVG mask/shape overlay.
function WaveTransition() {
  // Left dip ~ left 0 @52, valley bottom ~12-8, mid-rise 34-64, right peak ~78
  // right edge sits slightly higher than left for "rising on the right" feel.
  const d = `M0 ${WAVE_HEIGHT * 0.68} C ${W * 0.14} ${WAVE_HEIGHT * 0.08} ${W * 0.28} ${WAVE_HEIGHT * 0.1} ${W * 0.46} ${WAVE_HEIGHT * 0.46} C ${W * 0.62} ${WAVE_HEIGHT * 0.84} ${W * 0.79} ${WAVE_HEIGHT * 1.05} ${W} ${WAVE_HEIGHT * 0.44} L ${W} ${WAVE_HEIGHT} L 0 ${WAVE_HEIGHT} Z`;
  return (/*#__PURE__*/
    _jsx(View, { style: styles.waveWrap, pointerEvents: "none", children: /*#__PURE__*/
      _jsx(Svg, { width: W, height: WAVE_HEIGHT, viewBox: `0 0 ${W} ${WAVE_HEIGHT}`, children: /*#__PURE__*/
        _jsx(Path, { d: d, fill: colors.bg }) }
      ) }
    ));

}

// ─── 3. Brand lockup (left header) ───────────────────────────────────────────
// Circular mascot ~72×72 inside thin segmented ring (green+yellow+cream arcs),
// "SHILPSETU" bold condensed with white outline/stroke, tagline italic serif.
function BrandLockup({ top }) {
  return (/*#__PURE__*/
    _jsxs(View, { style: [styles.brandLockup, top !== undefined ? { top } : null], pointerEvents: "none", children: [/*#__PURE__*/
      _jsxs(View, { style: styles.logoRingWrap, children: [/*#__PURE__*/

        _jsxs(Svg, { width: 72, height: 72, viewBox: "0 0 72 72", style: StyleSheet.absoluteFill, children: [/*#__PURE__*/
          _jsx(Circle, { cx: 36, cy: 36, r: 32.5, stroke: colors.logoRingGreen, strokeWidth: 2.5, strokeDasharray: "68 136", fill: "none", strokeLinecap: "round" }), /*#__PURE__*/
          _jsx(Circle, { cx: 36, cy: 36, r: 32.5, stroke: colors.logoRingYellow, strokeWidth: 2.5, strokeDasharray: "68 136", strokeDashoffset: -70, fill: "none", strokeLinecap: "round" }), /*#__PURE__*/
          _jsx(Circle, { cx: 36, cy: 36, r: 32.5, stroke: colors.logoRingCream, strokeWidth: 2.5, strokeDasharray: "68 136", strokeDashoffset: -140, fill: "none", strokeLinecap: "round", opacity: 0.95 })] }
        ), /*#__PURE__*/
        _jsx(Image, { source: LOGO_IMG, style: styles.logoImg, resizeMode: "cover" })] }
      ), /*#__PURE__*/
      _jsx(Text, { style: styles.wordmark, children: "SHILPSETU" }), /*#__PURE__*/
      _jsx(Text, { style: styles.wordmarkSub, children: "\u2014 Hunar se Bazaar Tak \u2014" })] }
    ));

}

// ─── 4. Top-right script caption ─────────────────────────────────────────────
function TopRightCaption() {
  return (/*#__PURE__*/
    _jsxs(View, { style: styles.topCaption, pointerEvents: "none", children: [/*#__PURE__*/
      _jsx(Text, { style: styles.topScript, children: "Same Craft" }), /*#__PURE__*/
      _jsx(Text, { style: [styles.topScript, { marginTop: -2 }], children: "New Possibilities" }), /*#__PURE__*/
      _jsx(View, { style: styles.topCaptionLine })] }
    ));

}

// ─── 5. Hand-drawn curved arrow (white, thin, squiggly) ─────────────────────
function HandArrow({ style, flip }) {
  return (/*#__PURE__*/
    _jsx(View, { style: [styles.handArrow, flip && styles.handArrowFlip, style], pointerEvents: "none", children: /*#__PURE__*/
      _jsxs(Svg, { width: 76, height: 62, viewBox: "0 0 76 62", children: [/*#__PURE__*/

        _jsx(Path, {
          d: "M6 10 C 26 2, 50 6, 56 28 C 59 37, 54 46, 44 50",
          fill: "none",
          stroke: colors.handArrowWhite,
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          opacity: 0.98 }
        ), /*#__PURE__*/

        _jsx(Path, {
          d: "M49 42 L43 50.5 L55 53.5",
          fill: "none",
          stroke: colors.handArrowWhite,
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          opacity: 0.98 }
        ), /*#__PURE__*/

        _jsx(Path, { d: "M6 10 C 3 7, 5 4, 9 6", fill: "none", stroke: colors.handArrowWhite, strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.9 })] }
      ) }
    ));

}

// ─── 6a. AI Badge Graphic (reusable sub-component) ───────────────────────────
// Circular cream/white badge ~90×90 soft glow, inner rounded-square chip glyph
// with corner tick-marks, centred "AI" rust/brown.
export function AiConnectorGraphic({ style }) {
  return (/*#__PURE__*/
    _jsxs(View, { style: [styles.aiOuter, style], pointerEvents: "none", children: [/*#__PURE__*/

      _jsx(View, { style: styles.aiGlow }), /*#__PURE__*/
      _jsxs(View, { style: styles.aiBadge, children: [/*#__PURE__*/
        _jsxs(Svg, { width: 90, height: 90, viewBox: "0 0 90 90", children: [/*#__PURE__*/

          _jsx(Circle, { cx: 45, cy: 45, r: 42.5, fill: colors.bg, stroke: colors.aiBadgeRing, strokeWidth: 1.4 }), /*#__PURE__*/
          _jsx(Circle, { cx: 45, cy: 45, r: 38, fill: colors.white, opacity: 0.96 }), /*#__PURE__*/

          _jsx(Rect, { x: 30, y: 30, width: 30, height: 30, rx: 6, fill: "none", stroke: colors.primary, strokeWidth: 1.7 }), /*#__PURE__*/

          _jsx(Path, { d: "M45 18 L45 24 M45 66 L45 72 M18 45 L24 45 M66 45 L72 45", stroke: colors.primary, strokeWidth: 1.35, strokeLinecap: "round", opacity: 0.95 }), /*#__PURE__*/
          _jsx(Path, { d: "M27 27 L31 31 M59 59 L63 63 M63 27 L59 31 M27 63 L31 59", stroke: colors.primary, strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.9 }), /*#__PURE__*/

          _jsx(Circle, { cx: 45, cy: 17, r: 1.6, fill: colors.primary }), /*#__PURE__*/
          _jsx(Circle, { cx: 45, cy: 73, r: 1.6, fill: colors.primary }), /*#__PURE__*/
          _jsx(Circle, { cx: 17, cy: 45, r: 1.6, fill: colors.primary }), /*#__PURE__*/
          _jsx(Circle, { cx: 73, cy: 45, r: 1.6, fill: colors.primary })] }
        ), /*#__PURE__*/
        _jsx(Text, { style: styles.aiLetters, children: "AI" })] }
      ), /*#__PURE__*/

      _jsxs(View, { style: styles.sparkleWrap, pointerEvents: "none", children: [/*#__PURE__*/
        _jsx(Sparkles, { size: 16, color: colors.white, strokeWidth: 1.8, style: { opacity: 0.96 } }), /*#__PURE__*/
        _jsx(View, { style: styles.sparkleDot }), /*#__PURE__*/
        _jsx(View, { style: [styles.sparkleDot, { left: 18, top: 8, width: 3, height: 3 }] })] }
      )] }
    ));

}

// ─── 6b. Feature pill stack (reusable) ───────────────────────────────────────
// Four stacked cream badges ~150×40, gap 10, rust icon + Poppins-Medium label.

function FeaturePill({ icon: Icon, label }) {
  return (/*#__PURE__*/
    _jsxs(View, { style: styles.pill, children: [/*#__PURE__*/
      _jsx(View, { style: styles.pillIconWrap, children: /*#__PURE__*/
        _jsx(Icon, { size: 16, color: colors.primary, strokeWidth: 2.1 }) }
      ), /*#__PURE__*/
      _jsx(Text, { style: styles.pillLabel, children: label })] }
    ));

}

export function FeaturePillStack({ style }) {
  return (/*#__PURE__*/
    _jsxs(View, { style: [styles.pillStack, style], pointerEvents: "none", children: [/*#__PURE__*/
      _jsx(FeaturePill, { icon: Tag, label: "Product Name" }), /*#__PURE__*/
      _jsx(FeaturePill, { icon: FileText, label: "Description" }), /*#__PURE__*/
      _jsx(FeaturePill, { icon: Grid2X2, label: "Category" }), /*#__PURE__*/
      _jsx(FeaturePill, { icon: Hash, label: "Tags" })] }
    ));

}

// ─── 6c. Phone mockup card (reusable) ─────────────────────────────────────
// Dark-bezel phone frame, rotated 6–8° clockwise, white screen content.
export function PhoneMockCard({ style }) {
  return (/*#__PURE__*/
    _jsxs(View, { style: [styles.phoneFrame, style], pointerEvents: "none", children: [/*#__PURE__*/

      _jsx(View, { style: styles.phoneNotch }), /*#__PURE__*/
      _jsxs(View, { style: styles.phoneScreen, children: [/*#__PURE__*/
        _jsxs(View, { style: styles.phoneImageWrap, children: [/*#__PURE__*/
          _jsx(Image, { source: VASE, style: styles.phoneImage, resizeMode: "cover" }), /*#__PURE__*/
          _jsx(View, { style: styles.phoneImageShade }), /*#__PURE__*/
          _jsx(View, { style: styles.bookmarkBadge, children: /*#__PURE__*/
            _jsx(Bookmark, { size: 13, color: colors.textDark, strokeWidth: 1.9, fill: "none" }) }
          )] }
        ), /*#__PURE__*/
        _jsxs(View, { style: styles.phoneBody, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.phoneTitle, children: "Handcrafted" }), /*#__PURE__*/
          _jsx(Text, { style: styles.phoneTitle, children: "Terracotta Vase" }), /*#__PURE__*/
          _jsx(Text, { style: styles.phoneDesc, children: "A beautiful handcrafted terracotta vase with traditional Indian motifs. Perfect for home decor." }

          ), /*#__PURE__*/
          _jsxs(View, { style: styles.phoneTagRow, children: [/*#__PURE__*/
            _jsx(View, { style: styles.phoneTagChip, children: /*#__PURE__*/_jsx(Text, { style: styles.phoneTagText, children: "Home Decor" }) }), /*#__PURE__*/
            _jsx(View, { style: styles.phoneTagChip, children: /*#__PURE__*/_jsx(Text, { style: styles.phoneTagText, children: "Terracotta" }) })] }
          ), /*#__PURE__*/
          _jsxs(View, { style: [styles.phoneTagRow, { marginTop: 6 }], children: [/*#__PURE__*/
            _jsx(View, { style: styles.phoneTagChip, children: /*#__PURE__*/_jsx(Text, { style: styles.phoneTagText, children: "Handmade" }) }), /*#__PURE__*/
            _jsx(View, { style: styles.phoneTagChip, children: /*#__PURE__*/_jsx(Text, { style: styles.phoneTagText, children: "Traditional" }) })] }
          ), /*#__PURE__*/
          _jsx(View, { style: styles.phoneCta, children: /*#__PURE__*/
            _jsx(Text, { style: styles.phoneCtaText, children: "Add to Catalog" }) }
          )] }
        )] }
      )] }
    ));

}

// ─── Main screen ─────────────────────────────────────────────────────────────
export default function Onboarding2() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (/*#__PURE__*/
    _jsxs(View, { style: styles.root, children: [/*#__PURE__*/
      _jsx(StatusBar, { style: "light" }), /*#__PURE__*/


      _jsxs(View, { style: styles.hero, children: [/*#__PURE__*/
        _jsx(Image, { source: BG, style: styles.heroBg, resizeMode: "cover", fadeDuration: 0 }), /*#__PURE__*/
        _jsx(PhotoScrim, {}), /*#__PURE__*/


        _jsx(BrandLockup, { top: insets.top + 8 }), /*#__PURE__*/
        _jsxs(Pressable, {
          style: [styles.skipBtn, { top: insets.top + 14 }],
          onPress: () => router.replace('/auth/get-started'),
          accessibilityLabel: "Skip onboarding",
          accessibilityRole: "button",
          hitSlop: { top: 12, bottom: 12, left: 12, right: 12 }, children: [/*#__PURE__*/

          _jsx(Text, { style: styles.skipText, children: "Skip" }), /*#__PURE__*/
          _jsx(ChevronRight, { size: 16, color: colors.white, strokeWidth: 2.5 })] }
        ), /*#__PURE__*/


        _jsx(Image, { source: MANDALA_IMG, style: styles.mandala, resizeMode: "contain", fadeDuration: 0 }), /*#__PURE__*/

        _jsx(TopRightCaption, {}), /*#__PURE__*/


        _jsxs(View, { style: styles.productBlock, children: [/*#__PURE__*/
          _jsxs(View, { style: styles.productLabelWrap, pointerEvents: "none", children: [/*#__PURE__*/
            _jsx(Text, { style: styles.productScript, children: "Your" }), /*#__PURE__*/
            _jsx(Text, { style: [styles.productScript, { marginTop: -6 }], children: "Product" }), /*#__PURE__*/
            _jsx(View, { style: styles.productScriptLine }), /*#__PURE__*/

            _jsx(Svg, { width: 42, height: 18, viewBox: "0 0 42 18", style: styles.productSquiggle, children: /*#__PURE__*/
              _jsx(Path, { d: "M4 4 C 12 8, 22 10, 30 12 C 35 13.5, 37 11, 38 8", fill: "none", stroke: colors.handArrowWhite, strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.9 }) }
            )] }
          ), /*#__PURE__*/

          _jsxs(View, { style: styles.vaseCardShadow, children: [/*#__PURE__*/
            _jsx(Image, { source: VASE, style: styles.vaseImg, resizeMode: "cover", fadeDuration: 0 }), /*#__PURE__*/

            _jsx(View, { style: styles.vaseVignette, pointerEvents: "none" })] }
          )] }
        ), /*#__PURE__*/


        _jsx(HandArrow, { style: styles.arrowOne }), /*#__PURE__*/
        _jsx(AiConnectorGraphic, { style: styles.aiPos }), /*#__PURE__*/
        _jsx(FeaturePillStack, { style: styles.pillsPos }), /*#__PURE__*/
        _jsx(HandArrow, { style: styles.arrowTwo, flip: true }), /*#__PURE__*/

        _jsx(PhoneMockCard, { style: styles.phonePos }), /*#__PURE__*/

        _jsx(WaveTransition, {})] }
      ), /*#__PURE__*/


      _jsxs(View, { style: styles.cream, children: [/*#__PURE__*/

        _jsx(Image, { source: TEXTILE, style: styles.textilePeek, resizeMode: "cover", fadeDuration: 0 }), /*#__PURE__*/

        _jsxs(View, { style: styles.creamInner, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.headingDark, children: "From Product to" }), /*#__PURE__*/
          _jsx(Text, { style: styles.headingAccent, children: "Professional Catalog" }), /*#__PURE__*/
          _jsx(View, { style: styles.headingUnderline }), /*#__PURE__*/

          _jsxs(View, { style: styles.subtextRow, children: [/*#__PURE__*/
            _jsxs(Text, { style: styles.subtext, children: ["Upload a photo ", /*#__PURE__*/
              _jsx(Text, { style: styles.subtextBold, children: "and let AI" }), " help create", '\n', "your product name, description,", '\n', "category and tags."] }
            ), /*#__PURE__*/

            _jsx(View, { style: styles.sprigWrap, pointerEvents: "none", children: /*#__PURE__*/
              _jsxs(Svg, { width: 28, height: 46, viewBox: "0 0 28 46", children: [/*#__PURE__*/
                _jsx(Path, { d: "M14 4 C 8 12, 5 22, 7 32 C 9 38, 12 42, 14 44 C 16 42, 19 38, 21 32 C 23 22, 20 12, 14 4 Z", fill: "none", stroke: colors.sprigTan, strokeWidth: 1.2, opacity: 0.45 }), /*#__PURE__*/
                _jsx(Path, { d: "M14 9 L14 40", stroke: colors.sprigTan, strokeWidth: 0.9, opacity: 0.35 }), /*#__PURE__*/
                _jsx(Path, { d: "M14 18 C 10 15, 6 16, 7 20 M14 26 C 18 23, 22 24, 21 28 M14 34 C 10 31, 6 32, 7 36", stroke: colors.sprigTan, strokeWidth: 0.9, strokeLinecap: "round", opacity: 0.4, fill: "none" })] }
              ) }
            )] }
          ), /*#__PURE__*/


          _jsxs(View, { style: styles.dotsRow, pointerEvents: "none", accessibilityLabel: "Onboarding step 2 of 3", children: [/*#__PURE__*/
            _jsx(View, { style: styles.dot }), /*#__PURE__*/
            _jsx(View, { style: [styles.dot, styles.dotActive] }), /*#__PURE__*/
            _jsx(View, { style: styles.dot })] }
          ), /*#__PURE__*/


          _jsxs(Pressable, {
            onPress: () => router.push('/auth/onboarding-3'),
            style: ({ pressed }) => [styles.cta, pressed && styles.ctaPressed],
            accessibilityLabel: "Continue to next screen",
            accessibilityRole: "button", children: [/*#__PURE__*/

            _jsx(Text, { style: styles.ctaText, children: "Continue" }), /*#__PURE__*/
            _jsx(ChevronRight, { size: 20, color: colors.white, strokeWidth: 2.6, style: { marginLeft: 8 } })] }
          ), /*#__PURE__*/


          _jsxs(View, { style: styles.footerScriptWrap, pointerEvents: "none", children: [/*#__PURE__*/
            _jsx(Text, { style: styles.footerScript, children: "Local" }), /*#__PURE__*/
            _jsx(Text, { style: [styles.footerScript, { marginTop: -4 }], children: "Crafts" }), /*#__PURE__*/
            _jsx(Text, { style: [styles.footerScript, { marginTop: -4 }], children: "Global" }), /*#__PURE__*/
            _jsx(Text, { style: [styles.footerScript, { marginTop: -4 }], children: "Opportunities" }), /*#__PURE__*/
            _jsx(View, { style: styles.footerScriptLine })] }
          )] }
        ), /*#__PURE__*/


        _jsx(View, { style: [styles.homeIndicator, { marginBottom: Math.max(insets.bottom, 8) }], pointerEvents: "none" })] }
      )] }
    ));

}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg
  },

  // ── Hero ────────────────────────────────────────────────────────
  hero: {
    height: HERO_HEIGHT,
    width: '100%',
    overflow: 'visible',
    position: 'relative',
    zIndex: 2
  },
  heroBg: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%'
  },
  headerSafe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 44,
    zIndex: 4,
    display: 'none'
  },

  // ── Logo lockup ─────────────────────────────────────────────────
  brandLockup: {
    position: 'absolute',
    left: 16,
    top: 52,
    zIndex: 10,
    width: 110,
    alignItems: 'center'
  },
  logoRingWrap: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoImg: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.white
  },
  wordmark: {
    marginTop: -2,
    fontFamily: typography.fonts.wordmark,
    fontSize: 17,
    letterSpacing: -0.4,
    color: colors.black,
    textShadowColor: colors.logoRingCream,
    textShadowRadius: 3,
    textShadowOffset: { width: 0, height: 1 },
    fontWeight: '800'
  },
  wordmarkSub: {
    marginTop: -1,
    fontFamily: typography.fonts.serifSemiBold,
    fontSize: 8.5,
    letterSpacing: 0.2,
    color: colors.textDark,
    fontStyle: 'italic'
  },

  // ── Skip ────────────────────────────────────────────────────────
  skipBtn: {
    position: 'absolute',
    right: 18,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingLeft: 8
  },
  skipText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 16,
    color: colors.white,
    fontWeight: '500',
    marginRight: 1,
    letterSpacing: 0.2
  },

  // ── Mandala faint (top-right) ───────────────────────────────────
  mandala: {
    position: 'absolute',
    top: 94,
    right: -44,
    width: 168,
    height: 168,
    opacity: 0.14
  },

  // ── Top caption ─────────────────────────────────────────────────
  topCaption: {
    position: 'absolute',
    right: 22,
    top: 148,
    alignItems: 'flex-end',
    zIndex: 5,
    transform: [{ rotate: '-3.5deg' }]
  },
  topScript: {
    fontFamily: typography.fonts.script,
    fontSize: 21,
    lineHeight: 20,
    color: colors.scriptWarm,
    textAlign: 'right',
    textShadowColor: 'rgba(20,12,7,0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  },
  topCaptionLine: {
    marginTop: 4,
    width: 72,
    height: 1.5,
    borderRadius: 1,
    backgroundColor: colors.scriptWarm,
    opacity: 0.9
  },

  // ── Product block ───────────────────────────────────────────────
  productBlock: {
    position: 'absolute',
    left: 0,
    top: H * 0.34,
    zIndex: 6
  },
  productLabelWrap: {
    position: 'absolute',
    left: 14,
    bottom: PRODUCT_HEIGHT + 14,
    zIndex: 7
  },
  productScript: {
    fontFamily: typography.fonts.script,
    fontSize: 24,
    lineHeight: 20,
    color: colors.white,
    textShadowColor: 'rgba(20,12,7,0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3
  },
  productScriptLine: {
    marginTop: 4,
    width: 56,
    height: 1.7,
    borderRadius: 1,
    backgroundColor: colors.scriptWarm,
    marginLeft: 2
  },
  productSquiggle: {
    position: 'absolute',
    left: 42,
    top: 28,
    opacity: 0.95
  },
  vaseCardShadow: {
    width: PRODUCT_WIDTH,
    height: PRODUCT_HEIGHT,
    marginLeft: -10, // bleed off left edge per spec
    borderTopRightRadius: 22,
    borderBottomRightRadius: 22,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderLeftWidth: 0,
    borderColor: 'rgba(248,230,200,0.9)',
    backgroundColor: colors.chipBorder,
    shadowColor: colors.overlayDark,
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 4, height: 8 },
    elevation: 6
  },
  vaseImg: {
    width: '100%',
    height: '100%'
  },
  vaseVignette: {
    ...StyleSheet.absoluteFill,
    borderTopRightRadius: 22,
    borderBottomRightRadius: 22,
    borderWidth: 6,
    borderLeftWidth: 0,
    borderColor: 'rgba(20,12,7,0.08)'
  },

  // ── Hand arrows ─────────────────────────────────────────────────
  handArrow: {
    position: 'absolute',
    zIndex: 7
  },
  handArrowFlip: {
    transform: [{ scaleX: -1 }]
  },
  arrowOne: {
    left: W * 0.30,
    top: H * 0.345
  },
  arrowTwo: {
    left: W * 0.56,
    top: H * 0.43
  },

  // ── AI Badge ────────────────────────────────────────────────────
  aiOuter: {
    position: 'absolute',
    zIndex: 8,
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center'
  },
  aiGlow: {
    ...StyleSheet.absoluteFill,
    borderRadius: 45,
    backgroundColor: 'rgba(255,248,235,0.55)',
    shadowColor: colors.logoRingCream,
    shadowOpacity: 0.9,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4
  },
  aiBadge: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center'
  },
  aiLetters: {
    position: 'absolute',
    fontFamily: typography.fonts.serifBold,
    fontSize: 18,
    color: colors.primary,
    fontWeight: '700',
    letterSpacing: 0.6,
    top: 34
  },
  sparkleWrap: {
    position: 'absolute',
    right: -8,
    top: -6,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sparkleDot: {
    position: 'absolute',
    right: 2,
    top: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.white,
    opacity: 0.95,
    shadowColor: colors.white,
    shadowOpacity: 0.8,
    shadowRadius: 4
  },
  aiPos: {
    left: W * 0.435,
    top: H * 0.355
  },

  // ── Feature pills ───────────────────────────────────────────────
  pillStack: {
    position: 'absolute',
    zIndex: 7,
    gap: 10
  },
  pillsPos: {
    left: W * 0.38,
    top: H * 0.465
  },
  pill: {
    width: Math.min(132, W * 0.34),
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 12,
    backgroundColor: colors.chipBg,
    borderWidth: 1,
    borderColor: colors.chipBorder,
    borderRadius: 14,
    shadowColor: colors.textDark,
    shadowOpacity: 0.10,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },
  pillIconWrap: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(181,80,43,0.10)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pillLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 13.5,
    color: colors.textDark,
    letterSpacing: 0.15,
    fontWeight: '500'
  },

  // ── Phone mockup ────────────────────────────────────────────────
  phoneFrame: {
    position: 'absolute',
    zIndex: 7,
    width: PHONE_W,
    height: PHONE_H,
    backgroundColor: colors.phoneBezel,
    borderRadius: 28,
    padding: 7,
    borderWidth: 1.5,
    borderColor: '#4A3D34',
    shadowColor: colors.overlayDark,
    shadowOpacity: 0.42,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 9,
    transform: [{ rotate: '7deg' }]
  },
  phonePos: {
    right: -8,
    top: H * 0.31
  },
  phoneNotch: {
    width: 42,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.phoneNotch,
    alignSelf: 'center',
    marginBottom: 6,
    opacity: 0.95
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: colors.cardWhite,
    borderRadius: 18,
    overflow: 'hidden'
  },
  phoneImageWrap: {
    width: '100%',
    height: PHONE_H * 0.36,
    position: 'relative',
    overflow: 'hidden',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18
  },
  phoneImage: {
    width: '100%',
    height: '100%'
  },
  phoneImageShade: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(20,12,7,0.04)'
  },
  bookmarkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.textDark,
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }
  },
  phoneBody: {
    flex: 1,
    paddingHorizontal: 11,
    paddingTop: 9,
    paddingBottom: 8
  },
  phoneTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 15,
    lineHeight: 16,
    color: colors.textDark,
    fontWeight: '700'
  },
  phoneDesc: {
    marginTop: 6,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 8.5,
    lineHeight: 11,
    color: colors.textBody
  },
  phoneTagRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8
  },
  phoneTagChip: {
    paddingHorizontal: 7,
    paddingVertical: 3.5,
    borderRadius: 999,
    backgroundColor: colors.chipBg,
    borderWidth: 0.7,
    borderColor: colors.chipBorder
  },
  phoneTagText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 8.2,
    color: colors.textDark,
    fontWeight: '500',
    letterSpacing: 0.1
  },
  phoneCta: {
    marginTop: 10,
    height: 28,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  phoneCtaText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 10.5,
    color: colors.white,
    fontWeight: '600',
    letterSpacing: 0.2
  },

  // ── Wave ────────────────────────────────────────────────────────
  waveWrap: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    zIndex: 3
  },

  // ── Cream section ───────────────────────────────────────────────
  cream: {
    flex: 1,
    backgroundColor: colors.bg,
    marginTop: -2,
    paddingTop: 22,
    paddingBottom: 0,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 340,
    zIndex: 1
  },
  creamInner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10
  },
  textilePeek: {
    position: 'absolute',
    left: -46,
    bottom: -42,
    width: 190,
    height: 200,
    opacity: 0.92,
    transform: [{ rotate: '-12deg' }],
    borderRadius: 12
  },
  headingDark: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 30,
    lineHeight: 34,
    color: colors.textDark,
    fontWeight: '700'
  },
  headingAccent: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 30,
    lineHeight: 34,
    color: colors.primary,
    fontWeight: '700'
  },
  headingUnderline: {
    marginTop: 10,
    width: 42,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary
  },
  subtextRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 36
  },
  subtext: {
    flex: 1,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textBody
  },
  subtextBold: {
    fontFamily: typography.fonts.bodySemiBold,
    color: colors.textBody,
    fontWeight: '600'
  },
  sprigWrap: {
    marginLeft: 10,
    opacity: 0.9
  },

  // ── Dots ────────────────────────────────────────────────────────
  dotsRow: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    opacity: 0.95
  },
  dotActive: {
    width: 26,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary
  },

  // ── CTA ─────────────────────────────────────────────────────────
  cta: {
    marginTop: 18,
    height: 56,
    borderRadius: spacing.borderRadius.pill,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  ctaPressed: {
    backgroundColor: colors.primaryDark
  },
  ctaText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
    letterSpacing: 0.3
  },

  // ── Footer script ───────────────────────────────────────────────
  footerScriptWrap: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    alignItems: 'flex-end',
    transform: [{ rotate: '-3deg' }]
  },
  footerScript: {
    fontFamily: typography.fonts.script,
    fontSize: 18,
    lineHeight: 16,
    color: colors.footerScript,
    textAlign: 'right'
  },
  footerScriptLine: {
    marginTop: 3,
    width: 28,
    height: 1.2,
    borderRadius: 1,
    backgroundColor: colors.footerScript,
    opacity: 0.7,
    alignSelf: 'flex-end'
  },

  // ── Home indicator ──────────────────────────────────────────────
  homeIndicator: {
    width: 118,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.textDark,
    opacity: 0.85,
    alignSelf: 'center',
    marginTop: 10
  }
});