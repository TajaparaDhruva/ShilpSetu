import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';

const LOGO_IMG = require('../assets/images/logo.png');

export const Logo = ({ size = 'lg', showSubtitle = true, horizontal = false }) => {
  const dimensions = {
    xs: { width: 36, height: 30 },
    sm: { width: 54, height: 45 },
    md: { width: 90, height: 75 },
    lg: { width: 140, height: 116 },
  }[size] || { width: 120, height: 100 };

  if (horizontal) {
    return (
      <View style={styles.horizontalContainer}>
        <Image
          source={LOGO_IMG}
          style={[styles.image, dimensions]}
          resizeMode="contain"
        />
        <View style={styles.horizontalText}>
          <Text style={styles.wordmarkHorizontal}>SHILPSETU</Text>
          {showSubtitle && (
            <Text style={styles.taglineHorizontal}>Hunar se Bazaar Tak</Text>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={LOGO_IMG}
        style={[styles.image, dimensions]}
        resizeMode="contain"
      />
      {size === 'lg' && showSubtitle && (
        <Text style={styles.tagline}>— Hunar se Bazaar Tak —</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  image: {
    marginBottom: 4,
  },
  horizontalText: {
    justifyContent: 'center',
  },
  wordmarkHorizontal: {
    fontFamily: typography.fonts.wordmark,
    fontSize: 18,
    fontWeight: '800',
    color: colors.textDark,
    letterSpacing: 1.5,
  },
  taglineHorizontal: {
    fontFamily: typography.fonts.serifSemiBold,
    fontSize: 11,
    fontStyle: 'italic',
    color: colors.primary,
  },
  tagline: {
    fontFamily: typography.fonts.serifSemiBold,
    fontSize: 13,
    fontStyle: 'italic',
    color: colors.primary,
    marginTop: 4,
    letterSpacing: 0.5,
  },
});

export default Logo;