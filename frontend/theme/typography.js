import { Platform } from 'react-native';
import { Typography } from '../constants/theme';

export const typography = {
  fonts: {
    serifBold: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }),
    serifSemiBold: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }),
    bodyRegular: Platform.select({ ios: 'System', android: 'sans-serif', default: 'sans-serif' }),
    bodyMedium: Platform.select({ ios: 'System', android: 'sans-serif-medium', default: 'sans-serif' }),
    bodySemiBold: Platform.select({ ios: 'System', android: 'sans-serif-medium', default: 'sans-serif' }),
    script: Platform.select({ ios: 'Snell Roundhand', android: 'serif', default: 'serif' }),
    wordmark: Platform.select({ ios: 'System', android: 'sans-serif-condensed', default: 'sans-serif' }),
  },
  sizes: {
    xs: 12,
    badge: 11,
    caption: 12,
    sm: 13,
    bodySmall: 13,
    body: 14,
    bodyRegular: 14,
    bodyMedium: 14,
    bodyLg: 16,
    subtitle: 16,
    h3: 16,
    cardTitle: 16,
    h2: 20,
    sectionTitle: 20,
    h1: 24,
    title: 24,
    display: 28,
    hero: 28,
  },
  styles: Typography,
};

export { Typography };
export default typography;