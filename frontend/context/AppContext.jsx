import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jsx as _jsx } from "react/jsx-runtime";

// ─── Initial Artisan Profile ──────────────────────────────────────────────────
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

// ─── Initial Buyer Profile ────────────────────────────────────────────────────
const initialBuyerProfile = {
  fullName: '',
  email: '',
  location: '',
  budgetRange: [500, 3000],
  preferredCategories: [],
  language: 'English',
  interests: []
};

// ─── Mock Artisans (for buyer marketplace) ────────────────────────────────────
const initialArtisans = [
  {
    id: 'art_1',
    name: 'Meera Patel',
    craft: 'Pottery & Ceramics',
    category: 'Pottery',
    location: 'Kutch, Gujarat',
    rating: 4.8,
    reviews: 124,
    experience: '8 years',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300',
    isVerified: true,
    isSaved: false,
    bio: 'Master potter creating traditional Kutchi terracotta art',
    products: ['1', '2']
  },
  {
    id: 'art_2',
    name: 'Ramprasad Sharma',
    craft: 'Woodwork & Carving',
    category: 'Wood Craft',
    location: 'Jaipur, Rajasthan',
    rating: 4.9,
    reviews: 89,
    experience: '22 years',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    isVerified: true,
    isSaved: false,
    bio: 'Master wood artisan with expertise in Rajasthani Sheesham wood carving',
    products: ['3']
  },
  {
    id: 'art_3',
    name: 'Lakshmi Devi',
    craft: 'Handloom & Textiles',
    category: 'Textiles',
    location: 'Varanasi, UP',
    rating: 4.7,
    reviews: 56,
    experience: '15 years',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300',
    isVerified: true,
    isSaved: true,
    bio: 'Traditional Banarasi silk weaver preserving ancient patterns',
    products: []
  }
];

// ─── Products (shared for both artisan seller & buyer marketplace) ─────────
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
    status: 'In Stock',
    artisanId: 'art_1',
    artisanName: 'Meera Patel',
    rating: 4.8,
    isSaved: false
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
    artisanId: 'art_1',
    artisanName: 'Meera Patel',
    rating: 4.6,
    isSaved: false
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
    artisanId: 'art_2',
    artisanName: 'Ramprasad Sharma',
    rating: 4.9,
    isSaved: true
  }
];

// ─── Initial Requests (buyer RFQs) ───────────────────────────────────────────
const initialRequests = [
  {
    id: 'rfq_1',
    title: '100 Handwoven Cotton Bags',
    description: 'Need 100 handwoven cotton bags with traditional prints for corporate gifting',
    category: 'Textiles',
    budget: '₹15,000 - ₹25,000',
    quantity: 100,
    status: 'Active',
    quotesCount: 3,
    createdAt: '2 days ago'
  },
  {
    id: 'rfq_2',
    title: 'Custom Terracotta Planters Set',
    description: 'Set of 20 handpainted terracotta planters for restaurant decor',
    category: 'Pottery',
    budget: '₹8,000 - ₹12,000',
    quantity: 20,
    status: 'Quotes Received',
    quotesCount: 5,
    createdAt: '5 days ago'
  }
];

// ─── Initial Quotes ──────────────────────────────────────────────────────────
const initialQuotes = [
  {
    id: 'q_1',
    requestId: 'rfq_2',
    artisanId: 'art_1',
    artisanName: 'Meera Patel',
    artisanAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300',
    price: 9500,
    deliveryTime: '10 days',
    message: 'I can make these with traditional Kutchi patterns.',
    status: 'pending',
    rating: 4.8
  },
  {
    id: 'q_2',
    requestId: 'rfq_2',
    artisanId: 'art_2',
    artisanName: 'Ramprasad Sharma',
    artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    price: 11000,
    deliveryTime: '7 days',
    message: 'Premium quality with Rajasthani motifs.',
    status: 'pending',
    rating: 4.9
  }
];

// ─── Initial Conversations ───────────────────────────────────────────────────
const initialConversations = [
  {
    id: 'conv_1',
    artisanId: 'art_1',
    artisanName: 'Meera Patel',
    artisanAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300',
    lastMessage: 'Yes, I can customize the design for you!',
    timestamp: '2 hours ago',
    unread: 2
  },
  {
    id: 'conv_2',
    artisanId: 'art_2',
    artisanName: 'Ramprasad Sharma',
    artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    lastMessage: 'The order is being prepared.',
    timestamp: '1 day ago',
    unread: 0
  }
];

