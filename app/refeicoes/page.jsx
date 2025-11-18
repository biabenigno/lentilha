// app/refeicoes/page.jsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Visual tokens
const BRAND = {
  primary: "#448040",
  primaryDark: "#146151",
  accent: "#B4CF66",
  orange: "#FF5A34",
  neutralText: "#2f6b46",
  mutedText: "#6b6b6b",
};

// Mocked data (mantive seu conteúdo)
const MOCK_MEALS = [
  {
    id: "cafe",
    title: "Café da manhã",
    totals: { co2: "~773.34 g CO₂e", water: "~555.26 L" },
    highlight: { label: "Queijo mussarela foi o produto com a maior pegada na sua refeição", color: "#F7DB75", img: "/mussarela.png" },
    items: [
      { id: 1, name: "Pão francês com manteiga", qty: "50g", thumb: "/pao.png", tags: ["popular"], details: { co2: "120 g", water: "30 L", ingredients: ["Farinha", "Manteiga"] } },
      { id: 2, name: "Queijo mussarela", qty: "40g", thumb: "/mussarela.png", tags: ["alto"], details: { co2: "230 g", water: "120 L", ingredients: ["Leite", "Cloreto de cálcio"] } },
      { id: 3, name: "Café com leite c/ adoçante", qty: "200g", thumb: "/cafe.png", tags: ["com adoçante"], details: { co2: "80 g", water: "25 L", ingredients: ["Café", "Leite", "Adoçante"] } },
      { id: 4, name: "Suco de laranja", qty: "200g", thumb: "/suco.png", tags: [], details: { co2: "40 g", water: "60 L", ingredients: ["Laranja"] } },
    ],
  },
  {
    id: "almoco",
    title: "Almoço",
    totals: { co2: "~8,896.10 g CO₂e", water: "~6,861.20 L" },
    highlight: { label: "Bisteca bovina foi o produto com a maior pegada na sua refeição", color: "#FF8E6B", img: "/bisteca.png" },
    items: [
      { id: 1, name: "Arroz branco", qty: "150g", thumb: "/arroz.png", tags: [], details: { co2: "400 g", water: "200 L", ingredients: ["Arroz"] } },
      { id: 2, name: "Bisteca bovina", qty: "220g", thumb: "/bisteca.png", tags: ["alto"], details: { co2: "5,200 g", water: "4,000 L", ingredients: ["Carne bovina"] } },
      { id: 3, name: "Salada verde", qty: "80g", thumb: "/salada.png", tags: [], details: { co2: "80 g", water: "30 L", ingredients: ["Alface", "Tomate"] } },
      { id: 4, name: "Feijão", qty: "100g", thumb: "/feijao.png", tags: [], details: { co2: "180 g", water: "120 L", ingredients: ["Feijão"] } },
    ],
  },
  {
    id: "lanche",
    title: "Lanche da tarde",
    totals: { co2: "~364.74 g CO₂e", water: "~965.76 L" },
    highlight: { label: "Coxinha foi o produto com a maior pegada na sua refeição", color: "#F7DB75", img: "/coxinha.png" },
    items: [
      { id: 1, name: "Coxinha", qty: "120g", thumb: "/coxinha.png", tags: [], details: { co2: "220 g", water: "80 L", ingredients: ["Massa", "Frango"] } },
      { id: 2, name: "Suco natural", qty: "250g", thumb: "/suco2.png", tags: [], details: { co2: "30 g", water: "70 L", ingredients: ["Fruta"] } },
      { id: 3, name: "Pão de queijo", qty: "90g", thumb: "/paoqueijo.png", tags: [], details: { co2: "60 g", water: "25 L", ingredients: ["Queijo", "Polvilho"] } },
    ],
  },
  {
    id: "jantar",
    title: "Jantar",
    totals: { co2: "3,365.00 g CO₂e", water: "1,877.50 L" },
    highlight: { label: "Cheeseburger foi o produto com a maior pegada na sua refeição", color: "#FF8E6B", img: "/cheeseburger.png" },
    items: [
      { id: 1, name: "Cheeseburger", qty: "250g", thumb: "/cheeseburger.png", tags: ["alto"], details: { co2: "1,800 g", water: "900 L", ingredients: ["Pão", "Carne", "Queijo"] } },
      { id: 2, name: "Batata frita", qty: "150g", thumb: "/batata.png", tags: [], details: { co2: "120 g", water: "60 L", ingredients: ["Batata", "Óleo"] } },
      { id: 3, name: "Refrigerante", qty: "350g", thumb: "/refrigerante.png", tags: [], details: { co2: "60 g", water: "30 L", ingredients: ["Xarope"] } },
    ],
  },
  {
    id: "ceia",
    title: "Ceia",
    totals: { co2: "2,049.00 g CO₂e", water: "1,958.00 L" },
    highlight: { label: "Tapioca recheada foi o produto com a maior pegada na sua refeição", color: "#FF8E6B", img: "/tapioca.png" },
    items: [
      { id: 1, name: "Tapioca recheada", qty: "180g", thumb: "/tapioca.png", tags: [], details: { co2: "420 g", water: "300 L", ingredients: ["Tapioca", "Recheio"] } },
      { id: 2, name: "Chá", qty: "200g", thumb: "/cha.png", tags: [], details: { co2: "5 g", water: "2 L", ingredients: ["Erva"] } },
    ],
  },
];

