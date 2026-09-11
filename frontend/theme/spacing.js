import { Spacing, BorderRadius } from '../constants/theme';

export const spacing = {
  // ── Unified Spacing Scale ──────────────────────────────────────────
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,

  // ── Unified Page & Component Metrics ───────────────────────────────
  screenPadding: 16,
  screenHorizontal: 16,
  screenBottom: 28,
  sectionMargin: 20,
  sectionGap: 16,
  cardPadding: 14,
  itemGap: 12,
  buttonHeight: 50,
  inputHeight: 50,

  // ── Unified Border Radius ──────────────────────────────────────────
  borderRadius: {
    xs: 4,
    sm: 8,
    small: 8,
    md: 12,
    medium: 12,
    lg: 16,
    large: 16,
    xl: 20,
    card: 16,
    pill: 999,
    full: 999,
  },
};

export { Spacing, BorderRadius };
export default spacing;