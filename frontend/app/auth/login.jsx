import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Phone } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import PrimaryButton from '../../components/PrimaryButton';
import OutlineButton from '../../components/OutlineButton';
import ScriptCaption from '../../components/ScriptCaption';
import MandalaBackground from '../../components/MandalaBackground';
import { useApp } from '../../context/AppContext';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

function GoogleIcon() {
  return (/*#__PURE__*/
    _jsxs(Svg, { width: "18", height: "18", viewBox: "0 0 24 24", children: [/*#__PURE__*/
      _jsx(Path, {
        d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
        fill: "#4285F4" }
      ), /*#__PURE__*/
      _jsx(Path, {
        d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
        fill: "#34A853" }
      ), /*#__PURE__*/
      _jsx(Path, {
        d: "M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z",
        fill: "#FBBC05" }
      ), /*#__PURE__*/
      _jsx(Path, {
        d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z",
        fill: "#EA4335" }
      )] }
    ));

}

export default function LoginScreen() {
  const router = useRouter();
  const { mobileNumber, setMobileNumber } = useApp();
  const [phone, setPhone] = useState(mobileNumber.replace('+91 ', ''));

  const handleSendOtp = () => {
    const fullNum = `+91 ${phone || '98765 43210'}`;
    setMobileNumber(fullNum);
    router.push('/auth/otp-verify');
  };

  return (/*#__PURE__*/
    _jsxs(View, { style: styles.container, children: [/*#__PURE__*/
      _jsx(MandalaBackground, { position: "bottom-left", size: 200, opacity: 0.12 }), /*#__PURE__*/


      _jsxs(View, { style: styles.topRightPhotoWrapper, children: [/*#__PURE__*/
        _jsx(Image, {
          source: { uri: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400' },
          style: styles.topRightPhoto }
        ), /*#__PURE__*/
        _jsx(View, { style: styles.photoOverlay }), /*#__PURE__*/
        _jsx(View, { style: styles.topRightScript, children: /*#__PURE__*/
          _jsx(ScriptCaption, { lines: ['Crafting Connections', 'for a Brighter Tomorrow'], color: colors.white, align: "right" }) }
        ), /*#__PURE__*/
        _jsx(View, { style: styles.paintBadge, children: /*#__PURE__*/
          _jsx(Text, { style: styles.paintBadgeText, children: "Same Tradition New Opportunities" }) }
        )] }
      ), /*#__PURE__*/

      _jsxs(ScrollView, { contentContainerStyle: styles.scrollContent, showsVerticalScrollIndicator: false, children: [/*#__PURE__*/

        _jsx(View, { style: styles.logoRow, children: /*#__PURE__*/
          _jsx(Logo, { size: "sm", showSubtitle: false }) }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.formContainer, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.headingDark, children: "Welcome" }), /*#__PURE__*/
          _jsx(Text, { style: styles.headingPrimary, children: "back" }), /*#__PURE__*/
          _jsx(Text, { style: styles.subtext, children: "Sign in to continue to ShilpSetu." }), /*#__PURE__*/


          _jsx(Text, { style: styles.fieldLabel, children: "Mobile Number" }), /*#__PURE__*/
          _jsxs(View, { style: styles.phoneInputRow, children: [/*#__PURE__*/
            _jsx(Text, { style: styles.countryCode, children: "+91" }), /*#__PURE__*/
            _jsx(View, { style: styles.verticalDivider }), /*#__PURE__*/
            _jsx(TextInput, {
              style: styles.phoneInput,
              placeholder: "Enter your mobile number",
              placeholderTextColor: colors.textMuted,
              keyboardType: "phone-pad",
              value: phone,
              onChangeText: setPhone,
              maxLength: 10 }
            ), /*#__PURE__*/
            _jsx(Phone, { size: 18, color: colors.primary })] }
          ), /*#__PURE__*/

          _jsx(PrimaryButton, {
            label: "Send OTP",
            onPress: handleSendOtp,
            style: styles.sendBtn }
          ), /*#__PURE__*/


          _jsxs(View, { style: styles.orDividerRow, children: [/*#__PURE__*/
            _jsx(View, { style: styles.line }), /*#__PURE__*/
            _jsx(Text, { style: styles.orText, children: "OR" }), /*#__PURE__*/
            _jsx(View, { style: styles.line })] }
          ), /*#__PURE__*/


          _jsx(OutlineButton, {
            label: "Continue with Google",
            icon: /*#__PURE__*/_jsx(GoogleIcon, {}),
            iconPosition: "left",
            onPress: () => router.push('/auth/role-select'),
            style: styles.googleBtn,
            textStyle: { color: colors.textDark } }
          ), /*#__PURE__*/


          _jsxs(Text, { style: styles.termsText, children: ["By continuing, you agree to our",
            ' ', /*#__PURE__*/
            _jsx(Text, { style: styles.termsLink, children: "Terms of Service" }), " and", ' ', /*#__PURE__*/
            _jsx(Text, { style: styles.termsLink, children: "Privacy Policy." })] }
          )] }
        ), /*#__PURE__*/


        _jsx(View, { style: styles.footerAccent, children: /*#__PURE__*/
          _jsx(ScriptCaption, { lines: ['Indian Crafts', 'Global Dreams'] }) }
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
  topRightPhotoWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '45%',
    height: 180,
    borderBottomLeftRadius: 40,
    overflow: 'hidden'
  },
  topRightPhoto: {
    width: '100%',
    height: '100%'
  },
  photoOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(30, 18, 10, 0.45)'
  },
  topRightScript: {
    position: 'absolute',
    top: 50,
    right: 12
  },
  paintBadge: {
    position: 'absolute',
    bottom: 12,
    right: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8
  },
  paintBadgeText: {
    fontFamily: typography.fonts.script,
    fontSize: 11,
    color: colors.white
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24
  },
  logoRow: {
    marginBottom: 20,
    marginTop: 10
  },
  formContainer: {
    width: '100%',
    maxWidth: 400
  },
  headingDark: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 32,
    color: colors.textDark
  },
  headingPrimary: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 32,
    color: colors.primary,
    marginBottom: 4
  },
  subtext: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 14,
    color: colors.textBody,
    marginBottom: 24
  },
  fieldLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 6
  },
  phoneInputRow: {
    height: 52,
    backgroundColor: colors.bgAlt,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 20
  },
  countryCode: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.textDark
  },
  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
    marginHorizontal: 10
  },
  phoneInput: {
    flex: 1,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 15,
    color: colors.textDark
  },
  sendBtn: {
    marginBottom: 20
  },
  orDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border
  },
  orText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.textMuted,
    marginHorizontal: 12
  },
  googleBtn: {
    borderColor: colors.border,
    marginVertical: 12
  },
  termsText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 16
  },
  termsLink: {
    color: colors.primary,
    textDecorationLine: 'underline'
  },
  footerAccent: {
    marginTop: 36
  }
});