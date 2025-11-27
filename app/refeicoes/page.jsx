// app/refeicoes/page.jsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
// ⬅️ IMPORTANDO O NOVO COMPONENTE DA BARRA LATERAL SECUNDÁRIA
import SecondarySidebar from "../../components/secondarySidebar";

// Visual tokens
const BRAND = {
  primary: "#448040",
  primaryDark: "#146151",
  accent: "#B4CF66",
  orange: "#FF5A34",
  neutralText: "#2f6b46",
  mutedText: "#6b6b6b",
};

// --- LÓGICA DE IMPACTO CENTRALIZADA ---

// Função auxiliar para obter classes de estilo com base no nível de impacto
const getImpactStyles = (level) => {
  const lowerLevel = (level || 'média').toLowerCase();
  switch (lowerLevel) {
    case 'baixa':
      return { colorClass: 'bg-[#448040]', textClass: 'text-[#448040]', icon: '/labels/pegada-baixa.svg' };
    case 'média':
      return { colorClass: 'bg-[#FFAE3C]', textClass: 'text-[#FFAE3C]', icon: '/labels/pegada-media.svg' };
    case 'alta':
      return { colorClass: 'bg-[#FF5A34]', textClass: 'text-[#FF5A34]', icon: '/labels/pegada-alta.svg' };
    default:
      return { colorClass: 'bg-gray-500', textClass: 'text-gray-500', icon: '/labels/pegada-media.svg' };
  }
};

// Função auxiliar para mapear o nome do alimento aos seus dados de impacto (geral e por métrica)
const getImpactData = (itemName) => {
  const map = {
    "Sanduíche de Queijo e Presunto": { level: "média", co2: { level: "média", icon: "/labels/custo-co2-medio.svg" }, agua: { level: "média", icon: "/labels/custo-agua-medio.svg" }, terra: { level: "baixa", icon: "/labels/custo-terra-bom.svg" } },
    "Café com leite c/ adoçante": { level: "baixa", co2: { level: "baixa", icon: "/labels/custo-co2-bom.svg" }, agua: { level: "baixa", icon: "/labels/custo-agua-bom.svg" }, terra: { level: "baixa", icon: "/labels/custo-terra-bom.svg" } },
    "Suco de laranja": { level: "baixa", co2: { level: "baixa", icon: "/labels/custo-co2-bom.svg" }, agua: { level: "baixa", icon: "/labels/custo-agua-bom.svg" }, terra: { level: "média", icon: "/labels/custo-terra-medio.svg" } },
    "Arroz branco": { level: "baixa", co2: { level: "baixa", icon: "/labels/custo-co2-bom.svg" }, agua: { level: "baixa", icon: "/labels/custo-agua-bom.svg" }, terra: { level: "baixa", icon: "/labels/custo-terra-bom.svg" } },
    "Bisteca bovina": { level: "alta", co2: { level: "alta", icon: "/labels/custo-co2-ruim.svg" }, agua: { level: "alta", icon: "/labels/custo-agua-ruim.svg" }, terra: { level: "alta", icon: "/labels/custo-terra-ruim.svg" } },
    "Salada verde": { level: "baixa", co2: { level: "baixa", icon: "/labels/custo-co2-bom.svg" }, agua: { level: "baixa", icon: "/labels/custo-agua-bom.svg" }, terra: { level: "baixa", icon: "/labels/custo-terra-bom.svg" } },
    "Feijão": { level: "baixa", co2: { level: "baixa", icon: "/labels/custo-co2-bom.svg" }, agua: { level: "baixa", icon: "/labels/custo-agua-bom.svg" }, terra: { level: "baixa", icon: "/labels/custo-terra-bom.svg" } },
    "Coxinha": { level: "média", co2: { level: "média", icon: "/labels/custo-co2-medio.svg" }, agua: { level: "média", icon: "/labels/custo-agua-medio.svg" }, terra: { level: "baixa", icon: "/labels/custo-terra-bom.svg" } },
    "Suco natural": { level: "baixa", co2: { level: "baixa", icon: "/labels/custo-co2-bom.svg" }, agua: { level: "baixa", icon: "/labels/custo-agua-bom.svg" }, terra: { level: "média", icon: "/labels/custo-terra-medio.svg" } },
    "Pão de queijo": { level: "baixa", co2: { level: "baixa", icon: "/labels/custo-co2-bom.svg" }, agua: { level: "média", icon: "/labels/custo-agua-medio.svg" }, terra: { level: "baixa", icon: "/labels/custo-terra-bom.svg" } },
    "Cheeseburger": { level: "alta", co2: { level: "alta", icon: "/labels/custo-co2-ruim.svg" }, agua: { level: "média", icon: "/labels/custo-agua-medio.svg" }, terra: { level: "alta", icon: "/labels/custo-terra-ruim.svg" } },
    "Batata frita": { level: "média", co2: { level: "baixa", icon: "/labels/custo-co2-bom.svg" }, agua: { level: "média", icon: "/labels/custo-agua-medio.svg" }, terra: { level: "baixa", icon: "/labels/custo-terra-bom.svg" } },
    "Refrigerante": { level: "baixa", co2: { level: "baixa", icon: "/labels/custo-co2-bom.svg" }, agua: { level: "baixa", icon: "/labels/custo-agua-bom.svg" }, terra: { level: "baixa", icon: "/labels/custo-terra-bom.svg" } },
  };
  return map[itemName] || { level: "média", co2: { level: "média", icon: "/labels/custo-co2-medio.svg" }, agua: { level: "média", icon: "/labels/custo-agua-medio.svg" }, terra: { level: "média", icon: "/labels/custo-terra-medio.svg" } };
};

