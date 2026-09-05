import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppHeader } from '../../components/ui/AppHeader';
import { CATEGORIES } from '../../constants/mockData';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { IconSymbol } from '../../components/ui/icon-symbol';

export default function RFQCreationScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { createRequest } = useApp();

  const [title, setTitle] = useState(params.title || '');
  const [category, setCategory] = useState(params.category || CATEGORIES[0].name);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('10');
  const [budget, setBudget] = useState('15000');
  const [deliveryLocation, setDeliveryLocation] = useState('New Delhi, Delhi');
  const [deadline, setDeadline] = useState('2026-10-30');

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Missing Fields', 'Please enter a title and description for your requirement.');
      return;
    }

    createRequest({
      title: title.trim(),
      description: description.trim(),
      category,
      quantity: parseInt(quantity, 10) || 1,
      budget: parseInt(budget, 10) || 1000,
      deliveryLocation: deliveryLocation.trim(),
      deadline: deadline.trim(),
      images: ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=400'],
    });

    Alert.alert('Request Created! 🎉', 'Your custom craft requirement has been posted to artisans.', [
      { text: 'View Requests', onPress: () => router.push('/(tabs)/requests') },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader showBack title="Create Custom Requirement" subtitle="Post RFQ to Artisans" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.infoBanner}>
          <IconSymbol name="info.circle.fill" size={20} color={ShilpColors.primary} />
          <Text style={styles.infoText}>
            Describe what you need, your target quantity, and budget. Registered artisans will submit customized quotations for you to compare.
          </Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Requirement Title *</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. 50 Hand-Painted Terracotta Vases"
            placeholderTextColor={ShilpColors.textMuted}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Craft Category *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat.id}
                style={[styles.catPill, category === cat.name && styles.activeCatPill]}
                onPress={() => setCategory(cat.name)}>
                <Text style={[styles.catPillText, category === cat.name && styles.activeCatText]}>
                  {cat.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Detailed Specifications & Notes *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Provide dimensions, materials, color preferences, and packaging requirements..."
            placeholderTextColor={ShilpColors.textMuted}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, { flex: 1 }]}>
            <Text style={styles.label}>Quantity (Units)</Text>
            <TextInput
              style={styles.input}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="number-pad"
            />
          </View>

          <View style={[styles.formGroup, { flex: 1.2 }]}>
            <Text style={styles.label}>Target Budget (₹)</Text>
            <TextInput
              style={styles.input}
              value={budget}
              onChangeText={setBudget}
              keyboardType="number-pad"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Delivery Location</Text>
          <TextInput
            style={styles.input}
            value={deliveryLocation}
            onChangeText={setDeliveryLocation}
            placeholder="City, State"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Target Delivery Deadline</Text>
          <TextInput
            style={styles.input}
            value={deadline}
            onChangeText={setDeadline}
            placeholder="YYYY-MM-DD"
          />
        </View>

        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <IconSymbol name="paperplane.fill" size={18} color={ShilpColors.white} />
          <Text style={styles.submitBtnText}>Post Requirement to Artisans</Text>
        </Pressable>
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
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  infoBanner: {
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
  infoText: {
    ...Typography.bodySmall,
    color: ShilpColors.textSecondary,
    flex: 1,
  },
  formGroup: {
    marginBottom: Spacing.lg,
  },
  label: {
    ...Typography.label,
    marginBottom: Spacing.xs,
    color: ShilpColors.textPrimary,
  },
  input: {
    ...Typography.body,
    backgroundColor: ShilpColors.surface,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    borderRadius: BorderRadius.medium,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    minHeight: 48,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  catScroll: {
    flexDirection: 'row',
    marginTop: 4,
  },
  catPill: {
    backgroundColor: ShilpColors.surface,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.pill,
    marginRight: Spacing.xs,
  },
  activeCatPill: {
    backgroundColor: ShilpColors.primary,
    borderColor: ShilpColors.primary,
  },
  catPillText: {
    ...Typography.bodySmall,
    color: ShilpColors.textPrimary,
    fontWeight: '600',
  },
  activeCatText: {
    color: ShilpColors.white,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: ShilpColors.primary,
    height: 52,
    borderRadius: BorderRadius.pill,
    marginTop: Spacing.md,
  },
  submitBtnText: {
    ...Typography.button,
    fontSize: 16,
  },
});
