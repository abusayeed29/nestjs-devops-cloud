# Minimalist E-Commerce Frontend

A modern, scalable e-commerce frontend application built with Next.js 16, Redux Toolkit, and SASS. This application follows enterprise-level best practices for maintainability, scalability, and code organization.

## 🏗️ Architecture Overview

This frontend application is designed to work with a separate backend API that handles all business logic, authentication, and data persistence. The frontend focuses on providing an excellent user experience with efficient state management and optimized performance.

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **State Management**: Redux Toolkit with Redux Persist
- **Styling**: SASS/SCSS + Tailwind CSS v4
- **Authentication**: JWT-based (Access + Refresh tokens)
- **Payment Integration**: Stripe
- **UI Components**: shadcn/ui
- **TypeScript**: Full type safety

## 📁 Project Structure

\`\`\`
front/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth group routes
│   │   ├── login/
│   │   └── register/
│   ├── (product)/                # Product group routes
│   │   └── [slug]/               # Dynamic product detail page
│   ├── cart/                     # Shopping cart page
│   ├── checkout/                 # Checkout flow
│   ├── dashboard/                # User dashboard
│   │   ├── orders/               # User orders
│   │   └── admin/                # Admin panel (orders & payments)
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page (product list)
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Layout components (Header, Footer, etc.)
│   ├── product/                  # Product-related components
│   ├── cart/                     # Cart components
│   └── admin/                    # Admin components
├── lib/                          # Utility functions
│   ├── api.ts                    # API client & interceptors
│   ├── auth.ts                   # Auth utilities
│   └── utils.ts                  # Helper functions
├── store/                        # Redux store
│   ├── slices/                   # Redux slices
│   │   ├── authSlice.ts          # Authentication state
│   │   ├── cartSlice.ts          # Shopping cart state
│   │   ├── productSlice.ts       # Product state
│   │   └── orderSlice.ts         # Order state
│   └── index.ts                  # Store configuration
├── providers/                    # React providers
│   ├── index.tsx                 # Main provider wrapper
│   └── state-provider.tsx        # Redux provider
├── types/                        # TypeScript type definitions
│   ├── product.ts
│   ├── cart.ts
│   ├── order.ts
│   └── user.ts
├── hooks/                        # Custom React hooks
│   ├── use-auth.ts
│   ├── use-cart.ts
│   └── use-toast.ts
└── styles/                       # SASS stylesheets
    ├── abstracts/                # Variables, mixins, functions
    ├── components/               # Component-specific styles
    ├── layout/                   # Layout styles
    └── pages/                    # Page-specific styles
\`\`\`

## 🚀 Features

### Public Features

#### 1. **Landing Page** (`/`)
- Display paginated product list fetched from backend
- Real-time search functionality to filter products
- Responsive grid layout with minimalist design
- Product cards with image, name, price, and quick actions

#### 2. **Product Detail Page** (`/product/[slug]`)
- Minimalist product showcase with high-quality images
- Detailed product description and specifications
- "Add to Cart" functionality
- Related products section

#### 3. **Shopping Cart** (`/cart`)
- View all items added to cart
- Update quantities or remove items
- Cart state persisted using Redux Persist (survives page reload)
- Real-time price calculations
- Proceed to checkout button

### Protected Features (Authentication Required)

#### 4. **Authentication** (`/login`, `/register`)
- JWT-based authentication
- Login and registration forms
- Token management (access + refresh tokens)
- Protected route middleware
- Automatic token refresh

**Auth API Endpoints:**
\`\`\`
POST /auth/register
POST /auth/login
\`\`\`

**Response Format:**
\`\`\`json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "user" | "admin"
  }
}
\`\`\`

#### 5. **Checkout Flow** (`/checkout`)
- Payment method selection (Stripe)
- Order summary and review
- Stripe payment integration
- Redirect to dashboard on success

#### 6. **User Dashboard** (`/dashboard`)
- View personal order history
- Order details and status tracking
- Account information management

#### 7. **Admin Dashboard** (`/dashboard/admin`)
- **Role-based access**: Admin only
- View all orders from all users
- Order management (status updates)
- Payment details for each order
- User analytics and statistics

## 🔐 Authentication Flow

1. User attempts to access checkout page
2. System checks for valid JWT token
3. If not authenticated, redirect to `/login`
4. After successful login/register:
   - Store `accessToken` and `refreshToken` in Redux store (persisted)
   - Store user information in Redux state
   - Redirect back to intended page
5. API requests automatically include `Authorization: Bearer {accessToken}`
6. On token expiration, automatically refresh using `refreshToken`

## 🛒 Cart Management

The shopping cart uses Redux Toolkit with persistence:

\`\`\`typescript
// Cart state structure
{
  items: [
    {
      productId: string,
      slug: string,
      name: string,
      price: number,
      quantity: number,
      image: string
    }
  ],
  totalItems: number,
  totalPrice: number
}
\`\`\`

**Cart persistence:**
- Stored in `localStorage` via `redux-persist`
- Survives page reloads and browser restarts
- Syncs across browser tabs
- Cleared on logout

## 💳 Payment Integration

**Stripe Integration:**
- Payment method selection on checkout page
- Secure Stripe Checkout Session
- Server-side payment processing
- Success/failure handling
- Order confirmation

## 🎨 Styling Architecture

### SASS Structure

\`\`\`
styles/
├── abstracts/
│   ├── _variables.scss          # Color palette, spacing, typography
│   ├── _mixins.scss             # Reusable mixins
│   └── _functions.scss          # SASS functions
├── base/
│   ├── _reset.scss              # CSS reset
│   └── _typography.scss         # Typography base
├── components/
│   ├── _button.scss
│   ├── _card.scss
│   └── _form.scss
├── layout/
│   ├── _header.scss
│   ├── _footer.scss
│   └── _grid.scss
└── pages/
    ├── _home.scss
    ├── _product.scss
    └── _cart.scss
\`\`\`

**Design Principles:**
- Minimalist aesthetic
- Mobile-first responsive design
- Consistent spacing using 8px grid system
- Limited color palette for visual cohesion
- Accessible contrast ratios (WCAG AA compliant)

## 🛠️ State Management

### Redux Store Structure

\`\`\`typescript
{
  auth: {
    user: User | null,
    accessToken: string | null,
    refreshToken: string | null,
    isAuthenticated: boolean,
    loading: boolean,
    error: string | null
  },
  cart: {
    items: CartItem[],
    totalItems: number,
    totalPrice: number
  },
  products: {
    list: Product[],
    currentProduct: Product | null,
    pagination: {
      page: number,
      limit: number,
      total: number
    },
    loading: boolean,
    error: string | null
  },
  orders: {
    userOrders: Order[],
    allOrders: Order[], // Admin only
    currentOrder: Order | null,
    loading: boolean,
    error: string | null
  }
}
\`\`\`

**Persisted Slices:**
- `auth` - User session and tokens
- `cart` - Shopping cart items

## 🔧 API Integration

### Base Configuration

\`\`\`typescript
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

// API client with interceptors for:
// - JWT token injection
// - Automatic token refresh
// - Error handling
// - Request/response logging
\`\`\`

### Key Endpoints

\`\`\`
# Products
GET    /products              # Get paginated products
GET    /products/:slug        # Get product by slug
GET    /products/search?q=    # Search products

# Authentication
POST   /auth/register         # Register new user
POST   /auth/login            # Login user
POST   /auth/refresh          # Refresh access token
POST   /auth/logout           # Logout user

# Cart & Orders
POST   /orders                # Create order from cart
GET    /orders                # Get user orders
GET    /orders/:id            # Get order details

# Admin
GET    /admin/orders          # Get all orders (admin)
PATCH  /admin/orders/:id      # Update order status (admin)
GET    /admin/payments/:id    # Get payment details (admin)

# Payments
POST   /payments/stripe       # Create Stripe checkout session
POST   /payments/webhook      # Stripe webhook (backend)
\`\`\`

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Backend API running and accessible
- Stripe account (for payments)

### Installation

\`\`\`bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Update .env.local with your values:
# NEXT_PUBLIC_API_URL=your_backend_url
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
\`\`\`

### Development

\`\`\`bash
# Run development server
npm run dev

# Open http://localhost:3000
\`\`\`

### Production Build

\`\`\`bash
# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 📦 Environment Variables

\`\`\`env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Optional: Analytics, monitoring, etc.
\`\`\`

## 🧪 Code Quality

### Best Practices Implemented

1. **Type Safety**: Full TypeScript coverage with strict mode
2. **Component Architecture**: Atomic design principles
3. **State Management**: Centralized Redux store with normalized data
4. **API Layer**: Abstracted API calls with error handling
5. **Responsive Design**: Mobile-first approach
6. **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
7. **Performance**: Code splitting, lazy loading, image optimization
8. **Error Handling**: Graceful error boundaries and user feedback
9. **Security**: XSS prevention, CSRF protection, secure token storage

### Code Organization Principles

- **Separation of Concerns**: Clear boundaries between UI, logic, and state
- **DRY (Don't Repeat Yourself)**: Reusable components and utilities
- **Single Responsibility**: Each module has one clear purpose
- **Dependency Injection**: Easy testing and maintainability
- **Consistent Naming**: Clear, descriptive names following conventions

## 🔒 Security Considerations

- JWT tokens stored in Redux (not localStorage directly)
- HTTP-only cookies consideration for refresh tokens (discuss with backend)
- XSS protection through React's automatic escaping
- CSRF tokens for sensitive operations
- Rate limiting on authentication endpoints (backend)
- Input validation and sanitization
- Secure Stripe integration (no sensitive data in frontend)

## 📈 Performance Optimizations

- Next.js Image optimization for product images
- Code splitting by route (automatic with App Router)
- Redux state normalization for large datasets
- Debounced search input
- Pagination for product lists
- React.memo for expensive components
- Lazy loading for non-critical components

## 🤝 Contributing

When contributing, please:
1. Follow the existing code structure and naming conventions
2. Write TypeScript types for all new code
3. Create SASS modules for component styles
4. Update Redux slices following the established patterns
5. Ensure responsive design on mobile, tablet, and desktop
6. Test authentication flows and cart persistence

## 📝 License

[Your License Here]

## 👥 Team

Frontend Engineering Team

---

**Note**: This frontend application requires a running backend API. Ensure the backend is properly configured and the `NEXT_PUBLIC_API_URL` environment variable points to the correct endpoint.
