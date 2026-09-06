import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Camera,
  Tag,
  Grid,
  IndianRupee,
  Package,
  FileText,
  Truck,
  Plus,
  X,
  ChevronDown,
} from 'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import TextInputField from '../../components/TextInputField';
import PrimaryButton from '../../components/PrimaryButton';
import ScriptCaption from '../../components/ScriptCaption';
import MandalaBackground from '../../components/MandalaBackground';
import { useApp } from '../../context/AppContext';

const CATEGORIES = [
  'Pottery',
  'Textiles',
  'Jewelry',
  'Wood Craft',
  'Metal Craft',
  'Paintings',
  'Home Decor',
  'Other',
];

const SHIPPING_TIMES = ['1-3 days', '3-5 days', '1 week', '2 weeks'];

export default function AddProductScreen() {
  const router = useRouter();
  const { addProduct } = useApp();

  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400',
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400',
  ]);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Pottery');
  const [showCatPicker, setShowCatPicker] = useState(false);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [shippingTime, setShippingTime] = useState('3-5 days');
  const [showShipPicker, setShowShipPicker] = useState(false);
  const [isLive, setIsLive] = useState(true);

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    if (!name || !price || !stock || !description) {
      Alert.alert('Required Fields', 'Please fill in all mandatory fields marked with *');
      return;
    }

    addProduct({
      name,
      category,
      price: parseFloat(price) || 0,
      stock: parseInt(stock, 10) || 1,
      description,
      material,
      size,
      weight,
      shippingTime,
      isLive,
      images: images.length ? images : ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400'],
      status: parseInt(stock, 10) < 5 ? 'Low Stock' : 'In Stock',
    });

    Alert.alert('Success!', 'Your product has been published successfully.', [
      { text: 'OK', onPress: () => router.replace('/(artisan-tabs)/home' as any) },
    ]);
  };

  return (
    <View style={styles.container}>
      <MandalaBackground position="top-right" size={200} opacity={0.12} />

      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft size={22} color={colors.textDark} />
        </TouchableOpacity>

        <View style={styles.headerTitleBox}>
          <Text style={styles.headerTitle}>Add New Product</Text>
          <Text style={styles.headerSub}>Showcase your craft to the world</Text>
        </View>

        <Logo size="sm" showSubtitle={false} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Product Images Section */}
        <View style={styles.imageSection}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Product Images *</Text>
            <Text style={styles.imageCounter}>{images.length}/5</Text>
          </View>
          <Text style={styles.sectionSub}>Add clear photos of your product (up to 5 images)</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesRow}>
            {/* Add Photo Slot */}
            <TouchableOpacity style={styles.addPhotoSlot}>
              <Camera size={24} color={colors.primary} />
              <Text style={styles.addPhotoLabel}>Add Photo</Text>
            </TouchableOpacity>

            {/* Uploaded Photos */}
            {images.map((imgUri, idx) => (
              <View key={idx} style={styles.photoSlot}>
                <Image source={{ uri: imgUri }} style={styles.uploadedImg} />
                <TouchableOpacity style={styles.removeBtn} onPress={() => removeImage(idx)}>
                  <X size={12} color={colors.white} />
                </TouchableOpacity>
              </View>
            ))}

            {images.length < 5 && (
              <TouchableOpacity style={styles.plusSlot}>
                <Plus size={24} color={colors.textMuted} />
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        {/* Product Name Input */}
        <TextInputField
          label="Product Name"
          required
          placeholder="Enter product name (e.g., Terracotta Vase)"
          value={name}
          onChangeText={setName}
          maxLength={100}
          icon={<Tag size={18} color={colors.primary} />}
          rightElement={<Text style={styles.charCounter}>{name.length}/100</Text>}
        />

        {/* Category Picker */}
        <View style={styles.pickerWrapper}>
          <Text style={styles.fieldLabel}>Category *</Text>
          <TouchableOpacity
            style={styles.pickerField}
            onPress={() => setShowCatPicker(!showCatPicker)}
          >
            <View style={styles.iconBadge}>
              <Grid size={18} color={colors.primary} />
            </View>
            <Text style={styles.pickerText}>{category}</Text>
            <ChevronDown size={18} color={colors.textMuted} />
          </TouchableOpacity>

          {showCatPicker && (
            <View style={styles.dropdownMenu}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setCategory(cat);
                    setShowCatPicker(false);
                  }}
                >
                  <Text style={[styles.dropdownItemText, category === cat && { color: colors.primary }]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Price & Stock Row */}
        <View style={styles.twoColumnRow}>
          <View style={{ flex: 1 }}>
            <TextInputField
              label="Price (₹)"
              required
              placeholder="Enter price"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
              icon={<IndianRupee size={18} color={colors.primary} />}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TextInputField
              label="Stock Quantity"
              required
              placeholder="Enter stock"
              keyboardType="numeric"
              value={stock}
              onChangeText={setStock}
              icon={<Package size={18} color={colors.primary} />}
            />
          </View>
        </View>

        {/* Multiline Description */}
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.fieldLabel}>Product Description *</Text>
          <View style={styles.multilineContainer}>
            <View style={styles.multilineHeader}>
              <View style={styles.iconBadge}>
                <FileText size={18} color={colors.primary} />
              </View>
              <Text style={styles.multilinePlaceholderHint}>Story, materials, size, unique features</Text>
            </View>
            <TextInputField
              placeholder="Tell your product's story, materials used, size, unique features..."
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
              maxLength={500}
              containerStyle={{ marginBottom: 0 }}
            />
            <Text style={styles.multilineCounter}>{description.length}/500</Text>
          </View>
        </View>

        {/* Product Details Row */}
        <View style={styles.detailsSection}>
          <Text style={styles.fieldLabel}>Product Details</Text>
          <Text style={styles.sectionSub}>Add key details to help buyers know more</Text>

          <View style={styles.threeColumnRow}>
            <TextInputField
              placeholder="Material (e.g. Clay)"
              value={material}
              onChangeText={setMaterial}
              containerStyle={{ flex: 1 }}
            />
            <TextInputField
              placeholder="Size (e.g. 10 cm)"
              value={size}
              onChangeText={setSize}
              containerStyle={{ flex: 1 }}
            />
            <TextInputField
              placeholder="Weight (e.g. 250 g)"
              value={weight}
              onChangeText={setWeight}
              containerStyle={{ flex: 1 }}
            />
          </View>
        </View>

        {/* Shipping Information Dropdown */}
        <View style={styles.pickerWrapper}>
          <Text style={styles.fieldLabel}>Shipping Information *</Text>
          <TouchableOpacity
            style={styles.pickerField}
            onPress={() => setShowShipPicker(!showShipPicker)}
          >
            <View style={styles.iconBadge}>
              <Truck size={18} color={colors.primary} />
            </View>
            <Text style={styles.pickerText}>{shippingTime}</Text>
            <ChevronDown size={18} color={colors.textMuted} />
          </TouchableOpacity>

          {showShipPicker && (
            <View style={styles.dropdownMenu}>
              {SHIPPING_TIMES.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setShippingTime(time);
                    setShowShipPicker(false);
                  }}
                >
                  <Text style={[styles.dropdownItemText, shippingTime === time && { color: colors.primary }]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Make Product Live Toggle */}
        <View style={styles.toggleRow}>
          <View style={styles.toggleTextGroup}>
            <Text style={styles.toggleTitle}>Make Product Live</Text>
            <Text style={styles.toggleSub}>Your product will be visible to buyers after publishing</Text>
          </View>
          <Switch
            value={isLive}
            onValueChange={setIsLive}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>

        {/* Publish Action Button */}
        <PrimaryButton
          label="Publish Product"
          onPress={handlePublish}
          style={styles.publishBtn}
        />

        {/* Footer Accent */}
        <View style={styles.footerAccent}>
          <ScriptCaption lines={['Craft', 'Create', 'Grow']} />
          <ScriptCaption lines={['Traditional Hands', 'Global Dreams']} align="right" />
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
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleBox: {
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 18,
    color: colors.textDark,
  },
  headerSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  imageSection: {
    marginVertical: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.textDark,
  },
  imageCounter: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.primary,
  },
  sectionSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: 10,
  },
  imagesRow: {
    flexDirection: 'row',
  },
  addPhotoSlot: {
    width: 90,
    height: 90,
    borderRadius: 14,
    backgroundColor: colors.bgAlt,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  addPhotoLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11,
    color: colors.primary,
    marginTop: 4,
  },
  photoSlot: {
    width: 90,
    height: 90,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    marginRight: 10,
  },
  uploadedImg: {
    width: '100%',
    height: '100%',
  },
  removeBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusSlot: {
    width: 90,
    height: 90,
    borderRadius: 14,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  charCounter: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  pickerWrapper: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 6,
  },
  pickerField: {
    height: 52,
    backgroundColor: colors.bgAlt,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryTint10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  pickerText: {
    flex: 1,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 14,
    color: colors.textDark,
  },
  dropdownMenu: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 4,
    paddingVertical: 6,
    elevation: 4,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dropdownItemText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 14,
    color: colors.textDark,
  },
  twoColumnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  multilineContainer: {
    backgroundColor: colors.bgAlt,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 8,
  },
  multilineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  multilinePlaceholderHint: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  multilineCounter: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    alignSelf: 'flex-end',
    marginTop: 4,
    marginRight: 8,
  },
  detailsSection: {
    marginVertical: 12,
  },
  threeColumnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: 16,
  },
  toggleTextGroup: {
    flex: 1,
    marginRight: 12,
  },
  toggleTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.textDark,
  },
  toggleSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  publishBtn: {
    marginVertical: 16,
  },
  footerAccent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});
