import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Settings, HelpCircle, LogOut, User, BarChart3, MessageSquare, Wallet } from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import OutlineButton from '../../components/OutlineButton';
import { useApp } from '../../context/AppContext';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function MoreScreen() {
  const router = useRouter();
  const { artisanProfile, setRole } = useApp();

  const options = [
  { label: 'Artisan Profile', icon: User },
  { label: 'Analytics & Sales', icon: BarChart3 },
  { label: 'Messages', icon: MessageSquare },
  { label: 'Earnings & Payouts', icon: Wallet },
  { label: 'Settings', icon: Settings },
  { label: 'Help & Support', icon: HelpCircle }];


  return (/*#__PURE__*/
    _jsxs(View, { style: styles.container, children: [/*#__PURE__*/
      _jsxs(View, { style: styles.header, children: [/*#__PURE__*/
        _jsx(Logo, { size: "sm", showSubtitle: false }), /*#__PURE__*/
        _jsx(Text, { style: styles.title, children: "More" }), /*#__PURE__*/
        _jsx(View, { style: { width: 36 } })] }
      ), /*#__PURE__*/

      _jsxs(ScrollView, { contentContainerStyle: styles.content, children: [/*#__PURE__*/
        _jsxs(View, { style: styles.profileHeader, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.name, children: artisanProfile.fullName || 'Meera Patel' }), /*#__PURE__*/
          _jsxs(Text, { style: styles.role, children: ["Artisan Seller \u2022 ", artisanProfile.location] })] }
        ), /*#__PURE__*/

        _jsx(View, { style: styles.menu, children:
          options.map((opt) => {
            const IconComp = opt.icon;
            return (/*#__PURE__*/
              _jsxs(TouchableOpacity, { style: styles.menuItem, children: [/*#__PURE__*/
                _jsx(IconComp, { size: 20, color: colors.primary }), /*#__PURE__*/
                _jsx(Text, { style: styles.menuLabel, children: opt.label })] }, opt.label
              ));

          }) }
        ), /*#__PURE__*/

        _jsx(OutlineButton, {
          label: "Switch Role / Logout",
          icon: /*#__PURE__*/_jsx(LogOut, { size: 18, color: colors.primary }),
          onPress: () => {
            setRole(null);
            router.replace('/auth/role-select');
          },
          style: { marginTop: 24 } }
        )] }
      )] }
    ));

}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingTop: 44 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  title: { fontFamily: typography.fonts.serifBold, fontSize: 18, color: colors.textDark },
  content: { padding: 20 },
  profileHeader: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20
  },
  name: { fontFamily: typography.fonts.serifBold, fontSize: 18, color: colors.textDark },
  role: { fontFamily: typography.fonts.bodyRegular, fontSize: 12, color: colors.textMuted, marginTop: 2 },
  menu: { gap: 8 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12
  },
  menuLabel: { fontFamily: typography.fonts.bodyMedium, fontSize: 14, color: colors.textDark }
});