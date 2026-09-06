import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
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
  ChevronRight,
  ArrowRight,
} from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import StatusBadge from '../../components/StatusBadge';
import ScriptCaption from '../../components/ScriptCaption';
import SideDrawer from '../../components/SideDrawer';
import { useApp } from '../../context/AppContext';

export default function ArtisanHomeScreen() {
  const router = useRouter();
  const { artisanProfile, products } = useApp();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const stats = [
    { label: 'Total Products', value: '12', icon: ShoppingCart, color: colors.primary },
    { label: 'Total Orders', value: '8', icon: ClipboardList, color: colors.warning },
    { label: 'Total Earnings', value: '₹12,450', icon: IndianRupee, color: colors.success },
    { label: 'Store Rating', value: '4.8', icon: Heart, color: '#E25C5C' },
  ];

  const recentOrders = [
    {
      id: 'ORD1234',
      product: 'Handcrafted Terracotta Vase',
      date: 'Today, 2:30 PM',
      status: 'Processing' as const,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=200',
    },
    {
      id: 'ORD1233',
      product: 'Embroidered Potli Bag',
      date: 'Yesterday',
      status: 'Delivered' as const,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=200',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Side Drawer Overlay */}
      <SideDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        activeItem="Home"
      />

      {/* Header Bar */}
      <View style={styles.header}>
        <Logo size="sm" showSubtitle={false} />

        <View style={styles.greetingBox}>
          <Text style={styles.greetingSub}>Hello,</Text>
          <Text style={styles.greetingName}>{artisanProfile.fullName || 'Meera Patel'} 👋</Text>
          <Text style={styles.greetingTagline}>Keep creating, keep inspiring!</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Bell size={20} color={colors.textDark} />
            <View style={styles.notifDot} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.avatarBtn}
            onPress={() => setDrawerVisible(true)}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200' }}
              style={styles.avatar}
            />
            <ChevronDown size={14} color={colors.textDark} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Banner Carousel Card */}
        <View style={styles.heroCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=800' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />

          <View style={styles.heroContent}>
            <View style={styles.heroTopRow}>
              <View>
                <Text style={styles.heroTitle}>Your Craft</Text>
                <Text style={styles.heroTitle}>Has a Bigger Story</Text>
              </View>
              <ScriptCaption lines={['Craft', 'Create', 'Grow']} color={colors.white} align="right" />
            </View>

            <Text style={styles.heroSub}>
              List your products, reach more people and keep traditions alive.
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.heroBtn}
              onPress={() => router.push('/(artisan-tabs)/add-product' as any)}
            >
              <Text style={styles.heroBtnText}>Add New Product →</Text>
            </TouchableOpacity>

            <View style={styles.paginationDots}>
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        </View>

        {/* Quick Actions Row */}
        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={[styles.quickCard, styles.quickCardActive]}
            onPress={() => router.push('/(artisan-tabs)/add-product' as any)}
          >
            <View style={styles.quickIconBgActive}>
              <Package size={20} color={colors.white} />
            </View>
            <Text style={[styles.quickLabel, { color: colors.primary }]}>Add Product</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard}>
            <View style={styles.quickIconBg}>
              <ClipboardList size={20} color={colors.primary} />
            </View>
            <Text style={styles.quickLabel}>View Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard}>
            <View style={styles.quickIconBg}>
              <BarChart3 size={20} color={colors.primary} />
            </View>
            <Text style={styles.quickLabel}>Analytics</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard}>
            <View style={styles.quickIconBg}>
              <Store size={20} color={colors.primary} />
            </View>
            <Text style={styles.quickLabel}>Manage Store</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <View key={idx} style={styles.statCard}>
                <View style={[styles.statIconBadge, { backgroundColor: item.color + '1A' }]}>
                  <IconComponent size={18} color={item.color} />
                </View>
                <Text style={styles.statValue}>{item.value}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>
            );
          })}
        </View>

        {/* My Products Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Products</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllLink}>See All →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {products.map((item) => (
            <View key={item.id} style={styles.productCard}>
              <Image source={{ uri: item.images[0] }} style={styles.prodImage} />
              <TouchableOpacity style={styles.menuIconBtn}>
                <MoreVertical size={16} color={colors.textDark} />
              </TouchableOpacity>
              <View style={styles.prodDetails}>
                <Text style={styles.prodTitle} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.prodPrice}>₹{item.price}</Text>
                <StatusBadge status={item.status} style={{ marginTop: 4 }} />
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Recent Orders Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllLink}>See All →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ordersList}>
          {recentOrders.map((ord) => (
            <TouchableOpacity key={ord.id} activeOpacity={0.8} style={styles.orderRow}>
              <Image source={{ uri: ord.image }} style={styles.orderThumb} />
              <View style={styles.orderInfo}>
                <Text style={styles.orderId}>#{ord.id}</Text>
                <Text style={styles.orderProduct} numberOfLines={1}>{ord.product}</Text>
                <Text style={styles.orderDate}>{ord.date}</Text>
              </View>
              <View style={styles.orderRight}>
                <StatusBadge status={ord.status} />
                <ChevronRight size={18} color={colors.textMuted} style={{ marginTop: 4 }} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: 44,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  greetingBox: {
    flex: 1,
    marginLeft: 10,
  },
  greetingSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  greetingName: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 15,
    color: colors.textDark,
  },
  greetingTagline: {
    fontFamily: typography.fonts.script,
    fontSize: 12,
    color: colors.primary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 6,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  avatarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  heroCard: {
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 16,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(30, 18, 10, 0.55)',
  },
  heroContent: {
    padding: 16,
    justifyContent: 'space-between',
    height: '100%',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 20,
    color: colors.white,
    lineHeight: 24,
  },
  heroSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.white,
    opacity: 0.9,
  },
  heroBtn: {
    backgroundColor: colors.primaryTint10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  heroBtnText: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.primaryDark,
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  dotActive: {
    width: 16,
    backgroundColor: colors.white,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quickCard: {
    width: '23%',
    backgroundColor: colors.surface,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  quickCardActive: {
    backgroundColor: colors.primaryTint10,
    borderColor: colors.primary,
  },
  quickIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryTint10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  quickIconBgActive: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  quickLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 10,
    color: colors.textDark,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 20,
    color: colors.textDark,
  },
  statLabel: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  sectionTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 18,
    color: colors.textDark,
  },
  seeAllLink: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
    color: colors.primary,
  },
  horizontalScroll: {
    marginBottom: 16,
  },
  productCard: {
    width: 140,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginRight: 12,
    position: 'relative',
  },
  prodImage: {
    width: '100%',
    height: 100,
  },
  menuIconBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 2,
  },
  prodDetails: {
    padding: 8,
  },
  prodTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 12,
    color: colors.textDark,
  },
  prodPrice: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 13,
    color: colors.primary,
    marginTop: 2,
  },
  ordersList: {
    gap: 10,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  orderThumb: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
    color: colors.textDark,
  },
  orderProduct: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
  },
  orderDate: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
});
