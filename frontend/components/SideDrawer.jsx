import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  Dimensions } from
'react-native';
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
  X } from
'lucide-react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import Logo from './Logo';
import ScriptCaption from './ScriptCaption';
import MandalaBackground from './MandalaBackground';
import OutlineButton from './OutlineButton';
import { useApp } from '../context/AppContext';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.76;








export const SideDrawer = ({
  visible,
  onClose,
  activeItem = 'Home',
  onSelectItem
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
  { label: 'Help & Support', icon: HelpCircle }];


  return (/*#__PURE__*/
    _jsx(Modal, {
      visible: visible,
      transparent: true,
      animationType: "fade",
      onRequestClose: onClose, children: /*#__PURE__*/

      _jsxs(View, { style: styles.overlay, children: [/*#__PURE__*/

        _jsx(TouchableOpacity, { style: styles.backdrop, activeOpacity: 1, onPress: onClose }), /*#__PURE__*/


        _jsxs(View, { style: styles.drawerContainer, children: [/*#__PURE__*/
          _jsx(MandalaBackground, { position: "top-right", size: 160, opacity: 0.12 }), /*#__PURE__*/


          _jsxs(View, { style: styles.header, children: [/*#__PURE__*/
            _jsx(Logo, { size: "sm", showSubtitle: false }), /*#__PURE__*/
            _jsxs(View, { style: styles.headerRight, children: [/*#__PURE__*/
              _jsx(ScriptCaption, { lines: ['Craft', 'Create', 'Grow'], align: "right" }), /*#__PURE__*/
              _jsx(TouchableOpacity, { onPress: onClose, style: styles.closeBtn, children: /*#__PURE__*/
                _jsx(X, { size: 20, color: colors.textDark }) }
              )] }
            )] }
          ), /*#__PURE__*/

          _jsxs(ScrollView, { showsVerticalScrollIndicator: false, contentContainerStyle: styles.scrollContent, children: [/*#__PURE__*/

            _jsxs(View, { style: styles.profileCard, children: [/*#__PURE__*/
              _jsx(Image, {
                source: { uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200' },
                style: styles.avatar }
              ), /*#__PURE__*/
              _jsxs(View, { style: styles.profileInfo, children: [/*#__PURE__*/
                _jsx(Text, { style: styles.profileName, children: artisanProfile.fullName || 'Meera Patel' }), /*#__PURE__*/
                _jsx(Text, { style: styles.profileRole, children: "Artisan" }), /*#__PURE__*/
                _jsx(TouchableOpacity, { children: /*#__PURE__*/
                  _jsx(Text, { style: styles.viewProfileText, children: "View Profile \u2192" }) }
                )] }
              )] }
            ), /*#__PURE__*/

            _jsx(View, { style: styles.divider }), /*#__PURE__*/


            _jsx(View, { style: styles.menuList, children:
              menuItems.map((item) => {
                const IconComp = item.icon;
                const isActive = activeItem === item.label;

                return (/*#__PURE__*/
                  _jsxs(TouchableOpacity, {

                    activeOpacity: 0.8,
                    style: [
                    styles.menuItem,
                    isActive && styles.activeMenuItem],

                    onPress: () => {
                      onSelectItem?.(item.label);
                      onClose();
                    }, children: [/*#__PURE__*/

                    _jsxs(View, { style: styles.menuLeft, children: [/*#__PURE__*/
                      _jsx(IconComp, {
                        size: 20,
                        color: isActive ? colors.white : colors.textDark }
                      ), /*#__PURE__*/
                      _jsx(Text, {
                        style: [
                        styles.menuLabel,
                        isActive && styles.activeMenuLabel], children:


                        item.label }
                      )] }
                    ), /*#__PURE__*/
                    _jsx(ChevronRight, {
                      size: 16,
                      color: isActive ? colors.white : colors.textMuted }
                    )] }, item.label
                  ));

              }) }
            ), /*#__PURE__*/


            _jsx(View, { style: styles.footerAccent, children: /*#__PURE__*/
              _jsx(ScriptCaption, {
                lines: ['Traditional', 'Hands', 'Global', 'Dreams'],
                color: colors.primary }
              ) }
            )] }
          ), /*#__PURE__*/


          _jsx(View, { style: styles.bottomContainer, children: /*#__PURE__*/
            _jsx(OutlineButton, {
              label: "Logout",
              icon: /*#__PURE__*/_jsx(LogOut, { size: 18, color: colors.primary }),
              iconPosition: "left",
              onPress: () => {
                onClose();
                setRole(null);
              },
              style: styles.logoutBtn }
            ) }
          )] }
        )] }
      ) }
    ));

};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.overlayDark
  },
  backdrop: {
    flex: 1
  },
  drawerContainer: {
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: colors.bg,
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 24,
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  closeBtn: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: colors.bgAlt
  },
  scrollContent: {
    paddingBottom: 16
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 14,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12
  },
  profileInfo: {
    flex: 1
  },
  profileName: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 16,
    color: colors.textDark
  },
  profileRole: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginVertical: 1
  },
  viewProfileText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.primary
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12
  },
  menuList: {
    gap: 4
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999
  },
  activeMenuItem: {
    backgroundColor: colors.primary
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  menuLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 14,
    color: colors.textDark
  },
  activeMenuLabel: {
    color: colors.white,
    fontFamily: typography.fonts.bodySemiBold
  },
  footerAccent: {
    marginTop: 20,
    alignItems: 'center'
  },
  bottomContainer: {
    paddingTop: 8
  },
  logoutBtn: {
    height: 46
  }
});

export default SideDrawer;