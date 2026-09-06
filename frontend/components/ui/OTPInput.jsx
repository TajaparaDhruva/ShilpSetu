import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors, Typography, BorderRadius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx } from "react/jsx-runtime";








export const OTPInput = ({
  codeLength = 6,
  onCodeFilled,
  onChangeCode,
  error = false
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [digits, setDigits] = useState(Array(codeLength).fill(''));
  const inputsRef = useRef([]);

  const handleTextChange = (text, index) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    const newDigits = [...digits];

    if (cleanText.length > 1) {
      // Handle paste
      const pasted = cleanText.slice(0, codeLength).split('');
      for (let i = 0; i < codeLength; i++) {
        newDigits[i] = pasted[i] || '';
      }
      setDigits(newDigits);
      const code = newDigits.join('');
      onChangeCode?.(code);
      if (code.length === codeLength) {
        onCodeFilled?.(code);
      }
      return;
    }

    newDigits[index] = cleanText;
    setDigits(newDigits);

    const code = newDigits.join('');
    onChangeCode?.(code);

    if (cleanText && index < codeLength - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (code.length === codeLength) {
      onCodeFilled?.(code);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (/*#__PURE__*/
    _jsx(View, { style: styles.container, children:
      Array.from({ length: codeLength }).map((_, index) => {
        const isFocused = digits[index] !== '';
        const borderCol = error ?
        theme.error :
        isFocused ?
        theme.primary :
        theme.border;

        return (/*#__PURE__*/
          _jsx(TextInput, {

            ref: (ref) => {
              inputsRef.current[index] = ref;
            },
            style: [
            styles.box,
            Typography.h2,
            {
              borderColor: borderCol,
              color: theme.text,
              backgroundColor: theme.surfaceElevated
            }],

            keyboardType: "number-pad",
            maxLength: 6 // Allow paste up to codeLength
            , value: digits[index],
            onChangeText: (t) => handleTextChange(t, index),
            onKeyPress: (e) => handleKeyPress(e, index),
            selectTextOnFocus: true }, index
          ));

      }) }
    ));

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing.md
  },
  box: {
    width: 46,
    height: 54,
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    textAlign: 'center'
  }
});