import { Platform } from 'react-native';

export const ShilpColors = {
  background: '#F7EBDD',
  surface: '#FFF8F0',
  surfaceCard: '#FFFFFF',
  primary: '#B84F2A',
  primaryDark: '#963C20',
  textPrimary: '#3B1F17',
  textSecondary: '#3F5665',
  textMuted: '#8C776E',
  softPeach: '#F3DED0',
  border: '#E7C9B7',
  borderLight: '#F0DEC9',
  success: '#2F8F4E',
  warning: '#D99A2B',
  error: '#C93A2F',
  white: '#FFFFFF',
  overlay: 'rgba(59, 31, 23, 0.4)',
  tint: '#B84F2A',
  tabIconDefault: '#8C776E',
  tabIconSelected: '#B84F2A',
};

export const Palette = {
  terracotta: '#B84F2A',
  terracottaMuted: '#F3DED0',
  creamSurface: '#FFF8F0',
  forestGreen: '#2F8F4E',
  forestGreenLight: '#E8F5E9',
  ochreYellow: '#D99A2B',
  ochreYellowLight: '#FFF8E1',
  rustRed: '#C93A2F',
  rustRedLight: '#FFEBEE',
  earthBrown: '#5C3A21',
  borderLight: '#F0DEC9',
  textSecondary: '#3F5665',
  warning: '#D99A2B',
};

