import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Home,
  Package,
  ClipboardList,
  Users,
  BarChart3,
  MessageSquare,
  Wallet,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  X,
} from 'lucide-react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import Logo from './Logo';
import ScriptCaption from './ScriptCaption';
import MandalaBackground from './MandalaBackground';
import OutlineButton from './OutlineButton';
import { useApp } from '../context/AppContext';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.76;

export const SideDrawer = ({
  visible,
  onClose,
  activeItem = 'Home',
  onSelectItem,
}) => {
  const { artisanProfile, setRole } = useApp();

  const menuItems = [
    { label: 'Home', icon: Home },
    { label: 'My Products', icon: Package },
    { label: 'Orders', icon: ClipboardList },
    { label: 'Customers', icon: Users },
    { label: 'Analytics', icon: BarChart3 },
    { label: 'Messages', icon: MessageSquare },
    { label: 'Earnings', icon: Wallet },
    { label: 'Settings', icon: Settings },
    { label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Backdrop touchable to dismiss */}
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

        {/* Drawer Content */}
        <View style={styles.drawerContainer}>
          <MandalaBackground position="top-right" size={160} opacity={0.12} />

          {/* Header Bar */}
          <View style={styles.header}>
            <Logo size="sm" showSubtitle={false} />
            <View style={styles.headerRight}>
              <ScriptCaption lines={['Craft', 'Create', 'Grow']} align="right" />
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <X size={20} color={colors.textDark} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Profile Header Row */}
            <View style={styles.profileCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200' }}
                style={styles.avatar}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{artisanProfile.fullName || 'Meera Patel'}</Text>
                <Text style={styles.profileRole}>Artisan</Text>
                <TouchableOpacity>
                  <Text style={styles.viewProfileText}>View Profile ΓåÆ</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Menu List */}
            <View style={styles.menuList}>
              {menuItems.map((item) => {
                const IconComp = item.icon;
                const isActive = activeItem === item.label;

                return (
                  <TouchableOpacity
                    key={item.label}
                    activeOpacity={0.8}
                    style={[
                      styles.menuItem,
                      isActive && styles.activeMenuItem,
                    ]}
                    onPress={() => {
                      onSelectItem?.(item.label);
                      onClose();
                    }}
                  >
                    <View style={styles.menuLeft}>
                      <IconComp
                        size={20}
                        color={isActive ? colors.white : colors.textDark}
                      />
                      <Text
                        style={[
                          styles.menuLabel,
                          isActive && styles.activeMenuLabel,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </View>
                    <ChevronRight
                      size={16}
                      color={isActive ? colors.white : colors.textMuted}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Footer Cursive Accent */}
            <View style={styles.footerAccent}>
              <ScriptCaption
                lines={['Traditional', 'Hands', 'Global', 'Dreams']}
                color={colors.primary}
              />
            </View>
          </ScrollView>

          {/* Logout Button Pinned at Bottom */}
          <View style={styles.bottomContainer}>
            <OutlineButton
              label="Logout"
              icon={<LogOut size={18} color={colors.primary} />}
              iconPosition="left"
              onPress={() => {
                onClose();
                setRole(null);
              }}
              style={styles.logoutBtn}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.overlayDark,
  },
  backdrop: {
    flex: 1,
  },
  drawerContainer: {
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: colors.bg,
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: colors.bgAlt,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 14,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 16,
    color: colors.textDark,
  },
  profileRole: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginVertical: 1,
  },
  viewProfileText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  menuList: {
    gap: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  activeMenuItem: {
    backgroundColor: colors.primary,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 14,
    color: colors.textDark,
  },
  activeMenuLabel: {
    color: colors.white,
    fontFamily: typography.fonts.bodySemiBold,
  },
  footerAccent: {
    marginTop: 20,
    alignItems: 'center',
  },
  bottomContainer: {
    paddingTop: 8,
  },
  logoutBtn: {
    height: 46,
  },
});

export default SideDrawer;