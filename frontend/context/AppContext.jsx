import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';import { jsx as _jsx } from "react/jsx-runtime";


























































const initialArtisanProfile = {
  fullName: 'Meera Patel',
  mobile: '+91 98765 43210',
  location: 'Kutch, Gujarat',
  languages: ['Hindi', 'Gujarati'],
  shopName: 'Heritage Clay & Handloom',
  craftCategory: 'Pottery',
  materials: ['Clay', 'Terracotta'],
  experienceYears: 8,
  idDocument: null,
  accountHolder: 'Meera Patel',
  upiId: 'meera@upi'
};

const initialBuyerProfile = {
  fullName: '',
  email: '',
  location: '',
  budgetRange: [500, 3000],
  preferredCategories: [],
  language: 'English',
  interests: []
};

const initialProducts = [
{
  id: '1',
  name: 'Handcrafted Terracotta Vase',
  category: 'Pottery',
  price: 499,
  stock: 15,
  description: 'Traditional painted terracotta vase handcrafted by Gujarat artisans.',
  shippingTime: '3-5 days',
  isLive: true,
  images: ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400'],
  status: 'In Stock'
},
{
  id: '2',
  name: 'Embroidered Potli Bag',
  category: 'Textiles',
  price: 699,
  stock: 8,
  description: 'Silk embroidered potli bag with zardozi work and gold tassels.',
  shippingTime: '1-3 days',
  isLive: true,
  images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400'],
  status: 'In Stock'
},
{
  id: '3',
  name: 'Wooden Wall Art Panel',
  category: 'Wood Craft',
  price: 1299,
  stock: 2,
  description: 'Carved rosewood decorative wall plate featuring royal floral motifs.',
  shippingTime: '3-5 days',
  isLive: true,
  images: ['https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400'],
  status: 'Low Stock'
}];


const AppContext = /*#__PURE__*/createContext(undefined);

export const AppProvider = ({ children }) => {
  const [role, setRoleState] = useState('artisan');
  const [mobileNumber, setMobileNumber] = useState('+91 98765 43210');
  const [artisanProfile, setArtisanProfile] = useState(initialArtisanProfile);
  const [buyerProfile, setBuyerProfile] = useState(initialBuyerProfile);
  const [products, setProducts] = useState(initialProducts);
  const [language, setLanguage] = useState('hi');

  const setRole = (newRole) => {
    setRoleState(newRole);
    AsyncStorage.setItem('user_role', newRole || '');
  };

  const updateArtisanProfile = (data) => {
    setArtisanProfile((prev) => ({ ...prev, ...data }));
  };

  const updateBuyerProfile = (data) => {
    setBuyerProfile((prev) => ({ ...prev, ...data }));
  };

  const addProduct = (newProd) => {
    const item = {
      ...newProd,
      id: Date.now().toString()
    };
    setProducts((prev) => [item, ...prev]);
  };

  return (/*#__PURE__*/
    _jsx(AppContext.Provider, {
      value: {
        role,
        setRole,
        mobileNumber,
        setMobileNumber,
        artisanProfile,
        updateArtisanProfile,
        buyerProfile,
        updateBuyerProfile,
        products,
        addProduct,
        language,
        setLanguage
      }, children:

      children }
    ));

};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};