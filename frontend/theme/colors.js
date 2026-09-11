import { ShilpColors, Palette } from '../constants/theme';

export const colors = {
  // ── Unified Core Theme Tokens (Exact ShilpSetu Palette) ──────────────
  bg: ShilpColors.background, // '#F7EBDD' - signature warm cream background
  bgAlt: '#FFF8F0', // lighter cream for cards/inputs
  surface: ShilpColors.surface, // '#FFF8F0' - card surface
  primary: ShilpColors.primary, // '#B84F2A' - signature terracotta rust
  primaryDark: ShilpColors.primaryDark, // '#963C20' - pressed / deep rust
  primaryTint10: ShilpColors.softPeach, // '#F3DED0' - soft peach chip background
  softPeach: ShilpColors.softPeach,
  chipBg: ShilpColors.softPeach, // '#F3DED0'
  chipBorder: ShilpColors.border, // '#E7C9B7'
  cardWhite: ShilpColors.surfaceCard, // '#FFFFFF'
  textDark: ShilpColors.textPrimary, // '#3B1F17' - rich dark espresso
  textPrimary: ShilpColors.textPrimary,
  textBody: ShilpColors.textSecondary, // '#3F5665' - readable slate/secondary
  textSecondary: ShilpColors.textSecondary,
  textMuted: ShilpColors.textMuted, // '#8C776E' - muted earthy brown
  border: ShilpColors.border, // '#E7C9B7' - unified border color
  borderLight: ShilpColors.borderLight, // '#F0DEC9'
  success: ShilpColors.success, // '#2F8F4E' - forest green
  successBg: '#E8F5E9',
  warning: ShilpColors.warning, // '#D99A2B' - ochre yellow
  warningBg: '#FFF8E1',
  error: ShilpColors.error, // '#C93A2F'
  white: ShilpColors.white,
  black: '#000000',
  overlayDark: ShilpColors.overlay,

  // ── Kshitij / Studio Aliases (Used in 236+ places) ─────────────────────
  studioCream: ShilpColors.background, // '#F7EBDD'
  studioTerracotta: ShilpColors.primary, // '#B84F2A'
  studioDarkBrown: ShilpColors.textPrimary, // '#3B1F17'
  creamSurface: ShilpColors.surface, // '#FFF8F0'

  // ── Decorative Spec Tokens ──────────────────────────────────────────
  logoRingGreen: '#2F8B3B',
  logoRingYellow: '#E7B84A',
  logoRingCream: '#FFF6E8',
  scriptWarm: '#D9C4A8',
  scriptWarmDark: '#43281C',
  handArrowWhite: '#FFF7E8',
  aiBadgeRing: '#E9D5B8',
  phoneBezel: '#2A211D',
  phoneNotch: '#1A1410',
  footerScript: '#B8896A',
  sprigTan: '#C8A97A',
};

export { ShilpColors, Palette };
export default colors;