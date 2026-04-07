# Frontend JavaScript / React Style Guide

Diante do uso de React 19 e Next.js 15, os padrões a serem seguidos distanciam-se profundamente de ES5 ou JavaScript vanilla clássico.

## 1. Source File Basics
- **Extensões:** Use `.jsx` para componentes React padrão neste projeto, a não ser que utilize fortemente tipagem, o que elege `.tsx`.
- **Organização de Importações:** Recomendado manter uma ordem padrão: `react`/`next` -> Aliases `components/ui` -> Aliases Internos -> Relativos.

## 2. Server Components vs Client Components
- Todo arquivo criado sob o diretório App (`/app`) roda nativamente no ambiente Node.js. Aproveite essa feature para `fetch` nativos ou leitura de configs sem expor código pro browser.
- **Client Components** não são inferiores, são necessários (Hooks globais, eventos do Mouse/Teclado, Contextos, `Framer Motion`). Restrinja o `"use client"` à aba ("leaf") da árvore dos elementos visuais.

## 3. React Development
- **Arrow Functions vs Function Declarations:** `export default function Page() {}` (Function declaration) é a preferida primariamente em rotas do App router. Como componentes menores/isolados, você pode se apoiar em *Arrow Functions* `const Component = () => {}`.
- **Props e Destructuring:** Destruture objetos nos parâmetros dos componentes para facilitar leitura: `const Avatar = ({ image, fallback }) => {}`.
- **State Management:** Mantenha estados isolados e próximos à raiz do seu componente do lado do cliente.

## 4. UI e Integração Base
- Para fusão contínua de classes CSS com comportamento e renderização, continue utilizando a função helper `cn()` de `lib/utils` gerada pela fundação da aplicação (Shadcn UI). Conselhos de uso:
  ```javascript
  import { cn } from "@/lib/utils"
  
  export function Button({ className, variant }) {
    return <button className={cn("inline-flex items-center...", className)} />
  }
  ```

## 5. Naming
- **Components/Classes:** `UpperCamelCase` (PascalCase).
- **Functions, Hooks, and Variables:** `lowerCamelCase`. Hooks sempre começam com `use`.
- **Diretórios de Rotas (Next.js):** Todo minúsculo, hifenizados (`/minhas-refeicoes`).
