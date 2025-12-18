.PHONY: help setup dev build lint format type-check check test deploy

help:
	@echo "Available commands:"
	@echo "  make setup              Complete setup"
	@echo "  make dev                Start development"
	@echo "  make build              Build for production"
	@echo "  make lint               Run ESLint"
	@echo "  make format             Format code"
	@echo "  make type-check         TypeScript check"
	@echo "  make check              All quality checks"
	@echo "  make test               Run tests"
	@echo "  make deploy             Deploy to production"

setup: install
	@npm install
	@npx husky install

dev:
	@npm run dev

build:
	@npm run build

lint:
	@npm run lint

format:
	@npm run format

type-check:
	@npx tsc --noEmit

check: lint type-check
	@echo "✅ All checks passed!"

test:
	@npm run test

deploy:
	@npm run build
	@echo "Ready to deploy!"
