import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Animated,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  FileText,
  ChevronDown,
  ImagePlus,
  Camera,
  Plus,
  X,
  Check,
  Send,
  HandMetal,
  Leaf,
  Wand2,
  Package,
  ListFilter,
  Info,
  Tag,
  CheckCircle2,
  AlertCircle,
  RotateCw,
} from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import IndianCraftBorder from '../../components/shilpsetu/IndianCraftBorder';

// ─── Assets ─────────────────────────────────────────────────────────────────
const PRODUCT_IMAGE = require('../../assets/images/terracotta_vase_product.jpg');

// ─── Types ───────────────────────────────────────────────────────────────────

// ─── Dropdown data ────────────────────────────────────────────────────────────
const CATEGORY_OPTIONS = [
  { label: 'Home Decor', value: 'home-decor' },
  { label: 'Kitchen & Dining', value: 'kitchen' },
  { label: 'Jewellery & Accessories', value: 'jewellery' },
  { label: 'Textiles', value: 'textiles' },
  { label: 'Sculpture & Art', value: 'sculpture' },
];

const MATERIAL_OPTIONS = [
  { label: 'Terracotta Clay', value: 'terracotta' },
  { label: 'Bamboo', value: 'bamboo' },
  { label: 'Jute', value: 'jute' },
  { label: 'Brass', value: 'brass' },
  { label: 'Cotton', value: 'cotton' },
];

const SIZE_OPTIONS = [
  { label: '100 ml', value: '100ml' },
  { label: '250 ml', value: '250ml' },
  { label: 'Small (< 20 cm)', value: 'small' },
  { label: 'Medium (20-40 cm)', value: 'medium' },
  { label: 'Large (40+ cm)', value: 'large' },
];

const WEIGHT_OPTIONS = [
  { label: '100 grams', value: '100g' },
  { label: '200 grams', value: '200g' },
  { label: '300 grams', value: '300g' },
  { label: '500 grams', value: '500g' },
  { label: '1 kg', value: '1kg' },
];

// ─── Botanical Leaf SVG ───────────────────────────────────────────────────────
function BotanicalLeaf() {
  return (
    <Svg width={28} height={44} viewBox="0 0 28 44">
      <Path
        d="M14 42 C14 42 2 32 2 19 C2 8 7 2 14 2 C21 2 26 8 26 19 C26 32 14 42 14 42Z"
        fill="none"
        stroke="#B5502B"
        strokeWidth={1.2}
        opacity={0.4}
      />
      <Path d="M14 42 L14 2" stroke="#B5502B" strokeWidth={0.9} opacity={0.25} />
      <Path d="M14 12 C9 16 6 22 8 28" stroke="#B5502B" strokeWidth={0.7} opacity={0.25} fill="none" />
      <Path d="M14 18 C19 22 22 28 20 34" stroke="#B5502B" strokeWidth={0.7} opacity={0.25} fill="none" />
    </Svg>
  );
}

// ─── Section icon bubble ──────────────────────────────────────────────────────
function SectionIcon({ children }) {
  return <View style={s.sectionIconBubble}>{children}</View>;
}

// ─── Dropdown ────────────────────────────────────────────────────────────────


