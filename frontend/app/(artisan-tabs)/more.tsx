import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Settings, HelpCircle, LogOut, User, BarChart3, MessageSquare, Wallet } from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import OutlineButton from '../../components/OutlineButton';
import { useApp } from '../../context/AppContext';

export default function MoreScreen() {
  const router = useRouter();
  const { artisanProfile, setRole } = useApp();

  const options = [
    { label: 'Artisan Profile', icon: User },
    { label: 'Analytics & Sales', icon: BarChart3 },
    { label: 'Messages', icon: MessageSquare },
    { label: 'Earnings & Payouts', icon: Wallet },
    { label: 'Settings', icon: Settings },
    { label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo size="sm" showSubtitle={false} />
        <Text style={styles.title}>More</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <Text style={styles.name}>{artisanProfile.fullName || 'Meera Patel'}</Text>
          <Text style={styles.role}>Artisan Seller • {artisanProfile.location}</Text>
        </View>

        <View style={styles.menu}>
          {options.map((opt) => {
            const IconComp = opt.icon;
            return (
              <TouchableOpacity key={opt.label} style={styles.menuItem}>
                <IconComp size={20} color={colors.primary} />
                <Text style={styles.menuLabel}>{opt.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <OutlineButton
          label="Switch Role / Logout"
          icon={<LogOut size={18} color={colors.primary} />}
          onPress={() => {
            setRole(null);
            router.replace('/auth/role-select' as any);
          }}
          style={{ marginTop: 24 }}
        />
      </ScrollView>
    </View>
  );
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
    borderBottomColor: colors.border,
  },
  title: { fontFamily: typography.fonts.serifBold, fontSize: 18, color: colors.textDark },
  content: { padding: 20 },
  profileHeader: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
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
    gap: 12,
  },
  menuLabel: { fontFamily: typography.fonts.bodyMedium, fontSize: 14, color: colors.textDark },
});
