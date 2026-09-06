import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { aiService } from '@/services/ai/aiService';
import { productService } from '@/services/products/productService';
import { BorderRadius, Colors, Palette, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Step = 1 | 2 | 3;

export default function CreateProductScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [step, setStep] = useState<Step>(1);
  const [voiceText, setVoiceText] = useState('This handmade piece is made in my workshop using traditional techniques.');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [materials, setMaterials] = useState('');
  const [rawMaterialCost, setRawMaterialCost] = useState('500');
  const [laborCost, setLaborCost] = useState('900');
  const [packagingCost, setPackagingCost] = useState('100');
  const [recommendedPrice, setRecommendedPrice] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const totalCost = useMemo(
    () => Number(rawMaterialCost || 0) + Number(laborCost || 0) + Number(packagingCost || 0),
    [rawMaterialCost, laborCost, packagingCost]
  );

  const generateCatalog = async () => {
    setIsGenerating(true);
    try {
      const suggestion = await aiService.generateCatalog(voiceText);
      setTitle(suggestion.title);
      setDescription(suggestion.description);
      setCategory(suggestion.category);
      setMaterials(suggestion.materials.join(', '));
      setStep(2);
    } finally {
      setIsGenerating(false);
    }
  };

  const getPrice = async () => {
    setIsGenerating(true);
    try {
      const recommendation = await aiService.recommendPrice({
        rawMaterialCost: Number(rawMaterialCost || 0),
        laborCost: Number(laborCost || 0),
        packagingCost: Number(packagingCost || 0),
      });
      setRecommendedPrice(recommendation.recommendedPrice);
      setStep(3);
    } finally {
      setIsGenerating(false);
    }
  };

  const publish = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Add product details', 'Please add a title and description before publishing.');
      return;
    }
    setIsPublishing(true);
    try {
      const product = await productService.createProduct({
        title, description, category: category || 'Handicrafts', materials: materials.split(',').map((item) => item.trim()).filter(Boolean),
        rawMaterialCost: Number(rawMaterialCost || 0), laborCost: Number(laborCost || 0), packagingCost: Number(packagingCost || 0),
        suggestedPrice: recommendedPrice || totalCost, sellingPrice: recommendedPrice || totalCost, status: 'Published',
      });
      router.replace({ pathname: '/(seller)/products/[id]', params: { id: product.id } });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <ScreenWrapper scrollable contentContainerStyle={styles.container}>
      <Header title="Create a new craft" showBack />
      <View style={styles.progressRow} accessibilityLabel={`Step ${step} of 3`}>
        {[1, 2, 3].map((number) => <View key={number} style={[styles.progress, { backgroundColor: number <= step ? theme.primary : theme.border }]} />)}
      </View>
      <Text style={[Typography.caption, { color: theme.textMuted, textAlign: 'right' }]}>Step {step} of 3</Text>

      {step === 1 && <>
        <Text style={[Typography.h1, { color: theme.text, marginTop: Spacing.lg }]}>Tell us about your craft</Text>
        <Text style={[Typography.body, { color: theme.textSecondary, marginTop: Spacing.xs }]}>Speak in your own language or type a short description. ShilpSetu AI will prepare the first catalog.</Text>
        <Card style={styles.voiceCard}>
          <Text style={styles.voiceIcon}>🎙️</Text>
          <Text style={[Typography.h3, { color: theme.text, textAlign: 'center' }]}>Voice-assisted cataloging</Text>
          <Text style={[Typography.bodySmall, { color: theme.textMuted, textAlign: 'center', marginTop: Spacing.xs }]}>Recording UI is ready for the speech-to-text service.</Text>
        </Card>
        <Input label="Your description" value={voiceText} onChangeText={setVoiceText} multiline inputStyle={styles.multiline} helperText="Hindi, English, or your preferred language" />
        <Button title="Generate with AI ✨" size="lg" loading={isGenerating} onPress={generateCatalog} style={styles.bottomButton} />
      </>}

      {step === 2 && <>
        <Text style={[Typography.h1, { color: theme.text, marginTop: Spacing.lg }]}>Review your catalog</Text>
        <Text style={[Typography.body, { color: theme.textSecondary, marginTop: Spacing.xs }]}>Edit the AI suggestion so it sounds exactly like your craft.</Text>
        <Input label="Product title" value={title} onChangeText={setTitle} />
        <Input label="Description" value={description} onChangeText={setDescription} multiline inputStyle={styles.multiline} />
        <Input label="Category" value={category} onChangeText={setCategory} />
        <Input label="Materials" value={materials} onChangeText={setMaterials} helperText="Separate materials with commas" />
        <Button title="Continue to pricing" size="lg" onPress={getPrice} loading={isGenerating} style={styles.bottomButton} />
      </>}

      {step === 3 && <>
        <Text style={[Typography.h1, { color: theme.text, marginTop: Spacing.lg }]}>Price your work fairly</Text>
        <Card style={[styles.priceCard, { backgroundColor: Palette.terracottaMuted }]}>
          <Text style={[Typography.caption, { color: theme.primary, fontWeight: '700' }]}>AI RECOMMENDED PRICE</Text>
          <Text style={[Typography.display, { color: theme.primary, marginTop: Spacing.xs }]}>₹{(recommendedPrice || totalCost).toLocaleString('en-IN')}</Text>
          <Text style={[Typography.bodySmall, { color: theme.textSecondary, marginTop: Spacing.xs }]}>A sustainable price based on material, labour and packing costs.</Text>
        </Card>
        <Input label="Raw material cost (₹)" value={rawMaterialCost} onChangeText={setRawMaterialCost} keyboardType="numeric" />
        <Input label="Your labour cost (₹)" value={laborCost} onChangeText={setLaborCost} keyboardType="numeric" />
        <Input label="Packaging cost (₹)" value={packagingCost} onChangeText={setPackagingCost} keyboardType="numeric" />
        <View style={styles.totalRow}><Text style={[Typography.label, { color: theme.text }]}>Total craft cost</Text><Text style={[Typography.h3, { color: theme.text }]}>₹{totalCost.toLocaleString('en-IN')}</Text></View>
        <Button title="Publish to marketplace" size="lg" onPress={publish} loading={isPublishing} style={styles.bottomButton} />
        <TouchableOpacity onPress={() => setStep(2)} style={styles.backLink}><Text style={[Typography.label, { color: theme.primary }]}>Back to catalog details</Text></TouchableOpacity>
      </>}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxl },
  progressRow: { flexDirection: 'row', gap: Spacing.xs, marginTop: Spacing.md },
  progress: { flex: 1, height: 5, borderRadius: BorderRadius.full },
  voiceCard: { marginTop: Spacing.lg, alignItems: 'center', paddingVertical: Spacing.xl },
  voiceIcon: { fontSize: 40, marginBottom: Spacing.sm },
  multiline: { minHeight: 92, textAlignVertical: 'top' },
  bottomButton: { width: '100%', marginTop: Spacing.lg },
  priceCard: { marginTop: Spacing.lg, borderWidth: 0 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.md, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Palette.borderLight },
  backLink: { alignItems: 'center', paddingVertical: Spacing.lg },
});
