# ⚛️ Component Patterns

## Component Size

**Every component should be < 100 lines**

```typescript
// ✅ DO - Small, focused
export function ItemCard({ item }: { item: Item }) {
  return (
    <div className="p-4 border rounded">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
    </div>
  )
}

// ❌ DON'T - Large, does too much
export function ItemCard({ item }: { item: Item }) {
  // 100+ lines
  // Fetching data
  // State management
  // Validation
  // Error handling
  // Etc...
}
```

## Props

```typescript
// ✅ DO - Typed props interface
interface ItemCardProps {
  item: Item
  onSelect?: (id: string) => void
  isSelected?: boolean
}

export function ItemCard({ item, onSelect, isSelected }: ItemCardProps) {
  return (...)
}

// ❌ DON'T - Implicit any
export function ItemCard(props: any) {
  // No type safety!
}
```

## Hooks

```typescript
// ✅ DO - Use hooks from store
import { useItemStore } from '@/lib/store'

export function ItemList() {
  const { items, loading, error, fetchItems } = useItemStore()
  
  useEffect(() => {
    fetchItems()
  }, [])
  
  if (loading) return <Loader />
  if (error) return <Error message={error} />
  
  return (
    <div>
      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}

// ❌ DON'T - Complex logic in component
export function ItemList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  // 50+ lines of useEffect
  // API calls
  // Caching
  // Error handling
}
```

## Error Handling

```typescript
// ✅ DO - Handle errors
interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component {
  state: ErrorBoundaryState = { hasError: false }
  
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div>
    }
    return this.props.children
  }
}

// ❌ DON'T - Ignore errors
export function ItemList() {
  const items = fetchItems() // What if this throws?
  return <div>{items}</div>
}
```

## Loading States

```typescript
// ✅ DO - Show loading
export function ItemList() {
  const { items, loading } = useItemStore()
  
  if (loading) {
    return <Skeleton count={5} />
  }
  
  return <div>{items.map(item => ...)}</div>
}

// ❌ DON'T - No loading state
export function ItemList() {
  return <div>{items.map(item => ...)}</div> // Flickers?
}
```

## Controlled Components

```typescript
// ✅ DO - Controlled input
interface InputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: InputProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

// ❌ DON'T - Uncontrolled
export function SearchInput() {
  const ref = useRef<HTMLInputElement>(null)
  // State is hidden in DOM
}
```

## Conditional Rendering

```typescript
// ✅ DO - Clear conditions
if (loading) return <Loader />
if (error) return <Error message={error} />
if (items.length === 0) return <Empty />
return <ItemList items={items} />

// ❌ DON'T - Complex ternaries
return (
  {loading ? <Loader /> : error ? <Error /> : items.length === 0 ? <Empty /> : <ItemList />}
)
```

## Key Prop

```typescript
// ✅ DO - Use stable key
items.map(item => <ItemCard key={item.id} item={item} />)

// ❌ DON'T - Use index
items.map((item, index) => <ItemCard key={index} item={item} />)
// This breaks re-renders and animations
```

## Component Composition

```typescript
// ✅ DO - Composable
export function ItemPage() {
  return (
    <div>
      <ItemSearch />
      <ItemList />
      <ItemPagination />
    </div>
  )
}

// ❌ DON'T - God component
export function ItemPage() {
  // 500 lines
  // All logic mixed together
  // Hard to test
  // Hard to reuse
}
```

## Memoization

```typescript
// ✅ DO - Memoize when needed
const ItemCard = React.memo(function ItemCard({ item }: ItemCardProps) {
  return <div>{item.name}</div>
}, (prev, next) => prev.item.id === next.item.id)

// Use memo for:
// - Expensive renders
// - Prevent unnecessary renders
// - Performance-critical components

// DON'T use memo for:
// - Everything (premature optimization)
// - Simple components
```

## Callbacks

```typescript
// ✅ DO - Stable callbacks
const handleClick = useCallback(() => {
  onSelect(item.id)
}, [item.id, onSelect])

// ❌ DON'T - Create on every render
const handleClick = () => onSelect(item.id) // New function every time!
```

---

**Keep components small, focused, and testable!** ⚛️