function Dropdown({ label, selected, options, onSelect }) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((o) => o.value === selected)?.label ?? selected;

  return (
    <View style={{ flex: 1 }}>
      <Text style={s.fieldLabel}>{label}</Text>
      <TouchableOpacity
        style={s.dropdownBtn}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
        accessibilityLabel={"Select " + label}
      >
        <Text style={s.dropdownText} numberOfLines={1}>{selectedLabel}</Text>
        <ChevronDown size={13} color={colors.textBody} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity style={s.overlay} activeOpacity={1} onPress={() => setOpen(false)}>
          <View style={s.sheet}>
            <View style={s.sheetHandle} />
            <Text style={s.sheetTitle}>{label}</Text>
            <ScrollView keyboardShouldPersistTaps="handled">
              {options.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={[s.sheetOption, selected === opt.value && s.sheetOptionActive]}
                  onPress={() => { onSelect(opt.value); setOpen(false); }}
                  activeOpacity={0.7}
                >
                  <Text style={[s.sheetOptionText, selected === opt.value && s.sheetOptionTextActive]}>
                    {opt.label}
                  </Text>
                  {selected === opt.value && <Check size={15} color={colors.studioTerracotta} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function PublishProductScreen() {
  const router = useRouter();

  // Form
  const [productName, setProductName] = useState('Terracotta Mug');
  const [category, setCategory] = useState('home-decor');
  const [description, setDescription] = useState(
    'Handcrafted terracotta mug with traditional Indian motifs. Perfect for everyday use.'
  );
  const [material, setMaterial] = useState('terracotta');
  const [size, setSize] = useState('250ml');
  const [weight, setWeight] = useState('300g');
  const [price, setPrice] = useState('250');
  const [stockQty, setStockQty] = useState('100');
  const [photoCount, setPhotoCount] = useState(3);

  // Highlights
  const INIT_HIGHLIGHTS = [
    { id: 'handmade',   label: 'Handmade',       IconEl: HandMetal, iconColor: colors.studioTerracotta, active: true },
    { id: 'eco',        label: 'Eco-friendly',   IconEl: Leaf,      iconColor: colors.studioGreen,      active: true },
    { id: 'custom',     label: 'Customizable',   IconEl: Wand2,     iconColor: colors.studioTerracotta, active: true },
    { id: 'ship',       label: 'Ready to Ship',  IconEl: Package,   iconColor: colors.studioDarkBrown,  active: true },
  ];
  const [highlights, setHighlights] = useState(INIT_HIGHLIGHTS);

  // State
  const [screenState, setScreenState] = useState('normal');
  const [validationMsg, setValidationMsg] = useState('');
  const successAnim = useRef(new Animated.Value(0)).current;

  const toggleHighlight = (id) =>
    setHighlights((prev) => prev.map((h) => (h.id === id ? { ...h, active: !h.active } : h)));

  const validate = () => {
    if (!productName.trim()) {
      setValidationMsg('Please add a product name before publishing.');
      return false;
    }
    if (description.trim().length < 10) {
      setValidationMsg('Please add a short description (at least 10 characters).');
      return false;
    }
    const p = Number(price);
    if (!price.trim() || isNaN(p) || p <= 0) {
      setValidationMsg('Please enter a valid price greater than 0.');
      return false;
    }
    setValidationMsg('');
    return true;
  };

  const handlePublish = () => {
    if (!validate()) return;
    setScreenState('publishing');
    setTimeout(() => {
      setScreenState('success');
      successAnim.setValue(0);
      Animated.spring(successAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 60,
        friction: 8,
      }).start();
    }, 2200);
  };

  const MAX_DESC = 200;

  // ── SUCCESS ─────────────────────────────────────────────────────────────────
  if (screenState === 'success') {
    return (
      <SafeAreaView style={s.container} edges={['top', 'bottom']}>
        <View style={s.successWrap}>
          <Animated.View
            style={[
              s.successInner,
              {
                opacity: successAnim,
                transform: [
                  {
                    scale: successAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.85, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={s.successIcon}>
              <CheckCircle2 size={52} color={colors.studioGreen} />
            </View>
            <Text style={s.successTitle}>Product Published!</Text>
            <Text style={s.successBody}>
              Your handcrafted product has been added to your marketplace library and is now visible to buyers.
            </Text>

            <View style={s.successCard}>
              <Image source={PRODUCT_IMAGE} style={s.successImg} />
              <View style={{ flex: 1 }}>
                <Text style={s.successProdName}>{productName}</Text>
                <Text style={s.successProdMeta}>Home Decor ┬╖ Terracotta Pottery</Text>
                <View style={s.liveBadge}>
                  <View style={s.liveDot} />
                  <Text style={s.liveText}>Live</Text>
                </View>
              </View>
            </View>

            <Text style={s.successPrice}>Rs.{price} per piece</Text>

            <TouchableOpacity
              style={s.successCTA}
              onPress={() => router.push({ pathname: '/artisan/product-library' })}
              activeOpacity={0.85}
              accessibilityLabel="Go to product library"
            >
              <Text style={s.successCTAText}>Go to Product Library</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.successBack} onPress={() => router.back()} activeOpacity={0.7}>
              <Text style={s.successBackText}>Back to Price Assistant</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <IndianCraftBorder />
      </SafeAreaView>
    );
  }

  // ── MAIN ─────────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity
            style={s.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.7}
            accessibilityLabel="Go back to Price Assistant"
          >
            <ChevronLeft size={22} color={colors.studioDarkBrown} />
          </TouchableOpacity>

          <Logo size="sm" showSubtitle={true} />

          <TouchableOpacity style={s.draftBtn} activeOpacity={0.7} accessibilityLabel="Save">
            <FileText size={14} color={colors.studioDarkBrown} />
            <Text style={s.draftText}>Save Draft</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={s.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Hero */}
          <View style={s.heroRow}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={s.heroTitle}>Publish Product</Text>
              <Text style={s.heroSub}>Share your creation with a wider audience</Text>
            </View>
            <View style={s.mottoBlock}>
              <View style={s.mottoStamp}>
                <Text style={s.mottoLine}>Handmade</Text>
                <Text style={s.mottoLine}>Stories</Text>
                <Text style={s.mottoLine}>Reach Further</Text>
              </View>
              <BotanicalLeaf />
            </View>
          </View>

          {/* Validation banner */}
          {validationMsg !== '' && (
            <View style={s.valBanner}>
              <AlertCircle size={15} color={colors.error} />
              <Text style={s.valText}>{validationMsg}</Text>
            </View>
          )}

          {/* ── Card 1: Product Photos ─────────────────────────────── */}
          <View style={s.card}>
            <View style={s.sectionRow}>
              <SectionIcon><ImagePlus size={16} color={colors.white} /></SectionIcon>
              <View>
                <Text style={s.sectionTitle}>Product Photos</Text>
                <Text style={s.sectionSub}>Add clear and high-quality images (up to 5)</Text>
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={s.photosRow}>
                {Array.from({ length: photoCount }).map((_, i) => (
                  <View key={i} style={s.thumbWrap}>
                    <Image source={PRODUCT_IMAGE} style={s.thumb} />
                    <TouchableOpacity
                      style={s.removeBtn}
                      onPress={() => setPhotoCount((c) => Math.max(0, c - 1))}
                      accessibilityLabel="Remove photo"
                    >
                      <X size={10} color={colors.white} />
                    </TouchableOpacity>
                  </View>
                ))}
                {photoCount < 5 && (
                  <TouchableOpacity
                    style={s.addSlot}
                    onPress={() => setPhotoCount((c) => Math.min(5, c + 1))}
                    accessibilityLabel="Add photo"
                  >
                    <Camera size={20} color={colors.textMuted} />
                    <Text style={s.addSlotText}>Add Photo</Text>
                  </TouchableOpacity>
                )}
                {photoCount < 4 && (
                  <TouchableOpacity
                    style={s.addSlot}
                    onPress={() => setPhotoCount((c) => Math.min(5, c + 1))}
                    accessibilityLabel="Add more photos"
                  >
                    <Plus size={20} color={colors.textMuted} />
                    <Text style={s.addSlotText}>Add More</Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </View>

          {/* ── Card 2: Basic Information ──────────────────────────── */}
          <View style={s.card}>
            <View style={s.sectionRow}>
              <SectionIcon><Tag size={16} color={colors.white} /></SectionIcon>
              <Text style={s.sectionTitle}>Basic Information</Text>
            </View>

            <View style={[s.twoCol, { marginTop: 4 }]}>
              <View style={{ flex: 1 }}>
                <Text style={s.fieldLabel}>Product Name</Text>
                <TextInput
                  style={s.input}
                  value={productName}
                  onChangeText={setProductName}
                  placeholder="e.g. Terracotta Mug"
                  placeholderTextColor={colors.textMuted}
                  accessibilityLabel="Edit product title"
                />
              </View>
              <View style={{ width: 8 }} />
              <Dropdown
                label="Category"
                selected={category}
                options={CATEGORY_OPTIONS}
                onSelect={setCategory}
              />
            </View>

            <Text style={[s.fieldLabel, { marginTop: 12 }]}>Short Description</Text>
            <TextInput
              style={s.textarea}
              value={description}
              onChangeText={(t) => setDescription(t.slice(0, MAX_DESC))}
              placeholder="Describe your product..."
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              accessibilityLabel="Edit product description"
            />
            <Text style={s.counter}>{description.length}/{MAX_DESC}</Text>
          </View>

          {/* ── Card 3: Product Details ────────────────────────────── */}
          <View style={s.card}>
            <View style={s.sectionRow}>
              <SectionIcon><ListFilter size={16} color={colors.white} /></SectionIcon>
              <Text style={s.sectionTitle}>Product Details</Text>
            </View>

            <View style={[s.threeCol, { marginTop: 4 }]}>
              <Dropdown label="Material" selected={material} options={MATERIAL_OPTIONS} onSelect={setMaterial} />
              <View style={{ width: 6 }} />
              <Dropdown label="Size (approx.)" selected={size} options={SIZE_OPTIONS} onSelect={setSize} />
              <View style={{ width: 6 }} />
              <Dropdown label="Weight (approx.)" selected={weight} options={WEIGHT_OPTIONS} onSelect={setWeight} />
            </View>

            <View style={[s.twoCol, { marginTop: 4 }]}>
              <View style={{ flex: 1 }}>
                <Text style={s.fieldLabel}>Price (Rs.)</Text>
                <TextInput
                  style={s.input}
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={colors.textMuted}
                  accessibilityLabel="Edit product price"
                />
              </View>
              <View style={{ width: 8 }} />
              <View style={{ flex: 1 }}>
                <Text style={s.fieldLabel}>Stock Quantity</Text>
                <TextInput
                  style={s.input}
                  value={stockQty}
                  onChangeText={setStockQty}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={colors.textMuted}
                  accessibilityLabel="Edit stock quantity"
                />
              </View>
            </View>
          </View>

          {/* ── Card 4: Additional Information ────────────────────── */}
          <View style={s.card}>
            <View style={s.sectionRow}>
              <SectionIcon><Info size={16} color={colors.white} /></SectionIcon>
              <Text style={s.sectionTitle}>Additional Information</Text>
            </View>

            <View style={s.chipGrid}>
              {highlights.map((h) => (
                <TouchableOpacity
                  key={h.id}
                  style={[s.chip, h.active && s.chipActive]}
                  onPress={() => toggleHighlight(h.id)}
                  activeOpacity={0.7}
                  accessibilityLabel={"Toggle " + h.label}
                >
                  <h.IconEl size={15} color={h.active ? h.iconColor : colors.textMuted} />
                  <Text style={[s.chipText, h.active && s.chipTextActive]}>{h.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <IndianCraftBorder />
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Sticky CTA */}
        <View style={s.footer}>
          {screenState === 'publishing' ? (
            <View style={s.publishingRow}>
              <ActivityIndicator size="small" color={colors.white} />
              <Text style={s.publishingText}>Publishing your product...</Text>
            </View>
          ) : screenState === 'error' ? (
            <View style={{ alignItems: 'center', gap: 8 }}>
              <Text style={s.errorMsg}>We couldn't publish your product right now.</Text>
              <TouchableOpacity
                style={s.tryAgainBtn}
                onPress={() => setScreenState('normal')}
                activeOpacity={0.8}
              >
                <RotateCw size={14} color={colors.studioTerracotta} />
                <Text style={s.tryAgainText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={s.publishBtn}
              onPress={handlePublish}
              activeOpacity={0.85}
              accessibilityLabel="Publish product"
            >
              <Send size={18} color={colors.white} />
              <Text style={s.publishBtnText}>Publish Product</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.studioCream },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 14, paddingVertical: 9,
    backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  backBtn: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: colors.studioCream,
    borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center',
  },
  draftBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    borderWidth: 1, borderColor: colors.border, borderRadius: 20,
    paddingHorizontal: 11, paddingVertical: 7, backgroundColor: colors.studioCream,
  },
  draftText: { fontFamily: typography.fonts.bodyMedium, fontSize: 12.5, color: colors.studioDarkBrown },

  scroll: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 },

  heroRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 },
  heroTitle: { fontFamily: typography.fonts.serifBold, fontSize: 28, color: colors.studioDarkBrown, lineHeight: 34, marginBottom: 4 },
  heroSub: { fontFamily: typography.fonts.bodyRegular, fontSize: 13, color: colors.textBody, lineHeight: 19 },
  mottoBlock: { alignItems: 'center', gap: 2 },
  mottoStamp: {
    backgroundColor: '#F5ECD8', borderRadius: 10, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 10, paddingVertical: 7, alignItems: 'center',
  },
  mottoLine: { fontFamily: typography.fonts.script, fontSize: 12, color: colors.studioDarkBrown, lineHeight: 17 },

  valBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#FEF0EC', borderRadius: 10, borderWidth: 1, borderColor: '#F2C4B5',
    padding: 11, marginBottom: 12,
  },
  valText: { flex: 1, fontFamily: typography.fonts.bodyMedium, fontSize: 12.5, color: colors.error, lineHeight: 18 },

  card: {
    backgroundColor: colors.white, borderRadius: 16, borderWidth: 1,
    borderColor: colors.border, padding: 16, marginBottom: 14,
  },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  sectionIconBubble: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: colors.studioTerracotta,
    alignItems: 'center', justifyContent: 'center',
  },
  sectionTitle: { fontFamily: typography.fonts.serifBold, fontSize: 16, color: colors.studioDarkBrown },
  sectionSub: { fontFamily: typography.fonts.bodyRegular, fontSize: 11.5, color: colors.studioTerracotta, marginTop: 1 },

  photosRow: { flexDirection: 'row', gap: 10, paddingVertical: 6 },
  thumbWrap: { width: 82, height: 82, borderRadius: 10, overflow: 'hidden', position: 'relative' },
  thumb: { width: 82, height: 82, resizeMode: 'cover' },
  removeBtn: {
    position: 'absolute', top: 5, right: 5, width: 19, height: 19, borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.55)', alignItems: 'center', justifyContent: 'center',
  },
  addSlot: {
    width: 82, height: 82, borderRadius: 10, borderWidth: 1.5, borderColor: colors.border,
    borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center',
    gap: 4, backgroundColor: colors.studioCream,
  },
  addSlotText: { fontFamily: typography.fonts.bodyRegular, fontSize: 12, color: colors.textMuted },

  fieldLabel: {
    fontFamily: typography.fonts.bodyMedium, fontSize: 11.5, color: colors.textBody,
    marginBottom: 5, marginTop: 8,
  },
  input: {
    borderWidth: 1, borderColor: colors.border, borderRadius: 9,
    paddingHorizontal: 11, paddingVertical: 10,
    backgroundColor: colors.white, fontFamily: typography.fonts.bodyRegular,
    fontSize: 13, color: colors.studioDarkBrown,
  },
  textarea: {
    borderWidth: 1, borderColor: colors.border, borderRadius: 9,
    paddingHorizontal: 11, paddingVertical: 10,
    backgroundColor: colors.white, fontFamily: typography.fonts.bodyRegular,
    fontSize: 13, color: colors.studioDarkBrown, minHeight: 80, textAlignVertical: 'top',
  },
  counter: {
    fontFamily: typography.fonts.bodyRegular, fontSize: 11, color: colors.textMuted,
    textAlign: 'right', marginTop: 4,
  },
  twoCol: { flexDirection: 'row', alignItems: 'flex-end' },
  threeCol: { flexDirection: 'row', alignItems: 'flex-end' },

  dropdownBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: colors.border, borderRadius: 9,
    paddingHorizontal: 9, paddingVertical: 10, backgroundColor: colors.white,
  },
  dropdownText: { fontFamily: typography.fonts.bodyRegular, fontSize: 12, color: colors.studioDarkBrown, flex: 1 },

  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 32, maxHeight: '52%',
  },
  sheetHandle: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.border, alignSelf: 'center', marginBottom: 14 },
  sheetTitle: { fontFamily: typography.fonts.serifBold, fontSize: 16, color: colors.studioDarkBrown, marginBottom: 10 },
  sheetOption: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 12, borderBottomWidth: 0.8, borderBottomColor: colors.border,
  },
  sheetOptionActive: { backgroundColor: '#FEF6F3', marginHorizontal: -20, paddingHorizontal: 20 },
  sheetOptionText: { fontFamily: typography.fonts.bodyMedium, fontSize: 14, color: colors.textBody },
  sheetOptionTextActive: { color: colors.studioTerracotta, fontFamily: typography.fonts.bodySemiBold },

  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 7, width: '47%',
    paddingVertical: 12, paddingHorizontal: 12, borderRadius: 10,
    borderWidth: 1, borderColor: colors.border, backgroundColor: colors.studioCream,
  },
  chipActive: { backgroundColor: '#FEF0EC', borderColor: '#F2C4B5' },
  chipText: { fontFamily: typography.fonts.bodyMedium, fontSize: 13, color: colors.textBody },
  chipTextActive: { fontFamily: typography.fonts.bodySemiBold, color: colors.studioDarkBrown },

  footer: {
    backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.border,
    paddingHorizontal: 16, paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 14,
  },
  publishBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: colors.studioTerracotta, borderRadius: 28, paddingVertical: 15,
  },
  publishBtnText: { fontFamily: typography.fonts.bodySemiBold, fontSize: 16, color: colors.white },
  publishingRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12,
    backgroundColor: colors.studioTerracotta, borderRadius: 28, paddingVertical: 15,
  },
  publishingText: { fontFamily: typography.fonts.bodyMedium, fontSize: 14, color: colors.white },
  errorMsg: { fontFamily: typography.fonts.bodyMedium, fontSize: 13, color: colors.error, textAlign: 'center' },
  tryAgainBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: 1.5, borderColor: colors.studioTerracotta,
    borderRadius: 22, paddingHorizontal: 18, paddingVertical: 9,
  },
  tryAgainText: { fontFamily: typography.fonts.bodySemiBold, fontSize: 13, color: colors.studioTerracotta },

  successWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  successInner: { width: '100%', alignItems: 'center' },
  successIcon: {
    width: 88, height: 88, borderRadius: 44, backgroundColor: colors.studioGreenBg,
    alignItems: 'center', justifyContent: 'center', marginBottom: 18,
    borderWidth: 2, borderColor: '#B8DCCB',
  },
  successTitle: { fontFamily: typography.fonts.serifBold, fontSize: 26, color: colors.studioDarkBrown, marginBottom: 10 },
  successBody: {
    fontFamily: typography.fonts.bodyRegular, fontSize: 13.5, color: colors.textBody,
    textAlign: 'center', lineHeight: 20, marginBottom: 22, paddingHorizontal: 6,
  },
  successCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.white, borderRadius: 14, borderWidth: 1, borderColor: colors.border,
    padding: 12, width: '100%', marginBottom: 10,
  },
  successImg: { width: 60, height: 60, borderRadius: 10, resizeMode: 'cover' },
  successProdName: { fontFamily: typography.fonts.bodySemiBold, fontSize: 15, color: colors.studioDarkBrown, marginBottom: 2 },
  successProdMeta: { fontFamily: typography.fonts.bodyRegular, fontSize: 12, color: colors.textBody, marginBottom: 5 },
  liveBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: colors.studioGreenBg, borderRadius: 20,
    paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start',
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.studioGreen },
  liveText: { fontFamily: typography.fonts.bodySemiBold, fontSize: 11, color: colors.studioGreen },
  successPrice: { fontFamily: typography.fonts.serifBold, fontSize: 20, color: colors.studioTerracotta, marginBottom: 22 },
  successCTA: {
    width: '100%', backgroundColor: colors.studioTerracotta,
    borderRadius: 26, paddingVertical: 14, alignItems: 'center', marginBottom: 12,
  },
  successCTAText: { fontFamily: typography.fonts.bodySemiBold, fontSize: 15, color: colors.white },
  successBack: { paddingVertical: 10 },
  successBackText: { fontFamily: typography.fonts.bodyMedium, fontSize: 13, color: colors.textBody, textDecorationLine: 'underline' },
});