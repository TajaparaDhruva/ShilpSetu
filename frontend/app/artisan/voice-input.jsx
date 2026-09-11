import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  Easing,
  Modal,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  HelpCircle,
  Mic,
  Square,
  Globe,
  ChevronDown,
  Sparkles,
  Pencil,
  RotateCcw,
  Volume2,
  Check,
  X,
  ArrowRight,
  Lightbulb,
  Play,
  FileText,
  Languages,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import IndianCraftBorder from '../../components/shilpsetu/IndianCraftBorder';

// Supported Indian regional languages
const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'αñ╣αñ┐αñ¿αÑìαñªαÑÇ' },
  { code: 'gu', name: 'Gujarati', native: 'α¬ùα½üα¬£α¬░α¬╛α¬ñα½Ç' },
  { code: 'mr', name: 'Marathi', native: 'αñ«αñ░αñ╛αñáαÑÇ' },
  { code: 'bn', name: 'Bengali', native: 'αª¼αª╛αªéαª▓αª╛' },
  { code: 'ta', name: 'Tamil', native: 'α«ñα««α«┐α«┤α»ì' },
  { code: 'te', name: 'Telugu', native: 'α░ñα▒åα░▓α▒üα░ùα▒ü' },
  { code: 'kn', name: 'Kannada', native: 'α▓òα▓¿α│ìα▓¿α▓í' },
];

// Realistic mock artisan transcripts for speech-to-text simulation
const MOCK_TRANSCRIPTS = [
  'I make traditional terracotta pots by hand using locally sourced clay. Each pot is shaped and decorated with beautiful patterns inspired by the folk art of my village.',
  'This is a handmade clay water pitcher made on a potterΓÇÖs wheel and fired in a traditional kiln. It is painted with natural white clay motifs and keeps water naturally cool.',
  'Handcrafted decorative vase featuring geometric and tribal engravings. Made using riverbed terracotta and finished with natural earthy burnishing.',
];