// Componente para a pílula de impacto geral
const ImpactPill = ({ level }) => {
  const { colorClass, icon } = getImpactStyles(level);
  const label = level.charAt(0).toUpperCase() + level.slice(1);
  return (
    <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 text-white font-medium ${colorClass}`}>
      <img src={icon} className="w-4 h-4" alt="impacto icon" />
      {label}
    </span>
  );
};

// Componente para o selo de impacto detalhado (usado nos detalhes)
const ImpactDetailBadge = ({ metric, level, iconSrc }) => {
  const { colorClass } = getImpactStyles(level);
  const label = level.charAt(0).toUpperCase() + level.slice(1);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`}>
        <img src={iconSrc} className="w-5 h-5" alt={`${metric} icon`} />
      </div>
      <span className="text-xs text-[#6b6b6b] capitalize">{label} {metric}</span>
    </div>
  );
};
// --- FIM DA LÓGICA DE IMPACTO CENTRALIZADA ---


// Dados corrigidos e calculados com base nos arquivos CSV (Tab_Preparacoes_100g_2018.csv)
const MOCK_MEALS = [
  {
    id: "cafe",
    title: "Café da manhã",
    // CF: ~793.13 g CO₂e | WF: ~682.34 L | EF: ~4.86 g-m²
    totals: {
      co2: "~793.1 g CO₂e",
      water: "~682.3 L"
    },
    highlight: {
      label: "O sanduíche de queijo e presunto gerou a maior pegada de carbono",
      color: "#F7DB75",
      img: "/mussarela.png"
    },
    items: [
      {
        id: 1,
        name: "Sanduíche de Queijo e Presunto",
        qty: "100g",
        thumb: "/alimentos/pao-queijo-presunto.png",
        tags: ["Suínos", "Laticínios"],
        details: {
          // Sanduíche, pão francês, c/ presunto e queijo prato. Valor 100g
          co2: "523.79 gCO₂e",
          water: "439.02 L",
          terra: "1.80 g-m²", // ⬅️ Adicionado EF
          ingredients: ["Pão Francês", "Presunto", "Queijo Prato"]
        }
      },
      {
        id: 2,
        name: "Café com leite c/ adoçante",
        qty: "200g",
        thumb: "/alimentos/cafe.jpeg",
        tags: ["Bebidas", "Laticínios"],
        details: {
          // Bebida, café - infusão 8%, c/ leite (meio a meio), s/ açúcar. Calculado para 200g.
          co2: "139.34 gCO₂e",
          water: "138.34 L",
          terra: "0.86 g-m²", // ⬅️ Adicionado EF (0.431 * 2)
          ingredients: ["Café", "Leite Integral", "Adoçante"]
        }
      },
      {
        id: 3,
        name: "Suco de laranja",
        qty: "200g",
        thumb: "/alimentos/suco.jpg",
        tags: ["Frutas"],
        details: {
          // Suco, laranja, s/ açúcar. Calculado para 200g.
          co2: "130.00 gCO₂e",
          water: "104.98 L",
          terra: "2.20 g-m²", // ⬅️ Adicionado EF (1.1 * 2)
          ingredients: ["Laranja"]
        }
      },
    ],
  },
  {
    id: "almoco",
    title: "Almoço",
    // CF: ~10,472.68 g CO₂e | WF: ~6,864.00 L | EF: ~41.92 g-m²
    totals: {
      co2: "~10.5 kg CO₂e",
      water: "~6.9k L"
    },
    highlight: {
      label: "A Bisteca Bovina gerou a maior pegada (Alta)",
      color: "#FF8E6B",
      img: "/bisteca.png"
    },
    items: [
      {
        id: 1,
        name: "Arroz branco",
        qty: "150g",
        thumb: "/arroz.png",
        tags: ["Cereais"],
        details: {
          // Arroz, polido, cozido. Calculado para 150g.
          co2: "151.20 gCO₂e",
          water: "81.85 L",
          terra: "0.59 g-m²", // ⬅️ Adicionado EF (0.391 * 1.5)
          ingredients: ["Arroz Polido", "Óleo", "Alho/Cebola"]
        }
      },
      {
        id: 2,
        name: "Bisteca bovina",
        qty: "220g",
        thumb: "/bisteca.png",
        tags: ["Bovinos"],
        details: {
          // Carne, boi, costela, assada, s/ óleo. Calculado para 220g.
          co2: "10,235.18 gCO₂e",
          water: "6,627.17 L",
          terra: "40.50 g-m²", // ⬅️ Adicionado EF (18.411 * 2.2)
          ingredients: ["Carne Bovina (Costela)"]
        }
      },
      {
        id: 3,
        name: "Salada verde",
        qty: "80g",
        thumb: "/salada.png",
        tags: ["Vegetais"],
        details: {
          // Salada, vegetais crus, s/ óleo. Calculado para 80g.
          co2: "46.53 gCO₂e",
          water: "23.94 L",
          terra: "0.58 g-m²", // ⬅️ Adicionado EF (0.719 * 0.8)
          ingredients: ["Alface", "Tomate", "Cebola"]
        }
      },
      {
        id: 4,
        name: "Feijão",
        qty: "100g",
        thumb: "/feijao.png",
        tags: ["Leguminosas"],
        details: {
          // Feijão, carioca, cozido (50% grão e 50% caldo), c/ óleo. Calculado para 100g.
          co2: "39.77 gCO₂e",
          water: "131.04 L",
          terra: "0.25 g-m²", // ⬅️ Adicionado EF (0.250 * 1)
          ingredients: ["Feijão Carioca", "Óleo", "Alho/Cebola"]
        }
      },
    ],
  },
  {
    id: "lanche",
    title: "Lanche da tarde",
    // CF: ~655.15 g CO₂e | WF: ~507.15 L | EF: ~4.46 g-m²
    totals: {
      co2: "~655.2 g CO₂e",
      water: "~507.2 L"
    },
    highlight: {
      label: "A Coxinha gerou a maior pegada de carbono (Média)",
      color: "#F7DB75",
      img: "/alimentos/coxinha.png"
    },
    items: [
      {
        id: 1,
        name: "Coxinha",
        qty: "120g",
        thumb: "/coxinha.png",
        tags: ["Industrializado"],
        details: {
          // Coxinha de frango, industrializada, frita. Calculado para 120g.
          co2: "443.42 gCO₂e",
          water: "207.62 L",
          terra: "1.26 g-m²", // ⬅️ Adicionado EF (1.05 * 1.2)
          ingredients: ["Frango", "Massa", "Fritura"]
        }
      },
      {
        id: 2,
        name: "Suco natural",
        qty: "250g",
        thumb: "/suco2.png",
        tags: ["Frutas"],
        details: {
          // Suco, laranja, s/ açúcar (melhor similaridade). Calculado para 250g.
          co2: "162.50 gCO₂e",
          water: "131.22 L",
          terra: "2.75 g-m²", // ⬅️ Adicionado EF (1.1 * 2.5)
          ingredients: ["Fruta fresca"]
        }
      },
      {
        id: 3,
        name: "Pão de queijo",
        qty: "90g",
        thumb: "/paoqueijo.png",
        tags: ["Laticínios"],
        details: {
          // Pão, de queijo, industrializado, assado. Calculado para 90g.
          co2: "49.23 gCO₂e",
          water: "168.31 L",
          terra: "0.45 g-m²", // ⬅️ Adicionado EF (0.5 * 0.9)
          ingredients: ["Queijo", "Polvilho", "Ovo"]
        }
      },
    ],
  },
  {
    id: "jantar",
    title: "Jantar",
    // CF: ~2,836.39 g CO₂e | WF: ~1,905.82 L | EF: ~11.46 g-m²
    totals: {
      co2: "~2.8 kg CO₂e",
      water: "~1.9k L"
    },
    highlight: {
      label: "O Cheeseburger gerou a maior pegada (Alta)",
      color: "#FF8E6B",
      img: "/alimentos/cheeseburger.png"
    },
    items: [
      {
        id: 1,
        name: "Cheeseburger",
        qty: "250g",
        thumb: "/cheeseburger.png",
        tags: ["Bovinos"],
        details: {
          // Sanduíche, cheeseburguer, c/ queijo prato. Calculado para 250g.
          co2: "2,491.00 gCO₂e",
          water: "1,562.95 L",
          terra: "9.65 g-m²", // ⬅️ Adicionado EF (3.858 * 2.5)
          ingredients: ["Pão", "Carne Bovina", "Queijo"]
        }
      },
      {
        id: 2,
        name: "Batata frita",
        qty: "150g",
        thumb: "/batata.png",
        tags: ["Vegetais", "Industrializado"],
        details: {
          // Batata, inglesa, frita, c/ sal. Calculado para 150g.
          co2: "104.76 gCO₂e",
          water: "185.37 L",
          terra: "1.11 g-m²", // ⬅️ Adicionado EF (0.743 * 1.5)
          ingredients: ["Batata Inglesa", "Óleo de Fritura"]
        }
      },
      {
        id: 3,
        name: "Refrigerante",
        qty: "350g",
        thumb: "/refrigerante.png",
        tags: ["Bebidas"],
        details: {
          // Refrigerante, tipo cola, regular, c/ açúcar. Calculado para 350g.
          co2: "240.63 gCO₂e",
          water: "157.50 L",
          terra: "0.70 g-m²", // ⬅️ Adicionado EF (0.2 * 3.5)
          ingredients: ["Água", "Xarope de Açúcar", "Aromatizantes"]
        }
      },
    ],
  },
];


