import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ShoppingCart, Hammer, Check } from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import PrimaryButton from '../../components/PrimaryButton';
import ScriptCaption from '../../components/ScriptCaption';
import MandalaBackground from '../../components/MandalaBackground';
import { useApp } from '../../context/AppContext';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function RoleSelectScreen() {
  const router = useRouter();
  const { role, setRole } = useApp();
  const [selectedRole, setSelectedRole] = useState(role || 'artisan');

  const handleContinue = () => {
    if (!selectedRole) return;
    setRole(selectedRole);
    if (selectedRole === 'artisan') {
      router.push('/setup/artisan-step-1');
    } else {
      router.push('/setup/buyer-step-1');
    }
  };

  return (/*#__PURE__*/
    _jsxs(View, { style: styles.container, children: [/*#__PURE__*/
      _jsx(MandalaBackground, { position: "top-left", size: 180, opacity: 0.1 }), /*#__PURE__*/
      _jsx(MandalaBackground, { position: "top-right", size: 180, opacity: 0.1 }), /*#__PURE__*/


      _jsxs(View, { style: styles.topBar, children: [/*#__PURE__*/
        _jsx(ScriptCaption, { lines: ['Same', 'Tradition', 'New', 'Opportunities'] }), /*#__PURE__*/
        _jsx(ScriptCaption, { lines: ['Local Crafts', 'Global Opportunities'], align: "right" })] }
      ), /*#__PURE__*/

      _jsxs(ScrollView, { contentContainerStyle: styles.scrollContent, showsVerticalScrollIndicator: false, children: [/*#__PURE__*/

        _jsx(View, { style: styles.logoWrapper, children: /*#__PURE__*/
          _jsx(Logo, { size: "lg" }) }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.headingBox, children: [/*#__PURE__*/
          _jsxs(Text, { style: styles.headingDark, children: ["Choose Your ", /*#__PURE__*/
            _jsx(Text, { style: { color: colors.primary }, children: "Role" })] }
          ), /*#__PURE__*/
          _jsx(View, { style: styles.underline }), /*#__PURE__*/

          _jsx(Text, { style: styles.subtext, children: "Join as a buyer to discover unique handmade products or as an artisan to showcase your craft to the world." }

          )] }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.cardsRow, children: [/*#__PURE__*/

          _jsxs(TouchableOpacity, {
            activeOpacity: 0.9,
            style: [
            styles.roleCard,
            selectedRole === 'buyer' && styles.selectedCard],

            onPress: () => setSelectedRole('buyer'), children: [/*#__PURE__*/

            _jsxs(View, { style: styles.photoBox, children: [/*#__PURE__*/
              _jsx(Image, {
                source: { uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300' },
                style: styles.cardPhoto }
              ), /*#__PURE__*/
              _jsx(View, { style: styles.badgeCircle, children: /*#__PURE__*/
                _jsx(ShoppingCart, { size: 18, color: colors.white }) }
              )] }
            ), /*#__PURE__*/

            _jsx(Text, { style: styles.cardTitle, children: "Buyer" }), /*#__PURE__*/
            _jsx(Text, { style: styles.cardDesc, children: "Explore and buy authentic handmade products from talented artisans." }

            ), /*#__PURE__*/

            _jsxs(View, { style: styles.checklist, children: [/*#__PURE__*/
              _jsxs(View, { style: styles.checkItem, children: [/*#__PURE__*/
                _jsx(View, { style: styles.checkIcon, children: /*#__PURE__*/_jsx(Check, { size: 10, color: colors.white }) }), /*#__PURE__*/
                _jsx(Text, { style: styles.checkText, children: "Discover unique crafts" })] }
              ), /*#__PURE__*/
              _jsxs(View, { style: styles.checkItem, children: [/*#__PURE__*/
                _jsx(View, { style: styles.checkIcon, children: /*#__PURE__*/_jsx(Check, { size: 10, color: colors.white }) }), /*#__PURE__*/
                _jsx(Text, { style: styles.checkText, children: "Support local artisans" })] }
              ), /*#__PURE__*/
              _jsxs(View, { style: styles.checkItem, children: [/*#__PURE__*/
                _jsx(View, { style: styles.checkIcon, children: /*#__PURE__*/_jsx(Check, { size: 10, color: colors.white }) }), /*#__PURE__*/
                _jsx(Text, { style: styles.checkText, children: "Get quality handmade" })] }
              )] }
            )] }
          ), /*#__PURE__*/


          _jsxs(TouchableOpacity, {
            activeOpacity: 0.9,
            style: [
            styles.roleCard,
            selectedRole === 'artisan' && styles.selectedCard],

            onPress: () => setSelectedRole('artisan'), children: [/*#__PURE__*/

            _jsxs(View, { style: styles.photoBox, children: [/*#__PURE__*/
              _jsx(Image, {
                source: { uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300' },
                style: styles.cardPhoto }
              ), /*#__PURE__*/
              _jsx(View, { style: styles.badgeCircle, children: /*#__PURE__*/
                _jsx(Hammer, { size: 18, color: colors.white }) }
              )] }
            ), /*#__PURE__*/

            _jsx(Text, { style: styles.cardTitle, children: "Artisan" }), /*#__PURE__*/
            _jsx(Text, { style: styles.cardDesc, children: "Showcase your skills, reach more customers and grow your business." }

            ), /*#__PURE__*/

            _jsxs(View, { style: styles.checklist, children: [/*#__PURE__*/
              _jsxs(View, { style: styles.checkItem, children: [/*#__PURE__*/
                _jsx(View, { style: styles.checkIcon, children: /*#__PURE__*/_jsx(Check, { size: 10, color: colors.white }) }), /*#__PURE__*/
                _jsx(Text, { style: styles.checkText, children: "Create your artisan profile" })] }
              ), /*#__PURE__*/
              _jsxs(View, { style: styles.checkItem, children: [/*#__PURE__*/
                _jsx(View, { style: styles.checkIcon, children: /*#__PURE__*/_jsx(Check, { size: 10, color: colors.white }) }), /*#__PURE__*/
                _jsx(Text, { style: styles.checkText, children: "List handmade products" })] }
              ), /*#__PURE__*/
              _jsxs(View, { style: styles.checkItem, children: [/*#__PURE__*/
                _jsx(View, { style: styles.checkIcon, children: /*#__PURE__*/_jsx(Check, { size: 10, color: colors.white }) }), /*#__PURE__*/
                _jsx(Text, { style: styles.checkText, children: "Get orders & grow" })] }
              )] }
            )] }
          )] }
        ), /*#__PURE__*/


        _jsx(PrimaryButton, {
          label: "Continue",
          onPress: handleContinue,
          disabled: !selectedRole,
          style: styles.continueBtn }
        ), /*#__PURE__*/

        _jsx(Text, { style: styles.hintText, children: "You can always change this later in settings." }

        ), /*#__PURE__*/


        _jsx(View, { style: styles.footerRow, children: /*#__PURE__*/
          _jsx(ScriptCaption, { lines: ['Traditional', 'Hands', 'Global', 'Dreams'] }) }
        )] }
      )] }
    ));

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: 40
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 8
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24
  },
  logoWrapper: {
    alignItems: 'center',
    marginVertical: 8
  },
  headingBox: {
    alignItems: 'center',
    marginVertical: 12
  },
  headingDark: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 28,
    color: colors.textDark
  },
  underline: {
    height: 2,
    width: 40,
    backgroundColor: colors.primary,
    marginVertical: 6,
    borderRadius: 1
  },
  subtext: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    textAlign: 'center',
    lineHeight: 18
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 20
  },
  roleCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 12,
    alignItems: 'center'
  },
  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: colors.bgAlt
  },
  photoBox: {
    position: 'relative',
    marginBottom: 12
  },
  cardPhoto: {
    width: 72,
    height: 72,
    borderRadius: 36
  },
  badgeCircle: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surface
  },
  cardTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 18,
    color: colors.textDark,
    marginBottom: 4
  },
  cardDesc: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    textAlign: 'center',
    lineHeight: 15,
    marginBottom: 12
  },
  checklist: {
    width: '100%',
    gap: 6
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  checkIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textDark,
    flex: 1
  },
  continueBtn: {
    marginTop: 8
  },
  hintText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 8
  },
  footerRow: {
    marginTop: 20,
    alignItems: 'flex-start'
  }
});