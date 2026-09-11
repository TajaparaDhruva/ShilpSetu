import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";









export const ScriptCaption = ({
  lines,
  color = colors.primary,
  style,
  textStyle,
  align = 'left'
}) => {
  return (/*#__PURE__*/
    _jsxs(View, { style: [styles.container, { alignItems: align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start' }, style], children: [
      lines.map((line, index) => /*#__PURE__*/
      _jsx(Text, {

        style: [
        styles.lineText,
        { color, textAlign: align },
        textStyle], children:


        line }, index
      )
      ), /*#__PURE__*/
      _jsx(View, { style: [styles.underline, { backgroundColor: color }] })] }
    ));

};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2
  },
  lineText: {
    fontFamily: typography.fonts.script,
    fontSize: 17,
    lineHeight: 20
  },
  underline: {
    height: 1.5,
    width: 28,
    marginTop: 2,
    borderRadius: 1
  }
});

export default ScriptCaption;