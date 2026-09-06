import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import StatusBadge from '../../components/StatusBadge';

export default function OrdersScreen() {
  const orders = [
    {
      id: 'ORD1234',
      product: 'Handcrafted Terracotta Vase',
      customer: 'Ananya Sharma',
      date: 'Today, 2:30 PM',
      amount: '₹499',
      status: 'Processing' as const,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=200',
    },
    {
      id: 'ORD1233',
      product: 'Embroidered Potli Bag',
      customer: 'Rohan Mehta',
      date: 'Yesterday',
      amount: '₹699',
      status: 'Delivered' as const,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=200',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo size="sm" showSubtitle={false} />
        <Text style={styles.title}>Orders</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {orders.map((ord) => (
          <View key={ord.id} style={styles.card}>
            <Image source={{ uri: ord.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.id}>#{ord.id}</Text>
              <Text style={styles.product}>{ord.product}</Text>
              <Text style={styles.customer}>Buyer: {ord.customer}</Text>
              <Text style={styles.date}>{ord.date}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.amount}>{ord.amount}</Text>
              <StatusBadge status={ord.status} style={{ marginTop: 6 }} />
            </View>
          </View>
        ))}
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  image: { width: 54, height: 54, borderRadius: 12, marginRight: 12 },
  info: { flex: 1 },
  id: { fontFamily: typography.fonts.bodySemiBold, fontSize: 13, color: colors.textDark },
  product: { fontFamily: typography.fonts.bodyRegular, fontSize: 12, color: colors.textBody },
  customer: { fontFamily: typography.fonts.bodyRegular, fontSize: 11, color: colors.textMuted },
  date: { fontFamily: typography.fonts.bodyRegular, fontSize: 10, color: colors.textMuted, marginTop: 2 },
  amount: { fontFamily: typography.fonts.serifBold, fontSize: 14, color: colors.primary },
});
