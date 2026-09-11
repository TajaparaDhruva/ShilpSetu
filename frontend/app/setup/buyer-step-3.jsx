import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Check, Lightbulb } from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import StepIndicator from '../../components/StepIndicator';
import PrimaryButton from '../../components/PrimaryButton';
import ScriptCaption from '../../components/ScriptCaption';
import MandalaBackground from '../../components/MandalaBackground';
import { useApp } from '../../context/AppContext';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const INTERESTS = [
{ id: '1', title: 'Pottery & Ceramics', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=300' },
{ id: '2', title: 'Handloom & Weaving', image: 'https://images.unsplash.com/photo-1606744888344-49423b812d02?q=80&w=300' },
{ id: '3', title: 'Jewelry Making', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=300' },
{ id: '4', title: 'Wood & Bamboo Craft', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=300' },
{ id: '5', title: 'Metal & Brass Work', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=300' },
{ id: '6', title: 'Painting & Art', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=300' }];


export default function BuyerStep3Screen() {
  const router = useRouter();
  const { buyerProfile, updateBuyerProfile } = useApp();

  const [selectedInterests, setSelectedInterests] = useState(
    buyerProfile.interests.length ? buyerProfile.interests : ['1', '2', '3']
  );

  const toggleInterest = (id) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleComplete = () => {
    updateBuyerProfile({ interests: selectedInterests });
    router.replace('/(tabs)');
  };

  const isVal = selectedInterests.length >= 3;

  return (/*#__PURE__*/
    _jsxs(View, { style: styles.container, children: [/*#__PURE__*/
      _jsx(MandalaBackground, { position: "top-right", size: 200, opacity: 0.12 }), /*#__PURE__*/


      _jsxs(View, { style: styles.topNav, children: [/*#__PURE__*/
        _jsx(TouchableOpacity, { style: styles.backBtn, onPress: () => router.back(), children: /*#__PURE__*/
          _jsx(ChevronLeft, { size: 22, color: colors.textDark }) }
        ), /*#__PURE__*/
        _jsx(ScriptCaption, { lines: ['Artisan', 'Passions', 'Global Reach'], align: "right" })] }
      ), /*#__PURE__*/

      _jsxs(ScrollView, { contentContainerStyle: styles.scrollContent, showsVerticalScrollIndicator: false, children: [/*#__PURE__*/
        _jsx(View, { style: styles.logoWrapper, children: /*#__PURE__*/
          _jsx(Logo, { size: "lg" }) }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.headingBox, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.headingDark, children: "What Craft" }), /*#__PURE__*/
          _jsx(Text, { style: styles.headingPrimary, children: "Interests You Most?" }), /*#__PURE__*/
          _jsx(Text, { style: styles.subtext, children: "Pick a few \u2014 we'll personalize your Discover feed around these." }

          )] }
        ), /*#__PURE__*/


        _jsx(StepIndicator, { currentStep: 3 }), /*#__PURE__*/


        _jsx(View, { style: styles.grid, children:
          INTERESTS.map((item) => {
            const isSel = selectedInterests.includes(item.id);
            return (/*#__PURE__*/
              _jsxs(TouchableOpacity, {

                activeOpacity: 0.85,
                style: [styles.card, isSel && styles.cardSelected],
                onPress: () => toggleInterest(item.id), children: [/*#__PURE__*/

                _jsx(Image, { source: { uri: item.image }, style: styles.cardImg }),
                isSel && /*#__PURE__*/
                _jsx(View, { style: styles.checkBadge, children: /*#__PURE__*/
                  _jsx(Check, { size: 12, color: colors.white }) }
                ), /*#__PURE__*/

                _jsx(Text, { style: styles.cardTitle, children: item.title })] }, item.id
              ));

          }) }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.tipBanner, children: [/*#__PURE__*/
          _jsx(Lightbulb, { size: 20, color: colors.warning, style: styles.tipIcon }), /*#__PURE__*/
          _jsxs(Text, { style: styles.tipText, children: [/*#__PURE__*/
            _jsx(Text, { style: { fontWeight: 'bold' }, children: "Tip:" }), " Select at least 3 interests for the best recommendations."] }
          )] }
        ), /*#__PURE__*/


        _jsx(PrimaryButton, {
          label: "Complete Setup",
          onPress: handleComplete,
          disabled: !isVal,
          style: styles.completeBtn }
        )] }
      )] }
    ));

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: 44
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 4
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24
  },
  logoWrapper: {
    alignItems: 'center',
    marginVertical: 8
  },
  headingBox: {
    alignItems: 'center',
    marginVertical: 8
  },
  headingDark: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 26,
    color: colors.textDark
  },
  headingPrimary: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 26,
    color: colors.primary,
    marginBottom: 4
  },
  subtext: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    textAlign: 'center'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginVertical: 12
  },
  card: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: 8,
    alignItems: 'center',
    position: 'relative'
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.bgAlt
  },
  cardImg: {
    width: '100%',
    height: 80,
    borderRadius: 10,
    marginBottom: 6
  },
  checkBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.textDark,
    textAlign: 'center'
  },
  tipBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryTint10,
    padding: 12,
    borderRadius: 14,
    marginVertical: 12
  },
  tipIcon: {
    marginRight: 10
  },
  tipText: {
    flex: 1,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textDark,
    lineHeight: 16
  },
  completeBtn: {
    marginTop: 8
  }
});