export default function Page() {
  return (
    // wrapper relativo (não necessário, mas mantém semântica)
    <div className="min-h-screen p-6 bg-[#f3eef6] font-sans relative">
      {/* ⬅️ NOVO COMPONENTE: ASIDE LATERAL FIXO (Substituindo o bloco <aside> original) */}
      <SecondarySidebar />

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

// ⬅️ SectionButton removido

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

  // 💡 Obtenção dos dados de impacto para o item atual
  const impactData = getImpactData(item.name);

  return (
    <div className="rounded-xl border border-gray-100 p-5 bg-[#f6fff9]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-md overflow-hidden bg-white/60 flex items-center justify-center">
            <Image src={item.thumb} alt={item.name} width={64} height={64} />
          </div>

          <div className="flex items-center gap-3"> {/* Wrapper para nome e selo */}
            <div className="font-semibold text-[#2f6b46]">{item.name}</div>

            {/* 💡 SELO DE IMPACTO GERAL AO LADO DO NOME DO ALIMENTO */}
            <ImpactPill level={impactData.level} />

            <div className="text-xs text-[#6b6b6b]">{item.qty}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {item.tags.map((t, i) => (
            <span key={i} className={`text-xs px-2 py-1 rounded-full border bg-[#fff6e6] border-[#F0E2B9] text-[#B4862B]`}>
              {t}
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
            <div className="flex items-start justify-between">

              {/* Coluna de Valores Principais e Selos Detalhados */}
              <div className="flex flex-col gap-4">

                {/* 💡 SELOS DE IMPACTO DETALHADO */}
                <div className="flex gap-4">
                  <ImpactDetailBadge
                    metric="carbono"
                    level={impactData.co2.level}
                    iconSrc={impactData.co2.icon}
                  />
                  <ImpactDetailBadge
                    metric="água"
                    level={impactData.agua.level}
                    iconSrc={impactData.agua.icon}
                  />
                  <ImpactDetailBadge
                    metric="terra"
                    level={impactData.terra.level}
                    iconSrc={impactData.terra.icon}
                  />
                </div>

                <hr className="mb-4 mt-4" />
                {/* Valores */}
                <div>
                  <div><strong>Emissões (CO₂e):</strong> {item.details.co2}</div>
                  <div><strong>Ocupação de Terra (EF):</strong> {item.details.terra}</div>
                  <div className="text-xs text-[#6b6b6b]">Água (WF): {item.details.water}</div>
                </div>
              </div>

              {/* Coluna de Ingredientes */}
              <div className="text-base">
                <div className="font-semibold">Ingredientes</div>
                <ul className="text-sm text-[#6b6b6b] mt-1">
                  {item.details.ingredients.map((ing, i) => (
                    <li key={i}>• {ing}</li>
                  ))}
                </ul>
              </div>
            </div>
            <hr className="mb-4 mt-4" />
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