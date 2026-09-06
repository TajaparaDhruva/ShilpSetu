import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";











const defaultSteps = [
{ number: 1, label: 'Basic Info' },
{ number: 2, label: 'Preferences' },
{ number: 3, label: 'Interests' },
{ number: 4, label: 'Complete' }];


export const StepIndicator = ({
  steps = defaultSteps,
  currentStep
}) => {
  return (/*#__PURE__*/
    _jsxs(View, { style: styles.container, children: [/*#__PURE__*/
      _jsx(View, { style: styles.nodesRow, children:
        steps.map((step, idx) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;
          const isUpcoming = step.number > currentStep;

          return (/*#__PURE__*/
            _jsxs(React.Fragment, { children: [

              idx > 0 && /*#__PURE__*/
              _jsx(View, {
                style: [
                styles.connectorLine,
                step.number <= currentStep ? styles.activeLine : styles.inactiveLine] }

              ), /*#__PURE__*/



              _jsx(View, {
                style: [
                styles.node,
                (isActive || isCompleted) && styles.activeNode,
                isUpcoming && styles.upcomingNode], children:


                isCompleted ? /*#__PURE__*/
                _jsx(Check, { size: 14, color: colors.white, strokeWidth: 3 }) : /*#__PURE__*/

                _jsx(Text, {
                  style: [
                  styles.nodeText,
                  isActive || isCompleted ? styles.activeNodeText : styles.upcomingNodeText], children:


                  step.number }
                ) }

              )] }, step.number
            ));

        }) }
      ), /*#__PURE__*/


      _jsx(View, { style: styles.labelsRow, children:
        steps.map((step) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;

          return (/*#__PURE__*/
            _jsx(Text, {

              style: [
              styles.label,
              isActive || isCompleted ? styles.activeLabel : styles.upcomingLabel],

              numberOfLines: 1, children:

              step.label }, step.number
            ));

        }) }
      )] }
    ));

};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 8
  },
  nodesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12
  },
  connectorLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 4
  },
  activeLine: {
    backgroundColor: colors.primary
  },
  inactiveLine: {
    backgroundColor: colors.border
  },
  node: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeNode: {
    backgroundColor: colors.primary
  },
  upcomingNode: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.border
  },
  nodeText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13
  },
  activeNodeText: {
    color: colors.white
  },
  upcomingNodeText: {
    color: colors.textMuted
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  label: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11,
    textAlign: 'center',
    flex: 1
  },
  activeLabel: {
    color: colors.primary,
    fontWeight: '600'
  },
  upcomingLabel: {
    color: colors.textMuted
  }
});

export default StepIndicator;