export const Colors = {
  light: {
    text: ShilpColors.textPrimary,
    textSecondary: ShilpColors.textSecondary,
    textMuted: ShilpColors.textMuted,
    background: ShilpColors.background,
    cardBg: ShilpColors.surfaceCard || '#FFFFFF',
    border: ShilpColors.borderLight || '#F0DEC9',
    tint: ShilpColors.primary,
    primary: ShilpColors.primary,
    icon: ShilpColors.textSecondary,
    tabIconDefault: ShilpColors.tabIconDefault,
    tabIconSelected: ShilpColors.tabIconSelected,
    surface: ShilpColors.surface,
  },
  dark: {
    text: ShilpColors.textPrimary,
    textSecondary: ShilpColors.textSecondary,
    textMuted: ShilpColors.textMuted,
    background: ShilpColors.background,
    cardBg: ShilpColors.surfaceCard || '#FFFFFF',
    border: ShilpColors.borderLight || '#F0DEC9',
    tint: ShilpColors.primary,
    primary: ShilpColors.primary,
    icon: ShilpColors.textSecondary,
    tabIconDefault: ShilpColors.tabIconDefault,
    tabIconSelected: ShilpColors.tabIconSelected,
    surface: ShilpColors.surface,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  screenPadding: 16,
  screenHorizontal: 16,
  screenBottom: 28,
  sectionMargin: 20,
  cardPadding: 14,
  itemGap: 12,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  small: 8,
  md: 12,
  medium: 12,
  lg: 16,
  large: 16,
  xl: 20,
  card: 20,
  pill: 999,
  full: 999,
};

export const Shadows = {
  none: {},
  sm: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 1,
    },
    default: {},
  }),
  md: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    android: {
      elevation: 3,
    },
    default: {},
  }),
  lg: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
    android: {
      elevation: 6,
    },
    default: {},
  }),
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'Georgia',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  android: {
    sans: 'sans-serif',
    sansMedium: 'sans-serif-medium',
    serif: 'serif',
    rounded: 'sans-serif',
    mono: 'monospace',
  },
  default: {
    sans: 'normal',
    sansMedium: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Typography = {
  // ── Hero / Large Display ──────────────────────────────────────────
  display: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: Fonts?.serif || 'serif',
    color: ShilpColors.textPrimary,
    lineHeight: 34,
  },
  displayLarge: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: Fonts?.serif || 'serif',
    color: ShilpColors.textPrimary,
    lineHeight: 34,
  },
  hero: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: Fonts?.serif || 'serif',
    color: ShilpColors.textPrimary,
    lineHeight: 34,
  },

  // ── Primary Page Heading (H1) ────────────────────────────────────
  h1: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: Fonts?.serif || 'serif',
    color: ShilpColors.textPrimary,
    lineHeight: 30,
  },
  heading1: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: Fonts?.serif || 'serif',
    color: ShilpColors.textPrimary,
    lineHeight: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: Fonts?.serif || 'serif',
    color: ShilpColors.textPrimary,
    lineHeight: 30,
  },

  // ── Section Title (H2) ───────────────────────────────────────────
  h2: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: Fonts?.serif || 'serif',
    color: ShilpColors.textPrimary,
    lineHeight: 26,
  },
  heading2: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: Fonts?.serif || 'serif',
    color: ShilpColors.textPrimary,
    lineHeight: 26,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: Fonts?.serif || 'serif',
    color: ShilpColors.textPrimary,
    lineHeight: 26,
  },

  // ── Card Title / Subheading (H3) ──────────────────────────────────
  h3: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts?.sans || 'sans-serif',
    color: ShilpColors.textPrimary,
    lineHeight: 22,
  },
  heading3: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts?.sans || 'sans-serif',
    color: ShilpColors.textPrimary,
    lineHeight: 22,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts?.sans || 'sans-serif',
    color: ShilpColors.textPrimary,
    lineHeight: 22,
  },

  // ── Subtitle / Body Large ────────────────────────────────────────
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: Fonts?.sans || 'sans-serif',
    color: ShilpColors.textSecondary,
    lineHeight: 22,
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: Fonts?.sans || 'sans-serif',
    color: ShilpColors.textPrimary,
    lineHeight: 22,
  },
  bodyLg: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: Fonts?.sans || 'sans-serif',
    color: ShilpColors.textPrimary,
    lineHeight: 22,
  },

  // ── Standard Body Text (14px) ────────────────────────────────────
  body: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Fonts?.sans || 'sans-serif',
    color: ShilpColors.textPrimary,
    lineHeight: 20,
  },
  bodyRegular: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Fonts?.sans || 'sans-serif',
    color: ShilpColors.textPrimary,
    lineHeight: 20,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Fonts?.sans || 'sans-serif',
    color: ShilpColors.textPrimary,
    lineHeight: 20,
  },
  bodySemiBold: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts?.sans || 'sans-serif',
    color: ShilpColors.textPrimary,
    lineHeight: 20,
  },

  // ── Secondary / Small Body (13px) ────────────────────────────────
  bodySmall: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: Fonts?.sans || 'sans-serif',
    color: ShilpColors.textSecondary,
    lineHeight: 18,
  },
  sm: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: Fonts?.sans || 'sans-serif',
    color: ShilpColors.textSecondary,
    lineHeight: 18,
  },

  // ── Labels & Badges (12px) ───────────────────────────────────────
  label: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Fonts?.sans || 'sans-serif',
    color: ShilpColors.textSecondary,
    letterSpacing: 0.4,
    lineHeight: 16,
  },
  tag: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Fonts?.sans || 'sans-serif',
    color: ShilpColors.textSecondary,
    letterSpacing: 0.4,
    lineHeight: 16,
  },
  badge: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: Fonts?.sans || 'sans-serif',
    lineHeight: 14,
  },

  // ── Caption / Timestamps (12px) ──────────────────────────────────
  caption: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: Fonts?.sans || 'sans-serif',
    color: ShilpColors.textMuted,
    lineHeight: 16,
  },
  xs: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: Fonts?.sans || 'sans-serif',
    color: ShilpColors.textMuted,
    lineHeight: 16,
  },

  // ── Buttons & Action Text (15px) ─────────────────────────────────
  button: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: Fonts?.sans || 'sans-serif',
    color: ShilpColors.white,
    lineHeight: 20,
  },
  btn: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: Fonts?.sans || 'sans-serif',
    color: ShilpColors.white,
    lineHeight: 20,
  },
};

