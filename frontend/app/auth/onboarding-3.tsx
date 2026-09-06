import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import PrimaryButton from '../../components/PrimaryButton';
import ProgressDots from '../../components/ProgressDots';
import ScriptCaption from '../../components/ScriptCaption';
import MandalaBackground from '../../components/MandalaBackground';

export default function Onboarding3() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <MandalaBackground position="top-right" size={200} opacity={0.12} />

      {/* Top Header */}
      <View style={styles.topBar}>
        <View style={{ flex: 1 }} />
        <Logo size="sm" showSubtitle={false} />
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => router.push('/auth/get-started' as any)}>
            <Text style={styles.skipText}>Skip →</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Headings */}
        <View style={styles.headingBox}>
          <Text style={styles.headingDark}>The Right Buyer.</Text>
          <Text style={styles.headingPrimary}>The Right Artisan.</Text>
          <View style={styles.underline} />

          <Text style={styles.subtext}>
            Buyers describe what they need. AI finds artisans who can <Text style={{ fontWeight: 'bold', color: colors.textDark }}>actually</Text> fulfill the requirement.
          </Text>
        </View>

        {/* 3-Column Match Visual */}
        <View style={styles.matchContainer}>
          {/* Left: Buyer */}
          <View style={styles.columnItem}>
            {/* Speech Bubble */}
            <View style={styles.speechBubble}>
              <Text style={styles.speechText}>
                🛍 I need 100 handwoven cotton bags with traditional prints
              </Text>
            </View>

            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300' }}
              style={styles.circleAvatar}
            />
            <Text style={styles.roleTitle}>Buyer</Text>
            <Text style={styles.roleSub}>Describes requirement</Text>
          </View>

          {/* Center: AI Match */}
          <View style={styles.centerItem}>
            <View style={styles.aiCircle}>
              <Sparkles size={20} color={colors.white} />
              <Text style={styles.aiBadgeText}>AI</Text>
            </View>
            <Text style={styles.matchTitle}>AI Matches</Text>
            <Text style={styles.matchSub}>Understands needs & finds right artisans</Text>
          </View>

          {/* Right: Artisan */}
          <View style={styles.columnItem}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300' }}
              style={styles.circleAvatar}
            />
            <Text style={styles.roleTitle}>Artisan</Text>
            <Text style={styles.roleSub}>Gets relevant opportunities</Text>
          </View>
        </View>

        {/* Cursive Accent */}
        <View style={styles.scriptCenter}>
          <ScriptCaption lines={['Stronger', 'Artisans', 'Brighter India']} align="center" />
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <ProgressDots total={3} active={3} />

        <PrimaryButton
          label="Get Started"
          onPress={() => router.push('/auth/get-started' as any)}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: 48,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  skipText: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headingBox: {
    alignItems: 'center',
    marginVertical: 12,
  },
  headingDark: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 28,
    color: colors.textDark,
    textAlign: 'center',
  },
  headingPrimary: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 28,
    color: colors.primary,
    textAlign: 'center',
  },
  underline: {
    height: 2,
    width: 40,
    backgroundColor: colors.primary,
    marginVertical: 8,
    borderRadius: 1,
  },
  subtext: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 14,
    color: colors.textBody,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 4,
  },
  matchContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
  columnItem: {
    flex: 1,
    alignItems: 'center',
  },
  speechBubble: {
    backgroundColor: colors.surface,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  speechText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 10,
    color: colors.textDark,
    textAlign: 'center',
  },
  circleAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  roleTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
    color: colors.textDark,
    marginTop: 6,
  },
  roleSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
  centerItem: {
    width: 90,
    alignItems: 'center',
    paddingHorizontal: 4,
    marginTop: 24,
  },
  aiCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  aiBadgeText: {
    fontSize: 8,
    color: colors.white,
    fontWeight: 'bold',
  },
  matchTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.primary,
  },
  matchSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 9,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
  scriptCenter: {
    alignItems: 'center',
    marginVertical: 12,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: colors.bg,
  },
  button: {
    marginTop: 8,
  },
});