// ─── Initial Messages ────────────────────────────────────────────────────────
const initialMessages = {
  conv_1: [
    { id: 'm1', text: 'Hi, can you customize the terracotta vase?', sender: 'user', timestamp: '10:00 AM' },
    { id: 'm2', text: 'Yes, I can customize the design for you!', sender: 'artisan', timestamp: '10:15 AM' }
  ],
  conv_2: [
    { id: 'm3', text: 'When will my order ship?', sender: 'user', timestamp: 'Yesterday 3:00 PM' },
    { id: 'm4', text: 'The order is being prepared.', sender: 'artisan', timestamp: 'Yesterday 4:30 PM' }
  ]
};

// ─── Initial Notifications ───────────────────────────────────────────────────
const initialNotifications = [
  { id: 'n1', title: 'New quote received', body: 'Meera Patel sent a quote for your RFQ', read: false, timestamp: '1 hour ago' },
  { id: 'n2', title: 'Order shipped', body: 'Your wooden wall art is on its way!', read: false, timestamp: '3 hours ago' },
  { id: 'n3', title: 'Welcome to ShilpSetu!', body: 'Start exploring authentic Indian artisans.', read: true, timestamp: '2 days ago' }
];

// ─── Initial Filters ─────────────────────────────────────────────────────────
const initialFilters = {
  category: 'All',
  priceRange: [0, 10000],
  rating: 0,
  location: '',
  sortBy: 'relevance'
};

// ─── Context ─────────────────────────────────────────────────────────────────
const AppContext = /*#__PURE__*/createContext(undefined);

export const AppProvider = ({ children }) => {
  const [role, setRoleState] = useState('artisan');
  const [mobileNumber, setMobileNumber] = useState('+91 98765 43210');
  const [artisanProfile, setArtisanProfile] = useState(initialArtisanProfile);
  const [buyerProfile, setBuyerProfile] = useState(initialBuyerProfile);
  const [products, setProducts] = useState(initialProducts);
  const [artisans, setArtisans] = useState(initialArtisans);
  const [requests, setRequests] = useState(initialRequests);
  const [quotes, setQuotes] = useState(initialQuotes);
  const [conversations, setConversations] = useState(initialConversations);
  const [messages, setMessages] = useState(initialMessages);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filters, setFilters] = useState(initialFilters);
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

  // ── Buyer marketplace actions ─────────────────────────────────
  const toggleSaveProduct = (productId) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, isSaved: !p.isSaved } : p))
    );
  };

  const toggleSaveArtisan = (artisanId) => {
    setArtisans((prev) =>
      prev.map((a) => (a.id === artisanId ? { ...a, isSaved: !a.isSaved } : a))
    );
  };

  const getOrCreateConversation = (artisanId) => {
    const existing = conversations.find((c) => c.artisanId === artisanId);
    if (existing) return existing.id;
    const artisan = artisans.find((a) => a.id === artisanId);
    const newConv = {
      id: `conv_${Date.now()}`,
      artisanId,
      artisanName: artisan?.name || 'Artisan',
      artisanAvatar: artisan?.avatar || '',
      lastMessage: '',
      timestamp: 'Just now',
      unread: 0
    };
    setConversations((prev) => [newConv, ...prev]);
    setMessages((prev) => ({ ...prev, [newConv.id]: [] }));
    return newConv.id;
  };

  const sendMessage = (conversationId, text) => {
    const msg = { id: `m_${Date.now()}`, text, sender: 'user', timestamp: 'Just now' };
    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), msg]
    }));
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId ? { ...c, lastMessage: text, timestamp: 'Just now' } : c
      )
    );
  };

  const createRequest = (newReq) => {
    const item = {
      ...newReq,
      id: `rfq_${Date.now()}`,
      status: 'Active',
      quotesCount: 0,
      createdAt: 'Just now'
    };
    setRequests((prev) => [item, ...prev]);
  };

  const acceptQuote = (quoteId) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status: 'accepted' } : q))
    );
  };

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
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
        artisans,
        requests,
        quotes,
        conversations,
        messages,
        notifications,
        filters,
        language,
        setLanguage,
        toggleSaveProduct,
        toggleSaveArtisan,
        getOrCreateConversation,
        sendMessage,
        createRequest,
        acceptQuote,
        updateFilters,
        resetFilters
      }, children:

      children }
    ));

};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};