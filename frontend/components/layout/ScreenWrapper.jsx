import React from 'react';
import { StyleSheet, View, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";











export const ScreenWrapper = ({
  children,
  scrollable = false,
  style,
  contentContainerStyle,
  backgroundColor,
  refreshControl,
  testID = 'screen-wrapper'
}) => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  const bg = backgroundColor || themeColors.background;

  return (/*#__PURE__*/
    _jsxs(SafeAreaView, { style: [styles.container, { backgroundColor: bg }, style], testID: testID, children: [/*#__PURE__*/
      _jsx(StatusBar, {
        barStyle: colorScheme === 'dark' ? 'light-content' : 'dark-content',
        backgroundColor: bg }
      ),
      scrollable ? /*#__PURE__*/
      _jsx(ScrollView, {
        style: styles.flex,
        contentContainerStyle: [{ paddingBottom: 32 }, contentContainerStyle],
        showsVerticalScrollIndicator: false,
        keyboardShouldPersistTaps: "handled",
        refreshControl: refreshControl, children:

        children }
      ) : /*#__PURE__*/

      _jsx(View, { style: [styles.flex, contentContainerStyle], children: children })] }

    ));

};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flex: {
    flex: 1
  }
});