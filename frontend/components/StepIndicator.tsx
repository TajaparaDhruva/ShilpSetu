import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';

interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  steps?: Step[];
  currentStep: number;
}

const defaultSteps: Step[] = [
  { number: 1, label: 'Basic Info' },
  { number: 2, label: 'Preferences' },
  { number: 3, label: 'Interests' },
  { number: 4, label: 'Complete' },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps = defaultSteps,
  currentStep,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.nodesRow}>
        {steps.map((step, idx) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;
          const isUpcoming = step.number > currentStep;

          return (
            <React.Fragment key={step.number}>
              {/* Connector Line */}
              {idx > 0 && (
                <View
                  style={[
                    styles.connectorLine,
                    step.number <= currentStep ? styles.activeLine : styles.inactiveLine,
                  ]}
                />
              )}

              {/* Node Circle */}
              <View
                style={[
                  styles.node,
                  (isActive || isCompleted) && styles.activeNode,
                  isUpcoming && styles.upcomingNode,
                ]}
              >
                {isCompleted ? (
                  <Check size={14} color={colors.white} strokeWidth={3} />
                ) : (
                  <Text
                    style={[
                      styles.nodeText,
                      (isActive || isCompleted) ? styles.activeNodeText : styles.upcomingNodeText,
                    ]}
                  >
                    {step.number}
                  </Text>
                )}
              </View>
            </React.Fragment>
          );
        })}
      </View>

      {/* Labels Row */}
      <View style={styles.labelsRow}>
        {steps.map((step) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;

          return (
            <Text
              key={step.number}
              style={[
                styles.label,
                (isActive || isCompleted) ? styles.activeLabel : styles.upcomingLabel,
              ]}
              numberOfLines={1}
            >
              {step.label}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 8,
  },
  nodesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  connectorLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 4,
  },
  activeLine: {
    backgroundColor: colors.primary,
  },
  inactiveLine: {
    backgroundColor: colors.border,
  },
  node: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNode: {
    backgroundColor: colors.primary,
  },
  upcomingNode: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  nodeText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
  },
  activeNodeText: {
    color: colors.white,
  },
  upcomingNodeText: {
    color: colors.textMuted,
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  label: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11,
    textAlign: 'center',
    flex: 1,
  },
  activeLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
  upcomingLabel: {
    color: colors.textMuted,
  },
});

export default StepIndicator;
