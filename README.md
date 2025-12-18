# 🏗️ Project Template

**Status:** ✅ Production-Ready  
**Version:** 1.0.0  
**License:** MIT

---

## What is This?

A **production-ready project template** with:
- 🏗️ **8 Core Principles** embedded in every file
- 🔧 **Modern Stack** (Next.js, React, TypeScript)
- 🛠️ **Complete Infrastructure** (ESLint, Prettier, TypeScript)
- ⚙️ **Automated Quality** (Pre-commit hooks)
- 📚 **Comprehensive Docs** (30+ KB of guidance)
- 🚀 **Ready to Fork** (Grab and customize)

---

## 🏗️ The 8 Principles

1. **Minimize Code** - Small functions, classes, files
2. **Minimize Coupling** - Inject dependencies
3. **One Responsibility** - Clear ownership
4. **Explicitness** - No magic
5. **Errors As Design** - Built-in error handling
6. **Code for Humans** - Clear names, readable
7. **Global State** - Minimal, explicit
8. **KISS** - Simple always wins

**See:** [docs/PRINCIPLES.md](docs/PRINCIPLES.md)

---

## 🚀 Quick Start

```bash
# 1. Clone (or fork)
git clone https://github.com/Den3112/project-template.git
cd project-template

# 2. Install
npm install
npx husky install

# 3. Setup environment
cp .env.example .env.local

# 4. Start development
make dev
```

---

## 📦 What's Included

### Infrastructure
```
✅ .eslintrc.json              - ESLint (80+ rules)
✅ .prettierrc.json            - Prettier formatting
✅ tsconfig.json               - Strict TypeScript
✅ .husky/pre-commit           - Auto quality checks
✅ Makefile                    - 15 helpful commands
✅ .github/PULL_REQUEST_TEMPLATE.md - PR checklist
```

### Architecture
```
✅ lib/repositories/            - Data layer pattern
✅ lib/cache.ts                - Caching service
✅ lib/logger.ts               - Structured logging
✅ lib/errors.ts               - Error classes
✅ lib/schemas.ts              - Validation
✅ lib/api-handlers.ts         - API middleware
✅ lib/store/                  - State management
```

### Documentation
```
✅ docs/PRINCIPLES.md          - 8 principles in detail
✅ docs/ARCHITECTURE.md        - System design
✅ docs/REFACTORING_CHECKLIST.md - How to refactor
✅ docs/QUICK_START.md         - Getting started
✅ docs/COMPONENTS.md          - Component patterns
✅ docs/API.md                 - API patterns
```

### Stack
```
✅ Next.js 14+
✅ React 18+
✅ TypeScript (strict)
✅ Tailwind CSS
✅ Supabase (PostgreSQL)
✅ Redis (optional)
✅ Zustand (state)
✅ Zod (validation)
✅ Pino (logging)
```

---

## 📂 Project Structure

```
.
├── .github/
│   └── PULL_REQUEST_TEMPLATE.md
├── .husky/
│   └── pre-commit
├── app/
│   ├── api/                    # API routes
│   ├── page.tsx               # Main page
│   └── layout.tsx             # Root layout
├── components/                 # React components
├── lib/
│   ├── repositories/           # Data access
│   ├── store/                 # Zustand stores
│   ├── cache.ts               # Caching
│   ├── logger.ts              # Logging
│   ├── errors.ts              # Error classes
│   ├── schemas.ts             # Validation
│   └── api-handlers.ts        # Middleware
├── docs/                       # Documentation
├── public/                     # Static files
├── .eslintrc.json             # ESLint config
├── .prettierrc.json           # Prettier config
├── tsconfig.json              # TypeScript config
├── Makefile                   # Commands
├── package.json
├── .env.example               # Environment template
└── README.md
```

---

## 🛠️ Makefile Commands

```bash
make help              # Show all commands
make setup             # Complete setup
make dev               # Start development
make build             # Build for production
make lint              # Run ESLint
make format            # Format code
make type-check        # TypeScript check
make check             # All checks
make test              # Run tests
make deploy            # Deploy to production
```

---

## 📖 How to Use This Template

### Option 1: Fork It
```bash
# Fork on GitHub, then:
git clone https://github.com/YOUR-USERNAME/project-template.git
cd project-template
npm install
make dev
```

### Option 2: Use as Reference
```bash
# Copy patterns and configuration:
# - .eslintrc.json
# - .prettierrc.json
# - tsconfig.json
# - lib/ structure
# - Makefile
# - etc.
```

### Option 3: Clone and Modify
```bash
# Clone locally
git clone https://github.com/Den3112/project-template.git my-project
cd my-project
npm install
# Start building!
```

---

## ✨ Key Features

### Automated Quality
✅ **Pre-commit hooks** run automatically  
✅ **ESLint** enforces standards  
✅ **TypeScript** catches errors  
✅ **Prettier** formats code  
✅ **No bad code** gets committed  

### Production Ready
✅ **Error handling** built-in  
✅ **Logging** configured  
✅ **Caching** supported  
✅ **Validation** set up  
✅ **Tests** ready to write  

### Developer Experience
✅ **Clear patterns** to follow  
✅ **Easy commands** (make)  
✅ **Great docs** (30+ KB)  
✅ **Examples** provided  
✅ **Fast setup** (5 minutes)  

### Team Ready
✅ **PR template** enforces standards  
✅ **Principles** guide decisions  
✅ **Documentation** explains everything  
✅ **Code examples** show patterns  
✅ **Linting** ensures consistency  

---

## 📚 Documentation

- [Principles](docs/PRINCIPLES.md) - 8 core principles with examples
- [Architecture](docs/ARCHITECTURE.md) - System design and layers
- [Quick Start](docs/QUICK_START.md) - 5-minute setup guide
- [Components](docs/COMPONENTS.md) - React component patterns
- [API](docs/API.md) - API route patterns
- [Refactoring](docs/REFACTORING_CHECKLIST.md) - How to refactor

---

## ⚙️ Customization

This template is meant to be customized!

### What to change:
```
✅ Project name (package.json)
✅ Description
✅ License (currently MIT)
✅ Database (Supabase → your choice)
✅ Features (add/remove as needed)
✅ Colors (Tailwind config)
✅ Fonts
✅ API endpoints
```

### What NOT to change:
```
❌ 8 principles - keep them!
❌ ESLint rules - enforce quality
❌ TypeScript strict - stay strict
❌ Pre-commit hooks - keep quality
❌ Makefile patterns - helpful
❌ PR template - enforce standards
```

---

## 🤝 Contributing

If you improve this template:

1. Fork it
2. Create feature branch
3. Make improvements
4. Create PR with description
5. Get merged!

---

## 📄 License

MIT - Use freely in your projects!

---

## 🏢 Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zod](https://zod.dev/) - Validation
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Pino](https://getpino.io/) - Logging

---

**Ready to build something amazing?** 🚀

Fork this template and start coding!
