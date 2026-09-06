import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../theme/colors';

interface ProgressDotsProps {
  total?: number;
  active: number;
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({ total = 3, active = 1 }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i + 1 === active;
        return (
          <View
            key={i}
            style={[
              styles.dot,
              isActive ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: colors.border,
  },
});

export default ProgressDots;
