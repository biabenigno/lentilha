'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MdDirectionsCar, MdShower, MdLandscape, MdDelete, MdFlight, MdWc, MdSportsTennis, MdSportsSoccer, MdRestaurant } from "react-icons/md";
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
import { getUserMeals, clearUserMeals, getFoodDetail, deleteUserMeal, getUserId } from "../../lib/api";
import { mapBackendFoodToUI, mapBackendDetailToUI } from "../../lib/foodMapper";

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
    case "dados insuficientes":
    case "insuficiente":
      return {
        colorClass: "bg-gray-400 grayscale",
        hexColor: "#9ca3af",
        textClass: "text-gray-400",
        lightBgClass: "bg-gray-50 border-gray-200",
        icon: "/labels/pegada-baixa.svg", // Will be grayed out
      };
    default:
      return {
        colorClass: "bg-gray-400",
        hexColor: "#9ca3af",
        textClass: "text-gray-400",
        lightBgClass: "bg-gray-50 border-gray-100",
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
  // Use white text if background is the dark green (#448040)
  const isDarkBg = color === "#448040";
  const textColor = isDarkBg ? "#FFFFFF" : "#663F07";

  return (
    <div
      className="flex items-center gap-3 rounded-lg p-2 transition-colors duration-300"
      style={{ background: color }}
    >
      <div className="w-14 h-12 rounded-md overflow-hidden bg-white/60 flex items-center justify-center">
        {img && img !== '/placeholder.png' ? (
          <Image src={img} alt="badge" width={56} height={48} className="object-cover" />
        ) : (
          <div className="text-[#448040] opacity-20"><MdLandscape size={24} /></div>
        )}
      </div>
      <div 
        className="text-xs font-bold max-w-[160px] leading-tight"
        style={{ color: textColor }}
      >
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

const levelToNumber = (lvl) => {
  if (!lvl) return 0;
  const l = lvl.toLowerCase();
  if (l === "baixa") return 1;
  if (l === "média" || l === "media") return 2;
  if (l === "alta") return 3;
  return 0;
};

const yTicks = [1, 2, 3];
const formatYTick = (tick) => {
  if (tick === 1) return "Baixa";
  if (tick === 2) return "Média";
  if (tick === 3) return "Alta";
  return "";
};


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

function EquivalenceCard({ icon, label, phrase, color }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-start gap-5 shadow-sm hover:shadow-md transition-all border-l-4" style={{ borderLeftColor: color.replace('bg-', '') }}>
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg ${color}`}>
        {icon}
      </div>
      <div className="flex flex-col gap-1 justify-center min-h-[56px]">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</span>
        <p className="text-[#146151] font-medium text-base leading-relaxed italic">
          "{phrase}"
        </p>
      </div>
    </div>
  );
}

function ExpandableMealItem({ item, testMode = "A", onDelete }) {
  const [open, setOpen] = useState(false);
  const impactStyles = getImpactStyles(item.impactLevel);

  const isAllGreen =
    item.co2Card?.impactLevel === "baixa" &&
    item.aguaCard?.impactLevel === "baixa" &&
    item.terraCard?.impactLevel === "baixa";

  // Simple check for suggestions
  const suggestion = item.alternativa && item.alternativa.length > 0 ? item.alternativa[0] : null;
  const showSuggestion = suggestion && !isAllGreen;

  // Equivalences Logic from Excel
  // carbon is in grams in DB, formulas expect kg
  const carbon = (item.rawCarbon || 0) / 1000;
  const water = item.rawWater || 0;
  const land = item.rawLand || 0;

  const formatPhrase = (val, standardPhrase) => {
    return val <= 0.0009 ? "O impacto é mínimo!" : standardPhrase;
  };

  const equivalents = testMode === "A" ? [
    {
      label: "Carbono",
      phrase: formatPhrase(carbon / 0.248, `Esse prato emitiu carbono equivalente a cerca de ${(carbon / 0.248).toFixed(1)} km de carro.`),
      icon: <MdDirectionsCar size={28} />,
      color: "bg-orange-500"
    },
    {
      label: "Água",
      phrase: formatPhrase(water / 9.46, `O consumo de água equivale a cerca de ${(water / 9.46).toFixed(1)} minutos de banho.`),
      icon: <MdShower size={28} />,
      color: "bg-blue-500"
    },
    {
      label: "Área",
      phrase: formatPhrase(land / 7140, `A área usada equivale a ${(land / 7140).toFixed(3)} campos de futebol.`),
      icon: <MdSportsSoccer size={28} />,
      color: "bg-green-600"
    }
  ] : [
    {
      label: "Carbono",
      phrase: formatPhrase((carbon / 0.207) * 1.609, `Esse alimento gerou impacto parecido com um trecho curto de avião de quase ${((carbon / 0.207) * 1.609).toFixed(1)} km.`),
      icon: <MdFlight size={28} />,
      color: "bg-sky-500"
    },
    {
      label: "Água",
      phrase: formatPhrase(water / 4.85, `Esse item consumiu água equivalente a ${(water / 4.85).toFixed(1)} descargas de vaso.`),
      icon: <MdWc size={28} />,
      color: "bg-indigo-500"
    },
    {
      label: "Área",
      phrase: formatPhrase(land / 260.8, `Esse impacto ocupou área parecida com ${(land / 260.8).toFixed(3)} quadras de tênis.`),
      icon: <MdSportsTennis size={28} />,
      color: "bg-lime-500"
    }
  ];

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

          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="font-bold text-[#2f6b46] text-lg leading-tight">{item.nome}</div>
              <ImpactPill level={item.impactLevel} />
            </div>
            <div className="text-xs font-medium text-[#6b6b6b] opacity-70">Porção de 100g</div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {onDelete && (
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(item.mealId); }}
              className="text-[#6b6b6b] hover:text-[#FF5A34] transition-colors p-2 rounded-full hover:bg-orange-50"
              title="Remover item"
            >
              <MdDelete size={20} />
            </button>
          )}

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
            <div className="flex flex-col gap-6 mt-2">
              {/* Top Section: Badges and Description 50/50 */}
              <div className="flex flex-col md:flex-row gap-6 items-stretch">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <MetricMiniCard
                    metric="CO₂"
                    total={item.co2Card?.mainValue}
                    icon={item.co2Card?.iconSrc}
                    level={item.co2Card?.impactLevel}
                  />
                  <MetricMiniCard
                    metric="Água"
                    total={item.aguaCard?.mainValue}
                    icon={item.aguaCard?.iconSrc}
                    level={item.aguaCard?.impactLevel}
                  />
                  <MetricMiniCard
                    metric="Terra"
                    total={item.terraCard?.mainValue}
                    icon={item.terraCard?.iconSrc}
                    level={item.terraCard?.impactLevel}
                  />
                </div>

                <div className="flex-1 bg-[#fcfaf8] border border-gray-100 rounded-xl p-5 flex flex-col justify-center">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                    Descrição do Preparo
                  </span>
                  <p className="text-sm font-medium text-[#4b6a54] leading-relaxed italic">
                    {item.descricao}
                  </p>
                </div>
              </div>

              {/* Suggestions (if any) */}
              {showSuggestion && (
                <div className="w-full bg-[#f0f9f3] border border-[#d2eadc] rounded-xl p-4 shadow-sm flex items-start gap-4">
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

              {/* Bottom Section: Equivalences 100% */}
              <div className="w-full bg-[#f8f9fa] rounded-2xl p-6 border border-gray-50">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-5 pl-1 text-center">
                  Equivalências de Impacto Ambiental (Modo {testMode})
                </span>
                <div className="flex flex-col gap-4">
                  {equivalents.map((eq, i) => (
                    <EquivalenceCard key={i} {...eq} />
                  ))}
                </div>
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
  const [testMode, setTestMode] = useState("A");

  useEffect(() => {
    // Initial load of test mode
    const saved = localStorage.getItem("lentilha-test-mode");
    if (saved) setTestMode(saved);

    const loadMeals = async () => {
      setIsLoading(true);
      try {
        const currentUserId = getUserId();
        const data = await getUserMeals(currentUserId);
        const mapped = (data.items || [])
          .map(meal => {
            const mappedFood = mapBackendFoodToUI(meal.food);
            if (!mappedFood) return null;
            return {
              ...mappedFood,
              mealId: meal.id,
              addedAt: meal.created_at
            };
          })
          .filter(Boolean);
        setItems(mapped);
      } catch (err) {
        console.error("Error loading meals:", err);
        setError("Erro ao carregar sua refeição do banco de dados.");
      } finally {
        setIsLoading(false);
      }
    };

    loadMeals();

    // Listener for sidebar toggle changes
    const handleModeChange = (e) => {
      setTestMode(e.detail);
      loadMeals(); // Reload on change
    };

    window.addEventListener('testModeChanged', handleModeChange);
    return () => window.removeEventListener('testModeChanged', handleModeChange);
  }, []);

  // Calculate real-time totals
  const totalCO2 = items.reduce((sum, it) => sum + (parseFloat(it.co2Card?.mainValue?.replace(/[^\d.]/g, '') || '0') || 0), 0) / 1000; // in kg
  const totalWater = items.reduce((sum, it) => sum + (parseFloat(it.aguaCard?.mainValue?.replace(/[^\d.]/g, '') || '0') || 0), 0);
  const totalLand = items.reduce((sum, it) => sum + (parseFloat(it.terraCard?.mainValue?.replace(/[^\d.]/g, '') || '0') || 0), 0);

  const [dynamicHighestImpact, setDynamicHighestImpact] = useState(null);

  useEffect(() => {
    async function loadHighestImpact() {
      if (items.length > 0) {
        const hItem = items.reduce((max, item) =>
          (parseFloat(item.co2Card?.mainValue?.replace(/[^\d.]/g, '') || '0') || 0) > (parseFloat(max.co2Card?.mainValue?.replace(/[^\d.]/g, '') || '0') || 0) ? item : max
          , items[0]);

        // Copy so we don't mutate state directly before set
        const completeItem = { ...hItem };

        try {
          // Busca os detalhes recheados com a sugestão recomendada (que passa pela nossa nova regra de prefixo de categoria)
          const detail = await getFoodDetail(hItem.id);
          if (detail && detail.lower_impact_suggestion) {
            const uiDetails = mapBackendDetailToUI(detail);
            completeItem.alternativa = uiDetails.alternativa;
          }
        } catch (e) {
          console.error("Failed to load suggestion for highest impact item", e);
        }

        setDynamicHighestImpact(completeItem);
      } else {
        setDynamicHighestImpact(null);
      }
    }

    // Only load if items change
    loadHighestImpact();
  }, [items]);

  const highestStyles = dynamicHighestImpact ? getImpactStyles(dynamicHighestImpact.impactLevel) : { hexColor: "#eee" };
  const highlightLabel = dynamicHighestImpact
    ? `${dynamicHighestImpact.nome} gerou a maior pegada (${dynamicHighestImpact.impactLevel})`
    : "Nenhum alimento adicionado";

  const handleClear = async () => {
    const success = await clearUserMeals(getUserId());
    if (success) {
      setItems([]);
    }
  };

  const handleDeleteItem = async (mealId) => {
    const success = await deleteUserMeal(mealId);
    if (success) {
      setItems(prevItems => prevItems.filter(item => item.mealId !== mealId));
    }
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen text-[#448040] font-bold text-base bg-[#f4f8f4]">Conectando ao banco de dados...</div>;

  return (
    <div className="min-h-screen p-6 pb-24 md:pb-12 bg-[#f4f8f4] font-sans relative">

      {/* Botão Flutuante de Limpar */}
      <button
        onClick={handleClear}
        className="fixed bottom-24 md:bottom-8 right-8 w-14 h-14 md:w-16 md:h-16 bg-[#FF5A34] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[90] group"
        title="Limpar Refeição"
      >
        <MdDelete size={32} />
        <span className="absolute right-20 bg-[#FF5A34] text-white px-3 py-1.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Limpar Almoço
        </span>
      </button>

      <div className="w-full px-4 md:px-10">
        <main className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start w-full">
          <div className={`w-full ${items.length > 0 ? "lg:w-1/2" : "max-w-2xl mx-auto"} flex flex-col`}>
            <section className="rounded-2xl bg-white border border-[#f0e6ef] p-4 md:p-8 shadow-lg w-full mb-6 lg:mb-0">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-lg md:text-xl font-extrabold" style={{ color: BRAND.primary }}>
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
                    <MdRestaurant size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black" style={{ color: BRAND.primary }}>
                      Meu Almoço
                    </h2>
                  </div>
                </div>

                {dynamicHighestImpact && (
                  <div className="flex items-center gap-3">
                    <ImpactBadge
                      label={highlightLabel}
                      color={highestStyles.hexColor}
                      img={dynamicHighestImpact.imagem}
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
                    <ExpandableMealItem key={it.mealId} item={it} testMode={testMode} onDelete={handleDeleteItem} />
                  ))
                )}
              </div>
            </section>
          </div>

          {items.length > 0 && (
            <div className="w-full lg:w-1/2 flex flex-col">
              <section className="rounded-2xl bg-white border border-[#f0e6ef] p-6 lg:p-8 shadow-lg w-full mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-[#448040] text-white flex items-center justify-center">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black" style={{ color: BRAND.primary }}>
                      Meu Impacto Real
                    </h2>
                    <p className="mt-1 text-sm" style={{ color: BRAND.mutedText }}>
                      Resumo calculado com base nas suas escolhas de hoje.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-8">
                  <div className="rounded-xl bg-[#f8fff6] p-4 md:p-6 shadow-sm xl:w-[35%] h-fit">
                    <h3 className="text-lg font-semibold mb-4" style={{ color: BRAND.primary }}>
                      Totais Acumulados
                    </h3>

                    <div className="space-y-4 text-[#4b6a54]">
                      <div>
                        <div className="text-xs text-[#6b6b6b]">Total de carbono:</div>
                        <strong className="text-base md:text-lg text-[#2f6b46]">{fmtKg(totalCO2)}</strong>
                      </div>
                      <div>
                        <div className="text-xs text-[#6b6b6b]">Total de água:</div>
                        <strong className="text-base md:text-lg text-[#2f6b46]">{fmtLit(totalWater)}</strong>
                      </div>
                      <div>
                        <div className="text-xs text-[#6b6b6b]">Total de terra:</div>
                        <strong className="text-base md:text-lg text-[#2f6b46]">{fmtM2(totalLand)}</strong>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-6">
                      {testMode === "A" ? (
                        <>
                          <MetricCard
                            icon={<MdDirectionsCar size={24} />}
                            title={`${(totalCO2 / 0.248).toFixed(1)} km`}
                            subtitle="Equivalente de carro"
                            bg={BRAND.orange}
                          />
                          <MetricCard
                            icon={<MdShower size={24} />}
                            title={`${(totalWater / 9.46).toFixed(0)} min`}
                            subtitle="Banho equivalente"
                            bg="#4A90E2"
                          />
                          <MetricCard
                            icon={<MdLandscape size={24} />}
                            title={`${(totalLand / 7140).toFixed(4)}`}
                            subtitle="Campos de futebol"
                            bg={BRAND.primary}
                          />
                        </>
                      ) : (
                        <>
                          <MetricCard
                            icon={<MdFlight size={24} />}
                            title={`${((totalCO2 / 0.207) * 1.609).toFixed(1)} km`}
                            subtitle="Distância de voo"
                            bg="#00bcd4"
                          />
                          <MetricCard
                            icon={<MdWc size={24} />}
                            title={`${(totalWater / 4.85).toFixed(0)} fluxos`}
                            subtitle="Descargas equivalentes"
                            bg="#673ab7"
                          />
                          <MetricCard
                            icon={<MdSportsTennis size={24} />}
                            title={`${(totalLand / 260.8).toFixed(1)}`}
                            subtitle="Quadras de tênis"
                            bg="#8bc34a"
                          />
                        </>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#f6fff9] p-4 md:p-6 shadow-sm xl:w-[65%] flex flex-col gap-6 overflow-hidden">

                    {/* CO2 Chart */}
                    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-50 flex flex-col gap-2 relative">
                      <div className="flex items-center justify-between mb-2">
                        <strong className="text-sm font-black uppercase tracking-widest" style={{ color: BRAND.primary }}>
                          Pegada de Carbono (gCO₂e)
                        </strong>
                      </div>
                      <div className="h-[140px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={items} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="nome" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
                            <YAxis ticks={yTicks} tickFormatter={formatYTick} domain={[0, 3.5]} tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                            <Bar dataKey={(it) => levelToNumber(it.co2Card?.impactLevel)} name="Nível de Impacto" fill={BRAND.orange} radius={[4, 4, 0, 0]} barSize={30} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Water Chart */}
                      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-50 flex flex-col gap-2 relative">
                        <div className="flex items-center justify-between mb-2">
                          <strong className="text-[11px] font-black uppercase tracking-widest text-[#3b82f6]">
                            Pegada Hídrica (L)
                          </strong>
                        </div>
                        <div className="h-[120px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={items} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                              <XAxis dataKey="nome" tick={{ fill: "#9ca3af", fontSize: 9 }} axisLine={false} tickLine={false} />
                              <YAxis ticks={yTicks} tickFormatter={formatYTick} domain={[0, 3.5]} tick={{ fill: "#9ca3af", fontSize: 9 }} axisLine={false} tickLine={false} />
                              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                              <Area type="monotone" dataKey={(it) => levelToNumber(it.aguaCard?.impactLevel)} name="Nível de Impacto" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Land Chart */}
                      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-50 flex flex-col gap-2 relative">
                        <div className="flex items-center justify-between mb-2">
                          <strong className="text-[11px] font-black uppercase tracking-widest" style={{ color: BRAND.accent }}>
                            Uso de Terra (m²)
                          </strong>
                        </div>
                        <div className="h-[120px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={items} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                              <XAxis dataKey="nome" tick={{ fill: "#9ca3af", fontSize: 9 }} axisLine={false} tickLine={false} />
                              <YAxis ticks={yTicks} tickFormatter={formatYTick} domain={[0, 3.5]} tick={{ fill: "#9ca3af", fontSize: 9 }} axisLine={false} tickLine={false} />
                              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                              <Line type="monotone" dataKey={(it) => levelToNumber(it.terraCard?.impactLevel)} name="Nível de Impacto" stroke={BRAND.primary} strokeWidth={2} dot={{ r: 3, fill: BRAND.primary, stroke: 'white' }} activeDot={{ r: 5 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    {/* Sugestões de Melhoria */}
                    {dynamicHighestImpact && (dynamicHighestImpact.impactLevel === "alta" || dynamicHighestImpact.impactLevel === "média") && (
                      <div className="bg-[#fffdf5] border border-[#fceabb] rounded-xl p-5 shadow-sm mt-2">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-full bg-[#FFAE3C] text-white flex items-center justify-center">
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" /></svg>
                          </div>
                          <h3 className="text-sm font-bold text-[#b3741b]">Oportunidade de Melhoria</h3>
                        </div>
                        <p className="text-sm text-[#8c5912] leading-relaxed mb-3">
                          O item <strong className="font-black">{dynamicHighestImpact.nome}</strong> representa uma grande parte do impacto na sua refeição (pegada <strong className="uppercase">{dynamicHighestImpact.impactLevel}</strong>).
                        </p>
                        {dynamicHighestImpact.alternativa?.[0] ? (
                          <div className="bg-white rounded-lg p-4 border border-[#fceabb] shadow-sm">
                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#448040] mb-1.5">
                              Experimente a Troca ({dynamicHighestImpact.categoria})
                            </div>
                            <div className="text-sm font-bold text-[#146151] mb-1.5">
                              Substituir por: {dynamicHighestImpact.alternativa[0].title}
                            </div>
                            <p className="text-xs text-[#4b6a54] leading-relaxed">
                              {dynamicHighestImpact.alternativa[0].description}
                            </p>
                          </div>
                        ) : (
                          <div className="bg-white rounded-lg p-4 border border-[#fceabb] shadow-sm">
                            <p className="text-xs text-[#4b6a54] leading-relaxed">
                              Considere reduzir levemente a porção deste item ou equilibrar a refeição adicionando mais vegetais e fontes de proteína de menor impacto, como leguminosas (feijão, ervilha, lentilha).
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
