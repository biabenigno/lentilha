// app/resumo/page.jsx
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

/**
 * Página /resumo — com filtro dropdown (Dia / Semana / Mês / Ano)
 * - O dropdown fica à direita do título "Resumo" (dentro do card)
 * - Alterar o período multiplica os dados conforme:
 *    Dia -> x1, Semana -> x7, Mês -> x30, Ano -> x365
 *
 * Observação: precisa do `recharts` instalado:
 *   npm i recharts
 */

const BRAND = {
  primary: "#448040",
  primaryDark: "#146151",
  accent: "#B4CF66",
  orange: "#FF5A34",
  neutralText: "#2f6b46",
  mutedText: "#6b6b6b",
};

const PERIODS = {
  Dia: 1,
  Semana: 7,
  Mês: 30,
  Ano: 365,
};

export default function Page() {
  // seleção de período
  const [period, setPeriod] = useState("Dia");

  // interação com gráficos
  const [selectedCO2, setSelectedCO2] = useState(null);
  const [selectedWater, setSelectedWater] = useState(null);
  const [selectedLand, setSelectedLand] = useState(null);

  // base (diária) — valores numéricos para escalar
  const base = useMemo(
    () => ({
      totals: {
        co2e: 15.7, // kg
        water: 12218.7, // litros
        land: 63.2, // m²
      },
      // dados "por categoria" (CO2) — base diária
      co2Categories: [
        { name: "Proteína", Média: 1500, Você: 4800 },
        { name: "Laticínios", Média: 900, Você: 1200 },
        { name: "Cereais", Média: 600, Você: 800 },
      ],
      // série temporal de água (últimos 7 dias) - usamos a mesma estrutura, mas multiplicamos
      waterSeries: [
        { day: "Seg", litros: 1200 },
        { day: "Ter", litros: 1800 },
        { day: "Qua", litros: 900 },
        { day: "Qui", litros: 2100 },
        { day: "Sex", litros: 1400 },
        { day: "Sáb", litros: 2600 },
        { day: "Dom", litros: 2400 },
      ],
      // uso de terra por refeição (base)
      landByMeal: [
        { meal: "Café", m2: 12 },
        { meal: "Almoço", m2: 28 },
        { meal: "Lanche", m2: 6 },
        { meal: "Jantar", m2: 17 },
      ],
      // métricas derivadas (carro km, horas banho, aptos) - base diária
      metrics: {
        carroKm: 82,
        banhoHoras: 21,
        areaApto: 1,
      },
    }),
    []
  );

  const multiplier = PERIODS[period] ?? 1;

  // gera os dados escalados conforme o período selecionado
  const scaled = useMemo(() => {
    // totals (format later)
    const totals = {
      co2e: base.totals.co2e * multiplier,
      water: base.totals.water * multiplier,
      land: base.totals.land * multiplier,
    };

    // co2 categories scaled
    const co2Data = base.co2Categories.map((d) => ({
      name: d.name,
      Média: Math.round(d.Média * multiplier),
      Você: Math.round(d.Você * multiplier),
    }));

    // water series scaled (we'll scale each day by multiplier; for "Dia" this will just be base)
    const waterData = base.waterSeries.map((d) => ({
      day: d.day,
      litros: Math.round(d.litros * multiplier),
    }));

    // land scaled
    const landData = base.landByMeal.map((d) => ({
      meal: d.meal,
      m2: Math.round(d.m2 * multiplier * 10) / 10, // keep one decimal
    }));

    // metrics scaled (we'll show proportional values for illustration)
    const metrics = {
      carroKm: Math.round(base.metrics.carroKm * multiplier),
      banhoHoras: Math.round(base.metrics.banhoHoras * multiplier),
      areaApto: Math.round(base.metrics.areaApto * multiplier * 10) / 10,
    };

    return { totals, co2Data, waterData, landData, metrics };
  }, [base, multiplier]);

  // helper formatting
  const fmtKg = (v) => `${Number(v).toLocaleString("pt-BR")} kg CO₂e`;
  const fmtLit = (v) => `${Number(v).toLocaleString("pt-BR")} litros`;
  const fmtM2 = (v) => `${Number(v).toLocaleString("pt-BR")} m²`;

  return (
    <div className="min-h-full w-full font-sans bg-[#f3eef6] p-6">
      <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
        {/* Coluna lateral interna */}
        <aside className="w-full lg:w-[240px] flex-shrink-0 flex flex-col items-start gap-6">
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center shadow">
              <Image src="/avatar.png" alt="avatar" width={72} height={72} className="object-cover rounded-full" />
            </div>
            <div>
              <p className="text-xs text-[#6b6b6b]">Seja bem-vinda,</p>
              <p className="text-lg font-semibold" style={{ color: BRAND.primary }}>
                Fernanda
              </p>
            </div>
          </div>

          <nav className="w-full space-y-3">
            <SectionButton href="/perfil/editar" label="Editar perfil" />
            <SectionButton href="/resumo" label="Resumo - meu impacto" active />
            <SectionButton href="/refeicoes" label="Refeições" />
            <SectionButton href="/configuracoes" label="Configurações" />
            <SectionButton href="/sair" label="Sair" />
          </nav>
        </aside>

        {/* Main CARD */}
        <main className="flex-1 rounded-2xl bg-[#fff4f8] border border-[#f0e6ef] p-6 lg:p-10 shadow-lg min-h-[640px] w-full">
          <div className="w-full text-[#2f6b46]">
            {/* Header com dropdown à direita */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-extrabold" style={{ color: BRAND.primary }}>
                  Resumo
                </h1>
                <p className="mt-2 text-sm" style={{ color: BRAND.mutedText }}>
                  Um resumo condensado do seu consumo — ajustado para: <strong>{period}</strong>
                </p>
              </div>

              {/* Dropdown de período */}
              <div className="mt-1">
                <label className="sr-only" htmlFor="periodSelect">Período</label>
                <select
                  id="periodSelect"
                  value={period}
                  onChange={(e) => {
                    setSelectedCO2(null);
                    setSelectedWater(null);
                    setSelectedLand(null);
                    setPeriod(e.target.value);
                  }}
                  className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm"
                >
                  {Object.keys(PERIODS).map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Totais */}
              <div className="rounded-xl bg-[#f8fff6] p-6 shadow-sm lg:col-span-1">
                <h2 className="text-xl font-semibold mb-3" style={{ color: BRAND.primary }}>
                  Resumo rápido
                </h2>

                <div className="space-y-3 text-[#4b6a54]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total de carbono emitido:</span>
                    <strong className="text-lg">{fmtKg(scaled.totals.co2e)}</strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total de água usada:</span>
                    <strong className="text-lg">{fmtLit(scaled.totals.water)}</strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total de terra usada:</span>
                    <strong className="text-lg">{fmtM2(scaled.totals.land)}</strong>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <MetricCard icon={<MdDirectionsCar size={20} />} title={`${scaled.metrics.carroKm} km`} subtitle="Equivalente em distância de carro" bg={BRAND.orange} />

                  <MetricCard icon={<MdShower size={20} />} title={`${scaled.metrics.banhoHoras}h`} subtitle="Horas de chuveiro equivalentes" bg={BRAND.primary} />

                  <MetricCard
                    icon={<MdLandscape size={20} />}
                    title={`${scaled.metrics.areaApto} apt.`}   // <--- aqui fechei a chave
                    subtitle="Área equivalente (aptos)"
                    bg={BRAND.accent}
                  />

                </div>
              </div>

              {/* Gráficos (3) */}
              <div className="rounded-xl bg-[#f6fff9] p-6 shadow-sm lg:col-span-3 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold" style={{ color: BRAND.primary }}>
                    Visualizações
                  </h3>
                  <div className="text-sm text-[#6b6b6b]">
                    Período: <strong>{period}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                  {/* 1) Bar chart comparativo (média vs você) */}
                  <div className="p-3 bg-white rounded-md shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <strong className="text-sm" style={{ color: BRAND.primary }}>
                        CO₂e por categoria
                      </strong>
                      <span className="text-xs text-[#6b6b6b]">clique em uma barra</span>
                    </div>

                    <div className="flex-1 min-h-[260px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={scaled.co2Data} margin={{ top: 8, right: 8, left: 0, bottom: 6 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" tick={{ fill: BRAND.primaryDark }} />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="Média" fill={BRAND.accent} onClick={(d) => setSelectedCO2({ series: "Média", ...d })} />
                          <Bar dataKey="Você" fill={BRAND.primary} onClick={(d) => setSelectedCO2({ series: "Você", ...d })} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="mt-3 text-sm text-[#4b6a54] min-h-[32px]">
                      {selectedCO2 ? (
                        <span>
                          Selecionado: <strong>{selectedCO2.series}</strong> — {selectedCO2.payload.name}:{" "}
                          <strong>{selectedCO2.series === "Média" ? selectedCO2.payload["Média"] : selectedCO2.payload["Você"]}</strong>
                        </span>
                      ) : (
                        <span>Clique em uma barra para ver detalhes</span>
                      )}
                    </div>
                  </div>

                  {/* 2) Area chart (água) */}
                  <div className="p-3 bg-white rounded-md shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <strong className="text-sm" style={{ color: BRAND.primary }}>
                        Consumo de água (amostra)
                      </strong>
                      <span className="text-xs text-[#6b6b6b]">clique em um ponto</span>
                    </div>

                    <div className="flex-1 min-h-[260px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={scaled.waterData}
                          margin={{ top: 8, right: 8, left: 0, bottom: 6 }}
                          onClick={(e) => {
                            if (e && e.activePayload && e.activePayload.length) {
                              setSelectedWater(e.activePayload[0].payload);
                            }
                          }}
                        >
                          <defs>
                            <linearGradient id="colorWaterGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={BRAND.primary} stopOpacity={0.8} />
                              <stop offset="95%" stopColor={BRAND.primary} stopOpacity={0.08} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" tick={{ fill: BRAND.primaryDark }} />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="litros" stroke={BRAND.primary} fill="url(#colorWaterGrad)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="mt-3 text-sm text-[#4b6a54] min-h-[32px]">
                      {selectedWater ? (
                        <span>
                          {selectedWater.day}: <strong>{selectedWater.litros.toLocaleString("pt-BR")} litros</strong>
                        </span>
                      ) : (
                        <span>Clique em um ponto do gráfico para selecionar</span>
                      )}
                    </div>
                  </div>

                  {/* 3) Line chart (terra) */}
                  <div className="p-3 bg-white rounded-md shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <strong className="text-sm" style={{ color: BRAND.primary }}>
                        Uso de terra por refeição
                      </strong>
                      <span className="text-xs text-[#6b6b6b]">clique na linha</span>
                    </div>

                    <div className="flex-1 min-h-[260px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={scaled.landData}
                          margin={{ top: 8, right: 8, left: 0, bottom: 6 }}
                          onClick={(e) => {
                            if (e && e.activePayload && e.activePayload.length) {
                              setSelectedLand(e.activePayload[0].payload);
                            }
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="meal" tick={{ fill: BRAND.primaryDark }} />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="m2" stroke={BRAND.accent} strokeWidth={2.5} activeDot={{ r: 6, fill: BRAND.primary }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="mt-3 text-sm text-[#4b6a54] min-h-[32px]">
                      {selectedLand ? (
                        <span>
                          {selectedLand.meal}: <strong>{selectedLand.m2} m²</strong>
                        </span>
                      ) : (
                        <span>Clique num ponto da linha para ver a área usada</span>
                      )}
                    </div>
                  </div>
                </div>

        
              </div>
            </section>

            {/* Substituições */}
            <section className="rounded-xl bg-[#fffafc] p-6 mt-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: BRAND.primary }}>
                Possíveis substituições
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">


                <SubstitutionItem
                  imageSrc="/mussarela.png"
                  meal="Café da manhã"
                  original="Queijo Mussarela"
                  alternative="Queijo Ricota"
                  description="tem média de emissão abaixo do normal e pode ajudar a reduzir sua pegada."
                />

                <SubstitutionItem
                  imageSrc="/bisteca.png"
                  meal="Almoço"
                  original="Bisteca bovina"
                  alternative="Dobradinha"
                  description="é uma opção com média de emissão abaixo do normal e pode lhe ajudar a reduzir sua pegada."
                />

                <SubstitutionItem
                  imageSrc="/brigadeiro.png"
                  meal="Jantar"
                  original="Brigadeiro"
                  alternative="Beijinho"
                  description="é uma opção com média de emissão abaixo do normal e pode lhe ajudar a reduzir sua pegada."
                />

                <SubstitutionItem
                  imageSrc="/coca.png"
                  meal="Ceia"
                  original="Coca-cola"
                  alternative="São Geraldo"
                  description="é uma opção com média de emissão abaixo do normal e pode lhe ajudar a reduzir sua pegada."
                />

                <div className="hidden lg:block" />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ----------------- Componentes auxiliares (inline) ----------------- */

function SectionButton({ href, label, active = false }) {
  const base = "w-full h-10 rounded-full px-4 flex items-center gap-3 text-sm transition-shadow";
  const classes = active ? "bg-[#2b6b4a] text-white shadow" : "bg-white/80 text-[#4b6a54] hover:shadow-md";

  return (
    <Link href={href} className={`${base} ${classes}`}>
      <span className="ml-1">{label}</span>
    </Link>
  );
}

function MetricCard({ icon, title, subtitle, bg = BRAND.primary }) {
  // allow hex string bg or fallback class
  const styleBg = typeof bg === "string" ? { backgroundColor: bg } : undefined;
  return (
    <div className="rounded-lg p-3 text-white flex gap-3 items-start" style={styleBg}>
      <div className="p-2 rounded-md bg-white/10">{icon}</div>
      <div>
        <div className="text-sm font-bold">{title}</div>
        <div className="text-xs opacity-90 max-w-xs">{subtitle}</div>
      </div>
    </div>
  );
}

function SubstitutionItem({ imageSrc, meal, original, alternative, description }) {
  return (
    <div className="flex flex-col gap-3 items-start bg-white rounded-md p-3 shadow-sm">
      <div className="w-full flex items-center gap-4">
        <div className="w-28 h-20 rounded-md overflow-hidden bg-white/60 flex-shrink-0">
          <Image src={imageSrc} width={160} height={120} alt={original} className="object-cover" />
        </div>

        <div className="flex-1">
          <div className="text-sm font-semibold" style={{ color: BRAND.primary }}>
            Em seu <span className="font-bold">{meal}</span>, o produto{" "}
            <span className="italic font-bold">{original}</span> pode ser substituído por{" "}
            <span className="font-bold">{alternative}</span>.
          </div>
          <p className="mt-2 text-sm text-[#6b6b6b]">{alternative} {description}</p>
        </div>
      </div>
    </div>
  );
}
