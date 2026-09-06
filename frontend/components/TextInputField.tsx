import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import spacing from '../theme/spacing';

interface TextInputFieldProps extends TextInputProps {
  label?: string;
  required?: boolean;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerStyle?: ViewStyle;
  error?: string;
}

export const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  required = false,
  icon,
  rightElement,
  containerStyle,
  error,
  ...rest
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.asterisk}> *</Text>}
        </Text>
      )}

      <View style={[styles.fieldContainer, error ? styles.errorBorder : null]}>
        {icon && (
          <View style={styles.iconBadge}>
            {icon}
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholderTextColor={colors.textMuted}
          {...rest}
        />

        {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 6,
  },
  asterisk: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  fieldContainer: {
    height: spacing.inputHeight,
    backgroundColor: colors.bgAlt,
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  errorBorder: {
    borderColor: colors.warning,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryTint10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 14,
    color: colors.textDark,
    paddingVertical: 8,
  },
  rightElement: {
    marginLeft: 8,
  },
  errorText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.warning,
    marginTop: 4,
  },
});

export default TextInputField;
