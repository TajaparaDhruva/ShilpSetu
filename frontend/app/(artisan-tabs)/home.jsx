import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image } from

'react-native';
import { useRouter } from 'expo-router';
import {
  Bell,
  ChevronDown,
  Package,
  ClipboardList,
  BarChart3,
  Store,
  ShoppingCart,
  IndianRupee,
  Heart,
  MoreVertical,
  ChevronRight } from

'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import StatusBadge from '../../components/StatusBadge';
import ScriptCaption from '../../components/ScriptCaption';
import SideDrawer from '../../components/SideDrawer';
import { useApp } from '../../context/AppContext';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function ArtisanHomeScreen() {
  const router = useRouter();
  const { artisanProfile, products } = useApp();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const stats = [
  { label: 'Total Products', value: '12', icon: ShoppingCart, color: colors.primary },
  { label: 'Total Orders', value: '8', icon: ClipboardList, color: colors.warning },
  { label: 'Total Earnings', value: '₹12,450', icon: IndianRupee, color: colors.success },
  { label: 'Store Rating', value: '4.8', icon: Heart, color: '#E25C5C' }];


  const recentOrders = [
  {
    id: 'ORD1234',
    product: 'Handcrafted Terracotta Vase',
    date: 'Today, 2:30 PM',
    status: 'Processing',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=200'
  },
  {
    id: 'ORD1233',
    product: 'Embroidered Potli Bag',
    date: 'Yesterday',
    status: 'Delivered',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=200'
  }];


  return (/*#__PURE__*/
    _jsxs(View, { style: styles.container, children: [/*#__PURE__*/

      _jsx(SideDrawer, {
        visible: drawerVisible,
        onClose: () => setDrawerVisible(false),
        activeItem: "Home" }
      ), /*#__PURE__*/


      _jsxs(View, { style: styles.header, children: [/*#__PURE__*/
        _jsx(Logo, { size: "sm", showSubtitle: false }), /*#__PURE__*/

        _jsxs(View, { style: styles.greetingBox, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.greetingSub, children: "Hello," }), /*#__PURE__*/
          _jsxs(Text, { style: styles.greetingName, children: [artisanProfile.fullName || 'Meera Patel', " \uD83D\uDC4B"] }), /*#__PURE__*/
          _jsx(Text, { style: styles.greetingTagline, children: "Keep creating, keep inspiring!" })] }
        ), /*#__PURE__*/

        _jsxs(View, { style: styles.headerRight, children: [/*#__PURE__*/
          _jsxs(TouchableOpacity, { style: styles.iconBtn, children: [/*#__PURE__*/
            _jsx(Bell, { size: 20, color: colors.textDark }), /*#__PURE__*/
            _jsx(View, { style: styles.notifDot })] }
          ), /*#__PURE__*/

          _jsxs(TouchableOpacity, {
            style: styles.avatarBtn,
            onPress: () => setDrawerVisible(true), children: [/*#__PURE__*/

            _jsx(Image, {
              source: { uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200' },
              style: styles.avatar }
            ), /*#__PURE__*/
            _jsx(ChevronDown, { size: 14, color: colors.textDark })] }
          )] }
        )] }
      ), /*#__PURE__*/

      _jsxs(ScrollView, { contentContainerStyle: styles.scrollContent, showsVerticalScrollIndicator: false, children: [/*#__PURE__*/

        _jsxs(View, { style: styles.heroCard, children: [/*#__PURE__*/
          _jsx(Image, {
            source: { uri: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=800' },
            style: styles.heroImage }
          ), /*#__PURE__*/
          _jsx(View, { style: styles.heroOverlay }), /*#__PURE__*/

          _jsxs(View, { style: styles.heroContent, children: [/*#__PURE__*/
            _jsxs(View, { style: styles.heroTopRow, children: [/*#__PURE__*/
              _jsxs(View, { children: [/*#__PURE__*/
                _jsx(Text, { style: styles.heroTitle, children: "Your Craft" }), /*#__PURE__*/
                _jsx(Text, { style: styles.heroTitle, children: "Has a Bigger Story" })] }
              ), /*#__PURE__*/
              _jsx(ScriptCaption, { lines: ['Craft', 'Create', 'Grow'], color: colors.white, align: "right" })] }
            ), /*#__PURE__*/

            _jsx(Text, { style: styles.heroSub, children: "List your products, reach more people and keep traditions alive." }

            ), /*#__PURE__*/

            _jsx(TouchableOpacity, {
              activeOpacity: 0.85,
              style: styles.heroBtn,
              onPress: () => router.push('/(artisan-tabs)/add-product'), children: /*#__PURE__*/

              _jsx(Text, { style: styles.heroBtnText, children: "Add New Product \u2192" }) }
            ), /*#__PURE__*/

            _jsxs(View, { style: styles.paginationDots, children: [/*#__PURE__*/
              _jsx(View, { style: [styles.dot, styles.dotActive] }), /*#__PURE__*/
              _jsx(View, { style: styles.dot }), /*#__PURE__*/
              _jsx(View, { style: styles.dot })] }
            )] }
          )] }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.quickActionsRow, children: [/*#__PURE__*/
          _jsxs(TouchableOpacity, {
            style: [styles.quickCard, styles.quickCardActive],
            onPress: () => router.push('/(artisan-tabs)/add-product'), children: [/*#__PURE__*/

            _jsx(View, { style: styles.quickIconBgActive, children: /*#__PURE__*/
              _jsx(Package, { size: 20, color: colors.white }) }
            ), /*#__PURE__*/
            _jsx(Text, { style: [styles.quickLabel, { color: colors.primary }], children: "Add Product" })] }
          ), /*#__PURE__*/

          _jsxs(TouchableOpacity, { style: styles.quickCard, children: [/*#__PURE__*/
            _jsx(View, { style: styles.quickIconBg, children: /*#__PURE__*/
              _jsx(ClipboardList, { size: 20, color: colors.primary }) }
            ), /*#__PURE__*/
            _jsx(Text, { style: styles.quickLabel, children: "View Orders" })] }
          ), /*#__PURE__*/

          _jsxs(TouchableOpacity, { style: styles.quickCard, children: [/*#__PURE__*/
            _jsx(View, { style: styles.quickIconBg, children: /*#__PURE__*/
              _jsx(BarChart3, { size: 20, color: colors.primary }) }
            ), /*#__PURE__*/
            _jsx(Text, { style: styles.quickLabel, children: "Analytics" })] }
          ), /*#__PURE__*/

          _jsxs(TouchableOpacity, { style: styles.quickCard, children: [/*#__PURE__*/
            _jsx(View, { style: styles.quickIconBg, children: /*#__PURE__*/
              _jsx(Store, { size: 20, color: colors.primary }) }
            ), /*#__PURE__*/
            _jsx(Text, { style: styles.quickLabel, children: "Manage Store" })] }
          )] }
        ), /*#__PURE__*/


        _jsx(View, { style: styles.statsGrid, children:
          stats.map((item, idx) => {
            const IconComponent = item.icon;
            return (/*#__PURE__*/
              _jsxs(View, { style: styles.statCard, children: [/*#__PURE__*/
                _jsx(View, { style: [styles.statIconBadge, { backgroundColor: item.color + '1A' }], children: /*#__PURE__*/
                  _jsx(IconComponent, { size: 18, color: item.color }) }
                ), /*#__PURE__*/
                _jsx(Text, { style: styles.statValue, children: item.value }), /*#__PURE__*/
                _jsx(Text, { style: styles.statLabel, children: item.label })] }, idx
              ));

          }) }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.sectionHeader, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.sectionTitle, children: "My Products" }), /*#__PURE__*/
          _jsx(TouchableOpacity, { children: /*#__PURE__*/
            _jsx(Text, { style: styles.seeAllLink, children: "See All \u2192" }) }
          )] }
        ), /*#__PURE__*/

        _jsx(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: styles.horizontalScroll, children:
          products.map((item) => /*#__PURE__*/
          _jsxs(View, { style: styles.productCard, children: [/*#__PURE__*/
            _jsx(Image, { source: { uri: item.images[0] }, style: styles.prodImage }), /*#__PURE__*/
            _jsx(TouchableOpacity, { style: styles.menuIconBtn, children: /*#__PURE__*/
              _jsx(MoreVertical, { size: 16, color: colors.textDark }) }
            ), /*#__PURE__*/
            _jsxs(View, { style: styles.prodDetails, children: [/*#__PURE__*/
              _jsx(Text, { style: styles.prodTitle, numberOfLines: 1, children: item.name }), /*#__PURE__*/
              _jsxs(Text, { style: styles.prodPrice, children: ["\u20B9", item.price] }), /*#__PURE__*/
              _jsx(StatusBadge, { status: item.status, style: { marginTop: 4 } })] }
            )] }, item.id
          )
          ) }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.sectionHeader, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.sectionTitle, children: "Recent Orders" }), /*#__PURE__*/
          _jsx(TouchableOpacity, { children: /*#__PURE__*/
            _jsx(Text, { style: styles.seeAllLink, children: "See All \u2192" }) }
          )] }
        ), /*#__PURE__*/

        _jsx(View, { style: styles.ordersList, children:
          recentOrders.map((ord) => /*#__PURE__*/
          _jsxs(TouchableOpacity, { activeOpacity: 0.8, style: styles.orderRow, children: [/*#__PURE__*/
            _jsx(Image, { source: { uri: ord.image }, style: styles.orderThumb }), /*#__PURE__*/
            _jsxs(View, { style: styles.orderInfo, children: [/*#__PURE__*/
              _jsxs(Text, { style: styles.orderId, children: ["#", ord.id] }), /*#__PURE__*/
              _jsx(Text, { style: styles.orderProduct, numberOfLines: 1, children: ord.product }), /*#__PURE__*/
              _jsx(Text, { style: styles.orderDate, children: ord.date })] }
            ), /*#__PURE__*/
            _jsxs(View, { style: styles.orderRight, children: [/*#__PURE__*/
              _jsx(StatusBadge, { status: ord.status }), /*#__PURE__*/
              _jsx(ChevronRight, { size: 18, color: colors.textMuted, style: { marginTop: 4 } })] }
            )] }, ord.id
          )
          ) }
        )] }
      )] }
    ));

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: 44
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  greetingBox: {
    flex: 1,
    marginLeft: 10
  },
  greetingSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted
  },
  greetingName: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 15,
    color: colors.textDark
  },
  greetingTagline: {
    fontFamily: typography.fonts.script,
    fontSize: 12,
    color: colors.primary
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  notifDot: {
    position: 'absolute',
    top: 6,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary
  },
  avatarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.primary
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24
  },
  heroCard: {
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 16
  },
  heroImage: {
    width: '100%',
    height: '100%'
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(30, 18, 10, 0.55)'
  },
  heroContent: {
    padding: 16,
    justifyContent: 'space-between',
    height: '100%'
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  heroTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 20,
    color: colors.white,
    lineHeight: 24
  },
  heroSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.white,
    opacity: 0.9
  },
  heroBtn: {
    backgroundColor: colors.primaryTint10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    alignSelf: 'flex-start'
  },
  heroBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.primaryDark
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },
  dotActive: {
    width: 16,
    backgroundColor: colors.white
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  quickCard: {
    width: '23%',
    backgroundColor: colors.surface,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center'
  },
  quickCardActive: {
    backgroundColor: colors.primaryTint10,
    borderColor: colors.primary
  },
  quickIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryTint10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6
  },
  quickIconBgActive: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6
  },
  quickLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 10,
    color: colors.textDark,
    textAlign: 'center'
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border
  },
  statIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
  },
  statValue: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 20,
    color: colors.textDark
  },
  statLabel: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12
  },
  sectionTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 18,
    color: colors.textDark
  },
  seeAllLink: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
    color: colors.primary
  },
  horizontalScroll: {
    marginBottom: 16
  },
  productCard: {
    width: 140,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginRight: 12,
    position: 'relative'
  },
  prodImage: {
    width: '100%',
    height: 100
  },
  menuIconBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 2
  },
  prodDetails: {
    padding: 8
  },
  prodTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.textDark
  },
  prodPrice: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 13,
    color: colors.primary,
    marginTop: 2
  },
  ordersList: {
    gap: 10
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border
  },
  orderThumb: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: 12
  },
  orderInfo: {
    flex: 1
  },
  orderId: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
    color: colors.textDark
  },
  orderProduct: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody
  },
  orderDate: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2
  },
  orderRight: {
    alignItems: 'flex-end'
  }
});