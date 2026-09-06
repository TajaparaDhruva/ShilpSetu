import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'artisan' | 'buyer' | null;

export interface ArtisanProfile {
  fullName: string;
  mobile: string;
  location: string;
  languages: string[];
  shopName: string;
  craftCategory: string;
  materials: string[];
  experienceYears: number;
  idDocument: string | null;
  accountHolder: string;
  upiId: string;
}

export interface BuyerProfile {
  fullName: string;
  email: string;
  location: string;
  budgetRange: [number, number];
  preferredCategories: string[];
  language: string;
  interests: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  material?: string;
  size?: string;
  weight?: string;
  shippingTime: string;
  isLive: boolean;
  images: string[];
  status: 'In Stock' | 'Low Stock';
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  mobileNumber: string;
  setMobileNumber: (num: string) => void;
  artisanProfile: ArtisanProfile;
  updateArtisanProfile: (data: Partial<ArtisanProfile>) => void;
  buyerProfile: BuyerProfile;
  updateBuyerProfile: (data: Partial<BuyerProfile>) => void;
  products: ProductItem[];
  addProduct: (product: Omit<ProductItem, 'id'>) => void;
  language: 'hi' | 'en';
  setLanguage: (lang: 'hi' | 'en') => void;
}

const initialArtisanProfile: ArtisanProfile = {
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
  upiId: 'meera@upi',
};

const initialBuyerProfile: BuyerProfile = {
  fullName: '',
  email: '',
  location: '',
  budgetRange: [500, 3000],
  preferredCategories: [],
  language: 'English',
  interests: [],
};

const initialProducts: ProductItem[] = [
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
    status: 'In Stock',
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
    status: 'In Stock',
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
    status: 'Low Stock',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('artisan');
  const [mobileNumber, setMobileNumber] = useState<string>('+91 98765 43210');
  const [artisanProfile, setArtisanProfile] = useState<ArtisanProfile>(initialArtisanProfile);
  const [buyerProfile, setBuyerProfile] = useState<BuyerProfile>(initialBuyerProfile);
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    AsyncStorage.setItem('user_role', newRole || '');
  };

  const updateArtisanProfile = (data: Partial<ArtisanProfile>) => {
    setArtisanProfile(prev => ({ ...prev, ...data }));
  };

  const updateBuyerProfile = (data: Partial<BuyerProfile>) => {
    setBuyerProfile(prev => ({ ...prev, ...data }));
  };

  const addProduct = (newProd: Omit<ProductItem, 'id'>) => {
    const item: ProductItem = {
      ...newProd,
      id: Date.now().toString(),
    };
    setProducts(prev => [item, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
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
        setLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
