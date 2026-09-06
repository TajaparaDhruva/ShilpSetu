import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';
import colors from '../theme/colors';
import typography from '../theme/typography';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";






export const Logo = ({ size = 'lg', showSubtitle = true }) => {
  const isLg = size === 'lg';
  const iconSize = isLg ? 80 : 36;
  const wordmarkFontSize = isLg ? 28 : 18;

  return (/*#__PURE__*/
    _jsxs(View, { style: styles.container, children: [/*#__PURE__*/

      _jsx(View, { style: [styles.mascotContainer, { width: iconSize, height: iconSize }], children: /*#__PURE__*/
        _jsxs(Svg, { width: iconSize, height: iconSize, viewBox: "0 0 100 100", children: [/*#__PURE__*/

          _jsx(Circle, { cx: "50", cy: "50", r: "46", stroke: "#2F8B3B", strokeWidth: "4", strokeDasharray: "90 200", fill: "none" }), /*#__PURE__*/
          _jsx(Circle, { cx: "50", cy: "50", r: "46", stroke: "#C97A1F", strokeWidth: "4", strokeDasharray: "90 200", strokeDashoffset: "-95", fill: "none" }), /*#__PURE__*/
          _jsx(Circle, { cx: "50", cy: "50", r: "46", stroke: "#B5502B", strokeWidth: "4", strokeDasharray: "90 200", strokeDashoffset: "-190", fill: "none" }), /*#__PURE__*/


          _jsx(Circle, { cx: "50", cy: "50", r: "42", fill: "#FFFDF9" }), /*#__PURE__*/


          _jsxs(G, { id: "artisan-mascot", children: [/*#__PURE__*/

            _jsx(Path, { d: "M35 38 C35 25, 65 25, 65 38 C65 32, 35 32, 35 38 Z", fill: "#B5502B" }), /*#__PURE__*/
            _jsx(Path, { d: "M38 32 C42 22, 58 22, 62 32 Z", fill: "#C97A1F" }), /*#__PURE__*/
            _jsx(Circle, { cx: "50", cy: "24", r: "4", fill: "#2F8B3B" }), /*#__PURE__*/


            _jsx(Circle, { cx: "50", cy: "42", r: "10", fill: "#E7D8C3" }), /*#__PURE__*/
            _jsx(Path, { d: "M44 46 C48 50, 52 50, 56 46", stroke: "#2A1B12", strokeWidth: "2", strokeLinecap: "round", fill: "none" }), /*#__PURE__*/


            _jsx(Path, { d: "M32 68 C32 54, 68 54, 68 68 Z", fill: "#6E5B4E" }), /*#__PURE__*/


            _jsx(Path, { d: "M42 62 C42 70, 58 70, 58 62 Z", fill: "#B5502B" })] }
          )] }
        ) }
      ), /*#__PURE__*/


      _jsxs(View, { style: styles.textContainer, children: [/*#__PURE__*/
        _jsx(Text, { style: [styles.wordmark, { fontSize: wordmarkFontSize }], children: "SHILPSETU" }

        ),
        isLg && showSubtitle && /*#__PURE__*/
        _jsx(Text, { style: styles.tagline, children: "\u2014 Hunar se Bazaar Tak \u2014" }

        )] }

      )] }
    ));

};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  mascotContainer: {
    marginBottom: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    alignItems: 'center'
  },
  wordmark: {
    fontFamily: typography.fonts.wordmark,
    fontWeight: '800',
    color: colors.textDark,
    letterSpacing: 2,
    textShadowColor: colors.white,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1
  },
  tagline: {
    fontFamily: typography.fonts.serifSemiBold,
    fontSize: 13,
    fontStyle: 'italic',
    color: colors.primary,
    marginTop: 2,
    letterSpacing: 0.5
  }
});

export default Logo;