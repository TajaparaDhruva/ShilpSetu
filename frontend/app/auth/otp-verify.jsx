import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import OtpInput from '../../components/OtpInput';
import PrimaryButton from '../../components/PrimaryButton';
import ScriptCaption from '../../components/ScriptCaption';
import MandalaBackground from '../../components/MandalaBackground';
import { useApp } from '../../context/AppContext';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function OtpVerifyScreen() {
  const router = useRouter();
  const { mobileNumber } = useApp();
  const [timer, setTimer] = useState(28);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = () => {
    router.push('/auth/role-select');
  };

  const formattedTimer = `00:${timer < 10 ? `0${timer}` : timer}`;

  return (/*#__PURE__*/
    _jsxs(View, { style: styles.container, children: [/*#__PURE__*/
      _jsx(MandalaBackground, { position: "top-right", size: 220, opacity: 0.12 }), /*#__PURE__*/


      _jsxs(View, { style: styles.topNav, children: [/*#__PURE__*/
        _jsx(TouchableOpacity, { style: styles.backBtn, onPress: () => router.back(), children: /*#__PURE__*/
          _jsx(ChevronLeft, { size: 22, color: colors.textDark }) }
        ), /*#__PURE__*/
        _jsx(ScriptCaption, { lines: ['Crafting', 'Connections', 'for a Brighter', 'Tomorrow'], align: "right" })] }
      ), /*#__PURE__*/

      _jsxs(ScrollView, { contentContainerStyle: styles.scrollContent, showsVerticalScrollIndicator: false, children: [/*#__PURE__*/

        _jsx(View, { style: styles.logoWrapper, children: /*#__PURE__*/
          _jsx(Logo, { size: "lg" }) }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.headingBox, children: [/*#__PURE__*/
          _jsxs(Text, { style: styles.headingDark, children: ["Verify Your ", /*#__PURE__*/
            _jsx(Text, { style: { color: colors.primary }, children: "Number" })] }
          ), /*#__PURE__*/
          _jsx(View, { style: styles.underline }), /*#__PURE__*/

          _jsx(Text, { style: styles.subtext, children: "We have sent a 6-digit OTP to" }

          ), /*#__PURE__*/
          _jsx(Text, { style: styles.phoneText, children: mobileNumber }), /*#__PURE__*/
          _jsx(Text, { style: styles.subtext, children: "Enter the code below to continue" })] }
        ), /*#__PURE__*/


        _jsx(OtpInput, {
          length: 6,
          onCodeChanged: setCode,
          onCodeFilled: (c) => {
            setCode(c);
          } }
        ), /*#__PURE__*/


        _jsxs(Text, { style: styles.timerText, children: ["Resend OTP in ", /*#__PURE__*/
          _jsx(Text, { style: styles.timerBold, children: formattedTimer })] }
        ), /*#__PURE__*/


        _jsx(PrimaryButton, {
          label: "Verify OTP",
          onPress: handleVerify,
          style: styles.verifyBtn }
        ), /*#__PURE__*/


        _jsx(TouchableOpacity, {
          disabled: timer > 0,
          onPress: () => setTimer(30),
          style: styles.resendTouch, children: /*#__PURE__*/

          _jsxs(Text, { style: styles.resendText, children: ["Didn't receive the code?",
            ' ', /*#__PURE__*/
            _jsx(Text, { style: [styles.resendLink, timer > 0 && { color: colors.textMuted }], children: "Resend OTP" }

            )] }
          ) }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.footerDecoration, children: [/*#__PURE__*/
          _jsx(Image, {
            source: { uri: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400' },
            style: styles.footerImage }
          ), /*#__PURE__*/
          _jsx(View, { style: styles.footerScript, children: /*#__PURE__*/
            _jsx(ScriptCaption, { lines: ['Local Crafts', 'Global Opportunities'], align: "right" }) }
          )] }
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 8
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center'
  },
  logoWrapper: {
    marginVertical: 12
  },
  headingBox: {
    alignItems: 'center',
    marginVertical: 12
  },
  headingDark: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 28,
    color: colors.textDark
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
    textAlign: 'center'
  },
  phoneText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 16,
    color: colors.textDark,
    marginVertical: 2
  },
  timerText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    marginBottom: 20
  },
  timerBold: {
    fontFamily: typography.fonts.bodySemiBold,
    color: colors.primary
  },
  verifyBtn: {
    width: '100%',
    marginBottom: 16
  },
  resendTouch: {
    padding: 8
  },
  resendText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody
  },
  resendLink: {
    fontFamily: typography.fonts.bodySemiBold,
    color: colors.primary,
    textDecorationLine: 'underline'
  },
  footerDecoration: {
    marginTop: 28,
    width: '100%',
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative'
  },
  footerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.4
  },
  footerScript: {
    position: 'absolute',
    right: 16,
    bottom: 16
  }
});