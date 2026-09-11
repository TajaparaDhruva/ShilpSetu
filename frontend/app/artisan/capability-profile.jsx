import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  MoreHorizontal,
  MapPin,
  Star,
  Briefcase,
  Users,
  Check,
  Wrench,
  Leaf,
  Settings,
  BarChart3,
  Award,
  Package,
  Clock,
  Heart,
  MessageSquare,
  ArrowRight,
} from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Local Authentic Artisan Avatar
const ARTISAN_AVATAR = require('../../assets/images/onboarding_artisan_1.jpg');

// Tools & Techniques Thumbnails
const TECHNIQUE_IMAGES = {
  pottersWheel: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=300',
  handCarving: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=300',
  handPainting: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=300',
  kilnFiring: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=300',
};

export default function CapabilityProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Selected tab
  const [activeTab, setActiveTab] = useState('Overview');
  // Save artisan toggle
  const [isSaved, setIsSaved] = useState(false);

  // Core skills interactive state
  const [skills, setSkills] = useState([
    { id: '1', name: 'Terracotta Crafting', selected: true },
    { id: '2', name: 'Hand Painting', selected: true },
    { id: '3', name: 'Traditional Kiln Firing', selected: true },
    { id: '4', name: 'Custom Designs', selected: true },
    { id: '5', name: 'Bulk Production', selected: true },
    { id: '6', name: 'Surface Finishing', selected: true },
  ]);

  // Materials interactive state
  const [materials, setMaterials] = useState([
    { id: '1', name: 'Natural Clay', selected: true },
    { id: '2', name: 'Mineral Colors', selected: true },
    { id: '3', name: 'Natural Glaze', selected: true },
    { id: '4', name: 'Recycled Materials', selected: true },
  ]);

  const toggleSkill = (id) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s))
    );
  };

  const toggleMaterial = (id) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, selected: !m.selected } : m))
    );
  };

  const handleContinueToPriceAssistant = () => {
    // Navigate forward to Screen 21: Price Assistant
    router.push({
      pathname: '/artisan/price-assistant',
      params: {
        artisanName: 'Savita Kumari',
        craft: (params.craft) || 'Terracotta Pottery',
        capacity: '50-200 pieces/month',
        leadTime: '2-4 weeks',
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.studioCream} />

      {/* ── TOP HEADER ── */}
      <View style={styles.header}>
        {/* Back Button returning to Screen 19 */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.circleBtn}
          activeOpacity={0.7}
          accessibilityLabel="Back to Screen 19 Catalog Review"
        >
          <ChevronLeft size={22} color={colors.studioDarkBrown} />
        </TouchableOpacity>

        {/* Center Official ShilpSetu Logo */}
        <Logo size="sm" showSubtitle={false} />

        {/* Options / More Button */}
        <TouchableOpacity
          style={styles.circleBtn}
          activeOpacity={0.7}
          accessibilityLabel="Profile options"
        >
          <MoreHorizontal size={20} color={colors.studioDarkBrown} />
        </TouchableOpacity>
      </View>

      {/* ── MAIN SCROLLABLE CONTENT ── */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* SCREEN TITLE & MOTTO STAMP */}
        <View style={styles.titleRow}>
          <View style={styles.titleTextWrap}>
            <Text style={styles.screenTitle}>Capability Profile</Text>
            <Text style={styles.screenSubtitle}>
              Discover the skills, resources and production capabilities of this artisan.
            </Text>
          </View>

          {/* Stamped Craft Motto Badge */}
          <View style={styles.mottoStamp}>
            <Text style={styles.mottoLine}>Artisans</Text>
            <Text style={styles.mottoLine}>Communities</Text>
            <Text style={styles.mottoLine}>Opportunities</Text>
            <Text style={styles.mottoSubLine}>A Better Tomorrow</Text>
          </View>
        </View>

        {/* ── ARTISAN HERO CARD ── */}
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            {/* Avatar with Verified Badge */}
            <View style={styles.avatarContainer}>
              <Image source={ARTISAN_AVATAR} style={styles.avatarImage} resizeMode="cover" />
              <View style={styles.verifiedCheckBadge}>
                <Check size={12} color={colors.white} strokeWidth={3} />
              </View>
            </View>

            {/* Artisan Information */}
            <View style={styles.heroMetaCol}>
              <View style={styles.heroNameRow}>
                <Text style={styles.artisanName}>Savita Kumari</Text>
                {/* Verified Artisan Pill Badge */}
                <View style={styles.verifiedPillBadge}>
                  <Check size={10} color={colors.studioGreen} strokeWidth={3} style={{ marginRight: 3 }} />
                  <Text style={styles.verifiedPillText}>Verified Artisan</Text>
                </View>
              </View>

              <Text style={styles.artisanCategory}>
                {(params.category) || 'Terracotta & Clay Crafts'}
              </Text>

              <View style={styles.locationRow}>
                <MapPin size={13} color={colors.studioTerracotta} style={{ marginRight: 4 }} />
                <Text style={styles.locationText}>
                  {(params.origin) || 'Jaipur, Rajasthan'}
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statPill}>
              <Star size={13} color="#C97A1F" fill="#C97A1F" style={{ marginRight: 4 }} />
              <Text style={styles.statText}>4.8 (124 reviews)</Text>
            </View>

            <View style={styles.statPill}>
              <Briefcase size={13} color={colors.studioTerracotta} style={{ marginRight: 4 }} />
              <Text style={styles.statText}>5+ years</Text>
            </View>

            <View style={styles.statPill}>
              <Users size={13} color={colors.studioTerracotta} style={{ marginRight: 4 }} />
              <Text style={styles.statText}>50+ orders</Text>
            </View>
          </View>
        </View>

        {/* ── SEGMENTED TABS ROW ── */}
        <View style={styles.tabsRow}>
          {(['Overview', 'Products', 'Reviews', 'Gallery']).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.8}
              >
                <Text style={[styles.tabButtonText, isActive && styles.tabButtonTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── SECTION 1: CORE SKILLS CARD ── */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconBadge}>
              <Wrench size={16} color={colors.studioTerracotta} />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Core Skills</Text>
              <Text style={styles.sectionSubtitle}>Key areas of expertise</Text>
            </View>
          </View>

          <View style={styles.chipsWrap}>
            {skills.map((skill) => (
              <TouchableOpacity
                key={skill.id}
                style={[styles.chip, skill.selected && styles.chipActive]}
                onPress={() => toggleSkill(skill.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, skill.selected && styles.chipTextActive]}>
                  {skill.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── SECTION 2: MATERIALS USED CARD ── */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRowBetween}>
            <View style={styles.sectionHeaderLeft}>
              <View style={styles.sectionIconBadge}>
                <Leaf size={16} color={colors.studioTerracotta} />
              </View>
              <View>
                <Text style={styles.sectionTitle}>Materials Used</Text>
                <Text style={styles.sectionSubtitle}>Natural, sustainable and locally sourced materials</Text>
              </View>
            </View>

            <View style={styles.ecoBadge}>
              <Check size={10} color={colors.studioGreen} strokeWidth={3} style={{ marginRight: 3 }} />
              <Text style={styles.ecoBadgeText}>Eco Friendly</Text>
            </View>
          </View>

          <View style={styles.chipsWrap}>
            {materials.map((mat) => (
              <TouchableOpacity
                key={mat.id}
                style={[styles.chip, mat.selected && styles.chipActive]}
                onPress={() => toggleMaterial(mat.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, mat.selected && styles.chipTextActive]}>
                  {mat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── SECTION 3: TOOLS & TECHNIQUES CARD ── */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconBadge}>
              <Settings size={16} color={colors.studioTerracotta} />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Tools & Techniques</Text>
              <Text style={styles.sectionSubtitle}>Traditional tools and time-honored techniques</Text>
            </View>
          </View>

          {/* 4 Photo Cards Row */}
          <View style={styles.techniquesGrid}>
            <View style={styles.techniqueCard}>
              <Image source={{ uri: TECHNIQUE_IMAGES.pottersWheel }} style={styles.techniqueImg} resizeMode="cover" />
              <Text style={styles.techniqueLabel}>Potter's Wheel</Text>
            </View>

            <View style={styles.techniqueCard}>
              <Image source={{ uri: TECHNIQUE_IMAGES.handCarving }} style={styles.techniqueImg} resizeMode="cover" />
              <Text style={styles.techniqueLabel}>Hand Carving</Text>
            </View>

            <View style={styles.techniqueCard}>
              <Image source={{ uri: TECHNIQUE_IMAGES.handPainting }} style={styles.techniqueImg} resizeMode="cover" />
              <Text style={styles.techniqueLabel}>Hand Painting</Text>
            </View>

            <View style={styles.techniqueCard}>
              <Image source={{ uri: TECHNIQUE_IMAGES.kilnFiring }} style={styles.techniqueImg} resizeMode="cover" />
              <Text style={styles.techniqueLabel}>Kiln Firing</Text>
            </View>
          </View>
        </View>

        {/* ── SECTION 4: PRODUCTION CAPACITY CARD ── */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconBadge}>
              <BarChart3 size={16} color={colors.studioTerracotta} />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Production Capacity</Text>
              <Text style={styles.sectionSubtitle}>Estimated capability based on current resources</Text>
            </View>
          </View>

          {/* 3 Metric Cards */}
          <View style={styles.capacityGrid}>
            <View style={styles.capacityCard}>
              <Package size={22} color={colors.studioTerracotta} style={{ marginBottom: 4 }} />
              <Text style={styles.capacityValue}>50 – 200</Text>
              <Text style={styles.capacityLabel}>pieces per month</Text>
            </View>

            <View style={styles.capacityCard}>
              <Clock size={22} color={colors.studioTerracotta} style={{ marginBottom: 4 }} />
              <Text style={styles.capacityValue}>2 – 4 weeks</Text>
              <Text style={styles.capacityLabel}>average lead time</Text>
            </View>

            <View style={styles.capacityCard}>
              <Users size={22} color={colors.studioTerracotta} style={{ marginBottom: 4 }} />
              <Text style={styles.capacityValue}>Custom Orders</Text>
              <Text style={styles.capacityLabel}>accepted</Text>
            </View>
          </View>
        </View>

        {/* ── SECTION 5: CERTIFICATIONS & RECOGNITION CARD ── */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconBadge}>
              <Award size={16} color={colors.studioTerracotta} />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Certifications & Recognition</Text>
              <Text style={styles.sectionSubtitle}>Quality, training and other recognitions</Text>
            </View>
          </View>

          <View style={styles.chipsWrap}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Handmade Certified</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>GI Tag (Rajasthan Craft)</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Eco-friendly Practices</Text>
            </View>
          </View>
        </View>

        {/* ── ACTION BUTTONS ROW ── */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.saveArtisanBtn, isSaved && styles.saveArtisanBtnActive]}
            onPress={() => setIsSaved(!isSaved)}
            activeOpacity={0.75}
          >
            <Heart
              size={18}
              color={isSaved ? colors.error : colors.studioTerracotta}
              fill={isSaved ? colors.error : 'none'}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.saveArtisanText, isSaved && { color: colors.error }]}>
              {isSaved ? 'Saved' : 'Save Artisan'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.messageBtn}
            onPress={handleContinueToPriceAssistant}
            activeOpacity={0.85}
          >
            <MessageSquare size={18} color={colors.white} style={{ marginRight: 6 }} />
            <Text style={styles.messageBtnText}>Message</Text>
          </TouchableOpacity>
        </View>

        {/* PRIMARY CONTINUE ACTION TO PRICE ASSISTANT */}
        <TouchableOpacity
          style={styles.continueToPricingBtn}
          onPress={handleContinueToPriceAssistant}
          activeOpacity={0.85}
        >
          <Text style={styles.continueToPricingText}>Continue to Price Assistant</Text>
          <ArrowRight size={18} color={colors.white} style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {/* Corner Botanical Foliage Decor */}
        <View style={styles.foliageDecorWrap} pointerEvents="none">
          <Svg width={70} height={70} viewBox="0 0 100 100">
            <Path
              d="M10 90 C 20 60, 40 40, 80 20 C 60 40, 40 60, 30 90 Z"
              fill="#EADBCF"
              opacity={0.5}
            />
            <Path
              d="M30 80 C 40 50, 60 30, 90 10 C 70 30, 50 60, 45 85 Z"
              fill="#EADBCF"
              opacity={0.3}
            />
          </Svg>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.studioCream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
  },
  circleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 28,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 12,
  },
  titleTextWrap: {
    flex: 1,
    paddingRight: 8,
  },
  screenTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 25,
    color: colors.studioDarkBrown,
    letterSpacing: 0.2,
  },
  screenSubtitle: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12.5,
    color: '#4A607A',
    marginTop: 4,
    lineHeight: 18,
  },
  mottoStamp: {
    backgroundColor: '#F9EFE4',
    borderWidth: 1,
    borderColor: '#EADAC9',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
    transform: [{ rotate: '-4deg' }],
    alignItems: 'center',
    shadowColor: colors.studioDarkBrown,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  mottoLine: {
    fontFamily: typography.fonts.script,
    fontSize: 12,
    color: '#7C5338',
    lineHeight: 15,
  },
  mottoSubLine: {
    fontFamily: typography.fonts.script,
    fontSize: 11,
    color: '#7C5338',
    fontStyle: 'italic',
    lineHeight: 14,
  },
  heroCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
    shadowColor: colors.studioDarkBrown,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatarImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  verifiedCheckBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2F8B3B',
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroMetaCol: {
    flex: 1,
  },
  heroNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  artisanName: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 16.5,
    color: colors.studioDarkBrown,
  },
  verifiedPillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.studioGreenBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.studioGreen,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  verifiedPillText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.studioGreen,
  },
  artisanCategory: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12.5,
    color: '#4A607A',
    marginBottom: 3,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textBody,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F2E9DF',
    gap: 6,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5EE',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  statText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11,
    color: colors.studioDarkBrown,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#FAF0E6',
    borderRadius: 14,
    padding: 3,
    marginBottom: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
  },
  tabButtonActive: {
    backgroundColor: colors.studioTerracotta,
  },
  tabButtonText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.studioDarkBrown,
  },
  tabButtonTextActive: {
    fontFamily: typography.fonts.bodySemiBold,
    color: colors.white,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
    shadowColor: colors.studioDarkBrown,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeaderRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FAF4EE',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sectionTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14.5,
    color: colors.studioDarkBrown,
  },
  sectionSubtitle: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: '#6E5B4E',
    marginTop: 1,
  },
  ecoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.studioGreenBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.studioGreen,
    paddingHorizontal: 7,
    paddingVertical: 2.5,
  },
  ecoBadgeText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.studioGreen,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 2,
  },
  chip: {
    backgroundColor: '#F7EFE8',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderWidth: 1,
    borderColor: '#EFE3D8',
  },
  chipActive: {
    backgroundColor: '#F5EBE6',
    borderColor: '#E8D2C5',
  },
  chipText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11.5,
    color: colors.studioDarkBrown,
  },
  chipTextActive: {
    color: colors.studioDarkBrown,
  },
  techniquesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    gap: 6,
  },
  techniqueCard: {
    flex: 1,
    alignItems: 'center',
  },
  techniqueImg: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '#EBE2D5',
    marginBottom: 4,
  },
  techniqueLabel: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.studioDarkBrown,
    textAlign: 'center',
    lineHeight: 13,
  },
  capacityGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    gap: 6,
  },
  capacityCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF5EE',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#F2E8DC',
  },
  capacityValue: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12.5,
    color: colors.studioDarkBrown,
    textAlign: 'center',
  },
  capacityLabel: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
    marginBottom: 8,
  },
  saveArtisanBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.studioTerracotta,
    borderRadius: 22,
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  saveArtisanBtnActive: {
    borderColor: colors.error,
    backgroundColor: '#FFF4F2',
  },
  saveArtisanText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.studioTerracotta,
  },
  messageBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.studioTerracotta,
    borderRadius: 22,
    paddingVertical: 12,
    shadowColor: colors.studioTerracotta,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  messageBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.white,
  },
  continueToPricingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.studioTerracotta,
    borderRadius: 26,
    paddingVertical: 14,
    marginTop: 2,
    marginBottom: 8,
    shadowColor: colors.studioTerracotta,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  continueToPricingText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.white,
  },
  foliageDecorWrap: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});