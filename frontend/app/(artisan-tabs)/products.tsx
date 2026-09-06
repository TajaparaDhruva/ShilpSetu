import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import StatusBadge from '../../components/StatusBadge';
import PrimaryButton from '../../components/PrimaryButton';
import { useApp } from '../../context/AppContext';

export default function ProductsScreen() {
  const router = useRouter();
  const { products } = useApp();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo size="sm" showSubtitle={false} />
        <Text style={styles.title}>My Catalog</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push('/(artisan-tabs)/add-product' as any)}
        >
          <Plus size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {products.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.images[0] }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.price}>₹{item.price}</Text>
            </View>
            <StatusBadge status={item.status} />
          </View>
        ))}

        <PrimaryButton
          label="Add New Product"
          onPress={() => router.push('/(artisan-tabs)/add-product' as any)}
          style={{ marginTop: 16 }}
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
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 12,
  },
  image: { width: 60, height: 60, borderRadius: 12, marginRight: 12 },
  info: { flex: 1 },
  name: { fontFamily: typography.fonts.bodySemiBold, fontSize: 14, color: colors.textDark },
  category: { fontFamily: typography.fonts.bodyRegular, fontSize: 12, color: colors.textMuted },
  price: { fontFamily: typography.fonts.serifBold, fontSize: 14, color: colors.primary, marginTop: 2 },
});
