import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';import { jsx as _jsx } from "react/jsx-runtime";








export const StatusBadge = ({ status, style }) => {
  const isSuccess = status === 'In Stock' || status === 'Delivered';

  return (/*#__PURE__*/
    _jsx(View, {
      style: [
      styles.badge,
      isSuccess ? styles.successBg : styles.warningBg,
      style], children: /*#__PURE__*/


      _jsx(Text, { style: [styles.text, isSuccess ? styles.successText : styles.warningText], children:
        status }
      ) }
    ));

};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    alignSelf: 'flex-start'
  },
  successBg: {
    backgroundColor: colors.successBg
  },
  warningBg: {
    backgroundColor: colors.warningBg
  },
  text: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11,
    fontWeight: '600'
  },
  successText: {
    color: colors.success
  },
  warningText: {
    color: colors.warning
  }
});

export default StatusBadge;