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

export const Colors = {
  light: {
    text: ShilpColors.textPrimary,
    background: ShilpColors.background,
    tint: ShilpColors.primary,
    icon: ShilpColors.textSecondary,
    tabIconDefault: ShilpColors.tabIconDefault,
    tabIconSelected: ShilpColors.tabIconSelected,
    surface: ShilpColors.surface,
  },
  dark: {
    text: ShilpColors.textPrimary,
    background: ShilpColors.background,
    tint: ShilpColors.primary,
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
};

export const BorderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  card: 20,
  pill: 999,
};

export const Typography = {
  displayLarge: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: ShilpColors.textPrimary,
    lineHeight: 38,
  },
  heading1: {
    fontSize: 26,
    fontWeight: '700' as const,
    color: ShilpColors.textPrimary,
    lineHeight: 32,
  },
  heading2: {
    fontSize: 22,
    fontWeight: '600' as const,
    color: ShilpColors.textPrimary,
    lineHeight: 28,
  },
  heading3: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: ShilpColors.textPrimary,
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 17,
    fontWeight: '400' as const,
    color: ShilpColors.textPrimary,
    lineHeight: 24,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    color: ShilpColors.textPrimary,
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: ShilpColors.textSecondary,
    lineHeight: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: ShilpColors.textSecondary,
    letterSpacing: 0.5,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    color: ShilpColors.textMuted,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: ShilpColors.white,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
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

