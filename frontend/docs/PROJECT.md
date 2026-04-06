# Project Overview: E-Commerce Storefront

## Table of Contents
1. [Core Technologies](#core-technologies)
2. [Architecture & Structure](#architecture--structure)
3. [Key Features](#key-features)
4. [API Integration](#api-integration)
5. [Type Safety](#type-safety)
6. [Component Structure](#component-structure)
7. [Feature Implementation Workflow](#feature-implementation-workflow)
8. [AI Development Workflow](#ai-development-workflow)

---

## Core Technologies

- **Framework**: Next.js 15 with App Router
- **State Management**: Redux Toolkit with Redux Persist (for cart persistence)
- **Data Fetching**: SWR for client-side data fetching with caching
- **HTTP Client**: Axios with interceptors for API calls
- **Styling**: SCSS Modules + Tailwind CSS v4
- **UI Components**: shadcn/ui component library
- **Language**: TypeScript for full type safety

---

## Architecture & Structure

### State Management
- **Redux Store** with cart slice for shopping cart operations
- **Redux Persist** to save cart state to localStorage
- **Custom Hooks** (`useCart`, `useProducts`) for clean data access
- Centralized state management in `/store` directory

### Routing Structure
\`\`\`
/                     → Landing page with product listing (route group: (landing))
/[id]                 → Product detail page (route group: (product))
/auth/login           → Login page (referenced but not yet implemented)
\`\`\`

### Directory Structure
\`\`\`
app/
├── (landing)/        → Landing page route group
├── (product)/        → Product detail route group
├── layout.tsx        → Root layout with providers
└── globals.css       → Global styles and Tailwind config

components/
├── modules/
│   ├── landing/      → Landing page specific components
│   └── product/      → Product page specific components
└── ui/               → Reusable UI components (shadcn)

hooks/
├── useCart.ts        → Shopping cart operations
└── useProducts.ts    → Product data fetching

services/
└── api/
    ├── axios.config.ts       → Axios instance with interceptors
    └── product.service.ts    → Product API calls

store/
├── index.ts          → Redux store configuration
└── slices/
    └── cartSlice.ts  → Cart state management

types/
├── cart.types.ts     → Cart-related TypeScript types
└── product.types.ts  → Product-related TypeScript types

providers/
├── index.tsx         → Combined providers wrapper
└── state-provider.tsx → Redux provider setup
\`\`\`

---

## Key Features

### 1. Product Catalog
- **Grid-based product listing** with responsive design
- **Pagination** for browsing large product sets
- **Search functionality** with debounced input for performance
- **Category filtering** support (backend-ready)
- **SWR caching** for optimized data fetching and automatic revalidation

### 2. Shopping Cart
- Add/remove products with one click
- Increment/decrement quantities with validation
- **Persistent cart state** across browser sessions (Redux Persist)
- Real-time total calculations
- Cart badge showing item count

### 3. Product Details
- Individual product pages with dynamic routing (`/[id]`)
- Breadcrumb navigation for better UX
- Related/similar products section
- Stock availability display
- Product image gallery (ready for implementation)

---

## API Integration

### Configuration
- Base URL configured via `NEXT_PUBLIC_API_URL` environment variable
- Service layer pattern for clean separation of concerns
- Centralized error handling

### Authentication
- **JWT token authentication** stored in localStorage
- Automatic token injection via Axios interceptors
- 401 redirect to login page on unauthorized access
- Token refresh logic ready for implementation

### API Services
\`\`\`typescript
// Example: ProductService
class ProductService {
  getProducts(params)    // Fetch paginated products
  getProductById(id)     // Fetch single product
  searchProducts(query)  // Search products
  // ... more methods
}
\`\`\`

---

## Type Safety

### TypeScript Types
\`\`\`typescript
// Product Types
interface Product {
  id: string
  name: string
  price: number
  description: string
  // ... more fields
}

// Cart Types
interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}
\`\`\`

All API responses, Redux state, and component props are fully typed for compile-time safety.

---

## Component Structure

### Organization
- **Modular components**: Organized by feature/page (`modules/landing`, `modules/product`)
- **SCSS modules**: Scoped styling to prevent conflicts
- **shadcn UI**: Consistent design system with accessible components

### Component Patterns
\`\`\`typescript
// Custom Hooks for Data
const { products, loading, error } = useProducts()
const { addToCart, removeFromCart, updateQuantity } = useCart()

// Redux for Global State
const cartItems = useSelector((state) => state.cart.items)
const dispatch = useDispatch()
\`\`\`

---

## Feature Implementation Workflow

### Step 1: Planning
1. **Define Requirements**: Clearly outline what the feature should do
2. **Check Existing Patterns**: Look for similar features in the codebase
3. **Design Data Flow**: Determine if you need:
   - New API endpoints
   - Redux state
   - New types/interfaces
   - UI components

### Step 2: Backend Integration (if needed)
1. **Define TypeScript Types** in `/types` directory
2. **Create API Service** methods in `/services/api`
3. **Test API Integration** with console logs or debugging tools

### Step 3: State Management (if needed)
1. **Create Redux Slice** in `/store/slices` if global state is needed
2. **Create Custom Hook** in `/hooks` for component-level access
3. **Add to Store** configuration in `/store/index.ts`

### Step 4: UI Development
1. **Create Components** in appropriate `/components/modules` directory
2. **Style with SCSS Modules** and Tailwind utilities
3. **Use shadcn Components** for consistency
4. **Implement Responsive Design** (mobile-first approach)

### Step 5: Page Integration
1. **Create/Update Pages** in `/app` directory
2. **Add Routing** using Next.js App Router conventions
3. **Connect State and Services** using hooks

### Step 6: Testing & Refinement
1. **Test User Flows**: Click through the entire feature
2. **Test Edge Cases**: Empty states, errors, loading states
3. **Verify Responsiveness**: Test on different screen sizes
4. **Check Accessibility**: Keyboard navigation, screen readers

### Example Workflow: Adding Wishlist Feature

\`\`\`
1. Planning
   ├── Users can save products to wishlist
   ├── Wishlist persists across sessions
   └── Wishlist accessible from header

2. Backend Integration
   ├── Create types/wishlist.types.ts
   └── Add WishlistService methods

3. State Management
   ├── Create store/slices/wishlistSlice.ts
   └── Create hooks/useWishlist.ts

4. UI Development
   ├── Create components/modules/wishlist/WishlistButton.tsx
   ├── Create components/modules/wishlist/WishlistPage.tsx
   └── Add wishlist icon to Header

5. Page Integration
   ├── Create app/wishlist/page.tsx
   └── Update app/layout.tsx if needed

6. Testing
   ├── Test add/remove from wishlist
   ├── Test persistence after refresh
   └── Test empty wishlist state
\`\`\`

---

## AI Development Workflow

### When to Use AI SDK
This project can be enhanced with AI features using the **Vercel AI SDK**. Here's when and how to integrate AI:

### Potential AI Features

#### 1. AI-Powered Product Search
**Use Case**: Natural language product search
\`\`\`typescript
// Example: "Show me affordable running shoes for beginners"
import { generateText } from 'ai'

async function searchWithAI(query: string) {
  const { text } = await generateText({
    model: 'openai/gpt-4.1',
    prompt: `Convert this search query into product filters: ${query}`
  })
  // Parse AI response and apply filters
}
\`\`\`

#### 2. Product Recommendations
**Use Case**: Personalized product suggestions based on browsing history
\`\`\`typescript
import { generateText } from 'ai'

async function getRecommendations(userHistory: Product[]) {
  const { text } = await generateText({
    model: 'openai/gpt-4.1',
    prompt: `Based on these products: ${JSON.stringify(userHistory)},
             suggest 5 similar products from our catalog`
  })
  // Return recommended product IDs
}
\`\`\`

#### 3. AI Shopping Assistant Chatbot
**Use Case**: Help users find products through conversation
\`\`\`typescript
import { streamText } from 'ai'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: 'openai/gpt-4.1',
    messages,
    system: 'You are a helpful shopping assistant. Help users find products.',
  })

  return result.toUIMessageStreamResponse()
}
\`\`\`

#### 4. Product Description Enhancement
**Use Case**: Generate SEO-friendly descriptions
\`\`\`typescript
async function enhanceDescription(product: Product) {
  const { text } = await generateText({
    model: 'openai/gpt-4.1',
    prompt: `Create an engaging product description for: ${product.name}`
  })
  return text
}
\`\`\`

### AI Integration Workflow

#### Step 1: Setup AI SDK
\`\`\`bash
# AI SDK is automatically available in v0 projects
# Just import and use
\`\`\`

#### Step 2: Add AI Feature Planning
1. **Identify the AI Use Case**: What problem does AI solve?
2. **Choose the Right Model**:
   - Fast responses: `openai/gpt-3.5-turbo`
   - Better quality: `openai/gpt-4`
   - Specialized: `anthropic/claude-3-sonnet`
3. **Design the Prompt**: Clear, specific instructions for the AI

#### Step 3: Create AI Service
\`\`\`typescript
// services/ai/product-ai.service.ts
import { generateText } from 'ai'

export class ProductAIService {
  static async searchProducts(naturalQuery: string) {
    const { text } = await generateText({
      model: 'openai/gpt-3.5-turbo',
      prompt: `Convert to search filters: ${naturalQuery}`,
    })
    return JSON.parse(text)
  }

  static async getRecommendations(productId: string) {
    // Implementation
  }
}
\`\`\`

#### Step 4: Create UI Components
\`\`\`typescript
// components/modules/landing/AISearch.tsx
'use client'

export function AISearch() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAISearch = async () => {
    setLoading(true)
    const filters = await ProductAIService.searchProducts(query)
    // Apply filters to product list
    setLoading(false)
  }

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Describe what you're looking for..."
      />
      <button onClick={handleAISearch}>Search with AI</button>
    </div>
  )
}
\`\`\`

#### Step 5: Streaming Responses (for Chatbots)
\`\`\`typescript
// app/api/chat/route.ts
import { streamText } from 'ai'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: 'openai/gpt-4.1',
    messages,
    system: 'You are a shopping assistant. Help users find products.',
  })

  return result.toUIMessageStreamResponse()
}

// Client component
import { useChat } from 'ai/react'

export function ChatBot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>{m.role}: {m.content}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
      </form>
    </div>
  )
}
\`\`\`

### AI Best Practices

1. **Rate Limiting**: Implement rate limits for AI requests to control costs
2. **Caching**: Cache AI responses for common queries
3. **Fallbacks**: Always have non-AI alternatives if AI fails
4. **User Feedback**: Let users rate AI suggestions to improve over time
5. **Privacy**: Don't send sensitive user data to AI models
6. **Cost Management**: Monitor API usage and set budgets

### AI Feature Priority (Recommended Order)

1. **AI Product Search** - Immediate value, easy to implement
2. **Product Recommendations** - Increases sales, moderate complexity
3. **Shopping Assistant Chatbot** - High value, higher complexity
4. **Description Enhancement** - Nice-to-have, low priority

---

## Current Gaps & Future Features

### Authentication
- [ ] Login/Signup pages
- [ ] Password reset flow
- [ ] User profile management
- [ ] OAuth integration (Google, Facebook)

### Checkout
- [ ] Cart page with full UI
- [ ] Checkout flow
- [ ] Payment integration (Stripe)
- [ ] Order confirmation

### Admin Panel
- [ ] Product management (CRUD)
- [ ] Order management
- [ ] User management
- [ ] Analytics dashboard

### Enhanced Features
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Order tracking
- [ ] Email notifications
- [ ] AI-powered search and recommendations

---

## Environment Variables

Required environment variables:
\`\`\`env
NEXT_PUBLIC_API_URL=<backend_api_url>
\`\`\`

For AI features:
\`\`\`env
# Automatically available through Vercel AI Gateway
# No API keys needed for supported models
\`\`\`

---

## Getting Started

1. **Clone and Install**
   \`\`\`bash
   npm install
   \`\`\`

2. **Set Environment Variables**
   Create `.env.local` and add required variables

3. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Build for Production**
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

---

## Contributing Guidelines

1. **Follow Existing Patterns**: Use the same structure and naming conventions
2. **Type Everything**: No `any` types without justification
3. **Component Organization**: Place components in appropriate `modules` folders
4. **State Management**: Use Redux for global state, SWR for server data
5. **Styling**: Use SCSS modules + Tailwind, avoid inline styles
6. **Testing**: Test all user flows before committing

---

*Last Updated: December 2024*
