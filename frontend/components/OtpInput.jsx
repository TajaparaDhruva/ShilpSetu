import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';import { jsx as _jsx } from "react/jsx-runtime";







export const OtpInput = ({
  length = 6,
  onCodeChanged,
  onCodeFilled
}) => {
  const [digits, setDigits] = useState(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    const code = digits.join('');
    onCodeChanged?.(code);
    if (code.length === length && !digits.includes('')) {
      onCodeFilled?.(code);
    }
  }, [digits]);

  const handleChange = (text, index) => {
    const newDigits = [...digits];
    const char = text.slice(-1);
    newDigits[index] = char;
    setDigits(newDigits);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (/*#__PURE__*/
    _jsx(View, { style: styles.container, children:
      digits.map((digit, index) => {
        const isFocused = focusedIndex === index;

        return (/*#__PURE__*/
          _jsx(TextInput, {

            ref: (ref) => {inputRefs.current[index] = ref;},
            style: [
            styles.box,
            isFocused && styles.focusedBox,
            digit ? styles.filledBox : null],

            value: digit,
            onChangeText: (text) => handleChange(text, index),
            onKeyPress: (e) => handleKeyPress(e, index),
            onFocus: () => setFocusedIndex(index),
            keyboardType: "number-pad",
            maxLength: 1,
            selectTextOnFocus: true,
            textAlign: "center" }, index
          ));

      }) }
    ));

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '100%',
    paddingHorizontal: 8
  },
  box: {
    width: 46,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.bgAlt,
    borderWidth: 1.5,
    borderColor: colors.border,
    fontSize: 20,
    fontFamily: typography.fonts.bodySemiBold,
    color: colors.textDark,
    textAlign: 'center'
  },
  focusedBox: {
    borderColor: colors.primary,
    backgroundColor: colors.surface
  },
  filledBox: {
    borderColor: colors.primary,
    backgroundColor: colors.surface
  }
});

export default OtpInput;