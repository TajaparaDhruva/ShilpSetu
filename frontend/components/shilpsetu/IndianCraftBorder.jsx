import React from 'react';
import { View, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import colors from '../../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const IndianCraftBorder = ({
  color = colors.studioTerracotta,
  height = 52,
  style,
}) => {
  const patternUnitWidth = 36;
  const repeatCount = Math.ceil(SCREEN_WIDTH / patternUnitWidth) + 1;

  return (
    <View style={[styles.container, { height }, style]}>
      <Svg width="100%" height={height} viewBox={`0 0 ${SCREEN_WIDTH} 52`} preserveAspectRatio="none">
        {/* Top subtle rule */}
        <Rect x="0" y="2" width={SCREEN_WIDTH} height="1.2" fill={color} opacity={0.35} />

        {/* Repeating triangles and floral drops */}
        {Array.from({ length: repeatCount }).map((_, i) => {
          const x = i * patternUnitWidth;
          return (
            <React.Fragment key={i}>
              {/* Triangular Temple / Craft Motif */}
              <Path
                d={`M${x + 4} 16 L${x + 18} 4 L${x + 32} 16 Z`}
                fill="none"
                stroke={color}
                strokeWidth="1.2"
              />
              <Path
                d={`M${x + 9} 16 L${x + 18} 8 L${x + 27} 16 Z`}
                fill={color}
                opacity={0.25}
              />
              <Circle cx={x + 18} cy={2} r="1.5" fill={color} />

              {/* Center Dot in Triangle */}
              <Circle cx={x + 18} cy={12} r="1.5" fill={color} />

              {/* Lower Petal/Hanging Bead Motif */}
              <Circle cx={x + 18} cy={24} r="2.2" fill={color} />
              <Path
                d={`M${x + 18} 26 L${x + 18} 34`}
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <Circle cx={x + 18} cy={37} r="2.8" fill={color} />
              <Circle cx={x + 18} cy={37} r="1.2" fill={colors.white} />

              {/* Connecting Swags / Arcs */}
              <Path
                d={`M${x} 20 Q${x + 9} 25 ${x + 18} 24 Q${x + 27} 25 ${x + 36} 20`}
                fill="none"
                stroke={color}
                strokeWidth="1"
                opacity={0.5}
              />

              {/* Small accent dots */}
              <Circle cx={x + 9} cy={28} r="1" fill={color} opacity={0.6} />
              <Circle cx={x + 27} cy={28} r="1" fill={color} opacity={0.6} />
            </React.Fragment>
          );
        })}

        {/* Bottom decorative baseline */}
        <Rect x="0" y="44" width={SCREEN_WIDTH} height="1.5" fill={color} opacity={0.4} />
        <Rect x="0" y="48" width={SCREEN_WIDTH} height="2.5" fill={color} opacity={0.7} />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 4,
  },
});

export default IndianCraftBorder;