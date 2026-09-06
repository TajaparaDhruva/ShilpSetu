import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, User, Mail, MapPin, Camera, Lightbulb } from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import StepIndicator from '../../components/StepIndicator';
import TextInputField from '../../components/TextInputField';
import PrimaryButton from '../../components/PrimaryButton';
import ScriptCaption from '../../components/ScriptCaption';
import MandalaBackground from '../../components/MandalaBackground';
import { useApp } from '../../context/AppContext';

export default function BuyerStep1Screen() {
  const router = useRouter();
  const { buyerProfile, updateBuyerProfile } = useApp();

  const [fullName, setFullName] = useState(buyerProfile.fullName || '');
  const [email, setEmail] = useState(buyerProfile.email || '');
  const [location, setLocation] = useState(buyerProfile.location || '');

  const handleNext = () => {
    updateBuyerProfile({ fullName, email, location });
    router.push('/setup/buyer-step-2' as any);
  };

  return (
    <View style={styles.container}>
      <MandalaBackground position="top-right" size={200} opacity={0.12} />

      {/* Top Header */}
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft size={22} color={colors.textDark} />
        </TouchableOpacity>
        <ScriptCaption lines={['Discover', 'Support', 'Celebrate']} />
        <ScriptCaption lines={['Handmade', 'Stories', 'Brighter Lives']} align="right" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoWrapper}>
          <Logo size="lg" />
        </View>

        {/* Headings */}
        <View style={styles.headingBox}>
          <Text style={styles.headingDark}>Let's Personalize</Text>
          <Text style={styles.headingPrimary}>Your Buyer Profile</Text>
          <Text style={styles.subtext}>
            Tell us a few details to give you a better experience on ShilpSetu.
          </Text>
        </View>

        {/* 4-Node Step Indicator */}
        <StepIndicator currentStep={1} />

        {/* Profile Photo Uploader Row */}
        <View style={styles.photoRow}>
          <View style={styles.avatarPlaceholder}>
            <User size={32} color={colors.textMuted} />
            <View style={styles.cameraBadge}>
              <Camera size={14} color={colors.white} />
            </View>
          </View>
          <View style={styles.photoTextGroup}>
            <Text style={styles.photoTitle}>Add Profile Photo</Text>
            <Text style={styles.photoSub}>It helps us personalize your experience.</Text>
          </View>
        </View>

        {/* Form Inputs */}
        <TextInputField
          label="Full Name"
          required
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
          icon={<User size={18} color={colors.primary} />}
        />

        <TextInputField
          label="Email Address"
          required
          placeholder="Enter your email address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          icon={<Mail size={18} color={colors.primary} />}
        />

        <TextInputField
          label="Your Location"
          required
          placeholder="Select your city / state"
          value={location}
          onChangeText={setLocation}
          icon={<MapPin size={18} color={colors.primary} />}
        />

        {/* Tip Banner */}
        <View style={styles.tipBanner}>
          <Lightbulb size={20} color={colors.warning} style={styles.tipIcon} />
          <Text style={styles.tipText}>
            <Text style={{ fontWeight: 'bold' }}>Tip:</Text> A complete profile helps us suggest the best handmade products and local artisans for you.
          </Text>
        </View>

        {/* Action Button */}
        <PrimaryButton
          label="Next"
          onPress={handleNext}
          style={styles.nextBtn}
        />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  logoWrapper: {
    alignItems: 'center',
    marginVertical: 8,
  },
  headingBox: {
    alignItems: 'center',
    marginVertical: 8,
  },
  headingDark: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 26,
    color: colors.textDark,
  },
  headingPrimary: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 26,
    color: colors.primary,
    marginBottom: 4,
  },
  subtext: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    textAlign: 'center',
  },
  photoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.bgAlt,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
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
    justifyContent: 'center',
  },
  photoTextGroup: {
    marginLeft: 14,
    flex: 1,
  },
  photoTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.textDark,
  },
  photoSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  tipBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryTint10,
    padding: 12,
    borderRadius: 14,
    marginVertical: 12,
  },
  tipIcon: {
    marginRight: 10,
  },
  tipText: {
    flex: 1,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textDark,
    lineHeight: 16,
  },
  nextBtn: {
    marginTop: 12,
  },
});
