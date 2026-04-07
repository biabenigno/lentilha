# Core Technologies
- **Frontend Framework:** Next.js 15 (App Router)
- **UI Architecture:** React 19 (Server Components and Client Components)
- **Styling:** Tailwind CSS V4
- **UI Library:** Shadcn UI (configuração `new-york`, base `neutral`)
- **Icons:** Lucide React (`lucide-react`)
- **Animations:** Framer Motion (`framer-motion`)
- **Charts:** Recharts (`recharts`)
- **Programming Language:** JavaScript (`.jsx`) e TypeScript (`.ts`, `.tsx`), misto conforme a base já disposta.

# Build and Dependency Management
- **Package Manager:** npm (recomendado, ou equivalentes modernos como pnpm/yarn/bun)
- **Build Tool:** Turbopack (padrão via comando `next dev --turbopack`)

# Testing & Quality
- **Linter:** ESLint (eslint.config.mjs)
- *(Adicione pacotes de testes como Jest/Playwright aqui caso a suíte seja configurada futuramente)*

# Environment and Hosting
- **Server:** Node.js (via Next.js runtime server)
- **Backend Communication:** Chamadas REST via API do FastAPI (Porta 8000) com banco PostgreSQL local (via Docker).
