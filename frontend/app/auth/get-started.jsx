import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Globe } from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import PrimaryButton from '../../components/PrimaryButton';
import OutlineButton from '../../components/OutlineButton';
import ScriptCaption from '../../components/ScriptCaption';
import MandalaBackground from '../../components/MandalaBackground';
import { useApp } from '../../context/AppContext';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function GetStartedScreen() {
  const router = useRouter();
  const { language, setLanguage } = useApp();

  return (/*#__PURE__*/
    _jsxs(View, { style: styles.container, children: [/*#__PURE__*/
      _jsx(MandalaBackground, { position: "top-right", size: 240, opacity: 0.12 }), /*#__PURE__*/


      _jsxs(View, { style: styles.topHeaderContainer, children: [/*#__PURE__*/
        _jsxs(View, { style: styles.topLeftBlob, children: [/*#__PURE__*/
          _jsx(Image, {
            source: { uri: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=300' },
            style: styles.blobPhoto }
          ), /*#__PURE__*/
          _jsx(View, { style: styles.blobOverlay }), /*#__PURE__*/
          _jsx(View, { style: styles.blobScript, children: /*#__PURE__*/
            _jsx(ScriptCaption, { lines: ['Traditional', 'Hands', 'Brighter', 'Futures'], color: colors.white }) }
          )] }
        ), /*#__PURE__*/

        _jsx(View, { style: styles.topRightScript, children: /*#__PURE__*/
          _jsx(ScriptCaption, { lines: ['People', 'Crafts', 'Possibilities'], align: "right" }) }
        )] }
      ), /*#__PURE__*/

      _jsxs(ScrollView, { contentContainerStyle: styles.scrollContent, showsVerticalScrollIndicator: false, children: [/*#__PURE__*/

        _jsx(View, { style: styles.logoWrapper, children: /*#__PURE__*/
          _jsx(Logo, { size: "lg" }) }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.headingBox, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.headingDark, children: "A Smarter Way" }), /*#__PURE__*/
          _jsx(Text, { style: styles.headingPrimary, children: "for Artisans and Buyers" }), /*#__PURE__*/
          _jsx(Text, { style: styles.headingDark, children: "to Connect." }), /*#__PURE__*/

          _jsx(Text, { style: styles.subtext, children: "Empowering Indian craftsmanship with technology, opportunity and a wider world." }

          )] }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.buttonContainer, children: [/*#__PURE__*/
          _jsx(PrimaryButton, {
            label: "Create Account",
            onPress: () => router.push('/auth/login'),
            style: styles.mainBtn }
          ), /*#__PURE__*/
          _jsx(OutlineButton, {
            label: "Login",
            onPress: () => router.push('/auth/login'),
            style: styles.subBtn }
          )] }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.langRow, children: [/*#__PURE__*/
          _jsx(Globe, { size: 18, color: colors.textDark }), /*#__PURE__*/
          _jsx(TouchableOpacity, { onPress: () => setLanguage('hi'), children: /*#__PURE__*/
            _jsx(Text, { style: [styles.langOption, language === 'hi' && styles.langActive], children: "\u0939\u093F\u0902\u0926\u0940" }

            ) }
          ), /*#__PURE__*/
          _jsx(Text, { style: styles.divider, children: "|" }), /*#__PURE__*/
          _jsx(TouchableOpacity, { onPress: () => setLanguage('en'), children: /*#__PURE__*/
            _jsx(Text, { style: [styles.langOption, language === 'en' && styles.langActive], children: "English" }

            ) }
          )] }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.footerRow, children: [/*#__PURE__*/
          _jsx(ScriptCaption, { lines: ['Local Crafts', 'Global Opportunities'] }), /*#__PURE__*/
          _jsx(Image, {
            source: { uri: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=300' },
            style: styles.footerImg }
          )] }
        )] }
      )] }
    ));

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: 40
  },
  topHeaderContainer: {
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20
  },
  topLeftBlob: {
    width: 140,
    height: 120,
    borderBottomRightRadius: 60,
    overflow: 'hidden',
    position: 'relative'
  },
  blobPhoto: {
    width: '100%',
    height: '100%'
  },
  blobOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(30, 18, 10, 0.45)'
  },
  blobScript: {
    position: 'absolute',
    top: 16,
    left: 16
  },
  topRightScript: {
    marginTop: 20
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24
  },
  logoWrapper: {
    alignItems: 'center',
    marginVertical: 12
  },
  headingBox: {
    alignItems: 'center',
    marginVertical: 16
  },
  headingDark: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 26,
    color: colors.textDark,
    textAlign: 'center'
  },
  headingPrimary: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 26,
    color: colors.primary,
    textAlign: 'center',
    marginVertical: 2
  },
  subtext: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 14,
    color: colors.textBody,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 12
  },
  buttonContainer: {
    marginVertical: 20,
    gap: 12
  },
  mainBtn: {},
  subBtn: {},
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 12
  },
  langOption: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 14,
    color: colors.textDark
  },
  langActive: {
    color: colors.primary,
    fontFamily: typography.fonts.bodySemiBold,
    textDecorationLine: 'underline'
  },
  divider: {
    color: colors.textMuted
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 20
  },
  footerImg: {
    width: 90,
    height: 60,
    borderRadius: 12,
    opacity: 0.8
  }
});