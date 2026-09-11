import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import colors from '../theme/colors';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";








export const MandalaBackground = ({
  position = 'top-right',
  size = 200,
  opacity = 0.1,
  style
}) => {
  const getPositionStyle = () => {
    switch (position) {
      case 'top-left':
        return { top: -size / 2, left: -size / 2 };
      case 'bottom-right':
        return { bottom: -size / 2, right: -size / 2 };
      case 'bottom-left':
        return { bottom: -size / 2, left: -size / 2 };
      case 'top-right':
      default:
        return { top: -size / 2, right: -size / 2 };
    }
  };

  return (/*#__PURE__*/
    _jsx(View, {
      pointerEvents: "none",
      style: [
      styles.container,
      getPositionStyle(),
      { width: size, height: size, opacity },
      style], children: /*#__PURE__*/


      _jsxs(Svg, { width: size, height: size, viewBox: "0 0 200 200", children: [/*#__PURE__*/
        _jsx(Circle, { cx: "100", cy: "100", r: "90", stroke: colors.primary, strokeWidth: "1.5", fill: "none" }), /*#__PURE__*/
        _jsx(Circle, { cx: "100", cy: "100", r: "70", stroke: colors.primary, strokeWidth: "1", strokeDasharray: "4 4", fill: "none" }), /*#__PURE__*/
        _jsx(Circle, { cx: "100", cy: "100", r: "50", stroke: colors.primary, strokeWidth: "1.5", fill: "none" }), /*#__PURE__*/
        _jsx(Circle, { cx: "100", cy: "100", r: "30", stroke: colors.primary, strokeWidth: "1", fill: "none" }),


        Array.from({ length: 12 }).map((_, i) => {
          const angle = i * 30 * Math.PI / 180;
          const x1 = 100 + 30 * Math.cos(angle);
          const y1 = 100 + 30 * Math.sin(angle);
          const x2 = 100 + 90 * Math.cos(angle);
          const y2 = 100 + 90 * Math.sin(angle);
          return (/*#__PURE__*/
            _jsx(Path, {

              d: `M100 100 Q${(x1 + x2) / 2 + 10} ${(y1 + y2) / 2 + 10} ${x2} ${y2}`,
              stroke: colors.primary,
              strokeWidth: "1",
              fill: "none" }, i
            ));

        })] }
      ) }
    ));

};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: -1
  }
});

export default MandalaBackground;