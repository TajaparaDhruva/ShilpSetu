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
import { useApp, UserRole } from '../../context/AppContext';

export default function RoleSelectScreen() {
  const router = useRouter();
  const { role, setRole } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>(role || 'artisan');

  const handleContinue = () => {
    if (!selectedRole) return;
    setRole(selectedRole);
    if (selectedRole === 'artisan') {
      router.push('/setup/artisan-step-1' as any);
    } else {
      router.push('/setup/buyer-step-1' as any);
    }
  };

  return (
    <View style={styles.container}>
      <MandalaBackground position="top-left" size={180} opacity={0.1} />
      <MandalaBackground position="top-right" size={180} opacity={0.1} />

      {/* Header Accent Row */}
      <View style={styles.topBar}>
        <ScriptCaption lines={['Same', 'Tradition', 'New', 'Opportunities']} />
        <ScriptCaption lines={['Local Crafts', 'Global Opportunities']} align="right" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Logo */}
        <View style={styles.logoWrapper}>
          <Logo size="lg" />
        </View>

        {/* Heading */}
        <View style={styles.headingBox}>
          <Text style={styles.headingDark}>
            Choose Your <Text style={{ color: colors.primary }}>Role</Text>
          </Text>
          <View style={styles.underline} />

          <Text style={styles.subtext}>
            Join as a buyer to discover unique handmade products or as an artisan to showcase your craft to the world.
          </Text>
        </View>

        {/* Role Cards Grid */}
        <View style={styles.cardsRow}>
          {/* Buyer Card */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.roleCard,
              selectedRole === 'buyer' && styles.selectedCard,
            ]}
            onPress={() => setSelectedRole('buyer')}
          >
            <View style={styles.photoBox}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300' }}
                style={styles.cardPhoto}
              />
              <View style={styles.badgeCircle}>
                <ShoppingCart size={18} color={colors.white} />
              </View>
            </View>

            <Text style={styles.cardTitle}>Buyer</Text>
            <Text style={styles.cardDesc}>
              Explore and buy authentic handmade products from talented artisans.
            </Text>

            <View style={styles.checklist}>
              <View style={styles.checkItem}>
                <View style={styles.checkIcon}><Check size={10} color={colors.white} /></View>
                <Text style={styles.checkText}>Discover unique crafts</Text>
              </View>
              <View style={styles.checkItem}>
                <View style={styles.checkIcon}><Check size={10} color={colors.white} /></View>
                <Text style={styles.checkText}>Support local artisans</Text>
              </View>
              <View style={styles.checkItem}>
                <View style={styles.checkIcon}><Check size={10} color={colors.white} /></View>
                <Text style={styles.checkText}>Get quality handmade</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Artisan Card */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.roleCard,
              selectedRole === 'artisan' && styles.selectedCard,
            ]}
            onPress={() => setSelectedRole('artisan')}
          >
            <View style={styles.photoBox}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300' }}
                style={styles.cardPhoto}
              />
              <View style={styles.badgeCircle}>
                <Hammer size={18} color={colors.white} />
              </View>
            </View>

            <Text style={styles.cardTitle}>Artisan</Text>
            <Text style={styles.cardDesc}>
              Showcase your skills, reach more customers and grow your business.
            </Text>

            <View style={styles.checklist}>
              <View style={styles.checkItem}>
                <View style={styles.checkIcon}><Check size={10} color={colors.white} /></View>
                <Text style={styles.checkText}>Create your artisan profile</Text>
              </View>
              <View style={styles.checkItem}>
                <View style={styles.checkIcon}><Check size={10} color={colors.white} /></View>
                <Text style={styles.checkText}>List handmade products</Text>
              </View>
              <View style={styles.checkItem}>
                <View style={styles.checkIcon}><Check size={10} color={colors.white} /></View>
                <Text style={styles.checkText}>Get orders & grow</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <PrimaryButton
          label="Continue"
          onPress={handleContinue}
          disabled={!selectedRole}
          style={styles.continueBtn}
        />

        <Text style={styles.hintText}>
          You can always change this later in settings.
        </Text>

        {/* Footer */}
        <View style={styles.footerRow}>
          <ScriptCaption lines={['Traditional', 'Hands', 'Global', 'Dreams']} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  logoWrapper: {
    alignItems: 'center',
    marginVertical: 8,
  },
  headingBox: {
    alignItems: 'center',
    marginVertical: 12,
  },
  headingDark: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 28,
    color: colors.textDark,
  },
  underline: {
    height: 2,
    width: 40,
    backgroundColor: colors.primary,
    marginVertical: 6,
    borderRadius: 1,
  },
  subtext: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    textAlign: 'center',
    lineHeight: 18,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 20,
  },
  roleCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 12,
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: colors.bgAlt,
  },
  photoBox: {
    position: 'relative',
    marginBottom: 12,
  },
  cardPhoto: {
    width: 72,
    height: 72,
    borderRadius: 36,
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
    borderColor: colors.surface,
  },
  cardTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 18,
    color: colors.textDark,
    marginBottom: 4,
  },
  cardDesc: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    textAlign: 'center',
    lineHeight: 15,
    marginBottom: 12,
  },
  checklist: {
    width: '100%',
    gap: 6,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  checkIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 10,
    color: colors.textDark,
    flex: 1,
  },
  continueBtn: {
    marginTop: 8,
  },
  hintText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
  footerRow: {
    marginTop: 20,
    alignItems: 'flex-start',
  },
});
