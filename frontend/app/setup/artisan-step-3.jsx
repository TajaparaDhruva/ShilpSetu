import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, UploadCloud, User, CreditCard, Check, Lightbulb } from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import StepIndicator from '../../components/StepIndicator';
import TextInputField from '../../components/TextInputField';
import PrimaryButton from '../../components/PrimaryButton';
import ScriptCaption from '../../components/ScriptCaption';
import MandalaBackground from '../../components/MandalaBackground';
import { useApp } from '../../context/AppContext';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function ArtisanStep3Screen() {
  const router = useRouter();
  const { artisanProfile, updateArtisanProfile, setRole } = useApp();

  const [accountHolder, setAccountHolder] = useState(artisanProfile.accountHolder || '');
  const [upiId, setUpiId] = useState(artisanProfile.upiId || '');
  const [agreed, setAgreed] = useState(true);

  const handleComplete = () => {
    updateArtisanProfile({ accountHolder, upiId });
    setRole('artisan');
    router.replace('/(artisan-tabs)/home');
  };

  return (/*#__PURE__*/
    _jsxs(View, { style: styles.container, children: [/*#__PURE__*/
      _jsx(MandalaBackground, { position: "top-right", size: 200, opacity: 0.12 }), /*#__PURE__*/


      _jsxs(View, { style: styles.topNav, children: [/*#__PURE__*/
        _jsx(TouchableOpacity, { style: styles.backBtn, onPress: () => router.back(), children: /*#__PURE__*/
          _jsx(ChevronLeft, { size: 22, color: colors.textDark }) }
        ), /*#__PURE__*/
        _jsx(ScriptCaption, { lines: ['Verified', 'Artisan', 'Trust'], align: "right" })] }
      ), /*#__PURE__*/

      _jsxs(ScrollView, { contentContainerStyle: styles.scrollContent, showsVerticalScrollIndicator: false, children: [/*#__PURE__*/
        _jsx(View, { style: styles.logoWrapper, children: /*#__PURE__*/
          _jsx(Logo, { size: "lg" }) }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.headingBox, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.headingDark, children: "Almost" }), /*#__PURE__*/
          _jsx(Text, { style: styles.headingPrimary, children: "There!" }), /*#__PURE__*/
          _jsx(Text, { style: styles.subtext, children: "A few final details to activate your seller account." }

          )] }
        ), /*#__PURE__*/


        _jsx(StepIndicator, {
          steps: [
          { number: 1, label: 'Basic Info' },
          { number: 2, label: 'Craft Details' },
          { number: 3, label: 'Verification' },
          { number: 4, label: 'Complete' }],

          currentStep: 3 }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.uploadCard, children: [/*#__PURE__*/
          _jsx(UploadCloud, { size: 32, color: colors.primary }), /*#__PURE__*/
          _jsx(Text, { style: styles.uploadTitle, children: "Upload ID / Craft Certificate (optional)" }), /*#__PURE__*/
          _jsx(Text, { style: styles.uploadSub, children: "Tap to upload a photo or PDF" }), /*#__PURE__*/
          _jsx(Text, { style: styles.uploadNote, children: "Helps build buyer trust \u2014 you can add this later too." })] }
        ), /*#__PURE__*/

        _jsx(TextInputField, {
          label: "Bank Account Holder Name",
          placeholder: "Enter name as on bank account",
          value: accountHolder,
          onChangeText: setAccountHolder,
          icon: /*#__PURE__*/_jsx(User, { size: 18, color: colors.primary }) }
        ), /*#__PURE__*/

        _jsx(TextInputField, {
          label: "UPI ID / Account Number",
          placeholder: "e.g. name@upi or Account No.",
          value: upiId,
          onChangeText: setUpiId,
          icon: /*#__PURE__*/_jsx(CreditCard, { size: 18, color: colors.primary }) }
        ), /*#__PURE__*/


        _jsxs(TouchableOpacity, {
          activeOpacity: 0.8,
          style: styles.checkboxRow,
          onPress: () => setAgreed(!agreed), children: [/*#__PURE__*/

          _jsx(View, { style: [styles.checkbox, agreed && styles.checkboxChecked], children:
            agreed && /*#__PURE__*/_jsx(Check, { size: 12, color: colors.white }) }
          ), /*#__PURE__*/
          _jsxs(Text, { style: styles.checkboxLabel, children: ["I agree to ShilpSetu's",
            ' ', /*#__PURE__*/
            _jsx(Text, { style: styles.termsLink, children: "Seller Terms & Community Guidelines" })] }
          )] }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.tipBanner, children: [/*#__PURE__*/
          _jsx(Lightbulb, { size: 20, color: colors.warning, style: styles.tipIcon }), /*#__PURE__*/
          _jsxs(Text, { style: styles.tipText, children: [/*#__PURE__*/
            _jsx(Text, { style: { fontWeight: 'bold' }, children: "Tip:" }), " You can complete payment details anytime from Settings before your first sale."] }
          )] }
        ), /*#__PURE__*/


        _jsx(PrimaryButton, {
          label: "Complete Setup",
          onPress: handleComplete,
          disabled: !agreed,
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
  uploadCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    padding: 20,
    alignItems: 'center',
    marginBottom: 16
  },
  uploadTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
    color: colors.textDark,
    marginTop: 8
  },
  uploadSub: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.primary,
    marginTop: 2
  },
  uploadNote: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.bgAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  checkboxLabel: {
    flex: 1,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textDark,
    lineHeight: 16
  },
  termsLink: {
    color: colors.primary,
    textDecorationLine: 'underline'
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