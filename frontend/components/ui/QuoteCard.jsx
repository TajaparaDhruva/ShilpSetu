import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { IconSymbol } from './icon-symbol';
import { useApp } from '../../context/AppContext';

export const QuoteCard = ({ quote, onSelect }) => {
  const router = useRouter();
  const { getOrCreateConversation } = useApp();

  const handleStartChat = () => {
    const convId = getOrCreateConversation(
      quote.artisanId,
      quote.artisanName,
      quote.artisanAvatar,
      quote.artisanCraft
    );
    router.push(`/chat/${convId}`);
  };

  return (
    <View style={[styles.card, quote.status === 'accepted' && styles.acceptedCard]}>
      <View style={styles.header}>
        <Image source={{ uri: quote.artisanAvatar }} style={styles.avatar} />
        <View style={styles.artisanMeta}>
          <Text style={styles.artisanName}>{quote.artisanName}</Text>
          <Text style={styles.craftText}>{quote.artisanCraft}</Text>
        </View>

        <View style={styles.ratingBox}>
          <IconSymbol name="star.fill" size={14} color={ShilpColors.warning} />
          <Text style={styles.ratingText}>{quote.artisanRating.toFixed(1)}</Text>
        </View>
      </View>

      <View style={styles.quoteBody}>
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.label}>Quoted Price</Text>
            <Text style={styles.price}>₹{Number(quote.price || 0).toLocaleString('en-IN')}</Text>
          </View>
          <View style={styles.deliveryBox}>
            <Text style={styles.label}>Delivery Time</Text>
            <Text style={styles.deliveryVal}>{quote.deliveryTime}</Text>
          </View>
        </View>

        <Text style={styles.notesTitle}>Artisan Note:</Text>
        <Text style={styles.notesText}>{quote.notes}</Text>
      </View>

      <View style={styles.actionsRow}>
        <Pressable style={styles.chatButton} onPress={handleStartChat}>
          <IconSymbol name="bubble.left.and.bubble.right.fill" size={16} color={ShilpColors.primary} />
          <Text style={styles.chatButtonText}>Chat</Text>
        </Pressable>

        {quote.status === 'accepted' ? (
          <View style={styles.acceptedBadge}>
            <IconSymbol name="checkmark.circle.fill" size={16} color={ShilpColors.success} />
            <Text style={styles.acceptedText}>Accepted</Text>
          </View>
        ) : (
          onSelect && (
            <Pressable style={styles.acceptButton} onPress={onSelect}>
              <Text style={styles.acceptButtonText}>Accept Quote</Text>
            </Pressable>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: ShilpColors.surfaceCard,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: ShilpColors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  acceptedCard: {
    borderColor: ShilpColors.success,
    backgroundColor: '#F0F9F2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.pill,
    backgroundColor: ShilpColors.softPeach,
  },
  artisanMeta: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  artisanName: {
    ...Typography.heading3,
    fontSize: 16,
  },
  craftText: {
    ...Typography.caption,
    color: ShilpColors.textSecondary,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: ShilpColors.softPeach,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  ratingText: {
    ...Typography.caption,
    fontWeight: '700',
  },
  quoteBody: {
    backgroundColor: ShilpColors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    marginBottom: Spacing.md,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
    paddingBottom: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: ShilpColors.borderLight,
  },
  label: {
    ...Typography.caption,
    color: ShilpColors.textMuted,
  },
  price: {
    ...Typography.heading2,
    color: ShilpColors.primaryDark,
  },
  deliveryBox: {
    alignItems: 'flex-end',
  },
  deliveryVal: {
    ...Typography.heading3,
    color: ShilpColors.textPrimary,
  },
  notesTitle: {
    ...Typography.caption,
    fontWeight: '700',
    color: ShilpColors.textSecondary,
    marginBottom: 2,
  },
  notesText: {
    ...Typography.bodySmall,
    color: ShilpColors.textPrimary,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.pill,
    borderWidth: 1,
    borderColor: ShilpColors.primary,
  },
  chatButtonText: {
    ...Typography.button,
    fontSize: 14,
    color: ShilpColors.primary,
  },
  acceptButton: {
    backgroundColor: ShilpColors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs + 4,
    borderRadius: BorderRadius.pill,
  },
  acceptButtonText: {
    ...Typography.button,
    fontSize: 14,
  },
  acceptedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    backgroundColor: '#E2F3E7',
    borderRadius: BorderRadius.pill,
  },
  acceptedText: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: ShilpColors.success,
  },
});
