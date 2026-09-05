import React, { createContext, useContext, useState } from 'react';
import {
  Artisan,
  BuyerRequest,
  Conversation,
  Message,
  NotificationItem,
  Product,
  Quote,
  MOCK_ARTISANS,
  MOCK_CONVERSATIONS,
  MOCK_MESSAGES,
  MOCK_NOTIFICATIONS,
  MOCK_PRODUCTS,
  MOCK_QUOTES,
  MOCK_REQUESTS,
} from '../constants/mockData';

export interface FilterState {
  category: string;
  maxPrice: number;
  minRating: number;
  location: string;
}

interface AppContextType {
  artisans: Artisan[];
  products: Product[];
  requests: BuyerRequest[];
  quotes: Quote[];
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  notifications: NotificationItem[];
  filters: FilterState;
  
  toggleSaveArtisan: (id: string) => void;
  toggleSaveProduct: (id: string) => void;
  createRequest: (newReq: Omit<BuyerRequest, 'id' | 'createdAt' | 'quotesCount' | 'status'>) => void;
  acceptQuote: (quoteId: string, requestId: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  markNotificationAsRead: (id: string) => void;
  updateFilters: (newFilters: Partial<FilterState>) => void;
  resetFilters: () => void;
  getOrCreateConversation: (artisanId: string, artisanName: string, artisanAvatar: string, artisanCraft: string) => string;
}

const defaultFilters: FilterState = {
  category: 'All',
  maxPrice: 50000,
  minRating: 0,
  location: 'All India',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [artisans, setArtisans] = useState<Artisan[]>(MOCK_ARTISANS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [requests, setRequests] = useState<BuyerRequest[]>(MOCK_REQUESTS);
  const [quotes, setQuotes] = useState<Quote[]>(MOCK_QUOTES);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const toggleSaveArtisan = (id: string) => {
    setArtisans((prev) =>
      prev.map((art) => (art.id === id ? { ...art, saved: !art.saved } : art))
    );
  };

  const toggleSaveProduct = (id: string) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, saved: !prod.saved } : prod))
    );
  };

  const createRequest = (newReq: Omit<BuyerRequest, 'id' | 'createdAt' | 'quotesCount' | 'status'>) => {
    const created: BuyerRequest = {
      ...newReq,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      quotesCount: 0,
      status: 'Active',
    };
    setRequests((prev) => [created, ...prev]);

    // Push system notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'request',
      title: 'Requirement Published! ✨',
      message: `Your requirement "${created.title}" is live for artisans to respond.`,
      timestamp: 'Just now',
      read: false,
      targetScreen: 'request-detail',
      targetId: created.id,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const acceptQuote = (quoteId: string, requestId: string) => {
    setQuotes((prev) =>
      prev.map((q) => {
        if (q.id === quoteId) return { ...q, status: 'accepted' };
        if (q.requestId === requestId) return { ...q, status: 'rejected' };
        return q;
      })
    );
    setRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: 'Accepted' } : req))
    );
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: 'user-1',
      senderName: 'You',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      read: true,
    };

    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg],
    }));

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? { ...conv, lastMessage: text.trim(), lastTimestamp: 'Just now' }
          : conv
      )
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const getOrCreateConversation = (
    artisanId: string,
    artisanName: string,
    artisanAvatar: string,
    artisanCraft: string
  ) => {
    const existing = conversations.find((c) => c.artisanId === artisanId);
    if (existing) return existing.id;

    const newConvId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newConvId,
      artisanId,
      artisanName,
      artisanAvatar,
      artisanCraft,
      lastMessage: 'Conversation started',
      lastTimestamp: 'Just now',
      unreadCount: 0,
    };

    setConversations((prev) => [newConv, ...prev]);
    setMessages((prev) => ({ ...prev, [newConvId]: [] }));
    return newConvId;
  };

  return (
    <AppContext.Provider
      value={{
        artisans,
        products,
        requests,
        quotes,
        conversations,
        messages,
        notifications,
        filters,
        toggleSaveArtisan,
        toggleSaveProduct,
        createRequest,
        acceptQuote,
        sendMessage,
        markNotificationAsRead,
        updateFilters,
        resetFilters,
        getOrCreateConversation,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
