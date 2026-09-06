import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Phone } from 'lucide-react-native';
import Svg, { Path, G } from 'react-native-svg';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import PrimaryButton from '../../components/PrimaryButton';
import OutlineButton from '../../components/OutlineButton';
import ScriptCaption from '../../components/ScriptCaption';
import MandalaBackground from '../../components/MandalaBackground';
import { useApp } from '../../context/AppContext';

function GoogleIcon() {
  return (
    <Svg width="18" height="18" viewBox="0 0 24 24">
      <Path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <Path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <Path
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <Path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </Svg>
  );
}

export default function LoginScreen() {
  const router = useRouter();
  const { mobileNumber, setMobileNumber } = useApp();
  const [phone, setPhone] = useState(mobileNumber.replace('+91 ', ''));

  const handleSendOtp = () => {
    const fullNum = `+91 ${phone || '98765 43210'}`;
    setMobileNumber(fullNum);
    router.push('/auth/otp-verify' as any);
  };

  return (
    <View style={styles.container}>
      <MandalaBackground position="bottom-left" size={200} opacity={0.12} />

      {/* Top Right Decorative Photo Banner */}
      <View style={styles.topRightPhotoWrapper}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400' }}
          style={styles.topRightPhoto}
        />
        <View style={styles.photoOverlay} />
        <View style={styles.topRightScript}>
          <ScriptCaption lines={['Crafting Connections', 'for a Brighter Tomorrow']} color={colors.white} align="right" />
        </View>
        <View style={styles.paintBadge}>
          <Text style={styles.paintBadgeText}>Same Tradition New Opportunities</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header Logo */}
        <View style={styles.logoRow}>
          <Logo size="sm" showSubtitle={false} />
        </View>

        {/* Form Column */}
        <View style={styles.formContainer}>
          <Text style={styles.headingDark}>Welcome</Text>
          <Text style={styles.headingPrimary}>back</Text>
          <Text style={styles.subtext}>Sign in to continue to ShilpSetu.</Text>

          {/* Phone Field */}
          <Text style={styles.fieldLabel}>Mobile Number</Text>
          <View style={styles.phoneInputRow}>
            <Text style={styles.countryCode}>+91</Text>
            <View style={styles.verticalDivider} />
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter your mobile number"
              placeholderTextColor={colors.textMuted}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={10}
            />
            <Phone size={18} color={colors.primary} />
          </View>

          <PrimaryButton
            label="Send OTP"
            onPress={handleSendOtp}
            style={styles.sendBtn}
          />

          {/* OR Divider */}
          <View style={styles.orDividerRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          {/* Google Button */}
          <OutlineButton
            label="Continue with Google"
            icon={<GoogleIcon />}
            iconPosition="left"
            onPress={() => router.push('/auth/role-select' as any)}
            style={styles.googleBtn}
            textStyle={{ color: colors.textDark }}
          />

          {/* Terms Text */}
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy.</Text>
          </Text>
        </View>

        {/* Footer Accent */}
        <View style={styles.footerAccent}>
          <ScriptCaption lines={['Indian Crafts', 'Global Dreams']} />
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
  topRightPhotoWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '45%',
    height: 180,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  topRightPhoto: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(30, 18, 10, 0.45)',
  },
  topRightScript: {
    position: 'absolute',
    top: 50,
    right: 12,
  },
  paintBadge: {
    position: 'absolute',
    bottom: 12,
    right: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  paintBadgeText: {
    fontFamily: typography.fonts.script,
    fontSize: 11,
    color: colors.white,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  logoRow: {
    marginBottom: 20,
    marginTop: 10,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  headingDark: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 32,
    color: colors.textDark,
  },
  headingPrimary: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 32,
    color: colors.primary,
    marginBottom: 4,
  },
  subtext: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 14,
    color: colors.textBody,
    marginBottom: 24,
  },
  fieldLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 6,
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
    marginBottom: 20,
  },
  countryCode: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.textDark,
  },
  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
    marginHorizontal: 10,
  },
  phoneInput: {
    flex: 1,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 15,
    color: colors.textDark,
  },
  sendBtn: {
    marginBottom: 20,
  },
  orDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  orText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.textMuted,
    marginHorizontal: 12,
  },
  googleBtn: {
    borderColor: colors.border,
    marginVertical: 12,
  },
  termsText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 16,
  },
  termsLink: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  footerAccent: {
    marginTop: 36,
  },
});
