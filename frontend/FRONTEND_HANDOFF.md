# ShilpSetu Frontend Foundation & Seller Core Handoff Documentation

> **Tagline**: “From Tradition to Market, Powered by AI.”  
> **Problem Statement**: SIH 26090 — AI-Driven Market Linkage and Smart Cataloging Mobile Application for Marginalized Artisans.  
> **Owner**: Vedant (Frontend Foundation + Seller Core)

---

## 1. Architecture Overview & Folder Structure

The frontend is built on **React Native**, **Expo 54**, **Expo Router 6**, and **TypeScript**. It follows a feature-modular structure designed for seamless parallel Git collaboration among Vedant, Ronak, and Kshitij.

```
frontend/
├── app/
│   ├── _layout.tsx                          # Root layout (AuthProvider, LanguageProvider, ThemeProvider, Stack)
│   ├── index.tsx                            # Screen 01: Splash / Brand Intro
│   ├── (auth)/                              # Auth route group
│   │   ├── _layout.tsx
│   │   ├── login.tsx                        # Screen 03: Login Screen
│   │   ├── signup.tsx                       # Screen 04: Sign Up Screen
│   │   ├── otp.tsx                          # Screen 05: OTP Verification
│   │   └── forgot-password.tsx             # Forgot Password Screen
│   ├── (onboarding)/                        # Onboarding route group
│   │   ├── _layout.tsx
│   │   ├── onboarding.tsx                   # Screen 02: 3-step Artisan Onboarding
│   │   └── profile-setup.tsx               # Screen 06: Profile Setup
│   └── (seller)/                            # Seller Core route group
│       ├── _layout.tsx                      # Bottom tab navigation bar
│       ├── home.tsx                         # Screen 07: Artisan Home Dashboard
│       ├── products/
│       │   ├── index.tsx                    # Screen 08: My Products listing & filters
│       │   └── [id].tsx                     # Screen 09: Product Details & Management
│       ├── notifications.tsx                # Screen 10: Notification Center
│       ├── profile.tsx                      # Screen 11: Artisan Profile
│       └── settings.tsx                     # Screen 12: Settings & Preferences
├── constants/
│   ├── theme.ts                             # ShilpSetu Design System Tokens (Palette, Spacing, Typography)
│   └── mockData.ts                          # Initial mock data for seller products, profile & notifications
├── translations/
│   ├── index.ts                             # Translation resolver & language types
│   ├── en.ts                                # English strings
│   └── hi.ts                                # Hindi strings
├── store/
│   ├── AuthContext.tsx                      # Centralized authentication state provider
│   └── LanguageContext.tsx                  # Centralized language context provider (EN / HI)
├── services/
│   ├── api/
│   │   └── apiClient.ts                     # HTTP client abstraction with error normalization
│   ├── auth/
│   │   └── authService.ts                   # Auth service interface & mock implementation
│   ├── products/
│   │   └── productService.ts               # Product CRUD service interface & mock implementation
│   └── notifications/
│       └── notificationService.ts          # Notifications service interface & mock implementation
├── components/
│   ├── ui/
│   │   ├── Button.tsx                       # Reusable Button (primary, secondary, outline, ghost, danger)
│   │   ├── IconButton.tsx                   # Reusable Icon Button
│   │   ├── Input.tsx                        # Styled Form Input with labels & validation
│   │   ├── OTPInput.tsx                     # 6-digit OTP input grid
│   │   ├── Card.tsx                         # Surface container card
│   │   ├── ProductCard.tsx                  # Product card for seller dashboard & listings
│   │   ├── StatCard.tsx                     # Metric card for summary statistics
│   │   ├── Avatar.tsx                       # Artisan avatar with completion progress ring
│   │   ├── Badge.tsx                        # Status badge (Draft, Published, Pending, Rejected)
│   │   ├── Header.tsx                       # Top screen header with navigation
│   │   ├── SectionHeader.tsx                # Section title header
│   │   ├── ConfirmDialog.tsx                # Confirmation modal for destructive actions
│   │   ├── LanguageToggle.tsx               # Reusable EN | HI language toggle chip
│   │   └── States.tsx                       # LoadingState, ErrorState, EmptyState, Skeleton loaders
│   └── layout/
│       └── ScreenWrapper.tsx                # Safe area layout wrapper with background & scrollview
└── FRONTEND_HANDOFF.md                      # This handoff documentation file
```

---

## 2. How to Run the Project

```bash
cd frontend

# Install dependencies (if not already installed)
npm install

# Type-check TypeScript codebase
npx tsc --noEmit

# Start Expo Dev Server
npx expo start
```

---

## 3. Navigation & Screen Flow

```
NEW ARTISAN USER:
Splash (app/index.tsx)
  ↓
Onboarding (app/(onboarding)/onboarding.tsx)
  ↓
Signup / Login (app/(auth)/signup.tsx | login.tsx)
  ↓
OTP Verification (app/(auth)/otp.tsx)
  ↓
Profile Setup (app/(onboarding)/profile-setup.tsx)
  ↓
Seller Home Dashboard (app/(seller)/home.tsx)

RETURNING USER:
Splash
  ↓
Seller Home Dashboard (app/(seller)/home.tsx)
```

