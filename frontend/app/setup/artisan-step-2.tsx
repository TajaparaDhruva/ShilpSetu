import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Store, Hammer, Layers, Clock, Lightbulb } from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import StepIndicator from '../../components/StepIndicator';
import TextInputField from '../../components/TextInputField';
import PrimaryButton from '../../components/PrimaryButton';
import ScriptCaption from '../../components/ScriptCaption';
import MandalaBackground from '../../components/MandalaBackground';
import { useApp } from '../../context/AppContext';

const CRAFT_CATEGORIES = [
  'Pottery',
  'Handloom & Weaving',
  'Jewelry Making',
  'Wood Carving',
  'Metal & Brass Work',
  'Bamboo & Cane Craft',
  'Embroidery',
  'Painting',
  'Other',
];

export default function ArtisanStep2Screen() {
  const router = useRouter();
  const { artisanProfile, updateArtisanProfile } = useApp();

  const [shopName, setShopName] = useState(artisanProfile.shopName || 'Heritage Clay & Handloom');
  const [craftCategory, setCraftCategory] = useState(artisanProfile.craftCategory || 'Pottery');
  const [materials, setMaterials] = useState(artisanProfile.materials.join(', ') || 'Clay, Terracotta');
  const [experience, setExperience] = useState(artisanProfile.experienceYears.toString() || '8');

  const handleNext = () => {
    updateArtisanProfile({
      shopName,
      craftCategory,
      materials: materials.split(',').map(m => m.trim()),
      experienceYears: parseInt(experience, 10) || 1,
    });
    router.push('/setup/artisan-step-3' as any);
  };

  return (
    <View style={styles.container}>
      <MandalaBackground position="top-right" size={200} opacity={0.12} />

      {/* Top Header */}
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft size={22} color={colors.textDark} />
        </TouchableOpacity>
        <ScriptCaption lines={['Traditional', 'Craft', 'Modern Market']} align="right" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoWrapper}>
          <Logo size="lg" />
        </View>

        {/* Headings */}
        <View style={styles.headingBox}>
          <Text style={styles.headingDark}>Tell Us About</Text>
          <Text style={styles.headingPrimary}>Your Craft</Text>
          <Text style={styles.subtext}>
            This helps buyers and our AI understand what you make.
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
          currentStep={2}
        />

        <TextInputField
          label="Business / Shop Name"
          placeholder="e.g. Heritage Clay Studio (optional)"
          value={shopName}
          onChangeText={setShopName}
          icon={<Store size={18} color={colors.primary} />}
        />

        {/* Category Grid */}
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Your Craft Category *</Text>
          <View style={styles.catGrid}>
            {CRAFT_CATEGORIES.map((cat) => {
              const isSel = craftCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.catChip, isSel && styles.catChipActive]}
                  onPress={() => setCraftCategory(cat)}
                >
                  <Text style={[styles.catText, isSel && styles.catTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <TextInputField
          label="Materials You Work With"
          placeholder="e.g. Clay, Cotton, Brass"
          value={materials}
          onChangeText={setMaterials}
          icon={<Layers size={18} color={colors.primary} />}
        />

        <TextInputField
          label="Years of Experience"
          placeholder="e.g. 5"
          keyboardType="numeric"
          value={experience}
          onChangeText={setExperience}
          icon={<Clock size={18} color={colors.primary} />}
        />

        {/* Tip Banner */}
        <View style={styles.tipBanner}>
          <Lightbulb size={20} color={colors.warning} style={styles.tipIcon} />
          <Text style={styles.tipText}>
            <Text style={{ fontWeight: 'bold' }}>Tip:</Text> Accurate craft details help our AI generate better product catalogs and pricing for you later.
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
    marginVertical: 12,
  },
  fieldLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 8,
  },
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  catChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  catChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  catText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.textDark,
  },
  catTextActive: {
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
