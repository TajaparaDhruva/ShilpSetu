import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';
import colors from '../theme/colors';
import typography from '../theme/typography';

interface LogoProps {
  size?: 'sm' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'lg', showSubtitle = true }) => {
  const isLg = size === 'lg';
  const iconSize = isLg ? 80 : 36;
  const wordmarkFontSize = isLg ? 28 : 18;

  return (
    <View style={styles.container}>
      {/* Mascot Circle with Tri-color Ring */}
      <View style={[styles.mascotContainer, { width: iconSize, height: iconSize }]}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 100 100">
          {/* Tri-color Arc Rings */}
          <Circle cx="50" cy="50" r="46" stroke="#2F8B3B" strokeWidth="4" strokeDasharray="90 200" fill="none" />
          <Circle cx="50" cy="50" r="46" stroke="#C97A1F" strokeWidth="4" strokeDasharray="90 200" strokeDashoffset="-95" fill="none" />
          <Circle cx="50" cy="50" r="46" stroke="#B5502B" strokeWidth="4" strokeDasharray="90 200" strokeDashoffset="-190" fill="none" />
          
          {/* Background Surface */}
          <Circle cx="50" cy="50" r="42" fill="#FFFDF9" />
          
          {/* Stylized Artisan Mascot (Turbaned Artisan holding a pot/bowl) */}
          <G id="artisan-mascot">
            {/* Turban */}
            <Path d="M35 38 C35 25, 65 25, 65 38 C65 32, 35 32, 35 38 Z" fill="#B5502B" />
            <Path d="M38 32 C42 22, 58 22, 62 32 Z" fill="#C97A1F" />
            <Circle cx="50" cy="24" r="4" fill="#2F8B3B" />

            {/* Face */}
            <Circle cx="50" cy="42" r="10" fill="#E7D8C3" />
            <Path d="M44 46 C48 50, 52 50, 56 46" stroke="#2A1B12" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Body/Robes */}
            <Path d="M32 68 C32 54, 68 54, 68 68 Z" fill="#6E5B4E" />

            {/* Bowl / Terracotta Vessel held in hands */}
            <Path d="M42 62 C42 70, 58 70, 58 62 Z" fill="#B5502B" />
          </G>
        </Svg>
      </View>

      {/* Wordmark & Tagline */}
      <View style={styles.textContainer}>
        <Text style={[styles.wordmark, { fontSize: wordmarkFontSize }]}>
          SHILPSETU
        </Text>
        {isLg && showSubtitle && (
          <Text style={styles.tagline}>
            — Hunar se Bazaar Tak —
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotContainer: {
    marginBottom: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  wordmark: {
    fontFamily: typography.fonts.wordmark,
    fontWeight: '800',
    color: colors.textDark,
    letterSpacing: 2,
    textShadowColor: colors.white,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  tagline: {
    fontFamily: typography.fonts.serifSemiBold,
    fontSize: 13,
    fontStyle: 'italic',
    color: colors.primary,
    marginTop: 2,
    letterSpacing: 0.5,
  },
});

export default Logo;
