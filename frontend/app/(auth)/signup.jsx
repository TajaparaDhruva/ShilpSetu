import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Header } from '@/components/ui/Header';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useAuth } from '@/store/AuthContext';
import { useLanguage } from '@/store/LanguageContext';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function SignupScreen() {
  const router = useRouter();
  const { signup, isLoading } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [category, setCategory] = useState('Woodwork & Carving');
  const [errors, setErrors] = useState({});

  const categories = [
  'Woodwork & Carving',
  'Pottery & Terracotta',
  'Handloom & Textiles',
  'Artisan Jewelry',
  'Brass & Metal Craft',
  'Traditional Painting',
  'Other Traditional Handicraft'];


  const handleSignup = async () => {
    const errs = {};

    if (!name.trim()) errs.name = 'Full name is required';
    if (!mobile.trim() || mobile.trim().length < 10) errs.mobile = 'Enter valid 10-digit mobile number';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    const res = await signup({
      name,
      mobile,
      preferredLanguage: language,
      craftCategory: category
    });

    if (res.success) {
      router.push({
        pathname: '/(auth)/otp',
        params: { mobile }
      });
    }
  };

  return (/*#__PURE__*/
    _jsxs(ScreenWrapper, { scrollable: true, contentContainerStyle: styles.container, children: [/*#__PURE__*/
      _jsx(Header, {
        title: t('createNewAccount'),
        showBack: true,
        rightElement: /*#__PURE__*/_jsx(LanguageToggle, {}) }
      ), /*#__PURE__*/

      _jsxs(View, { style: styles.content, children: [/*#__PURE__*/
        _jsx(Text, { style: [Typography.h1, { color: theme.text, marginTop: Spacing.md }], children:
          t('createNewAccount') }
        ), /*#__PURE__*/
        _jsx(Text, { style: [Typography.body, { color: theme.textSecondary, marginTop: Spacing.xs }], children: "Join ShilpSetu to take your traditional handicraft to global buyers." }

        ), /*#__PURE__*/

        _jsxs(View, { style: styles.form, children: [/*#__PURE__*/
          _jsx(Input, {
            label: t('fullName'),
            placeholder: t('fullNamePlaceholder'),
            value: name,
            onChangeText: (v) => {
              setName(v);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            },
            error: errors.name,
            leftIcon: /*#__PURE__*/_jsx(Text, { style: { fontSize: 16 }, children: "\uD83D\uDC64" }) }
          ), /*#__PURE__*/

          _jsx(Input, {
            label: t('mobileNumber'),
            placeholder: t('mobilePlaceholder'),
            keyboardType: "phone-pad",
            maxLength: 10,
            value: mobile,
            onChangeText: (v) => {
              setMobile(v);
              if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: undefined }));
            },
            error: errors.mobile,
            leftIcon: /*#__PURE__*/_jsx(Text, { style: { fontSize: 16 }, children: "\uD83D\uDCF1 +91" }) }
          ), /*#__PURE__*/


          _jsx(Text, { style: [Typography.label, { color: theme.textSecondary, marginTop: Spacing.md, marginBottom: Spacing.xs }], children:
            t('craftCategory') }
          ), /*#__PURE__*/
          _jsx(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: styles.categoryScroll, children:
            categories.map((cat) => {
              const selected = category === cat;
              return (/*#__PURE__*/
                _jsx(TouchableOpacity, {

                  onPress: () => setCategory(cat),
                  activeOpacity: 0.8,
                  style: [
                  styles.chip,
                  {
                    backgroundColor: selected ? theme.primary : theme.surface,
                    borderColor: selected ? theme.primary : theme.border
                  }], children: /*#__PURE__*/


                  _jsx(Text, {
                    style: [
                    Typography.caption,
                    { color: selected ? '#FFFFFF' : theme.text, fontWeight: '600' }], children:


                    cat }
                  ) }, cat
                ));

            }) }
          ), /*#__PURE__*/

          _jsx(Button, {
            title: t('createAccount'),
            variant: "primary",
            size: "lg",
            loading: isLoading,
            onPress: handleSignup,
            style: styles.submitBtn }
          )] }
        ), /*#__PURE__*/

        _jsxs(View, { style: styles.footerRow, children: [/*#__PURE__*/
          _jsx(Text, { style: [Typography.bodySmall, { color: theme.textMuted }], children:
            t('alreadyHaveAccount') }
          ), /*#__PURE__*/
          _jsx(TouchableOpacity, { onPress: () => router.push('/(auth)/login'), children: /*#__PURE__*/
            _jsx(Text, { style: [Typography.label, { color: theme.primary, marginLeft: Spacing.xs }], children: "Login" }

            ) }
          )] }
        )] }
      )] }
    ));

}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.xl
  },
  content: {
    paddingHorizontal: Spacing.lg
  },
  form: {
    marginTop: Spacing.lg
  },
  categoryScroll: {
    gap: Spacing.xs,
    paddingVertical: Spacing.xs
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1
  },
  submitBtn: {
    marginTop: Spacing.xl
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.lg
  }
});