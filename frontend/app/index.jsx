import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Logo from '../components/Logo';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Logo size="lg" showSubtitle={true} />
        <Text style={styles.badge}>SDK 57 LIVE</Text>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.push('/(tabs)')}>
          <Text style={styles.primaryBtnText}>Open Buyer Marketplace →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => router.push('/(artisan-tabs)/home')}>
          <Text style={styles.secondaryBtnText}>Open Artisan Dashboard →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tertiaryBtn}
          onPress={() => router.push('/auth/splash')}>
          <Text style={styles.tertiaryBtnText}>Test Full Animated Splash →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7EBDD',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFDF9',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  badge: {
    backgroundColor: '#E8F5E9',
    color: '#2F8F4E',
    fontWeight: '700',
    fontSize: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#B84F2A',
    letterSpacing: 1,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#6E5B4E',
    fontStyle: 'italic',
    marginBottom: 32,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#B84F2A',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryBtn: {
    width: '100%',
    backgroundColor: '#3F5665',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  tertiaryBtn: {
    width: '100%',
    backgroundColor: '#F3DED0',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  tertiaryBtnText: {
    color: '#B84F2A',
    fontSize: 14,
    fontWeight: '700',
  },
});