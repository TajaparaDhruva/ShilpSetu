import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Sun, Image as ImageIcon, Crosshair, Sparkles, X, Check } from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';

const TIPS = [
  {
    icon: Sun,
    title: 'Natural Daylight',
    desc: 'Photograph near an open window or in soft morning/afternoon sunlight. Avoid harsh camera flash.',
  },
  {
    icon: ImageIcon,
    title: 'Clean Neutral Background',
    desc: 'Use a plain cotton sheet, neutral wooden board, or clear table so your craft stands out.',
  },
  {
    icon: Crosshair,
    title: 'Perspective & 45° Angle',
    desc: 'Hold the camera at eye level or a slight 45-degree angle to showcase 3D depth and volume.',
  },
  {
    icon: Sparkles,
    title: 'Highlight Handcrafted Details',
    desc: 'Tap your camera screen on the intricate carvings, painted patterns, or hand-woven textures.',
  },
];

export const ImageTipsBottomSheet = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={styles.sheetContainer}>
          {/* Top handle bar */}
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Artisan Photo Tips</Text>
              <Text style={styles.subtitle}>
                Simple guidance to create marketplace-ready photos
              </Text>
            </View>

            <TouchableOpacity
              onPress={onClose}
              style={styles.closeBtn}
              activeOpacity={0.7}
            >
              <X size={20} color={colors.studioDarkBrown} />
            </TouchableOpacity>
          </View>

          {/* Tips List */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
          >
            {TIPS.map((tip, index) => {
              const IconComp = tip.icon;
              return (
                <View key={index} style={styles.tipCard}>
                  <View style={styles.iconCircle}>
                    <IconComp size={20} color={colors.studioTerracotta} />
                  </View>
                  <View style={styles.tipTextWrap}>
                    <Text style={styles.tipTitle}>
                      {index + 1}. {tip.title}
                    </Text>
                    <Text style={styles.tipDesc}>{tip.desc}</Text>
                  </View>
                </View>
              );
            })}

            {/* AI benefit note */}
            <View style={styles.aiNoteBox}>
              <Sparkles size={18} color={colors.studioGreen} style={{ marginRight: 8 }} />
              <Text style={styles.aiNoteText}>
                Our AI Studio automatically balances light and sharpens patterns, but starting with a clear photo gives you the finest result!
              </Text>
            </View>
          </ScrollView>

          {/* Dismiss Button */}
          <TouchableOpacity
            style={styles.gotItButton}
            onPress={onClose}
            activeOpacity={0.85}
          >
            <Check size={18} color={colors.white} style={{ marginRight: 6 }} />
            <Text style={styles.gotItText}>Got It, Keep Creating</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(35, 25, 22, 0.45)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  sheetContainer: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    maxHeight: '80%',
    shadowColor: colors.studioDarkBrown,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  handle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 12,
  },
  title: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 20,
    color: colors.studioDarkBrown,
  },
  subtitle: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentList: {
    paddingVertical: 4,
    gap: 12,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: colors.bgAlt,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tipTextWrap: {
    flex: 1,
  },
  tipTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.studioDarkBrown,
    marginBottom: 2,
  },
  tipDesc: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textBody,
    lineHeight: 18,
  },
  aiNoteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.studioGreenBg,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#C5E0D0',
    marginTop: 6,
    marginBottom: 8,
  },
  aiNoteText: {
    flex: 1,
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.studioGreen,
    lineHeight: 17,
  },
  gotItButton: {
    backgroundColor: colors.studioTerracotta,
    borderRadius: 24,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    shadowColor: colors.studioTerracotta,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  gotItText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.white,
  },
});

export default ImageTipsBottomSheet;