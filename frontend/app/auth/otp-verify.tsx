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
import { useApp } from '../../context/AppContext';

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
    router.push('/auth/role-select' as any);
  };

  const formattedTimer = `00:${timer < 10 ? `0${timer}` : timer}`;

  return (
    <View style={styles.container}>
      <MandalaBackground position="top-right" size={220} opacity={0.12} />

      {/* Top Navigation Row */}
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft size={22} color={colors.textDark} />
        </TouchableOpacity>
        <ScriptCaption lines={['Crafting', 'Connections', 'for a Brighter', 'Tomorrow']} align="right" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Logo */}
        <View style={styles.logoWrapper}>
          <Logo size="lg" />
        </View>

        {/* Headings */}
        <View style={styles.headingBox}>
          <Text style={styles.headingDark}>
            Verify Your <Text style={{ color: colors.primary }}>Number</Text>
          </Text>
          <View style={styles.underline} />

          <Text style={styles.subtext}>
            We have sent a 6-digit OTP to
          </Text>
          <Text style={styles.phoneText}>{mobileNumber}</Text>
          <Text style={styles.subtext}>Enter the code below to continue</Text>
        </View>

        {/* OTP Input Boxes */}
        <OtpInput
          length={6}
          onCodeChanged={setCode}
          onCodeFilled={(c) => {
            setCode(c);
          }}
        />

        {/* Timer */}
        <Text style={styles.timerText}>
          Resend OTP in <Text style={styles.timerBold}>{formattedTimer}</Text>
        </Text>

        {/* Verify Button */}
        <PrimaryButton
          label="Verify OTP"
          onPress={handleVerify}
          style={styles.verifyBtn}
        />

        {/* Resend Link */}
        <TouchableOpacity
          disabled={timer > 0}
          onPress={() => setTimer(30)}
          style={styles.resendTouch}
        >
          <Text style={styles.resendText}>
            Didn't receive the code?{' '}
            <Text style={[styles.resendLink, timer > 0 && { color: colors.textMuted }]}>
              Resend OTP
            </Text>
          </Text>
        </TouchableOpacity>

        {/* Bottom Decorative Footer */}
        <View style={styles.footerDecoration}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400' }}
            style={styles.footerImage}
          />
          <View style={styles.footerScript}>
            <ScriptCaption lines={['Local Crafts', 'Global Opportunities']} align="right" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: 44,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  logoWrapper: {
    marginVertical: 12,
  },
  headingBox: {
    alignItems: 'center',
    marginVertical: 12,
  },
  headingDark: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 28,
    color: colors.textDark,
  },
  underline: {
    height: 2,
    width: 40,
    backgroundColor: colors.primary,
    marginVertical: 8,
    borderRadius: 1,
  },
  subtext: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 14,
    color: colors.textBody,
    textAlign: 'center',
  },
  phoneText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 16,
    color: colors.textDark,
    marginVertical: 2,
  },
  timerText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    marginBottom: 20,
  },
  timerBold: {
    fontFamily: typography.fonts.bodySemiBold,
    color: colors.primary,
  },
  verifyBtn: {
    width: '100%',
    marginBottom: 16,
  },
  resendTouch: {
    padding: 8,
  },
  resendText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
  },
  resendLink: {
    fontFamily: typography.fonts.bodySemiBold,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  footerDecoration: {
    marginTop: 28,
    width: '100%',
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  footerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  footerScript: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
