import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Lightbulb } from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import StepIndicator from '../../components/StepIndicator';
import PrimaryButton from '../../components/PrimaryButton';
import ScriptCaption from '../../components/ScriptCaption';
import MandalaBackground from '../../components/MandalaBackground';
import { useApp } from '../../context/AppContext';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const CATEGORIES = [
'Pottery',
'Textiles & Sarees',
'Jewelry',
'Wood Carving',
'Metal Craft',
'Paintings',
'Home Decor',
'Bags & Accessories'];


const BUDGET_PRESETS = [
'Under ₹500',
'₹500 – ₹1,500',
'₹1,500 – ₹5,000',
'₹5,000+'];


export default function BuyerStep2Screen() {
  const router = useRouter();
  const { buyerProfile, updateBuyerProfile } = useApp();

  const [selectedBudget, setSelectedBudget] = useState('₹500 – ₹1,500');
  const [selectedCats, setSelectedCats] = useState(buyerProfile.preferredCategories || ['Pottery', 'Home Decor']);
  const [prefLang, setPrefLang] = useState(buyerProfile.language || 'Both');

  const toggleCategory = (cat) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter((c) => c !== cat));
    } else {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  const handleNext = () => {
    updateBuyerProfile({
      preferredCategories: selectedCats,
      language: prefLang
    });
    router.push('/setup/buyer-step-3');
  };

  return (/*#__PURE__*/
    _jsxs(View, { style: styles.container, children: [/*#__PURE__*/
      _jsx(MandalaBackground, { position: "top-right", size: 200, opacity: 0.12 }), /*#__PURE__*/


      _jsxs(View, { style: styles.topNav, children: [/*#__PURE__*/
        _jsx(TouchableOpacity, { style: styles.backBtn, onPress: () => router.back(), children: /*#__PURE__*/
          _jsx(ChevronLeft, { size: 22, color: colors.textDark }) }
        ), /*#__PURE__*/
        _jsx(ScriptCaption, { lines: ['Curated', 'Crafts', 'Tailored'], align: "right" })] }
      ), /*#__PURE__*/

      _jsxs(ScrollView, { contentContainerStyle: styles.scrollContent, showsVerticalScrollIndicator: false, children: [/*#__PURE__*/
        _jsx(View, { style: styles.logoWrapper, children: /*#__PURE__*/
          _jsx(Logo, { size: "lg" }) }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.headingBox, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.headingDark, children: "Tell Us Your" }), /*#__PURE__*/
          _jsx(Text, { style: styles.headingPrimary, children: "Shopping Preferences" }), /*#__PURE__*/
          _jsx(Text, { style: styles.subtext, children: "This helps our AI recommend the right products and artisans to you." }

          )] }
        ), /*#__PURE__*/


        _jsx(StepIndicator, { currentStep: 2 }), /*#__PURE__*/


        _jsxs(View, { style: styles.section, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.sectionTitle, children: "Budget Range" }), /*#__PURE__*/
          _jsx(View, { style: styles.presetRow, children:
            BUDGET_PRESETS.map((b) => {
              const isSel = selectedBudget === b;
              return (/*#__PURE__*/
                _jsx(TouchableOpacity, {

                  style: [styles.presetChip, isSel && styles.presetChipActive],
                  onPress: () => setSelectedBudget(b), children: /*#__PURE__*/

                  _jsx(Text, { style: [styles.presetText, isSel && styles.presetTextActive], children:
                    b }
                  ) }, b
                ));

            }) }
          )] }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.section, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.sectionTitle, children: "Preferred Categories" }), /*#__PURE__*/
          _jsx(View, { style: styles.chipWrap, children:
            CATEGORIES.map((cat) => {
              const isSel = selectedCats.includes(cat);
              return (/*#__PURE__*/
                _jsx(TouchableOpacity, {

                  style: [styles.chip, isSel && styles.chipActive],
                  onPress: () => toggleCategory(cat), children: /*#__PURE__*/

                  _jsx(Text, { style: [styles.chipText, isSel && styles.chipTextActive], children:
                    cat }
                  ) }, cat
                ));

            }) }
          )] }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.section, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.sectionTitle, children: "Preferred Communication Language" }), /*#__PURE__*/
          _jsx(View, { style: styles.langRow, children:
            ['English', 'हिंदी', 'Both'].map((l) => {
              const isSel = prefLang === l;
              return (/*#__PURE__*/
                _jsx(TouchableOpacity, {

                  style: [styles.langPill, isSel && styles.langPillActive],
                  onPress: () => setPrefLang(l), children: /*#__PURE__*/

                  _jsx(Text, { style: [styles.langPillText, isSel && styles.langPillTextActive], children:
                    l }
                  ) }, l
                ));

            }) }
          )] }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.tipBanner, children: [/*#__PURE__*/
          _jsx(Lightbulb, { size: 20, color: colors.warning, style: styles.tipIcon }), /*#__PURE__*/
          _jsxs(Text, { style: styles.tipText, children: [/*#__PURE__*/
            _jsx(Text, { style: { fontWeight: 'bold' }, children: "Tip:" }), " You can update your preferences anytime from Settings."] }
          )] }
        ), /*#__PURE__*/


        _jsx(PrimaryButton, {
          label: "Next",
          onPress: handleNext,
          style: styles.nextBtn }
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
  section: {
    marginVertical: 10
  },
  sectionTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 8
  },
  presetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  presetChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border
  },
  presetChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  presetText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.textDark
  },
  presetTextActive: {
    color: colors.white
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  chipText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 13,
    color: colors.textDark
  },
  chipTextActive: {
    color: colors.white
  },
  langRow: {
    flexDirection: 'row',
    gap: 10
  },
  langPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center'
  },
  langPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  langPillText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 13,
    color: colors.textDark
  },
  langPillTextActive: {
    color: colors.white
  },
  tipBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryTint10,
    padding: 12,
    borderRadius: 14,
    marginVertical: 16
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
  nextBtn: {
    marginTop: 8
  }
});