import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import StatusBadge from '../../components/StatusBadge';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function OrdersScreen() {
  const orders = [
  {
    id: 'ORD1234',
    product: 'Handcrafted Terracotta Vase',
    customer: 'Ananya Sharma',
    date: 'Today, 2:30 PM',
    amount: '₹499',
    status: 'Processing',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=200'
  },
  {
    id: 'ORD1233',
    product: 'Embroidered Potli Bag',
    customer: 'Rohan Mehta',
    date: 'Yesterday',
    amount: '₹699',
    status: 'Delivered',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=200'
  }];


  return (/*#__PURE__*/
    _jsxs(View, { style: styles.container, children: [/*#__PURE__*/
      _jsxs(View, { style: styles.header, children: [/*#__PURE__*/
        _jsx(Logo, { size: "sm", showSubtitle: false }), /*#__PURE__*/
        _jsx(Text, { style: styles.title, children: "Orders" }), /*#__PURE__*/
        _jsx(View, { style: { width: 36 } })] }
      ), /*#__PURE__*/

      _jsx(ScrollView, { contentContainerStyle: styles.content, children:
        orders.map((ord) => /*#__PURE__*/
        _jsxs(View, { style: styles.card, children: [/*#__PURE__*/
          _jsx(Image, { source: { uri: ord.image }, style: styles.image }), /*#__PURE__*/
          _jsxs(View, { style: styles.info, children: [/*#__PURE__*/
            _jsxs(Text, { style: styles.id, children: ["#", ord.id] }), /*#__PURE__*/
            _jsx(Text, { style: styles.product, children: ord.product }), /*#__PURE__*/
            _jsxs(Text, { style: styles.customer, children: ["Buyer: ", ord.customer] }), /*#__PURE__*/
            _jsx(Text, { style: styles.date, children: ord.date })] }
          ), /*#__PURE__*/
          _jsxs(View, { style: { alignItems: 'flex-end' }, children: [/*#__PURE__*/
            _jsx(Text, { style: styles.amount, children: ord.amount }), /*#__PURE__*/
            _jsx(StatusBadge, { status: ord.status, style: { marginTop: 6 } })] }
          )] }, ord.id
        )
        ) }
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
  image: { width: 54, height: 54, borderRadius: 12, marginRight: 12 },
  info: { flex: 1 },
  id: { fontFamily: typography.fonts.bodySemiBold, fontSize: 13, color: colors.textDark },
  product: { fontFamily: typography.fonts.bodyRegular, fontSize: 12, color: colors.textBody },
  customer: { fontFamily: typography.fonts.bodyRegular, fontSize: 11, color: colors.textMuted },
  date: { fontFamily: typography.fonts.bodyRegular, fontSize: 10, color: colors.textMuted, marginTop: 2 },
  amount: { fontFamily: typography.fonts.serifBold, fontSize: 14, color: colors.primary }
});