import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Bell,
  Sparkles,
  Lightbulb,
  Pencil,
  Paperclip,
  FileText,
  Tag,
  MessageSquare,
  Send,
  Home,
  Compass,
  Plus,
  Inbox,
  User,
  ArrowRight,
  X,
  Check,
} from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import IndianCraftBorder from '../../components/shilpsetu/IndianCraftBorder';

const PRODUCT_IMAGE = require('../../assets/images/terracotta_vase_product.jpg');

function BotanicalLeaf() {
  return (
    <Svg width={20} height={32} viewBox="0 0 20 32">
      <Path
        d="M10 30 C10 30 1 22 1 13 C1 5 4 1 10 1 C16 1 19 5 19 13 C19 22 10 30 10 30Z"
        fill="none"
        stroke="#B5502B"
        strokeWidth={1}
        opacity={0.35}
      />
      <Path d="M10 30 L10 1" stroke="#B5502B" strokeWidth={0.8} opacity={0.2} />
    </Svg>
  );
}

export default function AIRequirementCreatorScreen() {
  const router = useRouter();

  const [prompt, setPrompt] = useState(
    'I need 500 handmade terracotta mugs for my home decor store in Delhi. Looking for traditional designs with matte finish. Required within 30 days.'
  );
  const [isGenerating, setIsGenerating] = useState(false);

  // Extracted fields (deterministic local AI mock)
  const [requirementData, setRequirementData] = useState({
    product: 'Handcrafted Terracotta Mugs',
    quantity: '500 pieces',
    targetPrice: '₹180 – ₹250 per piece',
    purpose: 'For home decor retail store',
    designPreference: 'Traditional Indian designs, matte finish',
    location: 'Delhi, India',
    requiredBy: 'Within 30 days',
  });

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [imagesAttached, setImagesAttached] = useState(false);
  const [editForm, setEditForm] = useState({
    product: '',
    quantity: '',
    targetPrice: '',
    location: '',
    requiredBy: '',
    purpose: '',
    designPreference: '',
    notes: '',
  });

  const handleUseExample = (exampleText) => {
    setPrompt(exampleText);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1200);
  };

  const openEditModal = () => {
    setEditForm({
      product: requirementData.product,
      quantity: requirementData.quantity,
      targetPrice: requirementData.targetPrice,
      location: requirementData.location,
      requiredBy: requirementData.requiredBy,
      purpose: requirementData.purpose,
      designPreference: requirementData.designPreference,
      notes: requirementData.notes || '',
    });
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    setRequirementData((prev) => ({
      ...prev,
      ...editForm,
    }));
    setIsEditModalVisible(false);
  };

  const handleToggleImages = () => {
    const nextState = !imagesAttached;
    setImagesAttached(nextState);
    Alert.alert(
      nextState ? 'Reference Images Attached' : 'Images Removed',
      nextState
        ? 'Reference craft photo has been attached to this requirement.'
        : 'Reference craft photo has been detached.'
    );
  };

  const handleCreateRequirement = () => {
    router.push({
      pathname: '/buyer/requirement-review',
      params: {
        product: requirementData.product,
        quantity: requirementData.quantity,
        targetPrice: requirementData.targetPrice,
        location: requirementData.location,
        requiredBy: requirementData.requiredBy,
        purpose: requirementData.purpose,
        designPreference: requirementData.designPreference,
        prompt: prompt,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.circleBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ChevronLeft size={22} color={colors.studioDarkBrown} />
        </TouchableOpacity>

        <Logo size="sm" showSubtitle={true} />

        <View style={styles.headerRight}>
          <View style={styles.bellWrapper}>
            <TouchableOpacity style={styles.circleBtn}>
              <Bell size={18} color={colors.studioDarkBrown} />
            </TouchableOpacity>
            <View style={styles.bellDot} />
          </View>
          <View style={styles.avatarRS}>
            <Text style={styles.avatarRSText}>RS</Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Title */}
        <View style={styles.heroRow}>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>AI Requirement Creator</Text>
            <Text style={styles.heroSubtitle}>
              Describe what you need in simple words, and our AI will help you
              create a detailed requirement.
            </Text>
          </View>
          <View style={styles.mottoStamp}>
            <Text style={styles.mottoLine}>From</Text>
            <Text style={styles.mottoLine}>Your Need</Text>
            <Text style={styles.mottoLine}>to Real</Text>
            <Text style={styles.mottoLine}>Opportunities</Text>
            <BotanicalLeaf />
          </View>
        </View>

        {/* Step 1 Card */}
        <View style={styles.card}>
          <View style={styles.stepHeaderRow}>
            <View style={styles.stepNumCircle}>
              <Text style={styles.stepNumText}>1</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepTitle}>Tell us what you need</Text>
              <Text style={styles.stepSub}>
                Type your requirement in natural language (e.g. product,
                quantity, usage, etc.)
              </Text>
            </View>
          </View>

          <TextInput
            style={styles.inputArea}
            value={prompt}
            onChangeText={setPrompt}
            multiline
            numberOfLines={4}
            maxLength={500}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{prompt.length}/500</Text>

          {/* Example chips */}
          <View style={styles.examplesHeaderRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Lightbulb size={13} color={colors.studioTerracotta} />
              <Text style={styles.exampleTitle}>Try these examples</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.useExampleLink}>Use Example</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsRow}
          >
            <TouchableOpacity
              style={styles.exampleChip}
              onPress={() =>
                handleUseExample('I need 1,000 jute bags for corporate gifting')
              }
            >
              <Text style={styles.exampleChipText}>
                I need 1,000 jute bags for corporate gifting
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.exampleChip}
              onPress={() =>
                handleUseExample('Looking for handcrafted diwali gift sets')
              }
            >
              <Text style={styles.exampleChipText}>
                Looking for handcrafted diwali gift sets
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.exampleChip}
              onPress={() =>
                handleUseExample('Need ceramic planters for retail stores')
              }
            >
              <Text style={styles.exampleChipText}>
                Need ceramic planters for retail stores
              </Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Generate CTA */}
          <TouchableOpacity
            style={styles.generateBtn}
            onPress={handleGenerate}
            activeOpacity={0.85}
          >
            {isGenerating ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <>
                <Sparkles size={16} color={colors.white} />
                <Text style={styles.generateBtnText}>Generate with AI</Text>
                <ArrowRight size={14} color={colors.white} />
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Step 2 Card */}
        <View style={styles.card}>
          <View style={styles.stepHeaderRow}>
            <View style={styles.stepNumCircle}>
              <Text style={styles.stepNumText}>2</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepTitle}>
                Review AI Generated Requirement
              </Text>
              <Text style={styles.stepSub}>
                You can edit the details before posting.
              </Text>
            </View>
            <TouchableOpacity style={styles.editBtn} onPress={openEditModal} activeOpacity={0.7}>
              <Pencil size={12} color={colors.studioTerracotta} />
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.reviewContentRow}>
            {/* Table */}
            <View style={styles.reviewTable}>
              <View style={styles.reviewRow}>
                <Text style={styles.tableLabel}>Product</Text>
                <Text style={styles.tableValue}>{requirementData.product}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.tableLabel}>Quantity</Text>
                <Text style={styles.tableValue}>{requirementData.quantity}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.tableLabel}>Target Price (Optional)</Text>
                <Text style={styles.tableValue}>{requirementData.targetPrice}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.tableLabel}>Purpose</Text>
                <Text style={styles.tableValue}>{requirementData.purpose}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.tableLabel}>Design Preference</Text>
                <Text style={styles.tableValue}>
                  {requirementData.designPreference}
                </Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.tableLabel}>Delivery Location</Text>
                <Text style={styles.tableValue}>{requirementData.location}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.tableLabel}>Required By</Text>
                <Text style={styles.tableValue}>{requirementData.requiredBy}</Text>
              </View>
            </View>

            {/* Thumbnail */}
            <Image source={PRODUCT_IMAGE} style={styles.reviewThumb} />
          </View>
        </View>

        {/* Step 3 Card */}
        <View style={styles.card}>
          <View style={styles.stepHeaderRow}>
            <View style={styles.stepNumCircle}>
              <Text style={styles.stepNumText}>3</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepTitle}>
                Add Additional Details{' '}
                <Text style={styles.optionalText}>(Optional)</Text>
              </Text>
            </View>
          </View>

          <View style={styles.detailsGrid}>
            <TouchableOpacity
              style={[styles.detailOption, imagesAttached && styles.detailOptionActive]}
              onPress={handleToggleImages}
              activeOpacity={0.7}
            >
              <Paperclip size={14} color={imagesAttached ? '#2E6B4E' : colors.studioTerracotta} />
              <Text style={[styles.detailOptionText, imagesAttached && styles.detailOptionTextActive]}>
                {imagesAttached ? 'Reference Attached ✓' : 'Attach Reference Images'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detailOption}
              onPress={openEditModal}
              activeOpacity={0.7}
            >
              <FileText size={14} color={colors.studioTerracotta} />
              <Text style={styles.detailOptionText}>Add Specifications</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detailOption}
              onPress={openEditModal}
              activeOpacity={0.7}
            >
              <Tag size={14} color={colors.studioTerracotta} />
              <Text style={styles.detailOptionText}>Mention Budget Range</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detailOption}
              onPress={openEditModal}
              activeOpacity={0.7}
            >
              <MessageSquare size={14} color={colors.studioTerracotta} />
              <Text style={styles.detailOptionText}>Add Notes</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Create Requirement CTA */}
        <TouchableOpacity
          style={styles.createBtn}
          onPress={handleCreateRequirement}
          activeOpacity={0.85}
        >
          <Send size={16} color={colors.white} />
          <Text style={styles.createBtnText}>Create Requirement</Text>
          <ArrowRight size={14} color={colors.white} />
        </TouchableOpacity>

        <IndianCraftBorder />
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push({ pathname: '/buyer/home' })}
          activeOpacity={0.7}
        >
          <Home size={22} color={colors.textMuted} />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push({ pathname: '/buyer/smart-match' })}
          activeOpacity={0.7}
        >
          <Compass size={22} color={colors.textMuted} />
          <Text style={styles.navLabel}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navFab} activeOpacity={0.8}>
          <Plus size={24} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/(tabs)/requests')}
          activeOpacity={0.7}
        >
          <Inbox size={22} color={colors.textMuted} />
          <Text style={styles.navLabel}>Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/(tabs)/profile')}
          activeOpacity={0.7}
        >
          <User size={22} color={colors.textMuted} />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Requirement Details Modal */}
      <Modal visible={isEditModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.editModalContent}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Edit Requirement Details</Text>
              <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
                <X size={20} color={colors.studioDarkBrown} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Product Title</Text>
              <TextInput
                style={styles.modalInput}
                value={editForm.product}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, product: text }))}
              />

              <Text style={styles.inputLabel}>Quantity</Text>
              <TextInput
                style={styles.modalInput}
                value={editForm.quantity}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, quantity: text }))}
              />

              <Text style={styles.inputLabel}>Target Price / Budget</Text>
              <TextInput
                style={styles.modalInput}
                value={editForm.targetPrice}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, targetPrice: text }))}
              />

              <Text style={styles.inputLabel}>Delivery Location</Text>
              <TextInput
                style={styles.modalInput}
                value={editForm.location}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, location: text }))}
              />

              <Text style={styles.inputLabel}>Design & Specifications</Text>
              <TextInput
                style={[styles.modalInput, { height: 64, textAlignVertical: 'top' }]}
                multiline
                value={editForm.designPreference}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, designPreference: text }))}
              />

              <Text style={styles.inputLabel}>Additional Notes</Text>
              <TextInput
                style={[styles.modalInput, { height: 60, textAlignVertical: 'top' }]}
                multiline
                placeholder="Special packaging, delivery timeline, or notes..."
                placeholderTextColor={colors.textMuted}
                value={editForm.notes}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, notes: text }))}
              />
            </ScrollView>

            <View style={styles.modalActionRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveBtn}
                onPress={handleSaveEdit}
              >
                <Check size={16} color={colors.white} />
                <Text style={styles.modalSaveText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.studioCream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.studioCream,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellWrapper: {
    position: 'relative',
  },
  bellDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E53935',
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  avatarRS: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F7E7DF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarRSText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
    color: colors.studioTerracotta,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  heroText: {
    flex: 1,
    paddingRight: 10,
  },
  heroTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 28,
    color: colors.studioDarkBrown,
    lineHeight: 34,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    lineHeight: 18,
  },
  mottoStamp: {
    backgroundColor: '#F5ECD8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: 'center',
  },
  mottoLine: {
    fontFamily: typography.fonts.script,
    fontSize: 12.5,
    color: colors.studioDarkBrown,
    lineHeight: 14,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 14,
  },
  stepHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  stepNumCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F7E7DF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 13,
    color: colors.studioTerracotta,
  },
  stepTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 14,
    color: colors.studioDarkBrown,
  },
  stepSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 15,
  },
  inputArea: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 10,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.studioDarkBrown,
    backgroundColor: '#FAF4EE',
    minHeight: 70,
  },
  charCount: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'right',
    marginTop: 3,
    marginBottom: 8,
  },
  examplesHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  exampleTitle: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11,
    color: colors.studioDarkBrown,
  },
  useExampleLink: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11,
    color: colors.studioTerracotta,
  },
  chipsRow: {
    gap: 8,
    paddingBottom: 4,
    marginBottom: 12,
  },
  exampleChip: {
    backgroundColor: '#FAF4EE',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  exampleChipText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textBody,
  },
  generateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.studioTerracotta,
    borderRadius: 22,
    paddingVertical: 12,
  },
  generateBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13.5,
    color: colors.white,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  editText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11.5,
    color: colors.studioTerracotta,
  },
  reviewContentRow: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#FAF4EE',
    borderRadius: 10,
    padding: 10,
  },
  reviewTable: {
    flex: 1,
    gap: 4,
  },
  reviewRow: {
    paddingVertical: 2,
  },
  tableLabel: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
  },
  tableValue: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11.5,
    color: colors.studioDarkBrown,
  },
  reviewThumb: {
    width: 80,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  optionalText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  detailOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FAF4EE',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '48%',
  },
  detailOptionText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.studioDarkBrown,
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.studioTerracotta,
    borderRadius: 24,
    paddingVertical: 14,
    marginBottom: 16,
  },
  createBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.white,
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 8,
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    gap: 3,
    flex: 1,
  },
  navLabel: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
  },
  navFab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.studioTerracotta,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -16,
    shadowColor: colors.studioTerracotta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  detailOptionActive: {
    backgroundColor: '#E6F4ED',
    borderColor: '#2E6B4E',
  },
  detailOptionTextActive: {
    color: '#2E6B4E',
    fontFamily: typography.fonts.bodySemiBold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  editModalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '85%',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 18,
    color: colors.studioDarkBrown,
  },
  inputLabel: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.studioDarkBrown,
    marginTop: 10,
    marginBottom: 4,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: colors.studioDarkBrown,
    backgroundColor: '#FAF4EE',
  },
  modalActionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    paddingBottom: 8,
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalCancelText: {
    fontFamily: typography.fonts.bodyMedium,
    color: colors.studioDarkBrown,
    fontSize: 14,
  },
  modalSaveBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: colors.studioTerracotta,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    gap: 6,
  },
  modalSaveText: {
    fontFamily: typography.fonts.bodySemiBold,
    color: colors.white,
    fontSize: 14,
  },
});