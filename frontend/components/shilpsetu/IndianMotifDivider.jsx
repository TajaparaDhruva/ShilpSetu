import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import colors from '../../theme/colors';

export const IndianMotifDivider = ({
  color = colors.studioTerracotta,
  width = 220,
  height = 18,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Svg width={width} height={height} viewBox="0 0 220 18" fill="none">
        {/* Left flourish scroll */}
        <Path
          d="M10 9 C 25 14, 40 4, 60 9 L 95 9"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <Circle cx="8" cy="9" r="2" fill={color} />
        <Circle cx="35" cy="6" r="1.5" fill={color} opacity={0.7} />

        {/* Center Ornamental Diamond / Mandala Motif */}
        <Path
          d="M110 2 L116 9 L110 16 L104 9 Z"
          fill={color}
        />
        <Circle cx="110" cy="9" r="1.8" fill={colors.white} />
        <Circle cx="98" cy="9" r="2.2" fill={color} />
        <Circle cx="122" cy="9" r="2.2" fill={color} />

        {/* Right flourish scroll */}
        <Path
          d="M125 9 L 160 9 C 180 14, 195 4, 210 9"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <Circle cx="212" cy="9" r="2" fill={color} />
        <Circle cx="185" cy="6" r="1.5" fill={color} opacity={0.7} />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});

export default IndianMotifDivider;