import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AppHeader } from '../../components/ui/AppHeader';
import { RequestCard } from '../../components/ui/RequestCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { IconSymbol } from '../../components/ui/icon-symbol';

const STATUS_FILTERS = ['All', 'Active', 'Quotes Received', 'Accepted', 'Completed'];

export default function BuyerRequestsScreen() {
  const router = useRouter();
  const { requests } = useApp();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredRequests = requests.filter((r) => {
    if (activeFilter === 'All') return true;
    return r.status === activeFilter;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="My Custom Requests" subtitle="Manage your RFQs & artisan quotes" />

      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {STATUS_FILTERS.map((status) => (
            <Pressable
              key={status}
              style={[styles.filterTab, activeFilter === status && styles.activeFilterTab]}
              onPress={() => setActiveFilter(status)}>
              <Text style={[styles.filterTabText, activeFilter === status && styles.activeFilterTabText]}>
                {status}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req) => <RequestCard key={req.id} request={req} />)
        ) : (
          <EmptyState
            iconName="doc.text.fill"
            title="No Requests Found"
            description={`You do not have any requests under "${activeFilter}" status.`}
            actionLabel="Create New Requirement"
            onAction={() => router.push('/rfq/create')}
          />
        )}
      </ScrollView>

      <Pressable style={styles.fab} onPress={() => router.push('/rfq/create')}>
        <IconSymbol name="plus" size={24} color={ShilpColors.white} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ShilpColors.background,
  },
  filterBar: {
    backgroundColor: ShilpColors.surface,
    borderBottomWidth: 1,
    borderBottomColor: ShilpColors.borderLight,
    paddingVertical: Spacing.xs + 2,
  },
  filterScroll: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
  },
  filterTab: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.pill,
    backgroundColor: ShilpColors.surfaceCard,
    borderWidth: 1,
    borderColor: ShilpColors.border,
  },
  activeFilterTab: {
    backgroundColor: ShilpColors.primary,
    borderColor: ShilpColors.primary,
  },
  filterTabText: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: ShilpColors.textPrimary,
  },
  activeFilterTabText: {
    color: ShilpColors.white,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: 90,
  },
  fab: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: BorderRadius.pill,
    backgroundColor: ShilpColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: ShilpColors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
});