---

## 4. Authentication Architecture (`AuthContext.tsx` & `authService.ts`)

Authentication logic is decoupled from UI components:
- UI screens interact exclusively via `useAuth()` hook.
- Functions: `login()`, `signup()`, `verifyOTP()`, `logout()`, `updateProfile()`.
- Supports test mode (OTP `123456` or any 6 digits).

---

## 5. Design System Tokens (`constants/theme.ts`)

Communicates **INDIAN CRAFT + HUMAN + PREMIUM + TRUST + AI MARKETPLACE**:
- **Palette**:
  - `terracotta`: `#994623` (Primary Craft Accent)
  - `creamBackground`: `#FFF8F6` (Warm Cream Surface)
  - `charcoalDark`: `#231916` (Deep Earth Charcoal)
  - `forestGreen`: `#2D3B2D` (Craft Green Accent)
  - `ochreYellow`: `#EEC14B` (Warm Ochre)
- **Typography Scale**: `display`, `h1`, `h2`, `h3`, `body`, `bodySmall`, `caption`, `label`, `button`.
- **Spacing Scale**: `xs: 4`, `sm: 8`, `md: 16`, `lg: 24`, `xl: 32`, `xxl: 48`.

---

## 6. Reusable Component Suite (`components/ui`)

Every component supports light/dark mode, accessibility, and consistent styling:
- **`Button`**: Primary, secondary, outline, ghost, danger variants with loading states.
- **`Input`**: Controlled text inputs with labels, icons, error states, and focus highlighting.
- **`OTPInput`**: Auto-focusing 6-digit box grid with paste handling.
- **`Card`**: Elevated surface card.
- **`ProductCard`**: Product listing card with status badges, price formatting, and view/inquiry counters.
- **`StatCard`**: Dashboard summary metric box.
- **`Avatar`**: Artisan photo placeholder with completion progress ring.
- **`Badge`**: Color-coded status badge (`Draft`, `Published`, `Pending`, `Rejected`).
- **`LanguageToggle`**: Compact `हिंदी | EN` chip component.
- **`ConfirmDialog`**: Accessible modal for confirmation dialogs.
- **`States`**: `LoadingState`, `ErrorState`, `EmptyState`, and `Skeleton` loader.

---

## 7. Product Data Contract (`services/products/productService.ts`)

```typescript
export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  materials: string[];
  technique: string;
  dimensions: string;
  weight: string;
  location: string;
  tags: string[];
  language: string;
  images: string[];
  rawMaterialCost: number;
  laborCost: number;
  packagingCost: number;
  suggestedPrice: number;
  sellingPrice: number;
  inventory: number;
  status: 'Draft' | 'Published' | 'Pending' | 'Rejected';
  views: number;
  inquiries: number;
  createdAt: string;
  updatedAt: string;
}
```

---

## 8. Language Architecture (`store/LanguageContext.tsx` & `translations/`)

- Default language set to **Hindi (`hi`)** for artisan accessibility, toggleable to **English (`en`)**.
- Use the `useLanguage()` hook:
```tsx
const { t, language, setLanguage } = useLanguage();
return <Text>{t('welcome')}</Text>;
```

---

## 9. Integration Instructions for Ronak (AI + Product Creation)

Ronak owns **AI Image Studio, Voice AI, Speech-to-Text, AI Catalog Generation, AI Translation, and AI Pricing Engine**.

### Entry Points Provided in Seller Home & Products:
1. **Manual Product Creation**: Route target `app/(seller)/products/create.tsx` or modal.
2. **Voice Product Creation**: Route target `app/(seller)/ai/voice-create.tsx`.
3. **AI Photo Studio**: Route target `app/(seller)/ai/photo-studio.tsx`.

### Recommended Folder Location:
- Place AI feature components in `features/ai/` or `app/(seller)/ai/`.
- Use `productService.createProduct()` to save generated product catalogs directly into the product store.

---

## 10. Integration Instructions for Kshitij (Buyer Marketplace & Admin)

Kshitij owns **Buyer Marketplace, Buyer Dashboard, and Admin Dashboard**.

### Recommended Route Groups:
- **Buyer Marketplace**: `app/(buyer)/`
- **Admin Dashboard**: `app/(admin)/`

### Shared Data Contracts:
- Consume `productService.getProducts('Published')` for buyer catalog views.
- Use `components/ui/` design system components (`ProductCard`, `Button`, `Badge`, `Card`, `ScreenWrapper`) for UI consistency.

---

## 11. Git Workflow & Commit Convention

Branching model:
```
main
  ↓
develop
  ↓
feature/vedant/foundation
feature/vedant/auth
feature/vedant/seller-home
feature/vedant/products
feature/vedant/profile-notifications
```

Commit message style:
- `feat(auth): implement seller authentication flow`
- `feat(seller): implement artisan home dashboard`
- `feat(products): implement product details and management`
- `fix(ui): adjust card elevation spacing`
