# 🏗️ Architecture Guide

## Overview

This template follows a **clean, layered architecture**:

```
┌─────────────────────────────────────┐
│      Components (React)             │
│      (UI Layer)                     │
└──────────────┬──────────────────────┘
               │ uses
               ↓
┌─────────────────────────────────────┐
│      Store (Zustand)                │
│      (State Management)             │
└──────────────┬──────────────────────┘
               │ calls
               ↓
┌─────────────────────────────────────┐
│      API Routes                     │
│      (HTTP Layer)                   │
└──────────────┬──────────────────────┘
               │ validates with
               ↓
┌─────────────────────────────────────┐
│      Schemas (Zod)                  │
│      (Validation Layer)             │
└──────────────┬──────────────────────┘
               │ uses
               ↓
┌─────────────────────────────────────┐
│      Repository                     │
│      (Data Access Layer)            │
└──────────────┬──────────────────────┘
               │ with cache
               ↓
┌─────────────────────────────────────┐
│      Cache (Redis)                  │
│      (Performance Layer)            │
└──────────────┬──────────────────────┘
               │ or queries
               ↓
┌─────────────────────────────────────┐
│      Database (PostgreSQL)          │
│      (Persistence Layer)            │
└─────────────────────────────────────┘
```

## Key Principles

### 1. Separation of Concerns
- Each layer has ONE responsibility
- Components don't know about database
- API routes don't contain business logic
- Repository handles all data access

### 2. Dependency Injection
- Dependencies are passed in, not created
- Easy to test (mock dependencies)
- Easy to swap implementations

### 3. Error Handling
- Every operation can fail
- Errors are caught and handled
- Specific error types for different failures
- User-friendly error messages

### 4. Validation
- All inputs validated with Zod
- Type-safe from runtime to compile-time
- Consistent error messages

### 5. Logging
- Structured logging with Pino
- Every important operation logged
- Easy to debug and monitor

## Layers Explained

### Components Layer
- React components
- < 100 lines each
- Use hooks and store
- Handle UI only

### Store Layer
- Zustand for state
- Global state management
- Calls API layer
- Handles loading/error states

### API Layer
- Next.js API routes
- Validates requests
- Calls repository
- Returns typed responses

### Validation Layer
- Zod schemas
- Runtime type checking
- Shared between frontend/backend

### Repository Layer
- Data access abstraction
- Handles caching
- Manages database queries
- Implements error handling

### Cache Layer
- Redis integration
- Caches frequent queries
- Automatic invalidation
- TTL management

### Database Layer
- PostgreSQL (Supabase)
- Normalized schema
- Indexes on common queries
- Transactions for consistency

## Data Flow

### Happy Path (Success)
```
Component
  → User clicks button
    ↓
Store
  → dispatch(searchAction)
    ↓
API Route
  → POST /api/search
    ↓
Validation
  → Validate query params
    ↓
Repository
  → Check cache
    ↓
Cache Hit
  → Return cached result
    ↓
Component
  → Display results
```

### Cache Miss Path
```
Repository
  → Cache miss
    ↓
Database Query
  → SELECT * FROM items WHERE...
    ↓
Store in Cache
  → Set with TTL
    ↓
Return Results
  → To component
```

### Error Path
```
Repository
  → Operation fails
    ↓
Throw Error
  → Specific error class
    ↓
API Route
  → Catch error
  → Log error
  → Return error response
    ↓
Component
  → Display error message
```

## File Organization

```
lib/
├── repositories/
│   ├── BaseRepository.ts      - Base class
│   └── ItemRepository.ts      - Example implementation
├── store/
│   ├── createStore.ts         - Store utilities
│   └── itemStore.ts           - Example store
├── cache.ts                   - Cache service
├── logger.ts                  - Logger setup
├── errors.ts                  - Error classes
├── schemas.ts                 - Zod schemas
└── api-handlers.ts            - Middleware helpers

app/
├── api/
│   ├── items/
│   │   └── route.ts          - GET/POST
│   └── items/
│       └── [id]/
│           └── route.ts      - GET/PUT/DELETE
├── layout.tsx                 - Root layout
└── page.tsx                   - Home page

components/
├── ItemList.tsx               - Example component
├── ItemForm.tsx               - Form component
└── ErrorBoundary.tsx          - Error handling
```

## Type Safety

### Request/Response Types
```typescript
// Shared types
export interface Item {
  id: string
  name: string
  description: string
  created_at: string
}

// API Request
export type CreateItemRequest = Omit<Item, 'id' | 'created_at'>

// API Response
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
```

### Validation
```typescript
// Zod schema
const createItemSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
})

// Type inference
type CreateItemInput = z.infer<typeof createItemSchema>
```

## Error Handling

### Error Classes
```typescript
class DatabaseError extends Error { }
class ValidationError extends Error { }
class NotFoundError extends Error { }
class TimeoutError extends Error { }
```

### Error Handling in Repository
```typescript
try {
  return await this.query(...)
} catch (error) {
  if (error instanceof TimeoutError) {
    throw new TimeoutError('Query timeout')
  }
  throw new DatabaseError('Database error')
}
```

## Performance Optimization

### Caching Strategy
- List queries: 1 hour TTL
- Single item: 24 hour TTL
- User queries: 5 minute TTL
- Invalidate on write

### Database Optimization
- Indexes on frequently queried columns
- Normalized schema
- Connection pooling
- Query optimization

### Frontend Optimization
- Component memoization
- Store subscriptions
- Lazy loading
- Image optimization

## Testing Strategy

### Unit Tests
- Repository methods
- Error classes
- Validation schemas
- Utility functions

### Integration Tests
- API routes
- Cache behavior
- Error handling
- Database operations

### E2E Tests
- User flows
- Component interactions
- Full stack scenarios

---

**Follow this architecture for clean, maintainable code!** 🏗️
