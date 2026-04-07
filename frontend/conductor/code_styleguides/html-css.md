# HTML, CSS & Tailwind Style Guide

Em projetos focados pelo UI moderno, especialmente alicerçados como o nosso em *Tailwind CSS v4* e primitives vindas de *Radix/Shadcn UI*, praticamente não escreveremos CSS bruto. 

## 1. CSS Arquitetural
- Todo o design do aplicativo repousa puramente sobre regras de utilitários (Utility-first CSS). Evite escrever classes como `.card-container { display: flex }` nos arquivos globais. Substitua pelo equivalente em React: `className="flex flex-col rounded-lg ..."`
- Se for absurdamente vital o reuso de estilos pesados e que o React em si não resolve através de um subcomponente, acene aos layers customizados do seu `@theme` ou `app/globals.css`.

## 2. Tailwind Semantics e Shadcn UI
- O Shadcn embute variáveis úteis. Evite forçar `bg-gray-100`. Confie no `bg-muted` ou `bg-secondary` garantindo compatibilidade global baseada em Dark-mode automático.
  - **Foreground vs Background:** A cor do texto para uma caixa com fundo de cor `primary` é sempre `primary-foreground` (ex: `text-primary-foreground`).
  - **Interações:** Embuta reações táteis e microinterações nas classes (ex: `hover:bg-primary/90`, `transition-all duration-300`).

## 3. Estruturação DOM e HTML via JSX
- Evite aninhadamentos bizarros e repetição da divitis (`<div><div>...</div></div>`). 
- Em React procure fazer uso correto das semânticas embutidas: `<section>`, `<article>`, `<header>`, `<footer>`. 
- Nos fragmentos utilize `<>` e `</>` sempre ao invés de envelopar em divs extras inúteis.
- Lembre-se, Next.js permite validações rigorosas de hidratação. Entregar HTML falto no Server Side gerará problemas na tela de cliente (como `p` dentro de `p` ou aninhamentos inválidos de âncoras `a`). 

## 4. Estilos Nativos vs Animations
- Transições de cores, hover eficientemente, traduções (`translate-x`) podem ser confiadas ao Tailwind. 
- Quando lidar com fluxos de entrada e saída complexos, encadeamentos, ou keyframes pesados, mude a chave de responsabilidade para injetar o utilitário `<motion.div>` utilizando o `framer-motion` listado na nossa stack base.
