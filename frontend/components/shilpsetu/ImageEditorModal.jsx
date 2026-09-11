import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  RotateCw,
  Crop,
  Sun,
  Sliders,
  Check,
  X,
  RotateCcw,
} from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';

export const ImageEditorModal = ({
  visible,
  imageSource,
  initialSettings = {
    rotation: 0,
    aspectRatio: 'original',
    brightness: 0,
    contrast: 'natural',
  },
  onClose,
  onSave,
}) => {
  const [rotation, setRotation] = useState(initialSettings.rotation);
  const [aspectRatio, setAspectRatio] = useState(
    initialSettings.aspectRatio
  );
  const [brightness, setBrightness] = useState(initialSettings.brightness);
  const [contrast, setContrast] = useState(
    initialSettings.contrast
  );
  const [activeTab, setActiveTab] = useState('rotate');

  const handleRotateRight = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleRotateLeft = () => {
    setRotation((prev) => (prev - 90 + 360) % 360);
  };

  const handleReset = () => {
    setRotation(0);
    setAspectRatio('original');
    setBrightness(0);
    setContrast('natural');
  };

  const handleSave = () => {
    onSave({
      rotation,
      aspectRatio,
      brightness,
      contrast,
    });
    onClose();
  };

  const getImageContainerStyle = () => {
    switch (aspectRatio) {
      case '1:1':
        return { aspectRatio: 1 };
      case '4:3':
        return { aspectRatio: 4 / 3 };
      default:
        return { height: 230 };
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.iconBtn}>
              <X size={20} color={colors.studioDarkBrown} />
            </TouchableOpacity>

            <View style={styles.titleWrap}>
              <Text style={styles.title}>Edit Original Image</Text>
              <Text style={styles.subtitle}>Adjust crop, rotation & basic tone</Text>
            </View>

            <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
              <RotateCcw size={15} color={colors.textBody} style={{ marginRight: 4 }} />
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Live Image Preview Area */}
          <View style={styles.previewContainer}>
            <View style={[styles.imageWrapper, getImageContainerStyle()]}>
              <Image
                source={imageSource}
                style={[
                  styles.previewImage,
                  {
                    transform: [{ rotate: `${rotation}deg` }],
                    opacity: brightness === -1 ? 0.8 : brightness === 1 ? 1 : 0.92,
                  },
                ]}
                resizeMode="cover"
              />

              {/* Simulated Grid Overlay for cropping */}
              {activeTab === 'crop' && (
                <View style={styles.cropGridOverlay}>
                  <View style={styles.cropGridH1} />
                  <View style={styles.cropGridH2} />
                  <View style={styles.cropGridV1} />
                  <View style={styles.cropGridV2} />
                </View>
              )}
            </View>

            <Text style={styles.indicatorText}>
              Rotation: {rotation}┬░ | Aspect: {aspectRatio}
            </Text>
          </View>

          {/* Control Tabs */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'rotate' && styles.tabButtonActive]}
              onPress={() => setActiveTab('rotate')}
            >
              <RotateCw size={16} color={activeTab === 'rotate' ? colors.studioTerracotta : colors.textBody} />
              <Text style={[styles.tabText, activeTab === 'rotate' && styles.tabTextActive]}>
                Rotate
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'crop' && styles.tabButtonActive]}
              onPress={() => setActiveTab('crop')}
            >
              <Crop size={16} color={activeTab === 'crop' ? colors.studioTerracotta : colors.textBody} />
              <Text style={[styles.tabText, activeTab === 'crop' && styles.tabTextActive]}>
                Crop Ratio
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'tune' && styles.tabButtonActive]}
              onPress={() => setActiveTab('tune')}
            >
              <Sliders size={16} color={activeTab === 'tune' ? colors.studioTerracotta : colors.textBody} />
              <Text style={[styles.tabText, activeTab === 'tune' && styles.tabTextActive]}>
                Lighting
              </Text>
            </TouchableOpacity>
          </View>

          {/* Controls Body */}
          <View style={styles.controlsBody}>
            {activeTab === 'rotate' && (
              <View style={styles.controlsRow}>
                <TouchableOpacity style={styles.controlOptionBtn} onPress={handleRotateLeft}>
                  <RotateCcw size={18} color={colors.studioTerracotta} />
                  <Text style={styles.controlOptionText}>-90┬░ Left</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlOptionBtn} onPress={handleRotateRight}>
                  <RotateCw size={18} color={colors.studioTerracotta} />
                  <Text style={styles.controlOptionText}>+90┬░ Right</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.controlOptionBtn, rotation === 180 && styles.controlOptionBtnActive]}
                  onPress={() => setRotation((prev) => (prev === 180 ? 0 : 180))}
                >
                  <Text style={styles.controlOptionText}>180┬░ Flip</Text>
                </TouchableOpacity>
              </View>
            )}

            {activeTab === 'crop' && (
              <View style={styles.controlsRow}>
                <TouchableOpacity
                  style={[styles.controlOptionBtn, aspectRatio === 'original' && styles.controlOptionBtnActive]}
                  onPress={() => setAspectRatio('original')}
                >
                  <Text style={[styles.controlOptionText, aspectRatio === 'original' && styles.controlOptionTextActive]}>
                    Original
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.controlOptionBtn, aspectRatio === '1:1' && styles.controlOptionBtnActive]}
                  onPress={() => setAspectRatio('1:1')}
                >
                  <Text style={[styles.controlOptionText, aspectRatio === '1:1' && styles.controlOptionTextActive]}>
                    Square 1:1
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.controlOptionBtn, aspectRatio === '4:3' && styles.controlOptionBtnActive]}
                  onPress={() => setAspectRatio('4:3')}
                >
                  <Text style={[styles.controlOptionText, aspectRatio === '4:3' && styles.controlOptionTextActive]}>
                    Standard 4:3
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {activeTab === 'tune' && (
              <View style={styles.tuneCol}>
                <View style={styles.tuneRow}>
                  <Text style={styles.tuneLabel}>Brightness:</Text>
                  <View style={styles.tunePills}>
                    <TouchableOpacity
                      style={[styles.tunePill, brightness === -1 && styles.tunePillActive]}
                      onPress={() => setBrightness(-1)}
                    >
                      <Text style={[styles.tunePillText, brightness === -1 && styles.tunePillTextActive]}>Muted</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.tunePill, brightness === 0 && styles.tunePillActive]}
                      onPress={() => setBrightness(0)}
                    >
                      <Text style={[styles.tunePillText, brightness === 0 && styles.tunePillTextActive]}>Normal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.tunePill, brightness === 1 && styles.tunePillActive]}
                      onPress={() => setBrightness(1)}
                    >
                      <Text style={[styles.tunePillText, brightness === 1 && styles.tunePillTextActive]}>Bright</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={[styles.tuneRow, { marginTop: 10 }]}>
                  <Text style={styles.tuneLabel}>Tone:</Text>
                  <View style={styles.tunePills}>
                    <TouchableOpacity
                      style={[styles.tunePill, contrast === 'soft' && styles.tunePillActive]}
                      onPress={() => setContrast('soft')}
                    >
                      <Text style={[styles.tunePillText, contrast === 'soft' && styles.tunePillTextActive]}>Soft</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.tunePill, contrast === 'natural' && styles.tunePillActive]}
                      onPress={() => setContrast('natural')}
                    >
                      <Text style={[styles.tunePillText, contrast === 'natural' && styles.tunePillTextActive]}>Natural</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.tunePill, contrast === 'punchy' && styles.tunePillActive]}
                      onPress={() => setContrast('punchy')}
                    >
                      <Text style={[styles.tunePillText, contrast === 'punchy' && styles.tunePillTextActive]}>Vivid</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Check size={18} color={colors.white} style={{ marginRight: 6 }} />
              <Text style={styles.saveBtnText}>Apply & Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 20, 16, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 390,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 17,
    color: colors.studioDarkBrown,
  },
  subtitle: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textBody,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: colors.bg,
  },
  resetText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.textBody,
  },
  previewContainer: {
    alignItems: 'center',
    backgroundColor: colors.bgAlt,
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageWrapper: {
    width: '100%',
    maxHeight: 240,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#EBE2D5',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  cropGridOverlay: {
    ...StyleSheet.absoluteFill,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.85)',
  },
  cropGridH1: {
    position: 'absolute',
    top: '33.3%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  cropGridH2: {
    position: 'absolute',
    top: '66.6%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  cropGridV1: {
    position: 'absolute',
    left: '33.3%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  cropGridV2: {
    position: 'absolute',
    left: '66.6%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  indicatorText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 6,
  },
  tabRow: {
    flexDirection: 'row',
    marginTop: 12,
    backgroundColor: colors.bg,
    borderRadius: 12,
    padding: 3,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 9,
    gap: 5,
  },
  tabButtonActive: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.textBody,
  },
  tabTextActive: {
    fontFamily: typography.fonts.bodySemiBold,
    color: colors.studioTerracotta,
  },
  controlsBody: {
    paddingVertical: 12,
    minHeight: 60,
    justifyContent: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  controlOptionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 10,
    gap: 6,
  },
  controlOptionBtnActive: {
    borderColor: colors.studioTerracotta,
    backgroundColor: '#F7EDE6',
  },
  controlOptionText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.studioDarkBrown,
  },
  controlOptionTextActive: {
    fontFamily: typography.fonts.bodySemiBold,
    color: colors.studioTerracotta,
  },
  tuneCol: {
    gap: 8,
  },
  tuneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tuneLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.studioDarkBrown,
    width: 80,
  },
  tunePills: {
    flexDirection: 'row',
    flex: 1,
    gap: 6,
  },
  tunePill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tunePillActive: {
    backgroundColor: colors.studioTerracotta,
    borderColor: colors.studioTerracotta,
  },
  tunePillText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11,
    color: colors.textBody,
  },
  tunePillTextActive: {
    fontFamily: typography.fonts.bodySemiBold,
    color: colors.white,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  cancelBtnText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 14,
    color: colors.textBody,
  },
  saveBtn: {
    flex: 1.4,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: colors.studioTerracotta,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.studioTerracotta,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  saveBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.white,
  },
});

export default ImageEditorModal;