import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppHeader } from '../../components/ui/AppHeader';
import { ProductCard } from '../../components/ui/ProductCard';
import { IconSymbol } from '../../components/ui/icon-symbol';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { ErrorState } from '../../components/ui/ErrorState';

export default function ArtisanProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { artisans, products, toggleSaveArtisan, getOrCreateConversation } = useApp();

  const artisan = artisans.find((a) => a.id === id);

  if (!artisan) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader showBack title="Artisan Profile" />
        <View style={styles.padding}>
          <ErrorState
            title="Artisan Not Found"
            message="The requested artisan profile could not be found."
            onRetry={() => router.back()}
          />
        </View>
      </SafeAreaView>
    );
  }

  const artisanProducts = products.filter((p) => p.artisanId === artisan.id);

  const handleStartChat = () => {
    const convId = getOrCreateConversation(
      artisan.id,
      artisan.name,
      artisan.profileImage,
      artisan.craft
    );
    router.push(`/chat/${convId}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader showBack title={artisan.name} subtitle={artisan.craft} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Cover & Avatar */}
        <View style={styles.heroWrapper}>
          <Image source={{ uri: artisan.heroImage }} style={styles.heroImage} />
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: artisan.profileImage }} style={styles.avatar} />
          </View>
        </View>

        {/* Profile Card Info */}
        <View style={styles.profileMetaContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.artisanName}>{artisan.name}</Text>
            <Pressable
              style={styles.favBtn}
              onPress={() => toggleSaveArtisan(artisan.id)}>
              <IconSymbol
                name={artisan.saved ? 'heart.fill' : 'heart'}
                size={20}
                color={artisan.saved ? ShilpColors.error : ShilpColors.textMuted}
              />
            </Pressable>
          </View>

          <Text style={styles.craftTitle}>{artisan.craft}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <IconSymbol name="star.fill" size={16} color={ShilpColors.warning} />
              <Text style={styles.statVal}>{artisan.rating.toFixed(1)}</Text>
              <Text style={styles.statLabel}>({artisan.reviewCount} Reviews)</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <IconSymbol name="clock.fill" size={16} color={ShilpColors.primary} />
              <Text style={styles.statVal}>{artisan.experienceYears}+ Yrs</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <IconSymbol name="mappin.circle.fill" size={16} color={ShilpColors.textSecondary} />
              <Text style={styles.statLabel} numberOfLines={1}>
                {artisan.location}
              </Text>
            </View>
          </View>

          {/* Action CTAs */}
          <View style={styles.ctaRow}>
            <Pressable style={styles.chatCTA} onPress={handleStartChat}>
              <IconSymbol name="bubble.left.and.bubble.right.fill" size={18} color={ShilpColors.white} />
              <Text style={styles.chatCTAText}>Message Artisan</Text>
            </Pressable>

            <Pressable
              style={styles.rfqCTA}
              onPress={() => router.push({ pathname: '/rfq/create', params: { artisanId: artisan.id } })}>
              <IconSymbol name="plus.circle.fill" size={18} color={ShilpColors.primary} />
              <Text style={styles.rfqCTAText}>Custom Request</Text>
            </Pressable>
          </View>

          {/* About */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>About the Artisan</Text>
            <Text style={styles.aboutText}>{artisan.about}</Text>
          </View>

          {/* Skills / Capabilities */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Specialties & Skills</Text>
            <View style={styles.skillsWrapper}>
              {artisan.skills.map((skill, index) => (
                <View key={index} style={styles.skillPill}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Artisan Products */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Products by {artisan.name}</Text>
            <View style={styles.productGrid}>
              {artisanProducts.map((prod) => (
                <View key={prod.id} style={styles.gridItem}>
                  <ProductCard product={prod} />
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ShilpColors.background,
  },
  scrollContent: {
    paddingBottom: Spacing['3xl'],
  },
  padding: {
    padding: Spacing.md,
  },
  heroWrapper: {
    position: 'relative',
    height: 180,
    marginBottom: 44,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    backgroundColor: ShilpColors.softPeach,
  },
  avatarWrapper: {
    position: 'absolute',
    bottom: -40,
    left: Spacing.lg,
    borderRadius: BorderRadius.pill,
    borderWidth: 4,
    borderColor: ShilpColors.surface,
    elevation: 4,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.pill,
  },
  profileMetaContainer: {
    paddingHorizontal: Spacing.lg,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  artisanName: {
    ...Typography.heading1,
    fontSize: 24,
  },
  favBtn: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.pill,
    backgroundColor: ShilpColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: ShilpColors.border,
  },
  craftTitle: {
    ...Typography.bodyLarge,
    color: ShilpColors.primary,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ShilpColors.surfaceCard,
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    borderColor: ShilpColors.borderLight,
    marginBottom: Spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statVal: {
    ...Typography.heading3,
    fontSize: 15,
    marginTop: 2,
  },
  statLabel: {
    ...Typography.caption,
    fontSize: 11,
    color: ShilpColors.textMuted,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: ShilpColors.borderLight,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  chatCTA: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: ShilpColors.primary,
    paddingVertical: Spacing.md - 2,
    borderRadius: BorderRadius.pill,
  },
  chatCTAText: {
    ...Typography.button,
    fontSize: 15,
  },
  rfqCTA: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: ShilpColors.surface,
    borderWidth: 1,
    borderColor: ShilpColors.primary,
    paddingVertical: Spacing.md - 2,
    borderRadius: BorderRadius.pill,
  },
  rfqCTAText: {
    ...Typography.button,
    fontSize: 15,
    color: ShilpColors.primary,
  },
  sectionBlock: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.heading2,
    fontSize: 18,
    marginBottom: Spacing.xs,
  },
  aboutText: {
    ...Typography.body,
    color: ShilpColors.textSecondary,
    lineHeight: 22,
  },
  skillsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs + 2,
    marginTop: Spacing.xs,
  },
  skillPill: {
    backgroundColor: ShilpColors.softPeach,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.pill,
  },
  skillText: {
    ...Typography.bodySmall,
    color: ShilpColors.textPrimary,
    fontWeight: '600',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  gridItem: {
    width: '47.5%',
  },
});
