import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import StatusBadge from '../../components/StatusBadge';
import PrimaryButton from '../../components/PrimaryButton';
import { useApp } from '../../context/AppContext';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function ProductsScreen() {
  const router = useRouter();
  const { products } = useApp();

  return (/*#__PURE__*/
    _jsxs(View, { style: styles.container, children: [/*#__PURE__*/
      _jsxs(View, { style: styles.header, children: [/*#__PURE__*/
        _jsx(Logo, { size: "sm", showSubtitle: false }), /*#__PURE__*/
        _jsx(Text, { style: styles.title, children: "My Catalog" }), /*#__PURE__*/
        _jsx(TouchableOpacity, {
          style: styles.addBtn,
          onPress: () => router.push('/(artisan-tabs)/add-product'), children: /*#__PURE__*/

          _jsx(Plus, { size: 20, color: colors.white }) }
        )] }
      ), /*#__PURE__*/

      _jsxs(ScrollView, { contentContainerStyle: styles.content, children: [
        products.map((item) => /*#__PURE__*/
        _jsxs(View, { style: styles.card, children: [/*#__PURE__*/
          _jsx(Image, { source: { uri: item.images[0] }, style: styles.image }), /*#__PURE__*/
          _jsxs(View, { style: styles.info, children: [/*#__PURE__*/
            _jsx(Text, { style: styles.name, children: item.name }), /*#__PURE__*/
            _jsx(Text, { style: styles.category, children: item.category }), /*#__PURE__*/
            _jsxs(Text, { style: styles.price, children: ["\u20B9", item.price] })] }
          ), /*#__PURE__*/
          _jsx(StatusBadge, { status: item.status })] }, item.id
        )
        ), /*#__PURE__*/

        _jsx(PrimaryButton, {
          label: "Add New Product",
          onPress: () => router.push('/(artisan-tabs)/add-product'),
          style: { marginTop: 16 } }
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
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: { padding: 20 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12
  },
  image: { width: 60, height: 60, borderRadius: 12, marginRight: 12 },
  info: { flex: 1 },
  name: { fontFamily: typography.fonts.bodySemiBold, fontSize: 14, color: colors.textDark },
  category: { fontFamily: typography.fonts.bodyRegular, fontSize: 12, color: colors.textMuted },
  price: { fontFamily: typography.fonts.serifBold, fontSize: 14, color: colors.primary, marginTop: 2 }
});