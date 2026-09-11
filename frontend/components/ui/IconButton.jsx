import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx } from "react/jsx-runtime";











export const IconButton = ({
  icon,
  onPress,
  size = 40,
  backgroundColor,
  style,
  disabled = false,
  testID = 'icon-button'
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const bg = backgroundColor || theme.surface;

  return (/*#__PURE__*/
    _jsx(TouchableOpacity, {
      onPress: onPress,
      disabled: disabled,
      activeOpacity: 0.7,
      style: [
      styles.base,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bg,
        opacity: disabled ? 0.5 : 1
      },
      style],

      accessibilityRole: "button",
      testID: testID, children:

      icon }
    ));

};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});