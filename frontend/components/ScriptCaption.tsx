import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';

interface ScriptCaptionProps {
  lines: string[];
  color?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  align?: 'left' | 'right' | 'center';
}

export const ScriptCaption: React.FC<ScriptCaptionProps> = ({
  lines,
  color = colors.primary,
  style,
  textStyle,
  align = 'left',
}) => {
  return (
    <View style={[styles.container, { alignItems: align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start' }, style]}>
      {lines.map((line, index) => (
        <Text
          key={index}
          style={[
            styles.lineText,
            { color, textAlign: align },
            textStyle,
          ]}
        >
          {line}
        </Text>
      ))}
      <View style={[styles.underline, { backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
  },
  lineText: {
    fontFamily: typography.fonts.script,
    fontSize: 17,
    lineHeight: 20,
  },
  underline: {
    height: 1.5,
    width: 28,
    marginTop: 2,
    borderRadius: 1,
  },
});

export default ScriptCaption;
