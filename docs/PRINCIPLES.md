# 🎯 8 Core Development Principles

**These principles are the foundation of every project using this template.**

---

## 1. 📉 Minimize Code

**Small functions (< 30 lines), small classes (< 5 responsibilities), small files (< 300 lines)**

### Why?
Less code = fewer bugs = lower cognitive load = happier developers

### Rules
- Functions: Max 30 lines
- Classes: Max 3-4 responsibilities
- Files: Max 300 lines
- Imports: Max 5 external dependencies

### Example
```typescript
// ✅ DO - Small, focused function
function validateEmail(email: string): boolean {
  return email.includes('@')
}

// ❌ DON'T - God function
function processUserRegistration(data, email, sms, ...) {
  // 500 lines of code
  // validate
  // send emails
  // create account
  // etc
}
```

---

## 2. 🔗 Minimize Coupling

**Objects should know as little as possible about each other**

### Why?
Decoupling = reusability = testability = no monolith horror

### Rules
- Always inject dependencies
- Use interfaces as contracts
- Keep modules independent
- Easy to test without external deps

### Example
```typescript
// ✅ DO - Injected dependencies
class UserService {
  constructor(private db: Database, private cache: Cache) {}
  
  async getUser(id: string) {
    const cached = await this.cache.get(`user:${id}`)
    if (cached) return cached
    return await this.db.query('SELECT * FROM users WHERE id = $1', [id])
  }
}

// ❌ DON'T - Hard coupling
class UserService {
  private db = new PostgresConnection() // HARDCODED!
  private cache = new RedisCache()      // HARDCODED!
}
```

---

## 3. 👤 One Responsibility = One Owner

**Each piece of logic has ONE clear owner**

### Why?
Responsibility diffusion = conflicts = bugs = nightmares

### Rules
- Each service: ONE job
- No bleeding between layers
- Clear exports: What does this file export? One thing?

### Example
```typescript
// ✅ DO - Clear responsibility
class UserRepository {
  // ONLY handles user data access
}

class UserService {
  // ONLY handles user business logic
}

class UserController {
  // ONLY handles HTTP requests
}

// ❌ DON'T - Responsibility diffusion
class UserComponent {
  // Doing: rendering, API calls, caching, validation, logging
  // WHO OWNS WHAT?!
}
```

---

## 4. ✨ Explicitness > Magic

**Show exactly what's happening. No hidden behavior.**

### Why?
Beautiful first month. Debugging nightmare after. Not worth it.

### Rules
- No decorators (except React/Next)
- No auto-scanning
- No reflection magic
- Everything explicit in imports

### Example
```typescript
// ✅ DO - Explicit
const cache = new RedisCache()
const db = new PostgresConnection()
const repo = new UserRepository(cache, db)

// ❌ DON'T - Magic (where does this come from?)
@Injectable()
class UserRepository {
  constructor(
    @Inject('CACHE') cache,  // What cache?
    @Inject('DB') db,       // What DB?
  ) {}
}
```

---

## 5. 🛡️ Errors Are Design, Not Edge Cases

**Every path must handle failure. Timeouts, retries, fallbacks.**

### Why?
"It works in happy path" = code death

### Rules
- Timeouts: ALWAYS set
- Retries: For flaky operations
- Backoff: Exponential, not hammering
- Logging: Every error path
- Specificity: Different error classes

### Example
```typescript
// ✅ DO - Error handling built-in
async function search(query: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await db.query(query, { timeout: 5000 })
    } catch (error) {
      if (i < retries - 1) {
        await sleep(Math.pow(2, i) * 100) // backoff
      }
    }
  }
  throw new SearchFailedError()
}

// ❌ DON'T - Happy path only
async function search(query: string) {
  return await db.query(query) // CRASH if error!
}
```

---

## 6. 📝 Code for Humans, Not Compilers

**Clarity wins in 99.9% of cases**

### Why?
You spend 10x more time reading code than writing it

### Rules
- Clear names (no abbreviations)
- Types used as documentation
- Comments explain WHY, not WHAT
- Consistent structure

### Example
```typescript
// ✅ DO - Clear
interface SearchParams {
  query: string
  language_pair: string
  limit?: number
}

class WordRepository {
  async search(params: SearchParams): Promise<Word[]> {
    // Logic here
  }
}

// ❌ DON'T - Cryptic
interface SP {
  q: string
  lp: string
  l?: number
}

class WR {
  async s(p: any): Promise<any[]> { }
}
```

---

## 7. 🌍 Minimize Global State

**Global state = hidden dependencies = chaos**

### Why?
If you must use it, make it explicit and controlled

### Rules
- No global variables
- Use store (Zustand/Context) explicitly
- Initialization: When and where?
- Cleanup: Memory leaks?

### Example
```typescript
// ✅ DO - Explicit global state
import { useSearchStore } from '@/lib/store'

function Component() {
  const { query, results } = useSearchStore() // EXPLICIT
  return <div>{results}</div>
}

// ❌ DON'T - Hidden global
let globalResults: any[] = []

function Component() {
  // WHERE does globalResults come from?
  return <div>{globalResults}</div>
}
```

---

## 8. 🎯 KISS - No Compromises

**Simple solution almost always beats complex**

### Why?
Simple = stable = cheaper = better

### Rules
- First: Make it work
- Second: Make it simple
- Third: Make it fast (only if needed)
- Do you really need that library?
- Is this pattern really better than if-else?

### Example
```typescript
// ✅ DO - Simple
function isValid(email: string): boolean {
  return email.includes('@')
}

// ❌ DON'T - Over-engineered
import emailValidator from 'complex-email-library'
function isValid(email: string): { valid: boolean, reason?: string } {
  // 50 lines of complex validation
  // Handles 1000 RFC edge cases
  // 90% overkill
}
```

---

## 📊 Checklist

Before committing:

```
[ ] Each function < 30 lines
[ ] Each class < 5 responsibilities
[ ] Dependencies injected, not created
[ ] No decorators (except React/Next)
[ ] No auto-scanning
[ ] No magic
[ ] Errors explicitly handled
[ ] Timeouts configured
[ ] Names are clear
[ ] Types are used
[ ] Global state minimized
[ ] Solution is simple
```

All checked? Ready to commit! ✅

Any unchecked? Fix before PR! ❌

---

**These 8 principles are non-negotiable. Every line of code should follow them.** 🙋
