'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MdDirectionsCar, MdShower, MdLandscape } from "react-icons/md";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";
import { getUserMeals } from "../../lib/api";
import { mapBackendFoodToUI } from "../../lib/foodMapper";

// Visual tokens
const BRAND = {
  primary: "#448040",
  primaryDark: "#146151",
  accent: "#B4CF66",
  orange: "#FF5A34",
  neutralText: "#2f6b46",
  mutedText: "#6b6b6b",
};

// --- LÓGICA DE IMPACTO CENTRALIZADA DAS REFEIÇÕES ---
const getImpactStyles = (level) => {
  const lowerLevel = (level || "média").toLowerCase();
  switch (lowerLevel) {
    case "baixa":
      return {
        colorClass: "bg-[#448040]",
        hexColor: "#448040",
        textClass: "text-[#448040]",
        lightBgClass: "bg-[#f2f8f2] border-[#cce0cc]",
        icon: "/labels/pegada-baixa.svg",
      };
    case "média":
      return {
        colorClass: "bg-[#FFAE3C]",
        hexColor: "#FFAE3C",
        textClass: "text-[#FFAE3C]",
        lightBgClass: "bg-[#fffdf5] border-[#fceabb]",
        icon: "/labels/pegada-media.svg",
      };
    case "alta":
      return {
        colorClass: "bg-[#FF5A34]",
        hexColor: "#FF5A34",
        textClass: "text-[#FF5A34]",
        lightBgClass: "bg-[#fff0eb] border-[#ffcdc2]",
        icon: "/labels/pegada-alta.svg",
      };
    default:
      return {
        colorClass: "bg-gray-500",
        hexColor: "#6b7280",
        textClass: "text-gray-500",
        lightBgClass: "bg-gray-50 border-gray-200",
        icon: "/labels/pegada-media.svg",
      };
  }
};

