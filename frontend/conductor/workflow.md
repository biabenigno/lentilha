# Project Workflow

## Guiding Principles

1. **The Plan is the Source of Truth:** Todo o trabalho planejado deve ser descrito de antemão e anotado de acordo com o design focado em UX (Environmental UX).
2. **The Tech Stack is Deliberate:** Mudanças sensíveis no stack (*Next.js*, *Tailwind*, *Recharts*) devem ser documentadas em `tech-stack.md` primeiro.
3. **Small and Incremental Commits:** Favorecer o encapsulamento do histórico em tarefas do tamanho de um componente ou página do App Router.
4. **Non-Interactive & CI-Aware:** Dê preferência a comandos que não travam o processo interativamente (`npm run build`, `npm run lint`).
5. **Component Driven Development:** Pense na interface em blocos reutilizáveis via `components/ui`.

## Task Workflow

Ao assumir um task da interface do Lentilha:

1. **Select Task:** Entenda a necessidade da página ou do componente interativo.
2. **Setup Component (Green Phase):**
   - Na estrutura do Next.js App Router, crie o componente em `/components/nomeComponente` ou a rota em `app/rota/page.jsx`.
   - Implemente o visual base com Shadcn UI e Tailwind V4. Mantenha por padrão como Server Component.
3. **Add Interactivity (Optionally):**
   - Caso possua estado, clique, animações Framer Motion, ou gráficos Recharts, certifique-se de extrair o menor escopo possível do componente e anexar `"use client"` na primeira linha desse arquivo isolado.
4. **Refactor & Linter (Optional but Recommended):**
   - Garanta legibilidade rodando o linter do ecossistema front-end. E remova imports não utilizados com `eslint`.
5. **Document Deviations:**
   - Caso precise injetar uma biblioteca externa pesada (ex: manipulação extrema de excel no front, embora idealmente fosse no backend), discuta e registre a intenção arquitetural.
6. **Commit & Attach Git Notes:**
   - Faça commits focados (ex: `feat(ui): cria dashboard com graficos recharts`) e registre resumos de plano via `git notes`.

## Development Commands

**Setup do Projeto Front-end:**
```bash
# Estando dentro do diretorio \frontend
npm install           # Instala as depenencias
npx shadcn@latest add button  # Exemplo caso precise adicionar um novo componente
```

**Daily Development:**
```bash
npm run dev           # Inicia o servidor local do Next.js via turbopack
npm run lint          # Para validar consistência do código React
```

**Before Committing:**
```bash
npm run build         # Garantir que o app do Next.js consegue buildar para produção sem falhas de hydration ou tipo (se TS)
```

## Verification & Code Review 

Antes de finalizar qualquer branch ou componente do Lentilha:
1. **Server vs Client:** O design está sobrecarregando o cliente sem necessidade? Evitou `"use client"` na page raiz?
2. **Tailwind Semantics:** Evitou cores 'Hard-Coded'? Prefira `bg-background`, `text-primary`.
3. **Backend Integration:** O frontend depende do FastAPI (backend). Os endpoints em portas estáticas (`localhost:8000`) necessitam estar previstos ou extraídos via URL centralizadora de fetch no `lib/utils` ou serviços.
4. **Mobile First:** Componentes foram validados para responsividade? Lembre que interfaces de log de alimentação frequentemente ocorrem no celular do usuário logo após comer.

### Commit Example
```bash
git commit -m "feat(pages): cria painel de analise de carbono dos alimentos selecionados"
```