export default function Page() {
  return (
    // wrapper relativo (não necessário, mas mantém semântica)
    <div className="min-h-screen p-6 bg-[#f3eef6] font-sans relative">
      {/* Aside fixo: colado logo à direita do sidebar (sidebar é w-24 -> left-24) */}
      <aside
        className="hidden lg:block fixed left-38 top-26 w-[240px] z-40"
        aria-label="menu lateral secundário"
      >
        <div className="flex flex-col items-start gap-6">
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center shadow">
              <Image src="/avatar.png" alt="avatar" width={72} height={72} className="object-cover rounded-full" />
            </div>
            <div>
              <p className="text-xs text-[#6b6b6b]">Seja bem-vinda,</p>
              <p className="text-lg font-semibold" style={{ color: BRAND.primary }}>Fernanda</p>
            </div>
          </div>

          <nav className="w-full space-y-3 flex flex-col items-start">
            <SectionButton href="/perfil/editar" label="Editar perfil" />
            <SectionButton href="/resumo" label="Resumo - meu impacto" />
            <SectionButton href="/refeicoes" label="Refeições" active />
            <SectionButton href="/configuracoes" label="Configurações" />
            <SectionButton href="/sair" label="Sair" />
          </nav>
        </div>
      </aside>

      {/* Conteúdo centralizado; em telas lg empurraremos o container para a direita
          usando lg:ml-[360px] para reservar: sidebar(96px) + aside(240px) + gap(24px) = 360px */}
      <div className="max-w-6xl mx-auto lg:ml-[360px]">
        <main>
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold" style={{ color: BRAND.primary }}>Refeições</h1>
              <p className="text-sm mt-1 text-[#6b6b6b]">Lista expandível de itens por refeição — use o triângulo para abrir/fechar.</p>
            </div>

          </header>

          <div className="space-y-6">
            {MOCK_MEALS.map((m) => (
              <MealSection key={m.id} meal={m} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ----------------- Subcomponents ----------------- */

function SectionButton({ href, label, active = false }) {
  // block para ocupar 100% (garante que fique grudado à esquerda)
  const base = "w-full h-10 rounded-full px-4 flex items-center gap-3 text-sm transition-shadow";
  const classes = active ? "bg-[#2b6b4a] text-white shadow" : "bg-white/80 text-[#4b6a54] hover:shadow-md";

  return (
    <Link href={href} className={`${base} ${classes}`}>
      <span>{label}</span>
    </Link>
  );
}

function MealSection({ meal }) {
  const [open, setOpen] = useState(false);

  return (
    <section className={`rounded-2xl border ${open ? "border-[#e6d9e0] bg-[#fff4f8] shadow-lg" : "border-[#f0e6ef] bg-white"} transition-all p-6`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <motion.button
            aria-label={open ? "Fechar seção" : "Abrir seção"}
            onClick={() => setOpen((s) => !s)}
            className="w-9 h-9 flex items-center justify-center rounded-md bg-white/90 border border-gray-200 shadow-sm mr-2"
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5L19 12L8 19V5Z" fill="#2f6b46" />
            </svg>
          </motion.button>

          <div>
            <h2 className="text-2xl font-bold" style={{ color: BRAND.primary }}>{meal.title}</h2>
            <div className="mt-1 text-sm text-[#4b6a54]">{meal.totals.co2} <span className="mx-2">•</span> {meal.totals.water}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ImpactBadge label={meal.highlight.label} color={meal.highlight.color} img={meal.highlight.img} />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="mt-6 space-y-4 overflow-hidden"
          >
            {meal.items.map((it) => (
              <ExpandableMealItem key={it.id} item={it} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ExpandableMealItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-gray-100 p-5 bg-[#f6fff9]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-md overflow-hidden bg-white/60 flex items-center justify-center">
            <Image src={item.thumb} alt={item.name} width={64} height={64} />
          </div>

          <div>
            <div className="font-semibold text-[#2f6b46]">{item.name}</div>
            <div className="text-xs text-[#6b6b6b]">{item.qty}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {item.tags.map((t, i) => (
            <span key={i} className={`text-xs px-2 py-1 rounded-full border ${t === "alto" ? "bg-[#FFEEE8] border-[#FF9A7A] text-[#FF5A34]" : "bg-[#fff6e6] border-[#F0E2B9] text-[#B4862B]"}`}>
              {t === "alto" ? "Alta pegada" : t}
            </span>
          ))}

          <button onClick={() => setOpen((s) => !s)} className="text-sm px-3 py-1 rounded-md bg-white/90 border border-gray-200 text-[#4b6a54] shadow-sm">
            {open ? "Esconder" : "Detalhes"}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="mt-4 text-sm text-[#4b6a54] bg-white p-4 rounded-md border border-gray-50 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div>
                <div><strong>Emissões:</strong> {item.details.co2}</div>
                <div className="text-xs text-[#6b6b6b]">Água: {item.details.water}</div>
              </div>
              <div className="text-xs">
                <div className="font-semibold">Ingredientes</div>
                <ul className="text-xs text-[#6b6b6b] mt-1">
                  {item.details.ingredients.map((ing, i) => (
                    <li key={i}>• {ing}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <button className="text-xs px-3 py-1 rounded-md bg-[#B4CF66] text-white">Substituir</button>
              <button className="text-xs px-3 py-1 rounded-md bg-white border border-gray-200">Ver receita</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ImpactBadge({ label, color = "#F7DB75", img }) {
  return (
    <div className="flex items-center gap-3 rounded-lg p-2" style={{ background: color }}>
      <div className="w-14 h-12 rounded-md overflow-hidden bg-white/60 flex items-center justify-center">
        {img && <Image src={img} alt="badge" width={56} height={48} />}
      </div>
      <div className="text-xs font-semibold text-[#663F07] max-w-[160px]">{label}</div>
    </div>
  );
}
