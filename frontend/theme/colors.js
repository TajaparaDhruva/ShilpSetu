export const colors = {
  bg: '#F8F0E3', // cream base of bottom content section — spec token
  bgAlt: '#FBF6EC', // card / input background (slightly lighter)
  surface: '#FFFDF9', // white-ish card surface
  primary: '#B5502B', // rust/terracotta — button, active dot, heading accent, underline
  primaryDark: '#8F3D20', // button pressed state
  primaryTint10: '#F3E3D8', // legacy chip bg — kept for compat, use chipBg for onboarding-2
  chipBg: '#F3E7D8', // the 4 feature pill badges + phone-mock tag chips — spec
  chipBorder: '#E7D8C3', // chip border — spec
  cardWhite: '#FFFFFF', // phone-mockup screen background — spec
  textDark: '#2A1B12', // "From Product to" heading line, phone-mock product title — spec
  textBody: '#6E5B4E', // paragraph text — spec
  textMuted: '#9C8C7C', // inactive dots, muted labels — spec
  border: '#E7D8C3', // input/card borders (same as chipBorder)
  success: '#2F8B3B',
  successBg: '#E1F3E1',
  warning: '#C97A1F',
  warningBg: '#FCEAD2',
  white: '#FFFFFF',
  black: '#000000',
  overlayDark: 'rgba(20,12,7,0.55)', // dark scrim over the top photo so white text/icons pop — spec
  // ── Onboarding-2 decorative tokens (keep layout exact, no inline magic hex in screen) ──
  logoRingGreen: '#2F8B3B',
  logoRingYellow: '#E7B84A',
  logoRingCream: '#FFF6E8',
  scriptWarm: '#D9C4A8', // "Same Craft / New Possibilities" warm tan
  scriptWarmDark: '#43281C', // fallback darker warm for contrast toggle
  handArrowWhite: '#FFF7E8', // hand-drawn arrows / squiggle
  aiBadgeRing: '#E9D5B8', // AI badge outer ring
  phoneBezel: '#2A211D', // dark-bezel phone frame
  phoneNotch: '#1A1410',
  footerScript: '#B8896A', // "Local Crafts Global Opportunities"
  sprigTan: '#C8A97A'
};

export default colors;