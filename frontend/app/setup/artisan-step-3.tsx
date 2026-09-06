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
import { useApp } from '../../context/AppContext';

export default function ArtisanStep3Screen() {
  const router = useRouter();
  const { artisanProfile, updateArtisanProfile, setRole } = useApp();

  const [accountHolder, setAccountHolder] = useState(artisanProfile.accountHolder || '');
  const [upiId, setUpiId] = useState(artisanProfile.upiId || '');
  const [agreed, setAgreed] = useState(true);

  const handleComplete = () => {
    updateArtisanProfile({ accountHolder, upiId });
    setRole('artisan');
    router.replace('/(artisan-tabs)/home' as any);
  };

  return (
    <View style={styles.container}>
      <MandalaBackground position="top-right" size={200} opacity={0.12} />

      {/* Top Header */}
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft size={22} color={colors.textDark} />
        </TouchableOpacity>
        <ScriptCaption lines={['Verified', 'Artisan', 'Trust']} align="right" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoWrapper}>
          <Logo size="lg" />
        </View>

        {/* Headings */}
        <View style={styles.headingBox}>
          <Text style={styles.headingDark}>Almost</Text>
          <Text style={styles.headingPrimary}>There!</Text>
          <Text style={styles.subtext}>
            A few final details to activate your seller account.
          </Text>
        </View>

        {/* Step Indicator */}
        <StepIndicator
          steps={[
            { number: 1, label: 'Basic Info' },
            { number: 2, label: 'Craft Details' },
            { number: 3, label: 'Verification' },
            { number: 4, label: 'Complete' },
          ]}
          currentStep={3}
        />

        {/* Upload ID Box */}
        <View style={styles.uploadCard}>
          <UploadCloud size={32} color={colors.primary} />
          <Text style={styles.uploadTitle}>Upload ID / Craft Certificate (optional)</Text>
          <Text style={styles.uploadSub}>Tap to upload a photo or PDF</Text>
          <Text style={styles.uploadNote}>Helps build buyer trust — you can add this later too.</Text>
        </View>

        <TextInputField
          label="Bank Account Holder Name"
          placeholder="Enter name as on bank account"
          value={accountHolder}
          onChangeText={setAccountHolder}
          icon={<User size={18} color={colors.primary} />}
        />

        <TextInputField
          label="UPI ID / Account Number"
          placeholder="e.g. name@upi or Account No."
          value={upiId}
          onChangeText={setUpiId}
          icon={<CreditCard size={18} color={colors.primary} />}
        />

        {/* Agreement Checkbox */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.checkboxRow}
          onPress={() => setAgreed(!agreed)}
        >
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
            {agreed && <Check size={12} color={colors.white} />}
          </View>
          <Text style={styles.checkboxLabel}>
            I agree to ShilpSetu's{' '}
            <Text style={styles.termsLink}>Seller Terms & Community Guidelines</Text>
          </Text>
        </TouchableOpacity>

        {/* Tip Banner */}
        <View style={styles.tipBanner}>
          <Lightbulb size={20} color={colors.warning} style={styles.tipIcon} />
          <Text style={styles.tipText}>
            <Text style={{ fontWeight: 'bold' }}>Tip:</Text> You can complete payment details anytime from Settings before your first sale.
          </Text>
        </View>

        {/* Action Button */}
        <PrimaryButton
          label="Complete Setup"
          onPress={handleComplete}
          disabled={!agreed}
          style={styles.completeBtn}
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
  uploadCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
    color: colors.textDark,
    marginTop: 8,
  },
  uploadSub: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.primary,
    marginTop: 2,
  },
  uploadNote: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
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
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    flex: 1,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textDark,
    lineHeight: 16,
  },
  termsLink: {
    color: colors.primary,
    textDecorationLine: 'underline',
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
  completeBtn: {
    marginTop: 8,
  },
});
