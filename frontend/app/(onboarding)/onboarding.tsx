import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/store/LanguageContext';
import { Colors, Typography, Spacing, Palette, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function OnboardingScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: '📷',
      title: t('onboardingStep1Title'),
      description: t('onboardingStep1Desc'),
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    },
    {
      icon: '🎙️',
      title: t('onboardingStep2Title'),
      description: t('onboardingStep2Desc'),
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80',
    },
    {
      icon: '✨',
      title: t('onboardingStep3Title'),
      description: t('onboardingStep3Desc'),
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const currentStepData = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      router.push('/(auth)/signup');
    }
  };

  const handleSkip = () => {
    router.push('/(auth)/signup');
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      {/* Top Bar with Skip */}
      <View style={styles.topRow}>
        <View style={styles.stepCounter}>
          <Text style={[Typography.label, { color: theme.primary }]}>
            Step {step + 1} of {steps.length}
          </Text>
        </View>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={[Typography.label, { color: theme.textMuted }]}>{t('skip')}</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Card */}
      <View style={styles.mainContent}>
        <Image
          source={{ uri: currentStepData.image }}
          style={styles.stepImage}
          resizeMode="cover"
        />

        <View style={styles.textBlock}>
          <Text style={styles.stepIcon}>{currentStepData.icon}</Text>
          <Text style={[Typography.h1, { color: theme.text, textAlign: 'center' }]}>
            {currentStepData.title}
          </Text>
          <Text
            style={[
              Typography.body,
              { color: theme.textSecondary, textAlign: 'center', marginTop: Spacing.sm },
            ]}
          >
            {currentStepData.description}
          </Text>
        </View>
      </View>

      {/* Progress Dots & Navigation */}
      <View style={styles.bottomSection}>
        <View style={styles.dotsRow}>
          {steps.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                {
                  backgroundColor: idx === step ? theme.primary : theme.border,
                  width: idx === step ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>

        <Button
          title={step === steps.length - 1 ? t('getStarted') : t('next')}
          variant="primary"
          size="lg"
          onPress={handleNext}
          style={styles.nextBtn}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepCounter: {
    backgroundColor: Palette.terracottaMuted,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  mainContent: {
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  stepImage: {
    width: '100%',
    height: 240,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.lg,
  },
  textBlock: {
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  stepIcon: {
    fontSize: 40,
    marginBottom: Spacing.sm,
  },
  bottomSection: {
    gap: Spacing.lg,
    marginBottom: Spacing.md,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  nextBtn: {
    width: '100%',
  },
});
