import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppHeader } from '../../components/ui/AppHeader';
import { QuoteCard } from '../../components/ui/QuoteCard';
import { IconSymbol } from '../../components/ui/icon-symbol';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../../components/ui/EmptyState';

export default function QuoteComparisonScreen() {
  const { requestId } = useLocalSearchParams();
  const router = useRouter();
  const { quotes, requests, acceptQuote } = useApp();

  const request = requests.find((r) => r.id === requestId);
  const comparisonQuotes = quotes.filter((q) => !requestId || q.requestId === requestId);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader showBack title="Quote Comparison" subtitle={request ? request.title : 'All Received Quotes'} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.noticeBox}>
          <IconSymbol name="info.circle.fill" size={18} color={ShilpColors.primary} />
          <Text style={styles.noticeText}>
            Comparing quotations by Artisan Rating, Price, Delivery Lead Time, and Customization Notes.
          </Text>
        </View>

        {comparisonQuotes.length > 0 ? (
          comparisonQuotes.map((quote, index) => (
            <View key={quote.id} style={styles.quoteWrapper}>
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>Option #{index + 1}</Text>
              </View>
              <QuoteCard
                quote={quote}
                onSelect={() => {
                  acceptQuote(quote.id, quote.requestId);
                  router.back();
                }}
              />
            </View>
          ))
        ) : (
          <EmptyState
            iconName="doc.text.fill"
            title="No Quotes to Compare"
            description="There are currently no quotations received for this requirement."
            actionLabel="Go Back"
            onAction={() => router.back()}
          />
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
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: ShilpColors.surfaceCard,
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    marginBottom: Spacing.lg,
  },
  noticeText: {
    ...Typography.bodySmall,
    color: ShilpColors.textSecondary,
    flex: 1,
  },
  quoteWrapper: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  rankBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
    zIndex: 10,
    backgroundColor: ShilpColors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.pill,
  },
  rankText: {
    ...Typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: ShilpColors.white,
  },
});
