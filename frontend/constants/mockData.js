export const CATEGORIES = [
  { id: '1', name: 'Pottery', label: 'Pottery', icon: 'cube.box.fill' },
  { id: '2', name: 'Wood Craft', label: 'Wood Craft', icon: 'hammer.fill' },
  { id: '3', name: 'Textiles', label: 'Textiles', icon: 'sparkles' },
  { id: '4', name: 'Metal Craft', label: 'Metal Craft', icon: 'flame.fill' },
  { id: '5', name: 'Paintings', label: 'Paintings', icon: 'sparkles' },
  { id: '6', name: 'Jewelry', label: 'Jewelry', icon: 'sparkles' },
  { id: '7', name: 'Leather', label: 'Leather', icon: 'cube.box.fill' },
  { id: '8', name: 'Home Decor', label: 'Home Decor', icon: 'flame.fill' },
];

export const MOCK_USER = {
  id: 'artisan_101',
  name: 'Ramprasad Sharma',
  mobile: '+91 98765 43210',
  craftCategory: 'Woodwork & Carving',
  location: 'Jaipur, Rajasthan',
  preferredLanguage: 'hi',
  profilePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
  bio: 'Master wood artisan with 20+ years of expertise in Rajasthani Sheesham wood carving.',
  experienceYears: 22,
  completionPercentage: 85
};

export const INITIAL_MOCK_PRODUCTS = [
{
  id: 'prod_1',
  title: 'Hand-Carved Sheesham Wood Elephant Jali Statue',
  description: 'Intricately carved elephant figurine featuring traditional inner jali carving, handcrafted from single block seasoned Sheesham wood.',
  category: 'Woodwork & Carving',
  subcategory: 'Figurines',
  materials: ['Sheesham Wood', 'Natural Honey Polish'],
  technique: 'Traditional Hand Jali Carving',
  dimensions: '8 x 4 x 6 inches',
  weight: '650 grams',
  location: 'Jaipur, Rajasthan',
  tags: ['handcrafted', 'woodcarving', 'rajasthan', 'sheesham', 'jali'],
  language: 'hi',
  images: [
  'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=80'],

  rawMaterialCost: 450,
  laborCost: 1200,
  packagingCost: 150,
  suggestedPrice: 2499,
  sellingPrice: 2200,
  inventory: 12,
  status: 'Published',
  views: 342,
  inquiries: 18,
  createdAt: '2026-08-20T10:00:00Z',
  updatedAt: '2026-09-01T14:30:00Z'
},
{
  id: 'prod_2',
  title: 'Terracotta Handpainted Matka Pot with Ethnic Motif',
  description: 'Eco-friendly natural clay terracotta pitcher hand-painted with eco-pigments in Warli folk art style.',
  category: 'Pottery & Terracotta',
  subcategory: 'Home Decor',
  materials: ['Natural Clay', 'Organic Water Pigments'],
  technique: 'Wheel Thrown & Hand Painted',
  dimensions: '12 x 10 x 10 inches',
  weight: '1.4 kg',
  location: 'Jaipur, Rajasthan',
  tags: ['terracotta', 'pottery', 'warli', 'clay', 'decor'],
  language: 'hi',
  images: [
  'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=80'],

  rawMaterialCost: 200,
  laborCost: 600,
  packagingCost: 100,
  suggestedPrice: 1299,
  sellingPrice: 1150,
  inventory: 8,
  status: 'Published',
  views: 189,
  inquiries: 9,
  createdAt: '2026-08-25T11:20:00Z',
  updatedAt: '2026-09-02T09:15:00Z'
},
{
  id: 'prod_3',
  title: 'Pure Block Printed Chanderi Cotton Dupatta',
  description: 'Soft breathable Chanderi cotton Dupatta crafted with natural vegetable dyes using traditional wooden block printing technique.',
  category: 'Handloom & Textiles',
  subcategory: 'Apparel',
  materials: ['Chanderi Cotton', 'Natural Indigo Dye'],
  technique: 'Wooden Block Printing',
  dimensions: '2.5 meters length',
  weight: '210 grams',
  location: 'Sanganer, Rajasthan',
  tags: ['handloom', 'chanderi', 'blockprint', 'indigo', 'dupatta'],
  language: 'hi',
  images: [
  'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&auto=format&fit=crop&q=80'],

  rawMaterialCost: 350,
  laborCost: 800,
  packagingCost: 80,
  suggestedPrice: 1799,
  sellingPrice: 1650,
  inventory: 20,
  status: 'Draft',
  views: 45,
  inquiries: 2,
  createdAt: '2026-09-03T16:00:00Z',
  updatedAt: '2026-09-04T12:00:00Z'
},
{
  id: 'prod_4',
  title: 'Antique Brass Dhokra Tribal Dancing Figurine',
  description: 'Lost-wax cast Dhokra metal craft statue capturing traditional tribal dance form, made by master metal smiths.',
  category: 'Brass & Metal Craft',
  subcategory: 'Metal Statues',
  materials: ['Brass Alloy', 'Wax Mold'],
  technique: 'Lost-Wax Casting (Dhokra)',
  dimensions: '10 x 3 x 4 inches',
  weight: '850 grams',
  location: 'Bastar, Chattisgarh',
  tags: ['dhokra', 'brass', 'tribal', 'metalcraft', 'handcrafted'],
  language: 'hi',
  images: [
  'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'],

  rawMaterialCost: 700,
  laborCost: 1500,
  packagingCost: 150,
  suggestedPrice: 3200,
  sellingPrice: 2950,
  inventory: 5,
  status: 'Pending',
  views: 78,
  inquiries: 4,
  createdAt: '2026-09-04T08:30:00Z',
  updatedAt: '2026-09-04T08:30:00Z'
}];


export const INITIAL_MOCK_NOTIFICATIONS = [
{
  id: 'notif_1',
  type: 'product_published',
  title: 'Product Published Successfully 🎉',
  description: 'Your craft "Hand-Carved Sheesham Wood Elephant" is now live on the ShilpSetu Marketplace.',
  timestamp: '2 hours ago',
  isRead: false,
  relatedEntityId: 'prod_1'
},
{
  id: 'notif_2',
  type: 'new_inquiry',
  title: 'New Buyer Inquiry Received 💬',
  description: 'A buyer from Mumbai sent an inquiry for bulk order of 10 Terracotta Pots.',
  timestamp: '5 hours ago',
  isRead: false,
  relatedEntityId: 'prod_2'
},
{
  id: 'notif_3',
  type: 'ai_completed',
  title: 'AI Catalog Description Generated ✨',
  description: 'Your voice recording was successfully converted into an optimized product catalog listing.',
  timestamp: '1 day ago',
  isRead: true,
  relatedEntityId: 'prod_3'
},
{
  id: 'notif_4',
  type: 'account',
  title: 'Profile 85% Complete',
  description: 'Add your craft workshop location details to achieve 100% verified artisan badge.',
  timestamp: '3 days ago',
  isRead: true
}];