export default function VoiceInputScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Voice & workflow state
  const [voiceState, setVoiceState] = useState('IDLE');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLangPickerVisible, setIsLangPickerVisible] = useState(false);
  const [transcript, setTranscript] = useState(MOCK_TRANSCRIPTS[0]);
  const [tempEditedText, setTempEditedText] = useState(MOCK_TRANSCRIPTS[0]);
  const [transcriptIndex, setTranscriptIndex] = useState(0);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Modal sheets for bottom shortcuts
  const [activeShortcutModal, setActiveShortcutModal] = useState<
    'how_it_works' | 'examples' | 'language_help' | null
  >(null);

  // Animations
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;
  const waveAnim1 = useRef(new Animated.Value(12)).current;
  const waveAnim2 = useRef(new Animated.Value(24)).current;
  const waveAnim3 = useRef(new Animated.Value(18)).current;
  const waveAnim4 = useRef(new Animated.Value(30)).current;
  const waveAnim5 = useRef(new Animated.Value(16)).current;

  // Recording timer and pulse loop
  useEffect(() => {
    let timer= null;
    let pulseLoop= null;
    let waveLoop= null;

    if (voiceState === 'RECORDING') {
      setRecordingSeconds(0);
      timer = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);

      // Pulse animation for mic button
      pulseAnim.setValue(1);
      pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.12,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
        ])
      );
      pulseLoop.start();

      // Ripple animation
      rippleAnim.setValue(0);
      Animated.loop(
        Animated.timing(rippleAnim, {
          toValue: 1,
          duration: 1400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        })
      ).start();

      // Soundwave bars animation
      const animateBar = (anim, min, max, dur) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: max,
              duration: dur,
              useNativeDriver: false,
            }),
            Animated.timing(anim, {
              toValue: min,
              duration: dur,
              useNativeDriver: false,
            }),
          ])
        );
      };

      waveLoop = Animated.parallel([
        animateBar(waveAnim1, 8, 36, 420),
        animateBar(waveAnim2, 14, 48, 510),
        animateBar(waveAnim3, 10, 42, 380),
        animateBar(waveAnim4, 16, 52, 460),
        animateBar(waveAnim5, 8, 38, 490),
      ]);
      waveLoop.start();
    }

    return () => {
      if (timer) clearInterval(timer);
      if (pulseLoop) pulseLoop.stop();
      if (waveLoop) waveLoop.stop();
    };
  }, [voiceState]);

  // Handle Processing state simulation
  useEffect(() => {
    if (voiceState === 'PROCESSING') {
      const processingTimer = setTimeout(() => {
        // Select next transcript variant
        const nextIdx = (transcriptIndex + 1) % MOCK_TRANSCRIPTS.length;
        setTranscriptIndex(nextIdx);
        setTranscript(MOCK_TRANSCRIPTS[nextIdx]);
        setTempEditedText(MOCK_TRANSCRIPTS[nextIdx]);
        setVoiceState('TRANSCRIBED');
      }, 1600);

      return () => clearTimeout(processingTimer);
    }
  }, [voiceState, transcriptIndex]);

  // Audio playback simulation
  const handleTogglePlayback = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 3500);
    }
  };

  const handleStartRecording = () => {
    setVoiceState('RECORDING');
  };

  const handleStopRecording = () => {
    setVoiceState('PROCESSING');
  };

  const handleRecordAgain = () => {
    setVoiceState('RECORDING');
  };

  const handleSaveEdit = () => {
    setTranscript(tempEditedText);
    setVoiceState('TRANSCRIBED');
  };

  const handleCancelEdit = () => {
    setTempEditedText(transcript);
    setVoiceState('TRANSCRIBED');
  };

  const handleAcceptAndContinue = () => {
    // Navigate forward to Screen 19: AI Catalog Review
    router.push({
      pathname: '/artisan/catalog-review',
      params: {
        transcript,
        language: selectedLanguage,
        variantName: params.variantName || 'Studio Warm Glow',
      },
    });
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `0${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.studioCream} />

      {/* ── TOP HEADER (With Official ShilpSetu Logo) ── */}
      <View style={styles.header}>
        {/* Back Button returning to Screen 17 */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.circleBtn}
          activeOpacity={0.7}
          accessibilityLabel="Back to Screen 17 Image Studio"
        >
          <ChevronLeft size={22} color={colors.studioDarkBrown} />
        </TouchableOpacity>

        {/* Center Official ShilpSetu Logo */}
        <Logo size="sm" showSubtitle={true} />

        {/* Help Button */}
        <TouchableOpacity
          onPress={() => setActiveShortcutModal('how_it_works')}
          style={styles.circleBtn}
          activeOpacity={0.7}
          accessibilityLabel="Voice input assistance"
        >
          <HelpCircle size={21} color={colors.studioDarkBrown} />
        </TouchableOpacity>
      </View>

      {/* ── MAIN SCROLLABLE CONTENT ── */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* SCREEN TITLE & SUBTITLE */}
        <View style={styles.titleSection}>
          <Text style={styles.screenTitle}>Tell Us About Your Craft</Text>
          <Text style={styles.screenSubtitle}>
            Describe your product naturally.{'\n'}You can speak in your preferred language.
          </Text>
        </View>

        {/* INFORMATIONAL BENEFIT CARD */}
        <View style={styles.benefitCard}>
          <View style={styles.benefitIconWrap}>
            <Mic size={20} color={colors.studioTerracotta} />
          </View>
          <Text style={styles.benefitText}>
            Your voice helps us understand your product better and create the perfect listing for you.
          </Text>
        </View>

        {/* LANGUAGE SELECTOR ROW */}
        <View style={styles.languageRow}>
          <View style={styles.languageLeft}>
            <Globe size={18} color={colors.textBody} style={{ marginRight: 6 }} />
            <Text style={styles.languageLabel}>Language</Text>
          </View>

          <TouchableOpacity
            style={styles.languagePill}
            onPress={() => setIsLangPickerVisible(true)}
            activeOpacity={0.75}
          >
            <Text style={styles.languagePillText}>{selectedLanguage}</Text>
            <ChevronDown size={14} color={colors.textBody} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>

        {/* ── MAIN MICROPHONE INTERACTION AREA ── */}
        <View style={styles.micCardContainer}>
          {/* Subtle Concentric Decorative Ring Background */}
          <View style={styles.mandalaRingBackground} pointerEvents="none">
            <Svg width={230} height={230} viewBox="0 0 230 230">
              <Circle cx="115" cy="115" r="108" stroke={colors.border} strokeWidth="1" strokeDasharray="5 5" fill="none" />
              <Circle cx="115" cy="115" r="88" stroke="#EFE4D6" strokeWidth="1" fill="none" />
              <Circle cx="115" cy="115" r="68" stroke={colors.border} strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
            </Svg>
          </View>

          {/* STATES: IDLE / RECORDING / PROCESSING */}
          {voiceState === 'IDLE' && (
            <View style={styles.micCenterBlock}>
              <TouchableOpacity
                style={styles.micButton}
                onPress={handleStartRecording}
                activeOpacity={0.85}
                accessibilityLabel="Start voice recording"
              >
                <Mic size={38} color={colors.white} />
              </TouchableOpacity>

              <Text style={styles.micActionTitle}>Tap to speak</Text>
              <Text style={styles.micActionSub}>
                We'll listen and convert your voice to text
              </Text>
            </View>
          )}

          {voiceState === 'RECORDING' && (
            <View style={styles.micCenterBlock}>
              {/* Outer Pulsing Ring */}
              <Animated.View
                style={[
                  styles.pulseRing,
                  {
                    transform: [{ scale: pulseAnim }],
                    opacity: 0.35,
                  },
                ]}
              />

              <TouchableOpacity
                style={[styles.micButton, styles.micButtonRecording]}
                onPress={handleStopRecording}
                activeOpacity={0.85}
                accessibilityLabel="Stop recording"
              >
                <Square size={28} color={colors.white} fill={colors.white} />
              </TouchableOpacity>

              <Text style={styles.recordingTimer}>{formatTime(recordingSeconds)}</Text>
              <Text style={styles.recordingListeningText}>Listening...</Text>

              {/* Dynamic Sound Wave Bars */}
              <View style={styles.soundWaveRow}>
                <Animated.View style={[styles.waveBar, { height: waveAnim1 }]} />
                <Animated.View style={[styles.waveBar, { height: waveAnim2 }]} />
                <Animated.View style={[styles.waveBar, { height: waveAnim3 }]} />
                <Animated.View style={[styles.waveBar, { height: waveAnim4 }]} />
                <Animated.View style={[styles.waveBar, { height: waveAnim5 }]} />
              </View>

              <TouchableOpacity
                style={styles.finishSpeakingBtn}
                onPress={handleStopRecording}
                activeOpacity={0.8}
              >
                <Text style={styles.finishSpeakingText}>Tap to Finish Speaking</Text>
              </TouchableOpacity>
            </View>
          )}

          {voiceState === 'PROCESSING' && (
            <View style={styles.micCenterBlock}>
              <View style={styles.processingCircle}>
                <Sparkles size={34} color={colors.studioTerracotta} />
              </View>

              <Text style={styles.processingTitle}>Understanding your words...</Text>
              <Text style={styles.micActionSub}>
                AI is converting your speech into product catalog text
              </Text>

              {/* Progress Wave Indicator */}
              <View style={styles.processingWaveTrack}>
                <View style={styles.processingWaveDot} />
                <View style={[styles.processingWaveDot, { opacity: 0.7 }]} />
                <View style={[styles.processingWaveDot, { opacity: 0.4 }]} />
              </View>
            </View>
          )}

          {voiceState === 'ERROR' && (
            <View style={styles.micCenterBlock}>
              <View style={styles.errorIconWrap}>
                <AlertCircle size={36} color={colors.error} />
              </View>
              <Text style={styles.errorHeading}>We couldn't understand the recording</Text>
              <Text style={styles.micActionSub}>
                Please speak a little louder or closer to your phone.
              </Text>

              <TouchableOpacity
                style={styles.retryBtn}
                onPress={() => setVoiceState('RECORDING')}
                activeOpacity={0.8}
              >
                <RotateCcw size={16} color={colors.white} style={{ marginRight: 6 }} />
                <Text style={styles.retryBtnText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* TRANSCRIBED & EDITING STATES */}
          {(voiceState === 'TRANSCRIBED' || voiceState === 'EDITING') && (
            <View style={styles.transcribedCard}>
              {/* Header */}
              <View style={styles.transcribedHeader}>
                <View style={styles.transcribedTitleRow}>
                  <Text style={styles.transcribedCardTitle}>Your Words</Text>
                  <View style={styles.aiBadge}>
                    <Sparkles size={11} color={colors.studioGreen} style={{ marginRight: 3 }} />
                    <Text style={styles.aiBadgeText}>AI Transcribed</Text>
                  </View>
                </View>

                {voiceState === 'TRANSCRIBED' && (
                  <TouchableOpacity
                    style={styles.editIconBtn}
                    onPress={() => setVoiceState('EDITING')}
                    activeOpacity={0.7}
                  >
                    <Pencil size={14} color={colors.studioTerracotta} style={{ marginRight: 4 }} />
                    <Text style={styles.editTextBtn}>Edit</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Content / TextInput */}
              {voiceState === 'TRANSCRIBED' ? (
                <View style={styles.transcriptBox}>
                  <Text style={styles.quoteMark}>ΓÇ£</Text>
                  <Text style={styles.transcriptBody}>{transcript}</Text>
                  <Text style={[styles.quoteMark, { textAlign: 'right' }]}>ΓÇ¥</Text>
                </View>
              ) : (
                <View style={styles.editingBox}>
                  <TextInput
                    style={styles.textInput}
                    multiline
                    numberOfLines={4}
                    value={tempEditedText}
                    onChangeText={setTempEditedText}
                    placeholder="Describe your craft..."
                    placeholderTextColor={colors.textMuted}
                  />

                  <View style={styles.editActionRow}>
                    <TouchableOpacity style={styles.cancelEditBtn} onPress={handleCancelEdit}>
                      <X size={15} color={colors.textBody} style={{ marginRight: 4 }} />
                      <Text style={styles.cancelEditText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.saveEditBtn} onPress={handleSaveEdit}>
                      <Check size={15} color={colors.white} style={{ marginRight: 4 }} />
                      <Text style={styles.saveEditText}>Save Changes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Actions below transcript */}
              {voiceState === 'TRANSCRIBED' && (
                <View style={styles.transcriptActionsRow}>
                  <TouchableOpacity
                    style={styles.smallActionBtn}
                    onPress={handleRecordAgain}
                    activeOpacity={0.75}
                  >
                    <RotateCcw size={14} color={colors.studioDarkBrown} style={{ marginRight: 4 }} />
                    <Text style={styles.smallActionText}>Record Again</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.smallActionBtn,
                      isPlayingAudio && styles.smallActionBtnActive,
                    ]}
                    onPress={handleTogglePlayback}
                    activeOpacity={0.75}
                  >
                    <Volume2
                      size={14}
                      color={isPlayingAudio ? colors.studioTerracotta : colors.studioDarkBrown}
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      style={[
                        styles.smallActionText,
                        isPlayingAudio && { color: colors.studioTerracotta, fontFamily: typography.fonts.bodySemiBold },
                      ]}
                    >
                      {isPlayingAudio ? 'Playing...' : 'Listen'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>

        {/* ── HELPFUL EXAMPLE / GUIDANCE CARD ── */}
        {voiceState !== 'TRANSCRIBED' && voiceState !== 'EDITING' && (
          <View style={styles.exampleGuidanceCard}>
            <View style={styles.exampleHeaderRow}>
              <Lightbulb size={16} color={colors.studioTerracotta} style={{ marginRight: 6 }} />
              <Text style={styles.exampleHeaderTitle}>Try saying something like:</Text>
            </View>

            <View style={styles.exampleTextContainer}>
              <Text style={styles.exampleQuote}>
                ΓÇ£I make traditional terracotta pots by hand using locally sourced clay. Each pot is shaped and decorated with beautiful patterns inspired by the folk art of my village.ΓÇ¥
              </Text>
            </View>
          </View>
        )}

        {/* ── BOTTOM SHORTCUT BUTTONS ── */}
        <View style={styles.shortcutsRow}>
          <TouchableOpacity
            style={styles.shortcutBtn}
            onPress={() => setActiveShortcutModal('how_it_works')}
            activeOpacity={0.75}
          >
            <View style={styles.shortcutIconCircle}>
              <Play size={14} color={colors.studioDarkBrown} />
            </View>
            <Text style={styles.shortcutLabel}>How it works</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shortcutBtn}
            onPress={() => setActiveShortcutModal('examples')}
            activeOpacity={0.75}
          >
            <View style={styles.shortcutIconCircle}>
              <FileText size={14} color={colors.studioDarkBrown} />
            </View>
            <Text style={styles.shortcutLabel}>Examples</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shortcutBtn}
            onPress={() => setActiveShortcutModal('language_help')}
            activeOpacity={0.75}
          >
            <View style={styles.shortcutIconCircle}>
              <Languages size={14} color={colors.studioDarkBrown} />
            </View>
            <Text style={styles.shortcutLabel}>Language Help</Text>
          </TouchableOpacity>
        </View>

        {/* ── PRIMARY ACTION BUTTON ── */}
        <TouchableOpacity
          style={styles.primaryAcceptBtn}
          onPress={handleAcceptAndContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryAcceptText}>Accept & Continue</Text>
          <ArrowRight size={18} color={colors.white} style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {/* TRADITIONAL INDIAN CRAFT BOTTOM BORDER */}
        <IndianCraftBorder color={colors.studioTerracotta} height={46} />
      </ScrollView>

      {/* ── LANGUAGE PICKER MODAL ── */}
      <Modal
        visible={isLangPickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsLangPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Voice Language</Text>
              <TouchableOpacity onPress={() => setIsLangPickerVisible(false)} style={styles.modalCloseBtn}>
                <X size={18} color={colors.studioDarkBrown} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSub}>
              You can speak naturally in any of these languages:
            </Text>

            <View style={styles.langList}>
              {LANGUAGES.map((lang) => {
                const isSelected = selectedLanguage === lang.name;
                return (
                  <TouchableOpacity
                    key={lang.code}
                    style={[styles.langItem, isSelected && styles.langItemActive]}
                    onPress={() => {
                      setSelectedLanguage(lang.name);
                      setIsLangPickerVisible(false);
                    }}
                  >
                    <View>
                      <Text style={[styles.langName, isSelected && styles.langNameActive]}>
                        {lang.name}
                      </Text>
                      <Text style={styles.langNative}>{lang.native}</Text>
                    </View>
                    {isSelected && <CheckCircle2 size={18} color={colors.studioTerracotta} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>

      {/* ── SHORTCUT INFO MODAL (How it works / Examples / Language Help) ── */}
      <Modal
        visible={activeShortcutModal !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setActiveShortcutModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {activeShortcutModal === 'how_it_works' && 'How Voice Input Works'}
                {activeShortcutModal === 'examples' && 'Craft Voice Examples'}
                {activeShortcutModal === 'language_help' && 'Multi-Language Support'}
              </Text>
              <TouchableOpacity onPress={() => setActiveShortcutModal(null)} style={styles.modalCloseBtn}>
                <X size={18} color={colors.studioDarkBrown} />
              </TouchableOpacity>
            </View>

            {activeShortcutModal === 'how_it_works' && (
              <ScrollView style={{ maxHeight: 320 }} showsVerticalScrollIndicator={false}>
                <View style={styles.tipBlock}>
                  <Text style={styles.tipNumber}>1</Text>
                  <Text style={styles.tipDesc}>
                    <Text style={{ fontFamily: typography.fonts.bodySemiBold }}>Speak Comfortably: </Text>
                    Press the mic and describe how you made your craft, materials used, size, and utility.
                  </Text>
                </View>
                <View style={styles.tipBlock}>
                  <Text style={styles.tipNumber}>2</Text>
                  <Text style={styles.tipDesc}>
                    <Text style={{ fontFamily: typography.fonts.bodySemiBold }}>AI Transcribes: </Text>
                    Our voice engine converts your spoken Indian language into clean written text.
                  </Text>
                </View>
                <View style={styles.tipBlock}>
                  <Text style={styles.tipNumber}>3</Text>
                  <Text style={styles.tipDesc}>
                    <Text style={{ fontFamily: typography.fonts.bodySemiBold }}>Review & Edit: </Text>
                    Check the generated words, make any edits, and move forward to catalog review.
                  </Text>
                </View>
              </ScrollView>
            )}

            {activeShortcutModal === 'examples' && (
              <ScrollView style={{ maxHeight: 320 }} showsVerticalScrollIndicator={false}>
                <View style={styles.craftExampleCard}>
                  <Text style={styles.craftExampleCategory}>≡ƒÅ║ Pottery / Terracotta</Text>
                  <Text style={styles.craftExampleText}>
                    "Hand-thrown clay vase fired at high temperature. Features white folk engravings."
                  </Text>
                </View>
                <View style={styles.craftExampleCard}>
                  <Text style={styles.craftExampleCategory}>≡ƒº╡ Handloom & Textiles</Text>
                  <Text style={styles.craftExampleText}>
                    "Pure cotton block-printed dupatta dyed using natural vegetable indigo colors."
                  </Text>
                </View>
                <View style={styles.craftExampleCard}>
                  <Text style={styles.craftExampleCategory}>≡ƒ¬╡ Woodwork</Text>
                  <Text style={styles.craftExampleText}>
                    "Carved sheesham wood spice box with brass inlays and natural wax polish."
                  </Text>
                </View>
              </ScrollView>
            )}

            {activeShortcutModal === 'language_help' && (
              <View style={{ paddingVertical: 8 }}>
                <Text style={styles.modalSub}>
                  ShilpSetu speaks your dialect! You can speak in Hindi, Gujarati, Marathi, Bengali, Tamil, Telugu, Kannada, or English.
                </Text>
                <Text style={[styles.modalSub, { marginTop: 8 }]}>
                  Even if you mix your mother tongue with English craft terms (e.g. "pottery wheel", "kiln"), AI understands smoothly.
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.gotItBtn}
              onPress={() => setActiveShortcutModal(null)}
              activeOpacity={0.85}
            >
              <Text style={styles.gotItBtnText}>Understood</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.studioCream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
  },
  circleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 24,
  },
  titleSection: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
  screenTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 26,
    color: colors.studioDarkBrown,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  screenSubtitle: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13.5,
    color: colors.textBody,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 12,
    lineHeight: 19,
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 12,
    shadowColor: colors.studioDarkBrown,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  benefitIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FAF4EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  benefitText: {
    flex: 1,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.studioDarkBrown,
    lineHeight: 17.5,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 14,
    color: colors.studioDarkBrown,
  },
  languagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#D5C2B4',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4.5,
  },
  languagePillText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.studioDarkBrown,
  },
  micCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 220,
    marginVertical: 4,
    position: 'relative',
  },
  mandalaRingBackground: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micCenterBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    zIndex: 2,
  },
  micButton: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: colors.studioTerracotta,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.studioTerracotta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 12,
  },
  micButtonRecording: {
    backgroundColor: colors.studioTerracotta,
  },
  pulseRing: {
    position: 'absolute',
    top: 6,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.studioTerracotta,
  },
  micActionTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 17,
    color: colors.studioTerracotta,
    marginBottom: 3,
  },
  micActionSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textBody,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  recordingTimer: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.studioTerracotta,
    marginBottom: 2,
  },
  recordingListeningText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 16,
    color: colors.studioDarkBrown,
    marginBottom: 6,
  },
  soundWaveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    gap: 6,
    marginVertical: 6,
  },
  waveBar: {
    width: 4,
    backgroundColor: colors.studioTerracotta,
    borderRadius: 2,
  },
  finishSpeakingBtn: {
    marginTop: 6,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#FAF4EE',
    borderWidth: 1,
    borderColor: colors.border,
  },
  finishSpeakingText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.studioTerracotta,
  },
  processingCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FAF4EE',
    borderWidth: 1.5,
    borderColor: colors.studioTerracotta,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  processingTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 16,
    color: colors.studioDarkBrown,
    marginBottom: 4,
  },
  processingWaveTrack: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  processingWaveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.studioTerracotta,
  },
  errorIconWrap: {
    marginBottom: 8,
  },
  errorHeading: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.error,
    marginBottom: 4,
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.studioTerracotta,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  retryBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
    color: colors.white,
  },
  transcribedCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    shadowColor: colors.studioDarkBrown,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  transcribedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  transcribedTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  transcribedCardTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.studioDarkBrown,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.studioGreenBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.studioGreen,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
  },
  aiBadgeText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 11,
    color: colors.studioGreen,
  },
  editIconBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: '#FAF4EE',
    borderWidth: 1,
    borderColor: colors.border,
  },
  editTextBtn: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.studioDarkBrown,
  },
  transcriptBox: {
    backgroundColor: '#FCFAF7',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#EFE7DC',
  },
  quoteMark: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 22,
    color: colors.studioTerracotta,
    lineHeight: 20,
  },
  transcriptBody: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13,
    color: colors.studioDarkBrown,
    lineHeight: 20,
  },
  editingBox: {
    backgroundColor: '#FAF6F0',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textInput: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13,
    color: colors.studioDarkBrown,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  editActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
  cancelEditBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  cancelEditText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.textBody,
  },
  saveEditBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: colors.studioTerracotta,
  },
  saveEditText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.white,
  },
  transcriptActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  smallActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF4EE',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingVertical: 8,
  },
  smallActionBtnActive: {
    borderColor: colors.studioTerracotta,
    backgroundColor: '#FFF1EB',
  },
  smallActionText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.studioDarkBrown,
  },
  exampleGuidanceCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginTop: 10,
    marginBottom: 12,
    shadowColor: colors.studioDarkBrown,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  exampleHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  exampleHeaderTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
    color: colors.studioTerracotta,
  },
  exampleTextContainer: {
    paddingLeft: 4,
  },
  exampleQuote: {
    fontFamily: typography.fonts.serifSemiBold,
    fontSize: 12.5,
    fontStyle: 'italic',
    color: colors.textBody,
    lineHeight: 18,
  },
  shortcutsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 14,
    gap: 8,
  },
  shortcutBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  shortcutIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FAF4EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  shortcutLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11,
    color: colors.studioDarkBrown,
    textAlign: 'center',
  },
  primaryAcceptBtn: {
    backgroundColor: colors.studioTerracotta,
    borderRadius: 26,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.studioTerracotta,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 6,
  },
  primaryAcceptText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 15,
    color: colors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 20, 16, 0.55)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 18,
    color: colors.studioDarkBrown,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FAF4EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textBody,
    marginBottom: 12,
    lineHeight: 18,
  },
  langList: {
    gap: 8,
  },
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#FAF6F0',
    borderWidth: 1,
    borderColor: colors.border,
  },
  langItemActive: {
    backgroundColor: '#FFF1EB',
    borderColor: colors.studioTerracotta,
  },
  langName: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13.5,
    color: colors.studioDarkBrown,
  },
  langNameActive: {
    color: colors.studioTerracotta,
  },
  langNative: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textBody,
  },
  tipBlock: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FAF4EE',
    borderWidth: 1,
    borderColor: colors.studioTerracotta,
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.studioTerracotta,
    textAlign: 'center',
    lineHeight: 22,
    marginRight: 10,
  },
  tipDesc: {
    flex: 1,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textBody,
    lineHeight: 18,
  },
  craftExampleCard: {
    backgroundColor: '#FAF6F0',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
  },
  craftExampleCategory: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12.5,
    color: colors.studioTerracotta,
    marginBottom: 3,
  },
  craftExampleText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textBody,
    lineHeight: 17,
  },
  gotItBtn: {
    backgroundColor: colors.studioTerracotta,
    borderRadius: 22,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  gotItBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.white,
  },
});