const ImpactPill = ({ level }) => {
  const { colorClass, icon } = getImpactStyles(level);
  const label = level.charAt(0).toUpperCase() + level.slice(1);
  return (
    <span
      className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 text-white font-medium ${colorClass}`}
    >
      <img src={icon} className="w-4 h-4" alt="impacto icon" />
      {label}
    </span>
  );
};

function ImpactBadge({ label, color = "#F7DB75", img }) {
  return (
    <div
      className="flex items-center gap-3 rounded-lg p-2"
      style={{ background: color }}
    >
      <div className="w-14 h-12 rounded-md overflow-hidden bg-white/60 flex items-center justify-center">
        {img && img !== '/placeholder.png' ? (
          <Image src={img} alt="badge" width={56} height={48} className="object-cover" />
        ) : (
          <div className="text-[#448040] opacity-20"><MdLandscape size={24} /></div>
        )}
      </div>
      <div className="text-xs font-semibold text-[#663F07] max-w-[160px]">
        {label}
      </div>
    </div>
  );
}

function MetricMiniCard({ metric, total, icon, level }) {
  const { colorClass, lightBgClass } = getImpactStyles(level);
  return (
    <div className={`${lightBgClass || "bg-gray-50 border-gray-100"} border p-3 rounded-xl flex flex-col items-center justify-center text-center gap-2 shadow-sm`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
         <img src={icon} className="w-5 h-5" alt="icon" />
      </div>
      <div>
         <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">{metric}</div>
         <div className="font-bold text-[#2f6b46] text-xs mt-0.5">{total}</div>
      </div>
    </div>
  );
}

const fmtKg = (v) =>
  `${Number(v).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} kg CO₂e`;
const fmtLit = (v) =>
  `${Number(v).toLocaleString("pt-BR", { maximumFractionDigits: 0 })} litros`;
const fmtM2 = (v) =>
  `${Number(v).toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} m²`;

function MetricCard({ icon, title, subtitle, bg = BRAND.primary }) {
  const styleBg = typeof bg === "string" ? { backgroundColor: bg } : undefined;
  return (
    <div
      className="rounded-lg p-3 text-white flex gap-3 items-start shadow-sm"
      style={styleBg}
    >
      <div className="p-2 rounded-md bg-white/10">{icon}</div>
      <div>
        <div className="text-sm font-bold">{title}</div>
        <div className="text-xs opacity-90 max-w-xs">{subtitle}</div>
      </div>
    </div>
  );
}

function ExpandableMealItem({ item }) {
  const [open, setOpen] = useState(false);
  const impactStyles = getImpactStyles(item.impactLevel);
  
  const isAllGreen = 
    item.co2Card.impactLevel === "baixa" && 
    item.aguaCard.impactLevel === "baixa" && 
    item.terraCard.impactLevel === "baixa";
    
  // Simple check for suggestions
  const suggestion = item.alternativa && item.alternativa.length > 0 ? item.alternativa[0] : null;
  const showSuggestion = suggestion && !isAllGreen;

  return (
    <div className={`rounded-xl border p-5 ${impactStyles.lightBgClass || "bg-[#f6fff9] border-gray-100"}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-md overflow-hidden bg-white/60 flex items-center justify-center shadow-sm relative">
            {item.imagem && item.imagem !== '/placeholder.png' ? (
              <Image src={item.imagem} alt={item.nome} fill className="object-cover" />
            ) : (
              <div className="text-[#448040] opacity-30"><MdLandscape size={32} /></div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <div className="font-semibold text-[#2f6b46] text-lg">{item.nome}</div>
              <ImpactPill level={item.impactLevel} />
            </div>
            <div className="text-sm text-[#6b6b6b]">Porção de 100g</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs px-2 py-1 rounded-full border bg-[#fff6e6] border-[#F0E2B9] text-[#B4862B]">
            Geral
          </span>

          <button
            onClick={() => setOpen((s) => !s)}
            className="text-sm px-4 py-1.5 rounded-md bg-white border border-gray-300 text-[#4b6a54] shadow-sm hover:bg-gray-50 transition-colors"
          >
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
            className="mt-4 text-sm text-[#4b6a54] bg-white p-5 rounded-md border border-gray-100 overflow-hidden shadow-inner"
          >
            <div className="flex flex-col md:flex-row gap-6 mt-2">
              <div className="flex-1 grid grid-cols-3 gap-3">
                <MetricMiniCard 
                  metric="CO₂" 
                  total={item.co2Card.mainValue} 
                  icon={item.co2Card.iconSrc} 
                  level={item.co2Card.impactLevel} 
                />
                <MetricMiniCard 
                  metric="Água" 
                  total={item.aguaCard.mainValue} 
                  icon={item.aguaCard.iconSrc} 
                  level={item.aguaCard.impactLevel} 
                />
                <MetricMiniCard 
                  metric="Terra" 
                  total={item.terraCard.mainValue} 
                  icon={item.terraCard.iconSrc} 
                  level={item.terraCard.impactLevel} 
                />
              </div>

              <div className="w-full md:w-[45%] flex flex-col gap-3">
                <div className="bg-[#fcfaf8] border border-gray-100 rounded-xl p-4">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Descrição
                  </span>
                  <p className="text-sm font-medium text-[#4b6a54] mt-1 line-clamp-2 leading-relaxed">
                    {item.descricao}
                  </p>
                </div>
                
                {showSuggestion && (
                  <div className="bg-[#f0f9f3] border border-[#d2eadc] rounded-xl p-4 shadow-sm flex items-start gap-4">
                    <div className="flex-1">
                      <span className="text-[11px] font-bold text-[#448040] uppercase flex items-center gap-1.5 mb-1.5">
                         Alternativa Recomendada
                      </span>
                      <strong className="text-sm text-[#146151] block leading-tight">
                         {suggestion.title}
                      </strong>
                      <p className="text-[11.5px] text-[#2f6b46] mt-1.5 leading-relaxed opacity-90">
                         {suggestion.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AlmocoPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMeals() {
      setIsLoading(true);
      try {
        const data = await getUserMeals(1); // Hardcoded user 1
        const mapped = (data.items || []).map(meal => {
          // Wrap backend food with our UI mapper
          const mappedFood = mapBackendFoodToUI(meal.food);
          return {
            ...mappedFood,
            mealId: meal.id,
            addedAt: meal.created_at
          };
        });
        setItems(mapped);
      } catch (err) {
        console.error("Error loading meals:", err);
        setError("Erro ao carregar sua refeição do banco de dados.");
      } finally {
        setIsLoading(false);
      }
    }
    loadMeals();
  }, []);

  // Calculate real-time totals
  const totalCO2 = items.reduce((sum, it) => sum + (parseFloat(it.co2Card.mainValue.replace(/[^\d.]/g, '')) || 0), 0) / 1000; // in kg
  const totalWater = items.reduce((sum, it) => sum + (parseFloat(it.aguaCard.mainValue.replace(/[^\d.]/g, '')) || 0), 0);
  const totalLand = items.reduce((sum, it) => sum + (parseFloat(it.terraCard.mainValue.replace(/[^\d.]/g, '')) || 0), 0);

  const highestImpactItem = items.length > 0 
    ? items.reduce((max, item) => 
        (parseFloat(item.co2Card.mainValue.replace(/[^\d.]/g, '')) || 0) > (parseFloat(max.co2Card.mainValue.replace(/[^\d.]/g, '')) || 0) ? item : max
      , items[0])
    : null;

  const highestStyles = highestImpactItem ? getImpactStyles(highestImpactItem.impactLevel) : { hexColor: "#eee" };
  const highlightLabel = highestImpactItem 
    ? `${highestImpactItem.nome} gerou a maior pegada (${highestImpactItem.impactLevel})`
    : "Nenhum alimento adicionado";

  if (isLoading) return <div className="flex items-center justify-center min-h-screen text-[#448040] font-bold text-xl bg-[#f4f8f4]">Conectando ao banco de dados...</div>;

  return (
    <div className="min-h-screen p-6 bg-[#f4f8f4] font-sans relative">
      <div className="w-full lg:pl-[120px] pr-6 lg:pr-10">
        <main className="flex flex-col lg:flex-row gap-8 items-start w-full">
          <div className="w-full lg:w-1/2 flex flex-col">
          <section className="rounded-2xl bg-white border border-[#f0e6ef] p-6 lg:p-8 shadow-lg w-full mb-10 lg:mb-0">
             <div className="flex items-start justify-between mb-8">
               <div>
                 <h2 className="text-3xl font-extrabold" style={{ color: BRAND.primary }}>
                   Refeição: Almoço
                 </h2>
                 <p className="mt-2 text-sm" style={{ color: BRAND.mutedText }}>
                   Detalhes reais dos alimentos consumidos hoje no almoço.
                 </p>
               </div>
             </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#448040] text-white flex items-center justify-center">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: BRAND.primary }}>
                    Seu Almoço
                  </h2>
                  <div className="mt-1 text-sm text-[#4b6a54]">
                    {fmtKg(totalCO2)} <span className="mx-2">•</span>{" "}
                    {fmtLit(totalWater)}
                  </div>
                </div>
              </div>

              {highestImpactItem && (
                <div className="flex items-center gap-3">
                  <ImpactBadge
                    label={highlightLabel}
                    color={highestStyles.hexColor}
                    img={highestImpactItem.imagem}
                  />
                </div>
              )}
            </div>

            <div className="mt-6 space-y-4">
              {items.length === 0 ? (
                <div className="p-10 text-center border-2 border-dashed border-gray-100 rounded-xl text-gray-400">
                  <p>Você ainda não adicionou alimentos ao seu almoço.</p>
                  <Link href="/pesquisa" className="text-[#448040] font-bold hover:underline mt-2 block">
                    Ir para Pesquisa
                  </Link>
                </div>
              ) : (
                items.map((it) => (
                  <ExpandableMealItem key={it.mealId} item={it} />
                ))
              )}
            </div>
          </section>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col">
            <section className="rounded-2xl bg-white border border-[#f0e6ef] p-6 lg:p-8 shadow-lg w-full">
             <div className="flex items-start justify-between mb-8">
               <div>
                 <h2 className="text-3xl font-extrabold" style={{ color: BRAND.primary }}>
                   Meu Impacto Real
                 </h2>
                 <p className="mt-2 text-sm" style={{ color: BRAND.mutedText }}>
                   Resumo calculado com base nas suas escolhas de hoje.
                 </p>
               </div>
             </div>

             <div className="flex flex-col xl:flex-row gap-8">
               <div className="rounded-xl bg-[#f8fff6] p-6 shadow-sm xl:w-[35%] h-fit">
                 <h3 className="text-xl font-semibold mb-4" style={{ color: BRAND.primary }}>
                   Totais Acumulados
                 </h3>

                 <div className="space-y-4 text-[#4b6a54]">
                   <div>
                     <div className="text-sm text-[#6b6b6b]">Total de carbono:</div>
                     <strong className="text-xl text-[#2f6b46]">{fmtKg(totalCO2)}</strong>
                   </div>
                   <div>
                     <div className="text-sm text-[#6b6b6b]">Total de água:</div>
                     <strong className="text-xl text-[#2f6b46]">{fmtLit(totalWater)}</strong>
                   </div>
                   <div>
                     <div className="text-sm text-[#6b6b6b]">Total de terra:</div>
                     <strong className="text-xl text-[#2f6b46]">{fmtM2(totalLand)}</strong>
                   </div>
                 </div>

                 <div className="mt-8 space-y-5">
                   <MetricCard
                     icon={<MdDirectionsCar size={24} />}
                     title={`${(totalCO2 * 5.5).toFixed(1)} km`}
                     subtitle="Equivalente de carro"
                     bg={BRAND.orange}
                   />
                   <MetricCard
                     icon={<MdShower size={24} />}
                     title={`${(totalWater / 15).toFixed(1)}h`}
                     subtitle="Horas de chuveiro"
                     bg={BRAND.primary}
                   />
                   <MetricCard
                     icon={<MdLandscape size={24} />}
                     title={`${(totalLand / 50).toFixed(1)} apt.`}
                     subtitle="Área de apartamento"
                     bg={BRAND.accent}
                   />
                 </div>
               </div>

               <div className="rounded-xl bg-[#f6fff9] p-6 shadow-sm xl:w-[65%] flex flex-col gap-6">
                 {/* Charts remain similar but could be tied to state if expanded further */}
                 <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <strong className="text-base" style={{ color: BRAND.primary }}>
                        Impacto CO₂e por item
                      </strong>
                    </div>
                    <div className="min-h-[220px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={items} margin={{ top: 8, right: 8, left: 0, bottom: 6 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                          <XAxis dataKey="nome" tick={{ fill: BRAND.primaryDark, fontSize: 11 }} />
                          <YAxis tick={{ fill: "#6b6b6b" }} />
                          <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                          <Bar dataKey={(it) => parseFloat(it.co2Card.mainValue.replace(/[^\d.]/g, ''))} name="gCO2e" fill={BRAND.primary} radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                 </div>
               </div>
             </div>
           </section>
          </div>
        </main>
      </div>
    </div>
  );
}
