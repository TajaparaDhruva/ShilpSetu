import React, { ReactNode } from 'react';
import { StyleSheet, View, ScrollView, ViewStyle, StatusBar, SafeAreaView, RefreshControlProps } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ScreenWrapperProps {
  children: ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  backgroundColor?: string;
  refreshControl?: React.ReactElement<RefreshControlProps>;
  testID?: string;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scrollable = false,
  style,
  contentContainerStyle,
  backgroundColor,
  refreshControl,
  testID = 'screen-wrapper',
}) => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  const bg = backgroundColor || themeColors.background;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }, style]} testID={testID}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={bg}
      />
      {scrollable ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[{ paddingBottom: 32 }, contentContainerStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          refreshControl={refreshControl}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, contentContainerStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
});
