import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Palette } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx } from "react/jsx-runtime";










export const Avatar = ({
  uri,
  name,
  size = 56,
  showProgressRing = false,
  completionPercentage = 85,
  style
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const getInitials = (n) => {
    if (!n) return 'A';
    const parts = n.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
  };

  const ringColor = completionPercentage >= 80 ? Palette.forestGreen : Palette.ochreYellow;

  return (/*#__PURE__*/
    _jsx(View, {
      style: [
      styles.container,
      {
        width: size + (showProgressRing ? 8 : 0),
        height: size + (showProgressRing ? 8 : 0),
        borderRadius: (size + (showProgressRing ? 8 : 0)) / 2,
        borderColor: showProgressRing ? ringColor : 'transparent',
        borderWidth: showProgressRing ? 2.5 : 0
      },
      style], children:


      uri ? /*#__PURE__*/
      _jsx(Image, {
        source: { uri },
        style: { width: size, height: size, borderRadius: size / 2 },
        resizeMode: "cover" }
      ) : /*#__PURE__*/

      _jsx(View, {
        style: [
        styles.placeholder,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.primaryLight
        }], children: /*#__PURE__*/


        _jsx(Text, { style: [Typography.h3, { color: theme.primary }], children:
          getInitials(name) }
        ) }
      ) }

    ));

};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});