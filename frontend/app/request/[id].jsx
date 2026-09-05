import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppHeader } from '../../components/ui/AppHeader';
import { QuoteCard } from '../../components/ui/QuoteCard';
import { IconSymbol } from '../../components/ui/icon-symbol';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { ErrorState } from '../../components/ui/ErrorState';

export default function RequestDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { requests, quotes, acceptQuote } = useApp();

  const request = requests.find((r) => r.id === id);
  const requestQuotes = quotes.filter((q) => q.requestId === id);

  if (!request) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader showBack title="Requirement Details" />
        <View style={styles.padding}>
          <ErrorState
            title="Request Not Found"
            message="The requested requirement details could not be found."
            onRetry={() => router.back()}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader showBack title="Requirement Details" subtitle={`ID: ${request.id}`} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.summaryCard}>
          <View style={styles.statusRow}>
            <Text style={styles.categoryPill}>{request.category}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{request.status}</Text>
            </View>
          </View>

          <Text style={styles.title}>{request.title}</Text>
          <Text style={styles.description}>{request.description}</Text>

          <View style={styles.specGrid}>
            <View style={styles.specBox}>
              <IconSymbol name="cube.box.fill" size={16} color={ShilpColors.primary} />
              <Text style={styles.specVal}>{request.quantity} Units</Text>
              <Text style={styles.specLabel}>Quantity</Text>
            </View>

            <View style={styles.specBox}>
              <IconSymbol name="indianrupeesign.circle.fill" size={16} color={ShilpColors.primary} />
              <Text style={styles.specVal}>₹{request.budget.toLocaleString('en-IN')}</Text>
              <Text style={styles.specLabel}>Target Budget</Text>
            </View>

            <View style={styles.specBox}>
              <IconSymbol name="mappin.circle.fill" size={16} color={ShilpColors.primary} />
              <Text style={styles.specVal} numberOfLines={1}>
                {request.deliveryLocation}
              </Text>
              <Text style={styles.specLabel}>Delivery</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Received Quotations</Text>
            <Text style={styles.sectionSub}>{requestQuotes.length} Artisans responded</Text>
          </View>

          {requestQuotes.length > 1 && (
            <Pressable
              style={styles.compareBtn}
              onPress={() => router.push({ pathname: '/quote/compare', params: { requestId: request.id } })}>
              <IconSymbol name="slider.horizontal.3" size={14} color={ShilpColors.white} />
              <Text style={styles.compareBtnText}>Compare Quotes</Text>
            </Pressable>
          )}
        </View>

        {requestQuotes.length > 0 ? (
          requestQuotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              onSelect={() => acceptQuote(quote.id, request.id)}
            />
          ))
        ) : (
          <View style={styles.emptyQuotesCard}>
            <IconSymbol name="hourglass" size={28} color={ShilpColors.primary} />
            <Text style={styles.emptyQuotesTitle}>Waiting for Artisan Quotes</Text>
            <Text style={styles.emptyQuotesSub}>
              We have notified relevant craft artisans in {request.category}. Quotes usually arrive within 24 hours.
            </Text>
          </View>
        )}
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
    padding: Spacing.md,
    paddingBottom: Spacing['3xl'],
  },
  padding: {
    padding: Spacing.md,
  },
  summaryCard: {
    backgroundColor: ShilpColors.surfaceCard,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  categoryPill: {
    ...Typography.caption,
    fontWeight: '700',
    color: ShilpColors.primary,
    backgroundColor: ShilpColors.softPeach,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  statusBadge: {
    backgroundColor: ShilpColors.primary + '15',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.pill,
  },
  statusText: {
    ...Typography.caption,
    fontWeight: '700',
    color: ShilpColors.primary,
  },
  title: {
    ...Typography.heading2,
    marginBottom: Spacing.xs,
  },
  description: {
    ...Typography.body,
    color: ShilpColors.textSecondary,
    marginBottom: Spacing.lg,
    lineHeight: 22,
  },
  specGrid: {
    flexDirection: 'row',
    gap: Spacing.xs,
    justifyContent: 'space-between',
  },
  specBox: {
    flex: 1,
    backgroundColor: ShilpColors.surface,
    padding: Spacing.sm,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ShilpColors.borderLight,
  },
  specVal: {
    ...Typography.bodySmall,
    fontWeight: '700',
    marginTop: 4,
  },
  specLabel: {
    ...Typography.caption,
    fontSize: 11,
    color: ShilpColors.textMuted,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.heading2,
    fontSize: 18,
  },
  sectionSub: {
    ...Typography.caption,
    color: ShilpColors.textMuted,
  },
  compareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: ShilpColors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.pill,
  },
  compareBtnText: {
    ...Typography.button,
    fontSize: 13,
  },
  emptyQuotesCard: {
    alignItems: 'center',
    backgroundColor: ShilpColors.surfaceCard,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    padding: Spacing.xl,
  },
  emptyQuotesTitle: {
    ...Typography.heading3,
    marginTop: Spacing.sm,
    marginBottom: 4,
  },
  emptyQuotesSub: {
    ...Typography.bodySmall,
    color: ShilpColors.textSecondary,
    textAlign: 'center',
  },
});
