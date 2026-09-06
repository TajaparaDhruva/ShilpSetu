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
import { useApp } from '../../context/AppContext';

const CATEGORIES = [
  'Pottery',
  'Textiles & Sarees',
  'Jewelry',
  'Wood Carving',
  'Metal Craft',
  'Paintings',
  'Home Decor',
  'Bags & Accessories',
];

const BUDGET_PRESETS = [
  'Under ₹500',
  '₹500 – ₹1,500',
  '₹1,500 – ₹5,000',
  '₹5,000+',
];

export default function BuyerStep2Screen() {
  const router = useRouter();
  const { buyerProfile, updateBuyerProfile } = useApp();

  const [selectedBudget, setSelectedBudget] = useState<string>('₹500 – ₹1,500');
  const [selectedCats, setSelectedCats] = useState<string[]>(buyerProfile.preferredCategories || ['Pottery', 'Home Decor']);
  const [prefLang, setPrefLang] = useState<string>(buyerProfile.language || 'Both');

  const toggleCategory = (cat: string) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter(c => c !== cat));
    } else {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  const handleNext = () => {
    updateBuyerProfile({
      preferredCategories: selectedCats,
      language: prefLang,
    });
    router.push('/setup/buyer-step-3' as any);
  };

  return (
    <View style={styles.container}>
      <MandalaBackground position="top-right" size={200} opacity={0.12} />

      {/* Top Header */}
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft size={22} color={colors.textDark} />
        </TouchableOpacity>
        <ScriptCaption lines={['Curated', 'Crafts', 'Tailored']} align="right" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoWrapper}>
          <Logo size="lg" />
        </View>

        {/* Headings */}
        <View style={styles.headingBox}>
          <Text style={styles.headingDark}>Tell Us Your</Text>
          <Text style={styles.headingPrimary}>Shopping Preferences</Text>
          <Text style={styles.subtext}>
            This helps our AI recommend the right products and artisans to you.
          </Text>
        </View>

        {/* Step Indicator */}
        <StepIndicator currentStep={2} />

        {/* Budget Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget Range</Text>
          <View style={styles.presetRow}>
            {BUDGET_PRESETS.map((b) => {
              const isSel = selectedBudget === b;
              return (
                <TouchableOpacity
                  key={b}
                  style={[styles.presetChip, isSel && styles.presetChipActive]}
                  onPress={() => setSelectedBudget(b)}
                >
                  <Text style={[styles.presetText, isSel && styles.presetTextActive]}>
                    {b}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Preferred Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferred Categories</Text>
          <View style={styles.chipWrap}>
            {CATEGORIES.map((cat) => {
              const isSel = selectedCats.includes(cat);
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.chip, isSel && styles.chipActive]}
                  onPress={() => toggleCategory(cat)}
                >
                  <Text style={[styles.chipText, isSel && styles.chipTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Preferred Language Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferred Communication Language</Text>
          <View style={styles.langRow}>
            {['English', 'हिंदी', 'Both'].map((l) => {
              const isSel = prefLang === l;
              return (
                <TouchableOpacity
                  key={l}
                  style={[styles.langPill, isSel && styles.langPillActive]}
                  onPress={() => setPrefLang(l)}
                >
                  <Text style={[styles.langPillText, isSel && styles.langPillTextActive]}>
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
            <Text style={{ fontWeight: 'bold' }}>Tip:</Text> You can update your preferences anytime from Settings.
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
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 8,
  },
  presetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  presetChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  presetText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.textDark,
  },
  presetTextActive: {
    color: colors.white,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 13,
    color: colors.textDark,
  },
  chipTextActive: {
    color: colors.white,
  },
  langRow: {
    flexDirection: 'row',
    gap: 10,
  },
  langPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  langPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  langPillText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 13,
    color: colors.textDark,
  },
  langPillTextActive: {
    color: colors.white,
  },
  tipBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryTint10,
    padding: 12,
    borderRadius: 14,
    marginVertical: 16,
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
