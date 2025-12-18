# 🚀 Quick Start Guide

## 1. Setup (5 minutes)

```bash
# Clone
git clone https://github.com/Den3112/project-template.git
cd project-template

# Install
npm install

# Setup husky (git hooks)
npx husky install

# Create .env
cp .env.example .env.local

# Start
npm run dev
# or
make dev
```

## 2. First Commands

```bash
make help              # See all commands
make lint              # Check code quality
make format            # Auto-format code
make type-check        # TypeScript check
make check             # All checks
```

## 3. Create Your First Feature

```bash
# Create branch
git checkout -b feature/my-feature

# Make changes following 8 principles
# Each function < 30 lines
# Clear names
# Error handling
# Types everywhere

# Test
make check

# Commit (hooks run automatically!)
git add .
git commit -m "feat: my feature"

# Create PR
git push origin feature/my-feature
# Go to GitHub and create PR
```

## 4. What Gets Checked

### Before Every Commit
- ✅ Code formatted (Prettier)
- ✅ Linting passed (ESLint)
- ✅ Types valid (TypeScript)
- ✅ No console.log
- ✅ No unused variables

### Before Every Merge (PR)
- ✅ 8 principles followed
- ✅ Code quality gates passed
- ✅ Tests written
- ✅ Documentation updated

## 5. Project Structure

```
lib/
├── repositories/   → Data access layer
├── store/         → Zustand state
├── cache.ts       → Caching service
├─┠ logger.ts      → Structured logging
├┠ errors.ts      → Error classes
├┠ schemas.ts     → Validation (Zod)
└┠ api-handlers.ts → API middleware

app/
├── api/          → API routes
├┠ page.tsx       → Main page
└┠ layout.tsx     → Root layout

components/
└── ...           → React components
```

## 6. Key Files

- `.eslintrc.json` - Linting rules (80+ rules)
- `.prettierrc.json` - Code formatting
- `tsconfig.json` - TypeScript (strict mode)
- `Makefile` - Development commands
- `.github/PULL_REQUEST_TEMPLATE.md` - PR checklist
- `docs/PRINCIPLES.md` - 8 principles explained

## 7. Stack

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety (strict)
- **Tailwind CSS** - Styling
- **Supabase** - Database (PostgreSQL)
- **Zustand** - State management
- **Zod** - Validation
- **Pino** - Logging
- **ESLint** - Code quality (80+ rules)
- **Prettier** - Code formatting

## 8. Common Commands

```bash
make dev               # Start development
make build             # Build for production
make lint              # Check linting
make format            # Format code
make type-check        # Check TypeScript
make check             # All quality checks
make test              # Run tests
make services-up       # Start Docker (if used)
make db-shell          # PostgreSQL shell
make deploy            # Deploy to production
```

## 9. Tips

- ✅ Keep functions small (< 30 lines)
- ✅ Inject dependencies (don't create them)
- ✅ Handle errors (don't ignore them)
- ✅ Use clear names (no abbreviations)
- ✅ Write types (no implicit any)
- ✅ Keep it simple (KISS principle)
- ✅ Minimize global state
- ✅ One responsibility per function

## 10. Need Help?

- Read [docs/PRINCIPLES.md](PRINCIPLES.md)
- Check [README.md](../README.md)
- Look at examples in `lib/` and `app/`
- Review PR template

---

**Ready to build?** 🚀
