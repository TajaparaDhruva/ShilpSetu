import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  Alert } from
'react-native';
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
  Mic,
  Sparkles } from
'lucide-react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import Logo from '../../components/Logo';
import TextInputField from '../../components/TextInputField';
import PrimaryButton from '../../components/PrimaryButton';
import ScriptCaption from '../../components/ScriptCaption';
import MandalaBackground from '../../components/MandalaBackground';
import { useApp } from '../../context/AppContext';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const CATEGORIES = [
'Pottery',
'Textiles',
'Jewelry',
'Wood Craft',
'Metal Craft',
'Paintings',
'Home Decor',
'Other'];


const SHIPPING_TIMES = ['1-3 days', '3-5 days', '1 week', '2 weeks'];

export default function AddProductScreen() {
  const router = useRouter();
  const { addProduct } = useApp();

  const [images, setImages] = useState([
  'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400',
  'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400',
  'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400']
  );

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

  const removeImage = (index) => {
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
      status: parseInt(stock, 10) < 5 ? 'Low Stock' : 'In Stock'
    });

    Alert.alert('Success!', 'Your product has been published successfully.', [
    { text: 'OK', onPress: () => router.replace('/(artisan-tabs)/home') }]
    );
  };

  return (/*#__PURE__*/
    _jsxs(View, { style: styles.container, children: [/*#__PURE__*/
      _jsx(MandalaBackground, { position: "top-right", size: 200, opacity: 0.12 }), /*#__PURE__*/


      _jsxs(View, { style: styles.header, children: [/*#__PURE__*/
        _jsx(TouchableOpacity, { style: styles.backBtn, onPress: () => router.back(), children: /*#__PURE__*/
          _jsx(ChevronLeft, { size: 22, color: colors.textDark }) }
        ), /*#__PURE__*/

        _jsxs(View, { style: styles.headerTitleBox, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.headerTitle, children: "Add New Product" }), /*#__PURE__*/
          _jsx(Text, { style: styles.headerSub, children: "Showcase your craft to the world" })] }
        ), /*#__PURE__*/

        _jsx(Logo, { size: "sm", showSubtitle: false })] }
      ), /*#__PURE__*/

      _jsxs(ScrollView, { contentContainerStyle: styles.scrollContent, showsVerticalScrollIndicator: false, children: [/*#__PURE__*/
        _jsxs(TouchableOpacity, {
          style: styles.aiAssistBanner,
          onPress: () => router.push('/artisan/voice-input'),
          activeOpacity: 0.8,
          children: [/*#__PURE__*/
            _jsx(View, { style: styles.aiAssistIconBox, children: /*#__PURE__*/
              _jsx(Mic, { size: 20, color: colors.white })
            }), /*#__PURE__*/
            _jsxs(View, { style: { flex: 1 }, children: [/*#__PURE__*/
              _jsxs(View, { style: { flexDirection: 'row', alignItems: 'center', gap: 4 }, children: [/*#__PURE__*/
                _jsx(Text, { style: styles.aiAssistTitle, children: "AI Smart Voice Cataloging" }), /*#__PURE__*/
                _jsx(Sparkles, { size: 14, color: colors.primary })
              ]}), /*#__PURE__*/
              _jsx(Text, { style: styles.aiAssistSub, children: "Speak in Hindi/English to auto-generate details & enhanced craft photos" })
            ]}), /*#__PURE__*/
            _jsx(Text, { style: styles.aiAssistAction, children: "Try →" })
          ]
        }), /*#__PURE__*/
        _jsxs(View, { style: styles.imageSection, children: [/*#__PURE__*/
          _jsxs(View, { style: styles.sectionTitleRow, children: [/*#__PURE__*/
            _jsx(Text, { style: styles.sectionTitle, children: "Product Images *" }), /*#__PURE__*/
            _jsxs(Text, { style: styles.imageCounter, children: [images.length, "/5"] })] }
          ), /*#__PURE__*/
          _jsx(Text, { style: styles.sectionSub, children: "Add clear photos of your product (up to 5 images)" }), /*#__PURE__*/

          _jsxs(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: styles.imagesRow, children: [/*#__PURE__*/

            _jsxs(TouchableOpacity, { style: styles.addPhotoSlot, children: [/*#__PURE__*/
              _jsx(Camera, { size: 24, color: colors.primary }), /*#__PURE__*/
              _jsx(Text, { style: styles.addPhotoLabel, children: "Add Photo" })] }
            ),


            images.map((imgUri, idx) => /*#__PURE__*/
            _jsxs(View, { style: styles.photoSlot, children: [/*#__PURE__*/
              _jsx(Image, { source: { uri: imgUri }, style: styles.uploadedImg }), /*#__PURE__*/
              _jsx(TouchableOpacity, { style: styles.removeBtn, onPress: () => removeImage(idx), children: /*#__PURE__*/
                _jsx(X, { size: 12, color: colors.white }) }
              )] }, idx
            )
            ),

            images.length < 5 && /*#__PURE__*/
            _jsx(TouchableOpacity, { style: styles.plusSlot, children: /*#__PURE__*/
              _jsx(Plus, { size: 24, color: colors.textMuted }) }
            )] }

          )] }
        ), /*#__PURE__*/


        _jsx(TextInputField, {
          label: "Product Name",
          required: true,
          placeholder: "Enter product name (e.g., Terracotta Vase)",
          value: name,
          onChangeText: setName,
          maxLength: 100,
          icon: /*#__PURE__*/_jsx(Tag, { size: 18, color: colors.primary }),
          rightElement: /*#__PURE__*/_jsxs(Text, { style: styles.charCounter, children: [name.length, "/100"] }) }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.pickerWrapper, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.fieldLabel, children: "Category *" }), /*#__PURE__*/
          _jsxs(TouchableOpacity, {
            style: styles.pickerField,
            onPress: () => setShowCatPicker(!showCatPicker), children: [/*#__PURE__*/

            _jsx(View, { style: styles.iconBadge, children: /*#__PURE__*/
              _jsx(Grid, { size: 18, color: colors.primary }) }
            ), /*#__PURE__*/
            _jsx(Text, { style: styles.pickerText, children: category }), /*#__PURE__*/
            _jsx(ChevronDown, { size: 18, color: colors.textMuted })] }
          ),

          showCatPicker && /*#__PURE__*/
          _jsx(View, { style: styles.dropdownMenu, children:
            CATEGORIES.map((cat) => /*#__PURE__*/
            _jsx(TouchableOpacity, {

              style: styles.dropdownItem,
              onPress: () => {
                setCategory(cat);
                setShowCatPicker(false);
              }, children: /*#__PURE__*/

              _jsx(Text, { style: [styles.dropdownItemText, category === cat && { color: colors.primary }], children:
                cat }
              ) }, cat
            )
            ) }
          )] }

        ), /*#__PURE__*/


        _jsxs(View, { style: styles.twoColumnRow, children: [/*#__PURE__*/
          _jsx(View, { style: { flex: 1 }, children: /*#__PURE__*/
            _jsx(TextInputField, {
              label: "Price (\u20B9)",
              required: true,
              placeholder: "Enter price",
              keyboardType: "numeric",
              value: price,
              onChangeText: setPrice,
              icon: /*#__PURE__*/_jsx(IndianRupee, { size: 18, color: colors.primary }) }
            ) }
          ), /*#__PURE__*/
          _jsx(View, { style: { flex: 1 }, children: /*#__PURE__*/
            _jsx(TextInputField, {
              label: "Stock Quantity",
              required: true,
              placeholder: "Enter stock",
              keyboardType: "numeric",
              value: stock,
              onChangeText: setStock,
              icon: /*#__PURE__*/_jsx(Package, { size: 18, color: colors.primary }) }
            ) }
          )] }
        ), /*#__PURE__*/


        _jsxs(View, { style: { marginBottom: 16 }, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.fieldLabel, children: "Product Description *" }), /*#__PURE__*/
          _jsxs(View, { style: styles.multilineContainer, children: [/*#__PURE__*/
            _jsxs(View, { style: styles.multilineHeader, children: [/*#__PURE__*/
              _jsx(View, { style: styles.iconBadge, children: /*#__PURE__*/
                _jsx(FileText, { size: 18, color: colors.primary }) }
              ), /*#__PURE__*/
              _jsx(Text, { style: styles.multilinePlaceholderHint, children: "Story, materials, size, unique features" })] }
            ), /*#__PURE__*/
            _jsx(TextInputField, {
              placeholder: "Tell your product's story, materials used, size, unique features...",
              multiline: true,
              numberOfLines: 4,
              value: description,
              onChangeText: setDescription,
              maxLength: 500,
              containerStyle: { marginBottom: 0 } }
            ), /*#__PURE__*/
            _jsxs(Text, { style: styles.multilineCounter, children: [description.length, "/500"] })] }
          )] }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.detailsSection, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.fieldLabel, children: "Product Details" }), /*#__PURE__*/
          _jsx(Text, { style: styles.sectionSub, children: "Add key details to help buyers know more" }), /*#__PURE__*/

          _jsxs(View, { style: styles.threeColumnRow, children: [/*#__PURE__*/
            _jsx(TextInputField, {
              placeholder: "Material (e.g. Clay)",
              value: material,
              onChangeText: setMaterial,
              containerStyle: { flex: 1 } }
            ), /*#__PURE__*/
            _jsx(TextInputField, {
              placeholder: "Size (e.g. 10 cm)",
              value: size,
              onChangeText: setSize,
              containerStyle: { flex: 1 } }
            ), /*#__PURE__*/
            _jsx(TextInputField, {
              placeholder: "Weight (e.g. 250 g)",
              value: weight,
              onChangeText: setWeight,
              containerStyle: { flex: 1 } }
            )] }
          )] }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.pickerWrapper, children: [/*#__PURE__*/
          _jsx(Text, { style: styles.fieldLabel, children: "Shipping Information *" }), /*#__PURE__*/
          _jsxs(TouchableOpacity, {
            style: styles.pickerField,
            onPress: () => setShowShipPicker(!showShipPicker), children: [/*#__PURE__*/

            _jsx(View, { style: styles.iconBadge, children: /*#__PURE__*/
              _jsx(Truck, { size: 18, color: colors.primary }) }
            ), /*#__PURE__*/
            _jsx(Text, { style: styles.pickerText, children: shippingTime }), /*#__PURE__*/
            _jsx(ChevronDown, { size: 18, color: colors.textMuted })] }
          ),

          showShipPicker && /*#__PURE__*/
          _jsx(View, { style: styles.dropdownMenu, children:
            SHIPPING_TIMES.map((time) => /*#__PURE__*/
            _jsx(TouchableOpacity, {

              style: styles.dropdownItem,
              onPress: () => {
                setShippingTime(time);
                setShowShipPicker(false);
              }, children: /*#__PURE__*/

              _jsx(Text, { style: [styles.dropdownItemText, shippingTime === time && { color: colors.primary }], children:
                time }
              ) }, time
            )
            ) }
          )] }

        ), /*#__PURE__*/


        _jsxs(View, { style: styles.toggleRow, children: [/*#__PURE__*/
          _jsxs(View, { style: styles.toggleTextGroup, children: [/*#__PURE__*/
            _jsx(Text, { style: styles.toggleTitle, children: "Make Product Live" }), /*#__PURE__*/
            _jsx(Text, { style: styles.toggleSub, children: "Your product will be visible to buyers after publishing" })] }
          ), /*#__PURE__*/
          _jsx(Switch, {
            value: isLive,
            onValueChange: setIsLive,
            trackColor: { false: colors.border, true: colors.primary },
            thumbColor: colors.white }
          )] }
        ), /*#__PURE__*/


        _jsx(PrimaryButton, {
          label: "Publish Product",
          onPress: handlePublish,
          style: styles.publishBtn }
        ), /*#__PURE__*/


        _jsxs(View, { style: styles.footerAccent, children: [/*#__PURE__*/
          _jsx(ScriptCaption, { lines: ['Craft', 'Create', 'Grow'] }), /*#__PURE__*/
          _jsx(ScriptCaption, { lines: ['Traditional Hands', 'Global Dreams'], align: "right" })] }
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
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitleBox: {
    alignItems: 'center'
  },
  headerTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 18,
    color: colors.textDark
  },
  headerSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32
  },
  imageSection: {
    marginVertical: 16
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.textDark
  },
  imageCounter: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 12,
    color: colors.primary
  },
  sectionSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: 10
  },
  imagesRow: {
    flexDirection: 'row'
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
    marginRight: 10
  },
  addPhotoLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 11,
    color: colors.primary,
    marginTop: 4
  },
  photoSlot: {
    width: 90,
    height: 90,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    marginRight: 10
  },
  uploadedImg: {
    width: '100%',
    height: '100%'
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
    justifyContent: 'center'
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
    justifyContent: 'center'
  },
  charCounter: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted
  },
  pickerWrapper: {
    marginBottom: 16
  },
  fieldLabel: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 6
  },
  pickerField: {
    height: 52,
    backgroundColor: colors.bgAlt,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryTint10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  pickerText: {
    flex: 1,
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 14,
    color: colors.textDark
  },
  dropdownMenu: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 4,
    paddingVertical: 6,
    elevation: 4
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  dropdownItemText: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 14,
    color: colors.textDark
  },
  twoColumnRow: {
    flexDirection: 'row',
    gap: 12
  },
  multilineContainer: {
    backgroundColor: colors.bgAlt,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 8
  },
  multilineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  multilinePlaceholderHint: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted
  },
  multilineCounter: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    alignSelf: 'flex-end',
    marginTop: 4,
    marginRight: 8
  },
  detailsSection: {
    marginVertical: 12
  },
  threeColumnRow: {
    flexDirection: 'row',
    gap: 8
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
    marginVertical: 16
  },
  toggleTextGroup: {
    flex: 1,
    marginRight: 12
  },
  toggleTitle: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 14,
    color: colors.textDark
  },
  toggleSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2
  },
  publishBtn: {
    marginVertical: 16
  },
  footerAccent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12
  },
  aiAssistBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBF4EC',
    borderWidth: 1.5,
    borderColor: '#E8D5C4',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    gap: 12,
  },
  aiAssistIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiAssistTitle: {
    fontFamily: typography.fonts.serifBold,
    fontSize: 14,
    color: colors.primary,
  },
  aiAssistSub: {
    fontFamily: typography.fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    marginTop: 2,
    lineHeight: 15,
  },
  aiAssistAction: {
    fontFamily: typography.fonts.bodySemiBold,
    fontSize: 13,
    color: colors.primary,
    paddingHorizontal: 8,
  }
});