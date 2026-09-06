/**
 * ShilpSetu Design System Tokens
 * Tagline: "From Tradition to Market, Powered by AI."
 * Palette: Indian Craft, Human, Premium, Earthy, Trustworthy, Modern AI
 */

import { Platform } from 'react-native';

export const Palette = {
  // Primary Craft Accents
  terracotta: '#994623',
  terracottaDark: '#7A3519',
  terracottaLight: '#B85830',
  terracottaMuted: '#F5EBE6',

  // Neutrals & Backgrounds
  creamBackground: '#FFF8F6',
  creamSurface: '#FFF3EE',
  creamSurfaceElevated: '#FFFFFF',
  
  // Earth & Text Colors
  charcoalDark: '#231916',
  earthBrown: '#8A5A44',
  textPrimary: '#231916',
  textSecondary: '#63534D',
  textMuted: '#94837C',
  borderLight: '#EADBCF',
  borderMedium: '#D5C2B4',

  // Supporting Craft Accents
  forestGreen: '#2D3B2D',
  forestGreenLight: '#E8EFE8',
  ochreYellow: '#EEC14B',
  ochreYellowLight: '#FDF7E7',
  rustRed: '#C23B22',
  rustRedLight: '#FBEBE8',

  // Status & Feedback
  success: '#2D3B2D',
  warning: '#D97706',
  error: '#C23B22',
  info: '#2B6CB0',
};

export const Colors = {
  light: {
    background: Palette.creamBackground,
    surface: Palette.creamSurface,
    surfaceElevated: Palette.creamSurfaceElevated,
    primary: Palette.terracotta,
    primaryPressed: Palette.terracottaDark,
    primaryLight: Palette.terracottaMuted,
    secondary: Palette.forestGreen,
    accent: Palette.ochreYellow,
    text: Palette.textPrimary,
    textSecondary: Palette.textSecondary,
    textMuted: Palette.textMuted,
    border: Palette.borderLight,
    borderMedium: Palette.borderMedium,
    icon: Palette.earthBrown,
    tint: Palette.terracotta,
    tabIconDefault: Palette.textMuted,
    tabIconSelected: Palette.terracotta,
    success: Palette.success,
    warning: Palette.warning,
    error: Palette.error,
    cardBg: Palette.creamSurfaceElevated,
  },
  dark: {
    background: Palette.charcoalDark,
    surface: '#2C221F',
    surfaceElevated: '#362A27',
    primary: '#B85830',
    primaryPressed: Palette.terracotta,
    primaryLight: '#3D2820',
    secondary: '#3E4E3E',
    accent: Palette.ochreYellow,
    text: '#FFF8F6',
    textSecondary: '#D5C2B4',
    textMuted: '#94837C',
    border: '#453530',
    borderMedium: '#5C4741',
    icon: '#D5C2B4',
    tint: '#B85830',
    tabIconDefault: '#94837C',
    tabIconSelected: '#B85830',
    success: '#4E634E',
    warning: '#F59E0B',
    error: '#EF4444',
    cardBg: '#2C221F',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Typography = {
  display: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as const,
  },
  h1: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700' as const,
  },
  h2: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const,
  },
  h3: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400' as const,
  },
  bodySmall: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '400' as const,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600' as const,
  },
  button: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600' as const,
  },
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: Palette.charcoalDark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: Palette.charcoalDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: Palette.charcoalDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    serif: 'Georgia',
    rounded: 'System',
    mono: 'Courier',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
});
