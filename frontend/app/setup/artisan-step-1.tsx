import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, User, Phone, MapPin, Globe, Camera, Lightbulb, CheckCircle2 } from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import StepIndicator from '../../components/StepIndicator';
import TextInputField from '../../components/TextInputField';
import PrimaryButton from '../../components/PrimaryButton';
import ScriptCaption from '../../components/ScriptCaption';
import MandalaBackground from '../../components/MandalaBackground';
import { useApp } from '../../context/AppContext';

const LANGUAGES_LIST = ['Hindi', 'English', 'Gujarati', 'Marathi', 'Bengali', 'Tamil'];

export default function ArtisanStep1Screen() {
  const router = useRouter();
  const { artisanProfile, updateArtisanProfile, mobileNumber } = useApp();

  const [fullName, setFullName] = useState(artisanProfile.fullName || 'Meera Patel');
  const [location, setLocation] = useState(artisanProfile.location || 'Kutch, Gujarat');
  const [selectedLangs, setSelectedLangs] = useState<string[]>(artisanProfile.languages || ['Hindi', 'Gujarati']);

  const toggleLang = (l: string) => {
    if (selectedLangs.includes(l)) {
      setSelectedLangs(selectedLangs.filter((item) => item !== l));
    } else {
      setSelectedLangs([...selectedLangs, l]);
    }
  };

  const handleNext = () => {
    updateArtisanProfile({ fullName, location, languages: selectedLangs });
    router.push('/setup/artisan-step-2' as any);
  };

  return (
    <View style={styles.container}>
      <MandalaBackground position="top-right" size={200} opacity={0.12} />

      {/* Top Header */}
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft size={22} color={colors.textDark} />
        </TouchableOpacity>
        <ScriptCaption lines={['Hunar', 'Pahchan', 'Bazaar']} align="right" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoWrapper}>
          <Logo size="lg" />
        </View>

        {/* Headings */}
        <View style={styles.headingBox}>
          <Text style={styles.headingDark}>Let's Set Up</Text>
          <Text style={styles.headingPrimary}>Your Artisan Profile</Text>
          <Text style={styles.subtext}>
            Tell us about yourself so buyers can trust and discover your craft.
          </Text>
        </View>

        {/* 4-Node Step Indicator */}
        <StepIndicator
          steps={[
            { number: 1, label: 'Basic Info' },
            { number: 2, label: 'Craft Details' },
            { number: 3, label: 'Verification' },
            { number: 4, label: 'Complete' },
          ]}
          currentStep={1}
        />

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
            <Text style={styles.photoSub}>Buyers love seeing the artisan behind the craft.</Text>
          </View>
        </View>

        {/* Form Fields */}
        <TextInputField
          label="Full Name"
          required
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
          icon={<User size={18} color={colors.primary} />}
        />

        <TextInputField
          label="Mobile Number"
          value={mobileNumber}
          editable={false}
          icon={<Phone size={18} color={colors.primary} />}
          rightElement={<CheckCircle2 size={18} color={colors.success} />}
        />

        <TextInputField
          label="Your Location"
          required
          placeholder="Select your city / state / district"
          value={location}
          onChangeText={setLocation}
          icon={<MapPin size={18} color={colors.primary} />}
        />

        {/* Languages Selection */}
        <View style={styles.langSection}>
          <Text style={styles.fieldLabel}>Languages You Speak</Text>
          <View style={styles.langWrap}>
            {LANGUAGES_LIST.map((l) => {
              const isSel = selectedLangs.includes(l);
              return (
                <TouchableOpacity
                  key={l}
                  style={[styles.langChip, isSel && styles.langChipActive]}
                  onPress={() => toggleLang(l)}
                >
                  <Text style={[styles.langText, isSel && styles.langTextActive]}>
                    {l}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Tip Banner */}
        <View style={styles.tipBanner}>
          <Lightbulb size={20} color={colors.warning} style={styles.tipIcon} />
          <Text style={styles.tipText}>
            <Text style={{ fontWeight: 'bold' }}>Tip:</Text> Artisans with a complete profile get 3x more buyer inquiries.
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
  langSection: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 8,
  },
  langWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  langChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  langChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  langText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.textDark,
  },
  langTextActive: {
    color: colors.white,
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
    marginTop: 8,
  },
});
