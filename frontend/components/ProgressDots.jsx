import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../theme/colors';import { jsx as _jsx } from "react/jsx-runtime";






export const ProgressDots = ({ total = 3, active = 1 }) => {
  return (/*#__PURE__*/
    _jsx(View, { style: styles.container, children:
      Array.from({ length: total }).map((_, i) => {
        const isActive = i + 1 === active;
        return (/*#__PURE__*/
          _jsx(View, {

            style: [
            styles.dot,
            isActive ? styles.activeDot : styles.inactiveDot] }, i

          ));

      }) }
    ));

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primary
  },
  inactiveDot: {
    width: 8,
    backgroundColor: colors.border
  }
});

export default ProgressDots;