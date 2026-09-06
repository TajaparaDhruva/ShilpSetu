import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, User, Phone, MapPin, Camera, Lightbulb, CheckCircle2 } from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import StepIndicator from '../../components/StepIndicator';
import TextInputField from '../../components/TextInputField';
import PrimaryButton from '../../components/PrimaryButton';
import ScriptCaption from '../../components/ScriptCaption';
import MandalaBackground from '../../components/MandalaBackground';
import { useApp } from '../../context/AppContext';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const LANGUAGES_LIST = ['Hindi', 'English', 'Gujarati', 'Marathi', 'Bengali', 'Tamil'];

export default function ArtisanStep1Screen() {
  const router = useRouter();
  const { artisanProfile, updateArtisanProfile, mobileNumber } = useApp();

  const [fullName, setFullName] = useState(artisanProfile.fullName || 'Meera Patel');
  const [location, setLocation] = useState(artisanProfile.location || 'Kutch, Gujarat');
  const [selectedLangs, setSelectedLangs] = useState(artisanProfile.languages || ['Hindi', 'Gujarati']);

  const toggleLang = (l) => {
    if (selectedLangs.includes(l)) {
      setSelectedLangs(selectedLangs.filter((item) => item !== l));
    } else {
      setSelectedLangs([...selectedLangs, l]);
    }
  };

  const handleNext = () => {
    updateArtisanProfile({ fullName, location, languages: selectedLangs });
    router.push('/setup/artisan-step-2');
  };

  return (/*#__PURE__*/
    _jsxs(View, { style: styles.container, children: [/*#__PURE__*/
      _jsx(MandalaBackground, { position: "top-right", size: 200, opacity: 0.12 }), /*#__PURE__*/


      _jsxs(View, { style: styles.topNav, children: [/*#__PURE__*/
        _jsx(TouchableOpacity, { style: styles.backBtn, onPress: () => router.back(), children: /*#__PURE__*/
          _jsx(ChevronLeft, { size: 22, color: colors.textDark }) }
        ), /*#__PURE__*/
        _jsx(ScriptCaption, { lines: ['Hunar', 'Pahchan', 'Bazaar'], align: "right" })] }
      ), /*#__PURE__*/

      _jsxs(ScrollView, { contentContainerStyle: styles.scrollContent, showsVerticalScrollIndicator: false, children: [/*#__PURE__*/
        _jsx(View, { style: styles.logoWrapper, children: /*#__PURE__*/
          _jsx(Logo, { size: "lg" }) }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.headingBox, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.headingDark, children: "Let's Set Up" }), /*#__PURE__*/
          _jsx(Text, { style: styles.headingPrimary, children: "Your Artisan Profile" }), /*#__PURE__*/
          _jsx(Text, { style: styles.subtext, children: "Tell us about yourself so buyers can trust and discover your craft." }

          )] }
        ), /*#__PURE__*/


        _jsx(StepIndicator, {
          steps: [
          { number: 1, label: 'Basic Info' },
          { number: 2, label: 'Craft Details' },
          { number: 3, label: 'Verification' },
          { number: 4, label: 'Complete' }],

          currentStep: 1 }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.photoRow, children: [/*#__PURE__*/
          _jsxs(View, { style: styles.avatarPlaceholder, children: [/*#__PURE__*/
            _jsx(User, { size: 32, color: colors.textMuted }), /*#__PURE__*/
            _jsx(View, { style: styles.cameraBadge, children: /*#__PURE__*/
              _jsx(Camera, { size: 14, color: colors.white }) }
            )] }
          ), /*#__PURE__*/
          _jsxs(View, { style: styles.photoTextGroup, children: [/*#__PURE__*/
            _jsx(Text, { style: styles.photoTitle, children: "Add Profile Photo" }), /*#__PURE__*/
            _jsx(Text, { style: styles.photoSub, children: "Buyers love seeing the artisan behind the craft." })] }
          )] }
        ), /*#__PURE__*/


        _jsx(TextInputField, {
          label: "Full Name",
          required: true,
          placeholder: "Enter your full name",
          value: fullName,
          onChangeText: setFullName,
          icon: /*#__PURE__*/_jsx(User, { size: 18, color: colors.primary }) }
        ), /*#__PURE__*/

        _jsx(TextInputField, {
          label: "Mobile Number",
          value: mobileNumber,
          editable: false,
          icon: /*#__PURE__*/_jsx(Phone, { size: 18, color: colors.primary }),
          rightElement: /*#__PURE__*/_jsx(CheckCircle2, { size: 18, color: colors.success }) }
        ), /*#__PURE__*/

        _jsx(TextInputField, {
          label: "Your Location",
          required: true,
          placeholder: "Select your city / state / district",
          value: location,
          onChangeText: setLocation,
          icon: /*#__PURE__*/_jsx(MapPin, { size: 18, color: colors.primary }) }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.langSection, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.fieldLabel, children: "Languages You Speak" }), /*#__PURE__*/
          _jsx(View, { style: styles.langWrap, children:
            LANGUAGES_LIST.map((l) => {
              const isSel = selectedLangs.includes(l);
              return (/*#__PURE__*/
                _jsx(TouchableOpacity, {

                  style: [styles.langChip, isSel && styles.langChipActive],
                  onPress: () => toggleLang(l), children: /*#__PURE__*/

                  _jsx(Text, { style: [styles.langText, isSel && styles.langTextActive], children:
                    l }
                  ) }, l
                ));

            }) }
          )] }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.tipBanner, children: [/*#__PURE__*/
          _jsx(Lightbulb, { size: 20, color: colors.warning, style: styles.tipIcon }), /*#__PURE__*/
          _jsxs(Text, { style: styles.tipText, children: [/*#__PURE__*/
            _jsx(Text, { style: { fontWeight: 'bold' }, children: "Tip:" }), " Artisans with a complete profile get 3x more buyer inquiries."] }
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
  photoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.bgAlt,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoTextGroup: {
    marginLeft: 14,
    flex: 1
  },
  photoTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.textDark
  },
  photoSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2
  },
  langSection: {
    marginBottom: 16
  },
  fieldLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 8
  },
  langWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  langChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border
  },
  langChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  langText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.textDark
  },
  langTextActive: {
    color: colors.white
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
  nextBtn: {
    marginTop: 8
  }
});