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
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";



export default function CreateProductScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [step, setStep] = useState(1);
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
        packagingCost: Number(packagingCost || 0)
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
        suggestedPrice: recommendedPrice || totalCost, sellingPrice: recommendedPrice || totalCost, status: 'Published'
      });
      router.replace({ pathname: '/(seller)/products/[id]', params: { id: product.id } });
    } finally {
      setIsPublishing(false);
    }
  };

  return (/*#__PURE__*/
    _jsxs(ScreenWrapper, { scrollable: true, contentContainerStyle: styles.container, children: [/*#__PURE__*/
      _jsx(Header, { title: "Create a new craft", showBack: true }), /*#__PURE__*/
      _jsx(View, { style: styles.progressRow, accessibilityLabel: `Step ${step} of 3`, children:
        [1, 2, 3].map((number) => /*#__PURE__*/_jsx(View, { style: [styles.progress, { backgroundColor: number <= step ? theme.primary : theme.border }] }, number)) }
      ), /*#__PURE__*/
      _jsxs(Text, { style: [Typography.caption, { color: theme.textMuted, textAlign: 'right' }], children: ["Step ", step, " of 3"] }),

      step === 1 && /*#__PURE__*/_jsxs(_Fragment, { children: [/*#__PURE__*/
        _jsx(Text, { style: [Typography.h1, { color: theme.text, marginTop: Spacing.lg }], children: "Tell us about your craft" }), /*#__PURE__*/
        _jsx(Text, { style: [Typography.body, { color: theme.textSecondary, marginTop: Spacing.xs }], children: "Speak in your own language or type a short description. ShilpSetu AI will prepare the first catalog." }), /*#__PURE__*/
        _jsxs(Card, { style: styles.voiceCard, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.voiceIcon, children: "\uD83C\uDF99\uFE0F" }), /*#__PURE__*/
          _jsx(Text, { style: [Typography.h3, { color: theme.text, textAlign: 'center' }], children: "Voice-assisted cataloging" }), /*#__PURE__*/
          _jsx(Text, { style: [Typography.bodySmall, { color: theme.textMuted, textAlign: 'center', marginTop: Spacing.xs }], children: "Recording UI is ready for the speech-to-text service." })] }
        ), /*#__PURE__*/
        _jsx(Input, { label: "Your description", value: voiceText, onChangeText: setVoiceText, multiline: true, inputStyle: styles.multiline, helperText: "Hindi, English, or your preferred language" }), /*#__PURE__*/
        _jsx(Button, { title: "Generate with AI \u2728", size: "lg", loading: isGenerating, onPress: generateCatalog, style: styles.bottomButton })] }
      ),

      step === 2 && /*#__PURE__*/_jsxs(_Fragment, { children: [/*#__PURE__*/
        _jsx(Text, { style: [Typography.h1, { color: theme.text, marginTop: Spacing.lg }], children: "Review your catalog" }), /*#__PURE__*/
        _jsx(Text, { style: [Typography.body, { color: theme.textSecondary, marginTop: Spacing.xs }], children: "Edit the AI suggestion so it sounds exactly like your craft." }), /*#__PURE__*/
        _jsx(Input, { label: "Product title", value: title, onChangeText: setTitle }), /*#__PURE__*/
        _jsx(Input, { label: "Description", value: description, onChangeText: setDescription, multiline: true, inputStyle: styles.multiline }), /*#__PURE__*/
        _jsx(Input, { label: "Category", value: category, onChangeText: setCategory }), /*#__PURE__*/
        _jsx(Input, { label: "Materials", value: materials, onChangeText: setMaterials, helperText: "Separate materials with commas" }), /*#__PURE__*/
        _jsx(Button, { title: "Continue to pricing", size: "lg", onPress: getPrice, loading: isGenerating, style: styles.bottomButton })] }
      ),

      step === 3 && /*#__PURE__*/_jsxs(_Fragment, { children: [/*#__PURE__*/
        _jsx(Text, { style: [Typography.h1, { color: theme.text, marginTop: Spacing.lg }], children: "Price your work fairly" }), /*#__PURE__*/
        _jsxs(Card, { style: [styles.priceCard, { backgroundColor: Palette.terracottaMuted }], children: [/*#__PURE__*/
          _jsx(Text, { style: [Typography.caption, { color: theme.primary, fontWeight: '700' }], children: "AI RECOMMENDED PRICE" }), /*#__PURE__*/
          _jsxs(Text, { style: [Typography.display, { color: theme.primary, marginTop: Spacing.xs }], children: ["\u20B9", (recommendedPrice || totalCost).toLocaleString('en-IN')] }), /*#__PURE__*/
          _jsx(Text, { style: [Typography.bodySmall, { color: theme.textSecondary, marginTop: Spacing.xs }], children: "A sustainable price based on material, labour and packing costs." })] }
        ), /*#__PURE__*/
        _jsx(Input, { label: "Raw material cost (\u20B9)", value: rawMaterialCost, onChangeText: setRawMaterialCost, keyboardType: "numeric" }), /*#__PURE__*/
        _jsx(Input, { label: "Your labour cost (\u20B9)", value: laborCost, onChangeText: setLaborCost, keyboardType: "numeric" }), /*#__PURE__*/
        _jsx(Input, { label: "Packaging cost (\u20B9)", value: packagingCost, onChangeText: setPackagingCost, keyboardType: "numeric" }), /*#__PURE__*/
        _jsxs(View, { style: styles.totalRow, children: [/*#__PURE__*/_jsx(Text, { style: [Typography.label, { color: theme.text }], children: "Total craft cost" }), /*#__PURE__*/_jsxs(Text, { style: [Typography.h3, { color: theme.text }], children: ["\u20B9", totalCost.toLocaleString('en-IN')] })] }), /*#__PURE__*/
        _jsx(Button, { title: "Publish to marketplace", size: "lg", onPress: publish, loading: isPublishing, style: styles.bottomButton }), /*#__PURE__*/
        _jsx(TouchableOpacity, { onPress: () => setStep(2), style: styles.backLink, children: /*#__PURE__*/_jsx(Text, { style: [Typography.label, { color: theme.primary }], children: "Back to catalog details" }) })] }
      )] }
    ));

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
  backLink: { alignItems: 'center', paddingVertical: Spacing.lg }
});