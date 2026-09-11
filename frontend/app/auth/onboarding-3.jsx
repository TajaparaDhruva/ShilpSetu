import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import PrimaryButton from '../../components/PrimaryButton';
import ProgressDots from '../../components/ProgressDots';
import ScriptCaption from '../../components/ScriptCaption';
import MandalaBackground from '../../components/MandalaBackground';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function Onboarding3() {
  const router = useRouter();

  return (/*#__PURE__*/
    _jsxs(View, { style: styles.container, children: [/*#__PURE__*/
      _jsx(MandalaBackground, { position: "top-right", size: 200, opacity: 0.12 }), /*#__PURE__*/


      _jsxs(View, { style: styles.topBar, children: [/*#__PURE__*/
        _jsx(View, { style: { flex: 1 } }), /*#__PURE__*/
        _jsx(Logo, { size: "sm", showSubtitle: false }), /*#__PURE__*/
        _jsx(View, { style: { flex: 1, alignItems: 'flex-end' }, children: /*#__PURE__*/
          _jsx(TouchableOpacity, { onPress: () => router.push('/auth/get-started'), children: /*#__PURE__*/
            _jsx(Text, { style: styles.skipText, children: "Skip \u2192" }) }
          ) }
        )] }
      ), /*#__PURE__*/

      _jsxs(ScrollView, { contentContainerStyle: styles.scrollContent, showsVerticalScrollIndicator: false, children: [/*#__PURE__*/

        _jsxs(View, { style: styles.headingBox, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.headingDark, children: "The Right Buyer." }), /*#__PURE__*/
          _jsx(Text, { style: styles.headingPrimary, children: "The Right Artisan." }), /*#__PURE__*/
          _jsx(View, { style: styles.underline }), /*#__PURE__*/

          _jsxs(Text, { style: styles.subtext, children: ["Buyers describe what they need. AI finds artisans who can ", /*#__PURE__*/
            _jsx(Text, { style: { fontWeight: 'bold', color: colors.textDark }, children: "actually" }), " fulfill the requirement."] }
          )] }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.matchContainer, children: [/*#__PURE__*/

          _jsxs(View, { style: styles.columnItem, children: [/*#__PURE__*/

            _jsx(View, { style: styles.speechBubble, children: /*#__PURE__*/
              _jsx(Text, { style: styles.speechText, children: "\uD83D\uDECD I need 100 handwoven cotton bags with traditional prints" }

              ) }
            ), /*#__PURE__*/

            _jsx(Image, {
              source: { uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300' },
              style: styles.circleAvatar }
            ), /*#__PURE__*/
            _jsx(Text, { style: styles.roleTitle, children: "Buyer" }), /*#__PURE__*/
            _jsx(Text, { style: styles.roleSub, children: "Describes requirement" })] }
          ), /*#__PURE__*/


          _jsxs(View, { style: styles.centerItem, children: [/*#__PURE__*/
            _jsxs(View, { style: styles.aiCircle, children: [/*#__PURE__*/
              _jsx(Sparkles, { size: 20, color: colors.white }), /*#__PURE__*/
              _jsx(Text, { style: styles.aiBadgeText, children: "AI" })] }
            ), /*#__PURE__*/
            _jsx(Text, { style: styles.matchTitle, children: "AI Matches" }), /*#__PURE__*/
            _jsx(Text, { style: styles.matchSub, children: "Understands needs & finds right artisans" })] }
          ), /*#__PURE__*/


          _jsxs(View, { style: styles.columnItem, children: [/*#__PURE__*/
            _jsx(Image, {
              source: { uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300' },
              style: styles.circleAvatar }
            ), /*#__PURE__*/
            _jsx(Text, { style: styles.roleTitle, children: "Artisan" }), /*#__PURE__*/
            _jsx(Text, { style: styles.roleSub, children: "Gets relevant opportunities" })] }
          )] }
        ), /*#__PURE__*/


        _jsx(View, { style: styles.scriptCenter, children: /*#__PURE__*/
          _jsx(ScriptCaption, { lines: ['Stronger', 'Artisans', 'Brighter India'], align: "center" }) }
        )] }
      ), /*#__PURE__*/


      _jsxs(View, { style: styles.bottomSection, children: [/*#__PURE__*/
        _jsx(ProgressDots, { total: 3, active: 3 }), /*#__PURE__*/

        _jsx(PrimaryButton, {
          label: "Get Started",
          onPress: () => router.push('/auth/get-started'),
          style: styles.button }
        )] }
      )] }
    ));

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: 48
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16
  },
  skipText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '600'
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  headingBox: {
    alignItems: 'center',
    marginVertical: 12
  },
  headingDark: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 28,
    color: colors.textDark,
    textAlign: 'center'
  },
  headingPrimary: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 28,
    color: colors.primary,
    textAlign: 'center'
  },
  underline: {
    height: 2,
    width: 40,
    backgroundColor: colors.primary,
    marginVertical: 8,
    borderRadius: 1
  },
  subtext: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 14,
    color: colors.textBody,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 4
  },
  matchContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 24
  },
  columnItem: {
    flex: 1,
    alignItems: 'center'
  },
  speechBubble: {
    backgroundColor: colors.surface,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8
  },
  speechText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textDark,
    textAlign: 'center'
  },
  circleAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: colors.primary
  },
  roleTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
    color: colors.textDark,
    marginTop: 6
  },
  roleSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 2
  },
  centerItem: {
    width: 90,
    alignItems: 'center',
    paddingHorizontal: 4,
    marginTop: 24
  },
  aiCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6
  },
  aiBadgeText: {
    fontSize: 11,
    color: colors.white,
    fontWeight: 'bold'
  },
  matchTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.primary
  },
  matchSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 2
  },
  scriptCenter: {
    alignItems: 'center',
    marginVertical: 12
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: colors.bg
  },
  button: {
    marginTop: 8
  }
});