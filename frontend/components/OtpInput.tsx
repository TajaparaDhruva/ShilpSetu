import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';

interface OtpInputProps {
  length?: number;
  onCodeChanged?: (code: string) => void;
  onCodeFilled?: (code: string) => void;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  onCodeChanged,
  onCodeFilled,
}) => {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const code = digits.join('');
    onCodeChanged?.(code);
    if (code.length === length && !digits.includes('')) {
      onCodeFilled?.(code);
    }
  }, [digits]);

  const handleChange = (text: string, index: number) => {
    const newDigits = [...digits];
    const char = text.slice(-1);
    newDigits[index] = char;
    setDigits(newDigits);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {digits.map((digit, index) => {
        const isFocused = focusedIndex === index;

        return (
          <TextInput
            key={index}
            ref={(ref) => { inputRefs.current[index] = ref; }}
            style={[
              styles.box,
              isFocused && styles.focusedBox,
              digit ? styles.filledBox : null,
            ]}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => setFocusedIndex(index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
            textAlign="center"
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '100%',
    paddingHorizontal: 8,
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
    textAlign: 'center',
  },
  focusedBox: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  filledBox: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
});

export default OtpInput;
