import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { IconSymbol } from './icon-symbol';
import { useApp } from '../../context/AppContext';

export const ArtisanCard = ({ artisan, horizontal = false }) => {
  const router = useRouter();
  const { toggleSaveArtisan } = useApp();

  return (
    <Pressable
      style={[styles.card, horizontal && styles.horizontalCard]}
      onPress={() => router.push(`/artisan/${artisan.id}`)}>
      <Image source={{ uri: artisan.profileImage }} style={horizontal ? styles.horizontalImage : styles.cardImage} />

      <Pressable
        style={styles.favoriteButton}
        onPress={(e) => {
          e.stopPropagation();
          toggleSaveArtisan(artisan.id);
        }}>
        <IconSymbol
          name={artisan.saved ? 'heart.fill' : 'heart'}
          size={18}
          color={artisan.saved ? ShilpColors.error : ShilpColors.textMuted}
        />
      </Pressable>

      <View style={styles.cardContent}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>
            {artisan.name}
          </Text>
          <View style={styles.ratingBadge}>
            <IconSymbol name="star.fill" size={14} color={ShilpColors.warning} />
            <Text style={styles.ratingText}>{artisan.rating.toFixed(1)}</Text>
          </View>
        </View>

        <Text style={styles.craft} numberOfLines={1}>
          {artisan.craft}
        </Text>

        <View style={styles.locationRow}>
          <IconSymbol name="mappin.circle.fill" size={14} color={ShilpColors.primary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {artisan.location}
          </Text>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.experienceText}>{artisan.experienceYears} Years Exp.</Text>
          <Text style={styles.viewLink}>View Profile →</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: ShilpColors.surfaceCard,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    shadowColor: ShilpColors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
  },
  horizontalCard: {
    width: 260,
    marginRight: Spacing.md,
    marginBottom: 0,
  },
  cardImage: {
    width: '100%',
    height: 140,
    backgroundColor: ShilpColors.softPeach,
  },
  horizontalImage: {
    width: '100%',
    height: 120,
    backgroundColor: ShilpColors.softPeach,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: BorderRadius.pill,
    backgroundColor: ShilpColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    elevation: 3,
  },
  cardContent: {
    padding: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    ...Typography.heading3,
    fontSize: 16,
    flex: 1,
    marginRight: 6,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ShilpColors.softPeach,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.pill,
    gap: 4,
  },
  ratingText: {
    ...Typography.caption,
    fontWeight: '700',
    color: ShilpColors.textPrimary,
  },
  craft: {
    ...Typography.bodySmall,
    color: ShilpColors.primary,
    fontWeight: '600',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.xs,
  },
  locationText: {
    ...Typography.caption,
    color: ShilpColors.textSecondary,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: ShilpColors.borderLight,
  },
  experienceText: {
    ...Typography.caption,
    color: ShilpColors.textMuted,
  },
  viewLink: {
    ...Typography.caption,
    fontWeight: '700',
    color: ShilpColors.primary,
  },
});
