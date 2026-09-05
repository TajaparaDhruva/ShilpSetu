import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { BuyerRequest } from '../../constants/mockData';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { IconSymbol } from './icon-symbol';

interface RequestCardProps {
  request: BuyerRequest;
}

export const RequestCard: React.FC<RequestCardProps> = ({ request }) => {
  const router = useRouter();

  const getStatusColor = (status: BuyerRequest['status']) => {
    switch (status) {
      case 'Quotes Received':
        return ShilpColors.warning;
      case 'Accepted':
      case 'Completed':
        return ShilpColors.success;
      case 'Active':
        return ShilpColors.primary;
      default:
        return ShilpColors.textMuted;
    }
  };

  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/request/${request.id}`)}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {request.title}
        </Text>
        <View style={[styles.statusPill, { backgroundColor: getStatusColor(request.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(request.status) }]}>
            {request.status}
          </Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {request.description}
      </Text>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <IconSymbol name="cube.box.fill" size={14} color={ShilpColors.textSecondary} />
          <Text style={styles.detailText}>Qty: {request.quantity}</Text>
        </View>

        <View style={styles.detailItem}>
          <IconSymbol name="indianrupeesign.circle.fill" size={14} color={ShilpColors.primary} />
          <Text style={styles.detailText}>Budget: ₹{request.budget.toLocaleString('en-IN')}</Text>
        </View>

        <View style={styles.detailItem}>
          <IconSymbol name="paperplane.fill" size={14} color={ShilpColors.textSecondary} />
          <Text style={styles.detailText}>{request.quotesCount} Quotes</Text>
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
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: ShilpColors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  title: {
    ...Typography.heading3,
    fontSize: 16,
    flex: 1,
    marginRight: Spacing.sm,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  statusText: {
    ...Typography.caption,
    fontWeight: '700',
  },
  description: {
    ...Typography.bodySmall,
    color: ShilpColors.textSecondary,
    marginBottom: Spacing.md,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: ShilpColors.borderLight,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    ...Typography.caption,
    fontWeight: '600',
    color: ShilpColors.textPrimary,
  },
});
